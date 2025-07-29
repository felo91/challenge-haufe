import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import { useAuthStore } from "@/stores/authStore";
import { LoginRequest, RegisterRequest, AuthResponse } from "@rick-morty-app/libs";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<AuthResponse> => {
      const response = await api.post<AuthResponse>("/auth/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      login(data);
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      navigate("/characters");
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (userData: RegisterRequest): Promise<AuthResponse> => {
      const response = await api.post<AuthResponse>("/auth/register", userData);
      return response.data;
    },
    onSuccess: (data) => {
      login(data);
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      navigate("/characters");
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);

  return () => {
    logout();
    queryClient.clear();
    navigate("/login");
  };
};
