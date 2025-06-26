export interface Song {
  id: string;
  title: string;
  artist: string;
  similarity: number;
  features: string[];
  albumArt?: string;
  previewUrl?: string;
}