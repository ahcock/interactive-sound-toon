import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBody = styled.section`
  padding: 0 2vw;
  min-width: 40%;
  min-height: 45%;
  max-width: 500px;
  background-color: rgb(255, 255, 255);
  border-radius: 25px;
  display: flex;
  flex-direction: column;
`;

export const ModalTitle = styled.h3`
  margin-top: 3.5vh;
  font-size: 2em;
`;

export const ModalTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const ModalChangeButton = styled.button`
  height: 50%;
`;

export const ModalInputForm = styled.form``;

export const SoundNameInput = styled.input`
  margin-top: 10px;
  padding-bottom: 10px;
  border: none;
  width: 100%;
  font-size: 25px;
  border-bottom: 2px solid rgb(244, 243, 247);
`;

export const Subtitle = styled.h4`
  padding-top: 40px;
  padding-bottom: 3%;
  color: rgb(108, 103, 129);
`;

export const FileUploaderLabel = styled.label`
  margin-top: 10px;
  padding: 0 15px;
  width: 100%;
  height: 40px;
  background-color: rgb(246, 245, 250);
  border: 1px solid rgb(213, 212, 218);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: rgb(240, 235, 240);
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 4px;
`;

export const ModalButton = styled.button`
  border-radius: 12px;
  width: 110px;
  height: 40px;
  background-color: rgba(69, 206, 133, 0.9);
  color: rgb(117, 117, 117);
  font-weight: 500;
  &:disabled {
    background-color: gainsboro;
  }
`;

export const DeleteButtonContainer = styled.span`
  margin-right: auto;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const SoundReviewer = styled.audio`
  margin-top: 10px;
`;

export const AdditionalEventSelect = styled.select`
  width: 100%;
`;

export const AdditionalEventRadioGroup = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

export const RadioInput = styled.input.attrs(() => ({
  type: "radio",
  name: "additionalAction",
}))`
  -webkit-appearance: radio;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledInputRange = styled.input`
  margin-right: 5%;
  appearance: auto;
`;

export const ChangeVolumeValue = styled.span``;
