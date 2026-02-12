import GalleryGrid from "../../components/gallery/GalleryGrid";

export default function GalleryPage() {
  return (
    <section className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/gallery/gallery-bg.jpg')",
      }}>

        <div className="min-h-screen bg-dusty-olive/20 backdrop-blur-[0px]">
        <div className="mx-auto max-w-7xl px-4 py-20">
        
        {/* Page Header */}
        <div className="mb-14 text-center">
          <h1 className="text-4xl font-bold text-almond-cream">
            Our Gallery
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-almond-cream">
            A visual journey through our café — from cozy corners to beautifully
            crafted dishes.
          </p>
        </div>

        {/* Gallery Grid */}
        <GalleryGrid />
      </div>
        </div>
      
    </section>
  );
}
