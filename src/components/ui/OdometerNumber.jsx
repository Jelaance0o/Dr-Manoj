import { useEffect, useRef, useState } from "react";

const OdometerNumber = ({ value, duration = 3000 }) => {
  const [number, setNumber] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  // Start when the number enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [started]);

  // Number animation
  useEffect(() => {
    if (!started) return;

    const target = Number(String(value).replace(/[^0-9]/g, ""));

    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth slow-down at the end
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentNumber = Math.floor(target * easeOut);

      setNumber(currentNumber);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Always finish exactly at target
        setNumber(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [started, value, duration]);

  return <span ref={ref}>{number.toLocaleString()}</span>;
};

export default OdometerNumber;

