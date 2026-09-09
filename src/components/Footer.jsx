import { Logo } from './Logo';

export function Footer() {
  return <footer className="footer dark"><div className="wrap footer-grid"><div><Logo /><p className="footer-note">Senior engineering and sharp design thinking for software that holds up.</p></div><div className="footer-links"><div><span>Explore</span><a href="#story">Story</a><a href="#services">Services</a><a href="#work">Work</a></div><div><span>Connect</span><a href="#contact">Start a project</a><a href="mailto:hello@buildifo.com">hello@buildifo.com</a></div></div></div><div className="wrap footer-bottom"><span>© 2026 Buildifo</span><span>Built for the long term.</span></div></footer>;
}
