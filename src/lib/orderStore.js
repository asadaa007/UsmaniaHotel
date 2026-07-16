import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export const ORDER_STATUSES = ['Pending', 'Confirmed', 'Out for Delivery', 'Delivered', 'Cancelled'];

const ordersCollection = collection(db, 'orders');

function toOrder(id, data) {
  return { ...data, id };
}

export async function saveOrder(order) {
  const payload = {
    ...order,
    date: order.date instanceof Date ? order.date.toISOString() : order.date,
    status: order.status || 'Pending',
  };
  await setDoc(doc(db, 'orders', order.id), payload);
  return payload;
}

export async function updateOrderStatus(id, status) {
  await updateDoc(doc(db, 'orders', id), { status });
}

export async function deleteOrder(id) {
  await deleteDoc(doc(db, 'orders', id));
}

export async function fetchOrders() {
  const snap = await getDocs(query(ordersCollection, orderBy('date', 'desc')));
  return snap.docs.map(d => toOrder(d.id, d.data()));
}

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(ordersCollection, orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setOrders(snap.docs.map(d => toOrder(d.id, d.data())));
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  // Kept for API compatibility with existing callers — orders update live via onSnapshot.
  const refresh = async () => {};

  return { orders, loading, error, refresh };
}
