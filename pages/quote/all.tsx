import httpClient from "@/apis";
import QuoteListView from "@/components/atom/QuoteListView";
import Title from "@/components/atom/Title";
import QuoteAllPageLayout from "@/layout/QuoteAllPageLayout";
import { Quote } from "@/types/quote.interface";
import { deepcopy } from "@/utils/array";
import { GetStaticProps } from "next";

interface QuoteAllPageProps {
  list: Quote[];
}

export default function QuoteAllPage({ list }: QuoteAllPageProps) {
  return (
    <QuoteAllPageLayout
      title={<Title>명언 전체 조회</Title>}
      app={<QuoteListView quoteList={list} />}
    />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await httpClient.quote
    .all()
    .then((r) => ({ data: deepcopy(r.data) }));

  return { props: { list: data.list }, revalidate: 6000 };
};
