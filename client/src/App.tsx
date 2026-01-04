import { Switch, Route } from "wouter";
import { useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LayoutShell } from "@/components/layout-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { InstallPrompt } from "@/components/install-prompt";

import Landing from "@/pages/landing";
import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/dashboard";
import Feed from "@/pages/feed";
import ArticleDetail from "@/pages/article-detail";
import Quiz from "@/pages/quiz";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <LayoutShell>
      <Switch>
        <Route path="/" component={Landing} />
        
        <Route path="/login">
          {() => <AuthPage mode="login" />}
        </Route>
        
        <Route path="/register">
          {() => <AuthPage mode="register" />}
        </Route>
        
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/feed" component={Feed} />
        <Route path="/article/:id" component={ArticleDetail} />
        <Route path="/quiz" component={Quiz} />
        
        <Route component={NotFound} />
      </Switch>
    </LayoutShell>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="redup-theme">
        <TooltipProvider>
          <Router />
          <InstallPrompt />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
