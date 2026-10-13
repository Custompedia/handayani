// Data kecamatan & kabupaten/kota se-Indonesia untuk isian lokasi di form
// WhatsApp. Sumber: Kepmendagri No 300.2.2-2138 Tahun 2025 (ejaan resmi) via
// github.com/cahyadsn/wilayah, diringkas ke public/data/wilayah.json (±45 KB
// gzip) dan baru diunduh saat form dibuka supaya tidak membebani halaman.

export type Kota = {
  nama: string;
  provinsi: string;
  /** 0 = Semarang Raya, 1 = Jawa Tengah lainnya, 2 = luar Jawa Tengah. */
  rank: number;
};

export type Kecamatan = { nama: string; kota: Kota };

export type Wilayah = { kota: Kota[]; kecamatan: Kecamatan[] };

type Raw = {
  kota: [nama: string, provinsi: string, rank: number][];
  kec: [nama: string, kota: number][];
};

let cache: Promise<Wilayah> | null = null;

export function loadWilayah() {
  cache ??= fetch("/data/wilayah.json")
    .then((r) => {
      if (!r.ok) throw new Error(`wilayah.json ${r.status}`);
      return r.json() as Promise<Raw>;
    })
    .then((raw) => {
      const kota = raw.kota.map(([nama, provinsi, rank]) => ({
        nama,
        provinsi,
        rank,
      }));
      return {
        kota,
        kecamatan: raw.kec.map(([nama, i]) => ({ nama, kota: kota[i] })),
      };
    })
    .catch((err) => {
      // Gagal (mis. offline): boleh dicoba lagi saat form dibuka berikutnya.
      cache = null;
      throw err;
    });
  return cache;
}

/** Untuk pencarian: huruf kecil tanpa spasi/tanda baca ("Gunung Pati" = "gunungpati"). */
export const normalize = (v: string) =>
  v.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Urutan saran: Semarang Raya dulu, lalu yang diawali kata kunci, lalu abjad. */
export function rankMatches<T>(
  items: T[],
  query: string,
  name: (item: T) => string,
  rank: (item: T) => number,
  limit = 8,
) {
  const q = normalize(query);
  return items
    .filter((item) => !q || normalize(name(item)).includes(q))
    .map((item) => ({
      item,
      score:
        rank(item) * 2 + (q && !normalize(name(item)).startsWith(q) ? 1 : 0),
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map((m) => m.item);
}
