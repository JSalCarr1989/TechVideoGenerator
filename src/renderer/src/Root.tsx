import { Composition } from 'remotion';
import {
  COMPOSITION_DURATION_IN_FRAMES,
  COMPOSITION_FPS,
  COMPOSITION_HEIGHT,
  COMPOSITION_ID,
  COMPOSITION_WIDTH,
  TechVideoComposition,
} from './shared';

export const RemotionRoot = () => {
  return (
    <Composition
      id={COMPOSITION_ID}
      component={TechVideoComposition}
      durationInFrames={COMPOSITION_DURATION_IN_FRAMES}
      fps={COMPOSITION_FPS}
      width={COMPOSITION_WIDTH}
      height={COMPOSITION_HEIGHT}
    />
  );
};
