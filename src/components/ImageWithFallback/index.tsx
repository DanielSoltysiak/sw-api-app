"use client";

import { useState, useEffect, CSSProperties } from "react";
import Image, { ImageProps } from "next/image";

interface Props {
  src: string;
  alt: string;
  fallback?: string;
  style?: CSSProperties;
  props?: ImageProps;
}

export const ImageWithFallback = ({
  src,
  alt,
  fallback = "/logo.png",
  style,
  ...props
}: Props) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <Image
      onError={() => setError(true)}
      src={error ? fallback : src}
      alt={alt}
      width={100}
      height={100}
      style={style}
      {...props}
    />
  );
};
