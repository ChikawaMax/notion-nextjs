'use client';

import Link from 'next/link';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR('/api/notion', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="mx-3">
      <div className="grid grid-cols-4 gap-2">
        {data.results.map((item: any) => (
          <div className="border border-indigo-600 bg-indigo-100 p-4 rounded-2xl">
            <Link
              key={item.id}
              href={item.properties.Slug.rich_text[0].plain_text}
            >
              <h3 className="text-lg hover:border hover:border-b-black inline">
                {item.properties.名前.title[0].plain_text}
              </h3>
            </Link>

            <p className="text-sm">
              {item.properties.Description.rich_text[0].plain_text}
            </p>
            <p className="text-sm text-indigo-600 mb-2">
              {item.properties.Date.date.start}
            </p>
            {item.properties.タグ.multi_select.map((tag: any) => (
              <span
                key={tag.id}
                className="text-sm bg-indigo-600 text-indigo-200 rounded-xl px-2 py-1 mr-1"
              >
                {tag.name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
