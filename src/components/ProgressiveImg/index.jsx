import { useEffect, useState } from 'react';

export default function ProgressiveImg({
  src = '',
  alt = 'image',
  onClick = () => {},
}) {
  const placeholderSrc = src.replace(/\.webp$/, '_sm.webp');

  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, []);

  return (
    <img
      src={imgSrc}
      onClick={onClick}
      alt={alt}
      style={
        placeholderSrc && imgSrc === placeholderSrc
          ? { filter: 'blur(10px)', clipPath: 'inset(0)' }
          : { filter: 'blur(0px)', transition: 'filter 0.5s linear' }
      }
    />
  );
}
