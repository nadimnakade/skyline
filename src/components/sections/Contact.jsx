import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsap';
import styles from './Contact.module.scss';

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.leftContent} > *`, {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      gsap.from(`.${styles.formGroup}`, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: `.${styles.form}`,
          start: 'top 80%',
        },
      });

      const lines = gsap.utils.toArray(`.${styles.wireLine}`);
      lines.forEach((line) => {
        const length = line.getTotalLength?.() || 500;
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'center center',
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.contact} id="contact">
      <div className={styles.wireframeBg} aria-hidden="true">
        <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line className={styles.wireLine} x1="100" y1="580" x2="100" y2="20" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
          <line className={styles.wireLine} x1="100" y1="580" x2="700" y2="580" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
          <rect className={styles.wireLine} x="150" y="420" width="100" height="160" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2" />
          <rect className={styles.wireLine} x="280" y="320" width="120" height="260" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2" />
          <rect className={styles.wireLine} x="430" y="200" width="140" height="380" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2" />
          <rect className={styles.wireLine} x="600" y="350" width="90" height="230" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2" />
          <line className={styles.wireLine} x1="150" y1="420" x2="250" y2="420" stroke="#D4AF37" strokeWidth="0.5" opacity="0.15" />
          <line className={styles.wireLine} x1="280" y1="320" x2="400" y2="320" stroke="#D4AF37" strokeWidth="0.5" opacity="0.15" />
          <line className={styles.wireLine} x1="430" y1="200" x2="570" y2="200" stroke="#D4AF37" strokeWidth="0.5" opacity="0.15" />
          <line className={styles.wireLine} x1="600" y1="350" x2="690" y2="350" stroke="#D4AF37" strokeWidth="0.5" opacity="0.15" />
        </svg>
      </div>

      <div className={styles.container}>
        <div className={styles.leftContent}>
          <span className={styles.sectionLabel}>Get In Touch</span>
          <h2 className={styles.headline}>Let's Build<br />Something<br /><span className={styles.primary}>Extraordinary.</span></h2>
          <p className={styles.description}>
            Whether you're envisioning a private residence or a landmark development,
            we'd love to hear your story.
          </p>

          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Office</span>
              <span className={styles.infoValue}>Dubai, UAE</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}>inquire@skylinebuilders.com</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Phone</span>
              <span className={styles.infoValue}>+971 4 XXX XXXX</span>
            </div>
          </div>
        </div>

        <div className={styles.formWrap}>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className={styles.formInput}
                placeholder="Your full name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className={styles.formInput}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="project">Project Type</label>
              <select id="project" className={styles.formSelect} required>
                <option value="" disabled selected>Select project type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="mixed">Mixed Use</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="message">Message</label>
              <textarea
                id="message"
                className={styles.formTextarea}
                rows="4"
                placeholder="Tell us about your vision..."
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              <span>Send Inquiry</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
