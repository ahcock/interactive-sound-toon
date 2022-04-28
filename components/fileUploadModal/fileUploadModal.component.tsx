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
  ButtonContainer,
  FileUploaderButton,
  FileUploaderLabel,
  ModalBackground,
  ModalBody,
  ModalInputForm,
  ModalTitle,
  SoundNameInput,
  Subtitle,
  DeleteButtonContainer,
  VolumeSlider,
} from "./fileUploadModal.styles";
import UploadIcon from "/images/svg/upload.svg";
import {
  SoundModalStatus,
  OnSoundDelete,
  OnSoundSave,
} from "../soundLayer/soundLayer.component";

interface FileUploadModalComponentProps {
  setModalStatus: Dispatch<SetStateAction<SoundModalStatus>>;
  modalStatus: SoundModalStatus;
  onSoundUpload: OnSoundSave;
  onAudioDelete: OnSoundDelete;
}

const FileUploadModal: FC<FileUploadModalComponentProps> = ({
  setModalStatus,
  modalStatus,
  onSoundUpload,
  onAudioDelete,
}) => {
  const [inputValue, setInputValue] = useState<{
    soundTitle: string;
    soundFile: File | null;
  }>({
    soundTitle: "",
    soundFile: null,
  });

  const [volume, setVolume] = useState(5);

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
    }

    setIsSaveDisabled(true);
  }, []);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    setInputValue({ ...inputValue, [name]: !!files ? files[0] : value });
  };

  const onSaveHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { soundTitle, soundFile } = e.currentTarget;

    if (!soundFile.files[0]) {
      setModalStatus({ ...modalStatus, isModalOpen: false });
      return;
    }

    onSoundUpload(soundTitle.value, soundFile.files[0]);
    setModalStatus({ ...modalStatus, isModalOpen: false });
  };

  return (
    <ModalBackground>
      <ModalBody onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Create Sound</ModalTitle>
        <ModalInputForm onSubmit={onSaveHandler}>
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

          <VolumeSlider
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={volume}
            onChange={(e) => setVolume(e.target.valueAsNumber)}
          />

          <ButtonContainer>
            <DeleteButtonContainer>
              <FileUploaderButton
                type="button"
                onClick={() => {
                  onAudioDelete(modalStatus.modalOpenedGridPosition);
                  setModalStatus({ ...modalStatus, isModalOpen: false });
                }}
              >
                Delete
              </FileUploaderButton>
            </DeleteButtonContainer>
            <FileUploaderButton type="submit" disabled={isSaveDisabled}>
              Save
            </FileUploaderButton>
            <FileUploaderButton
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setModalStatus({ ...modalStatus, isModalOpen: false });
              }}
            >
              Cancel
            </FileUploaderButton>
          </ButtonContainer>
        </ModalInputForm>
      </ModalBody>
    </ModalBackground>
  );
};

export { FileUploadModal };
