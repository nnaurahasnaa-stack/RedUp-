// Client-side data storage
import type { User, Question, Article } from "@shared/schema";

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Zat apa yang utama berperan dalam pembentukan hemoglobin?",
    options: ["Vitamin C", "Zat Besi", "Kalsium", "Vitamin D"],
    correct: 1,
    explanation:
      "Zat besi adalah komponen utama heme dalam hemoglobin yang berfungsi mengikat oksigen.",
  },
  {
    id: 2,
    question: "Salah satu gejala anemia yang sering muncul adalah:",
    options: ["Mudah lelah", "Mata semakin tajam", "Peningkatan nafsu makan", "Sakit telinga"],
    correct: 0,
    explanation:
      "Kekurangan oksigen di jaringan tubuh menyebabkan tubuh mudah lelah dan lesu.",
  },
  {
    id: 3,
    question: "Makanan sumber zat besi hewani yang baik adalah:",
    options: ["Bayam", "Hati ayam", "Kopi", "Susu"],
    correct: 1,
    explanation: "Hati ayam mengandung zat besi heme yang sangat mudah diserap tubuh.",
  },
  {
    id: 4,
    question: "Vitamin apa yang membantu penyerapan zat besi?",
    options: ["Vitamin A", "Vitamin C", "Vitamin K", "Vitamin E"],
    correct: 1,
    explanation:
      "Vitamin C mengubah zat besi non-heme menjadi bentuk yang lebih mudah diserap usus.",
  },
  {
    id: 5,
    question: "Penyebab anemia SELAIN kekurangan zat besi:",
    options: [
      "Perdarahan kronis",
      "Defisiensi B12",
      "Infeksi kronis",
      "Semua jawaban benar",
    ],
    correct: 3,
    explanation:
      "Anemia bisa disebabkan oleh kurang gizi, perdarahan, atau penyakit kronis.",
  },
  {
    id: 6,
    question: "Pemeriksaan lab utama untuk diagnosis anemia:",
    options: ["Rontgen", "Hemoglobin (Hb)", "EKG", "USG"],
    correct: 1,
    explanation: "Kadar Hemoglobin (Hb) dalam darah adalah indikator utama anemia.",
  },
  {
    id: 7,
    question: "Hemoglobin rendah berarti:",
    options: [
      "Suplai oksigen kurang efisien",
      "Tubuh kelebihan oksigen",
      "Paru-paru rusak",
      "Tidak ada hubungan",
    ],
    correct: 0,
    explanation:
      "Hb berfungsi mengangkut oksigen. Jika rendah, transportasi oksigen terganggu.",
  },
  {
    id: 8,
    question: "Anemia pada remaja putri sering terkait dengan:",
    options: ["Haid (Menstruasi)", "Kurang tidur", "Olahraga ringan", "Konsumsi Vitamin D"],
    correct: 0,
    explanation:
      "Kehilangan darah rutin saat menstruasi meningkatkan risiko defisiensi besi.",
  },
  {
    id: 9,
    question: "Sumber besi nabati yang relatif baik adalah:",
    options: ["Jeruk", "Kacang-kacangan & Bayam", "Minyak goreng", "Gula"],
    correct: 1,
    explanation:
      "Kacang-kacangan dan sayuran hijau tua adalah sumber besi nabati (non-heme).",
  },
  {
    id: 10,
    question: "Mengapa teh/kopi menghambat penyerapan besi?",
    options: [
      "Kandungan Tanin/Kafein",
      "Meningkatkan ion besi",
      "Mengandung Vit C",
      "Tidak berpengaruh",
    ],
    correct: 0,
    explanation:
      "Tanin dalam teh dan kafein dapat mengikat zat besi sehingga sulit diserap.",
  },
  {
    id: 11,
    question: "Berapa kadar Hb normal minimal pada remaja putri?",
    options: ["10 g/dL", "12 g/dL", "14 g/dL", "16 g/dL"],
    correct: 1,
    explanation:
      "Menurut WHO, kadar Hb normal untuk remaja putri adalah minimal 12 g/dL.",
  },
  {
    id: 12,
    question: "Dampak jangka panjang anemia pada remaja adalah:",
    options: [
      "Penurunan konsentrasi belajar",
      "Kulit menjadi lebih gelap",
      "Rambut tumbuh lebih cepat",
      "Tinggi badan bertambah",
    ],
    correct: 0,
    explanation:
      "Anemia dapat menyebabkan penurunan fungsi kognitif dan konsentrasi belajar.",
  },
  {
    id: 13,
    question: "Tablet Tambah Darah (TTD) sebaiknya diminum dengan:",
    options: ["Air teh", "Air susu", "Air jeruk/Air putih", "Kopi"],
    correct: 2,
    explanation: "Air jeruk (Vit C) membantu penyerapan, sedangkan teh/susu menghambat.",
  },
  {
    id: 14,
    question: "Frekuensi minum TTD untuk pencegahan anemia pada remaja putri:",
    options: ["1x setahun", "1x sebulan", "1x seminggu", "Setiap hari"],
    correct: 2,
    explanation:
      "Program pemerintah menganjurkan minum TTD 1 tablet setiap minggu.",
  },
  {
    id: 15,
    question: "Apa fungsi sel darah merah?",
    options: [
      "Membekukan darah",
      "Melawan infeksi",
      "Mengangkut oksigen",
      "Menyimpan cadangan air",
    ],
    correct: 2,
    explanation:
      "Fungsi utama eritrosit (sel darah merah) adalah mengangkut oksigen ke seluruh tubuh.",
  },
  {
    id: 16,
    question: "Gejala anemia 5L terdiri dari, KECUALI:",
    options: ["Lemah", "Letih", "Lesu", "Lapar"],
    correct: 3,
    explanation:
      "5L adalah Lemah, Letih, Lesu, Lelah, Lalai. Lapar bukan termasuk.",
  },
  {
    id: 17,
    question: "Zat yang dapat menghambat penyerapan zat besi disebut:",
    options: ["Enhancer", "Inhibitor", "Promotor", "Katalisator"],
    correct: 1,
    explanation:
      "Inhibitor adalah zat yang menghambat penyerapan, seperti tanin dan fitat.",
  },
  {
    id: 18,
    question: "Daging merah adalah sumber zat besi jenis:",
    options: ["Heme", "Non-heme", "Feritin", "Transferin"],
    correct: 0,
    explanation: "Daging merah mengandung zat besi heme yang mudah diserap.",
  },
  {
    id: 19,
    question: "Organ tubuh yang memproduksi sel darah merah adalah:",
    options: ["Jantung", "Hati", "Sumsum tulang", "Ginjal"],
    correct: 2,
    explanation: "Sumsum tulang belakang adalah tempat produksi sel darah merah.",
  },
  {
    id: 20,
    question: "Nutrisi selain besi yang penting untuk mencegah anemia:",
    options: ["Lemak", "Protein", "Vitamin B12", "Semua jawaban benar"],
    correct: 3,
    explanation:
      "Protein, B12, folat, dan vitamin C semuanya penting dalam pembentukan sel darah merah.",
  },
];

export const ARTICLES: Article[] = [
  {
    id: 1,
    title: "5 Makanan Pencegah Anemia",
    excerpt: "Pelajari makanan-makanan yang dapat membantu mencegah dan mengatasi anemia.",
    content: `Anemia adalah kondisi ketika tubuh tidak memiliki cukup sel darah merah yang sehat. Ini bisa menyebabkan kelelahan, kelemahan, dan masalah kesehatan lainnya. Namun, dengan konsumsi makanan yang tepat, Anda dapat membantu mencegah dan mengatasi anemia.

Berikut adalah 5 makanan yang sangat baik untuk mencegah anemia:

**1. Hati Ayam**
Hati ayam adalah sumber zat besi heme yang luar biasa, yang mudah diserap oleh tubuh. Mengonsumsi hati ayam secara rutin dapat membantu meningkatkan kadar hemoglobin dengan cepat.

**2. Daging Merah**
Daging merah seperti daging sapi mengandung zat besi heme dalam jumlah tinggi. Satu porsi daging merah dapat memberikan asupan zat besi yang signifikan untuk kebutuhan harian.

**3. Ikan dan Seafood**
Ikan salmon, tuna, dan tiram kaya akan zat besi dan vitamin B12. Produk laut ini juga mengandung protein berkualitas tinggi yang penting untuk pembentukan darah.

**4. Kacang-kacangan**
Kacang merah, kedelai, dan kacang tanah adalah sumber zat besi nabati yang baik. Meskipun penyerapannya lebih rendah dibanding sumber hewani, kacang-kacangan tetap menjadi pilihan bergizi.

**5. Sayuran Hijau**
Bayam, brokoli, dan kangkung mengandung zat besi. Konsumsilah bersama vitamin C untuk meningkatkan penyerapan zat besi.

**Kesimpulan**
Penting untuk mengonsumsi makanan-makanan ini secara teratur dan dalam kombinasi dengan sumber vitamin C untuk meningkatkan penyerapan zat besi secara optimal.`,
    category: "Nutrisi",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
  },
  {
    id: 2,
    title: "Bahaya Anemia bagi Prestasi Belajar",
    excerpt: "Temukan bagaimana anemia dapat mempengaruhi kemampuan belajar dan prestasi akademik.",
    content: `Anemia tidak hanya mempengaruhi kesehatan fisik, tetapi juga kesehatan mental dan prestasi belajar. Penelitian telah menunjukkan hubungan yang jelas antara defisiensi zat besi dan penurunan fungsi kognitif.

**Dampak Anemia pada Prestasi Belajar:**

**1. Konsentrasi Menurun**
Ketika tubuh kekurangan oksigen karena anemia, otak tidak mendapatkan pasokan oksigen yang cukup, sehingga menyebabkan kesulitan berkonsentrasi. Siswa akan merasa sulit fokus selama belajar dan mengikuti pelajaran di kelas.

**2. Daya Ingat Lemah**
Kurangnya oksigen juga mempengaruhi kemampuan memori dan pembelajaran. Siswa dengan anemia akan kesulitan mengingat materi pelajaran yang telah diajarkan.

**3. Kelelahan Kronis**
Anemia menyebabkan tubuh selalu merasa lelah, sehingga sulit untuk belajar dengan efektif. Energi yang terbatas membuat siswa mudah mengantuk dan tidak bersemangat.

**4. Prestasi Akademik Menurun**
Akibat dari ketiga faktor di atas, nilai dan prestasi akademik cenderung menurun. Siswa dengan anemia sering mengalami penurunan nilai yang signifikan.

**5. Motivasi Rendah**
Ketika tubuh tidak sehat, motivasi untuk belajar dan mengikuti aktivitas sekolah juga menurun. Siswa menjadi apatis dan kurang antusias dalam proses pembelajaran.

**Kesimpulan**
Sangat penting untuk mendeteksi dan mengatasi anemia sejak dini, terutama pada remaja yang masih dalam masa pertumbuhan dan pendidikan. Pencegahan dan pengobatan anemia akan membantu meningkatkan prestasi akademik secara signifikan.`,
    category: "Kesehatan",
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
  },
  {
    id: 3,
    title: "Mitos dan Fakta Seputar TTD (Tablet Tambah Darah)",
    excerpt: "Bedakan mitos dan fakta tentang Tablet Tambah Darah yang sering dikonsumsi oleh remaja.",
    content: `Tablet Tambah Darah (TTD) adalah suplemen yang diberikan kepada remaja untuk mencegah anemia. Namun, banyak mitos yang beredar tentang TTD. Mari kita lihat fakta sesungguhnya.

**Mitos 1: TTD Menyebabkan Sakit Perut**

Fakta: TTD dapat menyebabkan efek samping seperti sembelit atau sakit perut jika diminum tanpa makanan. Untuk mengurangi efek samping, minumlah setelah makan dan jangan dengan minuman yang menghambat penyerapan seperti teh.

**Mitos 2: TTD Membuat Gigi Hitam Selamanya**

Fakta: Warna hitam pada gigi adalah bersifat sementara dan dapat dihilangkan dengan sikat gigi. Ini terjadi karena reaksi kimia besi dengan bakteri di mulut. Warna akan hilang setelah berhenti mengonsumsi TTD.

**Mitos 3: Minum TTD Akan Langsung Sembuh dari Anemia**

Fakta: Membutuhkan waktu berbulan-bulan untuk meningkatkan kadar zat besi dalam tubuh secara signifikan. Konsumsi rutin dan pola makan yang baik diperlukan untuk hasil maksimal.

**Mitos 4: TTD Tidak Perlu Diminum Jika Merasa Sehat**

Fakta: TTD adalah untuk pencegahan, bukan hanya pengobatan. Bahkan jika merasa sehat, remaja putri tetap perlu minum TTD karena risiko anemia tinggi saat menstruasi.

**Fakta Penting Tentang TTD:**

- TTD harus diminum sekali seminggu untuk remaja putri sesuai program pemerintah
- Minumnya dengan air jeruk atau air putih, bukan teh atau susu
- Diminum saat perut tidak terlalu kosong untuk mengurangi efek samping
- Konsistensi adalah kunci dalam mendapatkan manfaat optimal
- Disertai pola makan bergizi untuk hasil terbaik`,
    category: "Edukasi",
    imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde0d?w=400",
  },
  {
    id: 4,
    title: "Pentingnya Zat Besi untuk Remaja",
    excerpt: "Pelajari mengapa zat besi sangat penting untuk kesehatan dan pertumbuhan remaja.",
    content: `Zat besi adalah mineral esensial yang memainkan peran penting dalam kesehatan remaja. Selama masa remaja, kebutuhan zat besi meningkat karena pertumbuhan yang cepat dan, pada remaja putri, karena kehilangan darah melalui menstruasi.

**Fungsi Zat Besi:**

**1. Pembentukan Hemoglobin**
Zat besi adalah komponen utama hemoglobin, yang membawa oksigen dari paru-paru ke seluruh tubuh. Tanpa zat besi yang cukup, tubuh tidak dapat memproduksi hemoglobin dalam jumlah yang tepat.

**2. Produksi Energi**
Zat besi terlibat dalam proses produksi energi di dalam sel, membantu tubuh tetap aktif dan energik. Defisiensi zat besi akan membuat tubuh terasa lelah.

**3. Pertumbuhan dan Perkembangan**
Selama remaja, zat besi penting untuk pertumbuhan otot, tulang, dan organ lainnya. Asupan zat besi yang cukup mendukung proses pertumbuhan yang optimal.

**4. Fungsi Kognitif**
Zat besi mendukung fungsi otak yang optimal, termasuk konsentrasi dan memori. Kecukupan zat besi mempengaruhi performa akademik remaja.

**5. Sistem Kekebalan Tubuh**
Zat besi membantu sistem kekebalan tubuh melawan infeksi dan penyakit. Tubuh dengan kadar zat besi yang baik lebih tahan terhadap penyakit.

**Kebutuhan Zat Besi Remaja:**

- Remaja Laki-laki: 11 mg per hari
- Remaja Putri: 15 mg per hari (lebih tinggi karena menstruasi)

**Sumber Zat Besi Hewani (Heme):**
- Daging merah (sapi, kambing)
- Ikan (salmon, tuna)
- Hati (ayam, sapi)
- Telur

**Sumber Zat Besi Nabati (Non-Heme):**
- Kacang-kacangan (merah, kedelai)
- Sayuran hijau (bayam, brokoli)
- Sereal beryodium
- Tahu dan tempe

**Tips Meningkatkan Penyerapan Zat Besi:**

Zat besi hewani (heme) lebih mudah diserap dibanding zat besi nabati (non-heme). Untuk meningkatkan penyerapan zat besi, konsumsilah bersama dengan sumber vitamin C seperti jeruk, tomat, atau stroberi. Hindari mengonsumsi dengan teh atau kopi karena dapat menghambat penyerapan.`,
    category: "Kesehatan",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
  },
];

// LocalStorage management
const STORAGE_KEYS = {
  USERS: "redup_users",
  CURRENT_USER: "redup_current_user",
  QUIZ_SCORES: "redup_quiz_scores",
};

export function initializeStorage() {
  // Initialize users with a default account
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const defaultUser: User = {
      id: 1,
      username: "demo",
      password: hashPassword("demo123"), // Simple hash for demo
      fullName: "Demo User",
      email: "demo@example.com",
      gender: "female",
      age: 16,
    };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([defaultUser]));
  }
}

export function hashPassword(password: string): string {
  // Simple hash for demo purposes - NOT for production!
  return btoa(password);
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export function getCurrentUser(): User | null {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
}

export function setCurrentUser(user: User | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

export function getUsers(): User[] {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
}

export function saveUser(user: User) {
  const users = getUsers();
  const existingIndex = users.findIndex((u) => u.id === user.id);
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    user.id = Math.max(...users.map((u) => u.id || 0), 0) + 1;
    users.push(user);
  }
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  return user;
}

export function getUserByUsername(username: string): User | undefined {
  const users = getUsers();
  return users.find((u) => u.username === username);
}

export function saveQuizScore(userId: number, score: number, total: number) {
  const scores = localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES);
  const allScores = scores ? JSON.parse(scores) : [];
  allScores.push({
    userId,
    score,
    total,
    date: new Date().toISOString(),
  });
  localStorage.setItem(STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(allScores));
}

export function getQuizScores(userId: number) {
  const scores = localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES);
  if (!scores) return [];
  const allScores = JSON.parse(scores);
  return allScores.filter((s: any) => s.userId === userId);
}
