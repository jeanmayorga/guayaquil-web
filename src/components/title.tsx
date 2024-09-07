interface Props {
  title: string;
}

export function Title({ title }: Props) {
  return (
    <header className="mb-4">
      <h1 className="scroll-m-20 font-semibold tracking-tight text-5xl mb-4 block">
        {title}
      </h1>
    </header>
  );
}
