import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Copy } from "lucide-react";

import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { getArticle, relatedArticles } from "@/lib/resources";
import { pageHead, PUBLIC_ORIGIN } from "@/lib/seo";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { slug: article.slug };
  },
  head: ({ params }) => {
    const article = getArticle(params.slug);

    if (!article) {
      return {
        meta: [
          { title: "Article not found | BrainboxPress" },
          { name: "robots", content: "noindex" },
        ],
      };
    }

    const url = `${PUBLIC_ORIGIN}/resources/${article.slug}`;

    return pageHead({
      title: article.seo.title,
      description: article.seo.description,
      path: `/resources/${article.slug}`,
      type: "article",
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.seo.description,
        datePublished: article.published,
        articleSection: article.category,
        author: {
          "@type": "Organization",
          name: "BrainboxPress",
        },
        publisher: {
          "@type": "Organization",
          name: "BrainboxPress",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
      },
    });
  },
  component: ResourceArticlePage,
});

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const SERVICE_LABELS: Record<string, string> = {
  "amazon-kdp-optimization": "Amazon KDP Optimization",
  "book-cover-design": "Book Cover Design",
  "book-formatting": "Book Formatting",
  "book-launch-campaigns": "Book Launch Campaigns",
  "author-branding": "Author Branding",
  "tiktok-book-promotion": "TikTok Book Promotion",
  "instagram-book-promotion": "Instagram Book Promotion",
  "book-trailers": "Book Trailers",
  "author-social-media-management": "Author Social Media Management",
  "email-marketing-for-authors": "Email Marketing for Authors",
  "author-website-design": "Author Website Design",
  "goodreads-listopia-placement": "Goodreads Listopia Placement",
};

function formatPublishedDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCopyState("idle");
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [url]);

  async function copyLink() {
    if (timer.current) clearTimeout(timer.current);

    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(url);
      setCopyState("copied");
      timer.current = setTimeout(() => setCopyState("idle"), 3000);
    } catch {
      setCopyState("error");
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const links = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  return (
    <section aria-labelledby="share-heading" className="mt-12 border-t border-border pt-8">
      <h2 id="share-heading" className="text-2xl text-navy">
        Share this guide
      </h2>

      <div className="mt-4 flex flex-wrap gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share “${title}” on ${link.label} (opens in a new tab)`}
            className={`inline-flex min-h-11 items-center rounded-sm border border-border bg-card px-4 py-2 text-sm font-medium text-navy hover:border-gold ${focus}`}
          >
            {link.label}
          </a>
        ))}

        <Button
          type="button"
          variant="outlineNavy"
          className="min-h-11"
          aria-label={`Copy link to “${title}”`}
          onClick={copyLink}
        >
          {copyState === "copied" ? (
            <Check aria-hidden="true" />
          ) : (
            <Copy aria-hidden="true" />
          )}
          {copyState === "copied" ? "Copied" : "Copy link"}
        </Button>
      </div>

      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-3 text-sm text-muted-foreground"
      >
        {copyState === "copied"
          ? "Link copied to your clipboard."
          : copyState === "error"
            ? "Unable to copy automatically. Select and copy the article address below."
            : ""}
      </p>

      {copyState === "error" && (
        <div className="mt-2">
          <label
            htmlFor="article-share-url"
            className="block text-sm font-medium text-navy"
          >
            Article address
          </label>
          <input
            id="article-share-url"
            type="text"
            readOnly
            value={url}
            onFocus={(event) => event.currentTarget.select()}
            className={`mt-2 min-h-11 w-full min-w-0 rounded-sm border border-input bg-background px-3 py-2 text-sm text-foreground ${focus}`}
          />
        </div>
      )}
    </section>
  );
}

function ResourceArticlePage() {
  const { slug } = Route.useLoaderData();
  const article = getArticle(slug);

  if (!article) throw notFound();

  const url = `${PUBLIC_ORIGIN}/resources/${article.slug}`;
  const related = relatedArticles(article);

  return (
    <PageShell>
      <div className="paper border-b border-border">
        <header className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 sm:pb-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm leading-relaxed text-muted-foreground">
              <li>
                <Link
                  to="/"
                  className={`rounded-sm text-navy hover:underline ${focus}`}
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  to="/resources/"
                  className={`rounded-sm text-navy hover:underline ${focus}`}
                >
                  Resources
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="min-w-0 break-words" aria-current="page">
                {article.title}
              </li>
            </ol>
          </nav>

          <div className="mt-10 max-w-4xl">
            <p className="eyebrow flex items-center gap-4 text-gold-deep">
              <span className="gold-rule" aria-hidden="true" />
              Author Resources
            </p>

            <h1 className="mt-6 break-words text-4xl leading-[1.08] text-navy sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>

            <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-muted-foreground">
              {article.excerpt}
            </p>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="font-medium text-gold-deep">
                {article.category}
              </span>
              <span>{article.readingMinutes} min read</span>
              <time dateTime={article.published}>
                {formatPublishedDate(article.published)}
              </time>
              <span>By BrainboxPress</span>
            </div>
          </div>
        </header>
      </div>

      <div className="bg-card px-5 py-12 sm:px-8 sm:py-16">
        <article
          aria-label={article.title}
          className="mx-auto max-w-[68ch] break-words text-base leading-relaxed sm:text-lg"
        >
          {article.sections.map((section, index) => (
            <section
              key={section.heading}
              aria-labelledby={`article-section-${index}`}
              className={index === 0 ? "" : "mt-10"}
            >
              <h2
                id={`article-section-${index}`}
                className="text-3xl leading-tight text-navy sm:text-4xl"
              >
                {section.heading}
              </h2>

              <div className="mt-5 space-y-5 text-muted-foreground">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="list-disc space-y-3 pl-6 marker:text-gold-deep">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          <ShareLinks url={url} title={article.title} />
        </article>
      </div>

      {article.relatedServiceSlugs &&
        article.relatedServiceSlugs.length > 0 && (
          <section
            aria-labelledby="related-services-heading"
            className="border-y border-border bg-mist py-12"
          >
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <p className="eyebrow text-gold-deep">Practical support</p>
              <h2
                id="related-services-heading"
                className="mt-4 text-3xl text-navy sm:text-4xl"
              >
                Explore related services
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                If you would like help putting these ideas into practice,
                explore the BrainboxPress services related to this guide.
              </p>

              <ul className="mt-7 flex flex-wrap gap-3">
                {article.relatedServiceSlugs.map((serviceSlug) => (
                  <li key={serviceSlug} className="min-w-0 max-w-full">
                    <Link
                      to="/services/$slug"
                      params={{ slug: serviceSlug }}
                      className={`inline-flex min-h-12 max-w-full items-center gap-3 rounded-sm border border-border bg-card px-5 py-3 text-navy hover:border-gold ${focus}`}
                    >
                      <span className="min-w-0 break-words">
                        {SERVICE_LABELS[serviceSlug] ??
                          serviceSlug.replaceAll("-", " ")}
                      </span>
                      <ArrowRight
                        className="size-4 shrink-0 text-gold-deep"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

      {related.length > 0 && (
        <section
          aria-labelledby="related-articles-heading"
          className="bg-card py-12 sm:py-16"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="eyebrow text-gold-deep">Keep exploring</p>
            <h2
              id="related-articles-heading"
              className="mt-4 text-3xl text-navy sm:text-4xl"
            >
              More guides for your next step
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <article
                  key={item.slug}
                  className="min-w-0 border border-border bg-mist p-6"
                >
                  <p className="text-sm font-medium text-gold-deep">
                    {item.category}
                  </p>
                  <h3 className="mt-4 break-words text-2xl leading-tight text-navy">
                    <Link
                      to="/resources/$slug"
                      params={{ slug: item.slug }}
                      className={`rounded-sm hover:underline hover:decoration-gold hover:underline-offset-4 ${focus}`}
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {item.excerpt}
                  </p>
                  <p className="mt-5 text-sm text-muted-foreground">
                    {item.readingMinutes} min read
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        aria-labelledby="resource-cta-heading"
        className="paper px-5 py-12 sm:px-8 sm:py-16"
      >
        <div className="mx-auto max-w-7xl border border-border bg-card p-6 shadow-editorial sm:p-10 lg:p-12">
          <p className="eyebrow text-gold-deep">Your book, thoughtfully presented</p>
          <h2
            id="resource-cta-heading"
            className="mt-5 max-w-3xl text-4xl leading-tight text-navy sm:text-5xl"
          >
            Let’s talk about your next step.
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            Tell BrainboxPress about your book, your priorities, and the support
            you are looking for. We can help you explore a practical way forward.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Button asChild variant="gold" size="xl">
              <Link to="/" hash="contact">
                Discuss Your Book
              </Link>
            </Button>
            <Button asChild variant="outlineNavy" size="xl">
              <Link to="/assessment">Request a Book Assessment</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
