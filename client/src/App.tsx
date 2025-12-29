import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LayoutShell } from "@/components/layout-shell";

import Landing from "@/pages/landing";
import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/dashboard";
import Feed from "@/pages/feed";
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
        <Route path="/quiz" component={Quiz} />
        
        <Route component={NotFound} />
      </Switch>
    </LayoutShell>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
