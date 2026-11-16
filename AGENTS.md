<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- Services, packages and prices live only in `src/lib/services.ts`; components, the enquiry form, JSON-LD and tests read from it so prices never drift. `src/test/services.test.ts` locks the values.
- Official contact details and social URLs live in `src/lib/site.ts`; never hardcode them elsewhere.
- The homepage (`src/routes/index.tsx`) is one scrolling page composed from `src/components/site/*` (nav links scroll to sections); each service also has its own SEO page at `src/routes/services.$slug.tsx`, driven by the service's `slug` and `seo` fields.
- Service buttons preselect the enquiry form through `EnquiryProvider` (`src/components/site/enquiry-context.tsx`): on the homepage it scrolls to the form; on service pages it navigates to `/?service=&package=`, which the homepage applies on load. There is only one enquiry form.
- Enquiries go through the `submitEnquiry` server function: saved to the locked `author_enquiries` table as a backup (no public policies; `client_request_id` unique to absorb duplicates), then forwarded server-side to Static Forms with `STATIC_FORMS_API_KEY` (payload built in `src/lib/static-forms.ts`). The visitor sees an error only if both fail.
- Canonical/og:url and the sitemap use `PUBLIC_ORIGIN` in `src/lib/seo.ts`; `public/sitemap.xml` must list every service page (a test enforces it).
- Portfolio entries live in `src/lib/portfolio.ts` with a `kind` label so demonstration visuals are never shown as client work; add real projects with `kind: "client"`.
