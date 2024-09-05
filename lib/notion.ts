// lib/notion.ts
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

export const getDatabase = async () => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID || '',
    });
    const results = response.results;

    // 各ページをマークダウンに変換
    const pagesWithMarkdown = await Promise.all(
      results.map(async (page) => {
        const mdBlocks = await n2m.pageToMarkdown(page.id);
        const mdString = n2m.toMarkdownString(mdBlocks); // 文字列に変換

        return {
          ...page,
          markdownContent: mdString, // マークダウン文字列を追加
        };
      })
    );

    return pagesWithMarkdown;
  } catch (error) {
    console.error('Error fetching database:', error);
    return null;
  }
};
