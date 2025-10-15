export type Post = {
  post_id: string;
  user_id: string;
  type: string | null;
  details: string | null;
  longitude: number | null;
  latitude: number | null;
  created_at: string;
  image_url: string;
};
