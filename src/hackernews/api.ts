const api = `https://hacker-news.firebaseio.com/v0`;
const json = ".json?print=pretty";

function removeDead(posts: Item[]) {
  return posts.filter(Boolean).filter(({ dead }) => dead !== true);
}

function removeDeleted(posts: Item[]) {
  return posts.filter(({ deleted }) => deleted !== true);
}

function onlyComments(posts: Item[]) {
  return posts.filter(({ type }) => type === "comment");
}

function onlyPosts(posts: Item[]) {
  return posts.filter(({ type }) => type === "story") as Story[];
}

export function fetchItem(id: number) {
  return fetch(`${api}/item/${id}${json}`).then((res) => res.json());
}

export async function fetchCommentsWithId(
  ids: number[],
  depth: number = 0,
  start: number = 0,
  end: number = 25,
  maxDepth: number = 3
): Promise<Comment[]> {
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

export async function fetchMainPosts() {
  const response = await fetch(
    "https://hn.flonatello.dev/.netlify/functions/hn"
  );
  return response.json();
}

export function fetchUser(id: string) {
  return fetch(`${api}/user/${id}${json}`).then((res) => res.json());
}

export function fetchPosts(ids: number[]) {
  return Promise.all(ids.map(fetchItem)).then((posts: Item[]) =>
    removeDeleted(onlyPosts(removeDead(posts)))
  );
}

export interface Item {
  by: string;
  id: number | string;
  kids: number[];
  type: "story" | "comment";
  time: number;
  dead: boolean;
  deleted: boolean;
  descendants: number;
  text: string;
}

export interface Story extends Item {
  score: number;
  title: string;
  url: string;
  type: "story";
  comments?: Comment[];
}

export interface Comment extends Item {
  parent: number;
  type: "comment";
  children: Comment[];
  depth: number;
}

export interface User {
  about: string;
  created: number;
  delay: number;
  id: string;
  karma: number;
  submitted: number;
}
