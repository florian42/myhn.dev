import React from "react";
import { Link } from "react-router-dom";

const Title: React.FC<{
  url: string;
  title: string;
  id: number | string;
}> = ({ url, title, id }) => {
  return url ? (
    <>
      <a className="link" href={url}>
        {title}
      </a>
      <span style={{ color: "hsl(201, 23%, 47%)" }}>
        {" "}
        {getDomainFromUrl(url)}
      </span>
    </>
  ) : (
    <Link className="link" to={`/post?id=${id}`}>
      {title}
    </Link>
  );
};

function getDomainFromUrl(url: string) {
  const parsedUrl = new URL(url);
  return parsedUrl.hostname.replace("www.", "");
}

export default Title;
