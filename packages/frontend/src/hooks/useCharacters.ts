import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { CharacterBasicListResponse, CharacterInformation, FavoriteCharacterRequest } from "@rick-morty-app/libs";

export const useCharacters = (page: number = 1) => {
  return useQuery({
    queryKey: ["characters", page],
    queryFn: async (): Promise<CharacterBasicListResponse> => {
      const response = await api.get<CharacterBasicListResponse>(`/characters?page=${page}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCharacterDetails = (id: number) => {
  return useQuery({
    queryKey: ["character", id],
    queryFn: async (): Promise<CharacterInformation> => {
      const response = await api.get<CharacterInformation>(`/characters/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FavoriteCharacterRequest): Promise<void> => {
      await api.post("/characters/favorites", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    },
  });
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FavoriteCharacterRequest): Promise<void> => {
      await api.delete("/characters/favorites", { data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    },
  });
};
