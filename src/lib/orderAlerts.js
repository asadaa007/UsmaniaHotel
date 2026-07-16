import { useEffect, useRef, useState } from 'react';

const SETTINGS_KEY = 'usmania_admin_alert_settings';

const DEFAULT_SETTINGS = { sound: true, browserNotification: false };

export function getAlertSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function setAlertSettings(partial) {
  const next = { ...getAlertSettings(), ...partial };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  return next;
}

export function playAlertSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    osc.start();
    osc.frequency.setValueAtTime(1175, ctx.currentTime + 0.15);
    osc.stop(ctx.currentTime + 0.5);
    osc.onended = () => ctx.close();
  } catch {
    // Web Audio unavailable — silently skip.
  }
}

export function showOrderNotification(order) {
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
  try {
    new Notification('New order received', {
      body: `${order.customer?.name || 'A customer'} — Rs ${order.total} (${order.id})`,
      tag: order.id,
    });
  } catch {
    // Notification constructor can throw in some contexts (e.g. service worker required) — ignore.
  }
}

export function fireTestAlert() {
  const settings = getAlertSettings();
  if (settings.sound) playAlertSound();
  if (settings.browserNotification) {
    showOrderNotification({ customer: { name: 'Test Customer' }, total: 0, id: 'TEST' });
  }
}

// Watches the live orders list and fires the configured alert(s) for orders
// that appear after this hook first mounts — never alerts for pre-existing orders.
export function useOrderAlertWatcher(orders) {
  const seenIds = useRef(null);

  useEffect(() => {
    if (seenIds.current === null) {
      seenIds.current = new Set(orders.map(o => o.id));
      return;
    }
    const settings = getAlertSettings();
    orders.forEach(order => {
      if (!seenIds.current.has(order.id)) {
        seenIds.current.add(order.id);
        if (settings.sound) playAlertSound();
        if (settings.browserNotification) showOrderNotification(order);
      }
    });
  }, [orders]);
}

export function useAlertSettingsState() {
  const [settings, setSettings] = useState(getAlertSettings);

  const update = (partial) => setSettings(setAlertSettings(partial));

  return [settings, update];
}
