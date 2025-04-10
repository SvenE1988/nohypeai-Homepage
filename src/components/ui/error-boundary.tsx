
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "./button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  resetErrorBoundary = (): void => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-[200px] p-6 text-center bg-black/5 dark:bg-white/5 border border-border rounded-lg">
          <div className="flex flex-col items-center space-y-4 max-w-md">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full text-red-600 dark:text-red-400">
              <AlertCircle strokeWidth={2} />
            </div>
            <h3 className="text-lg font-semibold">Ein Fehler ist aufgetreten</h3>
            <p className="text-sm text-muted-foreground">
              {this.state.error?.message || "Es gab ein Problem beim Rendern dieser Komponente."}
            </p>
            <Button 
              onClick={this.resetErrorBoundary}
              variant="outline" 
              className="mt-4 flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              Neu laden
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
