import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../utils/gsap';
import styles from './Testimonials.module.scss';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'CEO, Mitchell Holdings',
    quote: 'Skyline didn\'t just build our headquarters — they created a statement. Every detail reflects who we are.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Ahmed Al-Rashid',
    role: 'Private Investor',
    quote: 'Working with Skyline was transformative. Their vision and execution exceeded every expectation.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Elena Vasquez',
    role: 'Architect, Studio V',
    quote: 'The level of craftsmanship and attention to architectural integrity is rare in this industry.',
    rating: 5,
  },
  {
    id: 4,
    name: 'James Worthington',
    role: 'Director, Worthington Estates',
    quote: 'Three projects together, three masterpieces. Skyline is the definition of luxury construction.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Fatima Hassan',
    role: 'Homeowner',
    quote: 'They turned our dream home into reality. The quality of work is something we will cherish for generations.',
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;
    let anim;

    const animate = () => {
      anim = gsap.to(track, {
        x: -totalWidth,
        duration: 40,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });
    };

    animate();

    if (isPaused) {
      anim.pause();
    }

    return () => anim?.kill();
  }, [isPaused]);

  const items = [...testimonials, ...testimonials];

  return (
    <section ref={sectionRef} className={styles.testimonials}>
      <div className={styles.container}>
        <span className={styles.sectionLabel}>Testimonials</span>
        <h2 className={styles.sectionTitle}>What They Say</h2>
      </div>

      <div
        className={styles.slider}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div ref={trackRef} className={styles.track}>
          {items.map((t, i) => (
            <article key={`${t.id}-${i}`} className={styles.card}>
              <div className={styles.stars}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <blockquote className={styles.quote}>"{t.quote}"</blockquote>

              <div className={styles.author}>
                <div className={styles.avatar}>
                  <span>{t.name.charAt(0)}</span>
                </div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{t.name}</span>
                  <span className={styles.authorRole}>{t.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
