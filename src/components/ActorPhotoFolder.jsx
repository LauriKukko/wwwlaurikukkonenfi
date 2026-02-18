import React, { useState, useCallback, useEffect, useRef } from "react";
import { useLang } from "../hooks/useLang";
import "../styles/ActorPhotos.css";

/**
 * Photos are loaded from src/images/actor-photos/photos.json
 *
 * To update photos:
 *   1. Place your .jpg/.png files in src/images/actor-photos/
 *   2. Edit photos.json — add/remove entries. Each entry:
 *      { "filename": "myphoto.jpg", "alt_en": "English alt", "alt_fi": "Finnish alt" }
 *   3. That's it — no code changes needed.
 */

// Import the manifest
import photoManifest from "../images/actor-photos/photos.json";

// Dynamically import all images from the actor-photos folder (Vite)
const imageModules = import.meta.glob(
  "../images/actor-photos/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" },
);

const imageFiles = {};
for (const [path, src] of Object.entries(imageModules)) {
  const filename = path.split("/").pop();
  imageFiles[filename] = src;
}

function ActorPhotoFolder() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { lang } = useLang();
  const touchStartX = useRef(0);

  // Filter manifest to only photos that have a matching file
  const photos = photoManifest
    .map((entry) => ({
      ...entry,
      src: imageFiles[entry.filename] || null,
      alt: lang === "fi" ? entry.alt_fi : entry.alt_en,
    }))
    .filter((p) => p.src);

  // If no real photos found, use picsum placeholders
  const displayPhotos =
    photos.length > 0
      ? photos
      : photoManifest.map((entry, i) => ({
          ...entry,
          src: `https://picsum.photos/seed/actor${i + 1}/600/800`,
          alt: lang === "fi" ? entry.alt_fi : entry.alt_en,
        }));

  const goTo = useCallback(
    (index) => {
      let target = index;
      if (target < 0) target = displayPhotos.length - 1;
      if (target >= displayPhotos.length) target = 0;
      setCurrentIndex(target);
    },
    [displayPhotos.length],
  );

  // Keyboard nav inside modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape" || e.key === "F3") {
        e.preventDefault();
        setIsOpen(false);
      }
      if (e.key === "ArrowRight") goTo(currentIndex + 1);
      if (e.key === "ArrowLeft") goTo(currentIndex - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, currentIndex, goTo]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
    }
  };

  const folderLabel = lang === "fi" ? "Kuvia minusta" : "Photos of me";
  const modalTitle = lang === "fi" ? "KUVIA MINUSTA" : "PHOTOS OF ME";

  return (
    <>
      <div className="actor-folder">
        <button
          className="actor-folder-btn"
          onClick={() => {
            setCurrentIndex(0);
            setIsOpen(true);
          }}
          aria-label={folderLabel}
        >
          <div className="folder-tab" />
          <div className="folder-body">
            <span className="folder-label">{folderLabel}</span>
          </div>
        </button>
      </div>

      {isOpen && displayPhotos.length > 0 && (
        <div
          className="photo-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
          role="dialog"
          aria-label={modalTitle}
        >
          <div className="photo-modal">
            <div className="photo-modal-header">
              <span className="photo-modal-title">{modalTitle}</span>
              <button
                className="photo-modal-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                ESC ✕
              </button>
            </div>

            <div
              className="photo-modal-carousel"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="photo-modal-track"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {displayPhotos.map((photo, i) => (
                  <div className="photo-modal-slide" key={i}>
                    <img src={photo.src} alt={photo.alt} />
                  </div>
                ))}
              </div>

              {displayPhotos.length > 1 && (
                <>
                  <button
                    className="photo-modal-nav photo-modal-nav--prev"
                    onClick={() => goTo(currentIndex - 1)}
                    aria-label="Previous"
                  >
                    &#9664;
                  </button>
                  <button
                    className="photo-modal-nav photo-modal-nav--next"
                    onClick={() => goTo(currentIndex + 1)}
                    aria-label="Next"
                  >
                    &#9654;
                  </button>
                </>
              )}
            </div>

            <div className="photo-modal-counter">
              {currentIndex + 1} / {displayPhotos.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ActorPhotoFolder;
