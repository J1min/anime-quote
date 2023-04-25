import httpClient from "@/apis";
import QuoteView from "@/components/atom/QuoteView";
import QuotePageLayout from "@/layout/QuotePageLayout";
import { Quote } from "@/types/quote.interface";
import { deepcopy } from "@/utils/array";
import { GetServerSideProps } from "next";

interface MainPageProps {
  quote: Quote;
}

export default function MainPage({ quote }: MainPageProps) {
  return <QuotePageLayout app={<QuoteView quote={quote} />} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: quote } = await httpClient.quote
    .get()
    .then((r) => ({ data: deepcopy(r.data.quote) }));

  return { props: { quote } };
};
