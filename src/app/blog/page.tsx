import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description: "Logistics tips, industry insights, and company news from AceField Logistics East Africa.",
};

export const dynamic = "force-dynamic";

const fallbackPosts = [
  {
    slug: "cross-border-shipping-guide-east-africa",
    title: "The Complete Guide to Cross-Border Shipping in East Africa",
    excerpt: "Everything you need to know about shipping goods between Kenya, Uganda, Tanzania, Rwanda, and Burundi — customs, documentation, and best practices.",
    author: "James Mwangi",
    createdAt: new Date("2025-01-15"),
  },
  {
    slug: "ecommerce-logistics-kenya-2025",
    title: "E-Commerce Logistics in Kenya: Trends for 2025",
    excerpt: "How e-commerce is reshaping last-mile delivery in Kenya and what businesses need to know to stay competitive.",
    author: "Grace Atieno",
    createdAt: new Date("2025-01-10"),
  },
  {
    slug: "reducing-shipping-costs-east-africa",
    title: "7 Ways to Reduce Your Shipping Costs in East Africa",
    excerpt: "Practical strategies for businesses to optimize logistics spending without compromising delivery quality.",
    author: "Hassan Ali",
    createdAt: new Date("2025-01-05"),
  },
  {
    slug: "same-day-delivery-nairobi",
    title: "Same-Day Delivery in Nairobi: How It Works",
    excerpt: "Behind the scenes of our same-day delivery service — how we guarantee packages arrive within hours.",
    author: "Mary Njeri",
    createdAt: new Date("2024-12-20"),
  },
  {
    slug: "warehousing-solutions-growing-businesses",
    title: "Warehousing Solutions for Growing Kenyan Businesses",
    excerpt: "When to consider third-party warehousing and how it can accelerate your business growth.",
    author: "James Mwangi",
    createdAt: new Date("2024-12-15"),
  },
  {
    slug: "mpesa-logistics-payments",
    title: "M-Pesa and Logistics: The Future of Shipping Payments",
    excerpt: "How mobile money is revolutionizing how Kenyans pay for logistics services.",
    author: "Hassan Ali",
    createdAt: new Date("2024-12-10"),
  },
];

export default async function BlogPage() {
  let posts = fallbackPosts;
  try {
    const dbPosts = await db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.createdAt));
    if (dbPosts.length > 0) {
      posts = dbPosts;
    }
  } catch {
    // use fallback
  }

  return (
    <>
      <section className="bg-gradient-hero text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-black">Blog & Insights</h1>
          <p className="text-xl text-white/70 mt-4 max-w-2xl mx-auto">
            Logistics tips, industry insights, and updates from AceField Logistics.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="group bg-surface rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <span className="text-5xl">📝</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
                    <span>{post.author}</span>
                    <span>•</span>
                    <time>{new Date(post.createdAt).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}</time>
                  </div>
                  <h2 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-sm text-text-secondary mt-3 leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-primary hover:text-primary-light transition-colors">
                    Read More
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
