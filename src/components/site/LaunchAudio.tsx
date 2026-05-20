import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

type Props = { src: string; startAt?: number; volume?: number };

export function LaunchAudio({ src, startAt = 0, volume = 0.65 }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    const seekAndPlay = async () => {
      try {
        if (audio.readyState < 1) {
          await new Promise<void>((res) => {
            const on = () => {
              audio.removeEventListener("loadedmetadata", on);
              res();
            };
            audio.addEventListener("loadedmetadata", on);
          });
        }
        try {
          audio.currentTime = startAt;
        } catch {}
        await audio.play();
      } catch {
        const unlock = async () => {
          try {
            audio.currentTime = startAt;
            await audio.play();
            window.removeEventListener("pointerdown", unlock);
            window.removeEventListener("keydown", unlock);
          } catch {}
        };
        window.addEventListener("pointerdown", unlock, { once: false });
        window.addEventListener("keydown", unlock, { once: false });
      }
    };

    seekAndPlay();
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
    };
  }, [src, startAt, volume]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause soundtrack" : "Play soundtrack"}
        className="fixed bottom-5 right-5 z-[100] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/80 text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.8)] backdrop-blur transition hover:scale-105 hover:bg-black"
      >
        {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-[1px]" />}
      </button>
    </>
  );
}
