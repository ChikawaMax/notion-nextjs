// lib/notion.ts
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
export const getDatabase = async () => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID || '',
    });
    return response.results;
  } catch (error) {
    console.error('Error fetching database:', error);
    return null;
  }
};

const n2m = new NotionToMarkdown({ notionClient: notion });
export const getPageContent = async (pageId: string) => {
  try {
    const mdBlocks = await n2m.pageToMarkdown(pageId);
    const markdown = n2m.toMarkdownString(mdBlocks);
    return markdown;
  } catch (error) {
    console.error('Error fetching page content:', error);
    return null;
  }
};
