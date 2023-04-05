import styled from "styled-components";
import { Quote } from "@/types/quote.interface";
import theme from "@/styles/theme";
import Image from "next/image";
import { QuoteIcon } from "../icons";

interface QuoteViewProps {
  quote: Quote;
  isFull?: boolean;
}

export default function QuoteView({ quote, isFull = false }: QuoteViewProps) {
  return (
    <QuoteWrapper isFull={isFull}>
      <Image src={QuoteIcon} alt="따옴표" />
      <QuoteContent>{quote.quote_content}</QuoteContent>
      <QuoteCharactorName>-{quote.charactor_name}-</QuoteCharactorName>
    </QuoteWrapper>
  );
}

const QuoteWrapper = styled.article<{ isFull: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;

  max-width: 50rem;
  width: 75%;
  ${(props) => !props.isFull && "max-height: 40rem"};

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
