import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsap';
import logoImg from '../../assets/logo.PNG';
import styles from './Footer.module.scss';

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.footerContent} > *`, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      });

      const lines = gsap.utils.toArray(`.${styles.skylinePath}`);
      lines.forEach((line) => {
        const length = line.getTotalLength?.() || 2000;
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 3,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
          },
        });
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.skylineArt} aria-hidden="true">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className={styles.skylinePath}
            d="M0 200 L0 120 L40 120 L40 80 L60 80 L60 60 L80 60 L80 40 L120 40 L120 80 L140 80 L140 100 L180 100 L180 50 L200 50 L200 30 L240 30 L240 70 L260 70 L260 90 L300 90 L300 60 L320 60 L320 20 L360 20 L360 60 L380 60 L380 100 L420 100 L420 70 L440 70 L440 40 L480 40 L480 80 L500 80 L500 110 L540 110 L540 50 L560 50 L560 10 L600 10 L600 50 L620 50 L620 80 L660 80 L660 60 L680 60 L680 30 L720 30 L720 60 L740 60 L740 90 L780 90 L780 70 L800 70 L800 40 L840 40 L840 80 L860 80 L860 100 L900 100 L900 60 L920 60 L920 30 L960 30 L960 70 L980 70 L980 100 L1020 100 L1020 50 L1040 50 L1040 20 L1080 20 L1080 60 L1100 60 L1100 90 L1140 90 L1140 70 L1160 70 L1160 40 L1200 40 L1200 80 L1220 80 L1220 110 L1260 110 L1260 60 L1280 60 L1280 40 L1320 40 L1320 80 L1340 80 L1340 100 L1380 100 L1380 120 L1440 120 L1440 200 Z"
            stroke="#D4AF37"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </svg>
      </div>

      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerTop}>
            <div className={styles.footerLogo}>
              <img src={logoImg} alt="Skyline Builders" className={styles.logoImg} />
            </div>

            <div className={styles.footerLinks}>
              <div className={styles.linkGroup}>
                <span className={styles.linkGroupTitle}>Company</span>
                <a href="#story">Story</a>
                <a href="#vision">Vision</a>
                <a href="#leadership">Leadership</a>
                <a href="#contact">Careers</a>
              </div>

              <div className={styles.linkGroup}>
                <span className={styles.linkGroupTitle}>Projects</span>
                <a href="#projects">Residential</a>
                <a href="#projects">Commercial</a>
                <a href="#projects">Mixed Use</a>
                <a href="#projects">Heritage</a>
              </div>

              <div className={styles.linkGroup}>
                <span className={styles.linkGroupTitle}>Connect</span>
                <a href="#contact">Inquire</a>
                <a href="#">Instagram</a>
                <a href="#">LinkedIn</a>
                <a href="#">Twitter</a>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <span className={styles.copyright}>
              &copy; {new Date().getFullYear()} Skyline Builders. All rights reserved.
            </span>
            <span className={styles.tagline}>Building Tomorrow's Skyline.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
