import { useAllQuote } from "@/model/quote";

export default function QuoteAllPage() {
  const { list: quoteList } = useAllQuote();
  return (
    <section id="quote-all-page">
      {quoteList.map((quote) => (
        <div key={quote.quote_id}>
          <div>{quote.quote_content}</div>
          <div>{quote.charactor_name}</div>
        </div>
      ))}
    </section>
  );
}
