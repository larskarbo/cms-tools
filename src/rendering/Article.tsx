import React, { Fragment } from "react";
import { NotionText } from "./NotionText";
import { QuickSeo } from "next-quick-seo";
import { renderBlock } from "./renderBlock";
import QuickLink from "./components/QuickLink";
import Head from "next/head";

export function Article({ articleData }) {
  console.log("articleData2: ", articleData);
  if (!articleData) return null;
  if (!articleData.page) return null;
  if (!articleData.blocks) return null;
  const { page, blocks } = articleData;
  return (
    <article className={"w-full text-gray-200 text-lg "}>
      <QuickSeo title={page.properties.Name.title[0].plain_text} />
      <Head>
        <meta name="author" content="Lars Karbo" />
      </Head>
      <h1 className={"text-5xl mb-16 font-bold leading-tight text-white"}>
        <NotionText text={page.properties.Name.title} />
      </h1>
      <section>
        {blocks.map((block) => (
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
        <QuickLink href="/">← Go home</QuickLink>
      </section>
    </article>
  );
}
