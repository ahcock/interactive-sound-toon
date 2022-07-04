import { FC, useEffect, useRef, useState } from "react";
import {
  ISoundGridDataForCreator,
  ISoundLayerProps,
  ISoundRefs,
  SoundInfo,
} from "../soundLayer/soundLayer.component";
import {
  SoundLayerSection,
  StyledAudio,
} from "../soundLayer/soundLayer.styles";
import { AudioElementWrapper } from "../audioElementWrapper/audioElementWrapper.component";

interface IGridLayout
  extends Pick<ISoundGridDataForCreator, "index" | "gridPosition"> {}

type SoundInfoForUsers = Omit<
  SoundInfo,
  "onSoundContainerClick" | "isSoundAlreadyUploaded"
>;

interface ISoundGridDataForUsers extends IGridLayout {
  soundInfo?: SoundInfoForUsers;
}

const SoundLayerForUsers: FC<ISoundLayerProps> = ({
  imageLayerDimension: { height, width },
  audioInfoDocument,
}) => {
  const [soundGridData, setSoundGridData] = useState<ISoundGridDataForUsers[]>(
    []
  );
  const [isSoundAgreed, setIsSoundAgreed] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext>();

  const audioAPITracks = useRef<{
    [key: string]: {
      track: MediaElementAudioSourceNode;
      gainNode: GainNode;
    };
  }>({});

  const soundRefs = useRef<ISoundRefs>({});

  useEffect(() => {
    const audioCtx = new AudioContext();
    setAudioContext(audioCtx);
  }, []);

  useEffect(
    function registerSoundGrid() {
      const gridLayout: ISoundGridDataForUsers[] = [];

      for (let i = 1; i < 201; i++) {
        for (let j = 1; j < 11; j++) {
          gridLayout.push({
            index: gridLayout.length,
            gridPosition: { row: `${i} / ${i + 1}`, column: `${j} / ${j + 1}` },
          });
        }
      }

      if (!!audioInfoDocument) {
        (async () => {
          for (const {
            index,
            gridPosition,
            title,
            src,
            volume,
            fileName,
            action,
          } of audioInfoDocument.audioInfo) {
            gridLayout[index] = {
              gridPosition,
              index,
              soundInfo: {
                title,
                volume,
                fileName,
                src,
                ...(action && { action }),
              },
            };
          }
        })();
      }

      setSoundGridData(gridLayout);
    },
    [audioInfoDocument, audioInfoDocument.audioInfo]
  );

  useEffect(
    function setIntersectionObserver() {
      if (!!soundRefs && !!soundRefs.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              //TODO: https://bobbyhadz.com/blog/javascript-get-all-attributes-of-element 적용
              const soundName = entry.target.getAttribute("data-name");
              const action = entry.target.getAttribute("data-action");
              const volume = entry.target.getAttribute("data-volume") || "1";

              if (
                entry.isIntersecting &&
                !!action &&
                !!soundName &&
                action === "stop" &&
                soundRefs.current[soundName].currentTime > 0
              ) {
                soundRefs.current[soundName.split("-")[0]].volume = 0;
                soundRefs.current[soundName.split("-")[0]].pause();
                soundRefs.current[soundName.split("-")[0]].currentTime = 0;
                return;
              }

              if (
                entry.isIntersecting &&
                !!soundName &&
                action !== "stop" &&
                soundRefs.current[soundName].paused
              ) {
                audioAPITracks.current[soundName].gainNode.gain.value =
                  parseFloat(!!volume ? `${volume}` : "1");
                soundRefs.current[soundName].play();
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
    [isSoundAgreed, soundGridData]
  );

  const refCallback = (audioNode: HTMLAudioElement) => {
    if (!!audioNode) {
      const additionalAction = audioNode.getAttribute("data-action");
      const soundName = additionalAction
        ? `${additionalAction}-${audioNode.getAttribute("data-name")}`
        : audioNode.getAttribute("data-name");

      if (!!soundName && !audioAPITracks.current[soundName] && !!audioContext) {
        soundRefs.current[soundName] = audioNode;

        // make new audio context for Web Audio API
        const track = audioContext.createMediaElementSource(
          soundRefs.current[soundName]
        );

        const gainNode = audioContext.createGain();

        track.connect(gainNode).connect(audioContext.destination);

        audioAPITracks.current = {
          ...audioAPITracks.current,
          [soundName]: {
            track,
            gainNode,
          },
        };
      }
    }
  };

  const soundPlayConsentHandler = () => {
    if (!isSoundAgreed) {
      setIsSoundAgreed(true);
      audioContext?.resume();
    }
  };

  return (
    <SoundLayerSection height={height} width={width}>
      <button onClick={soundPlayConsentHandler}>사운드 들을랴?</button>
      {soundGridData.map((data) => {
        const { index, gridPosition, soundInfo } = data;
        const { title, action, volume, src } = soundInfo || {
          title: "",
          action: "",
          volume: 1,
          src: "",
        };

        return (
          <AudioElementWrapper key={index + title} gridInfo={gridPosition}>
            <StyledAudio
              ref={refCallback}
              data-name={title}
              data-action={action}
              data-volume={volume}
              controls
              crossOrigin="anonymous"
            >
              <source src={src} />
            </StyledAudio>
          </AudioElementWrapper>
        );
      })}
    </SoundLayerSection>
  );
};

export { SoundLayerForUsers };
