import { useArticles } from "@/hooks/use-content";
import { useArticles as useArticleById } from "@/hooks/use-content"; // Fallback if no single fetch
import { useParams, useLocation } from "wouter";
import { ArrowLeft, Calendar, User, Tag, Share2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { data: articles, isLoading } = useArticles();
  
  const article = articles?.find(a => a.id === Number(id));

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 py-8 px-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-[400px] w-full rounded-3xl" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <div className="space-y-2 pt-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Artikel tidak ditemukan</h2>
        <Button onClick={() => setLocation("/feed")} className="mt-4">
          Kembali ke Feed
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto py-8 px-4"
    >
      <Button 
        variant="ghost" 
        onClick={() => setLocation("/feed")}
        className="mb-8 group"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Kembali ke Feed
      </Button>

      <article className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              {article.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm border-y py-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Tim Medis RedUp</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>29 Des 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span>Edukasi Kesehatan</span>
            </div>
          </div>
        </div>

        {article.imageUrl && (
          <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-red max-w-none dark:prose-invert">
          <p className="text-xl text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-6 mb-8">
            {article.excerpt}
          </p>
          <div className="text-lg leading-relaxed space-y-6">
            {article.content.split('\n').map((para, i) => (
              para.trim() && <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        <div className="pt-12 border-t flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              <Share2 className="mr-2 h-4 w-4" /> Bagikan
            </Button>
            <Button variant="outline" size="sm" className="rounded-full" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" /> Cetak
            </Button>
          </div>
          <div className="flex items-center gap-2">
             <span className="text-sm text-muted-foreground">Topik terkait:</span>
             <span className="text-xs bg-muted px-2 py-1 rounded">Anemia</span>
             <span className="text-xs bg-muted px-2 py-1 rounded">Kesehatan Remaja</span>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
