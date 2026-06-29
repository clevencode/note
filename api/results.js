import { kv } from '@vercel/kv';

const STORAGE_KEY = 'quiz_results';
const MAX_ENTRIES = 500;

const ALLOWED_ORIGINS = [
  'https://question-ecru-iota.vercel.app',
  'https://note-sigma-bice.vercel.app'
];

function setCors(req, res) {
  const origin = req.headers.origin;
  if (origin && (ALLOWED_ORIGINS.includes(origin) || origin.includes('localhost') || origin.includes('127.0.0.1'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function normalizeEntry(raw = {}) {
  return {
    id: raw.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: String(raw.name || '').trim() || 'Sans nom',
    percent: Number(raw.percent) || 0,
    correct: Number(raw.correct) || 0,
    total: Number(raw.total) || 8,
    wrong: Number(raw.wrong) || 0,
    grade: raw.grade || '',
    answers: raw.answers || {},
    date: raw.date || new Date().toISOString(),
    source: raw.source || 'https://question-ecru-iota.vercel.app'
  };
}

export default async function handler(req, res) {
  setCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (!process.env.KV_REST_API_URL) {
    return res.status(503).json({
      error: 'Vercel KV não configurado. Conecte um KV Store ao projeto note no Vercel.'
    });
  }

  try {
    if (req.method === 'GET') {
      const results = (await kv.get(STORAGE_KEY)) || [];
      return res.status(200).json(results);
    }

    if (req.method === 'POST') {
      const entry = normalizeEntry(req.body);
      const results = (await kv.get(STORAGE_KEY)) || [];
      results.unshift(entry);
      await kv.set(STORAGE_KEY, results.slice(0, MAX_ENTRIES));
      return res.status(201).json({ ok: true, id: entry.id });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API /results error:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}