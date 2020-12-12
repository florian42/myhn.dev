const api = `https://hacker-news.firebaseio.com/v0`;
const json = ".json?print=pretty";

function removeDead(posts) {
  return posts.filter(Boolean).filter(({ dead }) => dead !== true);
}

function removeDeleted(posts) {
  return posts.filter(({ deleted }) => deleted !== true);
}

function onlyComments(posts) {
  return posts.filter(({ type }) => type === "comment");
}

function onlyPosts(posts) {
  return posts.filter(({ type }) => type === "story");
}

export function fetchItem(id) {
  return fetch(`${api}/item/${id}${json}`).then((res) => res.json());
}

export async function fetchCommentsWithId(
  ids,
  depth,
  start,
  end = 25,
  maxDepth = 3
) {
  depth++;
  if (depth >= maxDepth) {
    return [];
  }

  const commentIdsToFetch = ids.slice(start, end);
  let comments = await Promise.all(commentIdsToFetch.map(fetchItem));
  comments = removeDeleted(onlyComments(removeDead(comments)));
  comments = await Promise.all(
    comments.map(async (comment) => {
      comment["depth"] = depth;
      if (comment.kids && comment.kids.length) {
        const children = await fetchCommentsWithId(comment.kids, depth);
        comment["children"] = children;
      }
      return comment;
    })
  );
  return comments;
}

export function fetchMainPosts(type) {
  return fetch(`${api}/${type}stories${json}`)
    .then((res) => res.json())
    .then((ids) => {
      if (!ids) {
        throw new Error(`There was an error fetching the ${type} posts.`);
      }

      return ids.slice(0, 25);
    })
    .then((ids) => Promise.all(ids.map(fetchItem)))
    .then((posts) => onlyPosts(removeDeleted(removeDead(posts))));
}

export function fetchUser(id) {
  return fetch(`${api}/user/${id}${json}`).then((res) => res.json());
}

export function fetchPosts(ids) {
  return Promise.all(ids.map(fetchItem)).then((posts) =>
    removeDeleted(onlyPosts(removeDead(posts)))
  );
}
