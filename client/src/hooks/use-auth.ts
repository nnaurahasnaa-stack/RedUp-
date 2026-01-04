import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  getCurrentUser,
  setCurrentUser,
  getUserByUsername,
  verifyPassword,
  saveUser,
  hashPassword,
  initializeStorage,
} from "@/lib/data";
import type { User } from "@shared/schema";

export interface LoginInput {
  username: string;
  password: string;
}

export interface RegisterInput {
  username: string;
  password: string;
  fullName: string;
  email: string;
  gender: string;
  age: number;
}

const AUTH_QUERY_KEY = ["auth", "user"];

export function useAuth() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Initialize storage on first load
  initializeStorage();

  const userQuery = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: () => {
      return getCurrentUser();
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginInput) => {
      const user = getUserByUsername(credentials.username);
      if (!user || !verifyPassword(credentials.password, user.password)) {
        throw new Error("Invalid username or password");
      }
      return user;
    },
    onSuccess: (user) => {
      setCurrentUser(user);
      queryClient.setQueryData(AUTH_QUERY_KEY, user);
      toast({
        title: "Welcome back!",
        description: `Successfully logged in as ${user.username}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterInput) => {
      const existing = getUserByUsername(data.username);
      if (existing) {
        throw new Error("Username already exists");
      }
      const newUser: User = {
        id: 0,
        username: data.username,
        password: hashPassword(data.password),
        fullName: data.fullName,
        email: data.email,
        gender: data.gender,
        age: data.age,
      };
      return saveUser(newUser);
    },
    onSuccess: (user) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      toast({
        title: "Account Created",
        description: "Please log in with your new credentials.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Client-side logout
      return Promise.resolve();
    },
    onSuccess: () => {
      setCurrentUser(null);
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      toast({
        title: "Logged Out",
        description: "See you next time!",
      });
    },
  });

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    login: loginMutation,
    register: registerMutation,
    logout: logoutMutation,
  };
}
