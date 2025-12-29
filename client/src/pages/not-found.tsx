import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 bg-red-50 text-destructive rounded-full flex items-center justify-center mb-6 animate-bounce">
        <AlertCircle className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-bold font-display mb-2">404 - Page Not Found</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        Halaman yang kamu cari tidak ditemukan atau telah dipindahkan.
      </p>
      <Link href="/">
        <Button size="lg" className="rounded-full shadow-lg">
          Kembali ke Beranda
        </Button>
      </Link>
    </div>
  );
}
