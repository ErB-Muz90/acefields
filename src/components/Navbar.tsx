"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services/parcel-delivery", label: "Parcel Delivery" },
      { href: "/services/freight-cargo", label: "Freight & Cargo" },
      { href: "/services/same-day-delivery", label: "Same-Day Delivery" },
      { href: "/services/cross-border", label: "Cross-Border Logistics" },
      { href: "/services/warehousing", label: "Warehousing & Fulfillment" },
    ],
  },
  { href: "/track", label: "Track Shipment" },
  { href: "/quote", label: "Get a Quote" },
  { href: "/coverage", label: "Coverage" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="group hover:opacity-90 transition-opacity">
            <Logo variant="full" size="md" theme="light" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.href}
                  className="relative group"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  {servicesOpen && (
                    <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-text-secondary hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/track"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Track Package
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-text-secondary hover:bg-primary/5 hover:text-primary rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
                {link.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    className="block pl-8 pr-4 py-2 text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
