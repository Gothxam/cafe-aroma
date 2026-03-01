import Image from "next/image";

type GalleryImageProps = {
  src: string;
  alt: string;
};

export default function GalleryImage({ src, alt }: GalleryImageProps) {
  return (
    <div className="group relative overflow-hidden rounded-[2.5rem] aspect-[4/5] bg-[#1a1a1a] shadow-2xl border border-white/5 hover:border-[#d4af37]/30 transition-all duration-700">
      {/* IMAGE */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-all duration-[2s] group-hover:scale-110 grayscale group-hover:grayscale-0"
        priority={false}
      />

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

      {/* TEXT OVERLAY */}
      <div className="absolute bottom-8 left-8 right-8 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
        <p className="text-[10px] font-black text-[#d4af37] tracking-[0.3em] uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          The Gallery
        </p>
        <p className="text-xl font-black text-[#fdfaf7] tracking-tighter">
          {alt}
        </p>
      </div>
    </div>
  );
}
