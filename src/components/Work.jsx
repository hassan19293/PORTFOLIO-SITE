import { work } from '../data/site';

export function Work() {
  return <section className="section dark" id="work"><div className="wrap"><div className="section-intro"><span className="eyebrow">Selected work</span><h2>Projects, not case studies.</h2><p>Builds made to earn their place in the real world.</p></div><div className="work-grid">{work.map((project, index) => <a className="work-card" href={project.url} target={project.url.startsWith('#') ? undefined : '_blank'} rel={project.url.startsWith('#') ? undefined : 'noreferrer'} key={project.name}><img src={project.image} alt="" loading="lazy" /><div className="work-overlay" /><span className="work-index">W.0{index + 1}</span><div className="work-copy"><span>{project.type} · {project.year}</span><h3>{project.name}</h3><p>{project.description}</p><strong>View project ↗</strong></div></a>)}</div></div></section>;
}
