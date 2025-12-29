import { useArticles } from "@/hooks/use-content";
import { ArticleCard } from "@/components/article-card";
import { BookOpen, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Feed() {
  const { data: articles, isLoading } = useArticles();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Feed Artikel</h1>
          <p className="text-muted-foreground">Berita dan informasi kesehatan terkini untukmu.</p>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Cari artikel..." className="pl-10 h-10 rounded-full bg-white" />
          </div>
          <Button variant="outline" size="icon" className="rounded-full shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[1, 2, 3, 4, 5, 6].map((i) => (
             <div key={i} className="h-[400px] bg-neutral-100 animate-pulse rounded-2xl" />
           ))}
        </div>
      ) : (
        <>
          {articles?.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-bold">Belum ada artikel</h3>
              <p className="text-muted-foreground">Cek kembali nanti untuk update terbaru.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {articles?.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
