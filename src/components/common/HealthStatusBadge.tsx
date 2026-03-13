import React from 'react';
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import type { IAStatus, DBStatus, AppStatus } from '@/types';

type AnyStatus = IAStatus | DBStatus | AppStatus;

interface HealthStatusBadgeProps {
  status: AnyStatus | null | undefined;
  type?: 'ia' | 'db' | 'app';
  showLabel?: boolean;
  animated?: boolean;
}

const getVariant = (status: AnyStatus | null | undefined): string => {
  if (!status) return 'secondary';
  switch (status) {
    case 'UP':
    case 'RUNNING':
      return 'success';
    case 'CONFIGURED_BUT_UNREACHABLE':
      return 'warning';
    case 'DOWN':
    case 'STOPPED':
      return 'danger';
    case 'NOT_CONFIGURED':
      return 'secondary';
    default:
      return 'secondary';
  }
};

const getLabel = (status: AnyStatus | null | undefined, type?: string): string => {
  if (!status) return 'N/A';
  const labels: Record<string, string> = {
    UP: type === 'db' ? 'Online' : 'Ativo',
    DOWN: 'Offline',
    RUNNING: 'Rodando',
    STOPPED: 'Parado',
    CONFIGURED_BUT_UNREACHABLE: 'Inalcançável',
    NOT_CONFIGURED: 'Não Configurado',
  };
  return labels[status] ?? status;
};

const getIcon = (status: AnyStatus | null | undefined): string => {
  if (!status) return '○';
  switch (status) {
    case 'UP':
    case 'RUNNING':
      return '●';
    case 'CONFIGURED_BUT_UNREACHABLE':
      return '◐';
    case 'DOWN':
    case 'STOPPED':
      return '●';
    case 'NOT_CONFIGURED':
      return '○';
    default:
      return '○';
  }
};

const HealthStatusBadge: React.FC<HealthStatusBadgeProps> = ({
  status,
  type,
  showLabel = true,
  animated = false,
}) => {
  const variant = getVariant(status);
  const label = getLabel(status, type);
  const icon = getIcon(status);

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>Status: {status ?? 'Desconhecido'}</Tooltip>}
    >
      <Badge
        bg={variant}
        className={`d-inline-flex align-items-center gap-1 ${animated && variant === 'success' ? 'animate-pulse-success' : ''}`}
        style={{ fontSize: '0.8rem' }}
      >
        <span style={{ fontSize: '0.6rem' }}>{icon}</span>
        {showLabel && label}
      </Badge>
    </OverlayTrigger>
  );
};

export default HealthStatusBadge;
