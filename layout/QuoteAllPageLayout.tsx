import { ReactNode } from "react";
import styled from "styled-components";

interface QuoteAllPageLayoutProps {
  app: ReactNode;
  title: ReactNode;
}

function Frame({ app, title }: QuoteAllPageLayoutProps) {
  return (
    <QuoteAllPageWrapper>
      {title}
      {app}
    </QuoteAllPageWrapper>
  );
}

export default function QuoteAllPageLayout({
  ...props
}: QuoteAllPageLayoutProps) {
  return <Frame {...props} />;
}

const QuoteAllPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
`;
