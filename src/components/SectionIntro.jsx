export function SectionIntro({ eyebrow, title, children, light = false }) {
  return <div className={`section-intro ${light ? 'section-intro-light' : ''}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}
