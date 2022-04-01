import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
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
import { ModalStatus } from "../soundLayer/soundLayer.component";

interface FileUploadModalComponentProps {
  setModalStatus: Dispatch<SetStateAction<ModalStatus>>;
  modalStatus: ModalStatus;
}

const FileUploadModal: FC<FileUploadModalComponentProps> = ({
  setModalStatus,
  modalStatus,
}) => {
  const [inputValue, setInputValue] = useState<{
    soundTitle: string;
    soundFile: Blob | null;
  }>({
    soundTitle: "",
    soundFile: null,
  });

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <ModalBackground>
      <ModalBody onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Create Sound</ModalTitle>
        <ModalInputForm
          onSubmit={(e) => {
            e.preventDefault();
            console.log(inputValue);
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
            <p>안녕하세요</p>
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
