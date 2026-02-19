import Icon from "@/components/ui/icon";

const services = [
  {
    icon: "Truck",
    title: "Классическая эвакуация",
    desc: "Полная погрузка на платформу. Безопасная транспортировка любого авто.",
    color: "cyan",
  },
  {
    icon: "Wrench",
    title: "Техпомощь на дороге",
    desc: "Не заводится? Спустило колесо? Решим проблему на месте.",
    color: "purple",
  },
  {
    icon: "CarFront",
    title: "Частичная погрузка",
    desc: "Для полноприводных и заблокированных авто — метод частичной погрузки.",
    color: "green",
  },
  {
    icon: "Shield",
    title: "Страховые случаи",
    desc: "Работаем со страховыми компаниями. Оформим все документы.",
    color: "cyan",
  },
  {
    icon: "Clock",
    title: "Срочная подача",
    desc: "Экспресс-подача за 5-10 минут в пределах города.",
    color: "purple",
  },
  {
    icon: "MapPin",
    title: "Междугородняя перевозка",
    desc: "Перевозка авто между городами. Фиксированная цена за километр.",
    color: "green",
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  cyan: {
    border: "border-neon-cyan/15",
    bg: "bg-neon-cyan/5",
    text: "text-neon-cyan",
    glow: "group-hover:shadow-[0_0_30px_hsl(195_100%_50%/0.1)]",
  },
  purple: {
    border: "border-neon-purple/15",
    bg: "bg-neon-purple/5",
    text: "text-neon-purple",
    glow: "group-hover:shadow-[0_0_30px_hsl(270_80%_60%/0.1)]",
  },
  green: {
    border: "border-neon-green/15",
    bg: "bg-neon-green/5",
    text: "text-neon-green",
    glow: "group-hover:shadow-[0_0_30px_hsl(160_100%_45%/0.1)]",
  },
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 mb-4">
            <Icon name="Layers" size={14} className="text-neon-cyan" />
            <span className="text-sm text-neon-cyan">Полный спектр</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            НАШИ <span className="text-neon-cyan text-glow-cyan">УСЛУГИ</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Решаем любые ситуации на дороге — от мелкого ремонта до межгорода
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, i) => {
            const c = colorMap[service.color];
            return (
              <div
                key={i}
                className={`group rounded-2xl border ${c.border} bg-card/30 backdrop-blur-sm p-6 hover:bg-card/60 transition-all duration-300 cursor-default ${c.glow}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-4`}
                >
                  <Icon name={service.icon} size={22} className={c.text} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
