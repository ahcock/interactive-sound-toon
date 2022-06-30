import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import { StyledButton } from "./JSButton.styles";

interface JSButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}
const JSButton: FC<JSButtonProps> = ({ children }, ...props) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export { JSButton };
