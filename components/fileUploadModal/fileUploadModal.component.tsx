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
  DeleteButtonContainer,
  FileUploaderButton,
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
  OnSoundDelete,
  OnSoundSave,
  SoundModalStatus,
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

  const [soundSrc, setSoundSrc] = useState("");

  //TODO: 어쩌면 setVolume은 리렌더가 필요하지 않으니 useRef로의 사용을 고려해 봐야 할 수도
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

  return (
    <ModalBackground>
      <ModalBody onClick={(e) => e.stopPropagation()}>
        <ModalTitle>{soundSrc ? "Edit Sound" : "Create Sound"} </ModalTitle>
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
