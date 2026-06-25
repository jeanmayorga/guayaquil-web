export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Datos estructurados para SEO (schema.org).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
