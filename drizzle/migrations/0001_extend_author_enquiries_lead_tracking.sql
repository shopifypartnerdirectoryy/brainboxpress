ALTER TABLE public.author_enquiries
  ADD COLUMN enquiry_type text NOT NULL DEFAULT 'enquiry',
  ADD COLUMN status text NOT NULL DEFAULT 'new',
  ADD COLUMN publishing_stage text,
  ADD COLUMN budget text,
  ADD COLUMN preferred_contact text,
  ADD COLUMN phone text,
  ADD COLUMN book_link text,
  ADD COLUMN genre text,
  ADD COLUMN follow_up_notes text,
  ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now();

ALTER TABLE public.author_enquiries ALTER COLUMN author_name DROP NOT NULL;

ALTER TABLE public.author_enquiries
  ADD CONSTRAINT author_enquiries_type_check CHECK (enquiry_type IN ('enquiry', 'assessment')),
  ADD CONSTRAINT author_enquiries_status_check CHECK (status IN (
    'new', 'assessment_requested', 'assessment_completed', 'recommendation_sent', 'quotation_requested',
    'awaiting_client', 'project_approved', 'in_progress', 'completed', 'follow_up_required'
  ));

CREATE INDEX IF NOT EXISTS author_enquiries_status_idx ON public.author_enquiries (status, created_at DESC);

CREATE OR REPLACE FUNCTION public.touch_author_enquiries_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER author_enquiries_touch_updated_at
BEFORE UPDATE ON public.author_enquiries
FOR EACH ROW EXECUTE FUNCTION public.touch_author_enquiries_updated_at();