import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { PlayCircle, Award, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!user) {
    setLocation("/login");
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Halo, {user.fullName}! 👋
          </h1>
          <p className="text-primary-foreground/90 text-lg mb-8 leading-relaxed">
            Selamat datang kembali di RedUp. Lanjutkan pembelajaranmu tentang kesehatan reproduksi hari ini.
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            className="rounded-full font-bold shadow-lg"
            onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
          >
            Mulai Belajar
          </Button>
        </div>
        
        {/* Abstract shapes bg */}
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <path fill="#FFFFFF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.9,32.3C59.6,43.1,48.3,51.8,36.4,59.3C24.5,66.8,12,73.1,-1.8,76.2C-15.6,79.3,-29.9,79.2,-42.6,73C-55.3,66.8,-66.4,54.5,-74.6,40.5C-82.8,26.5,-88.1,10.8,-86.3,-4.2C-84.5,-19.2,-75.6,-33.5,-64.5,-44.6C-53.4,-55.7,-40.1,-63.6,-26.7,-71.3C-13.3,-79,-0.3,-86.5,13.9,-86.8C28.1,-87.1,56.2,-80.2,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      {/* Main Content Area - Video Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <PlayCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold font-display">Materi Video Hari Ini</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-lg border border-border/50">
               <iframe 
                 width="100%" 
                 height="100%" 
                 src="https://www.youtube.com/embed/o3LHWkbbU6M" 
                 title="YouTube video player" 
                 frameBorder="0" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                 allowFullScreen
               ></iframe>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-border/50">
              <h3 className="text-xl font-bold mb-2">Memahami Anemia dan Pencegahannya</h3>
              <p className="text-muted-foreground leading-relaxed">
                Video tersebut menjelaskan tentang anemia, yaitu kondisi ketika tubuh kekurangan sel darah merah atau hemoglobin sehingga kemampuan darah membawa oksigen menurun. Anemia dapat disebabkan oleh kekurangan zat besi, vitamin (seperti B12 dan asam folat), kehilangan darah, atau penyakit tertentu. Gejala yang umum dirasakan antara lain mudah lelah, lemas, pusing, wajah pucat, dan sulit berkonsentrasi. Video ini bertujuan memberi pemahaman dasar tentang pengertian, penyebab, dan dampak anemia bagi kesehatan agar masyarakat lebih sadar pentingnya pencegahan dan penanganan anemia.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-border/50 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Progress Belajar
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Materi Dasar</span>
                  <span className="font-bold text-primary">75%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-3/4 rounded-full" />
                </div>
                
                <div className="pt-4 border-t">
                   <p className="text-sm text-muted-foreground">Selesaikan kuis untuk mendapatkan sertifikat kelulusan materi ini.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => setLocation('/quiz')}>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-1">Mulai Kuis</h3>
                <p className="text-white/60 text-sm">Uji pemahamanmu sekarang</p>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                <Award className="w-32 h-32" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
         <Link href="/feed">
           <div className="bg-white p-6 rounded-2xl border border-border/50 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer flex items-center gap-4 group">
             <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
               <BookOpen className="w-8 h-8" />
             </div>
             <div>
               <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">Baca Artikel</h3>
               <p className="text-muted-foreground text-sm">Temukan informasi kesehatan terbaru</p>
             </div>
           </div>
         </Link>
         
         <Link href="/quiz">
           <div className="bg-white p-6 rounded-2xl border border-border/50 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer flex items-center gap-4 group">
             <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
               <Award className="w-8 h-8" />
             </div>
             <div>
               <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">Ambil Sertifikat</h3>
               <p className="text-muted-foreground text-sm">Kerjakan kuis dan dapatkan sertifikat</p>
             </div>
           </div>
         </Link>
      </section>
    </div>
  );
}
