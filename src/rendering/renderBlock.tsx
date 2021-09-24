import React from "react";
import { Block, ImageBlock } from "@notionhq/client/build/src/api-types";
import { NotionText } from "./NotionText";

import Image from "next/image";

type ImgBlockWithMetaData = ImageBlock & {
  imgMetaInfo: {
    width: number,
    height: number,
  }
}

export const renderBlock = (block: Block | ImgBlockWithMetaData) => {
  let  type : any  = block.type;
  const { id } = block;
  const value = block[type];

  if (value.text?.[0]?.text?.content?.includes("quote:")) {
    type = "quote";
  }

  if (value.text?.[0]?.text?.content?.includes("callout:")) {
    type = "callout";
  }


  switch (type) {
    case "quote":
      return (
        <blockquote className="mb-8 relative p-4 text-xl italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-500 quote">
          <p className={`my-0`}>
            <NotionText text={value.text} />
          </p>
        </blockquote>
      );
    case "callout":
      return (
        <div className="bg-yellow-900 bg-opacity-50 p-8 pl-4 flex  border-yellow-600 border-l-4">
          <div className="mr-4">💡</div>
          <p className={`my-0`}>
            <NotionText text={value.text} />
          </p>
        </div>
      );
    case "paragraph":
      return (
        <p className={`my-8`}>
          <NotionText text={value.text} />
        </p>
      );
    case "heading_2":
      return (
        <h2 className="text-4xl mb-8 mt-20 font-medium leading-tight text-white">
          <NotionText text={value.text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3 className="text-2xl mb-8 mt-16 font-bold leading-tight text-white">
          <NotionText text={value.text} />
        </h3>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li className="mb-4">
          <NotionText text={value.text} />
        </li>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} /> <NotionText text={value.text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <NotionText text={value.text} />
          </summary>
          {value.children?.map((block) => (
            <React.Fragment key={block.id}>{renderBlock(block)}</React.Fragment>
          ))}
        </details>
      );
    case "child_page":
      return <p>{value.title}</p>;
    case "image":
      const imgBlock = block as ImgBlockWithMetaData;
      const src = value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption?.[0]?.plain_text : "";
      const aspectRatio = imgBlock.imgMetaInfo.width / imgBlock.imgMetaInfo.height
      const maxWidth = 830
      const width = imgBlock.imgMetaInfo.width < 830 ? imgBlock.imgMetaInfo.width : maxWidth
      const height = width / aspectRatio
      return (
        <figure>
          {/* @ts-ignore */}
          <Image src={src} alt={caption} width={width} height={height} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    default:
      return `❌ Unsupported block (${type === "unsupported" ? "unsupported by Notion API" : type})`;
  }
};
