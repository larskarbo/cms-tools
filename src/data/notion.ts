import { Client } from "@notionhq/client";
import { Filter } from "@notionhq/client/build/src/api-types";
import forceEnv from "force-env";

// Create an instance of Notyf
export let isNode;

try {
  isNode = typeof window == "undefined";
} catch (e) {
  isNode = true;
}

const notion = new Client({
  auth: isNode ? forceEnv("NOTION_TOKEN") : undefined,
});

const DB_ID = "5e0383030b774ca886b568a5111ad8c7";

const filters: Filter[] = [
  {
    property: "project",
    select: {
      equals: isNode ? forceEnv("CMS_PROJECT") : undefined,
    },
  },
  {
    property: "published",
    checkbox: {
      equals: true,
    },
  },
  {
    property: "published_date",
    date: {
      is_not_empty: true,
    },
  },
];

export const getDatabase = async () => {
  const response = await notion.databases.query({
    database_id: DB_ID,
    filter: {
      and: filters,
    },
  });
  return response.results;
};

export const getIdFromSlug = async (slug) => {
  const response = await notion.databases.query({
    database_id: DB_ID,
    filter: {
      and: [
        ...filters,
        {
          property: "slug",
          text: {
            equals: slug,
          },
        },
      ],
    },
  });
  return response.results?.[0].id;
};

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });
  return response.results;
};

// const isValid =
