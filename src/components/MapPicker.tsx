import { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const createIcon = (color: string) =>
  L.divIcon({
    className: "",
    html: `<div style="width:32px;height:32px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 0 12px ${color}80, 0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><div style="width:8px;height:8px;border-radius:50%;background:white;"></div></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

const cyanIcon = createIcon("hsl(195,100%,50%)");
const purpleIcon = createIcon("hsl(270,80%,60%)");

const ClickHandler = ({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const FlyTo = ({ center, flyKey }: { center: [number, number] | null; flyKey: number }) => {
  const map = useMap();
  useEffect(() => {
    if (center && flyKey > 0) {
      map.flyTo(center, 16, { duration: 1 });
    }
  }, [center, flyKey, map]);
  return null;
};

interface MapPickerProps {
  mode: "from" | "to";
  fromPos: [number, number] | null;
  toPos: [number, number] | null;
  onSelect: (lat: number, lng: number) => void;
  onAddressResolved: (address: string) => void;
}

const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=ru`
    );
    const data = await res.json();
    if (data.display_name) {
      const parts = data.display_name.split(",").slice(0, 3);
      return parts.join(",").trim();
    }
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  } catch {
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }
};

const MapPicker = ({ mode, fromPos, toPos, onSelect, onAddressResolved }: MapPickerProps) => {
  const { toast } = useToast();
  const [geoLoading, setGeoLoading] = useState(false);
  const [flyTarget, setFlyTarget] = useState<[number, number] | null>(null);
  const [flyKey, setFlyKey] = useState(0);
  const defaultCenter: [number, number] = [55.7558, 37.6173];

  const handleClick = useCallback(
    async (lat: number, lng: number) => {
      onSelect(lat, lng);
      const address = await reverseGeocode(lat, lng);
      onAddressResolved(address);
    },
    [onSelect, onAddressResolved]
  );

  const handleGeolocate = useCallback(() => {
    if (!navigator.geolocation) {
      toast({ title: "Геолокация недоступна", description: "Ваш браузер не поддерживает геолокацию", variant: "destructive" });
      return;
    }

    setGeoLoading(true);
    toast({ title: "Определяем местоположение...", description: "Разрешите доступ к геопозиции в браузере" });

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        onSelect(lat, lng);
        setFlyTarget([lat, lng]);
        setFlyKey((k) => k + 1);
        const address = await reverseGeocode(lat, lng);
        onAddressResolved(address);
        setGeoLoading(false);
        toast({ title: "Местоположение определено", description: address });
      },
      (err) => {
        setGeoLoading(false);
        const messages: Record<number, string> = {
          1: "Вы запретили доступ к геопозиции. Разрешите в настройках браузера.",
          2: "Не удалось определить местоположение. Попробуйте ещё раз.",
          3: "Время ожидания истекло. Проверьте GPS и попробуйте снова.",
        };
        toast({
          title: "Ошибка геолокации",
          description: messages[err.code] || "Неизвестная ошибка",
          variant: "destructive",
        });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  }, [onSelect, onAddressResolved, toast]);

  const center = mode === "from" ? fromPos || defaultCenter : toPos || fromPos || defaultCenter;

  return (
    <div className="rounded-xl overflow-hidden border border-neon-cyan/10 relative">
      <div className="absolute top-3 left-3 z-[1000] flex items-center gap-2">
        <div
          className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md ${
            mode === "from"
              ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30"
              : "bg-neon-purple/20 text-neon-purple border border-neon-purple/30"
          }`}
        >
          {mode === "from" ? "📍 Укажите точку подачи" : "🏁 Укажите точку доставки"}
        </div>
      </div>

      <div className="absolute top-3 right-3 z-[1000]">
        <Button
          size="sm"
          type="button"
          onClick={handleGeolocate}
          disabled={geoLoading}
          className="bg-background/80 backdrop-blur-md border border-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/10 text-xs gap-1.5"
        >
          <Icon name={geoLoading ? "Loader2" : "LocateFixed"} size={14} className={geoLoading ? "animate-spin" : ""} />
          {geoLoading ? "Определяю..." : "Моё местоположение"}
        </Button>
      </div>

      <MapContainer
        center={center}
        zoom={13}
        style={{ height: 320, width: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        <ClickHandler onMapClick={handleClick} />
        <FlyTo center={flyTarget} flyKey={flyKey} />
        {fromPos && <Marker position={fromPos} icon={cyanIcon} />}
        {toPos && <Marker position={toPos} icon={purpleIcon} />}
      </MapContainer>
    </div>
  );
};

export default MapPicker;
