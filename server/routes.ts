import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Authentication
  setupAuth(app);

  // API Routes
  app.get("/api/questions", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    const questions = await storage.getQuestions();
    res.json(questions);
  });

  app.get("/api/articles", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    const articles = await storage.getArticles();
    res.json(articles);
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingQuestions = await storage.getQuestions();
  if (existingQuestions.length === 0) {
    const questions = [
      { 
        question: "Zat apa yang utama berperan dalam pembentukan hemoglobin?", 
        options: ["Vitamin C", "Zat Besi", "Kalsium", "Vitamin D"], 
        correct: 1, 
        explanation: "Zat besi adalah komponen utama heme dalam hemoglobin yang berfungsi mengikat oksigen." 
      },
      { 
        question: "Salah satu gejala anemia yang sering muncul adalah:", 
        options: ["Mudah lelah", "Mata semakin tajam", "Peningkatan nafsu makan", "Sakit telinga"], 
        correct: 0, 
        explanation: "Kekurangan oksigen di jaringan tubuh menyebabkan tubuh mudah lelah dan lesu." 
      },
      { 
        question: "Makanan sumber zat besi hewani yang baik adalah:", 
        options: ["Bayam", "Hati ayam", "Kopi", "Susu"], 
        correct: 1, 
        explanation: "Hati ayam mengandung zat besi heme yang sangat mudah diserap tubuh." 
      },
      { 
        question: "Vitamin apa yang membantu penyerapan zat besi?", 
        options: ["Vitamin A", "Vitamin C", "Vitamin K", "Vitamin E"], 
        correct: 1, 
        explanation: "Vitamin C mengubah zat besi non-heme menjadi bentuk yang lebih mudah diserap usus." 
      },
      { 
        question: "Penyebab anemia SELAIN kekurangan zat besi:", 
        options: ["Perdarahan kronis", "Defisiensi B12", "Infeksi kronis", "Semua jawaban benar"], 
        correct: 3, 
        explanation: "Anemia bisa disebabkan oleh kurang gizi, perdarahan, atau penyakit kronis." 
      },
      { 
        question: "Pemeriksaan lab utama untuk diagnosis anemia:", 
        options: ["Rontgen", "Hemoglobin (Hb)", "EKG", "USG"], 
        correct: 1, 
        explanation: "Kadar Hemoglobin (Hb) dalam darah adalah indikator utama anemia." 
      },
      { 
        question: "Hemoglobin rendah berarti:", 
        options: ["Suplai oksigen kurang efisien", "Tubuh kelebihan oksigen", "Paru-paru rusak", "Tidak ada hubungan"], 
        correct: 0, 
        explanation: "Hb berfungsi mengangkut oksigen. Jika rendah, transportasi oksigen terganggu." 
      },
      { 
        question: "Anemia pada remaja putri sering terkait dengan:", 
        options: ["Haid (Menstruasi)", "Kurang tidur", "Olahraga ringan", "Konsumsi Vitamin D"], 
        correct: 0, 
        explanation: "Kehilangan darah rutin saat menstruasi meningkatkan risiko defisiensi besi." 
      },
      { 
        question: "Sumber besi nabati yang relatif baik adalah:", 
        options: ["Jeruk", "Kacang-kacangan & Bayam", "Minyak goreng", "Gula"], 
        correct: 1, 
        explanation: "Kacang-kacangan dan sayuran hijau tua adalah sumber besi nabati (non-heme)." 
      },
      { 
        question: "Mengapa teh/kopi menghambat penyerapan besi?", 
        options: ["Kandungan Tanin/Kafein", "Meningkatkan ion besi", "Mengandung Vit C", "Tidak berpengaruh"], 
        correct: 0, 
        explanation: "Tanin dalam teh dan kafein dapat mengikat zat besi sehingga sulit diserap." 
      },
      { 
        question: "Berapa kadar Hb normal minimal pada remaja putri?", 
        options: ["10 g/dL", "12 g/dL", "14 g/dL", "16 g/dL"], 
        correct: 1, 
        explanation: "Menurut WHO, kadar Hb normal untuk remaja putri adalah minimal 12 g/dL." 
      },
      { 
        question: "Dampak jangka panjang anemia pada remaja adalah:", 
        options: ["Penurunan konsentrasi belajar", "Kulit menjadi lebih gelap", "Rambut tumbuh lebih cepat", "Tinggi badan bertambah"], 
        correct: 0, 
        explanation: "Anemia dapat menyebabkan penurunan fungsi kognitif dan konsentrasi belajar." 
      },
      { 
        question: "Tablet Tambah Darah (TTD) sebaiknya diminum dengan:", 
        options: ["Air teh", "Air susu", "Air jeruk/Air putih", "Kopi"], 
        correct: 2, 
        explanation: "Air jeruk (Vit C) membantu penyerapan, sedangkan teh/susu menghambat." 
      },
      { 
        question: "Frekuensi minum TTD untuk pencegahan anemia pada remaja putri:", 
        options: ["1x setahun", "1x sebulan", "1x seminggu", "Setiap hari"], 
        correct: 2, 
        explanation: "Program pemerintah menganjurkan minum TTD 1 tablet setiap minggu." 
      },
      { 
        question: "Apa fungsi sel darah merah?", 
        options: ["Membekukan darah", "Melawan infeksi", "Mengangkut oksigen", "Menyimpan cadangan air"], 
        correct: 2, 
        explanation: "Fungsi utama eritrosit (sel darah merah) adalah mengangkut oksigen ke seluruh tubuh." 
      },
      { 
        question: "Gejala anemia 5L terdiri dari, KECUALI:", 
        options: ["Lemah", "Letih", "Lesu", "Lapar"], 
        correct: 3, 
        explanation: "5L adalah Lemah, Letih, Lesu, Lelah, Lalai. Lapar bukan termasuk." 
      },
      { 
        question: "Zat yang dapat menghambat penyerapan zat besi disebut:", 
        options: ["Enhancer", "Inhibitor", "Promotor", "Katalisator"], 
        correct: 1, 
        explanation: "Inhibitor adalah zat yang menghambat penyerapan, seperti tanin dan fitat." 
      },
      { 
        question: "Daging merah adalah sumber zat besi jenis:", 
        options: ["Heme", "Non-heme", "Feritin", "Transferin"], 
        correct: 0, 
        explanation: "Daging merah mengandung zat besi heme yang mudah diserap." 
      },
      { 
        question: "Organ tubuh yang memproduksi sel darah merah adalah:", 
        options: ["Jantung", "Hati", "Sumsum tulang", "Ginjal"], 
        correct: 2, 
        explanation: "Sumsum tulang belakang adalah tempat produksi sel darah merah." 
      },
      { 
        question: "Untuk mencegah anemia, pola makan harus:", 
        options: ["Tinggi lemak", "Tinggi karbohidrat", "Gizi Seimbang kaya zat besi", "Rendah protein"], 
        correct: 2, 
        explanation: "Pola makan gizi seimbang dengan asupan zat besi cukup adalah kunci pencegahan." 
      },
    ];

    for (const q of questions) {
      // @ts-ignore
      await storage.createQuestion(q);
    }
  }

  const existingArticles = await storage.getArticles();
  if (existingArticles.length === 0) {
    const articles = [
      {
        title: "Pentingnya Zat Besi untuk Remaja",
        excerpt: "Mengapa zat besi sangat krusial di masa pertumbuhan?",
        content: "Zat besi memegang peranan penting dalam pembentukan hemoglobin...",
        category: "Nutrisi",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
      },
      {
        title: "5 Makanan Pencegah Anemia",
        excerpt: "Daftar makanan super untuk melawan kurang darah.",
        content: "Bayam, hati ayam, daging merah, dan kacang-kacangan adalah...",
        category: "Tips Sehat",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80"
      },
      {
        title: "Bahaya Anemia bagi Prestasi Belajar",
        excerpt: "Kurang darah bisa bikin nilai turun? Simak penjelasannya.",
        content: "Anemia menyebabkan suplai oksigen ke otak berkurang, sehingga...",
        category: "Edukasi",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
      },
      {
        title: "Mitos dan Fakta seputar TTD",
        excerpt: "Apakah TTD bikin gemuk? Cek faktanya di sini.",
        content: "Banyak mitos beredar tentang Tablet Tambah Darah, padahal...",
        category: "Mitos/Fakta",
        imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80"
      }
    ];

    for (const a of articles) {
      // @ts-ignore
      await storage.createArticle(a);
    }
  }
}
