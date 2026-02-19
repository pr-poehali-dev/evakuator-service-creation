import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const vehicleTypes = [
  { value: "sedan", label: "Легковой", icon: "Car" },
  { value: "suv", label: "Внедорожник", icon: "Truck" },
  { value: "van", label: "Микроавтобус", icon: "Bus" },
  { value: "moto", label: "Мотоцикл", icon: "Bike" },
];

const OrderSection = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    from: "",
    to: "",
    vehicle: "",
    phone: "",
    comment: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    toast({
      title: "Заявка принята!",
      description: "Эвакуатор будет назначен в течение 2 минут. Ожидайте SMS.",
    });
    setStep(1);
    setForm({ from: "", to: "", vehicle: "", phone: "", comment: "" });
  };

  return (
    <section id="order" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-purple/20 bg-neon-purple/5 mb-4">
            <Icon name="Navigation" size={14} className="text-neon-purple" />
            <span className="text-sm text-neon-purple">Быстрый заказ</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            ВЫЗВАТЬ <span className="text-neon-cyan text-glow-cyan">ЭВАКУАТОР</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Заполните форму — мы найдём ближайший эвакуатор и отправим его к вам
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className="flex items-center gap-2"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    step >= s
                      ? "bg-gradient-to-br from-neon-cyan to-neon-purple text-background"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {step > s ? <Icon name="Check" size={16} /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-0.5 transition-colors ${
                      step > s ? "bg-neon-cyan" : "bg-secondary"
                    }`}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-neon-cyan/10 bg-card/50 backdrop-blur-sm p-8 box-glow-cyan">
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-lg font-semibold text-foreground mb-2">Откуда и куда?</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <Icon name="MapPin" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-cyan" />
                    <Input
                      placeholder="Адрес подачи"
                      value={form.from}
                      onChange={(e) => updateField("from", e.target.value)}
                      className="pl-10 bg-secondary/50 border-neon-cyan/10 focus:border-neon-cyan/30 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="relative">
                    <Icon name="Flag" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-purple" />
                    <Input
                      placeholder="Адрес доставки"
                      value={form.to}
                      onChange={(e) => updateField("to", e.target.value)}
                      className="pl-10 bg-secondary/50 border-neon-cyan/10 focus:border-neon-cyan/30 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple text-background font-semibold py-6"
                  onClick={() => setStep(2)}
                >
                  Далее
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-lg font-semibold text-foreground mb-2">Тип транспорта</h3>
                <div className="grid grid-cols-2 gap-3">
                  {vehicleTypes.map((v) => (
                    <button
                      key={v.value}
                      onClick={() => updateField("vehicle", v.value)}
                      className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                        form.vehicle === v.value
                          ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan"
                          : "border-neon-cyan/10 bg-secondary/30 text-muted-foreground hover:border-neon-cyan/30"
                      }`}
                    >
                      <Icon name={v.icon} size={28} />
                      <span className="text-sm font-medium">{v.label}</span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-neon-cyan/20 text-foreground hover:bg-neon-cyan/5 py-6"
                    onClick={() => setStep(1)}
                  >
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    Назад
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-neon-cyan to-neon-purple text-background font-semibold py-6"
                    onClick={() => setStep(3)}
                  >
                    Далее
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-lg font-semibold text-foreground mb-2">Контакты</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <Icon name="Phone" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-cyan" />
                    <Input
                      placeholder="+7 (___) ___-__-__"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="pl-10 bg-secondary/50 border-neon-cyan/10 focus:border-neon-cyan/30 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="relative">
                    <Icon name="MessageSquare" size={18} className="absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      placeholder="Комментарий (необязательно)"
                      value={form.comment}
                      onChange={(e) => updateField("comment", e.target.value)}
                      className="pl-10 bg-secondary/50 border-neon-cyan/10 focus:border-neon-cyan/30 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-neon-green/5 border border-neon-green/20">
                  <div className="flex items-center gap-3">
                    <Icon name="Shield" size={20} className="text-neon-green" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Безопасная оплата</p>
                      <p className="text-xs text-muted-foreground">Оплата картой после выполнения заказа</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-neon-cyan/20 text-foreground hover:bg-neon-cyan/5 py-6"
                    onClick={() => setStep(2)}
                  >
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    Назад
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-neon-cyan to-neon-purple text-background font-semibold py-6"
                    onClick={handleSubmit}
                  >
                    <Icon name="Zap" size={16} className="mr-2" />
                    Заказать
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
