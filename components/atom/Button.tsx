import theme from "@/styles/theme";
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";

export type ButtonStyle = "main" | "frame";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  rounded?: boolean;
}

export default function Button({
  type = "button",
  children,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <ButtonView
      type={type === "button" ? "button" : "submit"}
      onClick={onClick}
      {...props}
    >
      {children}
    </ButtonView>
  );
}

export const ButtonView = styled.button`
  background-color: ${theme.secondary};
  border-radius: 0.25rem;
  padding: 0.5rem 1.25rem;
  font-weight: 900;
  border: 0;
  font-size: 0.875rem;
  white-space: nowrap;
  word-break: keep-all;
  cursor: pointer;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
`;
