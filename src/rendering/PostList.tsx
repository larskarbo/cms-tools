import { QuickSeo } from "next-quick-seo";
import Link from "next/link";
import React from "react";
import { getPlainText } from "./getPlainText";
import { NotionText } from "./NotionText";

export function PostList({ posts }) {
  console.log('posts: ', posts);
  return (
    <main className={"w-full"}>
      <QuickSeo title={"Posts"} />
      <h1 className="text-5xl font-bold mb-8">Blog</h1>
      {posts.map((post) => {
        const date = new Date(post.last_edited_time).toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
        const link = `/blog/${getPlainText(post.properties.slug)}`;
        return (
          <li key={post.id} className={"list-none"}>
            <Link href={link}>
              <a className="">
                <h2 className={"text-lg font-semibold"}>
                  <NotionText text={post.properties.Name.title} />
                </h2>
              </a>
            </Link>

            <p className={"text-gray-100 my-4"}>{getPlainText(post.properties.description)}</p>
            <p className={"text-gray-300"}>{date}</p>
            <Link href={link}>
              <a className="text-blue-400 font-extrabold"> Read post →</a>
            </Link>
          </li>
        );
      })}
    </main>
  );
}
