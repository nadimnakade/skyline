import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../utils/gsap';
import styles from './Leadership.module.scss';

const leaders = [
  {
    name: 'Shahid Khan',
    role: 'Founder & CEO',
    bio: 'With over two decades of vision and leadership, Shahid has transformed Skyline Builders from a local construction firm into an internationally recognized name in luxury real estate.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
  },
  {
    name: 'Sohel Khan',
    role: 'Partner & Director',
    bio: 'Sohel brings an unmatched eye for detail and operational excellence. His commitment to quality ensures every project meets the exacting standards that define the Skyline name.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  },
];

export default function Leadership() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

      gsap.from(`.${styles.leaderCard}`, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: `.${styles.leaderGrid}`,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(`.${styles.leaderImage} img`, {
        clipPath: 'inset(0 100% 0 0)',
      }, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.5,
        ease: 'power4.inOut',
      });

      gsap.fromTo(`.${styles.leaderInfo} > *`, {
        y: 40,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
      });
    });

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section ref={sectionRef} className={styles.leadership} id="leadership">
      <div className={styles.container}>
        <span className={styles.sectionLabel}>Leadership</span>
        <h2 className={styles.sectionTitle}>The Visionaries Behind<br />the Skyline</h2>

        <div className={styles.leaderGrid}>
          <div className={styles.leaderCard}>
            <div className={styles.leaderImage}>
              <img
                src={leaders[activeIndex].image}
                alt={leaders[activeIndex].name}
              />
              <div className={styles.imageMask} />
            </div>

            <div className={styles.leaderInfo}>
              <span className={styles.leaderRole}>{leaders[activeIndex].role}</span>
              <h3 className={styles.leaderName}>{leaders[activeIndex].name}</h3>
              <p className={styles.leaderBio}>{leaders[activeIndex].bio}</p>

              <div className={styles.signature}>
                <svg viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 40 Q30 10 50 35 T90 30 Q110 25 130 35 T170 28 Q185 22 195 30"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.leaderTabs}>
            {leaders.map((leader, i) => (
              <button
                key={leader.name}
                className={`${styles.tab} ${i === activeIndex ? styles.active : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`View ${leader.name}'s profile`}
                aria-selected={i === activeIndex}
                role="tab"
              >
                <span className={styles.tabNumber}>0{i + 1}</span>
                <div className={styles.tabInfo}>
                  <span className={styles.tabName}>{leader.name}</span>
                  <span className={styles.tabRole}>{leader.role}</span>
                </div>
                <div className={styles.tabLine} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
