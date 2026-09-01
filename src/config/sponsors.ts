import galxboy from "@/assets/sponsors/1-galxboy.png.asset.json";
import mccafe from "@/assets/sponsors/2-mccafe.png.asset.json";
import rocomamas from "@/assets/sponsors/3-rocomamas.png.asset.json";
import sprite from "@/assets/sponsors/4-sprite.png.asset.json";
import standardBank from "@/assets/sponsors/5-standard-bank.png.asset.json";

export type Sponsor = {
  name: string;
  logo: string;
  /** Logo artwork needs a light chip behind it to stay legible on dark sections. */
  onLight?: boolean;
  url?: string;
};

export const SPONSORS: Sponsor[] = [
  { name: "Galxboy", logo: galxboy.url },
  { name: "McCafé", logo: mccafe.url },
  { name: "RocoMamas", logo: rocomamas.url, onLight: true },
  { name: "Sprite", logo: sprite.url, onLight: true },
  { name: "Standard Bank", logo: standardBank.url },
];
