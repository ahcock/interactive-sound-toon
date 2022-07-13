import { ButtonHTMLAttributes, FC } from "react";
import { StyledButton } from "./JSButton.styles";

interface JSButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  small?: boolean;
}
const JSButton: FC<JSButtonProps> = ({ children, small = false, ...props }) => {
  return (
    <StyledButton small={small} {...props}>
      {children}
    </StyledButton>
  );
};

export { JSButton };
