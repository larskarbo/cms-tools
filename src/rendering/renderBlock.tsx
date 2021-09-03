import React from "react";
import { Block } from "@notionhq/client/build/src/api-types";
import { NotionText } from "./NotionText";



export const renderBlock = (block: Block) => {
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
        <blockquote className="relative p-4 text-xl italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-500 quote">
          <p className="my-0">
            <NotionText text={value.text} />
          </p>
        </blockquote>
      );
    case "callout":
      return (
        <div className="bg-yellow-900 bg-opacity-50 p-8 pl-4 flex  border-yellow-600 border-l-4">
          <div className="mr-4">💡</div>
          <p className="my-0">
            <NotionText text={value.text} />
          </p>
        </div>
      );
    case "paragraph":
      return (
        <p>
          <NotionText text={value.text} />
        </p>
      );
    case "heading_1":
      return (
        <h1>
          <NotionText text={value.text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2>
          <NotionText text={value.text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3>
          <NotionText text={value.text} />
        </h3>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li>
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
      const src = value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption?.[0]?.plain_text : "";
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    default:
      return `❌ Unsupported block (${type === "unsupported" ? "unsupported by Notion API" : type})`;
  }
};
