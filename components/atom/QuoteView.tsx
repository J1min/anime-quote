import styled from "styled-components";
import { Quote } from "@/types/quote.interface";
import theme from "@/styles/theme";
import QuoteIcon from "../icons/QuoteIcon";

interface QuoteViewProps {
  quote: Quote;
}

export default function QuoteView({ quote }: QuoteViewProps) {
  return (
    <QuoteWrapper>
      <QuoteIcon />
      <QuoteContent>{quote.quote_content}</QuoteContent>
      <QuoteCharactorName>-{quote.charactor_name}-</QuoteCharactorName>
    </QuoteWrapper>
  );
}

const QuoteWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;

  max-width: 40rem;
  width: 75%;
  max-height: 40rem;
  overflow: auto;

  word-break: keep-all;
  line-height: 3.5rem;

  border: 1px solid ${theme.primary};
  padding: 3.75rem 7.5rem;
  box-sizing: border-box;
`;

const QuoteContent = styled.span`
  font-size: 2.5rem;
`;

const QuoteCharactorName = styled.span`
  font-family: "Chosunilbo_myungjo";
  font-size: 1.5rem;
  letter-spacing: 0.2rem;
`;
