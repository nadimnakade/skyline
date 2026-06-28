import { useEffect, useRef, lazy, Suspense } from 'react';
import { gsap } from '../../utils/gsap';
import styles from './Hero.module.scss';

const SkylineScene = lazy(() => import('../three/SkylineScene'));

export default function Hero() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);
  const overlayRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.from(overlayRef.current, {
        scaleY: 1,
        duration: 1.5,
        ease: 'power4.inOut',
        transformOrigin: 'top',
      })
        .from(scrollRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.8,
        }, '-=0.3');

      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        tl.from(words, {
          y: 120,
          opacity: 0,
          rotationX: -40,
          stagger: 0.12,
          duration: 1.2,
          ease: 'power4.out',
        }, '-=0.5');
      }

      const subWords = subRef.current?.querySelectorAll('.sub-word');
      if (subWords) {
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
          pin: false,
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
      <div ref={overlayRef} className={styles.overlay} aria-hidden="true" />

      <div className={styles.canvasContainer}>
        <Suspense fallback={null}>
          <SkylineScene />
        </Suspense>
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

      <div className={styles.content}>
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
    </section>
  );
}
