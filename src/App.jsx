import React, { useMemo, useState } from 'react'
import resources from './data/resources.json'

const REGIONS = ['All', 'Nationwide', 'NCR', 'Luzon', 'Visayas', 'Mindanao']
const TYPES = ['All', 'Health', 'Wellness', 'Education', 'Rights']
const globalResources = [
  ['APCOM', 'Asia-Pacific health', 'Regional LGBTQI and key-population health, rights, HIV, and community resources.', 'https://www.apcom.org/'],
  ['ASEAN SOGIE Caucus', 'Regional rights', 'SOGIESC advocacy, research, and regional human-rights resources.', 'https://aseansogiecaucus.org/'],
  ['ILGA World', 'Global rights', 'Global research, advocacy, and a directory of LGBTI organizations.', 'https://ilga.org/'],
  ['Outright International', 'Global rights', 'Human-rights advocacy, research, and resources focused on LGBTQIA+ people worldwide.', 'https://outrightinternational.org/'],
  ['GATE', 'Trans advocacy', 'Global Action for Trans Equality: trans-led advocacy, health, and human-rights resources.', 'https://gate.ngo/'],
  ['The Trevor Project', 'Research & education', 'LGBTQ young-person research and education. Its crisis services are U.S.-based, not a Philippines hotline.', 'https://www.thetrevorproject.org/research-briefs/'],
  ['Rainbow Railroad', 'Safety & advocacy', 'Support and advocacy for LGBTQI+ people facing persecution; review eligibility and current intake guidance first.', 'https://www.rainbowrailroad.org/'],
  ['UNAIDS', 'HIV information', 'Evidence-based global HIV data, policy, and community resources.', 'https://www.unaids.org/']
]

export default function App() {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('All')
  const [type, setType] = useState('All')

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase()
    return resources.filter(resource => {
      const matchesRegion = region === 'All' || resource.region === region
      const matchesType = type === 'All' || resource.type === type
      const text = `${resource.name} ${resource.place} ${resource.description} ${resource.tags.join(' ')}`.toLowerCase()
      return matchesRegion && matchesType && (!search || text.includes(search))
    })
  }, [query, region, type])

  return <main>
    <header className="site-header">
      <a className="brand" href="#top"><span>✦</span> Bahaghari <em>Guide PH</em></a>
      <nav><a href="#directory">Philippines</a><a href="#global">Global</a><a href="#learn">Learn</a><a href="#rights">Know your rights</a></nav>
    </header>

    <section id="top" className="hero">
      <div><p className="eyebrow on-dark">For LGBTQIA+ Filipinos, by community</p><h1>You deserve care, safety, and a place to belong.</h1><p className="lede">A private, judgment-free guide to LGBTQIA+-affirming health, wellness, education, and rights resources in the Philippines.</p><a className="button" href="#directory">Find support near you</a></div>
      <div className="hero-card" aria-hidden="true"><span className="hero-star one">✦</span><span className="hero-star two">✧</span><div className="hero-id"><small>COMMUNITY ID</small><strong>YOU<br />BELONG<br />HERE</strong><i>HEALTH · CARE · PRIDE</i></div><div className="hero-medal">✦</div></div>
    </section>

    <section className="urgent" aria-labelledby="urgent-title"><div><p className="eyebrow">Need support now?</p><h2 id="urgent-title">You don’t have to carry it alone.</h2></div><div className="urgent-links"><a href="tel:1553"><b>NCMH Crisis Line</b><span>Call 1553</span></a><a href="https://chr.gov.ph/" target="_blank" rel="noreferrer"><b>Human-rights concern</b><span>Contact CHR ↗</span></a><a href="https://www.queersafespacesph.org/" target="_blank" rel="noreferrer"><b>Queer peer support</b><span>Queer Safe Spaces PH ↗</span></a></div><p className="tiny">If you are in immediate danger, call local emergency services. Hotline availability can change—please confirm before visiting.</p></section>

    <section id="directory" className="section directory"><p className="eyebrow">Verified starting points</p><h2>Philippines resource directory</h2><p className="section-copy">The main directory is focused on Philippine services. Search by organization, city, or service—or choose a region and support type.</p><div className="filters"><input aria-label="Search resources" placeholder="Search organizations, city, or service" value={query} onChange={event => setQuery(event.target.value)} /><select aria-label="Filter by support type" value={type} onChange={event => setType(event.target.value)}>{TYPES.map(item => <option key={item}>{item === 'All' ? 'All support types' : item}</option>)}</select><select aria-label="Filter by region" value={region} onChange={event => setRegion(event.target.value)}>{REGIONS.map(item => <option key={item}>{item === 'All' ? 'All Philippine areas' : item}</option>)}</select></div><p className="count">{filtered.length} Philippine resource{filtered.length === 1 ? '' : 's'}</p><div className="grid">{filtered.map(resource => <article className="resource-card" key={resource.id}><span className="tag">{resource.type} · {resource.region}</span><h3>{resource.name}</h3><p>{resource.description}</p><footer><span>{resource.place}</span><a href={resource.url} target="_blank" rel="noreferrer">Official site ↗</a></footer></article>)}</div>{filtered.length === 0 && <p className="empty">No matches yet. Try another term or filter.</p>}<p className="tiny">Every listing links to an organization or government page. Service hours and eligibility can change, so confirm with the provider before visiting.</p></section>

    <section id="global" className="section global"><p className="eyebrow">Beyond the Philippines</p><h2>Global knowledge & advocacy</h2><p className="section-copy">These resources complement—not replace—Philippine services. Check each organization’s location and eligibility before seeking direct help.</p><div className="grid global-grid">{globalResources.map(([name, category, description, url]) => <article className="resource-card global-card" key={name}><span className="tag">{category}</span><h3>{name}</h3><p>{description}</p><footer><span>Online / international</span><a href={url} target="_blank" rel="noreferrer">Official site ↗</a></footer></article>)}</div></section>

    <section id="learn" className="section learn"><div><p className="eyebrow">Clear, kind, and evidence-aware</p><h2>Learn at your own pace.</h2><p className="section-copy">Explore trusted Philippine resources for understanding SOGIESC, LGBTQIA+ rights, health, and inclusive education.</p><a className="button dark" href="https://rainbowresearchhub.up.edu.ph/" target="_blank" rel="noreferrer">Visit the Rainbow Research Hub ↗</a></div><div className="learn-list"><a href="https://www.babaylanes.org/" target="_blank" rel="noreferrer"><b>01</b><span><strong>Babaylanes Resource Hub</strong><small>Youth education & human rights</small></span></a><a href="https://www.pantay.org/" target="_blank" rel="noreferrer"><b>02</b><span><strong>PANTAY</strong><small>Safer and more inclusive schools</small></span></a><a href="https://www.amnesty.org.ph/campaigns/sogiesc/" target="_blank" rel="noreferrer"><b>03</b><span><strong>Amnesty PH SOGIESC</strong><small>Human-rights learning resources</small></span></a></div></section>

    <section id="rights" className="rights"><div><p className="eyebrow on-dark">Your dignity is not negotiable</p><h2>Know your rights, and where to turn.</h2><p>Discrimination, harassment, or violence is never your fault. Documentation and support can help you decide what comes next.</p><a className="button lime" href="https://rrightsphl.org/" target="_blank" rel="noreferrer">Explore legal resources ↗</a></div><ol><li><b>1</b><span>Get to safety and reach a person or service you trust.</span></li><li><b>2</b><span>Write down what happened and save messages, photos, or records if it is safe to do so.</span></li><li><b>3</b><span>Contact Rainbow Rights PH or the Commission on Human Rights for options and guidance.</span></li></ol></section>
    <footer className="site-footer"><span className="brand"><span>✦</span> Bahaghari <em>Guide PH</em></span><p>Made as a community information guide. It does not collect personal information or provide medical or legal advice.</p><p>Last reviewed: October 2026</p></footer>
  </main>
}

