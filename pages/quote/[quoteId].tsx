import QuoteView from "@/components/atom/QuoteView";
import Title from "@/components/atom/Title";
import QuoteIdPageLayout from "@/layout/QuoteIdPageLayout";
import { useQuoteById } from "@/model/quote";
import { useRouter } from "next/router";

export default function QuoteIdPage() {
  const router = useRouter();
  const { data: quoteData } = useQuoteById(Number(router.query.quoteId));

  return (
    <QuoteIdPageLayout
      title={<Title>선택한 명언</Title>}
      app={<QuoteView quote={quoteData} />}
    />
  );
}
