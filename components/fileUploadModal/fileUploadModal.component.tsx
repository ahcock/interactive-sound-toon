import { Dispatch, FC, SetStateAction } from "react";
import {
  ModalBackground,
  ModalBody,
  ModalInputForm,
  ModalTitle,
  SoundNameInput,
} from "./fileUploadModal.styles";

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
          <SoundNameInput />
        </ModalInputForm>
      </ModalBody>
    </ModalBackground>
  );
};

export { FileUploadModal };
