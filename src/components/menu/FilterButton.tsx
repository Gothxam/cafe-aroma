interface Props {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function FilterButton({ label, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-2 rounded-full text-sm font-semibold
        transition-all duration-300
        ${
          active
            ? "bg-white text-black shadow-lg"
            : "bg-white/10 text-white hover:bg-white/20"
        }
      `}
    >
      {label}
    </button>
  );
}
