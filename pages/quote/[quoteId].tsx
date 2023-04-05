import { useQuoteById } from "@/model/quote";
import { useRouter } from "next/router";

export default function QuoteIdPage() {
  const router = useRouter();
  const { data: quoteData } = useQuoteById(
    Number(router.query.quoteId as string),
  );
  return (
    <section id="quote-id-page">
      <div>{quoteData.quote_content}</div>
      <div>{quoteData.charactor_name}</div>
    </section>
  );
}
