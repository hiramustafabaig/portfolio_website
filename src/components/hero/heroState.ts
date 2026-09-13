// A shared, mutable, non-reactive state bag passed between hero sub-components.
// Reading/writing plain object fields inside useFrame avoids React re-renders
// on every pointer move / scroll tick, which matters for a 60fps WebGL scene.
export type HeroState = {
  pointer: { x: number; y: number };
  hovered: boolean;
  scroll: number; // 0..1 progress through the hero's own height
  reducedMotion: boolean;
};

export function createHeroState(reducedMotion: boolean): HeroState {
  return {
    pointer: { x: 0, y: 0 },
    hovered: false,
    scroll: 0,
    reducedMotion,
  };
}
