import React, { useRef } from "react";
import { m, useReducedMotion, useSpring } from "motion/react";
import { TransitionLink } from "./TransitionLink";

type Variant = "primary" | "outline" | "light";

interface BaseProps {
  children: React.ReactNode;
  variant?: Variant;
  icon?: string;
  magnetic?: boolean;
  className?: string;
}

type ButtonProps = BaseProps &
  (
    | { to: string; href?: never }
    | { href: string; to?: never; external?: boolean }
    | ({ to?: never; href?: never } & Pick<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        "type" | "disabled" | "onClick" | "aria-label"
      >)
  );

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "btn-primary",
  outline: "btn-outline",
  light: "btn-light",
};

const MAGNET_STRENGTH = 0.28;
const MAGNET_SPRING = { stiffness: 220, damping: 16, mass: 0.6 };

const trackFillOrigin = (event: React.PointerEvent<HTMLElement>) => {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  target.style.setProperty("--fill-x", `${event.clientX - rect.left}px`);
  target.style.setProperty("--fill-y", `${event.clientY - rect.top}px`);
};

const Button: React.FC<ButtonProps> = (props) => {
  const { children, variant = "primary", icon, magnetic = false, className = "" } = props;
  const reduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, MAGNET_SPRING);
  const y = useSpring(0, MAGNET_SPRING);
  const isMagnetic = magnetic && !reduceMotion;

  const handlePointerMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (!isMagnetic || event.pointerType !== "mouse" || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * MAGNET_STRENGTH);
    y.set((event.clientY - (rect.top + rect.height / 2)) * MAGNET_STRENGTH);
  };

  const resetMagnet = () => {
    x.set(0);
    y.set(0);
  };

  const classes = `btn ${VARIANT_CLASS[variant]} ${className}`;
  const content = (
    <>
      <span className="btn-fill" aria-hidden />
      {children}
      {icon && <i className={`fas ${icon} text-[0.9em]`} aria-hidden />}
    </>
  );
  const fillHandlers = {
    onPointerEnter: trackFillOrigin,
    onPointerLeave: trackFillOrigin,
  };

  let element: React.ReactNode;
  if ("to" in props && props.to) {
    element = (
      <TransitionLink to={props.to} className={classes} {...fillHandlers}>
        {content}
      </TransitionLink>
    );
  } else if ("href" in props && props.href) {
    const external = "external" in props && props.external;
    element = (
      <a
        href={props.href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...fillHandlers}
      >
        {content}
      </a>
    );
  } else {
    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    element = (
      <button
        type={buttonProps.type ?? "button"}
        disabled={buttonProps.disabled}
        onClick={buttonProps.onClick}
        aria-label={buttonProps["aria-label"]}
        className={classes}
        {...fillHandlers}
      >
        {content}
      </button>
    );
  }

  if (!magnetic) return element;

  return (
    <m.span
      ref={wrapperRef}
      className="inline-flex"
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetMagnet}
    >
      {element}
    </m.span>
  );
};

export default Button;
