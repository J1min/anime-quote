import { ReactNode } from "react";
import styled from "styled-components";

interface TitleProps {
  children: ReactNode;
}

export default function Title({ children }: TitleProps) {
  return <TitleWrapper>{children}</TitleWrapper>;
}
const TitleWrapper = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
`;
