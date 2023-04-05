import theme from "@/styles/theme";
import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  registerReturn?: UseFormRegisterReturn;
}

export default function Input({
  type = "text",
  registerReturn,
  ...props
}: InputProps) {
  return <InputView type={type} {...registerReturn} {...props} />;
}

const InputView = styled.input<InputProps>`
  background-color: ${theme.secondary};
  width: 75%;
  max-width: 40rem;
  border: 0;
  box-sizing: border-box;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
  &:focus {
    outline: none;
  }
`;
