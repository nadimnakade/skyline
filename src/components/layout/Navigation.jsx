import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../utils/gsap';
import logoImg from '../../assets/logo.PNG';
import styles from './Navigation.module.scss';

const navLinks = [
  { label: 'Story', href: '#story' },
  { label: 'Vision', href: '#vision' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    if (scrolled) {
      gsap.to(navRef.current, {
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    } else {
      gsap.to(navRef.current, {
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    }
  }, [scrolled]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={styles.inner}>
          <a href="#" className={styles.logo} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img src={logoImg} alt="Skyline Builders" className={styles.logoImg} />
          </a>

          <div className={styles.links}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.link}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a href="#contact" className={styles.cta} onClick={(e) => handleNavClick(e, '#contact')}>
            Inquire
          </a>

          <button
            className={`${styles.burger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            onClick={(e) => handleNavClick(e, link.href)}
            style={{ transitionDelay: `${i * 0.05}s` }}
          >
            {link.label}
          </a>
        ))}
        <a href="#contact" className={styles.mobileCta} onClick={(e) => handleNavClick(e, '#contact')}>
          Inquire Now
        </a>
      </div>
    </>
  );
}
