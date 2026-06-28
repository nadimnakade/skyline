import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsap';
import styles from './Projects.module.scss';

const projects = [
  {
    id: 1,
    title: 'The Meridian',
    category: 'Residential',
    location: 'Dubai Marina',
    area: '42,000 sq ft',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
  },
  {
    id: 2,
    title: 'Apex Tower',
    category: 'Commercial',
    location: 'Downtown',
    area: '128,000 sq ft',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
  },
  {
    id: 3,
    title: 'Serenity Heights',
    category: 'Residential',
    location: 'Palm Jumeirah',
    area: '65,000 sq ft',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
  },
  {
    id: 4,
    title: 'The Vault',
    category: 'Mixed Use',
    location: 'Business Bay',
    area: '210,000 sq ft',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80',
  },
  {
    id: 5,
    title: 'Horizon Park',
    category: 'Commercial',
    location: 'DIFC',
    area: '89,000 sq ft',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.sectionTitle}`, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      });

      const track = trackRef.current;
      if (!track) return;

      const totalScroll = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray(`.${styles.card}`).forEach((card, i) => {
        gsap.from(card, {
          rotation: -3 + Math.random() * 6,
          y: 50 + Math.random() * 30,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'left 90%',
            end: 'left 30%',
            scrub: 1,
            containerAnimation: gsap.getById?.('projectsScroll'),
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.projects} id="projects">
      <div className={styles.header}>
        <div ref={titleRef}>
          <span className={styles.sectionLabel}>Selected Works</span>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
        </div>
        <p className={styles.sectionSubtitle}>
          A curated selection of landmarks that define our legacy.
        </p>
      </div>

      <div className={styles.trackWrapper}>
        <div ref={trackRef} className={styles.track}>
          {projects.map((project, i) => (
            <article key={project.id} className={styles.card}>
              <div className={styles.cardImage}>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                />
                <div className={styles.cardOverlay}>
                  <span className={styles.cardCategory}>{project.category}</span>
                </div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardMeta}>
                  <span>{project.location}</span>
                  <span>{project.area}</span>
                  <span>{project.year}</span>
                </div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <div className={styles.cardArrow}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
