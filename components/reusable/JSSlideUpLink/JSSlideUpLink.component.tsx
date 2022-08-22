import { forwardRef, ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { StyledAnchor } from "./JSSlideUpLink.styles";

interface JSSlideUpLinkProps extends LinkProps {
  isIntersecting?: boolean;
  children: ReactNode;
}

const JSSlideUpLink = forwardRef<HTMLAnchorElement, JSSlideUpLinkProps>(
  ({ isIntersecting, children, ...props }, ref) => {
    return (
      <Link {...props}>
        <StyledAnchor isIntersecting={isIntersecting} ref={ref}>
          {children}
        </StyledAnchor>
      </Link>
    );
  }
);

JSSlideUpLink.displayName = "JSSlideUpLink";

export { JSSlideUpLink };
