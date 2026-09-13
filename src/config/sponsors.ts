import galxboy from "@/assets/sponsors/1-galxboy.png.asset.json";
import mccafe from "@/assets/sponsors/2-mccafe.png.asset.json";
import rocomamas from "@/assets/sponsors/3-rocomamas-cropped.png";
import sabc1 from "@/assets/sponsors/6-sabc1.png.asset.json";
import sprite from "@/assets/sponsors/4-sprite-white.png.asset.json";
import veev from "@/assets/sponsors/7-veev.png.asset.json";
import gautrain from "@/assets/sponsors/8-gautrain.jpg.asset.json";

export type Sponsor = {
  name: string;
  logo: string;
  /** Logo artwork needs a light chip behind it to stay legible on dark sections. */
  onLight?: boolean;
  url?: string;
  /** Optional override for the logo image sizing class. */
  imgClassName?: string;
  /** Extra-wide artwork: reduce chip padding so the logo reads at the same size. */
  wide?: boolean;
};

export const SPONSORS: Sponsor[] = [
  { name: "Galxboy", logo: galxboy.url },
  { name: "McCafé", logo: mccafe.url },
  {
    name: "RocoMamas",
    logo: rocomamas,
    wide: true,
    imgClassName: "h-14 w-full object-fill object-center",
    url: "https://rocomamas.com/za/campaign/rocomamas-x-scorpion-kings",
  },
  { name: "SABC 1", logo: sabc1.url, onLight: true },
  { name: "Sprite", logo: sprite.url },
  { name: "VEEV", logo: veev.url },
  { name: "Gautrain", logo: gautrain.url, onLight: true, imgClassName: "max-h-16 w-auto max-w-full object-contain md:max-h-20" },
];
