'use client';

import { useCallback, useRef, useState } from 'react';

type Side = 'front' | 'back';

export function MobilePassFlip() {
  const FLIP_MS = 820;
  const [side, setSide] = useState<Side>('front');
  const touchStartX = useRef<number | null>(null);
  const isAnimating = useRef(false);

  const flip = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setSide((prev) => (prev === 'front' ? 'back' : 'front'));
    window.setTimeout(() => {
      isAnimating.current = false;
    }, FLIP_MS);
  }, [FLIP_MS]);

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX == null) return;
    const endX = e.changedTouches[0]?.clientX ?? startX;
    const dx = endX - startX;
    if (Math.abs(dx) < 35) return;
    flip();
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      flip();
    }
  };

  return (
    <div className="m-pass">
      <div
        className="m-pass-card"
        role="button"
        tabIndex={0}
        aria-label="Schimba fata invitatiei"
        onClick={flip}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className={`m-pass-flip ${side === 'back' ? 'is-flipped' : ''}`}>
          <img
            className="m-pass-face m-pass-front"
            src="/Mobile%20WeddingPass%20front.svg"
            alt="Wedding pass - fata"
            draggable={false}
          />
          <img
            className="m-pass-face m-pass-back"
            src="/Mobile%20WeddingPass%20back.svg"
            alt="Wedding pass - verso"
            draggable={false}
          />
        </div>
      </div>

      <div className="m-pass-controls" aria-hidden="true">
        <button className="m-pass-arrow" type="button" onClick={flip} tabIndex={-1}>
          <img src="/wedding-arrow.svg" alt="" aria-hidden="true" draggable={false} />
        </button>
        <button className="m-pass-arrow" type="button" onClick={flip} tabIndex={-1}>
          <img
            className="m-pass-arrow-right"
            src="/wedding-arrow.svg"
            alt=""
            aria-hidden="true"
            draggable={false}
          />
        </button>
      </div>
    </div>
  );
}

