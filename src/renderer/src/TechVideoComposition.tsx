import { AbsoluteFill } from 'remotion';

const nodeStyle = {
  alignItems: 'center',
  background: '#17243a',
  border: '2px solid #365277',
  borderRadius: 16,
  display: 'flex',
  fontSize: 28,
  fontWeight: 600,
  height: 96,
  justifyContent: 'center',
  width: 230,
} as const;

const connectorStyle = {
  background: '#45c8b0',
  height: 4,
  width: 72,
} as const;

export const TechVideoComposition = () => {
  return (
    <AbsoluteFill
      data-testid="tech-video-composition"
      style={{
        alignItems: 'center',
        background: 'linear-gradient(145deg, #0b1220 0%, #111d31 100%)',
        color: '#f4f7fb',
        fontFamily: 'Segoe UI, sans-serif',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          color: '#45c8b0',
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: 4,
          marginBottom: 24,
          textTransform: 'uppercase',
        }}
      >
        Esqueleto ejecutable
      </div>
      <div style={{ fontSize: 56, fontWeight: 700, marginBottom: 64 }}>
        Tech Video Generator
      </div>
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <div style={nodeStyle}>Interfaz</div>
        <div style={connectorStyle} />
        <div style={nodeStyle}>API local</div>
        <div style={connectorStyle} />
        <div style={nodeStyle}>Remotion</div>
      </div>
      <div style={{ color: '#9db0ca', fontSize: 24, marginTop: 48 }}>
        Composición estática y determinista
      </div>
    </AbsoluteFill>
  );
};
