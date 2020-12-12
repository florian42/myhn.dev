const fetch = require("node-fetch");

const ALLOWED_ORIGINS = ["http://localhost:8888", "https://hn.flonatello.dev"];

exports.handler = async function (event, _context) {
  try {
    const origin = ALLOWED_ORIGINS.includes(event.headers.origin)
      ? event.headers.origin
      : "none";
    const posts = await fetchMainPosts("top");
    return {
      statusCode: 200,
      headers: {
        "access-control-allow-origin": origin,
      },
      body: JSON.stringify(posts),
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

const api = `https://hacker-news.firebaseio.com/v0`;
const json = ".json?print=pretty";

function removeDead(posts) {
  return posts.filter(Boolean).filter(({ dead }) => dead !== true);
}

function removeDeleted(posts) {
  return posts.filter(({ deleted }) => deleted !== true);
}

function onlyPosts(posts) {
  return posts.filter(({ type }) => type === "story");
}

function fetchItem(id) {
  return fetch(`${api}/item/${id}${json}`).then((res) => res.json());
}

function fetchMainPosts(type) {
  return fetch(`${api}/${type}stories${json}`)
    .then((res) => {
      return checkStatusCode(res);
    })
    .then((ids) => {
      if (!ids) {
        throw new Error(`There was an error fetching the ${type} posts.`);
      }

      return ids.slice(0, 25);
    })
    .then((ids) => Promise.all(ids.map(fetchItem)))
    .then((posts) => onlyPosts(removeDeleted(removeDead(posts))));
}
