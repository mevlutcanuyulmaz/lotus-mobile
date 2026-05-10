export interface RetrievalResultItem {
  segment_id: number;
  exercise_id: number;
  exercise_name: string;
  video_url: string;
  frame_start: number;
  frame_end: number;
  split?: string | null;
  score: number;
  text: string;
}

export interface RetrievalSearchResponse {
  query: string;
  top_k: number;
  result_count: number;
  results: RetrievalResultItem[];
}
