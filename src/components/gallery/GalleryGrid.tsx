import GalleryImage from "../../components/gallery/GalleryImage";

const images = [
  { src: "/assets/gallery1.jpg", alt: "Cafe ambience" },
  { src: "/assets/gallery2.jpg", alt: "Coffee served" },
  { src: "/assets/gallery3.jpg", alt: "Dessert plate" },
  { src: "/assets/gallery4.jpg", alt: "Seating area" },
  { src: "/assets/gallery5.jpg", alt: "Bar counter" },
  { src: "/assets/gallery6.jpg", alt: "Evening lights" },
];

export default function GalleryGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {images.map((img, index) => (
        <GalleryImage key={index} {...img} />
      ))}
    </div>
  );
}
