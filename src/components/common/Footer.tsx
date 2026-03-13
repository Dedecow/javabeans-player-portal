import React from 'react';
import { Container } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="border-top py-3 mt-auto">
      <Container fluid>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <span className="text-muted small">
            © 2025 JavaBeans Player Portal. Integrado com{' '}
            <span className="fw-semibold">javabeans-IA</span>
          </span>
          <div className="d-flex align-items-center gap-3">
            <small className="text-muted">React 18 + Bootstrap 5</small>
            <span className="text-muted">•</span>
            <small className="text-muted">TypeScript</small>
            <span className="text-muted">•</span>
            <small className="text-muted">Redux Toolkit</small>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
