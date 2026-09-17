import galxboy from "@/assets/sponsors/1-galxboy.png.asset.json";
import mccafe from "@/assets/sponsors/2-mccafe.png.asset.json";
import rocomamas from "@/assets/sponsors/3-rocomamas.png.asset.json";
import sabc1 from "@/assets/sponsors/6-sabc1-transparent.png.asset.json";
import sprite from "@/assets/sponsors/4-sprite-white.png.asset.json";
import veev from "@/assets/sponsors/7-veev.png.asset.json";
import gautrain from "@/assets/sponsors/8-gautrain-transparent.png.asset.json";
import castleLite from "@/assets/sponsors/9-castle-lite-transparent.png.asset.json";
import sampra from "@/assets/sponsors/10-sampra-transparent.png.asset.json";
import cabsCarHire from "@/assets/sponsors/11-cabs-car-hire.png.asset.json";
import gautengSacr from "@/assets/sponsors/12-gauteng-sacr.png.asset.json";
import audiCentre from "@/assets/sponsors/13-audi-centre-wonderboom.png.asset.json";
import sportArtsCulture from "@/assets/sponsors/14-sport-arts-culture.png.asset.json";

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
  { name: "Galxboy", logo: galxboy.url, url: "https://galxboy.co.za/collections/scorpion-kings" },
  { name: "McCafé", logo: mccafe.url, url: "https://www.mcdonalds.co.za/mymrewards" },
  {
    name: "RocoMamas",
    logo: rocomamas.url,
    wide: true,
    imgClassName: "h-full w-full object-contain object-center",
    url: "https://rocomamas.com/za/campaign/rocomamas-x-scorpion-kings",
  },
  { name: "SABC 1", logo: sabc1.url, url: "https://www.sabc1.co.za/sabc1/", imgClassName: "h-full w-full object-contain object-center" },
  {
    name: "Gauteng Province",
    logo: gautengSacr.url,
    imgClassName: "h-full w-full object-contain object-center",
    url: "https://www.gov.za/about-government/contact-directory/provincial-gov/gauteng-provincial-government",
  },
  {
    name: "Sport, Arts and Culture",
    logo: sportArtsCulture.url,
    wide: true,
    imgClassName: "h-full w-full object-contain object-center",
    url: "https://www.dsac.gov.za/",
  },
  { name: "Sprite", logo: sprite.url, url: "https://www.instagram.com/sprite_rsa?stkn=dmZzeXVzM3gxMnFh", imgClassName: "h-full w-full object-contain object-center" },
  { name: "VEEV", logo: veev.url, url: "https://www.instagram.com/veev_rsa?stkn=MW56b2Nwdmc5eDE1" },
  { name: "Gautrain", logo: gautrain.url, wide: true, url: "https://www.mygautrain.co.za/competitions/scorpion-kings-live-at-fnb-stadium", imgClassName: "h-full w-full object-contain object-center" },
  { name: "Castle Lite", logo: castleLite.url, wide: true, url: "https://www.castlelite.co.za/", imgClassName: "h-full w-full object-contain object-center" },
  { name: "SAMPRA", logo: sampra.url, wide: true, url: "https://sampra.org.za/", imgClassName: "h-full w-full object-contain object-center" },
  { name: "Cabs Car Hire", logo: cabsCarHire.url, wide: true, url: "https://cabscarhire.com/", imgClassName: "h-full w-full object-contain object-center" },
  { name: "Audi Centre Wonderboom", logo: audiCentre.url, wide: true, imgClassName: "h-full w-full object-contain object-center" },
];
