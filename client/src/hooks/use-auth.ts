import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type LoginInput, type RegisterInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useAuth() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const userQuery = useQuery({
    queryKey: [api.auth.me.path],
    queryFn: async () => {
      const res = await fetch(api.auth.me.path);
      if (res.status === 401) return null;
      if (!res.ok) throw new Error("Failed to fetch user");
      return await res.json();
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginInput) => {
      const res = await fetch(api.auth.login.path, {
        method: api.auth.login.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        // Try to parse error message
        try {
          const error = await res.json();
          throw new Error(error.message || "Login failed");
        } catch (e) {
          throw new Error("Invalid username or password");
        }
      }
      return await res.json();
    },
    onSuccess: (user) => {
      queryClient.setQueryData([api.auth.me.path], user);
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
      const res = await fetch(api.auth.register.path, {
        method: api.auth.register.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
         try {
          const error = await res.json();
          throw new Error(error.message || "Registration failed");
        } catch (e) {
           throw new Error("Failed to register");
        }
      }
      return await res.json();
    },
    onSuccess: (user) => {
      // Auto login after register usually, or just redirect. 
      // Assuming the backend logs them in or we redirect to login.
      // For this app flow, we might want to automatically log them in or ask them to login.
      // Let's assume we redirect to login, but for better UX, let's treat it as success.
      queryClient.setQueryData([api.auth.me.path], null);
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
      const res = await fetch(api.auth.logout.path, {
        method: api.auth.logout.method,
      });
      if (!res.ok) throw new Error("Logout failed");
    },
    onSuccess: () => {
      queryClient.setQueryData([api.auth.me.path], null);
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
