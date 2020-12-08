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
  depth: number
): Promise<Comment[]> {
  if (typeof depth == "number") depth++;
  else depth = 1;
  let comments = await Promise.all(ids.map(fetchItem));
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

export function fetchMainPosts(type: "top" | "new" | "best") {
  return fetch(`${api}/${type}stories${json}`)
    .then((res) => res.json())
    .then((ids) => {
      if (!ids) {
        throw new Error(`There was an error fetching the ${type} posts.`);
      }

      return ids.slice(0, 50);
    })
    .then((ids: number[]) => Promise.all(ids.map(fetchItem)))
    .then((posts: Story[]) => onlyPosts(removeDeleted(removeDead(posts))));
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
  id: number;
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
