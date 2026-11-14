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
- The site is one scrolling page (`src/routes/index.tsx`) composed from `src/components/site/*`, because the brief asks for nav links that smooth-scroll to sections.
- Service buttons preselect the enquiry form through `EnquiryProvider` (`src/components/site/enquiry-context.tsx`), so the selection survives scrolling to the contact section.
- Enquiries are submitted via the `submitEnquiry` server function into the locked `author_enquiries` table (no public policies; inserted server-side after zod validation, honeypot and min-fill-time checks; `client_request_id` is unique to absorb duplicate submits).
- Portfolio entries live in `src/lib/portfolio.ts` with a `kind` label so demonstration visuals are never shown as client work; add real projects with `kind: "client"`.
