import { useRef } from "react";
import styled from "styled-components";
import { Quote } from "@/types/quote.interface";
import theme from "@/styles/theme";
import Button from "./Button";

interface QuoteViewProps {
  quote: Quote;
  isFull?: boolean;
}

export default function QuoteView({ quote, isFull = false }: QuoteViewProps) {
  const imageExportComponent = useRef(null);

  const exportImage = async () => {
    const { exportComponentAsPNG } = await import(
      "react-component-export-image"
    );
    return exportComponentAsPNG(imageExportComponent, {
      fileName: `${quote.charactor_name.split(" ").join("_")}.png`,
    });
  };

  return (
    <>
      <QuoteWrapper ref={imageExportComponent} isFull={isFull}>
        <QuoteContent>{quote.quote_content}</QuoteContent>
        <QuoteCharactorName>-{quote.charactor_name}-</QuoteCharactorName>
      </QuoteWrapper>
      <Button style={{ marginTop: "1rem" }} onClick={exportImage}>
        이미지 저장
      </Button>
    </>
  );
}

const QuoteWrapper = styled.article<{ isFull: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;

  max-width: 45rem;
  width: 75%;
  ${(props) => !props.isFull && "max-height: 40rem"};

  overflow: auto;
  word-break: keep-all;
  line-height: 3.5rem;

  border: 3px solid ${theme.primary};
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));

  padding: 3.75rem 7.5rem;
  box-sizing: border-box;
  margin-top: 3rem;
`;

const QuoteContent = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
`;

const QuoteCharactorName = styled.span`
  font-family: "Chosunilbo_myungjo";
  font-size: 1.5rem;
  letter-spacing: 0.2rem;
  white-space: nowrap;
`;
