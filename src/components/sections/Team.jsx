import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsap';
import styles from './Team.module.scss';

const team = [
  {
    name: 'Shahid Khan',
    role: 'CEO',
    title: 'Owner',
    bio: 'Visionary leader with decades of experience shaping luxury skylines. His passion for excellence and relentless pursuit of perfection drives every project from concept to completion.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
    initial: 'SK',
  },
  {
    name: 'Sohel Khan',
    role: 'Resource Manager & Site Manager',
    title: 'Partner',
    bio: 'Operational mastermind ensuring every build meets the exacting standards that define the Skyline name. From resource allocation to on-site execution, Sohel oversees it all.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    initial: 'SO',
  },
  {
    name: 'Nadeem Nakade',
    role: 'IT Manager',
    title: 'Technology Lead',
    bio: 'Driving digital innovation behind the scenes — from project management systems to cutting-edge construction technology that keeps Skyline ahead of the curve.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    initial: 'NN',
  },
  {
    name: 'Almas Khan',
    role: 'Accounts Head',
    title: 'Finance Director',
    bio: 'Ensuring financial precision and strategic growth — the backbone of every successful Skyline venture. Almas keeps the numbers sharp and the business moving forward.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80',
    initial: 'AK',
  },
];

export default function Team() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

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

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          delay: i * 0.12,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleFlip = (index) => {
    const cardEl = cardsRef.current[index];
    if (!cardEl) return;
    const inner = cardEl.querySelector(`.${styles.cardInner}`);
    if (inner) {
      inner.classList.toggle(styles.flipped);
    }
  };

  return (
    <section ref={sectionRef} className={styles.team} id="team">
      <div className={styles.container}>
        <span className={styles.sectionLabel}>The Team</span>
        <h2 className={styles.sectionTitle}>People Behind<br />the Vision</h2>

        <div className={styles.grid}>
          {team.map((member, i) => (
            <article
              key={member.name}
              className={styles.card}
              ref={(el) => { cardsRef.current[i] = el; }}
              onClick={() => handleFlip(i)}
              role="button"
              tabIndex={0}
              aria-label={`Flip card for ${member.name}`}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFlip(i); } }}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardFront}>
                  <div className={styles.imageWrap}>
                    <img src={member.image} alt={member.name} loading="lazy" />
                    <div className={styles.imageOverlay} />
                  </div>
                  <div className={styles.frontContent}>
                    <span className={styles.initials}>{member.initial}</span>
                    <h3 className={styles.name}>{member.name}</h3>
                    <span className={styles.role}>{member.role}</span>
                    <span className={styles.flipHint}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      Tap to flip
                    </span>
                  </div>
                </div>

                <div className={styles.cardBack}>
                  <div className={styles.backContent}>
                    <span className={styles.backTitle}>{member.title}</span>
                    <h3 className={styles.backName}>{member.name}</h3>
                    <div className={styles.backDivider} />
                    <p className={styles.backBio}>{member.bio}</p>
                    <span className={styles.backRole}>{member.role}</span>
                    <span className={styles.flipHintBack}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      Tap to flip back
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
