export async function fetchHottestStories(): Promise<LobstersStory[]> {
  const response = await fetch(
    "http://localhost:55799/.netlify/functions/lobsters"
  );
  return response.json();
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
