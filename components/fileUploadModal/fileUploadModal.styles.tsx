import styled from "styled-components";

export const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBody = styled.section`
  padding: 0 2vw;
  min-width: 250px;
  max-width: 40%;
  min-height: 400px;
  max-height: 40%;
  background-color: rgb(255, 255, 255);
  border-radius: 25px;
  display: flex;
`;

export const ModalTitle = styled.h3`
  margin-top: 3.5vh;
  font-size: 2.5vh;
`;

export const ModalInputForm = styled.form``;

export const SoundNameInput = styled.input``;
