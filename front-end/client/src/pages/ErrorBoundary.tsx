import React, { ErrorInfo } from 'react'

interface State {
  hasError: boolean
}

class ErrorBoundary extends React.Component<{}, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return (this.props as { children: React.ReactNode }).children
  }
}

export default ErrorBoundary