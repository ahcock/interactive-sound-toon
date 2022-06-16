import { FC, useEffect, useRef, useState } from "react";
import {
  SoundContainer,
  SoundLayerSection,
  StyledAudio,
} from "./soundLayer.styles";
import { GridForSoundCreator } from "../soundGridForCreator/soundGridForCreator.component";
import { SoundSaveModal } from "../../fileUploadModal/fileUploadModal.component";

type GridInfo = {
  column: string;
  row: string;
};

type SavedSound = { name: string; file?: File | null };

type OnGridClick = (gridInfo: GridInfo, index: number) => void;

type OnSavedSoundClick = (
  gridInfo: GridInfo,
  index: number,
  savedSound: SavedSound
) => void;

type OnSoundSave = (
  title: string,
  file?: File,
  volume?: number,
  savedSound?: SavedSound
) => void;

type OnSoundDelete = (gridPosition: GridInfo) => void;

type OnAdditionalEventSave = (soundName: string, action: string) => void;

interface ISoundModalStatus {
  isModalOpen: boolean;
  modalOpenedGridPosition: GridInfo;
  savedSound?: SavedSound;
  clickedGridIndex: number;
}

interface ISoundRefs {
  [key: string]: HTMLAudioElement;
}

interface ISoundLayerProps {
  imageLayerDimension: {
    height: number;
    width: number;
  };
}

interface ISoundGridData {
  index: number;
  gridPosition: GridInfo;
  showGrid: boolean;
  onGridClick: OnGridClick;
  soundInfo?: {
    src?: string;
    title: string;
    fileName?: string;
    volume?: number;
    onSoundContainerClick: () => void;
    action?: string;
  };
}

type SavedSoundGridData = Pick<
  ISoundGridData,
  "index" | "gridPosition" | "soundInfo"
> & { soundInfo: { src: File } };

// TODO: 저장된 사운드 불러오기, 렌더링 하기
// TODO: 서버에서 사운드를 불러오기, 렌더링 하기
// TODO: 데이터 베이스 스키마는 어떻게 짤 것인가?
// TODO: 회차별로 짤 것인가?

const SoundLayer: FC<ISoundLayerProps> = ({
  imageLayerDimension: { height, width },
}) => {
  const [soundGridData, setSoundGridData] = useState<ISoundGridData[]>([]);
  const [soundModalStatus, setSoundModalStatus] = useState<ISoundModalStatus>({
    isModalOpen: false,
    modalOpenedGridPosition: {
      column: "",
      row: "",
    },
    clickedGridIndex: 0,
  });
  //
  // const [audioContext, setAudioContext] = useState<AudioContext>();
  // const [audioAPITracks, setAudioAPITracks] = useState<{
  //   [key: string]: {
  //     track: MediaElementAudioSourceNode;
  //     gainNode: GainNode;
  //   };
  // }>({});

  const audioAPITracks = useRef<{
    [key: string]: {
      track: MediaElementAudioSourceNode;
      gainNode: GainNode;
    };
  }>({});

  const audioContext = new AudioContext();

  const soundRefs = useRef<ISoundRefs>({});

  // TODO: 사운드 저장시 필요한 것 아래 push되는 항목에서 onGridClick. showGrid 빼고

  useEffect(function registerSoundGrid() {
    const soundGridInfo: ISoundGridData[] = [];

    for (let i = 1; i < 201; i++) {
      for (let j = 1; j < 11; j++) {
        soundGridInfo.push({
          index: soundGridInfo.length,
          gridPosition: { row: `${i} / ${i + 1}`, column: `${j} / ${j + 1}` },
          showGrid: true,
          onGridClick: onGridClick,
        });
      }
    }

    setSoundGridData(soundGridInfo);
  }, []);

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
                // soundRefs.current[soundName].volume = parseFloat(volume);
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
    [soundGridData]
  );

  const refCallback = (audioNode: HTMLAudioElement) => {
    if (!!audioNode) {
      const additionalAction = audioNode.getAttribute("data-action");
      const soundName = additionalAction
        ? `${additionalAction}-${audioNode.getAttribute("data-name")}`
        : audioNode.getAttribute("data-name");

      if (!!soundName && !audioAPITracks.current[soundName]) {
        soundRefs.current[soundName] = audioNode;

        // make new audio context for Web Audio API
        const track = audioContext.createMediaElementSource(
          soundRefs.current[soundName]
        );

        const gainNode = audioContext.createGain();

        // const eq = audioContext.createBiquadFilter();
        // eq.type = "lowpass";
        // eq.frequency.value = 200;
        //

        track.connect(gainNode).connect(audioContext.destination);

        audioAPITracks.current = {
          ...audioAPITracks.current,
          [soundName]: {
            track,
            gainNode,
          },
        };

        // setAudioAPITracks({
        //   ...audioAPITracks,
        //   [soundName]: {
        //     track,
        //     gainNode,
        //   },
        // });
      }
    }
  };

  console.log(audioAPITracks);

  const onGridClick: OnGridClick = (gridInfo, index) => {
    setSoundModalStatus({
      modalOpenedGridPosition: gridInfo,
      isModalOpen: true,
      clickedGridIndex: index,
    });
  };

  const onSavedSoundClick: OnSavedSoundClick = (
    gridInfo,
    index,
    savedSound
  ) => {
    setSoundModalStatus({
      savedSound,
      isModalOpen: true,
      modalOpenedGridPosition: gridInfo,
      clickedGridIndex: index,
    });
  };

  const onSoundSave: OnSoundSave = (title, file, volume) => {
    if (!!file) {
      console.log("온 세이브 먼저");
      const audioUrl = URL.createObjectURL(file);

      const gridDataWithSound: ISoundGridData = {
        index: soundModalStatus.clickedGridIndex,
        gridPosition: soundModalStatus.modalOpenedGridPosition,
        showGrid: true,
        onGridClick: onGridClick,
        soundInfo: {
          title,
          volume,
          fileName: file.name,
          src: audioUrl,
          onSoundContainerClick: () =>
            onSavedSoundClick(
              soundModalStatus.modalOpenedGridPosition,
              soundModalStatus.clickedGridIndex,
              { name: title, file }
            ),
        },
      };

      if (!!soundGridData) {
        const newSoundGridData = [...soundGridData];
        newSoundGridData[soundModalStatus.clickedGridIndex] = gridDataWithSound;
        setSoundGridData(newSoundGridData);
      }
      return;
    }

    const clickedGridData = soundGridData[soundModalStatus.clickedGridIndex];
    if (!!soundGridData && clickedGridData.soundInfo) {
      clickedGridData.soundInfo.title = title;
      const newSoundGridData = [...soundGridData];
      newSoundGridData[soundModalStatus.clickedGridIndex] = clickedGridData;
      setSoundGridData(newSoundGridData);
    }
  };

  const onSoundDelete: OnSoundDelete = (gridPosition: GridInfo) => {
    if (!!soundGridData) {
      const newSoundGridData = [...soundGridData];
      newSoundGridData[soundModalStatus.clickedGridIndex] = {
        index: soundModalStatus.clickedGridIndex,
        gridPosition: gridPosition,
        showGrid: true,
        onGridClick: onGridClick,
      };

      setSoundGridData(newSoundGridData);
    }
  };

  const getSoundRefList = () => {
    return Object.keys(soundRefs.current);
  };

  const onAdditionalEventSave: OnAdditionalEventSave = (soundName, action) => {
    const gridDataWithSound: ISoundGridData = {
      index: soundModalStatus.clickedGridIndex,
      gridPosition: soundModalStatus.modalOpenedGridPosition,
      showGrid: true,
      onGridClick: onGridClick,
      soundInfo: {
        action,
        title: soundName,
        volume: 1,
        onSoundContainerClick: () =>
          onSavedSoundClick(
            soundModalStatus.modalOpenedGridPosition,
            soundModalStatus.clickedGridIndex,
            { name: soundName }
          ),
      },
    };

    if (!!soundGridData) {
      const newSoundGridData = [...soundGridData];
      newSoundGridData[soundModalStatus.clickedGridIndex] = gridDataWithSound;
      setSoundGridData(newSoundGridData);
    }
  };

  return (
    <SoundLayerSection height={height} width={width} show>
      {soundGridData.map((data) => {
        const { index, gridPosition, showGrid, onGridClick, soundInfo } = data;

        return (
          <GridForSoundCreator
            index={index}
            key={gridPosition.row + gridPosition.column}
            gridPosition={gridPosition}
            showGrid={showGrid}
            onGridClick={onGridClick}
          >
            {soundInfo && (
              <SoundContainer onClick={soundInfo.onSoundContainerClick}>
                {soundInfo.title}
                <StyledAudio
                  ref={refCallback}
                  data-name={soundInfo.title}
                  data-action={soundInfo.action}
                  data-volume={soundInfo.volume}
                  controls
                >
                  <source src={soundInfo.src} />
                </StyledAudio>
              </SoundContainer>
            )}
          </GridForSoundCreator>
        );
      })}
      {soundModalStatus.isModalOpen && (
        <SoundSaveModal
          setModalStatus={setSoundModalStatus}
          modalStatus={soundModalStatus}
          onSoundSave={onSoundSave}
          onAudioDelete={onSoundDelete}
          soundRefList={getSoundRefList()}
          onAdditionalEventSave={onAdditionalEventSave}
        />
      )}
      <button
        onClick={async () => {
          const newData = soundGridData.filter(
            (gridData) => !!gridData.soundInfo?.src
          );

          console.log(newData);
          //여기서 필터된 걸 가지고 MongoDb에 올려야할 정보를 만들어야 됨.
          // S3에 올라간 오디오 Url 포함

          const uploadedLocations: string[] = [];

          if (!!newData) {
            newData.forEach(async (data) => {
              if (!!data.soundInfo && !!data.soundInfo.src) {
                const blob = await fetch(data.soundInfo.src).then((src) =>
                  src.blob()
                );

                const response = await fetch(
                  `http://localhost:3000/api/uploadVideo?key=${data.soundInfo?.fileName}`,
                  {
                    method: "POST",
                    body: blob,
                    headers: new Headers({ "content-type": blob.type }),
                  }
                );

                response
                  .json()
                  .then((res) => uploadedLocations.push(res.location));
              }
            });

            // s3에 업로드된 파일들의 위치
            console.log(uploadedLocations);

            // TODO: 여기서 이제 몽고DB에 데이터를 올려야 함. nextAPI를 이용해 올릴 것. audioInfo를 먼저 배열에 만든 후 담을 것.
            // {
            //   webtoonName: 'jojo', <string>
            //     episode: 1, <number>
            //     audioInfo: {
            //     index: number
            //     gridPosition: {
            //     column: string,
            //     row: string,
            //   }
            //     audioInfo: {
            //     title: string,
            //     src: string // <s3 uploaded location>
            //     volume: string
            //   }
            //   }[]
            //     }
          }
        }}
      >
        업로드
      </button>
    </SoundLayerSection>
  );
};

export { SoundLayer };
export type {
  OnGridClick,
  OnSoundSave,
  ISoundModalStatus,
  GridInfo,
  SavedSound,
  OnSoundDelete,
  ISoundRefs,
  OnAdditionalEventSave,
};
