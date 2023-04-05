import httpClient from "@/apis";
import { useQuery } from "@tanstack/react-query";

export const useRandomQuote = () => {
  const { data } = useQuery(["useRandomQuote"], () =>
    httpClient.quote.get().then((r) => r.data),
  );
  return data;
};

export const useQuoteById = (quoteId: number) => {
  const { data } = useQuery(["useQuoteById"], () =>
    httpClient.quote.getById({ params: { id: quoteId } }).then((r) => r.data),
  );
  return data;
};

export const useAllQuote = () => {
  const { data } = useQuery(["useAllQuote"], () =>
    httpClient.quote.all().then((r) => r.data),
  );
  return data;
};
