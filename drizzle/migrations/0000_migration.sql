CREATE TABLE public.author_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  client_request_id uuid NOT NULL UNIQUE,
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  book_title text NOT NULL CHECK (char_length(book_title) BETWEEN 1 AND 200),
  author_name text NOT NULL CHECK (char_length(author_name) BETWEEN 1 AND 120),
  service text NOT NULL CHECK (char_length(service) BETWEEN 1 AND 80),
  package text CHECK (package IS NULL OR char_length(package) <= 80),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 3000)
);

GRANT ALL ON public.author_enquiries TO service_role;

ALTER TABLE public.author_enquiries ENABLE ROW LEVEL SECURITY;

-- No policies for anon/authenticated: visitors can never read, update or delete enquiries.
-- Submissions are inserted by validated server code only.