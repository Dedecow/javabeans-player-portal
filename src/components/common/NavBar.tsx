import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

interface NavBarProps {
  items?: NavItem[];
  className?: string;
}

const DEFAULT_ITEMS: NavItem[] = [
  { path: '/', icon: '🏠', label: 'Início' },
  { path: '/game', icon: '🎮', label: 'Jogar' },
  { path: '/portal', icon: '👤', label: 'Portal' },
  { path: '/dashboard', icon: '📊', label: 'Métricas' },
  { path: '/settings', icon: '⚙️', label: 'Configurações' },
];

const NavBar: React.FC<NavBarProps> = ({ items = DEFAULT_ITEMS, className = '' }) => {
  const location = useLocation();

  return (
    <Nav className={`d-flex gap-1 ${className}`}>
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Nav.Item key={item.path}>
            <Nav.Link
              as={Link}
              to={item.path}
              className={`d-flex align-items-center gap-1 rounded px-3 py-2 ${
                isActive ? 'bg-primary text-white' : ''
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </Nav.Link>
          </Nav.Item>
        );
      })}
    </Nav>
  );
};

export default NavBar;
