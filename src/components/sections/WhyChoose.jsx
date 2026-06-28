import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsap';
import styles from './WhyChoose.module.scss';

const features = [
  {
    number: '01',
    title: 'Uncompromising Quality',
    description: 'Every material is hand-selected, every joint inspected, every finish perfected.',
    metric: '99.7%',
    metricLabel: 'Quality Score',
  },
  {
    number: '02',
    title: 'Design Excellence',
    description: 'Award-winning architecture that stands the test of time and trends.',
    metric: '12',
    metricLabel: 'Design Awards',
  },
  {
    number: '03',
    title: 'Timely Delivery',
    description: 'Projects delivered on schedule without compromising an ounce of quality.',
    metric: '100%',
    metricLabel: 'On-Time Record',
  },
  {
    number: '04',
    title: 'Legacy Trust',
    description: 'Three decades of relationships built on transparency, integrity, and results.',
    metric: '25+',
    metricLabel: 'Years of Trust',
  },
];

export default function WhyChoose() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.sectionLabel}, .${styles.sectionTitle}, .${styles.sectionSubtitle}`, {
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

      gsap.utils.toArray(`.${styles.card}`).forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          delay: i * 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.whyChoose}>
      <div className={styles.container}>
        <span className={styles.sectionLabel}>Why Choose Us</span>
        <h2 className={styles.sectionTitle}>Built Different</h2>
        <p className={styles.sectionSubtitle}>
          Excellence isn't a goal — it's our starting point.
        </p>

        <div className={styles.grid}>
          {features.map((f) => (
            <article key={f.number} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardNumber}>{f.number}</span>
                <div className={styles.cardMetric}>
                  <span className={styles.metricValue}>{f.metric}</span>
                  <span className={styles.metricLabel}>{f.metricLabel}</span>
                </div>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.description}</p>
              <div className={styles.cardLine} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
