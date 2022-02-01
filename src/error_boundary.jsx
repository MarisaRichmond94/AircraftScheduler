import './error_boundary.scss';

import { Component } from 'react';

import img from 'assets/error.jpeg';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  };

  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div id='error-page'>
          <h1>
            If you see this page, it means an error was thrown.
            I'll just go ahead and assume it's gonna be a hard pass.
          </h1>
          <img src={img} alt='aight imma head out' />
        </div>
      );
    }

    return this.props.children;
  };
};

export default ErrorBoundary;
