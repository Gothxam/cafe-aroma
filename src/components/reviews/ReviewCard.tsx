import { Card, CardContent } from "../../components/ui/card";
import { Star, Quote } from "lucide-react";

type Review = {
  name: string;
  comment: string;
  rating: number;
};

export default function ReviewCard({ name, comment, rating }: Review) {
  return (
    <Card className="h-full bg-[#1a1a1a] border border-white/5 hover:border-[#d4af37]/30 transition-all duration-500 group relative overflow-hidden rounded-[2.5rem] shadow-2xl">
      <div className="absolute top-8 right-8 text-[#d4af37]/10 group-hover:text-[#d4af37]/20 transition-colors">
        <Quote className="w-16 h-16 rotate-180" />
      </div>

      <CardContent className="p-10 flex flex-col h-full">
        {/* Stars */}
        <div className="flex gap-1.5 mb-8">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? "fill-[#d4af37] text-[#d4af37]" : "text-white/10"}`}
            />
          ))}
        </div>

        <p className="text-xl text-[#fdfaf7]/80 font-serif italic leading-relaxed mb-10 flex-grow">
          "{comment}"
        </p>

        <div className="mt-auto">
          <div className="h-px w-12 bg-[#d4af37]/30 mb-6" />
          <p className="text-[10px] font-black text-[#d4af37] tracking-[0.3em] uppercase">
            {name}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
