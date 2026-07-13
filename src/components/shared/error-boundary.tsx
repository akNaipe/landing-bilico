"use client";

import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Section failed to load:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <section className="py-20 md:py-28 lg:py-32">
            <div className="section-container">
              <div className="w-full h-64 bg-graphite/50 rounded-2xl flex items-center justify-center">
                <p className="text-gray-dark text-sm font-body">
                  Conteúdo indisponível no momento.
                </p>
              </div>
            </div>
          </section>
        )
      );
    }

    return this.props.children;
  }
}
