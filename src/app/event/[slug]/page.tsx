import { redirect } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default function Page({ params }: Props) {
  const slug = params.slug;

  return redirect(`/events/${slug}`);
}
