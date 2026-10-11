import { useState } from "react";
import { architectures } from "../../data/portfolio";

function Node({ item, active, onSelect, branch = false }) {
  return (
    <button
      type="button"
      className={`sys-node ${branch ? "is-branch" : ""} ${active ? "is-active" : ""}`}
      aria-pressed={active}
      onClick={() => onSelect(item)}
    >
      <b>{item.label}</b>
      {!branch && item.note && <small>{item.note}</small>}
    </button>
  );
}

function Flow({ spec }) {
  const [active, setActive] = useState(spec.stages[0]);

  return (
    <div className="sys-flow">
      {active && <p className="sys-arch-selected"><span>SELECTED</span> {active.label}{active.note ? ` — ${active.note}` : ""}</p>}
      {spec.stages.map((stage, index) => (
        <div className="sys-stage" key={stage.id}>
          {index > 0 && <div className="sys-connector" aria-hidden="true" />}
          <Node item={stage} active={active?.id === stage.id} onSelect={setActive} />
          {stage.branches && (
            <div className="sys-branches">
              {stage.branches.map((branch) => (
                <Node
                  key={branch.id}
                  item={branch}
                  branch
                  active={active?.id === branch.id}
                  onSelect={setActive}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Hub({ spec }) {
  const [active, setActive] = useState(spec.center);
  const left = spec.spokes.slice(0, Math.ceil(spec.spokes.length / 2));
  const right = spec.spokes.slice(Math.ceil(spec.spokes.length / 2));

  return (
    <div>
      {active && <p className="sys-arch-selected"><span>SELECTED</span> {active.label}{active.note ? ` — ${active.note}` : ""}</p>}
      <div className="sys-hub">
      <div className="sys-hub-col">
        {left.map((item) => (
          <Node key={item.id} item={item} active={active?.id === item.id} onSelect={setActive} />
        ))}
      </div>
      <Node item={spec.center} active={active?.id === spec.center.id} onSelect={setActive} />
      <div className="sys-hub-col">
        {right.map((item) => (
          <Node key={item.id} item={item} active={active?.id === item.id} onSelect={setActive} />
        ))}
      </div>
      </div>
    </div>
  );
}

export default function Architecture({ id }) {
  const spec = architectures[id];
  if (!spec) return null;

  return (
    <section className="sys-arch" aria-label={`${spec.title} architecture`}>
      <div className="sys-arch-head">
        <div>
          <p className="sys-kicker">ARCHITECTURE</p>
          <h3 className="sys-title" style={{ fontSize: 28 }}>{spec.title}</h3>
          <p>{spec.intro}</p>
        </div>
      </div>
      {spec.kind === "hub" ? <Hub key={spec.id} spec={spec} /> : <Flow key={spec.id} spec={spec} />}
      <p className="sys-arch-hint">Click a node to inspect it. This is the real shape of the system — not a decorative graphic.</p>
    </section>
  );
}
