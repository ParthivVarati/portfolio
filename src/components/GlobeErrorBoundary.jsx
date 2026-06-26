import React from "react";

export class GlobeErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Skills Globe crashed:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-[460px] sm:h-[520px] flex items-center justify-center text-ink/50 text-sm">
          3D skills visualization unavailable
        </div>
      );
    }

    return this.props.children;
  }
}
