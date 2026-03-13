import React from 'react';
import { Navbar, Nav, Container, Badge, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setTheme } from '@/store/systemSlice';
import HealthStatusBadge from './HealthStatusBadge';
import { formatXP } from '@/utils/formatters';
import { calculateLevel } from '@/utils/helpers';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { healthCheck, theme } = useAppSelector((s) => s.system);
  const { playerXP, playerName } = useAppSelector((s) => s.player);
  const level = calculateLevel(playerXP);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
    document.documentElement.setAttribute('data-bs-theme', newTheme);
  };

  return (
    <Navbar
      expand="lg"
      className="border-bottom shadow-sm"
      style={{ height: '60px', zIndex: 1030 }}
      bg={theme === 'dark' ? 'dark' : 'white'}
      variant={theme === 'dark' ? 'dark' : 'light'}
      sticky="top"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <span style={{ fontSize: '1.5rem' }}>☕</span>
          <span className="fw-bold">JavaBeans</span>
          <Badge bg="primary" className="d-none d-md-inline-flex" style={{ fontSize: '0.65rem' }}>
            Portal
          </Badge>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/game">Jogar</Nav.Link>
            <Nav.Link as={Link} to="/portal">Portal</Nav.Link>
          </Nav>

          <Nav className="d-flex align-items-center gap-2">
            {healthCheck && (
              <div className="d-none d-lg-flex align-items-center gap-2 me-2">
                <small className="text-muted">IA:</small>
                <HealthStatusBadge status={healthCheck.iaStatus} type="ia" animated />
                <small className="text-muted ms-1">DB:</small>
                <HealthStatusBadge status={healthCheck.dbStatus} type="db" animated />
              </div>
            )}

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={toggleTheme}
              className="d-flex align-items-center"
              title="Alternar tema"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </Button>

            <NavDropdown
              title={
                <span className="d-flex align-items-center gap-2">
                  <span className="d-none d-md-inline fw-semibold">{playerName}</span>
                  <Badge bg="primary" pill>Lv.{level}</Badge>
                </span>
              }
              align="end"
            >
              <NavDropdown.Item className="text-center py-2">
                <div className="fw-bold">{playerName}</div>
                <small className="text-muted">{formatXP(playerXP)}</small>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => navigate('/portal')}>
                Meu Perfil
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/settings')}>
                Configurações
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
