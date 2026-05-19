import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type Props = { src: string; startAt?: number; volume?: number };

export function LaunchAudio({ src, startAt = 0, volume = 0.6 }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;

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
        setNeedsTap(false);
      } catch {
        setNeedsTap(true);
        const unlock = async () => {
          try {
            audio.currentTime = startAt;
            await audio.play();
            setNeedsTap(false);
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
      audio.pause();
    };
  }, [src, startAt, volume]);

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        type="button"
        onClick={() => {
          const a = audioRef.current;
          if (!a) return;
          if (muted) {
            a.muted = false;
            a.play().catch(() => {});
            setMuted(false);
          } else {
            a.muted = true;
            setMuted(true);
          }
        }}
        aria-label={muted ? "Unmute soundtrack" : "Mute soundtrack"}
        className="fixed bottom-5 right-5 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
      >
        {muted || needsTap ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>
    </>
  );
}
