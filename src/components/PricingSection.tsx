import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const plans = [
  {
    name: "Эконом",
    price: "2 500",
    unit: "от ₽",
    desc: "Легковые автомобили в пределах города",
    color: "cyan",
    features: [
      "Подача до 30 минут",
      "До 1.5 тонн",
      "Оплата наличными / картой",
      "SMS-уведомления",
    ],
    popular: false,
  },
  {
    name: "Стандарт",
    price: "4 000",
    unit: "от ₽",
    desc: "Внедорожники и крупные авто",
    color: "purple",
    features: [
      "Подача до 15 минут",
      "До 3 тонн",
      "Полная / частичная погрузка",
      "SMS + Telegram уведомления",
      "Помощь с документами",
    ],
    popular: true,
  },
  {
    name: "Премиум",
    price: "7 500",
    unit: "от ₽",
    desc: "VIP-перевозка, спецтехника",
    color: "green",
    features: [
      "Экспресс-подача 5 минут",
      "До 5 тонн",
      "Закрытая платформа",
      "Персональный менеджер",
      "Страхование груза",
      "Фото-отчёт",
    ],
    popular: false,
  },
];

const colorStyles: Record<string, { border: string; accent: string; btn: string; badge: string }> = {
  cyan: {
    border: "border-neon-cyan/15 hover:border-neon-cyan/30",
    accent: "text-neon-cyan",
    btn: "bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 border border-neon-cyan/20",
    badge: "",
  },
  purple: {
    border: "border-neon-purple/30 hover:border-neon-purple/50",
    accent: "text-neon-purple",
    btn: "bg-gradient-to-r from-neon-cyan to-neon-purple text-background hover:opacity-90",
    badge: "bg-gradient-to-r from-neon-cyan to-neon-purple",
  },
  green: {
    border: "border-neon-green/15 hover:border-neon-green/30",
    accent: "text-neon-green",
    btn: "bg-neon-green/10 text-neon-green hover:bg-neon-green/20 border border-neon-green/20",
    badge: "",
  },
};

const PricingSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-green/20 bg-neon-green/5 mb-4">
            <Icon name="CreditCard" size={14} className="text-neon-green" />
            <span className="text-sm text-neon-green">Прозрачные цены</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            ТАРИФЫ <span className="text-neon-green" style={{ textShadow: "0 0 20px hsl(160 100% 45% / 0.5)" }}>БЕЗ СКРЫТЫХ ПЛАТЕЖЕЙ</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Фиксированная стоимость подачи + оплата за километр
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const c = colorStyles[plan.color];
            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`relative rounded-2xl border ${c.border} bg-card/30 backdrop-blur-sm p-8 transition-all duration-300 ${
                  hovered === i ? "scale-[1.02]" : ""
                } ${plan.popular ? "box-glow-purple" : ""}`}
              >
                {plan.popular && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-background ${c.badge}`}>
                    Популярный
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{plan.desc}</p>
                </div>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-xs text-muted-foreground">{plan.unit}</span>
                  <span className={`text-4xl font-display font-bold ${c.accent}`}>
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">₽</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <Icon name="Check" size={14} className={c.accent} />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-6 font-semibold transition-all ${c.btn}`}
                  onClick={() =>
                    document.querySelector("#order")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Заказать
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-16 max-w-2xl mx-auto rounded-2xl border border-neon-cyan/10 bg-card/30 backdrop-blur-sm p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 flex items-center justify-center shrink-0">
              <Icon name="Calculator" size={24} className="text-neon-cyan" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1">Калькулятор стоимости</h3>
              <p className="text-sm text-muted-foreground">
                Точная цена зависит от расстояния, типа авто и времени суток.
                Рассчитайте стоимость прямо в форме заказа.
              </p>
            </div>
            <Button
              variant="outline"
              className="border-neon-cyan/20 text-foreground hover:bg-neon-cyan/5 hover:text-neon-cyan shrink-0"
              onClick={() =>
                document.querySelector("#order")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Рассчитать
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
