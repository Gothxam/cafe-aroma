import Image from "next/image";

type GalleryImageProps = {
  src: string;
  alt: string;
};

export default function GalleryImage({ src, alt }: GalleryImageProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-ebony">
      {/* IMAGE */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority={false}
      />

      {/* BOTTOM SHADOW OVERLAY */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-brown/70 via-charcoal-brown/10 to-transparent" />

      {/* TEXT OVERLAY */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <p className="text-almond-cream text-sm font-semibold tracking-wide">
          {alt}
        </p>
      </div>
    </div>
  );
}
