'use client';

import { getPageContent } from '@/lib/notion';
import Link from 'next/link';
import { useState } from 'react';
// app/page.tsx
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR('/api/notion', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data.results[0].id);

  // const loadContent = async (pageId: string) => {
  //   const pageContent = await getPageContent(pageId);
  //   console.log(pageContent);
  // };
  // loadContent(data.results[0].id);

  return (
    <div className="mx-3">
      <h1 className="my-5 text-3xl">Blog</h1>
      <div className="grid grid-cols-3 gap-2">
        {data.results.map((item: any) => (
          <Link
            key={item.id}
            href={item.properties.Slug.rich_text[0].plain_text}
          >
            <div className="border border-slate-600 bg-slate-100 hover:bg-slate-300 p-4 rounded-2xl">
              <h3 className="text-lg">
                {item.properties.名前.title[0].plain_text}
              </h3>
              <p className="text-sm text-slate-600">
                {item.properties.Description.rich_text[0].plain_text}
              </p>
              <p className="text-sm text-slate-600 mb-2">
                {item.properties.Date.date.start}
              </p>
              {item.properties.タグ.multi_select.map((tag: any) => (
                <span
                  key={tag.id}
                  className="text-sm bg-slate-600 text-slate-200 rounded-xl px-2 py-1 mr-1"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
