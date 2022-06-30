import styled from "styled-components";

const focusBoxShadow = "inset 0 0 0 2px var(--blue500)";

export const JSInputLabel = styled.label`
  color: var(--grey700);
  display: inline-block;
  padding: 4px 0;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
  position: relative;
`;

export const JSInputInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  margin: 1px auto 0;
  font-size: 15px;
  line-height: 20px;
  color: var(--grey800);
  background-color: var(--white);
  border: none;
  outline: none;
  appearance: none;
  box-shadow: inset 0 0 0 1px rgba(0, 27, 55, 0.1);
  border-radius: 8px;
  overflow: hidden;

  &:hover {
    box-shadow: inset 0 0 0 2px var(--blue200);
  }

  &:active {
    outline: 0;
    box-shadow: ${focusBoxShadow};
  }

  &:focus-within {
    outline: 0;
    box-shadow: ${focusBoxShadow};
  }
`;

export const JSInputInput = styled.input`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  outline: 0;
  border: 0;
  padding: 0 18px;
  font-size: inherit;
  background: none;
`;
