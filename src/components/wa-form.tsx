"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, MapPin, X } from "lucide-react";
import { contact, waLink } from "@/lib/data";
import { conditions, type WaIntent } from "@/lib/wa-intents";
import {
  loadWilayah,
  normalize,
  rankMatches,
  type Wilayah,
} from "@/lib/wilayah";
import { cn } from "@/lib/utils";

// Semua tombol "ke WhatsApp" membuka popup form ini dulu. Setelah diisi,
// pengunjung diarahkan ke WhatsApp dengan pesan yang disusun dari isian
// dan dari tombol yang diklik (intent).

type FormState = {
  name: string;
  condition: string;
  kecamatan: string;
  kota: string;
  need: string;
};

const emptyForm: FormState = {
  name: "",
  condition: "",
  kecamatan: "",
  kota: "",
  need: "",
};

// Gaya pesan: sapaan ke admin, tujuan, isian form sebagai poin (label &
// urutan sama dengan form; isian kosong dilewati), lalu satu kalimat
// permintaan. Tiap bagian dipisah baris kosong supaya mudah dibaca admin.
function buildMessage(intent: WaIntent, form: FormState) {
  const location = [form.kecamatan.trim(), form.kota.trim()]
    .filter(Boolean)
    .join(", ");
  const fields = [
    ["Nama", form.name],
    ["Status lokasi", form.condition],
    ["Lokasi", location],
    ["Kebutuhan", form.need],
  ]
    .filter(([, value]) => value.trim())
    .map(([label, value]) => `• ${label}: ${value.trim()}`);
  return [
    `Halo Admin ${contact.brand}.`,
    intent.line,
    fields.join("\n"),
    intent.closing ?? "Mohon bantu rekomendasi kain dan estimasi biayanya.",
  ].join("\n\n");
}

const WaFormContext = createContext<(intent: WaIntent) => void>(() => {});

export function useWaForm() {
  return useContext(WaFormContext);
}

/** Tombol yang membuka popup form WhatsApp. */
export function WaButton({
  intent,
  className,
  children,
  onClick,
  ...rest
}: {
  intent: WaIntent;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  "aria-label"?: string;
}) {
  const open = useWaForm();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        open(intent);
      }}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
}

const fieldClass =
  "border-linen text-ink placeholder:text-muted/70 focus:border-gold-deep w-full rounded-md border bg-white px-4 py-3 text-base outline-none transition-colors";

export function WaFormProvider({ children }: { children: ReactNode }) {
  const [intent, setIntent] = useState<WaIntent | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const open = (next: WaIntent) => {
    setIntent(next);
    // Nama, kondisi & lokasi diingat antar-tombol; kebutuhan hanya terisi
    // kalau tombolnya dari katalog.
    setForm((prev) => ({ ...prev, need: next.need ?? "" }));
  };
  const close = () => setIntent(null);

  useEffect(() => {
    if (!intent) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIntent(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [intent]);

  return (
    <WaFormContext.Provider value={open}>
      {children}
      <AnimatePresence>
        {intent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="bg-ink/60 absolute inset-0 backdrop-blur-sm"
              onClick={close}
            />
            <motion.form
              role="dialog"
              aria-modal="true"
              aria-labelledby="wa-form-title"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onSubmit={(e) => {
                e.preventDefault();
                // Link wa.me asli diklik supaya listener Meta Pixel
                // (AddToCart) tetap mencatatnya seperti sebelumnya.
                linkRef.current?.click();
                close();
              }}
              className="bg-cream text-ink relative max-h-[92svh] w-full overflow-y-auto rounded-t-md p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:max-w-md sm:rounded-md md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <h3
                  id="wa-form-title"
                  className="font-serif text-2xl leading-snug md:text-3xl"
                >
                  {intent.title}
                </h3>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Tutup"
                  className="text-ink hover:bg-sand -mt-1 -mr-2 grid size-10 shrink-0 place-items-center rounded-full"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-6 grid gap-4">
                <Field label="Nama">
                  <input
                    type="text"
                    required
                    autoFocus
                    autoComplete="name"
                    placeholder="Nama lengkap"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className={fieldClass}
                  />
                </Field>
                <Field label="Status lokasi" as="div">
                  <ConditionPicker
                    value={form.condition}
                    onChange={(condition) =>
                      setForm((p) => ({ ...p, condition }))
                    }
                  />
                </Field>
                <LocationFields
                  kecamatan={form.kecamatan}
                  kota={form.kota}
                  onChange={(next) => setForm((p) => ({ ...p, ...next }))}
                />
                <Field label="Kebutuhan">
                  <textarea
                    rows={3}
                    placeholder="Opsional, mis. blackout untuk kamar & vitrase ruang tamu"
                    value={form.need}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, need: e.target.value }))
                    }
                    className={cn(fieldClass, "min-h-24 resize-y")}
                  />
                </Field>
              </div>

              <button
                type="submit"
                className="bg-gold text-ink hover:bg-ink hover:text-cream mt-6 flex w-full items-center justify-center rounded-md px-6 py-3.5 font-bold transition-colors"
              >
                Kirim
              </button>
              <a
                ref={linkRef}
                hidden
                href={waLink(buildMessage(intent, form))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp: ${intent.title}`}
              />
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </WaFormContext.Provider>
  );
}

function Field({
  label,
  children,
  as: Tag = "label",
}: {
  label: string;
  children: ReactNode;
  as?: "label" | "div";
}) {
  return (
    <Tag className="block">
      <span className="mb-1.5 block text-xs font-bold tracking-wide">
        {label}
      </span>
      {children}
    </Tag>
  );
}

// Tiga pilihan dalam satu kontrol segmen yang sama tinggi; latar aktifnya
// meluncur. Keterangan "Persiapan pindah" baru muncul saat pilihan itu aktif.
function ConditionPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const name = useId();
  const active = conditions.find((c) => c.value === value);
  return (
    <div>
      <div className="border-linen grid grid-cols-3 gap-1 rounded-md border bg-white p-1">
        {conditions.map((c) => {
          const isActive = value === c.value;
          return (
            <label
              key={c.value}
              className={cn(
                "has-[:focus-visible]:ring-gold-deep relative flex min-h-11 cursor-pointer items-center justify-center rounded px-1.5 text-center text-[13px] leading-tight font-semibold transition-colors has-[:focus-visible]:ring-2 sm:text-sm",
                isActive ? "text-cream" : "text-ink hover:bg-sand",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="wa-condition"
                  className="bg-ink absolute inset-0 rounded"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
                />
              )}
              <input
                type="radio"
                name={name}
                required
                value={c.value}
                checked={isActive}
                onChange={() => onChange(c.value)}
                className="sr-only"
              />
              <span className="relative">{c.value}</span>
            </label>
          );
        })}
      </div>
      <AnimatePresence initial={false}>
        {active && "hint" in active && (
          <motion.p
            className="text-muted overflow-hidden text-xs"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="block pt-1.5">{active.hint}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// Kecamatan & kabupaten/kota se-Indonesia (data dimuat saat form dibuka).
// Memilih kecamatan langsung mengisi kab/kotanya; kalau kab/kota diisi dulu,
// saran kecamatan ikut disaring. Teks di luar daftar tetap boleh diketik.
function LocationFields({
  kecamatan,
  kota,
  onChange,
}: {
  kecamatan: string;
  kota: string;
  onChange: (next: { kecamatan?: string; kota?: string }) => void;
}) {
  const [data, setData] = useState<Wilayah | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    loadWilayah()
      .then(setData)
      .catch(() => setFailed(true));
  }, []);

  const kotaQuery = normalize(kota);
  const chosenKota = data?.kota.find((k) => normalize(k.nama) === kotaQuery);
  const picked =
    !!chosenKota &&
    data!.kecamatan.some((k) => k.kota === chosenKota && k.nama === kecamatan);

  const kecamatanOptions = data
    ? rankMatches(
        chosenKota
          ? data.kecamatan.filter((k) => k.kota === chosenKota)
          : data.kecamatan,
        kecamatan,
        (k) => k.nama,
        (k) => k.kota.rank,
      )
    : [];
  const kotaOptions = data
    ? rankMatches(
        data.kota,
        kota,
        (k) => k.nama,
        (k) => k.rank,
      )
    : [];
  const status = failed
    ? "Daftar wilayah gagal dimuat, silakan ketik manual."
    : !data
      ? "Memuat daftar wilayah…"
      : null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-3">
      <Field label="Kecamatan">
        <Combobox
          icon={<MapPin className="size-4" />}
          placeholder="Cari kecamatan"
          value={kecamatan}
          status={status}
          options={kecamatanOptions.map((k) => ({
            key: `${k.nama}|${k.kota.nama}`,
            label: k.nama,
            sub: k.kota.nama,
          }))}
          done={picked}
          listClassName="sm:w-[calc(200%+0.75rem)]"
          onInput={(text) =>
            // Teks diubah setelah memilih: kab/kota ikut dikosongkan lagi
            // supaya tidak tertinggal pasangan yang salah.
            onChange(
              picked ? { kecamatan: text, kota: "" } : { kecamatan: text },
            )
          }
          onPick={(i) => {
            const k = kecamatanOptions[i];
            onChange({ kecamatan: k.nama, kota: k.kota.nama });
          }}
        />
      </Field>
      <Field label="Kabupaten / kota">
        <Combobox
          placeholder="Cari kab/kota"
          value={kota}
          status={status}
          options={kotaOptions.map((k) => ({
            key: k.nama,
            label: k.nama,
            sub: k.provinsi,
          }))}
          done={!!chosenKota}
          listClassName="sm:left-auto sm:right-0 sm:w-[calc(200%+0.75rem)]"
          onInput={(text) => onChange({ kota: text })}
          onPick={(i) => onChange({ kota: kotaOptions[i].nama })}
        />
      </Field>
    </div>
  );
}

function Combobox({
  value,
  placeholder,
  icon,
  options,
  status,
  done,
  listClassName,
  onInput,
  onPick,
}: {
  value: string;
  placeholder: string;
  icon?: ReactNode;
  options: { key: string; label: string; sub: string }[];
  status: string | null;
  /** Nilai sudah cocok dengan data: daftar disembunyikan, tampil centang. */
  done: boolean;
  listClassName?: string;
  onInput: (text: string) => void;
  onPick: (index: number) => void;
}) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const showList = open && !done && (options.length > 0 || !!status);

  return (
    <div className="relative">
      {icon && (
        <span className="text-muted pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2">
          {icon}
        </span>
      )}
      <input
        type="text"
        required
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onChange={(e) => {
          onInput(e.target.value);
          setOpen(true);
          setHighlight(0);
        }}
        onKeyDown={(e) => {
          if (!showList || !options.length) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlight((h) => (h + 1) % options.length);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlight((h) => (h - 1 + options.length) % options.length);
          } else if (e.key === "Enter") {
            e.preventDefault();
            onPick(Math.min(highlight, options.length - 1));
            setOpen(false);
          } else if (e.key === "Escape") {
            // Tutup daftar saja, bukan popup-nya.
            e.stopPropagation();
            setOpen(false);
          }
        }}
        className={cn(fieldClass, icon ? "pr-9 pl-10" : "pr-9")}
      />
      {done ? (
        <Check className="text-gold-deep pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2" />
      ) : (
        <ChevronDown className="text-muted pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2" />
      )}
      {showList && (
        <ul
          id={listId}
          role="listbox"
          className={cn(
            "border-linen absolute top-full left-0 z-10 mt-1 max-h-64 w-full overflow-y-auto rounded-md border bg-white py-1 shadow-[0_20px_40px_-20px_rgba(42,34,29,0.45)]",
            listClassName,
          )}
        >
          {status && !options.length ? (
            <li className="text-muted px-4 py-2 text-sm">{status}</li>
          ) : (
            options.map((o, i) => (
              <li
                key={o.key}
                role="option"
                aria-selected={i === highlight}
                // mousedown supaya terpilih sebelum input kehilangan fokus
                onMouseDown={(e) => {
                  e.preventDefault();
                  onPick(i);
                  setOpen(false);
                }}
                onMouseEnter={() => setHighlight(i)}
                className={cn(
                  "flex cursor-pointer items-baseline justify-between gap-3 px-4 py-2 text-sm",
                  i === highlight && "bg-sand",
                )}
              >
                <span className="font-semibold">{o.label}</span>
                <span className="text-muted shrink-0 text-right text-xs">
                  {o.sub}
                </span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
