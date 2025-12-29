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
        title: "5 Makanan Pencegah Anemia",
        excerpt: "Anemia terjadi akibat kekurangan sel darah merah atau hemoglobin, sering disebabkan oleh kurangnya zat besi, vitamin B12, folat, atau vitamin C.",
        content: `Anemia terjadi akibat kekurangan sel darah merah atau hemoglobin, sering disebabkan oleh kurangnya zat besi, vitamin B12, folat, atau vitamin C. Mengonsumsi makanan kaya nutrisi ini secara rutin dapat mencegah anemia dengan meningkatkan produksi darah merah.

Bayam
Bayam mengandung zat besi tinggi yang esensial untuk pembentukan hemoglobin, sehingga efektif mencegah anemia. Sayuran hijau ini juga menyediakan folat dan vitamin C untuk penyerapan zat besi optimal.

Daging Merah
Daging sapi atau domba tanpa lemak kaya zat besi heme yang mudah diserap tubuh, membantu mengatasi defisiensi besi penyebab anemia utama. Konsumsi 2-3 kali seminggu direkomendasikan untuk menjaga kadar hemoglobin.

Telur
Telur menyediakan zat besi, vitamin B12, dan protein yang mendukung produksi sel darah merah. Cocok dikonsumsi harian sebagai sarapan untuk pencegahan anemia pada semua usia.

Kurma
Kurma tinggi zat besi dan mineral lain yang membentuk energi serta mencegah kelelahan akibat anemia. Buah kering ini mudah dikonsumsi sebagai camilan sehat.

Brokoli
Brokoli mengandung zat besi, vitamin C, dan folat yang meningkatkan penyerapan besi serta produksi darah merah. Sayuran ini juga mendukung sistem kekebalan tubuh pada penderita anemia.`,
        category: "Nutrisi",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80"
      },
      {
        title: "Bahaya Anemia bagi Prestasi Belajar",
        excerpt: "Anemia merupakan kondisi kesehatan yang sering dialami remaja putri akibat kekurangan zat besi, yang mengurangi kadar hemoglobin dan pasokan oksigen ke otak.",
        content: `Anemia merupakan kondisi kesehatan yang sering dialami remaja putri akibat kekurangan zat besi, yang mengurangi kadar hemoglobin dan pasokan oksigen ke otak. Kondisi ini mengganggu fungsi kognitif seperti konsentrasi dan daya ingat, sehingga menurunkan prestasi belajar secara signifikan.

Latar Belakang
Anemia menyebabkan berkurangnya oksigenasi otak, yang memengaruhi metabolisme sel dan perkembangan intelektual. Penelitian menunjukkan prevalensi tinggi anemia pada siswi sekolah menengah, seperti 46,7% pada siswi SMP N 12 Yogyakarta, di mana 66,4% mengalami prestasi belajar tidak tuntas. Faktor penyebab utama meliputi asupan zat besi rendah, vitamin B12, dan asam folat, yang krusial untuk pembentukan sel darah merah.

Mekanisme Patofisiologi
Rendahnya hemoglobin menghambat transportasi oksigen, mengurangi laju metabolisme sel otak dan menimbulkan kesulitan konsentrasi serta pemrosesan informasi. Hal ini berdampak pada penurunan produktivitas belajar dan perkembangan psikomotor. Studi cross-sectional menemukan hubungan signifikan dengan uji Chi-Square (p < 0,001), membuktikan anemia sebagai determinan prestasi akademik rendah.

Bukti dari Penelitian
Beberapa studi di Indonesia menegaskan korelasi anemia dengan prestasi belajar. Pada siswi SMAN I Abiansemal, hubungan lemah namun tidak signifikan (p=0,091), sementara di sekolah lain seperti Baitul Hikmah, korelasi lemah dengan p=0,005. Sebanyak 61,5% siswi anemic cenderung gagal mencapai standar akademik.

Pencegahan dan Rekomendasi
Peningkatan konsumsi makanan sumber zat besi serta kepatuhan konsumsi Tablet Tambah Darah (TTD) sangat disarankan untuk menjaga kesehatan dan prestasi belajar remaja.`,
        category: "Edukasi",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
      },
      {
        title: "Mitos dan Fakta Seputar TTD",
        excerpt: "Tablet Tambah Darah (TTD) merupakan suplemen zat besi yang direkomendasikan untuk mencegah and mengatasi anemia, terutama pada remaja putri.",
        content: `Tablet Tambah Darah (TTD) merupakan suplemen zat besi yang direkomendasikan untuk mencegah dan mengatasi anemia, terutama pada remaja putri dan ibu hamil di Indonesia. Anemia memengaruhi sekitar 48,9% remaja dan 37,1% ibu hamil menurut data Riskesdas 2018, sering kali disebabkan oleh kekurangan zat besi akibat menstruasi or asupan gizi rendah.

Pengertian Anemia dan Peran TTD
Anemia didefinisikan sebagai kondisi di mana jumlah sel darah merah atau hemoglobin di bawah normal, menyebabkan oksigenasi jaringan terganggu. TTD mengandung zat besi, folat, dan vitamin lain yang membantu sintesis hemoglobin, dengan rekomendasi satu tablet per minggu untuk remaja putri.

Mitos Umum Seputar TTD
Banyak mitos menghambat penggunaan TTD, seperti anggapan bahwa TTD adalah obat biasa yang berbahaya jika dikonsumsi rutin. Mitos lain menyatakan konsumsi TTD menyebabkan tinja hitam permanen atau membuat bayi lahir besar, padahal efek samping seperti tinja hitam bersifat sementara dan tidak memengaruhi ukuran bayi. Selain itu, dipercaya TTD hanya untuk wanita, padahal pria, anak, dan lansia juga rentan anemia.

Fakta Ilmiah TTD
TTD bukan obat, melainkan suplemen aman yang meningkatkan kadar hemoglobin jika dikonsumsi tepat waktu, terbukti menurunkan prevalensi anemia pada kelompok target. Konsumsi bersamaan dengan teh atau kopi memang menghambat penyerapan zat besi, sehingga disarankan diminum setelah makan dengan vitamin C untuk optimalisasi.

Dampak dan Rekomendasi
Anemia yang diabaikan dapat menyebabkan gangguan kesehatan jangka panjang. Rutin mengonsumsi TTD sesuai anjuran tenaga medis adalah langkah preventif yang sangat efektif.`,
        category: "Mitos/Fakta",
        imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80"
      },
      {
        title: "Pentingnya Zat Besi untuk Remaja",
        excerpt: "Zat besi merupakan mineral esensial yang krusial bagi remaja untuk mencegah anemia dan mendukung pertumbuhan optimal.",
        content: `Zat besi merupakan mineral esensial yang krusial bagi remaja untuk mencegah anemia dan mendukung pertumbuhan optimal. Kekurangan zat besi sering menjadi penyebab utama anemia pada usia ini, yang dapat mengganggu konsentrasi belajar dan aktivitas sehari-hari.

Peran Zat Besi dalam Tubuh
Zat besi berfungsi utama dalam pembentukan hemoglobin, protein di sel darah merah yang mengangkut oksigen ke seluruh tubuh. Pada remaja, kebutuhan zat besi meningkat drastis akibat pertumbuhan cepat, terutama pada remaja putri yang mengalami menstruasi. Selain itu, zat besi mendukung produksi mioglobin untuk suplai oksigen ke otot serta meningkatkan sistem kekebalan tubuh.

Risiko Anemia pada Remaja
Anemia akibat defisiensi zat besi menyebabkan gejala seperti kelelahan, pusing, penurunan konsentrasi, dan imunitas lemah. Remaja putri berisiko lebih tinggi karena kehilangan darah menstruasi dan pola makan tidak seimbang, sementara remaja laki-laki juga rentan saat masa pubertas.

Kebutuhan Harian Zat Besi
Remaja perempuan usia 13-18 tahun membutuhkan sekitar 15-26 mg zat besi per hari, lebih tinggi daripada laki-laki yang sekitar 11 mg. Sumber makanan kaya zat besi meliputi daging merah, hati, bayam, kacang-kacangan, dan sereal yang difortifikasi. Kombinasikan dengan vitamin C dari jeruk atau tomat untuk penyerapan optimal.

Cara Mencegah Kekurangan Zat Besi
Penuhi asupan melalui pola makan seimbang dan periksa kesehatan rutin untuk deteksi dini anemia. Suplementasi tablet zat besi direkomendasikan untuk kelompok berisiko tinggi, seperti program pemerintah untuk remaja putri.`,
        category: "Nutrisi",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
      }
    ];

    for (const a of articles) {
      // @ts-ignore
      await storage.createArticle(a);
    }
  }
}
