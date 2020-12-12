import { Story } from "../hackernews/api";

export async function fetchHottestStories(): Promise<LobstersStory[]> {
  const response = await fetch("https://lobste.rs/hottest.json");
  return response.json();
}

export function mapToStory(stories: LobstersStory[]): Story[] {
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

export interface LobstersStory {
  short_id: string;
  short_id_url: string;
  created_at: string;
  title: string;
  url: string;
  score: number;
  flags: number;
  comment_count: number;
  description: string;
  comments_url: string;
  submitter_user: LobstersUser;
  tags: string[];
}

interface LobstersUser {
  username: string;
  created_at: string;
  is_admin: boolean;
  about: string;
  is_moderator: boolean;
  karma: number;
  avatar_url: string;
  invited_by_user: string;
}
