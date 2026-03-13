import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setApiUrl, setTheme, setNotificationsEnabled, setPollingEnabled } from '@/store/systemSlice';
import { setPlayerName, resetPlayer } from '@/store/playerSlice';
import { resetGame } from '@/store/gameSlice';
import { sessionService } from '@/services/api';
import { isValidApiUrl } from '@/utils/validators';

const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { apiUrl, theme, notificationsEnabled, pollingEnabled } = useAppSelector((s) => s.system);
  const { playerName } = useAppSelector((s) => s.player);

  const [localApiUrl, setLocalApiUrl] = useState(apiUrl);
  const [localPlayerName, setLocalPlayerName] = useState(playerName);
  const [apiUrlError, setApiUrlError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveApi = () => {
    if (!isValidApiUrl(localApiUrl)) {
      setApiUrlError('URL inválida. Use http:// ou https://');
      return;
    }
    setApiUrlError('');
    dispatch(setApiUrl(localApiUrl));
    toast.success('Configurações de API salvas!');
  };

  const handleSaveProfile = () => {
    if (localPlayerName.trim().length < 2) {
      toast.error('Nome muito curto. Mínimo 2 caracteres.');
      return;
    }
    dispatch(setPlayerName(localPlayerName.trim()));
    setSaveSuccess(true);
    toast.success('Perfil atualizado!');
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetGame = () => {
    if (window.confirm('Tem certeza? Todo o progresso local será perdido.')) {
      dispatch(resetGame());
      dispatch(resetPlayer());
      sessionService.clearSession();
      toast.info('Jogo reiniciado.');
    }
  };

  const handleExportData = () => {
    const data = sessionService.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'javabeans-data.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Dados exportados!');
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const json = evt.target?.result as string;
        sessionService.importData(json);
        toast.success('Dados importados com sucesso!');
      } catch {
        toast.error('Arquivo inválido.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">⚙️ Configurações</h2>
        <p className="text-muted mb-0">Personalize sua experiência</p>
      </div>

      <Row className="g-3">
        {/* Profile Settings */}
        <Col xs={12} md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header><span className="fw-semibold">👤 Perfil</span></Card.Header>
            <Card.Body>
              {saveSuccess && (
                <Alert variant="success" className="py-2">Perfil atualizado com sucesso!</Alert>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Nome do Jogador</Form.Label>
                <Form.Control
                  type="text"
                  value={localPlayerName}
                  onChange={(e) => setLocalPlayerName(e.target.value)}
                  maxLength={30}
                  placeholder="Seu nome..."
                />
                <Form.Text className="text-muted">
                  {localPlayerName.length}/30 caracteres
                </Form.Text>
              </Form.Group>
              <Button variant="primary" onClick={handleSaveProfile}>
                Salvar Perfil
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Theme Settings */}
        <Col xs={12} md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header><span className="fw-semibold">🎨 Aparência</span></Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Tema</Form.Label>
                <div className="d-flex gap-3">
                  {(['light', 'dark', 'auto'] as const).map((t) => (
                    <Form.Check
                      key={t}
                      type="radio"
                      id={`theme-${t}`}
                      label={t === 'light' ? '☀️ Claro' : t === 'dark' ? '🌙 Escuro' : '🌗 Auto'}
                      name="theme"
                      checked={theme === t}
                      onChange={() => {
                        dispatch(setTheme(t));
                        const effective = t === 'auto'
                          ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                          : t;
                        document.documentElement.setAttribute('data-bs-theme', effective);
                      }}
                    />
                  ))}
                </div>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* API Settings */}
        <Col xs={12} md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header><span className="fw-semibold">🔌 API Backend</span></Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>URL da API</Form.Label>
                <Form.Control
                  type="url"
                  value={localApiUrl}
                  onChange={(e) => {
                    setLocalApiUrl(e.target.value);
                    setApiUrlError('');
                  }}
                  isInvalid={!!apiUrlError}
                  placeholder="http://localhost:8080"
                />
                <Form.Control.Feedback type="invalid">{apiUrlError}</Form.Control.Feedback>
                <Form.Text className="text-muted">URL base do backend javabeans-IA</Form.Text>
              </Form.Group>
              <Button variant="primary" onClick={handleSaveApi}>
                Salvar URL
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Notifications */}
        <Col xs={12} md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header><span className="fw-semibold">🔔 Notificações</span></Card.Header>
            <Card.Body>
              <Form.Check
                type="switch"
                id="notifications-switch"
                label="Ativar notificações"
                checked={notificationsEnabled}
                onChange={(e) => dispatch(setNotificationsEnabled(e.target.checked))}
                className="mb-3"
              />
              <Form.Check
                type="switch"
                id="polling-switch"
                label="Health check automático (5s)"
                checked={pollingEnabled}
                onChange={(e) => dispatch(setPollingEnabled(e.target.checked))}
              />
            </Card.Body>
          </Card>
        </Col>

        {/* Data Management */}
        <Col xs={12}>
          <Card className="border-0 shadow-sm border-danger border-opacity-25">
            <Card.Header className="text-danger">
              <span className="fw-semibold">💾 Gerenciamento de Dados</span>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col xs={12} md={4}>
                  <Button variant="outline-primary" className="w-100" onClick={handleExportData}>
                    📤 Exportar Dados
                  </Button>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Label className="btn btn-outline-secondary w-100 mb-0" htmlFor="import-file">
                    📥 Importar Dados
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="import-file"
                    accept=".json"
                    className="d-none"
                    onChange={handleImportData}
                  />
                </Col>
                <Col xs={12} md={4}>
                  <Button variant="outline-danger" className="w-100" onClick={handleResetGame}>
                    🗑️ Resetar Jogo
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
