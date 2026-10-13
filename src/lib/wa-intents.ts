// Konteks tiap tombol WhatsApp untuk popup form (lihat components/wa-form).
// Disimpan di luar file "use client" supaya bisa dipakai server component.

export const needs = {
  blackout: "Gorden Blackout",
  vitrase: "Gorden Vitrase",
  both: "Blackout + Vitrase",
  unsure: "Belum tahu, minta saran",
} as const;

export type Need = keyof typeof needs;

export type WaIntent = {
  /** Judul popup, mis. "Jadwalkan Survei Gratis". */
  title: string;
  /** Kalimat pembuka di pesan WA, mis. "Saya mau jadwalkan survei gratis ke rumah." */
  line: string;
  /** Pilihan kebutuhan yang langsung terpilih. */
  need?: Need;
};

export const intents = {
  konsultasi: {
    title: "Konsultasi Gratis",
    line: "Saya mau konsultasi gorden untuk rumah saya.",
  },
  survei: {
    title: "Jadwalkan Survei Gratis",
    line: "Saya mau jadwalkan survei gratis ke rumah.",
  },
  estimasi: {
    title: "Minta Estimasi Biaya",
    line: "Saya mau konsultasi dan minta estimasi biaya gorden untuk rumah saya.",
  },
  portofolio: {
    title: "Tanya Gorden yang Cocok",
    line: "Saya sudah lihat portofolio Handayani dan mau diskusi gorden yang cocok untuk rumah saya.",
  },
} satisfies Record<string, WaIntent>;
