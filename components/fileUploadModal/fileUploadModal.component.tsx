import { Dispatch, FC, SetStateAction } from "react";
import {
  FileUploaderLabel,
  ModalBackground,
  ModalBody,
  ModalInputForm,
  ModalTitle,
  SoundNameInput,
  Subtitle,
} from "./fileUploadModal.styles";
import UploadIcon from "/images/svg/upload.svg";

interface FileUploadModalComponentProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const FileUploadModal: FC<FileUploadModalComponentProps> = ({ setIsOpen }) => {
  return (
    <ModalBackground
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <ModalBody onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Create Sound</ModalTitle>
        <ModalInputForm>
          <SoundNameInput placeholder="Sound Name" />

          <Subtitle>Sound File</Subtitle>
          <input id="file-uploader" type="file" accept="*" hidden />
          <FileUploaderLabel htmlFor="file-uploader">
            <p>안녕하세요</p>
          </FileUploaderLabel>
        </ModalInputForm>
      </ModalBody>
    </ModalBackground>
  );
};

export { FileUploadModal };
