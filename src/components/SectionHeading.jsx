export default function SectionHeading({ index, title, subtitle }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-coral">{index}</span>
        <h2 className="display text-3xl font-bold sm:text-4xl">{title}</h2>
        <span className="h-px flex-1 bg-line" />
      </div>
      {subtitle && (
        <p className="mt-3 max-w-xl pl-10 text-sm text-inksoft">{subtitle}</p>
      )}
    </div>
  );
}
