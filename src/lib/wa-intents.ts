// Konteks tiap tombol WhatsApp untuk popup form (lihat components/wa-form).
// Disimpan di luar file "use client" supaya bisa dipakai server component.

export const conditions = [
  { value: "Sudah ditempati" },
  { value: "Proses renovasi" },
  { value: "Persiapan pindah", hint: "Rencana pindah ke tempat baru" },
] as const;

export type WaIntent = {
  /** Judul popup, mis. "Jadwalkan Survei Gratis". */
  title: string;
  /** Kalimat tujuan setelah sapaan, mis. "Saya ingin jadwalkan survei gratis." */
  line: string;
  /** Kalimat permintaan di akhir pesan; default minta rekomendasi & estimasi. */
  closing?: string;
  /**
   * Isian "Kebutuhan" yang langsung terisi, hanya untuk tombol dari katalog
   * (mis. "Blackout Casandra A1"). Tombol lain membiarkannya kosong.
   */
  need?: string;
};

export const intents = {
  konsultasi: {
    title: "Konsultasi Gratis",
    line: "Saya ingin konsultasi gorden.",
  },
  survei: {
    title: "Jadwalkan Survei Gratis",
    line: "Saya ingin jadwalkan survei gratis.",
    closing: "Mohon bantu atur jadwal survei ke lokasi.",
  },
  estimasi: {
    title: "Minta Estimasi Biaya",
    line: "Saya ingin minta estimasi biaya gorden.",
    closing: "Mohon bantu estimasi biayanya.",
  },
  portofolio: {
    title: "Tanya Gorden yang Cocok",
    line: "Saya sudah lihat portofolio dan ingin konsultasi gorden yang cocok.",
  },
} satisfies Record<string, WaIntent>;
