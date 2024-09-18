import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(err) {
    return { hasError: true };
  }
  componentDidCatch(err, errInfo) {
    console.error('Error Boundary caught an error:', err, errInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went Wrong, Please try again later</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
