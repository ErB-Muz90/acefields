import type { Metadata } from "next";
import Link from "next/link";

const blogContent: Record<string, { title: string; author: string; date: string; content: string }> = {
  "cross-border-shipping-guide-east-africa": {
    title: "The Complete Guide to Cross-Border Shipping in East Africa",
    author: "James Mwangi",
    date: "January 15, 2025",
    content: `Cross-border shipping in East Africa has become increasingly streamlined thanks to the East African Community (EAC) customs union, but challenges remain. Here's everything you need to know.

## Understanding the EAC Framework

The East African Community — comprising Kenya, Uganda, Tanzania, Rwanda, and Burundi — has established a customs union that significantly simplifies trade between member states. This means reduced tariffs and standardized documentation.

## Key Documents Required

1. **Commercial Invoice** — Detailed description of goods with values
2. **Packing List** — Weight, dimensions, and content breakdown  
3. **Certificate of Origin** — Proves goods originate from an EAC member state
4. **Import/Export Declaration** — Filed with the respective revenue authorities
5. **Transit Bond** — Required for goods passing through intermediate countries

## Common Challenges

- **Border Delays**: Despite EAC integration, border crossings can still take 2-6 hours. Using established logistics partners (like AceField Logistics) with pre-clearance arrangements significantly reduces wait times.
- **Documentation Errors**: Incorrect or incomplete paperwork is the #1 cause of delays. Always double-check quantities, values, and HS codes.
- **Currency Differences**: Each country uses different currency. Ensure pricing agreements specify which currency applies.

## Best Practices

- Partner with an experienced logistics provider who knows the routes
- Use digital documentation where accepted
- Plan for customs processing time in your delivery estimates
- Consider bonded warehousing at border points for flexible inventory management

At AceField Logistics, we handle all cross-border documentation and customs clearance, giving you peace of mind and faster delivery times.`,
  },
  "ecommerce-logistics-kenya-2025": {
    title: "E-Commerce Logistics in Kenya: Trends for 2025",
    author: "Grace Atieno",
    date: "January 10, 2025",
    content: `Kenya's e-commerce sector continues to grow rapidly, driven by increasing internet penetration and mobile money adoption. Here are the logistics trends shaping the industry in 2025.

## Same-Day Delivery is Now Standard

What was once a premium service is becoming the baseline expectation. Nairobi consumers increasingly expect same-day delivery for online purchases, and this trend is spreading to Mombasa, Kisumu, and other major cities.

## M-Pesa Integration

Cash on delivery is declining as M-Pesa becomes the preferred payment method. Logistics companies are integrating M-Pesa STK Push for seamless payment collection at the point of delivery.

## Fulfillment Centers

More e-commerce businesses are outsourcing warehousing and fulfillment to third-party logistics (3PL) providers. This allows them to focus on marketing and product development while experts handle storage, picking, packing, and shipping.

## Technology-Driven Operations

Real-time tracking, automated route optimization, and digital proof of delivery are no longer nice-to-haves — they're essential features that customers and businesses expect.

## The Rise of Social Commerce

Instagram and WhatsApp-based businesses need logistics partners who can handle irregular order volumes and provide flexible pickup scheduling.

AceField Logistics is at the forefront of these trends, offering comprehensive e-commerce logistics solutions tailored for the Kenyan market.`,
  },
};

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogContent[slug];
  return {
    title: post?.title || "Blog Post",
    description: post?.content?.slice(0, 160) || "",
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogContent[slug];

  if (!post) {
    return (
      <>
        <section className="bg-gradient-hero text-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-black">Blog Post</h1>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold">Post Coming Soon</h2>
            <p className="text-text-secondary mt-4">This article is currently being written. Check back soon!</p>
            <Link href="/blog" className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-all">
              ← Back to Blog
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-gradient-hero text-white py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/blog" className="text-white/60 hover:text-white text-sm transition-colors mb-4 inline-block">← Back to Blog</Link>
          <h1 className="text-3xl lg:text-4xl font-black leading-tight">{post.title}</h1>
          <div className="flex items-center justify-center gap-3 mt-4 text-white/70 text-sm">
            <span>{post.author}</span>
            <span>•</span>
            <time>{post.date}</time>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-slate max-w-none">
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return <h2 key={i} className="text-2xl font-bold mt-10 mb-4 text-text-primary">{paragraph.replace("## ", "")}</h2>;
            }
            if (paragraph.startsWith("1. ") || paragraph.startsWith("- ")) {
              const items = paragraph.split("\n");
              return (
                <ul key={i} className="space-y-2 my-4">
                  {items.map((item, j) => (
                    <li key={j} className="text-text-secondary leading-relaxed flex gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span>{item.replace(/^[\d]+\.\s\*\*|\*\*/g, "").replace(/\*\*/g, "")}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return <p key={i} className="text-text-secondary leading-relaxed my-4">{paragraph}</p>;
          })}
        </article>
      </section>
    </>
  );
}
