import { CSSProperties } from "react";

interface Props {
  title: string;
  subtitle?: string;
  style?: CSSProperties;
}

export function Title({ title, subtitle, style }: Props) {
  return (
    <header className="mb-6" style={style}>
      <h1
        className="scroll-m-20 font-semibold tracking-tight text-2xl"
        style={{ viewTransitionName: `title` }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
      )}
    </header>
  );
}
