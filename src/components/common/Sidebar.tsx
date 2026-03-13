import React from 'react';
import { Nav, Badge, ProgressBar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { calculateLevel, calculateXPProgress, calculateXPForNextLevel } from '@/utils/helpers';
import { formatXP } from '@/utils/formatters';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { playerXP, playerName } = useAppSelector((s) => s.player);
  const { theme } = useAppSelector((s) => s.system);

  const level = calculateLevel(playerXP);
  const xpProgress = calculateXPProgress(playerXP);
  const xpForNextLevel = calculateXPForNextLevel();
  const xpPercent = Math.round((xpProgress / xpForNextLevel) * 100);

  const navItems = [
    { path: '/', icon: '🏠', label: 'Dashboard', badge: null },
    { path: '/game', icon: '🎮', label: 'Jogar', badge: 'NOVO' },
    { path: '/portal', icon: '👤', label: 'Meu Portal', badge: null },
    { path: '/dashboard', icon: '📊', label: 'Métricas', badge: null },
    { path: '/settings', icon: '⚙️', label: 'Configurações', badge: null },
  ];

  return (
    <aside
      className={`sidebar d-none d-lg-flex flex-column border-end ${
        theme === 'dark' ? 'bg-dark text-light' : 'bg-white'
      }`}
      style={{ minHeight: 'calc(100vh - 60px)' }}
    >
      {/* Player Info */}
      <div className="p-3 border-bottom">
        <div className="d-flex align-items-center gap-2 mb-2">
          <div
            className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-bold"
            style={{ width: 40, height: 40, flexShrink: 0 }}
          >
            {playerName.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <div className="fw-semibold text-truncate">{playerName}</div>
            <small className="text-muted">Nível {level} • {formatXP(playerXP)}</small>
          </div>
        </div>
        <ProgressBar
          now={xpPercent}
          variant="primary"
          style={{ height: 4, borderRadius: 2 }}
          title={`${xpPercent}% para o próximo nível`}
        />
        <small className="text-muted" style={{ fontSize: '0.7rem' }}>
          {xpProgress} / {xpForNextLevel} XP
        </small>
      </div>

      {/* Navigation */}
      <Nav className="flex-column px-2 py-2" as="nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Nav.Item key={item.path}>
              <Nav.Link
                as={Link}
                to={item.path}
                className={`d-flex align-items-center gap-2 rounded mb-1 px-3 py-2 ${
                  isActive
                    ? 'bg-primary text-white'
                    : theme === 'dark'
                    ? 'text-light'
                    : 'text-dark'
                }`}
                style={{ transition: 'all 0.15s ease' }}
              >
                <span>{item.icon}</span>
                <span className="flex-grow-1">{item.label}</span>
                {item.badge && (
                  <Badge bg="warning" text="dark" style={{ fontSize: '0.65rem' }}>
                    {item.badge}
                  </Badge>
                )}
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>

      {/* Footer */}
      <div className="mt-auto p-3 border-top">
        <small className="text-muted d-block text-center" style={{ fontSize: '0.7rem' }}>
          JavaBeans Player Portal
        </small>
        <small className="text-muted d-block text-center" style={{ fontSize: '0.65rem' }}>
          v1.0.0 • React + Bootstrap
        </small>
      </div>
    </aside>
  );
};

export default Sidebar;
