import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsap';
import styles from './Vision.module.scss';

export default function Vision() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imagesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.visionText}`, {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 70%',
        },
      });

      const reveals = gsap.utils.toArray(`.${styles.revealImage}`);
      reveals.forEach((img) => {
        gsap.fromTo(img, {
          clipPath: 'inset(100% 0 0 0)',
        }, {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: img,
            start: 'top 75%',
          },
        });
      });

      gsap.from(`.${styles.visionLabel}`, {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 70%',
        },
      });

      gsap.fromTo(`.${styles.parallaxImg}`, {
        yPercent: -15,
      }, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: imagesRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.vision} id="vision">
      <div className={styles.container}>
        <div className={styles.topContent}>
          <span className={styles.visionLabel}>Our Vision</span>
          <div ref={textRef} className={styles.textWrap}>
            <h2 className={styles.visionText}>Where Architecture</h2>
            <h2 className={`${styles.visionText} ${styles.primary}`}>Meets Legacy.</h2>
          </div>
        </div>

        <div ref={imagesRef} className={styles.imageGrid}>
          <div className={styles.imageCol}>
            <div className={`${styles.revealImage} ${styles.tall}`}>
              <img
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
                alt="Modern architectural building"
                loading="lazy"
              />
            </div>
            <div className={styles.textContent}>
              <p>
                We envision spaces that transcend the ordinary — where every line,
                every material, every proportion serves a purpose greater than
                aesthetics alone.
              </p>
            </div>
          </div>

          <div className={`${styles.imageCol} ${styles.offset}`}>
            <div className={styles.revealImage}>
              <img
                src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80"
                alt="Luxury interior design"
                loading="lazy"
                className={styles.parallaxImg}
              />
            </div>
            <div className={styles.textContent}>
              <p>
                Our vision extends beyond construction. We craft environments
                that inspire, endure, and elevate the human experience.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.quoteBlock}>
          <div className={styles.quoteLine} />
          <blockquote className={styles.quote}>
            Architecture should speak of its time and place, but yearn for timelessness.
          </blockquote>
          <div className={styles.quoteLine} />
        </div>
      </div>
    </section>
  );
}
