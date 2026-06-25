import { motion } from "framer-motion";

export default function SectionHeading({ index, title, subtitle }) {
  return (
    <div className="mb-14 border-t border-ink pt-5">
      <div className="flex items-baseline gap-4">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mono text-sm font-medium text-green"
        >
          ({index})
        </motion.span>
        {/* masked slide-up reveal */}
        <span className="block overflow-hidden">
          <motion.h2
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
            className="display text-4xl sm:text-5xl"
          >
            {title}
          </motion.h2>
        </span>
      </div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-4 max-w-xl text-base text-sub"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
