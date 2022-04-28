import {
  ChangeEvent,
  Dispatch,
  FC,
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

  const [isUploadDisabled, setIsUploadDisabled] = useState(false);

  useEffect(function setInitialValue() {
    const { savedSound } = modalStatus;

    if (savedSound) {
      const { name, file } = savedSound;
      setInputValue({
        soundTitle: name,
        soundFile: file,
      });
    }
    setIsUploadDisabled(true);
  }, []);

  useEffect(
    function setUploadButtonStatus() {
      !!inputValue.soundFile && !!inputValue.soundTitle
        ? setIsUploadDisabled(false)
        : setIsUploadDisabled(true);
    },
    [inputValue]
  );

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    setInputValue({ ...inputValue, [name]: !!files ? files[0] : value });
  };

  return (
    <ModalBackground>
      <ModalBody onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Create Sound</ModalTitle>
        <ModalInputForm
          onSubmit={(e) => {
            e.preventDefault();
            const { soundTitle, soundFile } = e.currentTarget;
            onSoundUpload(soundTitle.value, soundFile.files[0]);
            setModalStatus({ ...modalStatus, isModalOpen: false });
          }}
        >
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
          {/*{TODO: 오디오가 등록된 파일을 누르면 모달이 뜨며 디펄트 값을 지정해줘야함}*/}
          <Subtitle>Sound File</Subtitle>
          <input
            id="file-uploader"
            type="file"
            accept="*"
            hidden
            name="soundFile"
            // value={inputValue.soundFile && inputValue.soundFile}
            onChange={onChangeHandler}
          />
          <FileUploaderLabel htmlFor="file-uploader">
            <p>{inputValue.soundFile?.name}</p>
            <UploadIcon width={24} height={24} fill="grey" />
          </FileUploaderLabel>

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
            <FileUploaderButton type="submit" disabled={isUploadDisabled}>
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
