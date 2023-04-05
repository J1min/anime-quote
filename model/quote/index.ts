import httpClient from "@/apis";
import { QuoteListResponse, QuoteResponse } from "@/types/quote.interface";
import { useQuery } from "@tanstack/react-query";

export const useRandomQuote = () => {
  const { data } = useQuery<QuoteResponse>(["useRandomQuote"], () =>
    httpClient.quote.get().then((r) => r.data),
  );
  return {
    data: data?.quote || { charactor_name: "", quote_content: "", quote_id: 0 },
  };
};

export const useQuoteById = (quoteId: number) => {
  const { data } = useQuery<QuoteResponse>(
    ["useQuoteById"],
    () =>
      httpClient.quote.getById({ params: { id: quoteId } }).then((r) => r.data),
    {
      enabled: !!quoteId,
    },
  );
  return {
    data: data?.quote || { charactor_name: "", quote_content: "", quote_id: 0 },
  };
};

export const useAllQuote = () => {
  const { data } = useQuery<QuoteListResponse>(["useAllQuote"], () =>
    httpClient.quote.all().then((r) => r.data),
  );
  return {
    list: data?.list || [],
  };
};
