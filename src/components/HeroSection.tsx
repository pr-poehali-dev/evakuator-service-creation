import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const stats = [
  { value: "5 мин", label: "Среднее время подачи" },
  { value: "24/7", label: "Работаем круглосуточно" },
  { value: "500+", label: "Эвакуаторов в сети" },
];

const HeroSection = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 grid-bg" />

      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />

      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 hidden lg:block">
          <img
            src="https://cdn.poehali.dev/projects/46c9c74c-7401-43be-8579-03738a66a72b/files/29912d06-c0a0-4988-a5e6-0a9ceb737416.jpg"
            alt="Эвакуатор"
            className="w-full h-full object-cover"
            style={{ maskImage: "linear-gradient(to right, transparent, black 30%)" }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div
          className={`max-w-3xl transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 mb-6">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse-glow" />
            <span className="text-sm text-neon-cyan">Онлайн — 127 машин свободно</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6 tracking-tight">
            <span className="text-foreground">ЭВАКУАТОР</span>
            <br />
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent text-glow-cyan">
              ЗА 5 МИНУТ
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
            Вызовите эвакуатор в пару кликов. Отслеживайте машину в реальном времени.
            Платите онлайн — без наличных.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button
              size="lg"
              onClick={() => document.querySelector("#order")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gradient-to-r from-neon-cyan to-neon-purple text-background font-semibold text-lg px-8 py-6 hover:opacity-90 transition-opacity box-glow-cyan"
            >
              <Icon name="Zap" size={20} className="mr-2" />
              Вызвать эвакуатор
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" })}
              className="border-neon-cyan/20 text-foreground hover:bg-neon-cyan/5 hover:text-neon-cyan text-lg px-8 py-6"
            >
              Узнать стоимость
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-lg">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`transition-all duration-700 delay-${(i + 1) * 200} ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="text-2xl md:text-3xl font-display font-bold text-neon-cyan text-glow-cyan">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <button
          onClick={() => document.querySelector("#order")?.scrollIntoView({ behavior: "smooth" })}
          className="text-muted-foreground hover:text-neon-cyan transition-colors"
        >
          <Icon name="ChevronDown" size={28} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
