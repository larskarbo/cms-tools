import { QuickSeo } from "next-quick-seo";
import Link from "next/link";
import React from "react";
import { getPlainText } from "./getPlainText";
import { NotionText } from "./NotionText";

export function PostList({ posts }) {
  return (
    <main className={"w-full"}>
      <QuickSeo title={"Posts"} />
      <div>Posts</div>
      {posts.map((post) => {
        const date = new Date(post.last_edited_time).toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
        return (
          <li key={post.id} className={""}>
            <h3 className={""}>
              <Link href={`/blog/${getPlainText(post.properties.slug)}`}>
                <a>
                  <NotionText text={post.properties.Name.title} />
                </a>
              </Link>
            </h3>

            <p className={""}>{date}</p>
            <Link href={`/${post.id}`}>
              <a> Read post →</a>
            </Link>
          </li>
        );
      })}
    </main>
  );
}
