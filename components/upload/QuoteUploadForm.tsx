import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import httpClient from "@/apis";
import { Quote } from "@/types/quote.interface";
import Input from "../atom/Input";
import Button from "../atom/Button";

type QuoteForm = Omit<Quote, "quote_id">;

export default function QuoteUploadForm() {
  const { register, handleSubmit } = useForm<QuoteForm>();

  const uploadRequest = async (quoteData: QuoteForm) => {
    const response = await httpClient.quote.post(quoteData).then((r) => r.data);
    return response;
  };

  const uploadMutation = useMutation((quoteData: QuoteForm) =>
    uploadRequest(quoteData),
  );

  const onValid = (quoteData: QuoteForm) => {
    uploadMutation.mutate(quoteData);
  };
  const onInValid = () => {};

  return (
    <form onSubmit={handleSubmit((validData) => onValid(validData), onInValid)}>
      <Input {...register("charactor_name")} />
      <Input {...register("quote_content")} />
      <Button type="submit">추가</Button>
    </form>
  );
}
