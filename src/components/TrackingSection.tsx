import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const mockSteps = [
  { id: 1, title: "Заявка принята", time: "14:32", done: true, icon: "ClipboardCheck" },
  { id: 2, title: "Эвакуатор назначен", time: "14:33", done: true, icon: "UserCheck" },
  { id: 3, title: "В пути к вам", time: "14:35", done: true, icon: "Navigation" },
  { id: 4, title: "Загрузка авто", time: "~14:40", done: false, icon: "Package" },
  { id: 5, title: "Доставка", time: "", done: false, icon: "Truck" },
  { id: 6, title: "Завершён", time: "", done: false, icon: "CircleCheck" },
];

const TrackingSection = () => {
  const [orderId, setOrderId] = useState("");
  const [tracking, setTracking] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!tracking) return;
    const interval = setInterval(() => {
      setProgress((p) => (p >= 65 ? 65 : p + 1));
    }, 50);
    return () => clearInterval(interval);
  }, [tracking]);

  return (
    <section id="tracking" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-green/20 bg-neon-green/5 mb-4">
            <Icon name="Radar" size={14} className="text-neon-green" />
            <span className="text-sm text-neon-green">Live-трекинг</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            ОТСЛЕЖИВАНИЕ <span className="text-neon-purple text-glow-purple">В РЕАЛЬНОМ ВРЕМЕНИ</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Следите за эвакуатором на карте — от момента назначения до доставки
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-neon-purple/10 bg-card/50 backdrop-blur-sm p-8">
            <h3 className="text-lg font-semibold text-foreground mb-6">Введите номер заказа</h3>
            <div className="flex gap-3 mb-8">
              <Input
                placeholder="Например: EVK-2847"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="bg-secondary/50 border-neon-purple/10 focus:border-neon-purple/30 text-foreground placeholder:text-muted-foreground"
              />
              <Button
                onClick={() => setTracking(true)}
                className="bg-gradient-to-r from-neon-purple to-neon-cyan text-background font-semibold shrink-0"
              >
                <Icon name="Search" size={16} />
              </Button>
            </div>

            {tracking && (
              <div className="space-y-1 animate-fade-in">
                {mockSteps.map((step, i) => (
                  <div key={step.id} className="flex items-start gap-3 relative">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          step.done
                            ? "bg-neon-green/20 text-neon-green"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        <Icon name={step.icon} size={14} />
                      </div>
                      {i < mockSteps.length - 1 && (
                        <div
                          className={`w-0.5 h-8 ${
                            step.done ? "bg-neon-green/30" : "bg-secondary"
                          }`}
                        />
                      )}
                    </div>
                    <div className="pt-1">
                      <p
                        className={`text-sm font-medium ${
                          step.done ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </p>
                      {step.time && (
                        <p className="text-xs text-muted-foreground">{step.time}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-neon-purple/10 bg-card/50 backdrop-blur-sm overflow-hidden relative min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-purple/5">
              <div className="grid-bg w-full h-full opacity-50" />
            </div>

            {tracking ? (
              <div className="relative z-10 p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse-glow" />
                    <span className="text-sm text-neon-green font-medium">В пути</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Обновлено: только что</span>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(220 18% 14%)" strokeWidth="6" />
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 54}`}
                          strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress / 100)}`}
                          className="transition-all duration-100"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="hsl(195 100% 50%)" />
                            <stop offset="100%" stopColor="hsl(270 80% 60%)" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div>
                          <div className="text-2xl font-display font-bold text-foreground">~5</div>
                          <div className="text-xs text-muted-foreground">минут</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Эвакуатор <span className="text-neon-cyan">А432ВН</span> в пути к вам
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neon-cyan/10">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-neon-cyan">2.3 км</div>
                    <div className="text-xs text-muted-foreground">Расстояние</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-neon-purple">Иван К.</div>
                    <div className="text-xs text-muted-foreground">Водитель</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-neon-green">4.9 ★</div>
                    <div className="text-xs text-muted-foreground">Рейтинг</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative z-10 h-full flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                    <Icon name="MapPin" size={28} className="text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Введите номер заказа для отслеживания
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackingSection;
