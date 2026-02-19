import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const navLinks = [
  { label: "Главная", href: "#hero" },
  { label: "Заказ", href: "#order" },
  { label: "Отслеживание", href: "#tracking" },
  { label: "Услуги", href: "#services" },
  { label: "Тарифы", href: "#pricing" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-neon-cyan/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => handleClick("#hero")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
            <Icon name="Truck" size={18} className="text-background" />
          </div>
          <span className="font-display text-xl font-bold tracking-wider text-foreground group-hover:text-neon-cyan transition-colors">
            ЭВАКУАТОР
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-neon-cyan transition-colors rounded-lg hover:bg-neon-cyan/5"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <Button
            onClick={() => handleClick("#order")}
            className="bg-gradient-to-r from-neon-cyan to-neon-purple text-background font-semibold hover:opacity-90 transition-opacity"
          >
            <Icon name="Phone" size={16} className="mr-2" />
            Вызвать
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-neon-cyan/10 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="px-4 py-3 text-left text-muted-foreground hover:text-neon-cyan transition-colors rounded-lg hover:bg-neon-cyan/5"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => handleClick("#order")}
              className="mt-2 bg-gradient-to-r from-neon-cyan to-neon-purple text-background font-semibold"
            >
              <Icon name="Phone" size={16} className="mr-2" />
              Вызвать эвакуатор
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
