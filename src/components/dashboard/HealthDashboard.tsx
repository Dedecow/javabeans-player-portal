import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import HealthStatusBadge from '@/components/common/HealthStatusBadge';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useHealth } from '@/hooks/useHealth';
import { formatTimestamp, formatLatency } from '@/utils/formatters';

const HealthDashboard: React.FC = () => {
  const { healthCheck, isLoading, isFetching, error, lastUpdate, refresh } = useHealth();

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <span>🔍</span>
          <span className="fw-semibold">Status do Sistema</span>
          {isFetching && <LoadingSpinner size="sm" message="" />}
        </div>
        <div className="d-flex align-items-center gap-2">
          {lastUpdate && (
            <small className="text-muted">{formatTimestamp(lastUpdate)}</small>
          )}
          <Button variant="outline-primary" size="sm" onClick={refresh} disabled={isLoading}>
            🔄 Atualizar
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        {isLoading && !healthCheck ? (
          <LoadingSpinner message="Verificando status..." />
        ) : error && !healthCheck ? (
          <div className="text-danger">
            <span>⚠️</span> {error}
          </div>
        ) : healthCheck ? (
          <Row className="g-3">
            <Col xs={12} sm={4}>
              <div className="border rounded p-3 text-center h-100">
                <div className="text-muted small mb-2 text-uppercase fw-semibold">
                  Inteligência Artificial
                </div>
                <HealthStatusBadge
                  status={healthCheck.iaStatus}
                  type="ia"
                  animated
                />
              </div>
            </Col>
            <Col xs={12} sm={4}>
              <div className="border rounded p-3 text-center h-100">
                <div className="text-muted small mb-2 text-uppercase fw-semibold">
                  Banco de Dados
                </div>
                <HealthStatusBadge
                  status={healthCheck.dbStatus}
                  type="db"
                  animated
                />
              </div>
            </Col>
            <Col xs={12} sm={4}>
              <div className="border rounded p-3 text-center h-100">
                <div className="text-muted small mb-2 text-uppercase fw-semibold">
                  Aplicação
                </div>
                <HealthStatusBadge
                  status={healthCheck.status}
                  type="app"
                  animated
                />
              </div>
            </Col>
            {healthCheck.latencyMs !== undefined && (
              <Col xs={12}>
                <div className="border rounded p-2 d-flex justify-content-between align-items-center">
                  <span className="text-muted small">Latência da API</span>
                  <span
                    className={`fw-semibold ${
                      healthCheck.latencyMs < 200
                        ? 'text-success'
                        : healthCheck.latencyMs < 500
                        ? 'text-warning'
                        : 'text-danger'
                    }`}
                  >
                    {formatLatency(healthCheck.latencyMs)}
                  </span>
                </div>
              </Col>
            )}
          </Row>
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default HealthDashboard;
