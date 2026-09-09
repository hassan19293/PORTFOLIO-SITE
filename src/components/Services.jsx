import { useState } from 'react';
import { services } from '../data/site';

export function Services() {
  const [active, setActive] = useState(services[0]);
  return <section className="section dark" id="services"><div className="wrap"><SectionHeading /><div className="service-layout"><div className="service-nav" role="tablist" aria-label="Buildifo disciplines">{services.map((service, index) => <button key={service.key} className={active.key === service.key ? 'active' : ''} onClick={() => setActive(service)} role="tab" aria-selected={active.key === service.key}><span>0{index + 1}</span>{service.label}<b aria-hidden="true">↗</b></button>)}</div><article className="service-detail"><span className="eyebrow">0{services.indexOf(active) + 1} / {active.label}</span><h3>{active.title}</h3><p>{active.body}</p><ul>{active.items.map(item => <li key={item}>{item}</li>)}</ul></article></div></div></section>;
}

function SectionHeading() { return <div className="section-intro"><span className="eyebrow">What we build</span><h2>One studio. Four disciplines.<br />One system.</h2><p>Every engagement pulls from the same core team.</p></div>; }
