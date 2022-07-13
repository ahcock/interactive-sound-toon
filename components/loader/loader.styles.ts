import styled from "styled-components";

export const StyledLoader = styled.div`
  margin: auto;
  border: 1.5vw solid transparent;
  border-top: 1.5vw solid var(--blue600);
  border-radius: 50%;
  width: 10vw;
  height: 10vw;
  animation: spin 0.8s cubic-bezier(0.5, 0, 0.5, 1) infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  } ;
`;
