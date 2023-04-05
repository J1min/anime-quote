import { ReactNode } from "react";
import styled from "styled-components";

interface QuoteIdPageLayoutProps {
  app: ReactNode;
  title: ReactNode;
}

function Frame({ app, title }: QuoteIdPageLayoutProps) {
  return (
    <QuoteIdPageWrapper>
      {title}
      {app}
    </QuoteIdPageWrapper>
  );
}

export default function QuoteIdPageLayout({
  ...props
}: QuoteIdPageLayoutProps) {
  return <Frame {...props} />;
}

const QuoteIdPageWrapper = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
