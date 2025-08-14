// базовый клиент. Если у тебя axios-инстанс уже есть — используй его.
// Ниже простые fetch-и. При желании замени на axios.
const BASE = '/api';

export async function fetchTableItems(params: { page: number; limit: number; q?: string }) {
  // Заглушка: если бэка нет — вернём фейковые данные на клиенте.
  // Заменишь на реальный запрос: `${BASE}/objects/items?page=...`
  const { page, limit, q = '' } = params;

  // имитация набора
  const total = 42;
  const start = (page - 1) * limit;
  const items = Array.from({ length: Math.min(limit, total - start) }, (_, i) => {
    const id = `${start + i + 1}`;
    return {
      id,
      name: `Сооружение ${id}`,
      type: 'Тип А',
      routeDefined: (start + i) % 2 === 0,
      profileDefined: (start + i) % 3 === 0,
      scaleH: '1:500',
      scaleV: '1:100',
    };
  }).filter(x => x.name.toLowerCase().includes(q.toLowerCase()));

  return { items, total };
}

export async function saveObjectWithItems(payload: { object: any; items: any[] }) {
  // тут реальный POST на сервер
  // return fetch(`${BASE}/objects`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
  //   .then(r => { if (!r.ok) throw new Error('save error'); return r.json(); });

  // временная заглушка
  await new Promise(r => setTimeout(r, 700));
  console.log('SAVE', payload);
  return { ok: true };
}
