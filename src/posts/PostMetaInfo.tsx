import React from "react";
import { Link } from "react-router-dom";

export default function PostMetaInfo({ id, descendants }: PostMetaInfoProps) {
  return (
    <div className={`meta-info-light`}>
      {typeof descendants === "number" && (
        <span>
          with <Link to={`/post?id=${id}`}>{descendants}</Link> comments
        </span>
      )}
    </div>
  );
}

type PostMetaInfoProps = {
  id: number;
  descendants: number;
};
