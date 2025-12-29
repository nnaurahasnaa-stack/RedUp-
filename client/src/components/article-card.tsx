import { Article } from "@shared/schema";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface ArticleCardProps {
  article: Article;
  index: number;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group flex flex-col bg-white rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="h-48 bg-muted relative overflow-hidden">
        {article.imageUrl ? (
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary/30">
            <BookOpen className="h-12 w-12 text-primary/20" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-primary shadow-sm backdrop-blur-sm">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="flex-1 p-6 flex flex-col">
        <h3 className="text-xl font-bold font-display text-foreground mb-2 line-clamp-2 leading-tight">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
          {article.excerpt}
        </p>
        
        <button className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
          Baca Selengkapnya <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
