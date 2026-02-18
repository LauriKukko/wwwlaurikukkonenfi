import React, { useState, useRef, useCallback } from 'react';
import { useUI } from '../hooks/useContent';
import '../styles/Carousel.css';

function Carousel({ photos }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const ui = useUI();

  const goTo = useCallback(
    (index) => {
      let target = index;
      if (target < 0) target = photos.length - 1;
      if (target >= photos.length) target = 0;
      setCurrentIndex(target);
    },
    [photos.length]
  );

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
    }
  };

  if (!photos || photos.length === 0) return null;

  return (
    <div className="carousel-container">
      <p className="carousel-label">
        {ui.content.galleryLabel} — {currentIndex + 1} / {photos.length}
      </p>
      <div
        className="carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carousel-track"
          ref={trackRef}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {photos.map((photo) => (
            <div className="carousel-slide" key={photo.id}>
              <a
                href={photo.permalink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={photo.caption || 'Instagram photo'}
              >
                <img
                  src={photo.media_url}
                  alt={photo.caption || 'Instagram photo'}
                  loading="lazy"
                />
              </a>
              {photo.caption && (
                <div className="carousel-caption">{photo.caption}</div>
              )}
            </div>
          ))}
        </div>

        <button
          className="carousel-btn carousel-btn-prev"
          onClick={() => goTo(currentIndex - 1)}
          aria-label="Previous photo"
        >
          &#9664;
        </button>
        <button
          className="carousel-btn carousel-btn-next"
          onClick={() => goTo(currentIndex + 1)}
          aria-label="Next photo"
        >
          &#9654;
        </button>
      </div>

      <div className="carousel-dots" role="tablist">
        {photos.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === currentIndex ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}`}
            role="tab"
            aria-selected={i === currentIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
