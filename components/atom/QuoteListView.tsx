import styled from "styled-components";
import { Quote } from "@/types/quote.interface";
import QuoteView from "./QuoteView";

interface QuoteViewProps {
  quoteList: Quote[];
}

export default function QuoteListView({ quoteList }: QuoteViewProps) {
  return (
    <QuoteListWrapper>
      {quoteList.map((quote) => (
        <QuoteView key={quote.quote_id} quote={quote} />
      ))}
    </QuoteListWrapper>
  );
}

const QuoteListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding-bottom: 4rem;
`;
