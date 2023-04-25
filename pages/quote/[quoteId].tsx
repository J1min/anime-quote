import httpClient from "@/apis";
import QuoteView from "@/components/atom/QuoteView";
import Title from "@/components/atom/Title";
import QuoteIdPageLayout from "@/layout/QuoteIdPageLayout";
import { Quote } from "@/types/quote.interface";
import { deepcopy } from "@/utils/array";
import { GetStaticPaths, GetStaticProps } from "next";

interface QuoteIdPageProps {
  quote: Quote;
  is404: boolean;
}

export default function QuoteIdPage({ quote, is404 }: QuoteIdPageProps) {
  if (is404) return <div>404 입니다</div>;

  return (
    <QuoteIdPageLayout
      title={<Title>선택한 명언</Title>}
      app={<QuoteView quote={quote} />}
    />
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const quoteId = context.params?.quoteId || 0;
  const { data: quote, is404 } = await httpClient.quote
    .getById({
      params: { id: quoteId },
    })
    .then((r) => ({ is404: false, data: deepcopy(r.data.quote) }))
    .catch(() => ({ is404: true, data: {} }));

  return { props: { quote, is404 }, revalidate: 6000 };
};
