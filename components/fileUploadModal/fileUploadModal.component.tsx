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
} from "./fileUploadModal.styles";
import UploadIcon from "/images/svg/upload.svg";
import { ModalStatus, OnAudioUpload } from "../soundLayer/soundLayer.component";

interface FileUploadModalComponentProps {
  setModalStatus: Dispatch<SetStateAction<ModalStatus>>;
  modalStatus: ModalStatus;
  onSoundUpload: OnAudioUpload;
}

const FileUploadModal: FC<FileUploadModalComponentProps> = ({
  setModalStatus,
  modalStatus,
  onSoundUpload,
}) => {
  const [inputValue, setInputValue] = useState<{
    soundTitle: string;
    soundFile: File | null;
  }>({
    soundTitle: "",
    soundFile: null,
  });

  useEffect(function setInitialValue() {
    const { uploadedAudio } = modalStatus;
    console.log(modalStatus);
    if (uploadedAudio) {
      console.log(uploadedAudio);
      const { name, file } = uploadedAudio;
      setInputValue({
        soundTitle: name,
        soundFile: file,
      });
    }
  }, []);

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
            <FileUploaderButton type="submit">Upload</FileUploaderButton>
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
