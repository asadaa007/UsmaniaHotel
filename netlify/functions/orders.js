import { getStore } from '@netlify/blobs';

const STORE_NAME = 'usmania-orders';
const KEY = 'orders';

function resolveStore() {
  const siteID = process.env.BLOBS_SITE_ID || process.env.NETLIFY_SITE_ID || process.env.SITE_ID;
  const token = process.env.BLOBS_TOKEN;
  if (siteID && token) {
    return getStore({ name: STORE_NAME, siteID, token });
  }
  return getStore(STORE_NAME);
}

async function readOrders(store) {
  const data = await store.get(KEY, { type: 'json' });
  return Array.isArray(data) ? data : [];
}

export const handler = async (event) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const store = resolveStore();

    if (event.httpMethod === 'GET') {
      const orders = await readOrders(store);
      return { statusCode: 200, headers, body: JSON.stringify(orders) };
    }

    if (event.httpMethod === 'POST') {
      const newOrder = JSON.parse(event.body || '{}');
      if (!newOrder.id || !newOrder.customer || !Array.isArray(newOrder.items)) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid order payload' }) };
      }
      const orders = await readOrders(store);
      const record = { ...newOrder, status: newOrder.status || 'Pending' };
      orders.unshift(record);
      await store.setJSON(KEY, orders);
      return { statusCode: 201, headers, body: JSON.stringify(record) };
    }

    if (event.httpMethod === 'PATCH') {
      const { id, status } = JSON.parse(event.body || '{}');
      if (!id || !status) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'id and status are required' }) };
      }
      const orders = await readOrders(store);
      const updated = orders.map(o => (o.id === id ? { ...o, status } : o));
      await store.setJSON(KEY, updated);
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    }

    if (event.httpMethod === 'DELETE') {
      const id = event.queryStringParameters && event.queryStringParameters.id;
      if (!id) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'id query param is required' }) };
      }
      const orders = await readOrders(store);
      const filtered = orders.filter(o => o.id !== id);
      await store.setJSON(KEY, filtered);
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
