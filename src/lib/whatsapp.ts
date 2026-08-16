export function waPhone(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

export function waLink(phone: string, text: string): string {
  return `https://wa.me/${waPhone(phone)}?text=${encodeURIComponent(text)}`;
}

export function adminWhatsApp(): string {
  return process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "254721907730";
}

export function quoteDetailsText(q: {
  name: string;
  phone: string;
  email: string | null;
  originCity: string;
  destCity: string;
  weightKg: string | number;
  serviceType: string;
  estimatedPrice: string | number | null;
  message: string | null;
}): string {
  return [
    "*NEW QUOTE REQUEST — AceField Logistics*",
    `Name: ${q.name}`,
    `Phone: ${q.phone}`,
    `Email: ${q.email || "-"}`,
    `Route: ${q.originCity} → ${q.destCity}`,
    `Weight: ${q.weightKg} kg`,
    `Service: ${q.serviceType}`,
    `Estimate: KES ${Number(q.estimatedPrice || 0).toLocaleString()}`,
    q.message ? `Notes: ${q.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function invoiceText(q: {
  name: string;
  phone: string;
  originCity: string;
  destCity: string;
  weightKg: string | number;
  serviceType: string;
  estimatedPrice: string | number | null;
  finalPrice: string | number | null;
  paymentDetails: string | null;
  invoiceNumber: string | null;
}): string {
  return [
    `*INVOICE ${q.invoiceNumber || ""} — AceField Logistics*`,
    `Customer: ${q.name}`,
    `Route: ${q.originCity} → ${q.destCity}`,
    `Weight: ${q.weightKg} kg`,
    `Service: ${q.serviceType}`,
    "",
    `Final Price: KES ${Number(q.finalPrice ?? q.estimatedPrice ?? 0).toLocaleString()}`,
    "",
    q.paymentDetails ? `*Payment Details:*\n${q.paymentDetails}` : "",
    "",
    "Please make payment and share your receipt. Thank you!",
  ]
    .filter(Boolean)
    .join("\n");
}
