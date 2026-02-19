import Icon from "@/components/ui/icon";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-neon-cyan/10 relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                <Icon name="Truck" size={18} className="text-background" />
              </div>
              <span className="font-display text-lg font-bold text-foreground">ЭВАКУАТОР</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Сервис вызова эвакуатора нового поколения. Быстро, безопасно, прозрачно.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Услуги</h4>
            <ul className="space-y-2">
              {["Эвакуация авто", "Техпомощь", "Междугородняя перевозка", "Страховые случаи"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-neon-cyan transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Компания</h4>
            <ul className="space-y-2">
              {["О нас", "Вакансии", "Партнёрам", "Блог"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-neon-cyan transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={14} className="text-neon-cyan" />
                <span className="text-sm text-muted-foreground">+7 (800) 123-45-67</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={14} className="text-neon-cyan" />
                <span className="text-sm text-muted-foreground">info@evakuator.pro</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="MessageCircle" size={14} className="text-neon-cyan" />
                <span className="text-sm text-muted-foreground">Telegram-бот</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neon-cyan/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 ЭВАКУАТОР. Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            {["Send", "MessageCircle", "Phone"].map((icon) => (
              <button
                key={icon}
                className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all"
              >
                <Icon name={icon} size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
