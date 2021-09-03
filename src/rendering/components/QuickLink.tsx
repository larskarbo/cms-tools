import Link from "next/link";
import React from "react";

export default function QuickLink({ href, children }) {
  const classNames = "text-blue-400 font-extrabold hover:underline";
  if (href.includes("http")) {
    return (
      <a className={classNames} href={href}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href}>
      <a className={classNames}>{children}</a>
    </Link>
  );
}
