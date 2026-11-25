import { Player } from '@remotion/player';
import {
  COMPOSITION_DURATION_IN_FRAMES,
  COMPOSITION_FPS,
  COMPOSITION_HEIGHT,
  COMPOSITION_WIDTH,
  TechVideoComposition,
} from '@tech-video-generator/renderer';
import { useEffect, useState } from 'react';

type HealthState =
  | { kind: 'loading' }
  | { kind: 'ready'; status: string }
  | { kind: 'error' };

export const App = () => {
  const [health, setHealth] = useState<HealthState>({ kind: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadHealth = async () => {
      setHealth({ kind: 'loading' });

      try {
        const response = await fetch('/api/health', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Health request failed with status ${response.status}`);
        }

        const payload = (await response.json()) as { status?: unknown };
        if (payload.status !== 'ok') {
          throw new Error('Health response did not contain a healthy status');
        }

        setHealth({ kind: 'ready', status: payload.status });
      } catch {
        if (!controller.signal.aborted) {
          setHealth({ kind: 'error' });
        }
      }
    };

    void loadHealth();
    return () => controller.abort();
  }, [attempt]);

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Aplicación web local</p>
          <h1>Tech Video Generator</h1>
          <p className="intro">
            Comprobación inicial de React, ASP.NET Core y una composición Remotion compartida.
          </p>
        </div>
        <div className="health-panel" aria-live="polite">
          <span className={`health-dot health-dot--${health.kind}`} aria-hidden="true" />
          <span data-testid="api-status">
            {health.kind === 'loading' && 'Comprobando API…'}
            {health.kind === 'ready' && `API disponible: ${health.status}`}
            {health.kind === 'error' && 'API no disponible. Comprueba que esté iniciada.'}
          </span>
          {health.kind === 'error' && (
            <button type="button" onClick={() => setAttempt((value) => value + 1)}>
              Reintentar
            </button>
          )}
        </div>
      </header>

      <section className="preview-section" aria-labelledby="preview-title">
        <div className="section-heading">
          <h2 id="preview-title">Vista previa de comprobación</h2>
          <p>1280 × 720 · 30 FPS · 5 segundos</p>
        </div>
        <div className="player-frame" data-testid="remotion-player">
          <Player
            component={TechVideoComposition}
            durationInFrames={COMPOSITION_DURATION_IN_FRAMES}
            fps={COMPOSITION_FPS}
            compositionWidth={COMPOSITION_WIDTH}
            compositionHeight={COMPOSITION_HEIGHT}
            controls
            style={{ width: '100%' }}
          />
        </div>
      </section>
    </main>
  );
};
