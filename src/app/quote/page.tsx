import type { Metadata } from "next";
import QuoteClient from "./QuoteClient";

export const metadata: Metadata = {
  title: "Get a Quote",
  description: "Get an instant courier quote. Calculate delivery costs based on weight, distance, and speed.",
};

export default function QuotePage() {
  return <QuoteClient />;
}
