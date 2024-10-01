"use client";
import Image from "next/image";
import { CSSProperties } from "react";

interface Props {
  src: string;
  style?: CSSProperties;
}
export function EventBestImage({ src, style }: Props) {
  return (
    <Image
      src={src}
      alt="cover"
      height={390}
      width={450}
      quality={90}
      className="shadow shadow-black rounded-lg w-full transition-all opacity-0"
      onLoad={(event) => {
        const image = event.target as HTMLElement;
        setTimeout(() => {
          image.classList.remove("opacity-0");
        }, 30);
      }}
      style={style}
    />
  );
}
