import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { toast } from "react-toastify";
import httpClient from "@/apis";
import config from "@/config";
import Input from "../atom/Input";
import Button from "../atom/Button";
import Title from "../atom/Title";

export interface QuoteForm {
  password: string;
  quote_content: string;
  charactor_name: string;
}

export default function QuoteUploadForm() {
  const { register, handleSubmit } = useForm<QuoteForm>();

  const uploadRequest = async (quoteData: QuoteForm) => {
    const response = await httpClient.quote
      .post({ ...quoteData, password: undefined })
      .then((r) => r.data);
    return response;
  };

  const uploadMutation = useMutation((quoteData: QuoteForm) =>
    uploadRequest(quoteData),
  );

  const onValid: SubmitHandler<QuoteForm> = (quoteData: QuoteForm) => {
    if (quoteData.password === config.uploadPassword) {
      toast("성공했어요");
      return uploadMutation.mutate(quoteData);
    }
    toast("비번이 틀렸어요");
  };

  const onInValid: SubmitErrorHandler<QuoteForm> = (inValidData) =>
    // eslint-disable-next-line no-console
    console.info(inValidData);

  return (
    <QuoteUploadFormView
      onSubmit={handleSubmit((validData) => onValid(validData), onInValid)}
    >
      <Title>명언 추가</Title>
      <Input registerReturn={register("quote_content")} placeholder="명언" />
      <Input registerReturn={register("charactor_name")} placeholder="인물" />
      <Input
        type="password"
        registerReturn={register("password")}
        placeholder="업로드 비밀번호"
      />
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
