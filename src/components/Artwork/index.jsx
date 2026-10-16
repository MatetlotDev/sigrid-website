import { useEffect, useRef, useState } from 'react';
import { getGallery } from '../../motion/gallery';

// An image rendered through the WebGL layer when available, otherwise a
// progressive <img> that swaps its blurred placeholder for the full file.
export default function Artwork({
  src,
  alt = 'Painting by Sigrid Freyens',
  className,
  onClick,
  cursor,
  style,
}) {
  const ref = useRef(null);
  const placeholder = src.replace(/\.webp$/, '_sm.webp');
  const hasPlaceholder = placeholder !== src;
  const [loaded, setLoaded] = useState(!hasPlaceholder);
  // Placeholders are tiny squares, so the real aspect ratio comes from the
  // full-size file. Exposed as --ratio for layouts that need it.
  const [ratio, setRatio] = useState(null);
  const gallery = getGallery();

  useEffect(() => {
    if (!gallery || !ref.current) return undefined;
    return gallery.add(ref.current, src, (width, height) =>
      setRatio(width / height)
    );
  }, [gallery, src]);

  useEffect(() => {
    if (gallery) return undefined;
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setLoaded(true);
      setRatio(image.naturalWidth / image.naturalHeight);
    };
    return () => {
      image.onload = null;
    };
  }, [gallery, src]);

  return (
    <img
      ref={ref}
      data-gl={gallery ? '' : undefined}
      data-cursor={cursor}
      className={className}
      src={gallery || !loaded ? placeholder : src}
      alt={alt}
      onClick={onClick}
      draggable={false}
      style={{
        userSelect: 'none',
        filter: !gallery && !loaded ? 'blur(10px)' : 'none',
        transition: 'filter 0.6s linear',
        cursor: onClick ? 'pointer' : undefined,
        '--ratio': ratio || undefined,
        ...style,
      }}
    />
  );
}
