import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { InstallPrompt } from "@/components/install-prompt";
import { motion } from "framer-motion";
import { HeartPulse, ShieldCheck, Brain, ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="flex flex-col">
      {/* Install Prompt Banner */}
      <InstallPrompt />

      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              Platform Edukasi Kesehatan #1
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-foreground leading-[1.1]">
              Kesehatan Remaja <br />
              <span className="text-primary">Masa Depan Bangsa</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            RedUp membantu remaja memahami kesehatan reproduksi dengan cara yang menyenangkan, interaktif, dan mudah dipahami.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
          >
            <Link href="/register">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all">
                Mulai Sekarang <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg border-2">
                Sudah punya akun?
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Visual / Image Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex-1 w-full max-w-xl relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl opacity-50" />
          <div className="relative glass rounded-3xl p-8 border border-white/40 shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
             {/* Abstract medical/health illustration constructed from icons */}
             <div className="grid grid-cols-2 gap-8">
               <div className="bg-red-50 p-6 rounded-2xl flex flex-col items-center gap-3 shadow-sm transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                 <HeartPulse className="w-16 h-16 text-primary" />
                 <span className="font-bold text-foreground">Kesehatan Fisik</span>
               </div>
               <div className="bg-blue-50 p-6 rounded-2xl flex flex-col items-center gap-3 shadow-sm transform rotate-6 hover:rotate-0 transition-transform duration-300 translate-y-8">
                 <ShieldCheck className="w-16 h-16 text-blue-500" />
                 <span className="font-bold text-foreground">Pencegahan</span>
               </div>
               <div className="bg-green-50 p-6 rounded-2xl flex flex-col items-center gap-3 shadow-sm transform rotate-3 hover:rotate-0 transition-transform duration-300 -translate-y-4">
                 <Brain className="w-16 h-16 text-green-500" />
                 <span className="font-bold text-foreground">Edukasi Mental</span>
               </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30 -mx-4 px-4 sm:-mx-8 sm:px-8 lg:-mx-16 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Fitur Utama</h2>
            <p className="text-muted-foreground text-lg">Semua yang kamu butuhkan untuk belajar</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Materi Video", desc: "Pembelajaran interaktif dengan video berkualitas.", icon: "🎥" },
              { title: "Artikel Harian", desc: "Update informasi kesehatan terkini setiap hari.", icon: "📰" },
              { title: "Kuis & Sertifikat", desc: "Uji pemahamanmu dan dapatkan apresiasi.", icon: "🏆" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-border/50 hover:border-primary/50 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
