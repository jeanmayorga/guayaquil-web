"use client";
import Image from "next/image";
import { CSSProperties } from "react";

interface Props {
  src: string;
  style?: CSSProperties;
}
export function EventBestImage({ src, style }: Props) {
  return (
    <div className="bg-black shadow shadow-black rounded-lg overflow-hidden transition-all w-full">
      <Image
        src={src}
        alt="cover"
        height={390}
        width={450}
        quality={90}
        className="w-full transition-all opacity-0"
        onLoad={(event) => {
          const image = event.target as HTMLElement;
          setTimeout(() => {
            image.classList.remove("opacity-0");
          }, 100);
        }}
        style={style}
      />
    </div>
  );
}
