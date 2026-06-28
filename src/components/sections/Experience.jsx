import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsap';
import styles from './Experience.module.scss';

const milestones = [
  {
    step: '01',
    title: 'Foundation',
    description: 'Deep analysis, site evaluation, and strategic planning form the bedrock of every project.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="36" width="40" height="8" />
        <rect x="8" y="24" width="32" height="12" />
        <line x1="12" y1="24" x2="12" y2="36" />
        <line x1="36" y1="24" x2="36" y2="36" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Planning',
    description: 'Meticulous design development with world-class architects and engineers.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="4" width="32" height="40" rx="2" />
        <line x1="14" y1="14" x2="34" y2="14" />
        <line x1="14" y1="22" x2="30" y2="22" />
        <line x1="14" y1="30" x2="26" y2="30" />
        <circle cx="32" cy="36" r="6" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Architecture',
    description: 'Visionary designs that push boundaries while honoring timeless principles.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 4L44 20V44H4V20L24 4Z" />
        <rect x="18" y="28" width="12" height="16" />
        <rect x="10" y="22" width="6" height="6" />
        <rect x="32" y="22" width="6" height="6" />
      </svg>
    ),
  },
  {
    step: '04',
    title: 'Construction',
    description: 'Precision engineering meets master craftsmanship in every phase of build.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="36" width="40" height="8" />
        <path d="M8 36V16L16 8V36" />
        <path d="M20 36V20L28 12V36" />
        <path d="M32 36V18L40 10V36" />
        <line x1="4" y1="20" x2="44" y2="20" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    step: '05',
    title: 'Delivery',
    description: 'Handover beyond expectations — where dreams become addresses.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 24L24 8L40 24" />
        <path d="M12 22V42H36V22" />
        <rect x="20" y="30" width="8" height="12" />
        <circle cx="24" cy="18" r="4" />
      </svg>
    ),
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.sectionLabel}, .${styles.sectionTitle}`, {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.utils.toArray(`.${styles.milestone}`).forEach((ms, i) => {
        gsap.from(ms, {
          y: 80,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ms,
            start: 'top 85%',
          },
          delay: i * 0.1,
        });
      });

      gsap.from(`.${styles.connector}`, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top 70%',
        },
      });

      gsap.utils.toArray(`.${styles.countUp}`).forEach((num) => {
        const target = parseInt(num.dataset.target, 10);
        gsap.from(num, {
          textContent: 0,
          duration: 2,
          ease: 'power1.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: num,
            start: 'top 85%',
          },
          onUpdate: function () {
            num.textContent = Math.ceil(parseFloat(num.textContent)) + (num.dataset.suffix || '');
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.experience} id="process">
      <div className={styles.container}>
        <span className={styles.sectionLabel}>Our Process</span>
        <h2 className={styles.sectionTitle}>From Vision to Reality</h2>

        <div ref={trackRef} className={styles.track}>
          <div className={styles.connector} aria-hidden="true" />

          {milestones.map((m) => (
            <div key={m.step} className={styles.milestone}>
              <div className={styles.milestoneLeft}>
                <div className={styles.stepNumber}>{m.step}</div>
                <div className={styles.icon}>{m.icon}</div>
              </div>
              <div className={styles.milestoneContent}>
                <h3 className={styles.milestoneTitle}>{m.title}</h3>
                <p className={styles.milestoneDesc}>{m.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber} data-target="150" data-suffix="+">0</span>
            <span className={styles.statLabel}>Projects Delivered</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber} data-target="25" data-suffix=" Years">0</span>
            <span className={styles.statLabel}>Industry Experience</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber} data-target="98" data-suffix="%">0</span>
            <span className={styles.statLabel}>Client Satisfaction</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber} data-target="12" data-suffix="">0</span>
            <span className={styles.statLabel}>Design Awards</span>
          </div>
        </div>
      </div>
    </section>
  );
}
