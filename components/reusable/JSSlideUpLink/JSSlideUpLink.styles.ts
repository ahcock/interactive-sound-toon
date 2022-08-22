import styled, { css, keyframes } from "styled-components";

const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledAnchor = styled.a<{ isIntersecting?: boolean }>`
  font-size: 1.5vw;
  font-weight: 600;
  padding: 1em;
  cursor: pointer;
  border-radius: 5px;
  opacity: 0;

  ${({ isIntersecting }) =>
    isIntersecting &&
    css`
      animation: ${slideUp} 1.2s ease 0s 1 normal forwards;
    `}

  &:hover {
    background-color: var(--grey200);
  }
`;
