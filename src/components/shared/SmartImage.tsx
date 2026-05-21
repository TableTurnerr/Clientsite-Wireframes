"use client";

/**
 * WIREFRAME VERSION of SmartImage.
 * Keeps the EXACT same props and the same outer wrapper classes as the real
 * component, so every image keeps its real dimensions / aspect ratio — but
 * renders a wireframe placeholder box instead of a photo.
 */

type SmartImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  imgClassName?: string;
  fallbackSrc?: string;
};

export default function SmartImage({
  alt,
  className = "",
  style,
}: SmartImageProps) {
  return (
    <div
      className={`relative overflow-hidden wireframe-img ${className}`}
      style={style}
      role="img"
      aria-label={alt}
    >
      <span className="wireframe-img-tag">IMG</span>
    </div>
  );
}
