import styled from "styled-components";

export const StyledButton = styled.button<{ small: boolean }>`
  padding: ${({ small }) => (!small ? "18px 28px" : "14px 24px")};
  font-weight: 600;
  color: var(--grey50);
  background-color: var(--blue500);
  line-height: 1.6rem;
  border-radius: 8px;

  &:hover {
    color: var(--white);
    background-color: var(--blue700);
  }

  @media screen and (min-width: 540px) and (max-width: 639px) {
    padding: 14px 18px;
    font-size: 15px;
    line-height: 1.2rem;
  }

  @media screen and (max-width: 539px) {
    padding: 10px 14px;
    font-size: 11px;
    line-height: 0.8rem;
  } ;
`;
