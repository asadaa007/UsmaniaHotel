import { ADMIN_PASSCODE } from '../config';

const SESSION_KEY = 'usmania_admin_session';

export function isAdminAuthed() {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}

export function loginAdmin(passcode) {
  if (passcode !== ADMIN_PASSCODE) return false;
  sessionStorage.setItem(SESSION_KEY, 'true');
  return true;
}

export function logoutAdmin() {
  sessionStorage.removeItem(SESSION_KEY);
}
