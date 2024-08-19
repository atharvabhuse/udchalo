'use client';

import React, { ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

interface IState {
  hasError?: boolean;
  err: object;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      err: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ err: { error, errorInfo } });
    console.log({ error, errorInfo });
  }

  tryAgain() {
    this.setState({ hasError: false });
  }

  showError() {
    alert(`${JSON.stringify(this.state.err)}`);
    console.error('Error Boundry Log : ', this.state.err);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <center>
            <br />
            <br />
            <h2>An error occurred! You can: </h2>
            <br />
            <div>
              <button type="button" onClick={() => this.tryAgain()}>
                Reload The Component
              </button>
              <span> OR </span>
              <button type="button" onClick={() => this.showError()}>
                Log Error & Display The Error
              </button>
            </div>
          </center>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
