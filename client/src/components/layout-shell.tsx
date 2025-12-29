import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Materi Video", href: "/dashboard" },
    { label: "Feed Artikel", href: "/feed" },
    { label: "Kuis Kesehatan", href: "/quiz" },
  ];

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href={user ? "/dashboard" : "/"}>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold font-display text-lg">R</span>
              </div>
              <span className="text-xl font-bold font-display text-foreground tracking-tight">RedUp</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          {user && (
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div 
                    className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                      location === item.href ? "text-primary font-bold" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </div>
                </Link>
              ))}
              <div className="h-6 w-px bg-border mx-2" />
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold text-foreground leading-none">{user.username}</span>
                  <span className="text-xs text-muted-foreground leading-none mt-1">Age: {user.age}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </nav>
          )}

          {!user && location !== "/login" && location !== "/register" && (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="font-semibold">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="font-semibold shadow-md shadow-primary/20">Get Started</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 z-40 bg-white pt-20 px-6 pb-6 flex flex-col gap-6"
          >
            {user ? (
              <>
                <div className="flex items-center justify-between py-4 border-b">
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">{user.fullName}</span>
                    <span className="text-sm text-muted-foreground">{user.email}</span>
                  </div>
                </div>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <div 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-lg font-medium py-2 border-b border-border/50 ${
                          location === item.href ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {item.label}
                      </div>
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto">
                  <Button 
                    className="w-full" 
                    variant="destructive" 
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4 mt-8">
                 <Link href="/login">
                  <Button className="w-full" variant="outline" onClick={() => setIsMobileMenuOpen(false)}>Login</Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full" onClick={() => setIsMobileMenuOpen(false)}>Register</Button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>

      <footer className="border-t py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RedUp Health Education. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
