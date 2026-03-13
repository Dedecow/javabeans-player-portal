import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import HealthDashboard from '@/components/dashboard/HealthDashboard';
import GameMetrics from '@/components/dashboard/GameMetrics';
import SystemStatusChart from '@/components/dashboard/SystemStatusChart';
import LatencyMonitor from '@/components/dashboard/LatencyMonitor';

const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">🏠 Dashboard</h2>
          <p className="text-muted mb-0">
            Monitoramento em tempo real do sistema JavaBeans-IA
          </p>
        </div>
        <Button as="a" href="/game" variant="primary" size="lg">
          🎮 Jogar Agora
        </Button>
      </div>

      <Row className="g-3">
        <Col xs={12}>
          <HealthDashboard />
        </Col>
        <Col xs={12}>
          <GameMetrics />
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

export default HomePage;
