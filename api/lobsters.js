const fetch = require("node-fetch");

const ALLOWED_ORIGINS = ["http://localhost:8888", "https://hn.flonatello.dev"];

exports.handler = async function (event, _context) {
  try {
    const origin = ALLOWED_ORIGINS.includes(event.headers.origin)
      ? event.headers.origin
      : "none";
    const posts = await fetchHottestStories();
    const stories = mapToStory(posts);
    return {
      statusCode: 200,
      headers: {
        "access-control-allow-origin": origin,
      },
      body: JSON.stringify(stories),
    };
  } catch (error) {
    return {
      statusCode: error.response.status,
      headers: {
        "access-control-allow-origin": "http://localhost:8888",
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};

class HTTPResponseError extends Error {
  constructor(response, ...args) {
    super(
      `HTTP Error Response: ${response.status} ${response.statusText}`,
      ...args
    );
    this.response = response;
  }
}

function checkStatusCode(res) {
  if (!res.ok) {
    throw new HTTPResponseError(res);
  }
  return res.json();
}

async function fetchHottestStories() {
  const response = await fetch("https://lobste.rs/hottest.json");
  return checkStatusCode(response);
}

function mapToStory(stories) {
  return stories.map((story) => {
    return {
      by: story.submitter_user.username,
      id: story.short_id,
      kids: [],
      type: "story",
      time: new Date(story.created_at).getMilliseconds(),
      dead: false,
      deleted: false,
      descendants: story.comment_count,
      text: story.description,
      score: story.score,
      title: story.title,
      url: story.url,
      comments: undefined,
    };
  });
}
