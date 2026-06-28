import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../utils/gsap';
import styles from './Cursor.module.scss';

export default function Cursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    setIsVisible(true);

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out',
      });
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'none',
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
    };

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          gsap.to(cursor, { scale: 1.5, duration: 0.3, ease: 'power2.out' });
          gsap.to(dot, { scale: 0.5, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
          gsap.to(dot, { scale: 1, duration: 0.3 });
        });
      });
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    addHoverListeners();

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div ref={cursorRef} className={styles.cursor} aria-hidden="true" />
      <div ref={cursorDotRef} className={styles.cursorDot} aria-hidden="true" />
    </>
  );
}
