import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const slug = params.slug;

  return redirect(`/events/${slug}`);
}
