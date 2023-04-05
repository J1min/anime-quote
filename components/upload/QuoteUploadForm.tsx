import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
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

  const onValid: SubmitHandler<QuoteForm> = (quoteData: QuoteForm) =>
    uploadMutation.mutate(quoteData);

  const onInValid: SubmitErrorHandler<QuoteForm> = (inValidData) =>
    console.info(inValidData);

  return (
    <form onSubmit={handleSubmit((validData) => onValid(validData), onInValid)}>
      <Input registerReturn={register("charactor_name")} />
      <Input registerReturn={register("quote_content")} />
      <Button type="submit">추가</Button>
    </form>
  );
}
