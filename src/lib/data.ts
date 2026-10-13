export const contact = {
  brand: "Handayani Gorden Semarang",
  phone: "085-875-888-109",
  whatsapp: "6285875888109",
  address: "Jl. Supriadi No 78B, Semarang",
  instagram: "kordensemarang.id",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Handayani+Gorden+Jl.+Supriadi+No+78B+Semarang",
};

export function waLink(
  text = "Halo Handayani Gorden, saya mau konsultasi gorden untuk rumah saya.",
) {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const instagramUrl = `https://instagram.com/${contact.instagram}`;

export const navLinks = [
  { href: "#portofolio", label: "Portofolio" },
  { href: "#keunggulan", label: "Kenapa Handayani" },
  { href: "#cara-pesan", label: "Cara Pesan" },
  { href: "#koleksi", label: "Koleksi" },
  { href: "#testimoni", label: "Testimoni" },
];

// Kartu di section Koleksi (copy mengikuti dummy v3, foto milik Handayani).
export const collections = [
  {
    type: "Kontrol cahaya",
    name: "Blackout 80%",
    description:
      "Seimbangkan kebutuhan privasi, kenyamanan, dan pencahayaan untuk berbagai ruang.",
    image: "/images/portfolio/p07_0.webp",
  },
  {
    type: "Privasi maksimal",
    name: "Blackout 100%",
    description:
      "Pilihan untuk ruang yang membutuhkan penghalang cahaya lebih tinggi, seperti kamar tidur.",
    image: "/images/portfolio/p10_3.webp",
  },
  {
    type: "Cahaya lebih lembut",
    name: "Vitrase",
    description:
      "Sentuhan ringan yang membantu membuat cahaya masuk lebih lembut dan ruangan tampak anggun.",
    image: "/images/produk-vitrase-hd.webp",
  },
];

// Proyek dengan nama lokasi yang memang ada di katalog Handayani.
export const featuredProjects = [
  {
    name: "Kedaton Homes",
    detail: "BSB City · perumahan komersial",
    image: "/images/portfolio/p10_0.webp",
  },
  {
    name: "De Villa Townhouse",
    detail: "Kedungmundu · blackout 100% dengan box gorden",
    image: "/images/portfolio/p11_2.webp",
  },
  {
    name: "Villa Susan SPA & Resort",
    detail: "Bandungan, Ambarawa",
    image: "/images/portfolio/p10_1.webp",
  },
];

export type FabricCollection = { name: string; slug: string; codes: string[] };

export const blackoutCollections: FabricCollection[] = [
  {
    name: "Casandra",
    slug: "casandra",
    codes: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
  },
  {
    name: "Boston",
    slug: "boston",
    codes: ["#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8"],
  },
  {
    name: "Arta",
    slug: "arta",
    codes: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C10", "C11", "C12"],
  },
  {
    name: "Apurva",
    slug: "apurva",
    codes: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"],
  },
  {
    name: "Arona A",
    slug: "arona-a",
    codes: ["01", "02", "05", "06", "07", "08", "09", "10", "11", "12"],
  },
  {
    name: "Arona B",
    slug: "arona-b",
    codes: ["01", "02", "05", "06", "07", "08", "09", "10", "11", "12"],
  },
  {
    name: "Dublin A",
    slug: "dublin-a",
    codes: ["1", "2", "3", "4", "5", "6", "7", "8"],
  },
  {
    name: "Dublin B",
    slug: "dublin-b",
    codes: ["1", "2", "3", "4", "5", "6", "7", "8"],
  },
  {
    name: "Luxila",
    slug: "luxila",
    codes: ["01", "02", "05", "06", "07", "08", "09", "10", "11", "12"],
  },
  {
    name: "Verena",
    slug: "verena",
    codes: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"],
  },
  {
    name: "Berlin A",
    slug: "berlin-a",
    codes: ["01", "02", "05", "06", "08", "09", "10", "11"],
  },
  {
    name: "Berlin B",
    slug: "berlin-b",
    codes: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
  },
  {
    name: "Chic",
    slug: "chic",
    codes: [
      "01",
      "02",
      "03",
      "05",
      "07",
      "08",
      "09",
      "12",
      "13",
      "14",
      "17",
      "18",
      "20",
      "21",
      "22",
      "24",
      "25",
    ],
  },
  { name: "Hawai A", slug: "hawai-a", codes: ["1", "2", "3", "4", "5", "6"] },
  { name: "Hawai B", slug: "hawai-b", codes: ["1", "2", "3", "4", "5", "6"] },
  {
    name: "Lino",
    slug: "lino",
    codes: [
      "01",
      "02",
      "03",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
    ],
  },
  {
    name: "Belgium A",
    slug: "belgium-a",
    codes: ["1", "2", "3", "4", "5", "6", "7", "8"],
  },
  {
    name: "Belgium B",
    slug: "belgium-b",
    codes: ["1", "2", "3", "4", "5", "6", "7", "8"],
  },
  {
    name: "Belgium FT340",
    slug: "belgium-ft340",
    codes: ["BR", "CR", "GREY", "WH"],
  },
  {
    name: "Kyoto A",
    slug: "kyoto-a",
    codes: ["1", "2", "3", "6", "7", "8", "9"],
  },
  {
    name: "Kyoto B",
    slug: "kyoto-b",
    codes: ["1", "2", "3", "6", "7", "8", "9"],
  },
  {
    name: "Liverpool Dimout A",
    slug: "liverpool-a",
    codes: ["1", "2", "3", "4", "5"],
  },
  {
    name: "Liverpool Dimout B",
    slug: "liverpool-b",
    codes: ["1", "2", "3", "4", "5"],
  },
  {
    name: "Tiara",
    slug: "tiara",
    codes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
  {
    name: "Yobel A",
    slug: "yobel-a",
    codes: ["1", "2", "3", "4", "5", "6", "7"],
  },
  {
    name: "Yobel B",
    slug: "yobel-b",
    codes: ["1", "2", "3", "4", "5", "6", "7"],
  },
  {
    name: "Yobel C",
    slug: "yobel-c",
    codes: ["1", "2", "3", "4", "5", "6", "7"],
  },
];

function swatchFile(slug: string, code: string) {
  return `${slug}-${code.replace(/[^A-Za-z0-9]/g, "")}.webp`;
}

/** Foto kain ukuran penuh (960px) untuk preview besar. */
export function swatchSrc(slug: string, code: string) {
  return `/images/kain/${swatchFile(slug, code)}`;
}

/** Potongan persegi 160px untuk chip & bulatan warna. */
export function swatchThumbSrc(slug: string, code: string) {
  return `/images/kain/thumb/${swatchFile(slug, code)}`;
}

/** Tekstur 256px yang sudah diratakan cahayanya & bisa diulang tanpa sambungan. */
export function swatchTileSrc(slug: string, code: string) {
  return `/images/kain/tile/${swatchFile(slug, code)}`;
}

export const vitraseFabrics = [
  { name: "Vitrase Voil", image: "/images/kain/vitrase-voil.webp" },
  { name: "Sable", image: "/images/kain/sable.webp" },
  { name: "Motif Salju", image: "/images/kain/motif-salju.webp" },
  { name: "Garis-Garis", image: "/images/kain/garis-garis.webp" },
  { name: "Motif Salju II", image: "/images/kain/motif-salju-2.webp" },
  { name: "Motif Linen", image: "/images/kain/motif-linen.webp" },
  { name: "Air Hujan Gold", image: "/images/kain/air-hujan-gold.webp" },
  { name: "Air Hujan Silver", image: "/images/kain/air-hujan-silver.webp" },
];

export const portfolioCategories = [
  { id: "semua", label: "Semua Inspirasi" },
  { id: "ruang-tamu", label: "Ruang Tamu" },
  { id: "kamar-tidur", label: "Kamar Tidur" },
  { id: "custom", label: "Box, Poni & Hidden Ceiling" },
  { id: "komersial", label: "Villa & Komersial" },
  { id: "vitrase", label: "Vitrase" },
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number]["id"];

type PortfolioItem = {
  src: string;
  title: string;
  location?: string;
  category: Exclude<PortfolioCategory, "semua">;
};

const p = (id: string) => `/images/portfolio/${id}.webp`;

const repeat = (
  ids: string[],
  item: Omit<PortfolioItem, "src">,
): PortfolioItem[] => ids.map((id) => ({ ...item, src: p(id) }));

export const portfolio: PortfolioItem[] = [
  ...repeat(["p07_0", "p07_1", "p08_0", "p08_1"], {
    title: "Gorden Blackout 80%",
    location: "Ruang tamu",
    category: "ruang-tamu",
  }),
  ...repeat(["p07_2", "p07_3", "p08_2"], {
    title: "Gorden Blackout",
    location: "Ruang tamu",
    category: "ruang-tamu",
  }),
  ...repeat(["p09_0", "p09_1"], {
    title: "Gorden Blackout 80%",
    location: "Kamar tidur",
    category: "kamar-tidur",
  }),
  ...repeat(["p09_2", "p09_3", "p08_3"], {
    title: "Gorden Blackout",
    location: "Kamar tidur",
    category: "kamar-tidur",
  }),
  {
    src: p("p10_0"),
    title: "Kedaton Homes, BSB City",
    location: "Perumahan komersial",
    category: "komersial",
  },
  {
    src: p("p10_1"),
    title: "Villa Susan SPA & Resort",
    location: "Bandungan, Ambarawa",
    category: "komersial",
  },
  {
    src: p("p10_2"),
    title: "Villa Susan SPA & Resort",
    location: "Bandungan, Ambarawa",
    category: "komersial",
  },
  {
    src: p("p11_0"),
    title: "Ruang Ganti Klinik",
    location: "Model siku lengkung",
    category: "komersial",
  },
  { src: p("p11_1"), title: "Ruang Ganti Fashion", category: "komersial" },
  {
    src: p("p10_3"),
    title: "Blackout 100% pada Hidden Ceiling",
    location: "Ala hotel",
    category: "custom",
  },
  ...repeat(["p13_0", "p13_1", "p13_2", "p13_3"], {
    title: "Gorden pada Hidden Ceiling",
    location: "Ala hotel",
    category: "custom",
  }),
  ...repeat(["p11_2", "p11_3"], {
    title: "Blackout 100% dengan Box Gorden",
    location: "De Villa Townhouse, Kedungmundu",
    category: "custom",
  }),
  ...repeat(["p14_0", "p14_1", "p14_2", "p14_3"], {
    title: "Blackout dengan Box Gorden",
    location: "Custom warna box dikenakan biaya tambahan",
    category: "custom",
  }),
  ...repeat(["p12_2", "p12_3"], {
    title: "Gorden dengan Poni",
    location: "Model layar / gelombang",
    category: "custom",
  }),
  {
    src: p("p12_0"),
    title: "Vitrase Model Ring",
    location: "Smokring",
    category: "vitrase",
  },
  {
    src: p("p12_1"),
    title: "Vitrase Model Pengait Kawat",
    category: "vitrase",
  },
  ...repeat(["p25_0", "p25_1", "p25_2", "p25_3"], {
    title: "Gorden Vitrase",
    category: "vitrase",
  }),
];

export const steps = [
  {
    title: "Ceritakan kebutuhan Anda",
    body: "Konsultasikan area, gaya interior, warna favorit, dan kisaran kebutuhan melalui WhatsApp.",
  },
  {
    title: "Kami datang untuk survei",
    body: "Tim membantu ukur dan membawa sampel katalog kain. Gratis untuk area Kota Semarang.",
  },
  {
    title: "Pilih, produksi, lalu pasang",
    body: "Setelah kain dan estimasi disepakati, pengerjaan serta pemasangan dikoordinasikan tim.",
  },
];

// Teks testimoni dikutip apa adanya dari screenshot di katalog.
// `rating` hanya diisi untuk ulasan yang memang menampilkan bintang.
export const testimonials = [
  {
    name: "warieh_koesoema",
    source: "Instagram",
    text: "Kak @kordensemarang.id terima kasih sekali y... kami puas atas layanan yg diberikan, dari mulai konsultasi, survey lapangan sampai pemasangan... admin dan petugas yg datang jg sopan dan ramah 🙏😊",
  },
  {
    name: "Loevyani Putri",
    source: "Google Review",
    rating: 5,
    text: "Pelayanan sangat ramah, penjelasan paket harga sangat rinci, ada banyak pilihan bahan yg berkualitas, modelnya variatif bisa request sesuai keinginan. Worth for money banget 🙏",
  },
  {
    name: "Ardevi Septiana",
    source: "Google Review",
    rating: 5,
    text: "satu kata ..BEST dari sekian pernak pernik rumah yg paling tidak mengecewakan adalah korden dari sini..mau menuruti kebutuhan dan kemauan konsumen .sukses selalu 🫶🫶 ...",
  },
  {
    name: "Indah Aurel",
    source: "Google Review",
    rating: 5,
    text: "Terimakasih Gorden Handayani pelayanan yg super ramah dan baik, pemasangannya jg rapi bahannya bgus 👍 sdh 2x pesen disini tdk mengecewakan ...",
  },
  {
    name: "Dina Ds",
    source: "Google Review",
    rating: 5,
    text: "Pemasangan korden anti ribet, Free cek dan konsultasi ke lokasi, Hasil juga rapi, bahan tebal dan bagus. Sukses terus gorden handayani 😊👍",
  },
  {
    name: "Septi An",
    source: "Google Review",
    rating: 5,
    text: "Gorden nya cantik² bahan bagus warnanya juga kekinian banget, seller ramah ramah, cocok banget untuk persiapan lebaran gorden baru mumpung belum mendekati banget klo dah dkt bisa rame nih, rekomendasi banget deh pokoknya",
  },
  {
    name: "Shinta Selviana",
    source: "Google Review",
    rating: 5,
    text: "Banyak model model terbaru minimalis clasic, semua bahannya bagus banget, bisa request ukuran, pelayanan cepat, untuk area Semarang free consultasi dan survei, terbaik",
  },
  {
    name: "Valensia Ika Pamungkas",
    source: "Instagram",
    text: "Terimakasih banyak kak, puas sekali sama hasilnya 🙏",
  },
];
