import { useCallback, useEffect, useRef, useState } from 'react';

export const ORDER_STATUSES = ['Pending', 'Confirmed', 'Out for Delivery', 'Delivered', 'Cancelled'];

const ENDPOINT = '/.netlify/functions/orders';
const POLL_INTERVAL_MS = 20000;

async function request(method, { body, query } = {}) {
  const url = query ? `${ENDPOINT}?${query}` : ENDPOINT;
  const res = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    throw new Error(
      res.status === 404
        ? 'Orders service not found — this only works when the site is served via Netlify (run `netlify dev` locally, or on a Netlify deployment).'
        : `Orders request failed (${res.status})`
    );
  }
  return res.status === 204 ? null : res.json();
}

export async function saveOrder(order) {
  const payload = { ...order, date: order.date instanceof Date ? order.date.toISOString() : order.date };
  return request('POST', { body: payload });
}

export async function updateOrderStatus(id, status) {
  return request('PATCH', { body: { id, status } });
}

export async function deleteOrder(id) {
  return request('DELETE', { query: `id=${encodeURIComponent(id)}` });
}

export async function fetchOrders() {
  return request('GET');
}

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  const refresh = useCallback(async () => {
    try {
      const data = await request('GET');
      if (mounted.current) {
        setOrders(data);
        setError(null);
      }
    } catch (err) {
      if (mounted.current) setError(err.message);
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch from an external API, not derived render state
    refresh();
    const interval = setInterval(refresh, POLL_INTERVAL_MS);
    return () => {
      mounted.current = false;
      clearInterval(interval);
    };
  }, [refresh]);

  return { orders, loading, error, refresh };
}
