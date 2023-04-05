export interface Quote {
  quote_id: number;
  quote_content: string;
  charactor_name: string;
}

export interface QuoteResponse {
  quote: Quote;
}

export interface QuoteListResponse {
  list: Quote[];
}
