import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";

import { PageIntro, PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import {
  ARTICLES,
  RESOURCE_CATEGORIES,
  type Article,
  type ResourceCategory,
} from "@/lib/resources";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/resources/")({
  head: () =>
    pageHead({
      title:
        "Author Resources — Book Marketing & Publishing Guides | BrainboxPress",
      description:
        "Explore practical guides to book marketing, publishing, author websites, reader newsletters, and launch planning, written for thoughtful independent authors.",
      path: "/resources",
    }),
  component: ResourcesPage,
});

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  return (
    <article
      className={`flex min-w-0 flex-col border border-border bg-card ${
        featured ? "p-6 shadow-editorial sm:p-10" : "p-6 sm:p-8"
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <p className="font-medium text-gold-deep">{article.category}</p>
        <span className="text-muted-foreground">
          {article.readingMinutes} min read
        </span>
      </div>

      {featured && (
        <p className="eyebrow mt-6 text-muted-foreground">Featured guide</p>
      )}

      <h2
        className={`mt-4 break-words leading-tight text-navy ${
          featured ? "max-w-3xl text-4xl sm:text-5xl" : "text-3xl"
        }`}
      >
        <Link
          to="/resources/$slug"
          params={{ slug: article.slug }}
          className={`rounded-sm hover:underline hover:decoration-gold hover:underline-offset-4 ${focus}`}
        >
          {article.title}
        </Link>
      </h2>

      <p className="mt-5 max-w-3xl flex-1 leading-relaxed text-muted-foreground">
        {article.excerpt}
      </p>

      <Link
        to="/resources/$slug"
        params={{ slug: article.slug }}
        aria-label={`Read guide: ${article.title}`}
        className={`mt-7 inline-flex w-fit items-center gap-2 rounded-sm font-medium text-navy hover:underline ${focus}`}
      >
        Read guide
        <ArrowRight className="size-4 shrink-0 text-gold-deep" aria-hidden="true" />
      </Link>
    </article>
  );
}

function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ResourceCategory | "All">("All");

  const search = query.trim().toLocaleLowerCase();
  const results = ARTICLES.filter((article) => {
    const matchesCategory =
      category === "All" || article.category === category;
    const matchesSearch = [
      article.title,
      article.excerpt,
      article.category,
    ]
      .join(" ")
      .toLocaleLowerCase()
      .includes(search);

    return matchesCategory && matchesSearch;
  });

  const [featured, ...remaining] = results;

  function resetFilters() {
    setQuery("");
    setCategory("All");
  }

  return (
    <PageShell>
      <PageIntro
        eyebrow="Author Resources"
        title={
          <>
            Practical guidance for your{" "}
            <em className="text-gold-deep">publishing journey.</em>
          </>
        }
        intro="Explore clear, thoughtful guides from BrainboxPress on presenting your book, reaching readers, and building an author presence at a sustainable pace."
      />

      <section
        aria-label="Browse author resources"
        className="bg-mist py-12 sm:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="border border-border bg-card p-5 sm:p-8">
            <label
              htmlFor="resource-search"
              className="block font-medium text-navy"
            >
              Search author resources
            </label>

            <div className="relative mt-3 max-w-xl">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="resource-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try newsletters, keywords, or websites"
                className={`min-h-12 w-full min-w-0 rounded-sm border border-input bg-background py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground ${focus}`}
              />
            </div>

            <fieldset className="mt-7 min-w-0">
              <legend className="mb-3 font-medium text-navy">
                Filter by category
              </legend>

              <div className="flex flex-wrap gap-2">
                {(["All", ...RESOURCE_CATEGORIES] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={category === item}
                    onClick={() => setCategory(item)}
                    className={`min-h-11 max-w-full rounded-sm border px-4 py-2 text-left text-sm transition-colors ${focus} ${
                      category === item
                        ? "border-navy bg-navy text-navy-foreground"
                        : "border-border bg-card text-navy hover:border-gold"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <p
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="my-6 text-sm text-muted-foreground"
          >
            {results.length} {results.length === 1 ? "guide" : "guides"} found
          </p>

          {featured ? (
            <div className="space-y-6">
              <ArticleCard article={featured} featured />

              {remaining.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {remaining.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="border border-border bg-card px-5 py-12 text-center sm:px-10">
              <h2 className="text-3xl text-navy">No matching guides yet</h2>
              <p className="mx-auto mt-4 max-w-lg leading-relaxed text-muted-foreground">
                Try a broader search or another category. You can also clear
                your filters to explore all our author resources.
              </p>
              <Button
                type="button"
                variant="outlineNavy"
                size="xl"
                onClick={resetFilters}
                className="mt-7"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
