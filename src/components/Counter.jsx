import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Animated count-up that fires once when scrolled into view.
export default function Counter({
  value,
  duration = 1.5,
  format = (v) => Math.round(v).toString()
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    let start;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(value * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return <span ref={ref}>{format(val)}</span>;
}
