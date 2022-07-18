import { FC, useEffect, useRef, useState } from "react";
import { SoundContainer, SoundLayerSection } from "./soundLayer.styles";
import { GridForSoundCreator } from "../soundGridForCreator/soundGridForCreator.component";
import { SoundSaveModal } from "../../fileUploadModal/fileUploadModal.component";
import { IAudioInfoDocument } from "../../../pages/create/[name]/[episode]";
import { ConsentModal } from "../consentModal/consentModal.component";

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

type AudioPlayConsentHandler = (isAudioPlaybackConsented: boolean) => void;

interface ISoundModalStatus {
  isModalOpen: boolean;
  modalOpenedGridPosition: GridInfo;
  savedSound?: SavedSound;
  clickedGridIndex: number;
}

interface ISoundRefs {
  [key: string]: HTMLDivElement;
}

interface ISoundLayerProps {
  imageLayerDimension: {
    height: number;
    width: number;
  };
  audioInfoDocument: IAudioInfoDocument;
}

interface SoundInfo {
  file?: File;
  src?: string;
  title: string;
  fileName?: string;
  volume?: number;
  action?: string;
  isSoundAlreadyUploaded?: boolean;
}

interface ISoundGridDataForCreator {
  index: number;
  gridPosition: GridInfo;
  showGrid: boolean;
  onGridClick: OnGridClick;
  soundInfo?: SoundInfo;
}

const SoundLayer: FC<ISoundLayerProps> = ({
  imageLayerDimension: { height, width },
  audioInfoDocument,
}) => {
  const [soundGridData, setSoundGridData] = useState<
    ISoundGridDataForCreator[]
  >([]);
  const [soundModalStatus, setSoundModalStatus] = useState<ISoundModalStatus>({
    isModalOpen: false,
    modalOpenedGridPosition: {
      column: "",
      row: "",
    },
    clickedGridIndex: 0,
  });
  const [isAudioConsented, setIsAudioConsented] = useState(false);
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(true);
  const [audioContext, setAudioContext] = useState<AudioContext>();

  // Audio buffer 보관소
  const audioBuffers = useRef<{ [key: string]: AudioBuffer }>({});
  const playingAudioTracks = useRef<{ [key: string]: boolean }>({});

  const audioAPITracks = useRef<{
    [key: string]: {
      audioBuffer: AudioBuffer;
      gainNode: GainNode;
    };
  }>({});

  const soundRefs = useRef<ISoundRefs>({});

  useEffect(() => {
    const audioCtx = new AudioContext();
    audioCtx.resume();
    setAudioContext(audioCtx);

    return () => {
      audioContext?.close();
    };
  }, []);

  useEffect(
    function registerSoundGrid() {
      const soundGridInfo: ISoundGridDataForCreator[] = [];

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

      if (!!audioInfoDocument && !!audioContext) {
        (async () => {
          for await (const {
            index,
            gridPosition,
            title,
            src,
            volume,
            fileName,
            action,
          } of audioInfoDocument.audioInfo) {
            const file = await fetch(src)
              .then((res) => res.blob())
              .then((blob) => new File([blob], fileName ?? ""));

            const audioBuffer = await fetch(src)
              .then((res) => res.arrayBuffer())
              .then((buffer) => audioContext?.decodeAudioData(buffer));

            audioBuffers.current[title] = audioBuffer;
            const gainNode = new GainNode(audioContext);

            audioAPITracks.current[title] = {
              audioBuffer: audioBuffer,
              gainNode,
            };

            soundGridInfo[index] = {
              gridPosition,
              index,
              showGrid: true,
              onGridClick: onGridClick,
              soundInfo: {
                title,
                volume,
                fileName,
                src,
                file,
                isSoundAlreadyUploaded: true,
                ...(action && { action }),
              },
            };
          }
        })();
      }
      setSoundGridData(soundGridInfo);
    },
    [audioInfoDocument, audioContext]
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
    [audioContext, isAudioConsented, soundGridData]
  );

  const refCallback = (audioNode: HTMLDivElement) => {
    if (!!audioNode) {
      // const additionalAction = audioNode.getAttribute("data-action");
      // const soundName = additionalAction
      //   ? `${additionalAction}-${audioNode.getAttribute("data-name")}`
      //   : audioNode.getAttribute("data-name");

      const soundName = audioNode.getAttribute("data-name");
      if (!!soundName && !!audioContext) {
        soundRefs.current[soundName] = audioNode;
      }
    }
  };

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

  const onSoundSave: OnSoundSave = async (title, file, volume) => {
    if (!!file && !!audioContext) {
      // TODO: 이 createObjectURL로 만들어진 audioUrl은 필요없지 않을까?
      const audioUrl = URL.createObjectURL(file);
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioContext?.decodeAudioData(arrayBuffer);
      const gainNode = new GainNode(audioContext);

      audioAPITracks.current[title] = {
        audioBuffer: audioBuffer,
        gainNode,
      };

      const gridDataWithSound: ISoundGridDataForCreator = {
        index: soundModalStatus.clickedGridIndex,
        gridPosition: soundModalStatus.modalOpenedGridPosition,
        showGrid: true,
        onGridClick: onGridClick,
        soundInfo: {
          title,
          volume,
          file,
          fileName: file.name,
          src: audioUrl,
        },
      };

      if (!!soundGridData) {
        const newSoundGridData = [...soundGridData];
        newSoundGridData[soundModalStatus.clickedGridIndex] = gridDataWithSound;
        setSoundGridData(newSoundGridData);
      }
      return;
    }

    const { clickedGridIndex } = soundModalStatus;

    const clickedGridData = soundGridData[clickedGridIndex];
    if (!!soundGridData && clickedGridData.soundInfo) {
      clickedGridData.soundInfo.title = title;
      const newSoundGridData = [...soundGridData];
      newSoundGridData[clickedGridIndex] = clickedGridData;
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
    const gridDataWithSound: ISoundGridDataForCreator = {
      index: soundModalStatus.clickedGridIndex,
      gridPosition: soundModalStatus.modalOpenedGridPosition,
      showGrid: true,
      onGridClick: onGridClick,
      soundInfo: {
        action,
        title: soundName,
        volume: 1,
      },
    };

    if (!!soundGridData) {
      const newSoundGridData = [...soundGridData];
      newSoundGridData[soundModalStatus.clickedGridIndex] = gridDataWithSound;
      setSoundGridData(newSoundGridData);
    }
  };

  const onSoundUpload = async () => {
    const savedSound = soundGridData.filter((gridData) => gridData.soundInfo);

    const { unUploadedSound, alreadyUploadedSound } = savedSound.reduce<{
      unUploadedSound: ISoundGridDataForCreator[];
      alreadyUploadedSound: ISoundGridDataForCreator[];
    }>(
      ({ unUploadedSound, alreadyUploadedSound }, sound) => {
        sound.soundInfo?.isSoundAlreadyUploaded
          ? alreadyUploadedSound.push(sound)
          : unUploadedSound.push(sound);

        return { unUploadedSound, alreadyUploadedSound };
      },
      {
        unUploadedSound: [],
        alreadyUploadedSound: [],
      }
    );

    const dataForUploading: IAudioInfoDocument = {
      webtoonName: "jojo",
      episode: "1",
      audioInfo: [],
    };

    const alreadyExistAudioInfo = audioInfoDocument.audioInfo.filter(
      ({ index, fileName }) =>
        alreadyUploadedSound.find(
          ({ index: i, soundInfo }) =>
            index === i && fileName === soundInfo?.fileName
        )
    );

    const newlyUploadedSound: IAudioInfoDocument["audioInfo"] = [];

    if (!!savedSound) {
      for (const data of unUploadedSound) {
        if (!!data.soundInfo && !!data.soundInfo.src) {
          const {
            index,
            gridPosition,
            soundInfo: { file: audioFile, title, volume, action, fileName },
          } = data;

          if (!!audioFile) {
            const { url } = await fetch(
              `/api/s3GetSignedUrlPromise?key=jojo/ep1/${data.soundInfo?.fileName}`,
              {
                headers: new Headers({ "content-type": audioFile.type }),
              }
            ).then((res) => res.json());

            const uploadRes = await fetch(url, {
              method: "PUT",
              body: audioFile,
              headers: {
                "Content-Type": audioFile.type,
              },
            });
            // dataForUploading.audioInfo.push
            newlyUploadedSound.push({
              index,
              gridPosition,
              title,
              volume,
              fileName,
              src: uploadRes.url.split("?")[0],
              ...(action && { action }),
            });
          }
        }
      }

      dataForUploading.audioInfo = [
        ...alreadyExistAudioInfo,
        ...newlyUploadedSound,
      ];

      await fetch(`/api/mongoUpsertAudioInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForUploading),
      });
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
    <SoundLayerSection height={height} width={width} show>
      {isConsentModalOpen && (
        <ConsentModal audioPlayConsentHandler={audioPlayConsentHandler} />
      )}
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
            {!!soundInfo && (
              <SoundContainer
                onClick={() => {
                  onSavedSoundClick(gridPosition, index, {
                    name: soundInfo?.title,
                    file: soundInfo.file,
                  });
                }}
                ref={refCallback}
                data-name={soundInfo.title}
                data-action={soundInfo.action}
                data-volume={soundInfo.volume}
              >
                {soundInfo.title}
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
      <button onClick={onSoundUpload}>업로드</button>
    </SoundLayerSection>
  );
};

export { SoundLayer };
export type {
  ISoundLayerProps,
  ISoundGridDataForCreator,
  OnGridClick,
  OnSoundSave,
  ISoundModalStatus,
  GridInfo,
  SavedSound,
  OnSoundDelete,
  ISoundRefs,
  OnAdditionalEventSave,
  SoundInfo,
  AudioPlayConsentHandler,
};
