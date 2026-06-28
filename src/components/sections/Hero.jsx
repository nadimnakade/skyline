import { useEffect, useRef, Suspense } from 'react';
import { gsap } from '../../utils/gsap';
import SkylineScene from '../three/SkylineScene';
import styles from './Hero.module.scss';

export default function Hero() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);
  const overlayRef = useRef(null);
  const particlesRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { opacity: 0 });
      gsap.set(scrollRef.current, { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(overlayRef.current, {
        scaleY: 0,
        duration: 1.5,
        ease: 'power4.inOut',
        transformOrigin: 'top',
      });

      tl.to(contentRef.current, {
        opacity: 1,
        duration: 0.01,
      }, '-=0.3');

      const words = headlineRef.current?.querySelectorAll('.word');
      if (words?.length) {
        tl.from(words, {
          y: 120,
          opacity: 0,
          rotationX: -40,
          stagger: 0.12,
          duration: 1.2,
          ease: 'power4.out',
        }, '-=0.2');
      }

      const subWords = subRef.current?.querySelectorAll('.sub-word');
      if (subWords?.length) {
        tl.from(subWords, {
          y: 60,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.6');
      }

      if (ctaRef.current) {
        tl.from(ctaRef.current.children, {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.4');
      }

      tl.to(scrollRef.current, {
        opacity: 1,
        duration: 0.6,
      }, '-=0.2');

      if (particlesRef.current) {
        gsap.from(particlesRef.current.children, {
          opacity: 0,
          scale: 0,
          stagger: { each: 0.05, from: 'random' },
          duration: 1.5,
          ease: 'power2.out',
          delay: 2,
        });
      }

      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
        scale: 1.1,
        y: 100,
        opacity: 0.3,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} id="hero">
      <div className={styles.canvasContainer}>
        <SkylineScene />
      </div>

      <div className={styles.fogLayer} aria-hidden="true" />
      <div className={styles.gradientOverlay} aria-hidden="true" />

      <div ref={particlesRef} className={styles.particles} aria-hidden="true">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div ref={contentRef} className={styles.content}>
        <div ref={headlineRef} className={styles.headline}>
          <span className="word-wrapper"><span className="word">Building</span></span>{' '}
          <span className="word-wrapper"><span className="word">Tomorrow's</span></span>{' '}
          <span className="word-wrapper"><span className="word">Skyline.</span></span>
        </div>

        <div ref={subRef} className={styles.subHeadline}>
          <span className="sub-word">Luxury</span>{' '}
          <span className="sub-word">Living</span>{' '}
          <span className="sub-word">Crafted</span>{' '}
          <span className="sub-word">With</span>{' '}
          <span className="sub-word">Precision.</span>
        </div>

        <div ref={ctaRef} className={styles.ctaGroup}>
          <a href="#projects" className={styles.ctaPrimary}>
            <span>Explore Projects</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <a href="#story" className={styles.ctaSecondary}>
            <span>Our Story</span>
          </a>
        </div>
      </div>

      <div ref={scrollRef} className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </div>

      <div ref={overlayRef} className={styles.overlay} aria-hidden="true" />
    </section>
  );
}
