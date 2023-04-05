import { useEffect } from "react";
import httpClient from "@/apis";

export default function Main() {
  useEffect(() => {
    httpClient.quote.get().then((r) => console.log(r.data));
  }, []);
  return <section id="main">I love 1.2.9</section>;
}
