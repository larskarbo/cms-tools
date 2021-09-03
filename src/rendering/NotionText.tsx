import React from "react";
import QuickLink from "./components/QuickLink";

export const NotionText = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value, i) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        key={i}
        className={[
          bold ? "font-extrabold text-gray-50" : "",
          code ? "font-mono text-base bg-yellow-900 p-1 rounded" : "",
          italic ? "italic" : "",
          strikethrough ? "line-through" : "",
          underline ? "underline" : "",
        ].join(" ")}
        style={color !== "default" ? { color } : {}}
      >
        {text.link ? (
          <QuickLink href={text.link.url}>{text.content}</QuickLink>
        ) : (
          text.content.replace("quote:", "").replace("callout:", "")
        )}
      </span>
    );
  });
};
