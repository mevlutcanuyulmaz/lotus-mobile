import { searchRetrieval } from '../../services/retrieval';

export async function submitRetrievalSearchAction(query: string, topK = 10) {
  return searchRetrieval({
    query: query.trim(),
    top_k: topK,
  });
}
