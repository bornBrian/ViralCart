interface HeroProps {
  onCTAClick: () => void;
}

export default function Hero({ onCTAClick }: HeroProps) {
  return (
    <section className="bg-gradient-to-r from-accent to-emerald-500 px-4 py-5 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold text-white mb-1">
          Viral Cart
        </h1>
        <p className="text-white/90 text-xs md:text-sm">
          Quality Products, Tested & Trusted
        </p>
      </div>
    </section>
  );
}
