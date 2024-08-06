import { Component, ReactNode } from 'react';

interface Props {
  onReset?: () => void;
  children: ReactNode;
  fallback: ({ reset }: { reset: (...args: unknown[]) => void }) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const initialState = {
  hasError: false,
  error: null,
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  resetQuery = () => {
    const { onReset } = this.props;
    onReset?.();
    this.setState(initialState);
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;
    if (hasError && error) {
      return fallback({ reset: this.resetQuery });
    }

    return children;
  }
}

export default ErrorBoundary;
