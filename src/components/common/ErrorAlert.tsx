import React from 'react';
import { Alert, Button } from 'react-bootstrap';

interface ErrorAlertProps {
  message: string;
  title?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  title = 'Erro',
  onRetry,
  onDismiss,
  variant = 'danger',
}) => {
  return (
    <Alert variant={variant} onClose={onDismiss} dismissible={!!onDismiss}>
      <Alert.Heading>{title}</Alert.Heading>
      <p className="mb-0">{message}</p>
      {onRetry && (
        <div className="mt-2">
          <Button variant={`outline-${variant}`} size="sm" onClick={onRetry}>
            Tentar novamente
          </Button>
        </div>
      )}
    </Alert>
  );
};

export default ErrorAlert;
