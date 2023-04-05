import QuoteUploadForm from "@/components/upload/QuoteUploadForm";
import QuotePageLayout from "@/layout/QuotePageLayout";

export default function UploadPage() {
  return <QuotePageLayout app={<QuoteUploadForm />} />;
}
