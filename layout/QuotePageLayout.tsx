import { ReactNode } from "react";
import styled from "styled-components";

interface QuoteIdPageLayoutProps {
  app: ReactNode;
}

function Frame({ app }: QuoteIdPageLayoutProps) {
  return <QuoteIdPageWrapper>{app}</QuoteIdPageWrapper>;
}

export default function QuotePageLayout({ ...props }: QuoteIdPageLayoutProps) {
  return <Frame {...props} />;
}

const QuoteIdPageWrapper = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
