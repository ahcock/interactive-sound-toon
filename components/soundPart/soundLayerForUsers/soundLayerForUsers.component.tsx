import { FC, useEffect, useRef, useState } from "react";
import {
  AudioAPITracks,
  AudioPlayConsentHandler,
  ISoundLayerProps,
  ISoundRefs,
  PlayingAudioTracks,
} from "../soundLayer/soundLayer.component";
import { SoundLayerSection } from "../soundLayer/soundLayer.styles";
import { ConsentModal } from "../consentModal/consentModal.component";
import { SoundGridItem } from "./soundLayerForUsers.styles";
import { useRouter } from "next/router";
import { isNull } from "lodash";

const SoundLayerForUsers: FC<ISoundLayerProps> = ({
  imageLayerDimension: { height, width },
  audioInfoDocument,
}) => {
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(true);
  const [audioContext, setAudioContext] = useState<AudioContext>();
  const [isAudioConsented, setIsAudioConsented] = useState(false);
  const playingAudioTracks = useRef<PlayingAudioTracks>({});
  const router = useRouter();

  const audioAPITracks = useRef<AudioAPITracks>({});

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
            if (!!src && !action) {
              const audioBuffer = await fetch(src)
                .then((res) => res.arrayBuffer())
                .then((buffer) => audioContext?.decodeAudioData(buffer));

              const gainNode = new GainNode(audioContext);

              audioAPITracks.current[title] = {
                audioBuffer: audioBuffer,
                gainNode,
              };
            }
          }
        })();
      }
    },
    [audioInfoDocument, audioContext]
  );

  useEffect(
    function setIntersectionObserver() {
      if (
        !!soundRefs &&
        !!soundRefs.current &&
        isAudioConsented &&
        audioContext
      ) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              //TODO: https://bobbyhadz.com/blog/javascript-get-all-attributes-of-element 적용
              const soundName = entry.target.getAttribute("data-name") || "";
              const action = entry.target.getAttribute("data-action");
              const volume = parseInt(
                entry.target.getAttribute("data-volume") || "1"
              );

              const amp = audioAPITracks.current[soundName].gainNode.gain;

              if (
                !isNull(action) &&
                entry.isIntersecting &&
                !!soundName &&
                action === "stop" &&
                amp.value >= volume // 한번 fade-out이 시작되어 원래 셋팅된 볼륨보다 작아지기 시작했을 때부터는, 또 다시 fade-out을 방지하기 위한 조건(안 그럼 볼륨이 내려가다가 스크롤이 지날 때 마다 다시 올라갔다 내려갔다 반복함)
              ) {
                amp.setValueAtTime(volume, audioContext.currentTime);
                amp.linearRampToValueAtTime(0, audioContext.currentTime + 2);

                playingAudioTracks.current[soundName]?.stop(
                  audioContext.currentTime + 2.1
                );

                // recover volume after fade-out for the next play
                amp.setValueAtTime(volume, audioContext.currentTime + 2.1);
              }

              if (entry.isIntersecting && !!soundName && action !== "stop") {
                const { audioBuffer, gainNode } =
                  audioAPITracks.current[soundName];

                const bufferSource = new AudioBufferSourceNode(audioContext, {
                  buffer: audioBuffer,
                });

                if (!playingAudioTracks.current[soundName]) {
                  bufferSource
                    .connect(gainNode)
                    .connect(audioContext.destination);

                  bufferSource.start();
                  playingAudioTracks.current[soundName] = bufferSource;
                }

                bufferSource.onended = (ev) => {
                  playingAudioTracks.current[soundName] = undefined;
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
      const name = audioNode.getAttribute("data-name");
      const action = audioNode.getAttribute("data-action");
      const soundName = isNull(action) ? name : `${name}-${action}`;

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
