import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../utils/gsap';
import styles from './Story.module.scss';

export default function Story() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = headlineRef.current?.querySelectorAll('.story-word');
      if (words) {
        gsap.from(words, {
          y: 80,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
          },
        });
      }

      const lines = svgRef.current?.querySelectorAll('.draw-line');
      if (lines) {
        lines.forEach((line) => {
          const length = line.getTotalLength?.() || 1000;
          gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(line, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: svgRef.current,
              start: 'top 70%',
              end: 'bottom 30%',
              scrub: 1,
            },
          });
        });
      }

      gsap.from(`.${styles.textBlock}`, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: `.${styles.textContent}`,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.story} id="story">
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div ref={headlineRef} className={styles.headline}>
            <span className="story-word">Every</span>{' '}
            <span className="story-word">skyline</span>{' '}
            <span className="story-word">begins</span>{' '}
            <span className="story-word">with</span>{' '}
            <span className="story-word">a</span>{' '}
            <span className="story-word">single</span>{' '}
            <span className="story-word highlight">vision.</span>
          </div>
        </div>

        <div className={styles.grid}>
          <div ref={svgRef} className={styles.svgContainer}>
            <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line className="draw-line" x1="50" y1="380" x2="50" y2="100" stroke="#D4AF37" strokeWidth="1" />
              <line className="draw-line" x1="50" y1="380" x2="550" y2="380" stroke="#D4AF37" strokeWidth="1" />
              <rect className="draw-line" x="80" y="280" width="80" height="100" stroke="#D4AF37" strokeWidth="0.5" />
              <rect className="draw-line" x="180" y="200" width="100" height="180" stroke="#D4AF37" strokeWidth="0.5" />
              <rect className="draw-line" x="300" y="140" width="120" height="240" stroke="#D4AF37" strokeWidth="0.5" />
              <rect className="draw-line" x="440" y="220" width="90" height="160" stroke="#D4AF37" strokeWidth="0.5" />
              <line className="draw-line" x1="80" y1="280" x2="160" y2="280" stroke="#D4AF37" strokeWidth="0.5" />
              <line className="draw-line" x1="180" y1="200" x2="280" y2="200" stroke="#D4AF37" strokeWidth="0.5" />
              <line className="draw-line" x1="300" y1="140" x2="420" y2="140" stroke="#D4AF37" strokeWidth="0.5" />
              <line className="draw-line" x1="440" y1="220" x2="530" y2="220" stroke="#D4AF37" strokeWidth="0.5" />
              <circle className="draw-line" cx="120" cy="310" r="8" stroke="#D4AF37" strokeWidth="0.5" />
              <circle className="draw-line" cx="230" cy="230" r="8" stroke="#D4AF37" strokeWidth="0.5" />
              <circle className="draw-line" cx="360" cy="170" r="8" stroke="#D4AF37" strokeWidth="0.5" />
              <circle className="draw-line" cx="485" cy="250" r="8" stroke="#D4AF37" strokeWidth="0.5" />
              <line className="draw-line" x1="120" y1="310" x2="230" y2="230" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" />
              <line className="draw-line" x1="230" y1="230" x2="360" y2="170" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" />
              <line className="draw-line" x1="360" y1="170" x2="485" y2="250" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" />
            </svg>
          </div>

          <div className={styles.textContent}>
            <div className={styles.textBlock}>
              <h3 className={styles.textTitle}>Foundation</h3>
              <p className={styles.textBody}>
                Every project begins with an unwavering commitment to excellence.
                We lay the groundwork not just in concrete, but in trust, vision,
                and an obsession with the details that others overlook.
              </p>
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.textTitle}>Craft</h3>
              <p className={styles.textBody}>
                From blueprint to reality, our master craftsmen bring decades
                of expertise to every joint, every surface, every finish.
                Precision is not a goal — it is our standard.
              </p>
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.textTitle}>Legacy</h3>
              <p className={styles.textBody}>
                We don't just build structures. We create landmarks that define
                skylines and shape communities for generations to come.
                Our legacy is measured in decades, not quarters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
