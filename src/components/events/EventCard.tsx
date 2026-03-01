import { Card, CardContent } from "../../components/ui/card";

type Event = {
  title: string;
  date: string;
  description: string;
};

export default function EventCard({ title, date, description }: Event) {
  return (
    <Card className="h-full bg-[#1a1a1a] border border-white/5 hover:border-[#d4af37]/30 transition-all duration-500 group relative overflow-hidden rounded-[2.5rem] shadow-2xl">
      <CardContent className="p-10 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-2 w-2 rounded-full bg-[#d4af37] animate-pulse" />
          <span className="text-[10px] font-black text-[#d4af37] tracking-[0.3em] uppercase">
            {date}
          </span>
        </div>

        <h3 className="text-2xl font-black text-[#fdfaf7] mb-4 tracking-tight group-hover:text-[#d4af37] transition-colors leading-tight">
          {title}
        </h3>

        <p className="text-sm font-medium text-[#fdfaf7]/40 leading-relaxed mb-6">
          {description}
        </p>

        <div className="mt-auto group-hover:translate-x-2 transition-transform duration-500">
          <span className="text-[10px] font-black text-[#fdfaf7]/20 tracking-widest uppercase group-hover:text-[#fdfaf7]">
            Learn More →
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
