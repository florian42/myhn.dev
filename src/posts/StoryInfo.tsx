import React from "react";
import { Link } from "react-router-dom";

const StoryInfo: React.FC<{ id: number | string; descendants: number }> = ({
  id,
  descendants,
}) => {
  return (
    <div className={`meta-info-light`}>
      {typeof descendants === "number" && (
        <span>
          with <Link to={`/post?id=${id}`}>{descendants}</Link> comments
        </span>
      )}
    </div>
  );
};

export default StoryInfo;
