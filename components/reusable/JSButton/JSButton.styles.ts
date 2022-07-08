import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 18px 28px;
  font-weight: 600;
  color: var(--grey50);
  background-color: var(--blue500);
  line-height: 1.6rem;
  border-radius: 8px;

  &:hover {
    color: var(--white);
    background-color: var(--blue700);
  }

  @media screen and(max-width: 639px) {
    padding: 14px 18px;
    font-size: 15px;
    line-height: 1.2rem;
  }
`;
