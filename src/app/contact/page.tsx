import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with AceField Logistics. Call, email, visit, or WhatsApp us for logistics support.",
};

export default function ContactPage() {
  return <ContactClient />;
}
