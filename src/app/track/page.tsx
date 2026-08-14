import type { Metadata } from "next";
import TrackingClient from "./TrackingClient";

export const metadata: Metadata = {
  title: "Track Shipment",
  description: "Track your AceField Logistics shipment in real-time. Enter your tracking ID to see the latest status.",
};

export default function TrackPage() {
  return <TrackingClient />;
}
