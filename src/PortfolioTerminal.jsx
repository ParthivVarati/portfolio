import { useCallback, useState } from "react";
import TechSplash from "./components/terminal/TechSplash";
import MacTerminal from "./components/terminal/MacTerminal";

/**
 * Boot splash (every load). At the burn, the terminal mounts underneath and
 * the splash's dark cover burns away over it; then the splash unmounts.
 */
export default function PortfolioTerminal() {
  const [phase, setPhase] = useState("splash"); // splash | reveal | done

  const onReveal = useCallback(() => setPhase("reveal"), []);
  const onDone = useCallback(() => setPhase("done"), []);

  return (
    <>
      {phase !== "splash" && <MacTerminal />}
      {phase !== "done" && <TechSplash onReveal={onReveal} onDone={onDone} />}
    </>
  );
}
