import { createActor } from "@/backend";
import type { ClassificationResult, Stats } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor) return { totalAnalyzed: 0n, totalSpam: 0n, totalHam: 0n };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).getStats() as Promise<Stats>;
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });
}

export function useClassifyMessage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<ClassificationResult, Error, string>({
    mutationFn: async (message: string) => {
      if (!actor) throw new Error("Actor not ready");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      ).classifyMessage(message) as Promise<ClassificationResult>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}
