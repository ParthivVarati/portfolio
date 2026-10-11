import { metrics } from "../../data/portfolio";

export default function MetricGrid({ ids = Object.keys(metrics), className = "" }) {
  const items = ids.map((id) => metrics[id]).filter(Boolean);
  if (!items.length) return null;

  return (
    <div className={`sys-grid metrics ${className}`}>
      {items.map((item) => (
        <article className="sys-metric" key={item.id}>
          <span>METRIC</span>
          <b>{item.value}</b>
          <em>{item.label.toUpperCase()}</em>
          {item.placeholder && <i className="sys-badge">PLACEHOLDER</i>}
        </article>
      ))}
    </div>
  );
}
