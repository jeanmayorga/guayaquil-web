import { CSSProperties } from "react";

interface Props {
  title: string;
  style?: CSSProperties;
}

export function Title({ title, style }: Props) {
  return (
    <header className="mb-4" style={{ viewTransitionName: `title` }}>
      <h1 className="scroll-m-20 font-semibold tracking-tight text-5xl mb-4 block">
        {title}
      </h1>
    </header>
  );
}
