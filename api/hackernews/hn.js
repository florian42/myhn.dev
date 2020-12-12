import { fetchPosts } from "./api";

exports.handler = async function (event, _context) {
  // your server-side functionality
  const pathParts = event.path.split("/");
  const job = pathParts[pathParts.length - 1];

  if (job === "hn") {
    const posts = await fetchPosts();
    return {
      statusCode: 200,
      body: JSON.stringify({ pathParam: posts }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ pathParam: job }),
  };
};
