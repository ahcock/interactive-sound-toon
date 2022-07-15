import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  overflow: hidden;
  display: flex;
  z-index: 2;
`;

export const ModalContainer = styled.div`
  margin: auto;
  padding: 5.5vw 6.5vw;
  border-radius: 5px;
  background-color: #d5fefd;
  background-image: linear-gradient(315deg, #d5fefd 0%, #fffcff 74%);
`;

export const PlaybackConsentQuestion = styled.p`
  font-size: clamp(2vw, 2em, 3vw);
  line-height: 1.8;
  text-align: center;
  font-weight: 500;
`;

export const ConsentModalButtonContainer = styled.div`
  margin-top: 10%;
  display: flex;
  justify-content: space-around;
  gap: 2px;
`;
