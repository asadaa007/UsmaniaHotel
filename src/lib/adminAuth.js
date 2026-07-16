import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

export async function loginAdmin(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function logoutAdmin() {
  await signOut(auth);
}

export function useAdminAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, loading, authed: !!user };
}
