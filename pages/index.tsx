import { useRandomQuote } from "@/model/quote";

export default function Main() {
  const { data: quoteData } = useRandomQuote();

  return (
    <section id="main">
      <div>{quoteData.quote_content}</div>
      <div>{quoteData.charactor_name}</div>
    </section>
  );
}
