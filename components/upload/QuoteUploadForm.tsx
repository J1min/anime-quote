import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
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
    <QuoteUploadFormView
      onSubmit={handleSubmit((validData) => onValid(validData), onInValid)}
    >
      <Input registerReturn={register("quote_content")} placeholder="명언" />
      <Input registerReturn={register("charactor_name")} placeholder="인물" />
      <Button type="submit">추가</Button>
    </QuoteUploadFormView>
  );
}

const QuoteUploadFormView = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  width: 75%;
  max-width: 40rem;
`;
