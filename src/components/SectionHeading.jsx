export default function SectionHeading({ index, title, subtitle }) {
  return (
    <div className="mb-14">
      <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
        <div className="flex items-end gap-5">
          <span className="numeral-outline hidden text-6xl leading-none sm:block sm:text-7xl">
            {index}
          </span>
          <div>
            <span className="eyebrow text-[11px] text-coral">Section {index}</span>
            <h2 className="headline mt-2 text-4xl sm:text-5xl">{title}</h2>
          </div>
        </div>
        {subtitle && (
          <p className="hidden max-w-xs text-right text-sm text-inksoft md:block">
            {subtitle}
          </p>
        )}
      </div>
      {subtitle && (
        <p className="mt-4 max-w-md text-sm text-inksoft md:hidden">{subtitle}</p>
      )}
    </div>
  );
}
