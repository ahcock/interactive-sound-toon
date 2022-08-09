import styled from "styled-components";

export const UploadLaoderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoaderBody = styled.section`
  padding: 0 2vw;
  min-width: 40%;
  min-height: 45%;
  max-width: 500px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
`;

export const UploadingMessage = styled.span`
  margin: 3.5vh auto 0;
  font-size: 2em;
  font-weight: 700;
`;
