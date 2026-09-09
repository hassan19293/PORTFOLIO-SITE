import { Logo } from './Logo';

export function Header() {
  return <header className="site-header"><nav className="nav wrap"><Logo /><div className="nav-links"><a href="#story">Story</a><a href="#services">Services</a><a href="#work">Work</a><a href="#process">Process</a></div><a className="button button-small" href="#contact">Build with us <span aria-hidden="true">↗</span></a></nav></header>;
}
