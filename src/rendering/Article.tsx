import React, { Fragment } from "react";
import { NotionText } from "./NotionText";
import Link from "next/link";
import { QuickSeo } from "next-quick-seo";
import { renderBlock } from "./renderBlock";

export function Article({ articleData }) {
  console.log('articleData: ', articleData);
  if(!articleData) return null;
  if(!articleData.page) return null;
  if(!articleData.blocks) return null;
  const { page, blocks } = articleData;
  return (
    <article className={"w-full"}>
      <QuickSeo title={page.properties.Name.title[0].plain_text} />
      <h1 className={""}>
        <NotionText text={page.properties.Name.title} />
      </h1>
      <section>
        {blocks.map((block) => (
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
        <Link href="/">
          <a className={""}>← Go home</a>
        </Link>
      </section>
    </article>
  );
}
