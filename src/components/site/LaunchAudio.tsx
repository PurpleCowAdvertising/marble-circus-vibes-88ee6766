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
        className="fixed bottom-5 right-5 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
      >
        {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-[1px]" />}
      </button>
    </>
  );
}
