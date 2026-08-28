import React, { useMemo, useState } from 'react'
import resources from './data/resources.json'

const REGIONS = ['All', 'NCR', 'Luzon', 'Visayas', 'Mindanao']

function Badge({ children }) {
  return (
    <span className="region-badge text-xs">{children}</span>
  )
}

export default function App() {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return resources.filter(r => {
      if (region !== 'All' && r.region !== region) return false
      if (!q) return true
      return (
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        (r.tags || []).join(' ').toLowerCase().includes(q)
      )
    })
  }, [query, region])

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6 flex items-center gap-4 hero-bg rounded-lg p-6 text-white noise-overlay">
          <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center font-serif text-2xl">LGBT</div>
          <div>
            <h1 className="text-3xl font-serif">LGBT Philippines — Resources</h1>
            <p className="text-sm text-white/90">Organizations, charities, and helpful links for Filipino LGBTQ+ communities.</p>
          </div>
        </header>

        <section className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex gap-3 flex-col sm:flex-row">
            <input
              aria-label="Search"
              className="flex-1 border rounded px-3 py-2"
              placeholder="Search by name, tag, or keyword"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <select className="border rounded px-3 py-2" value={region} onChange={e => setRegion(e.target.value)}>
              {REGIONS.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </section>

        <section className="space-y-4">
          {filtered.length === 0 && (
            <div className="text-center text-gray-500">No results. Try a different keyword or region.</div>
          )}

          {filtered.map(r => (
            <article key={r.id} className="card-area p-4 rounded-lg shadow flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center gap-4">
                <div className="avatar-ring">
                  <img className="avatar-inner" src={`https://via.placeholder.com/140?text=${encodeURIComponent(r.name.split(' ')[0])}`} alt="avatar" />
                </div>
              </div>

              <div className="flex-1 text-white">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-lg font-serif">{r.name}</h2>
                  <Badge>{r.region}</Badge>
                </div>
                <p className="text-sm text-white/80 mt-2">{r.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(r.tags || []).map(t => (
                    <span key={t} className="text-xs px-2 py-1 bg-white/10 rounded text-white">{t}</span>
                  ))}
                </div>
              </div>

              <div className="w-full sm:w-56">
                <div className="silver-panel text-black">
                  <div className="flex justify-between items-start">
                    <a className="text-indigo-700 hover:underline" href={r.url} target="_blank" rel="noreferrer">Visit</a>
                    {r.contact && <a className="text-sm text-indigo-800" href={`mailto:${r.contact}`}>Email</a>}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>Found an issue or resource to add? Open an issue on the repo or email <a className="text-indigo-600" href="mailto:placeholder@example.com">placeholder@example.com</a>.</p>
        </footer>
      </div>
    </div>
  )
}
