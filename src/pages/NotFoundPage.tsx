import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <Container className="text-center py-5 animate-bounce-in">
      <div style={{ fontSize: '6rem' }} className="mb-3">☕</div>
      <h1 className="display-4 fw-bold mb-3">404</h1>
      <h2 className="h4 mb-3 text-muted">Página não encontrada</h2>
      <p className="text-muted mb-4">
        Parece que esse café foi para um lugar que não existe...
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        🏠 Voltar ao Dashboard
      </Link>
    </Container>
  );
};

export default NotFoundPage;
