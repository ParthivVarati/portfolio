import { useCallback, useState } from "react";
import TechSplash from "./components/terminal/TechSplash";
import MacTerminal from "./components/terminal/MacTerminal";

/**
 * Step 1:
 *   splash (tech flash) → Mac Terminal
 * Splash runs on every fresh load so you can always preview it.
 */
export default function PortfolioTerminal() {
  const [showSplash, setShowSplash] = useState(true);

  const finishSplash = useCallback(() => {
    setShowSplash(false);
  }, []);

  return showSplash ? (
    <TechSplash onDone={finishSplash} />
  ) : (
    <MacTerminal />
  );
}
