import { useState } from "react";
import { useQuestions } from "@/hooks/use-content";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Award, RotateCcw, Download } from "lucide-react";
import jsPDF from "jspdf";
import logoImg from "/favicon.png"; // Assuming favicon acts as logo, or just text

export default function Quiz() {
  const { data: questions, isLoading } = useQuestions();
  const { user } = useAuth();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  
  // Calculate score
  const calculateScore = () => {
    if (!questions) return 0;
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) correct++;
    });
    return Math.round((correct / questions.length) * 100);
  };

  const handleAnswer = (optionIndex: number) => {
    if (!questions) return;
    const currentQ = questions[currentIndex];
    
    setAnswers(prev => ({ ...prev, [currentQ.id]: optionIndex }));
    
    // Delay next question for visual feedback if wanted, but simpler to just move next
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setShowResult(true);
      }
    }, 300);
  };

  const downloadCertificate = () => {
    if (!user) return;
    
    const doc = new jsPDF({
      orientation: "landscape",
    });

    // Simple Certificate Design
    doc.setFillColor(255, 45, 74); // Primary Red
    doc.rect(0, 0, 10, 210, "F"); // Left stripe
    doc.rect(287, 0, 10, 210, "F"); // Right stripe
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(40);
    doc.setTextColor(50, 50, 50);
    doc.text("SERTIFIKAT KELULUSAN", 148.5, 60, { align: "center" });
    
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Diberikan kepada:", 148.5, 80, { align: "center" });
    
    doc.setFontSize(32);
    doc.setFont("times", "bolditalic");
    doc.setTextColor(0, 0, 0);
    doc.text(user.fullName, 148.5, 105, { align: "center" });
    
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Telah menyelesaikan Kuis Kesehatan Reproduksi Remaja", 148.5, 130, { align: "center" });
    doc.text("dengan hasil SANGAT BAIK", 148.5, 140, { align: "center" });
    
    doc.setDrawColor(200, 200, 200);
    doc.line(70, 160, 227, 160);
    
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 148.5, 170, { align: "center" });
    doc.text("RedUp Education Platform", 148.5, 180, { align: "center" });

    doc.save("redup-certificate.pdf");
  };

  if (isLoading || !questions) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground font-medium">Memuat Soal Kuis...</p>
      </div>
    );
  }

  if (showResult) {
    const score = calculateScore();
    const passed = score >= 70;

    return (
      <div className="max-w-2xl mx-auto py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl border border-border/50 p-8 md:p-12 text-center"
        >
          {passed ? (
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-12 h-12" />
            </div>
          ) : (
            <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <RotateCcw className="w-12 h-12" />
            </div>
          )}

          <h2 className="text-3xl font-bold font-display mb-2">
            {passed ? "Selamat! Kamu Lulus" : "Jangan Menyerah!"}
          </h2>
          <p className="text-muted-foreground mb-8">
            Kamu mendapatkan skor <span className="font-bold text-foreground text-xl">{score}%</span>
          </p>

          <div className="flex flex-col gap-4 max-w-xs mx-auto">
            {passed && (
              <Button onClick={downloadCertificate} size="lg" className="w-full shadow-lg shadow-primary/20">
                <Download className="mr-2 h-4 w-4" /> Download Sertifikat
              </Button>
            )}
            <Button variant="outline" size="lg" onClick={() => {
              setShowResult(false);
              setCurrentIndex(0);
              setAnswers({});
            }}>
              Coba Lagi
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Progress Bar */}
      <div className="mb-8 space-y-2">
        <div className="flex justify-between text-sm font-medium text-muted-foreground">
          <span>Question {currentIndex + 1}/{questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-0 shadow-lg ring-1 ring-black/5 overflow-hidden">
            <div className="bg-primary/5 p-8 border-b border-primary/10">
              <h2 className="text-xl md:text-2xl font-bold font-display leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>
            <CardContent className="p-8 space-y-4">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="w-full text-left p-4 rounded-xl border-2 border-transparent bg-neutral-50 hover:bg-white hover:border-primary/50 hover:shadow-md transition-all duration-200 flex items-center group"
                >
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-neutral-300 flex items-center justify-center text-sm font-bold text-neutral-500 mr-4 group-hover:border-primary group-hover:text-primary transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-lg text-foreground/80 font-medium group-hover:text-foreground">{option}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
