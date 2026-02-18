import { useState, useEffect } from 'react';

/*
 * Photography Gallery Hook
 *
 * Loads photos from public/gallery/ at runtime.
 *
 * HOW TO UPDATE THE GALLERY:
 * 1. Drop your .jpg / .png / .webp files into: public/gallery/
 * 2. Edit public/gallery/photos.json — add an entry for each photo:
 *    { "filename": "myphoto.jpg", "alt_en": "Description", "alt_fi": "Kuvaus" }
 * 3. Deploy. That's it.
 *
 * The photos are served from the same GitHub Pages domain,
 * so there are no CORS issues or external API dependencies.
 */

function useGallery(lang) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchGallery() {
      try {
        // Fetch the manifest from the public folder
        const base = process.env.PUBLIC_URL || '';
        const response = await fetch(`${base}/gallery/photos.json`);
        if (!response.ok) {
          throw new Error(`Failed to load gallery manifest (${response.status})`);
        }

        const manifest = await response.json();
        if (cancelled) return;

        const images = manifest.map((entry, i) => ({
          id: String(i),
          media_url: `${base}/gallery/${entry.filename}`,
          caption: lang === 'fi' ? entry.alt_fi : entry.alt_en,
          permalink: '#',
        }));

        setPhotos(images);
      } catch (err) {
        if (cancelled) return;
        console.error('Gallery fetch error:', err);
        setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchGallery();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return { photos, loading, error };
}

export default useGallery;
