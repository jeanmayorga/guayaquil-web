interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <main className="container mx-auto max-w-5xl px-4 ms:px-0 my-8">
      <section>{children}</section>
    </main>
  );
}
