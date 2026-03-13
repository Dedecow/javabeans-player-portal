import React from 'react';
import { Spinner } from 'react-bootstrap';

interface LoadingSpinnerProps {
  size?: 'sm' | undefined;
  message?: string;
  fullPage?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size,
  message = 'Carregando...',
  fullPage = false,
}) => {
  if (fullPage) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <Spinner animation="border" variant="primary" role="status" size={size}>
          <span className="visually-hidden">{message}</span>
        </Spinner>
        {message && <p className="mt-3 text-muted">{message}</p>}
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center gap-2">
      <Spinner animation="border" variant="primary" size={size} role="status">
        <span className="visually-hidden">{message}</span>
      </Spinner>
      {message && <span className="text-muted small">{message}</span>}
    </div>
  );
};

export default LoadingSpinner;
