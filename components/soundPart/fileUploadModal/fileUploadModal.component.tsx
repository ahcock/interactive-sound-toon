import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  AdditionalEventRadioGroup,
  AdditionalEventSelect,
  ButtonContainer,
  ChangeVolumeValue,
  DeleteButtonContainer,
  FileUploaderLabel,
  ModalBackground,
  ModalBody,
  ModalButton,
  ModalInputForm,
  ModalTitle,
  RadioInput,
  RadioLabel,
  SoundNameInput,
  SoundReviewer,
  StyledInputRange,
  Subtitle,
} from "./fileUploadModal.styles";
import UploadIcon from "/images/svg/upload.svg";
import {
  AdditionalAction,
  AudioAPITracks,
  ISoundModalStatus,
  OnAdditionalEventSave,
  OnAudioDelete,
  OnSoundSave,
  SoundInfoType,
} from "../soundLayer/soundLayer.component";
import { isBoolean, isUndefined } from "lodash";

interface ISoundSaveModalProps {
  setModalStatus: Dispatch<SetStateAction<ISoundModalStatus>>;
  modalStatus: ISoundModalStatus;
  onSoundSave: OnSoundSave;
  onAudioDelete: OnAudioDelete;
  soundRefList: string[];
  onAdditionalEventSave: OnAdditionalEventSave;
  audioAPITracks: AudioAPITracks;
  audioContext: AudioContext | undefined;
}

const SoundSaveModal: FC<ISoundSaveModalProps> = ({
  setModalStatus,
  modalStatus,
  onSoundSave,
  onAudioDelete,
  soundRefList,
  onAdditionalEventSave,
  audioAPITracks,
  audioContext,
}) => {
  const [inputValue, setInputValue] = useState<{
    soundName: string;
    soundFile?: File | null;
  }>({
    soundName: "",
    soundFile: null,
  });

  const [isForAdditionalEvent, setIsForAdditionalEvent] = useState(false);
  const [additionalActionValue, setAdditionalActionValue] = useState<
    AdditionalAction | undefined
  >();
  const [soundSrc, setSoundSrc] = useState("");
  const [volume, setVolume] = useState(1);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const [volumeChangeInfo, setVolumeChangeInfo] = useState({
    isVolumeChangeChecked: false,
    volume: "0",
    selectedExistingSound: "",
  });

  const changeVolumeChangeInfo = (
    name: keyof typeof volumeChangeInfo,
    value: boolean | string
  ) => {
    if (name === "isVolumeChangeChecked" && isBoolean(value)) {
      setVolumeChangeInfo({
        ...volumeChangeInfo,
        isVolumeChangeChecked: value,
      });
      return;
    }

    setVolumeChangeInfo({ ...volumeChangeInfo, [name]: value });
  };

  useEffect(function setInitialVolume() {
    const initialVolume = modalStatus.soundInfo?.volume;

    if (initialVolume) setVolume(initialVolume);
  }, []);

  useEffect(
    function changeVolumeOnExistingSoundSelect() {
      const selectedSound = volumeChangeInfo.selectedExistingSound;
      if (!!selectedSound) {
        setVolume(audioAPITracks[selectedSound].gainNode.gain.value);
      }
    },
    [volumeChangeInfo.selectedExistingSound]
  );

  useEffect(
    function setUploadButtonStatus() {
      !!inputValue.soundFile && !!inputValue.soundName
        ? setIsSaveDisabled(false)
        : setIsSaveDisabled(true);
    },
    [inputValue]
  );

  useEffect(function setInitialValue() {
    const { soundInfo } = modalStatus;

    if (soundInfo) {
      const { title, file, type, action } = soundInfo;
      setInputValue({
        soundName: title || "",
        soundFile: file,
      });

      if (type === SoundInfoType.ACTION) {
        setIsForAdditionalEvent(true);
        setAdditionalActionValue(action);
      }

      if (!!file) {
        const soundSrcUrl = URL.createObjectURL(file);
        setSoundSrc(soundSrcUrl);
      }

      return;
    }
    setIsSaveDisabled(true);

    return () => {
      URL.revokeObjectURL(soundSrc);
    };
  }, []);

  useEffect(() => {
    if (!!inputValue.soundFile) {
      const soundSrcUrl = URL.createObjectURL(inputValue.soundFile);
      setSoundSrc(soundSrcUrl);
    }

    return () => {
      URL.revokeObjectURL(soundSrc);
    };
  }, [inputValue.soundFile]);

  useEffect(
    function changeAudioNodeGainValue() {
      const soundInfo = modalStatus.savedSound;

      if (
        isUndefined(soundInfo) &&
        !!volumeChangeInfo.selectedExistingSound &&
        audioContext
      ) {
        audioAPITracks[
          volumeChangeInfo.selectedExistingSound
        ].gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
      }

      if (soundInfo && !isUndefined(audioContext)) {
        audioAPITracks[soundInfo.name].gainNode.gain.setValueAtTime(
          volume,
          audioContext.currentTime
        );
      }
    },
    [volume]
  );

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    setInputValue({ ...inputValue, [name]: !!files ? files[0] : value });
  };

  const onSaveHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { soundName, soundFile } = e.currentTarget;

    if (!soundFile.files[0]) {
      if (
        modalStatus.soundInfo?.title !== inputValue.soundName ||
        modalStatus.soundInfo.volume !== volume
      ) {
        onSoundSave(soundName.value, volume);
      }
      setModalStatus({ ...modalStatus, isModalOpen: false });
      return;
    }

    onSoundSave(inputValue.soundName, volume, soundFile.files[0]);
    setModalStatus({ ...modalStatus, isModalOpen: false });
  };

  const onVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setVolume(parseFloat(e.currentTarget.value));
  };

  return (
    <ModalBackground>
      <ModalBody onClick={(e) => e.stopPropagation()}>
        {!isForAdditionalEvent ? (
          <>
            <ModalTitle>{soundSrc ? "Edit Sound" : "Create Sound"}</ModalTitle>
            <button
              onClick={() => setIsForAdditionalEvent(!isForAdditionalEvent)}
            >
              Additional Event
            </button>
            <ModalInputForm onSubmit={onSaveHandler}>
              <Subtitle>Sound Name</Subtitle>
              <SoundNameInput
                autoFocus
                placeholder="Sound Name"
                name="soundName"
                onKeyDown={(e) =>
                  e.key === "Escape" &&
                  setModalStatus({ ...modalStatus, isModalOpen: false })
                }
                value={inputValue.soundName}
                onChange={onChangeHandler}
              />
              <Subtitle>Sound File</Subtitle>
              <input
                id="file-uploader"
                type="file"
                accept="*"
                hidden
                name="soundFile"
                onChange={onChangeHandler}
              />
              <FileUploaderLabel htmlFor="file-uploader">
                <p>{inputValue.soundFile?.name}</p>
                <UploadIcon width={24} height={24} fill="grey" />
              </FileUploaderLabel>

              {soundSrc && !modalStatus.savedSound ? (
                <div>
                  <Subtitle>Sound review & Set Volume </Subtitle>
                  <SoundReviewer
                    controls
                    src={soundSrc}
                    onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
                  />
                </div>
              ) : (
                <>
                  <Subtitle>Volume Change</Subtitle>
                  <StyledInputRange
                    type="range"
                    min="0"
                    max="1"
                    value={volume}
                    step="0.001"
                    onChange={onVolumeChange}
                  />
                  <ChangeVolumeValue>{volume}</ChangeVolumeValue>
                </>
              )}

              <ButtonContainer>
                <DeleteButtonContainer>
                  <ModalButton
                    type="button"
                    onClick={() => {
                      onAudioDelete(
                        modalStatus.modalOpenedGridPosition,
                        modalStatus.savedSound
                          ? modalStatus.savedSound.name
                          : ""
                      );
                      setModalStatus({ ...modalStatus, isModalOpen: false });
                    }}
                  >
                    Delete
                  </ModalButton>
                </DeleteButtonContainer>
                <ModalButton type="submit" disabled={isSaveDisabled}>
                  Save
                </ModalButton>
                <ModalButton
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: 그냥 끄면, 처음 모달 열렸을 때 볼륨을 기억하고 있따가 reset하고 모달 꺼야 함
                    setModalStatus({ ...modalStatus, isModalOpen: false });
                  }}
                >
                  Cancel
                </ModalButton>
              </ButtonContainer>
            </ModalInputForm>
          </>
        ) : (
          <>
            <ModalTitle>Additional Event</ModalTitle>
            <button
              onClick={() => setIsForAdditionalEvent(!isForAdditionalEvent)}
            >
              Create Sound
            </button>
            <ModalInputForm
              onChange={(e) => {
                const additionalActionValue =
                  e.currentTarget.additionalAction.value;
                setAdditionalActionValue(additionalActionValue);
                additionalActionValue === AdditionalAction.VOLUME_CHANGE
                  ? changeVolumeChangeInfo("isVolumeChangeChecked", true)
                  : changeVolumeChangeInfo("isVolumeChangeChecked", false);
              }}
              onSubmit={(e) => {
                e.preventDefault();
                const { existingSound, additionalAction } = e.currentTarget;

                onAdditionalEventSave(
                  existingSound.value,
                  additionalAction.value,
                  {
                    volume:
                      audioAPITracks[existingSound.value].gainNode.gain.value,
                  }
                );
                setModalStatus({ ...modalStatus, isModalOpen: false });
              }}
            >
              <Subtitle>Existing Sound</Subtitle>
              <AdditionalEventSelect
                name="existingSound"
                onChange={(e) => {
                  e.stopPropagation();
                  changeVolumeChangeInfo(
                    "selectedExistingSound",
                    e.currentTarget.value
                  );
                }}
              >
                {soundRefList.map((soundName) => (
                  <option key={soundName} value={soundName}>
                    {soundName}
                  </option>
                ))}
              </AdditionalEventSelect>

              <Subtitle>Sound Action</Subtitle>
              <AdditionalEventRadioGroup>
                <RadioLabel>
                  Play
                  <RadioInput
                    value={AdditionalAction.PLAY}
                    checked={additionalActionValue === AdditionalAction.PLAY}
                  />
                </RadioLabel>

                <RadioLabel>
                  Stop
                  <RadioInput
                    value={AdditionalAction.STOP}
                    checked={additionalActionValue === AdditionalAction.STOP}
                  />
                </RadioLabel>

                <RadioLabel>
                  Volume Change
                  <RadioInput
                    value={AdditionalAction.VOLUME_CHANGE}
                    checked={
                      additionalActionValue === AdditionalAction.VOLUME_CHANGE
                    }
                  />
                </RadioLabel>
              </AdditionalEventRadioGroup>

              {volumeChangeInfo.isVolumeChangeChecked && (
                <>
                  <Subtitle>Volume Change</Subtitle>
                  <StyledInputRange
                    type="range"
                    name="optionValue.volume"
                    id="optionValue.volume"
                    min="0"
                    max="1"
                    step="0.001"
                    value={volume}
                    onChange={(e) => {
                      onVolumeChange(e);
                    }}
                  />
                  <ChangeVolumeValue>{volume.toFixed(3)}</ChangeVolumeValue>
                </>
              )}

              {soundSrc && (
                <div>
                  <Subtitle>Sound review & Set Volume </Subtitle>
                  <SoundReviewer
                    controls
                    defaultValue={volume}
                    src={soundSrc}
                    onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
                  />
                </div>
              )}

              <ButtonContainer>
                <ModalButton
                  type="button"
                  onClick={() => {
                    onAudioDelete(
                      modalStatus.modalOpenedGridPosition,
                      modalStatus.savedSound ? modalStatus.savedSound.name : ""
                    );
                    setModalStatus({ ...modalStatus, isModalOpen: false });
                  }}
                >
                  Delete
                </ModalButton>
                <ModalButton type="submit">Save</ModalButton>
                <ModalButton
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setModalStatus({ ...modalStatus, isModalOpen: false });
                  }}
                >
                  Cancel
                </ModalButton>
              </ButtonContainer>
            </ModalInputForm>
          </>
        )}
      </ModalBody>
    </ModalBackground>
  );
};

export { SoundSaveModal };
