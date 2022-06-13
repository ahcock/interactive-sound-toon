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
  AdditionalEventSelect,
  ButtonContainer,
  DeleteButtonContainer,
  FileUploaderLabel,
  ModalBackground,
  ModalBody,
  ModalButton,
  ModalInputForm,
  ModalTitle,
  SoundNameInput,
  SoundReviewer,
  Subtitle,
} from "./fileUploadModal.styles";
import UploadIcon from "/images/svg/upload.svg";
import {
  ISoundModalStatus,
  OnAdditionalEventSave,
  OnSoundDelete,
  OnSoundSave,
} from "../soundPart/soundLayer/soundLayer.component";
import {
  AdditionalEventRadioGroup,
  RadioInput,
  RadioLabel,
} from "../soundPart/soundLayer/soundLayer.styles";

interface ISoundSaveModalProps {
  setModalStatus: Dispatch<SetStateAction<ISoundModalStatus>>;
  modalStatus: ISoundModalStatus;
  onSoundSave: OnSoundSave;
  onAudioDelete: OnSoundDelete;
  soundRefList: string[];
  onAdditionalEventSave: OnAdditionalEventSave;
}

const SoundSaveModal: FC<ISoundSaveModalProps> = ({
  setModalStatus,
  modalStatus,
  onSoundSave,
  onAudioDelete,
  soundRefList,
  onAdditionalEventSave,
}) => {
  const [inputValue, setInputValue] = useState<{
    soundTitle: string;
    soundFile?: File | null;
  }>({
    soundTitle: "",
    soundFile: null,
  });

  const [isForAdditionalEvent, setIsForAdditionalEvent] = useState(false);
  const [soundSrc, setSoundSrc] = useState("");
  //TODO: 어쩌면 setVolume은 리렌더가 필요하지 않으니 useRef로의 사용을 고려해 봐야 할 수도
  const [volume, setVolume] = useState(1);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  useEffect(
    function setUploadButtonStatus() {
      !!inputValue.soundFile && !!inputValue.soundTitle
        ? setIsSaveDisabled(false)
        : setIsSaveDisabled(true);
    },
    [inputValue]
  );

  useEffect(function setInitialValue() {
    const { savedSound } = modalStatus;

    if (savedSound) {
      const { name, file } = savedSound;
      setInputValue({
        soundTitle: name,
        soundFile: file,
      });

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

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    setInputValue({ ...inputValue, [name]: !!files ? files[0] : value });
  };

  const onSaveHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { soundTitle, soundFile } = e.currentTarget;

    if (!soundFile.files[0]) {
      if (modalStatus.savedSound?.name !== inputValue.soundTitle) {
        onSoundSave(soundTitle.value);
      }
      setModalStatus({ ...modalStatus, isModalOpen: false });
      return;
    }

    onSoundSave(soundTitle.value, soundFile.files[0], volume);
    setModalStatus({ ...modalStatus, isModalOpen: false });
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
                name="soundTitle"
                onKeyDown={(e) =>
                  e.key === "Escape" &&
                  setModalStatus({ ...modalStatus, isModalOpen: false })
                }
                value={inputValue.soundTitle}
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

              {soundSrc && (
                <div>
                  <Subtitle>Sound review & Set Volume </Subtitle>
                  <SoundReviewer
                    controls
                    src={soundSrc}
                    onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
                  />
                </div>
              )}

              <ButtonContainer>
                <DeleteButtonContainer>
                  <ModalButton
                    type="button"
                    onClick={() => {
                      onAudioDelete(modalStatus.modalOpenedGridPosition);
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
              onSubmit={(e) => {
                e.preventDefault();
                const { existingSound, additionalAction } = e.currentTarget;

                onAdditionalEventSave(
                  existingSound.value,
                  additionalAction.value
                );
                setModalStatus({ ...modalStatus, isModalOpen: false });
              }}
            >
              <Subtitle>Existing Sound</Subtitle>
              <AdditionalEventSelect
                name="existingSound"
                onChange={(e) =>
                  console.log(e.currentTarget.value, "선택된 ref")
                }
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
                  Play <RadioInput value="play" />
                </RadioLabel>

                <RadioLabel>
                  Stop <RadioInput value="stop" />
                </RadioLabel>
              </AdditionalEventRadioGroup>

              {soundSrc && (
                <div>
                  <Subtitle>Sound review & Set Volume </Subtitle>
                  <SoundReviewer
                    controls
                    src={soundSrc}
                    onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
                  />
                </div>
              )}

              <ButtonContainer>
                {/*<ModalButton type="submit" disabled={isSaveDisabled}>*/}
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
