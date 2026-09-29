import raw2036 from "@/assets/gallery/RAW2036_OFFGRIDZA.jpg.asset.json";
import raw2230 from "@/assets/gallery/RAW2230_OFFGRIDZA.jpg.asset.json";
import asr02137 from "@/assets/gallery/ASR02137_OFFGRIDZA.jpg.asset.json";
import asr02710 from "@/assets/gallery/ASR02710_OFFGRIDZA_1.jpg.asset.json";
import asr03213 from "@/assets/gallery/ASR03213_OFFGRIDZA.jpg.asset.json";
import asr03753 from "@/assets/gallery/ASR03753_OFFGRIDZA.jpg.asset.json";
import dsc03178 from "@/assets/gallery/DSC03178OFFGRIDZA.jpg.asset.json";
import dsc03311 from "@/assets/gallery/DSC03311OFFGRIDZA.jpg.asset.json";
import php01340 from "@/assets/gallery/PHP01340.jpg.asset.json";
import sk5104 from "@/assets/gallery/SK-5104.jpg.asset.json";
import sk9318 from "@/assets/gallery/SK-9318.jpg.asset.json";
import sk9399 from "@/assets/gallery/SK-9399.jpg.asset.json";
import sk9524 from "@/assets/gallery/SK-9524.jpg.asset.json";
import sk9691 from "@/assets/gallery/SK-9691.jpg.asset.json";
import sk9765 from "@/assets/gallery/SK-9765.jpg.asset.json";
import sk9836 from "@/assets/gallery/SK-9836.jpg.asset.json";
import sk9934 from "@/assets/gallery/SK-9934.jpg.asset.json";
import sk9978 from "@/assets/gallery/SK-9978.jpg.asset.json";
import sk3010078 from "@/assets/gallery/SK3-010078.jpg.asset.json";
import sk3019538 from "@/assets/gallery/SK3-019538.jpg.asset.json";
import raw0001g from "@/assets/gallery/RAW0001OFFGRIDZA.jpg.asset.json";
import raw0032g from "@/assets/gallery/RAW0032OFFGRIDZA.jpg.asset.json";
import raw0039g from "@/assets/gallery/RAW0039OFFGRIDZA.jpg.asset.json";
import raw0049g from "@/assets/gallery/RAW0049OFFGRIDZA.jpg.asset.json";
import raw2132g from "@/assets/gallery/RAW2132OFFGRIDZA.jpg.asset.json";
import raw9809g from "@/assets/gallery/RAW9809OFFGRIDZA.jpg.asset.json";
import raw9856g from "@/assets/gallery/RAW9856OFFGRIDZA.jpg.asset.json";
import raw9889g from "@/assets/gallery/RAW9889OFFGRIDZA.jpg.asset.json";
import raw9976g from "@/assets/gallery/RAW9976OFFGRIDZA.jpg.asset.json";
import raw9999g from "@/assets/gallery/RAW9999OFFGRIDZA.jpg.asset.json";

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Event edition the photo belongs to. */
  year: 2025 | 2026;
};

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: "veev-trophy", src: raw2036.url, alt: "Guests posing with a trophy inside the illuminated VEEV installation", width: 1280, height: 1920, year: 2025 },
  { id: "veev-experience", src: raw2230.url, alt: "VEEV brand experience at Scorpion Kings Live", width: 1280, height: 1920, year: 2025 },
  { id: "rocomamas-kitchen", src: asr02137.url, alt: "RocoMamas crew member celebrating in the event kitchen", width: 1280, height: 1920, year: 2025 },
  { id: "castle-lite-toast", src: asr02710.url, alt: "Guest raising a Castle Lite cup at the event", width: 1536, height: 1920, year: 2025 },
  { id: "schweppes-moment", src: asr03213.url, alt: "Guest presenting a Schweppes drink in the stadium", width: 1280, height: 1920, year: 2025 },
  { id: "friends-in-crowd", src: asr03753.url, alt: "Friends enjoying Scorpion Kings Live in a packed stadium", width: 1920, height: 1280, year: 2025 },
  { id: "singing-crowd", src: dsc03178.url, alt: "Fans singing along under the stadium lights", width: 1280, height: 1920, year: 2025 },
  { id: "performer-green", src: dsc03311.url, alt: "Performer in green connecting with the crowd", width: 1280, height: 1920, year: 2025 },
  { id: "friends-stands", src: php01340.url, alt: "Friends posing together in the packed stadium stands", width: 1920, height: 1280, year: 2025 },
  { id: "dancing-stands", src: sk5104.url, alt: "Fans dancing together in the stadium stands", width: 1920, height: 1080, year: 2025 },
  { id: "fisheye-sunglasses", src: sk9318.url, alt: "Two friends pulling faces in sunglasses in the stadium stands", width: 1920, height: 1080, year: 2026 },
  { id: "crew-on-field", src: sk9399.url, alt: "Group of friends in white tees on the field in front of the stage", width: 1920, height: 1536, year: 2026 },
  { id: "couple-fnb-stadium", src: sk9524.url, alt: "Couple posing outside FNB Stadium", width: 1536, height: 1920, year: 2026 },
  { id: "green-checker-stage", src: sk9691.url, alt: "Performer on stage in front of green checkered screens", width: 1920, height: 1280, year: 2026 },
  { id: "neon-stage-dance", src: sk9765.url, alt: "Performer dancing on the neon-lit stage", width: 1920, height: 1280, year: 2026 },
  { id: "white-fit-smoke", src: sk9836.url, alt: "Performer in white on stage with smoke and neon columns", width: 1920, height: 1280, year: 2026 },
  { id: "dancers-lightbox", src: sk9934.url, alt: "Performer and dancers on the illuminated stage", width: 1920, height: 1280, year: 2026 },
  { id: "pyro-finale", src: sk9978.url, alt: "Pyrotechnics erupting above the stage", width: 1920, height: 1080, year: 2026 },
  { id: "red-suit-runway", src: sk3010078.url, alt: "Performer in a red suit working the stage runway", width: 1920, height: 1280, year: 2026 },
  { id: "puffer-jacket", src: sk3019538.url, alt: "Performer carrying a colourful puffer jacket across the stage", width: 1920, height: 1280, year: 2026 },
  { id: "seated-sk-stage", src: raw0001g.url, alt: "Scorpion King performing seated on the stage steps with a dancer behind", width: 1280, height: 1920, year: 2026 },
  { id: "performer-crutch", src: raw0032g.url, alt: "Guest performer singing in front of the SK stage set", width: 1280, height: 1920, year: 2026 },
  { id: "shirtless-light-trails", src: raw0039g.url, alt: "Performer on stage framed by swirling blue light trails", width: 1280, height: 1920, year: 2026 },
  { id: "beige-light-sweep", src: raw0049g.url, alt: "Performer in beige striding across the stage through light streaks", width: 1280, height: 1920, year: 2026 },
  { id: "red-carpet-trio", src: raw2132g.url, alt: "Three guests on the Scorpion Kings Live red carpet", width: 1280, height: 1920, year: 2026 },
  { id: "red-car-portrait", src: raw9809g.url, alt: "Guest seated in the doorway of a red classic car", width: 1280, height: 1920, year: 2026 },
  { id: "crowd-selfie", src: raw9856g.url, alt: "Fan taking a selfie with the lit-up stadium crowd behind", width: 1280, height: 1920, year: 2026 },
  { id: "yellow-feathers", src: raw9889g.url, alt: "Vocalist in yellow feathers performing in front of the SK stage", width: 1280, height: 1920, year: 2026 },
  { id: "hosts-on-stage", src: raw9976g.url, alt: "Hosts addressing the crowd in front of a red raised-fist screen", width: 1280, height: 1920, year: 2026 },
  { id: "seated-sk-dancer", src: raw9999g.url, alt: "Scorpion King seated on stage while a dancer performs behind", width: 1280, height: 1920, year: 2026 },
];

/** Year sections for the gallery page — newest edition first. */
export const GALLERY_YEARS = [2026, 2025] as const;

export function photosByYear(year: 2025 | 2026): GalleryPhoto[] {
  return GALLERY_PHOTOS.filter((photo) => photo.year === year);
}
