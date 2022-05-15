import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import {
  AdditionalEventSelect,
  ButtonContainer,
  DeleteButtonContainer,
  ModalButton,
  FileUploaderLabel,
  ModalBackground,
  ModalBody,
  ModalInputForm,
  ModalTitle,
  SoundNameInput,
  SoundReviewer,
  Subtitle,
} from "./fileUploadModal.styles";
import UploadIcon from "/images/svg/upload.svg";
import {
  OnAdditionalEventSave,
  OnSoundDelete,
  OnSoundSave,
  SoundModalStatus,
  SoundRefs,
} from "../soundLayer/soundLayer.component";
import {
  AdditionalEventButton,
  AdditionalEventRadioGroup,
  RadioInput,
  RadioLabel,
} from "../soundLayer/soundLayer.styles";

interface SoundSaveModalProps {
  setModalStatus: Dispatch<SetStateAction<SoundModalStatus>>;
  modalStatus: SoundModalStatus;
  onSoundUpload: OnSoundSave;
  onAudioDelete: OnSoundDelete;
  soundRefList: string[];
  onAdditionalEventSave: OnAdditionalEventSave;
}

const SoundSaveModal: FC<SoundSaveModalProps> = ({
  setModalStatus,
  modalStatus,
  onSoundUpload,
  onAudioDelete,
  soundRefList,
  onAdditionalEventSave,
}) => {
  const [inputValue, setInputValue] = useState<{
    soundTitle: string;
    soundFile: File | null;
  }>({
    soundTitle: "",
    soundFile: null,
  });

  const [isForAdditionalEvent, setIsForAdditionalEvent] = useState(false);
  const [soundSrc, setSoundSrc] = useState("");
  console.log(soundRefList);
  //TODO: 어쩌면 setVolume은 리렌더가 필요하지 않으니 useRef로의 사용을 고려해 봐야 할 수도
  const [volume, setVolume] = useState(5);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const [selectedSoundName, setSelectedSoundName] = useState("");

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

      const soundSrcUrl = URL.createObjectURL(file);
      setSoundSrc(soundSrcUrl);

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
        onSoundUpload(soundTitle.value);
      }
      setModalStatus({ ...modalStatus, isModalOpen: false });
      return;
    }

    onSoundUpload(soundTitle.value, soundFile.files[0]);
    setModalStatus({ ...modalStatus, isModalOpen: false });
  };

  const onActionClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("sound name", modalStatus.savedSound?.name);
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
              {!isForAdditionalEvent ? "Additional Event" : "Create Sound"}
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

              {/*<ModalTitle>Additional Event</ModalTitle>*/}
              {/*<AdditionalEventSelect></AdditionalEventSelect>*/}

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
              {!isForAdditionalEvent ? "Additional Event" : "Create Sound"}
            </button>
            <ModalInputForm onSubmit={(e) => {}}>
              <Subtitle>Existing Sound</Subtitle>
              <AdditionalEventSelect
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
                <RadioInput id="play" value="play" />
                <RadioLabel htmlFor="play">Play</RadioLabel>

                <RadioInput id="stop" value="stop" />
                <RadioLabel htmlFor="stop">Stop</RadioLabel>

                <RadioInput id="volumeChange" value="volumeChange" />
                <RadioLabel htmlFor="volumeChange">VolumeChange</RadioLabel>

                {/*<AdditionalEventButton onClick={onActionClickHandler}>*/}
                {/*  Play*/}
                {/*</AdditionalEventButton>*/}
                {/*<AdditionalEventButton onClick={onActionClickHandler}>*/}
                {/*  Stop*/}
                {/*</AdditionalEventButton>*/}
              </AdditionalEventRadioGroup>
              {/*Todo: 여러가지 액션들 버튼 or 셀렉트로 만들기*/}
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
                {/*<DeleteButtonContainer>*/}
                {/*  <FileUploaderButton*/}
                {/*    type="button"*/}
                {/*    onClick={() => {*/}
                {/*      onAudioDelete(modalStatus.modalOpenedGridPosition);*/}
                {/*      setModalStatus({ ...modalStatus, isModalOpen: false });*/}
                {/*    }}*/}
                {/*  >*/}
                {/*    Delete*/}
                {/*  </FileUploaderButton>*/}
                {/*</DeleteButtonContainer>*/}
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
        )}
      </ModalBody>
    </ModalBackground>
  );
};

export { SoundSaveModal };
