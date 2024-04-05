export default async function PostCreatePage({
  params
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <h1>Post create page {params.slug}</h1>
    </div>
  );
}
