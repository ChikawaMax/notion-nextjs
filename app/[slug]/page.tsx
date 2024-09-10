'use client';

import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug;

  const { data, error } = useSWR('/api/notion', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const post = data.results.find(
    (post: any) => post.properties.Slug.rich_text[0]?.plain_text === slug
  );

  if (!post) return <div>Post not found</div>; // 一致する記事がない場合

  return (
    <div className="mx-6">
      <h1 className="my-5 text-3xl">
        {post.properties.名前.title[0].plain_text}
      </h1>
      <p className="text-sm text-indigo-600 mb-2">
        {post.properties.Date.date.start}
      </p>
      {post.properties.タグ.multi_select.map((tag: any) => (
        <span
          key={tag.id}
          className="text-sm bg-indigo-600 text-indigo-200 rounded-xl px-2 py-1 mr-1"
        >
          {tag.name}
        </span>
      ))}
      <div className="my-4 bg-indigo-50 p-4 rounded-md">
        <ReactMarkdown>{post.markdownContent.parent}</ReactMarkdown>
      </div>
    </div>
  );
}
