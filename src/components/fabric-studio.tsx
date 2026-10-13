"use client";

import Image from "next/image";
import { useState, type PointerEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import {
  Blinds,
  Check,
  ChevronLeft,
  ChevronRight,
  ScanSearch,
  Share2,
} from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { Reveal } from "./reveal";
import { WaButton } from "./wa-form";
import {
  blackoutCollections,
  swatchSrc,
  swatchThumbSrc,
  swatchTileSrc,
} from "@/lib/data";
import { cn } from "@/lib/utils";

type Mode = "detail" | "gorden";

const EASE = [0.65, 0, 0.35, 1] as const;

// Katalog "ruang pas": lihat tekstur kain dari dekat atau langsung sebagai
// gorden terpasang, lalu pilih koleksi dan warnanya dari sample book.
export function FabricStudio({
  collectionIndex,
  onCollectionChange,
  shareHash,
}: {
  collectionIndex: number;
  onCollectionChange: (index: number) => void;
  shareHash: (slug: string) => string;
}) {
  const collection = blackoutCollections[collectionIndex];
  const [codes, setCodes] = useState<Record<string, string>>({});
  const code = codes[collection.slug] ?? collection.codes[0];
  const codeIndex = collection.codes.indexOf(code);
  const [mode, setMode] = useState<Mode>("detail");
  const [copied, setCopied] = useState(false);

  function pickCode(next: string) {
    const nextIndex = collection.codes.indexOf(next);
    if (nextIndex === codeIndex) return;
    setCodes((prev) => ({ ...prev, [collection.slug]: next }));
  }

  function step(delta: number) {
    const n = collection.codes.length;
    setCodes((prev) => ({
      ...prev,
      [collection.slug]: collection.codes[(codeIndex + delta + n) % n],
    }));
  }

  function pickCollection(index: number) {
    if (index === collectionIndex) return;
    onCollectionChange(index);
  }

  async function share() {
    const url = `${window.location.origin}${window.location.pathname}${shareHash(collection.slug)}`;
    const title = `Kain blackout ${collection.name} - Handayani Gorden`;
    if (navigator.share) {
      await navigator.share({ title, url }).catch(() => {});
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const src = swatchSrc(collection.slug, code);

  return (
    <MotionConfig reducedMotion="user">
      <Reveal className="bg-cream mt-8 overflow-hidden rounded-3xl p-3 shadow-[0_20px_50px_-30px_rgba(42,34,29,0.35)] md:p-4 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start lg:gap-8 lg:p-5">
        <Stage
          src={src}
          mode={mode}
          onModeChange={setMode}
          name={collection.name}
          code={code}
          position={codeIndex + 1}
          total={collection.codes.length}
          onStep={step}
        />

        <div className="flex flex-col px-2 pt-6 pb-2 md:px-3 lg:px-0 lg:pt-1">
          <CollectionPicker
            activeIndex={collectionIndex}
            codes={codes}
            onPick={pickCollection}
          />

          <div className="border-linen mt-6 flex items-baseline justify-between gap-3 border-t pt-5">
            <p className="text-gold-deep text-xs font-bold tracking-[0.25em] uppercase">
              Pilih warna
            </p>
            <p className="text-muted text-xs">
              {collection.codes.length} warna tersedia
            </p>
          </div>
          <SwatchRail
            slug={collection.slug}
            name={collection.name}
            codes={collection.codes}
            active={code}
            onPick={pickCode}
          />

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <WaButton
              intent={{
                title: `Tanya ${collection.name} ${code}`,
                line: `Saya tertarik dengan kain blackout ${collection.name} warna ${code}.`,
                need: `Blackout ${collection.name} ${code}`,
              }}
              className="group bg-gold text-ink hover:bg-ink hover:text-cream relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 font-bold transition-colors"
            >
              {/* kilau tipis yang lewat saat hover */}
              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
              <WhatsAppIcon className="size-5" />
              Tanya {collection.name} {code}
            </WaButton>
            <button
              type="button"
              onClick={share}
              className="border-linen text-ink hover:border-ink inline-flex items-center justify-center gap-2 rounded-full border bg-white px-5 py-3.5 text-sm font-bold transition-colors"
            >
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Share2 className="size-4" />
              )}
              {copied ? "Link tersalin" : "Bagikan koleksi"}
            </button>
          </div>
        </div>
      </Reveal>
    </MotionConfig>
  );
}

function Stage({
  src,
  mode,
  onModeChange,
  name,
  code,
  position,
  total,
  onStep,
}: {
  src: string;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  name: string;
  code: string;
  position: number;
  total: number;
  onStep: (delta: number) => void;
}) {
  const [hinted, setHinted] = useState(false);
  return (
    <div
      className="bg-linen relative aspect-[4/3] overflow-hidden rounded-2xl outline-none"
      tabIndex={0}
      aria-label={`Preview kain ${name} warna ${code}. Tekan panah kiri atau kanan untuk ganti warna.`}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") onStep(1);
        if (e.key === "ArrowLeft") onStep(-1);
      }}
    >
      <AnimatePresence initial={false}>
        {mode === "detail" ? (
          <motion.div
            key="detail"
            className="absolute inset-0"
            initial={{ opacity: 0, zIndex: 2 }}
            animate={{ opacity: 1, zIndex: 2 }}
            exit={{ opacity: 0, zIndex: 1 }}
            transition={{ duration: 0.5 }}
          >
            <DetailView
              src={src}
              alt={`Kain blackout ${name} warna ${code}`}
              onExplore={() => setHinted(true)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="gorden"
            className="absolute inset-0"
            initial={{ opacity: 0, zIndex: 2 }}
            animate={{ opacity: 1, zIndex: 2 }}
            exit={{ opacity: 0, zIndex: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CurtainView src={src} />
          </motion.div>
        )}
      </AnimatePresence>

      <ModeToggle mode={mode} onChange={onModeChange} />

      <AnimatePresence>
        {mode === "detail" && !hinted && (
          <motion.p
            className="bg-ink/55 text-cream pointer-events-none absolute top-4 right-4 z-[4] hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur lg:[@media(pointer:fine)]:flex"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
            exit={{ opacity: 0 }}
          >
            <ScanSearch className="size-3.5" />
            Arahkan kursor untuk lihat serat kain
          </motion.p>
        )}
      </AnimatePresence>

      <div className="from-ink/75 text-cream pointer-events-none absolute inset-x-0 bottom-0 z-[4] flex items-end justify-between gap-4 bg-gradient-to-t to-transparent p-3 pt-10 sm:p-4 sm:pt-16 md:p-6 md:pt-24">
        <div className="min-w-0">
          <p className="text-cream/75 text-[11px] font-bold tracking-[0.25em] uppercase">
            Blackout · {String(position).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </p>
          <div className="mt-0.5 flex items-baseline gap-2 overflow-hidden font-serif text-xl leading-tight sm:mt-1 sm:text-2xl md:text-3xl">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={name}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="truncate"
              >
                {name}
              </motion.span>
              <motion.span
                key={code}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}
                className="text-gold shrink-0 font-sans text-base font-bold md:text-lg"
              >
                · {code}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <div className="pointer-events-auto flex shrink-0 gap-2">
          <StepButton label="Warna sebelumnya" onClick={() => onStep(-1)}>
            <ChevronLeft className="size-5" />
          </StepButton>
          <StepButton label="Warna berikutnya" onClick={() => onStep(1)}>
            <ChevronRight className="size-5" />
          </StepButton>
        </div>
      </div>
    </div>
  );
}

function StepButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileTap={{ scale: 0.88 }}
      className="border-cream/40 bg-ink/30 hover:bg-cream hover:text-ink grid size-9 place-items-center rounded-full border backdrop-blur transition-colors sm:size-10"
    >
      {children}
    </motion.button>
  );
}

function ModeToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (mode: Mode) => void;
}) {
  const options = [
    { id: "detail", label: "Detail kain", short: "Detail", icon: ScanSearch },
    { id: "gorden", label: "Simulasi gorden", short: "Simulasi", icon: Blinds },
  ] as const;
  return (
    <div className="bg-cream/85 absolute top-3 left-3 z-[4] flex rounded-full p-1 shadow-sm backdrop-blur md:top-4 md:left-4">
      {options.map(({ id, label, short, icon: Icon }) => (
        <button
          key={id}
          type="button"
          aria-pressed={mode === id}
          onClick={() => onChange(id)}
          className={cn(
            "relative flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors sm:px-3 sm:py-1.5 sm:text-xs",
            mode === id ? "text-cream" : "text-ink hover:text-cocoa",
          )}
        >
          {mode === id && (
            <motion.span
              layoutId="studio-mode"
              className="bg-ink absolute inset-0 rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
          <Icon className="relative size-3.5" />
          <span className="relative sm:hidden">{short}</span>
          <span className="relative hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

const LENS = 170;

// Foto + kaca pembesar (hanya untuk mouse) supaya serat kain bisa dilihat
// dari dekat. Pembesaran mengikuti resolusi asli foto supaya tetap tajam.
function DetailView({
  src,
  alt,
  onExplore,
}: {
  src: string;
  alt: string;
  onExplore: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  const zoom = box ? Math.max(1.8, 1200 / box.w) : 2;

  const lensX = useTransform(x, (v) => v - LENS / 2);
  const lensY = useTransform(y, (v) => v - LENS / 2);
  const bgPos = useTransform(
    [x, y],
    ([vx, vy]: number[]) =>
      `${LENS / 2 - vx * zoom}px ${LENS / 2 - vy * zoom}px`,
  );

  function track(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
    if (!box) {
      setBox({ w: r.width, h: r.height });
      onExplore();
    }
  }

  return (
    <div
      className="absolute inset-0 cursor-none"
      onPointerMove={track}
      onPointerLeave={() => setBox(null)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 55vw, 100vw"
        className="object-cover"
      />
      <AnimatePresence>
        {box && (
          <motion.div
            aria-hidden
            className="ring-cream pointer-events-none absolute top-0 left-0 z-[5] rounded-full shadow-[0_18px_40px_-10px_rgba(0,0,0,0.6)] ring-2"
            style={{
              width: LENS,
              height: LENS,
              x: lensX,
              y: lensY,
              backgroundImage: `url(${src})`,
              backgroundSize: `${box.w * zoom}px ${box.h * zoom}px`,
              backgroundPosition: bgPos,
            }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Kain dirender sebagai gorden di depan jendela: lipatan dari gradien
// berulang (ikut merapat saat gorden dibuka), ring di rel, dan ayunan halus.
function CurtainView({ src }: { src: string }) {
  const [open, setOpen] = useState(true);
  const panel = open ? "31%" : "50.5%";

  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,#f8f4ec,#e8dfd1)]">
      {/* jendela */}
      <div className="absolute inset-x-[16%] top-[15%] bottom-[12%] border-[6px] border-white/90 bg-[linear-gradient(160deg,#fffdf8_10%,#efe6d6_60%,#e3d8c4)] shadow-[inset_0_0_40px_rgba(92,68,52,0.15)]">
        <div className="absolute inset-y-0 left-1/2 w-1.5 -translate-x-1/2 bg-white/90" />
        <div className="absolute inset-x-0 top-[45%] h-1.5 bg-white/90" />
      </div>
      {/* lantai */}
      <div className="absolute inset-x-0 bottom-0 h-[9%] bg-[linear-gradient(180deg,#d9cdb9,#cbbda6)]" />

      {(["left", "right"] as const).map((side) => (
        <motion.div
          key={side}
          className={cn(
            "absolute top-[8%] bottom-[5%] origin-top",
            side === "left" ? "left-0" : "right-0",
          )}
          initial={{ width: "50.5%" }}
          animate={{
            width: panel,
            skewX: [0, side === "left" ? 0.6 : -0.6, 0],
          }}
          transition={{
            width: { duration: 1.4, ease: EASE, delay: 0.15 },
            skewX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "auto 75%",
              backgroundPosition: "center",
              filter: "contrast(0.82) blur(0.4px)",
            }}
          />
          {/* lipatan */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(30,22,16,0.42)_0%,rgba(30,22,16,0.08)_4.5%,rgba(255,255,255,0.2)_8%,rgba(30,22,16,0.08)_11.5%,rgba(30,22,16,0.42)_16%)]" />
          {/* cahaya dari jendela & bayangan di ujung bawah */}
          <div
            className={cn(
              "absolute inset-0",
              side === "left"
                ? "bg-[linear-gradient(90deg,rgba(0,0,0,0.25),transparent_35%,rgba(255,248,235,0.18))]"
                : "bg-[linear-gradient(270deg,rgba(0,0,0,0.25),transparent_35%,rgba(255,248,235,0.18))]",
            )}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/25 to-transparent" />
          {/* ring */}
          <div className="absolute inset-x-[4%] -top-2 flex justify-between">
            {Array.from({ length: 7 }, (_, i) => (
              <span
                key={i}
                className="border-cocoa size-3 rounded-full border-2"
              />
            ))}
          </div>
        </motion.div>
      ))}

      {/* rel */}
      <div className="bg-cocoa absolute inset-x-[2%] top-[6.5%] h-[5px] rounded-full shadow-sm">
        <span className="bg-cocoa absolute top-1/2 -left-1 size-3 -translate-y-1/2 rounded-full" />
        <span className="bg-cocoa absolute top-1/2 -right-1 size-3 -translate-y-1/2 rounded-full" />
      </div>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.94 }}
        className="bg-cream/85 text-ink hover:bg-cream absolute top-3 right-3 z-[4] rounded-full px-3 py-1.5 text-xs font-bold shadow-sm backdrop-blur md:top-4 md:right-4"
      >
        {open ? "Tutup gorden" : "Buka gorden"}
      </motion.button>
    </div>
  );
}

// Semua koleksi tampil sekaligus (membungkus ke beberapa baris), chip lebih
// ringkas di HP supaya 27 koleksi tetap muat tanpa perlu digeser.
function CollectionPicker({
  activeIndex,
  codes,
  onPick,
}: {
  activeIndex: number;
  codes: Record<string, string>;
  onPick: (index: number) => void;
}) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-gold-deep text-xs font-bold tracking-[0.25em] uppercase">
          Pilih koleksi
        </p>
        <p className="text-muted text-xs">
          {blackoutCollections.length} koleksi
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
        {blackoutCollections.map((c, i) => {
          const active = i === activeIndex;
          return (
            <button
              key={c.slug}
              type="button"
              onClick={() => onPick(i)}
              aria-pressed={active}
              className={cn(
                "group relative flex items-center gap-1.5 rounded-full border py-1 pr-3 pl-1 text-xs font-semibold transition-colors sm:gap-2 sm:py-1.5 sm:pr-4 sm:pl-1.5 sm:text-sm lg:pr-3.5 lg:text-[13px]",
                active
                  ? "text-cream border-transparent"
                  : "border-linen text-ink hover:border-ink bg-white",
              )}
            >
              {active && (
                <motion.span
                  layoutId="studio-collection"
                  className="bg-ink absolute inset-0 rounded-full"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.55 }}
                />
              )}
              <span className="relative size-5 shrink-0 overflow-hidden rounded-full transition-transform duration-300 group-hover:rotate-12 sm:size-7 lg:size-6">
                <Image
                  src={swatchThumbSrc(c.slug, codes[c.slug] ?? c.codes[0])}
                  alt=""
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </span>
              <span className="relative whitespace-nowrap">{c.name}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

// Tiap warna jadi gorden mini yang tergantung dengan ring di rel. Kalau
// warnanya banyak, gordennya dibagi ke beberapa rel bertingkat (6 per rel di
// HP, 8 di tablet, 10 di desktop) supaya semuanya kelihatan tanpa digeser.
// Ganti koleksi = gordennya digantung ulang satu per satu dari kiri.
function SwatchRail({
  slug,
  name,
  codes,
  active,
  onPick,
}: {
  slug: string;
  name: string;
  codes: string[];
  active: string;
  onPick: (code: string) => void;
}) {
  return (
    <motion.div
      key={slug}
      className="mt-4 grid grid-cols-6 gap-y-9 sm:grid-cols-8 lg:grid-cols-10"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.035 } } }}
    >
      {codes.map((c) => {
        const isActive = c === active;
        return (
          <motion.button
            key={c}
            type="button"
            onClick={() => onPick(c)}
            aria-label={`${name} warna ${c}`}
            aria-pressed={isActive}
            title={`${name} ${c}`}
            className="group relative min-w-0 px-0.5"
            variants={{
              hidden: { x: -28, opacity: 0 },
              show: {
                x: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 240, damping: 22 },
              },
            }}
          >
            {/* potongan rel; berderet jadi satu rel utuh per baris */}
            <span className="from-cocoa via-ink to-cocoa absolute inset-x-0 top-1 h-[5px] bg-gradient-to-b shadow-[0_2px_3px_rgba(42,34,29,0.35)]" />
            {/* ring di rel */}
            <span className="relative flex justify-around px-1">
              {[0, 1, 2].map((r) => (
                <span
                  key={r}
                  className={cn(
                    "size-2.5 rounded-full border-2 transition-colors",
                    isActive ? "border-gold" : "border-cocoa",
                  )}
                />
              ))}
            </span>
            <motion.span
              className="relative -mt-1 block h-20 origin-top sm:h-24 md:h-28"
              style={{
                clipPath: "polygon(3% 0, 97% 0, 100% 100%, 0 100%)",
              }}
              animate={{ scaleY: isActive ? 1.08 : 1 }}
              whileHover={{ skewX: isActive ? 0 : 2.5 }}
              transition={{ type: "spring", stiffness: 260, damping: 15 }}
            >
              <span
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${swatchTileSrc(slug, c)})`,
                  backgroundSize: "64px",
                }}
              />
              {/* lipatan */}
              <span className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(30,22,16,0.42)_0px,rgba(30,22,16,0.1)_4px,rgba(255,255,255,0.22)_7px,rgba(30,22,16,0.1)_10px,rgba(30,22,16,0.42)_14px)]" />
              {/* heading tape & kelim */}
              <span className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-black/35 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 h-1.5 border-t border-white/25 bg-black/20" />
              <span className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 transition-opacity group-hover:opacity-0" />
            </motion.span>
            {isActive && (
              <motion.span
                layoutId={`studio-code-${slug}`}
                className="bg-ink text-cream absolute inset-x-0 -bottom-7 mx-auto w-fit rounded-full px-2 py-0.5 text-[11px] font-bold whitespace-nowrap"
                transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
              >
                {c}
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
