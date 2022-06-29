import { FC, InputHTMLAttributes } from "react";
import {
  JSInputInput,
  JSInputInputWrapper,
  JSInputLabel,
} from "./JSInput.styles";

interface JSInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const JSInput: FC<JSInputProps> = ({ label, id, ...inputProps }) => {
  return (
    <div>
      {!!label && <JSInputLabel htmlFor={id}>{label}</JSInputLabel>}
      <JSInputInputWrapper>
        <JSInputInput id={id} {...inputProps} />
      </JSInputInputWrapper>
    </div>
  );
};

export { JSInput };
