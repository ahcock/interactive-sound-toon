import { FC, useEffect, useRef, useState } from "react";
import {
  AudioPlayConsentHandler,
  ISoundLayerProps,
  ISoundRefs,
} from "../soundLayer/soundLayer.component";
import { SoundLayerSection } from "../soundLayer/soundLayer.styles";
import { ConsentModal } from "../consentModal/consentModal.component";
import { SoundGridItem } from "./soundLayerForUsers.styles";
import { useRouter } from "next/router";

const SoundLayerForUsers: FC<ISoundLayerProps> = ({
  imageLayerDimension: { height, width },
  audioInfoDocument,
}) => {
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(true);
  const [audioContext, setAudioContext] = useState<AudioContext>();
  const [isAudioConsented, setIsAudioConsented] = useState(false);
  const playingAudioTracks = useRef<{ [key: string]: boolean }>({});
  const router = useRouter();

  const audioAPITracks = useRef<{
    [key: string]: {
      audioBuffer: AudioBuffer;
      gainNode: GainNode;
    };
  }>({});

  const soundRefs = useRef<ISoundRefs>({});

  useEffect(function initializeAudioContext() {
    const audioCtx = new AudioContext();
    audioCtx.resume();
    setAudioContext(audioCtx);

    return () => {
      audioContext?.close();
    };
  }, []);

  useEffect(
    function stopAllSoundFromAudioContext() {
      const stopAllSound = () => {
        Object.values(audioAPITracks.current).forEach(({ gainNode }) =>
          gainNode.disconnect()
        );
      };

      router.events.on("routeChangeStart", stopAllSound);

      return () => {
        router.events.off("routeChangeStart", stopAllSound);
      };
    },
    [router.asPath]
  );

  useEffect(
    function registerSoundGrid() {
      if (!!audioInfoDocument && !!audioContext) {
        (async () => {
          for await (const {
            title,
            src,
            volume,
            fileName,
            action,
          } of audioInfoDocument.audioInfo) {
            const audioBuffer = await fetch(src)
              .then((res) => res.arrayBuffer())
              .then((buffer) => audioContext?.decodeAudioData(buffer));

            const gainNode = new GainNode(audioContext);

            audioAPITracks.current[title] = {
              audioBuffer: audioBuffer,
              gainNode,
            };
          }
        })();
      }
    },
    [audioInfoDocument, audioContext]
  );

  useEffect(
    function setIntersectionObserver() {
      if (!!soundRefs && !!soundRefs.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const soundName = entry.target.getAttribute("data-name");
              const action = entry.target.getAttribute("data-action");
              const volume = entry.target.getAttribute("data-volume") || "1";

              if (
                isAudioConsented &&
                audioContext &&
                entry.isIntersecting &&
                !!soundName &&
                action !== "stop"
              ) {
                const { audioBuffer, gainNode } =
                  audioAPITracks.current[soundName];

                const bufferSource = new AudioBufferSourceNode(audioContext, {
                  buffer: audioBuffer,
                });

                if (
                  !(soundName in playingAudioTracks.current) ||
                  !playingAudioTracks.current[soundName]
                ) {
                  bufferSource
                    .connect(gainNode)
                    .connect(audioContext.destination);

                  bufferSource.start();
                  playingAudioTracks.current[soundName] = true;
                }

                bufferSource.onended = (ev) => {
                  playingAudioTracks.current[soundName] = false;
                };
              }
            });
          },
          { root: null, rootMargin: "0px", threshold: 0.3 }
        );

        if (soundRefs) {
          Object.values(soundRefs.current).forEach((element) => {
            observer.observe(element);
          });
        }
      }
    },
    [
      audioContext,
      isAudioConsented,
      audioInfoDocument,
      audioInfoDocument.audioInfo,
    ]
  );

  const refCallback = (audioNode: HTMLDivElement) => {
    if (!!audioNode) {
      const soundName = audioNode.getAttribute("data-name");
      if (!!soundName && !!audioContext) {
        soundRefs.current[soundName] = audioNode;
      }
    }
  };

  const audioPlayConsentHandler: AudioPlayConsentHandler = (
    isAudioPlaybackConsented
  ) => {
    if (isAudioPlaybackConsented) {
      setIsAudioConsented(true);
      audioContext?.resume();
    }

    setIsConsentModalOpen(false);
  };

  return (
    <SoundLayerSection height={height} width={width}>
      {isConsentModalOpen && (
        <ConsentModal audioPlayConsentHandler={audioPlayConsentHandler} />
      )}
      {audioInfoDocument.audioInfo.map((data) => {
        const { index, gridPosition, title, action, volume, src } = data;

        return (
          <SoundGridItem
            gridPosition={gridPosition}
            key={gridPosition.row + gridPosition.column}
            ref={refCallback}
            data-name={title}
            data-action={action}
            data-volume={volume}
          />
        );
      })}
    </SoundLayerSection>
  );
};

export { SoundLayerForUsers };
