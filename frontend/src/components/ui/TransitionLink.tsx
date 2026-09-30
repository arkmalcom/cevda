import React from "react";
import { Link, NavLink, type LinkProps, type NavLinkProps } from "react-router-dom";
import { useTransitionNavigate } from "../../hooks/useTransitionNavigate";

type TransitionLinkProps = LinkProps & { to: string };

export const TransitionLink = React.forwardRef<
  HTMLAnchorElement,
  TransitionLinkProps
>(({ to, onClick, ...props }, ref) => {
  const transitionNavigate = useTransitionNavigate();
  return (
    <Link
      ref={ref}
      to={to}
      onClick={(event) => {
        onClick?.(event);
        transitionNavigate(event, to);
      }}
      {...props}
    />
  );
});
TransitionLink.displayName = "TransitionLink";

type TransitionNavLinkProps = NavLinkProps & { to: string };

export const TransitionNavLink: React.FC<TransitionNavLinkProps> = ({
  to,
  onClick,
  ...props
}) => {
  const transitionNavigate = useTransitionNavigate();
  return (
    <NavLink
      to={to}
      onClick={(event) => {
        onClick?.(event);
        transitionNavigate(event, to);
      }}
      {...props}
    />
  );
};
