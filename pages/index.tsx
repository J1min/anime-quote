import QuoteView from "@/components/atom/QuoteView";
import QuotePageLayout from "@/layout/QuotePageLayout";
import { useRandomQuote } from "@/model/quote";

export default function Main() {
  const { data: quoteData } = useRandomQuote();

  return <QuotePageLayout app={<QuoteView quote={quoteData} />} />;
}
