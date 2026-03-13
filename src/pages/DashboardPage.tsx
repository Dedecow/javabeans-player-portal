import React from 'react';
import { Row, Col } from 'react-bootstrap';
import HealthDashboard from '@/components/dashboard/HealthDashboard';
import GameMetrics from '@/components/dashboard/GameMetrics';
import PlayerStats from '@/components/dashboard/PlayerStats';
import SystemStatusChart from '@/components/dashboard/SystemStatusChart';
import LatencyMonitor from '@/components/dashboard/LatencyMonitor';

const DashboardPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">📊 Métricas & Dashboard</h2>
        <p className="text-muted mb-0">Análise detalhada do sistema e seu desempenho</p>
      </div>

      <Row className="g-3">
        <Col xs={12}>
          <HealthDashboard />
        </Col>
        <Col xs={12} lg={6}>
          <GameMetrics />
        </Col>
        <Col xs={12} lg={6}>
          <PlayerStats />
        </Col>
        <Col xs={12} lg={8}>
          <SystemStatusChart />
        </Col>
        <Col xs={12} lg={4}>
          <LatencyMonitor />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
