"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, X } from "lucide-react";
import { waLink } from "@/lib/data";
import { needs, type Need, type WaIntent } from "@/lib/wa-intents";

// Semua tombol "ke WhatsApp" membuka popup form ini dulu. Setelah diisi,
// pengunjung diarahkan ke WhatsApp dengan pesan yang disusun dari isian
// dan dari tombol yang diklik (intent).

const rooms = [
  "Ruang tamu",
  "Kamar tidur",
  "Ruang keluarga",
  "Ruang makan",
  "Kantor / komersial",
  "Lainnya",
];

function roomPhrase(room: string) {
  return room === "Lainnya" ? "ruangan saya" : room.toLowerCase();
}

function buildMessage(
  intent: WaIntent,
  form: { name: string; location: string; need: Need; room: string },
) {
  const room = roomPhrase(form.room);
  const needLine: Record<Need, string> = {
    blackout: `Saya tertarik gorden blackout untuk ${room}.`,
    vitrase: `Saya tertarik gorden vitrase untuk ${room}.`,
    both: `Saya mau pasang gorden blackout + vitrase untuk ${room}.`,
    unsure: `Saya belum tahu pilih gorden yang mana untuk ${room}, mohon sarannya.`,
  };
  return [
    `Halo Handayani Gorden, saya ${form.name.trim()} dari ${form.location.trim()}.`,
    intent.line,
    intent.need === form.need
      ? `Rencananya untuk ${room}.`
      : needLine[form.need],
    "Boleh dibantu informasinya? Foto atau ukuran jendela bisa saya kirim di chat ini.",
  ].join("\n");
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
  const [form, setForm] = useState({
    name: "",
    location: "",
    need: "unsure" as Need,
    room: rooms[0],
  });
  const linkRef = useRef<HTMLAnchorElement>(null);

  const open = (next: WaIntent) => {
    setIntent(next);
    setForm((prev) => ({ ...prev, need: next.need ?? prev.need }));
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
                <Field label="Lokasi">
                  <input
                    type="text"
                    required
                    placeholder="Kecamatan / perumahan"
                    value={form.location}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, location: e.target.value }))
                    }
                    className={fieldClass}
                  />
                </Field>
                <Field label="Kebutuhan">
                  <Select
                    value={form.need}
                    onChange={(v) =>
                      setForm((p) => ({ ...p, need: v as Need }))
                    }
                    options={Object.entries(needs).map(([value, label]) => ({
                      value,
                      label,
                    }))}
                  />
                </Field>
                <Field label="Ruangan">
                  <Select
                    value={form.room}
                    onChange={(v) => setForm((p) => ({ ...p, room: v }))}
                    options={rooms.map((r) => ({ value: r, label: r }))}
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

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold tracking-wide">
        {label}
      </span>
      {children}
    </label>
  );
}

function Select({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldClass} appearance-none pr-10`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="text-muted pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2" />
    </div>
  );
}
