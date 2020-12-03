import Link from "next/link";
import React, { Component, ReactNode } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}
export class ErrorBoundary extends Component<unknown, ErrorBoundaryState> {
  constructor(props: unknown) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(): void {
    this.setState({
      hasError: true,
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="container py-16">
          <div id="error" className="text-center">
            <img src="/static/images/errorpage/error.png" className="h-24 mx-auto" />
            <div className="my-8">
              <h2 className="font-bold text-orange mb-2">Something went wrong!</h2>
              <p>There is an error with this certificate, please contact your issuing institution.</p>
            </div>
            <Link href="/">
              <a className="button bg-navy">Go Back</a>
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
