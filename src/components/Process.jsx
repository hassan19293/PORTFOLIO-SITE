import { useState } from 'react';
import { process } from '../data/site';

export function Process() {
  const [active, setActive] = useState(0);
  return <section className="section light" id="process"><div className="wrap process-layout"><div className="section-intro section-intro-light"><span className="eyebrow">Our approach</span><h2>A precision-engineered process, built around you.</h2></div><div className="process-list">{process.map(([number, title, copy], index) => <button key={number} className={active === index ? 'active' : ''} onClick={() => setActive(index)}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><b aria-hidden="true">↗</b></button>)}</div></div></section>;
}
