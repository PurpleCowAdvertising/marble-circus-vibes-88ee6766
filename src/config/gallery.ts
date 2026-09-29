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

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: "veev-trophy", src: raw2036.url, alt: "Guests posing with a trophy inside the illuminated VEEV installation", width: 1280, height: 1920 },
  { id: "veev-experience", src: raw2230.url, alt: "VEEV brand experience at Scorpion Kings Live", width: 1280, height: 1920 },
  { id: "rocomamas-kitchen", src: asr02137.url, alt: "RocoMamas crew member celebrating in the event kitchen", width: 1280, height: 1920 },
  { id: "castle-lite-toast", src: asr02710.url, alt: "Guest raising a Castle Lite cup at the event", width: 1536, height: 1920 },
  { id: "schweppes-moment", src: asr03213.url, alt: "Guest presenting a Schweppes drink in the stadium", width: 1280, height: 1920 },
  { id: "friends-in-crowd", src: asr03753.url, alt: "Friends enjoying Scorpion Kings Live in a packed stadium", width: 1920, height: 1280 },
  { id: "singing-crowd", src: dsc03178.url, alt: "Fans singing along under the stadium lights", width: 1280, height: 1920 },
  { id: "performer-green", src: dsc03311.url, alt: "Performer in green connecting with the crowd", width: 1280, height: 1920 },
  { id: "friends-stands", src: php01340.url, alt: "Friends posing together in the packed stadium stands", width: 1920, height: 1280 },
  { id: "dancing-stands", src: sk5104.url, alt: "Fans dancing together in the stadium stands", width: 1920, height: 1080 },
];