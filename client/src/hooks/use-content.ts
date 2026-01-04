import { useQuery } from "@tanstack/react-query";
import { QUESTIONS, ARTICLES } from "@/lib/data";
import type { Question, Article } from "@shared/schema";

export function useQuestions() {
  return useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      // Return local data
      return QUESTIONS;
    },
  });
}

export function useArticles() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      // Return local data
      return ARTICLES;
    },
  });
}

