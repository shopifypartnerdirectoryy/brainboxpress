export const RESOURCE_CATEGORIES = [
  "Amazon Publishing",
  "Book Marketing",
  "Author Branding",
  "Book Discoverability",
  "Reader Engagement",
  "Publishing Tips",
  "Author Growth",
  "Book Launch Strategies",
] as const;

export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number];

export interface Article {
  slug: string;
  title: string;
  category: ResourceCategory;
  excerpt: string;
  readingMinutes: number;
  published: string /* ISO date 2026-11-16 */;
  seo: {
    title: string;
    description: string;
  };
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  relatedServiceSlugs?: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: "write-a-compelling-book-description",
    title: "Write a Book Description That Helps Readers Choose",
    category: "Book Marketing",
    excerpt:
      "Turn your manuscript into a clear reader-facing invitation, with a focused hook, meaningful stakes, and an honest promise.",
    readingMinutes: 4,
    published: "2026-11-16",
    seo: {
      title: "How to Write a Compelling Book Description | BrainboxPress",
      description:
        "Write a focused book description with a clear hook, meaningful stakes, and an honest reader promise. Practical guidance for fiction and nonfiction authors.",
    },
    relatedServiceSlugs: ["amazon-kdp-optimization", "author-branding"],
    sections: [
      {
        heading: "Begin with the reader’s decision",
        paragraphs: [
          "A book description is not a miniature manuscript or a complete plot summary. Its job is to help someone decide whether this particular reading experience suits them. Before drafting, name the reader you hope to welcome and the experience your book actually delivers. A quiet family novel, a practical gardening handbook, and a fast-moving mystery need different introductions. Write that promise in plain language for yourself before polishing anything for publication.",
          "Keep your cover, title, and description in the same conversation. If the cover suggests an intimate historical story, a description dominated by breathless action language may create confusion. Consistency does not mean repeating identical phrases everywhere. It means giving readers compatible signals about subject, tone, audience, and scope.",
        ],
      },
      {
        heading: "Find the central tension or useful outcome",
        paragraphs: [
          "For fiction, start with a character, a disruption, and something that matters. What changes in the character’s life, what do they want, and what makes pursuing it difficult? Choose the conflict that best represents the book rather than listing every subplot. You can suggest consequences without revealing the resolution. Specific pressures usually communicate more than a string of adjectives describing the story as unforgettable or extraordinary.",
          "For nonfiction, identify the problem the book addresses and the boundaries of its help. Explain who it is for, what it covers, and what kind of approach it offers. Distinguish practical exercises from memoir, introductory guidance from advanced discussion, and personal experience from professional advice. Avoid promising a transformation the book cannot responsibly deliver.",
        ],
      },
      {
        heading: "Build a description readers can scan",
        paragraphs: [
          "Give the opening sentence a clear purpose. It might introduce an unusual situation, identify a familiar frustration, or establish the book’s central question. Follow it with enough context to make the premise understandable. Short paragraphs can separate the setup, the complication, and the invitation to read. For nonfiction, a brief list of concrete topics may be useful when the retailer permits that formatting.",
          "Treat every sentence as space you must earn. Remove backstory that is only meaningful after reading the book. Replace vague praise with relevant detail. If a sentence could describe almost any book in the same genre, ask what makes it necessary here. Keep unfamiliar names and invented terminology to the minimum needed for understanding.",
        ],
      },
      {
        heading: "Edit for accuracy before adding polish",
        paragraphs: [
          "Read the description alongside the finished manuscript, not just your original outline. Characters, emphasis, and chapter content may have changed during revision. Check that the opening promise still matches the actual reading experience. Ask a trusted reader to explain what they expect from the description alone, then compare that expectation with the book. A mismatch is useful feedback, not a reason to make the wording more elaborate.",
          "Be careful with endorsements, comparisons, and credentials. Use only endorsements you have permission to reproduce, and preserve their meaning. Do not imply awards, bestseller status, or professional authority you cannot substantiate. Check each retailer’s current description and formatting guidelines before uploading, including any restrictions on links, promotional wording, or other metadata.",
        ],
      },
      {
        heading: "Make a sustainable revision routine",
        paragraphs: [
          "Save a dated master description and a shorter version for places with less space. Record where each version appears so later corrections do not leave conflicting promises across your website and retailer pages. Review the description when the book changes or when readers repeatedly misunderstand its subject or genre. Revision should solve a specific communication problem rather than chase every passing marketing suggestion.",
          "Finish by reading the description aloud. Listen for crowded sentences, repeated ideas, and language that does not sound like your book. Then check the page preview on a small screen. The goal is not to explain everything. It is to give the right reader enough honest, inviting information to take the next step.",
        ],
      },
    ],
  },
  {
    slug: "choose-amazon-keywords-and-categories",
    title: "Choose Amazon Keywords and Categories Thoughtfully",
    category: "Amazon Publishing",
    excerpt:
      "Build accurate metadata from your book’s subject, audience, and reading experience—without keyword stuffing or misleading category choices.",
    readingMinutes: 4,
    published: "2026-11-15",
    seo: {
      title: "Choosing Amazon Book Keywords and Categories | BrainboxPress",
      description:
        "Develop accurate Amazon book keywords and category choices using your book’s subject, reader expectations, and the retailer’s current publishing guidance.",
    },
    relatedServiceSlugs: ["amazon-kdp-optimization"],
    sections: [
      {
        heading: "Describe the book before opening the dashboard",
        paragraphs: [
          "Metadata decisions become easier when you can describe the book precisely. Make a working inventory of its main subject, intended audience, setting, tone, and format. For fiction, include the central genre and any substantial subgenre elements. For nonfiction, include the reader’s level of familiarity and the actual problems covered. Separate the book’s defining features from details that appear only briefly.",
          "This inventory is a planning tool, not text to paste into every available field. Its purpose is to keep your choices grounded in the manuscript. A passing reference to a popular subject does not make that subject an accurate category. Likewise, an appealing audience label is not useful if the book was not written for those readers.",
        ],
      },
      {
        heading: "Use natural, relevant keyword language",
        paragraphs: [
          "Think about the words a reader might use when looking for a book like yours without already knowing its title. Everyday descriptions of a setting, theme, practical task, or reading preference can provide useful starting points. Write possible phrases, then remove those that are vague, redundant, or disconnected from the book. Prefer language you can explain clearly over a pile of loosely related terms.",
          "Do not insert other authors’ names, competing titles, unsupported promotional claims, or unrelated trending phrases to attract attention. Check Amazon’s current KDP keyword guidance before submitting, including prohibited terms and advice on repetition. The interface and rules may change. No keyword choice can guarantee visibility, and metadata should never promise a reading experience the book does not provide.",
        ],
      },
      {
        heading: "Choose categories as reader expectations",
        paragraphs: [
          "Treat a category as a shelf with an implied promise. Browse the relevant options available for your book and marketplace, and read their labels carefully. Ask whether a reader choosing that shelf would reasonably expect your subject, tone, or story structure. A narrower category can be appropriate when it genuinely describes the book, but narrowness is not valuable by itself.",
          "Avoid choosing a category simply because it appears less crowded. An inaccurate placement can confuse readers and weaken the coherence of your book page. If your book crosses genres, identify its primary experience before considering secondary elements. Check the current KDP instructions for available selections and eligibility rather than relying on old screenshots or advice about category requests.",
        ],
      },
      {
        heading: "Check the whole book page for consistency",
        paragraphs: [
          "Keywords and categories do not exist apart from the rest of the listing. Compare your proposed choices with the title, subtitle, cover, description, and sample. A practical beginner’s guide should not look or read like an advanced professional reference. A lighthearted romance should not be described in terms that imply a grim thriller. Consistency helps readers make an informed choice.",
          "Use comparable books as a way to understand vocabulary and presentation, not as templates to copy. Read descriptions and samples where available, and notice meaningful differences from your own work. Another title’s placement is not proof that the same category is suitable or currently available to you. Your manuscript and the retailer’s current requirements remain the deciding references.",
        ],
      },
      {
        heading: "Keep a record and review with a purpose",
        paragraphs: [
          "Save the metadata you submit, the date, and a short explanation of each choice. This makes later maintenance easier, especially when you publish across formats or update an edition. After changes appear, review the public page for errors. Processing times and available options can vary, so use the retailer’s current help materials when something does not look as expected.",
          "Revisit metadata when the book changes, a selected category no longer fits, or reader questions reveal a genuine mismatch. Avoid repeatedly replacing everything without a clear reason; that makes it harder to understand what you changed and why. Thoughtful metadata is an accuracy task first. It supports clear presentation, but it is not a substitute for a well-prepared book.",
        ],
      },
    ],
  },
  {
    slug: "build-a-permission-based-reader-newsletter",
    title: "Build a Reader Newsletter on Permission and Trust",
    category: "Reader Engagement",
    excerpt:
      "Create a welcoming signup, set clear expectations, and send useful author updates only to readers who have chosen to receive them.",
    readingMinutes: 4,
    published: "2026-11-14",
    seo: {
      title: "Build a Permission-Based Author Newsletter | BrainboxPress",
      description:
        "Start an author newsletter with clear consent, a welcoming signup, useful reader updates, and respectful unsubscribe practices—without bought or scraped lists.",
    },
    relatedServiceSlugs: [
      "email-marketing-for-authors",
      "author-website-design",
    ],
    sections: [
      {
        heading: "Define a newsletter you can sustain",
        paragraphs: [
          "A reader newsletter is an ongoing invitation, not permission to send anything indefinitely. Begin by deciding what subscribers will receive and how often you can realistically write. Your newsletter might share publishing updates, thoughtful reading recommendations, or occasional notes about your creative process. Choose a manageable promise that fits your work rather than copying an author whose schedule and audience are very different.",
          "Write that promise beside the signup form in ordinary language. Explain who is sending the messages and what joining means. If publication dates are uncertain, describe the schedule honestly rather than promising a rigid rhythm. A small, well-maintained mailing list is a sounder starting point than a large collection of addresses with no clear relationship to your work.",
        ],
      },
      {
        heading: "Make joining a clear, voluntary choice",
        paragraphs: [
          "Never buy, scrape, rent, or harvest email addresses for your reader newsletter. Do not add people merely because they purchased a book, contacted you, entered an unrelated event, or follow you elsewhere. Give them a separate, understandable opportunity to subscribe. Avoid preselected consent boxes or language that hides the newsletter invitation inside another action.",
          "Use an email service that supports subscription records, unsubscribe handling, and appropriate privacy controls. Consider confirmed opt-in to help verify that the person receiving the confirmation intended to subscribe. Keep a record of the signup wording and source. Check the privacy and email-marketing requirements that apply to your location and your readers, and obtain qualified advice when necessary.",
        ],
      },
      {
        heading: "Design a useful welcome",
        paragraphs: [
          "Your welcome message should connect directly to the signup promise. Identify yourself, remind the reader why they are receiving the email, and explain what comes next. If you offered a sample chapter or other download, make it easy to access and confirm you hold the necessary rights. Do not turn a simple welcome into a confusing series of unrelated sales messages.",
          "Keep the message readable without relying on decorative images. Use descriptive links, clear text, and a reply address you monitor. A brief invitation to share a reading preference can open a conversation, but avoid requesting sensitive or unnecessary personal information. Check the message on a phone and send yourself a test before enabling it for new subscribers.",
        ],
      },
      {
        heading: "Offer a reason to keep reading",
        paragraphs: [
          "Plan each issue around something worth the reader’s attention. That might be a considered note about a book’s setting, a behind-the-scenes decision, or practical information about a release. Sales announcements can belong in the newsletter, but make their purpose clear. Avoid manufacturing urgency or implying that every message contains an exceptional opportunity.",
          "Use subject lines that accurately describe the message. Keep the main point near the beginning and make any next step easy to understand. Before sending, check links, names, dates, and permissions for any contributed material. If you recommend products or include paid relationships, make appropriate disclosures. Consistency in care matters more than filling an arbitrary publishing schedule.",
        ],
      },
      {
        heading: "Respect the decision to leave",
        paragraphs: [
          "Include a clear unsubscribe option in every marketing email and honor requests promptly. Do not require someone to explain their decision, sign into an account, or contact you privately to stop ordinary newsletter messages. Keep suppression records as appropriate so an unsubscribed address is not accidentally reimported later. Removing someone from marketing should be treated as routine list care.",
          "Review your list practices when you change providers, introduce a new signup offer, or alter the newsletter’s purpose. Collect only information you need, protect account access, and publish a privacy notice that reflects your actual practices. A newsletter works best as a respectful relationship with willing readers. Permission is not a hurdle to growth; it is part of the foundation.",
        ],
      },
    ],
  },
  {
    slug: "plan-a-realistic-book-launch-timeline",
    title: "Plan a Book Launch Timeline You Can Actually Manage",
    category: "Book Launch Strategies",
    excerpt:
      "Work backward from publication, protect production time, and organise a launch around clear dependencies rather than a crowded checklist.",
    readingMinutes: 4,
    published: "2026-11-13",
    seo: {
      title: "Plan a Realistic Book Launch Timeline | BrainboxPress",
      description:
        "Build a practical book launch timeline around production, retailer setup, reader communication, and a manageable publication-day plan with room for changes.",
    },
    relatedServiceSlugs: [
      "book-launch-campaigns",
      "book-formatting",
      "book-cover-design",
    ],
    sections: [
      {
        heading: "Choose a date with dependencies in mind",
        paragraphs: [
          "A launch date is useful only when the work needed to support it is understood. List the remaining editorial, design, formatting, proofing, and distribution tasks before announcing publication. Ask collaborators about their availability and revision process. A cover cannot be finalised responsibly without the information its designer needs, and a print proof cannot be checked before the files are prepared.",
          "Separate firm commitments from preferred dates. If a festival appearance, contractual obligation, or seasonal topic creates a genuine deadline, make that visible in the plan. Otherwise, allow room to move the date rather than compressing essential quality checks. A later, better-prepared release is often a more responsible choice than asking every contributor to absorb an avoidable rush.",
        ],
      },
      {
        heading: "Protect the production stage",
        paragraphs: [
          "Work backward from publication to identify when the final manuscript, cover, and interior files must be ready. Include time to review edits and approve proofs, not just time for suppliers to complete their tasks. Keep a single approved version of each file and label it clearly. Conflicting drafts create preventable problems when several people are working together.",
          "For print, allow space to inspect a physical proof where available. For digital editions, check navigation, chapter breaks, links, and readability on suitable preview tools or devices. Confirm you have permission for quoted, illustrated, or licensed material. A launch calendar should make these checks visible rather than treating them as spare-time work after promotion has begun.",
        ],
      },
      {
        heading: "Prepare the book’s public information",
        paragraphs: [
          "Create a shared launch folder with the approved description, author biography, cover, publication details, and relevant links. Keep contact information and image permissions easy to find. If someone is helping you with publicity, explain which claims and excerpts are approved for use. This prevents well-intentioned collaborators from inventing promises or circulating outdated material.",
          "Check each retailer’s current requirements for uploads, preorders, publication dates, metadata, and processing. Do not assume every format or territory follows the same process. Leave room to correct a listing and verify links before sending readers to it. If using a preorder, understand its current deadlines and obligations before announcing it or building the rest of the campaign around it.",
        ],
      },
      {
        heading: "Invite participation without creating pressure",
        paragraphs: [
          "Plan communication for people who have a genuine connection to the book: willing newsletter subscribers, relevant event organisers, and contacts who have agreed to hear from you. Give collaborators clear information and a reasonable opportunity to decline. Avoid sending the same generic message everywhere. A thoughtful invitation explains why the book may be relevant to that particular reader or organisation.",
          "If distributing advance copies, make any review request optional and never condition a benefit on a positive response. Check each retailer’s current review guidelines and any applicable disclosure requirements. Do not script praise or ask people to disguise a relationship. Readers and reviewers need room to form their own opinions, including the choice not to publish a review.",
        ],
      },
      {
        heading: "Plan publication day and the quieter period after",
        paragraphs: [
          "Write a modest publication-day checklist: confirm the pages are available, test the main links, send the planned announcement, and respond to practical questions. Assign responsibilities if other people are involved. Have a simple fallback message ready for a delayed listing or event change. You do not need to fill every hour with a new promotional task.",
          "Leave capacity for the period after release. Correct errors, thank contributors, and note which activities were manageable and relevant to your readers. Record costs and lessons without treating a single launch as a verdict on your writing career. A useful launch plan creates a clear introduction to the book and a workable foundation for continued communication, not a guarantee of sales.",
        ],
      },
    ],
  },
  {
    slug: "build-an-effective-author-website",
    title: "What Makes an Author Website Genuinely Useful?",
    category: "Author Branding",
    excerpt:
      "Give readers a clear home for your books, biography, news, and contact details—with accessible design and straightforward next steps.",
    readingMinutes: 4,
    published: "2026-11-12",
    seo: {
      title: "What Makes an Effective Author Website? | BrainboxPress",
      description:
        "Plan an author website with clear book pages, an authentic biography, accessible navigation, reader-friendly contact options, and manageable maintenance.",
    },
    relatedServiceSlugs: ["author-website-design", "author-branding"],
    sections: [
      {
        heading: "Give the site a clear job",
        paragraphs: [
          "An author website should answer basic questions without making visitors work for them. Who are you, what do you write, and where can someone learn about your books? Start with those needs before choosing animations, layouts, or decorative features. A reader arriving from a book’s back matter may want a reading order, while an event organiser may need a biography and contact details.",
          "Choose a primary next step for the homepage, such as exploring your books or joining an optional newsletter. Other actions can remain available without receiving equal visual emphasis. Describe your work in language a new visitor can understand. A personal aesthetic can make the site distinctive, but it should not obscure the information people came to find.",
        ],
      },
      {
        heading: "Make each book easy to understand",
        paragraphs: [
          "Give each book a useful page with its title, cover, description, formats, and clear links to available editions. For a series, explain the reading order and identify where a new reader can begin. Label retailer links accurately so visitors understand where they are going. If availability differs by territory or format, avoid presenting a single option as universally available.",
          "Keep factual details consistent with the current edition and retailer listings. Check publication dates, subtitles, contributor credits, and download permissions. If you provide an excerpt, ensure it is approved and accessible as text where practical. Readers should not need to decipher an image of a page or download an unexplained file just to learn what the book is about.",
        ],
      },
      {
        heading: "Present the person behind the work",
        paragraphs: [
          "Write a biography that serves the audience rather than trying to include every life event. Relevant experience, creative interests, and a brief sense of place can help readers understand your work. Distinguish personal experience from professional qualifications, and avoid claims you cannot support. A concise biography is often useful for event organisers who need approved copy.",
          "Provide a clear contact route and explain what it is for. You might separate general enquiries from rights or event requests if that reflects how you actually work. Do not publish private details simply to appear approachable. If offering press materials or portraits, state how they may be used and make sure you have permission from the photographer or other rights holder.",
        ],
      },
      {
        heading: "Design for real browsing conditions",
        paragraphs: [
          "Review the site on a small phone screen, with a keyboard, and with enlarged text. Navigation labels should be understandable, links should describe their destination, and buttons should remain easy to use without precise pointer movements. Maintain readable contrast and avoid placing essential information only in colour, animation, or an image. Give meaningful images appropriate alternative text.",
          "Keep forms short and label fields clearly. Explain errors in words and preserve information when a correction is needed. Avoid autoplaying audio and intrusive overlays that block the page. A decorative feature is not essential if it prevents someone from reading the book description or reaching the contact form. Accessibility belongs in the design process rather than as a final cosmetic check.",
        ],
      },
      {
        heading: "Build something you can maintain",
        paragraphs: [
          "A useful website needs care after publication. Decide who will update book links, renew the domain, maintain software, and respond to enquiries. Keep account ownership and recovery details organised. Use appropriate security measures and backups for your platform. Before commissioning a site, ask how routine updates work and what ongoing responsibilities or costs remain with you.",
          "Choose features you can keep accurate. An abandoned events calendar or outdated release announcement can confuse visitors more than a simpler page would. Review forms, links, and key book information periodically, and update privacy information when your data practices change. The strongest author website is not necessarily the most elaborate. It is a dependable, welcoming place that reflects your work honestly.",
        ],
      },
    ],
  },
  {
    slug: "prepare-a-book-trailer-or-short-video",
    title: "Prepare Your Book for a Trailer or Short-Form Video",
    category: "Book Discoverability",
    excerpt:
      "Create a useful video brief, gather licensed assets, and translate your book’s atmosphere into a clear, accessible short presentation.",
    readingMinutes: 4,
    published: "2026-11-11",
    seo: {
      title: "Prepare for a Book Trailer or Short Video | BrainboxPress",
      description:
        "Prepare a book video brief with a clear purpose, accurate story cues, licensed assets, readable captions, and a practical review and delivery checklist.",
    },
    relatedServiceSlugs: [
      "book-trailers",
      "tiktok-book-promotion",
      "instagram-book-promotion",
    ],
    sections: [
      {
        heading: "Decide what the video needs to do",
        paragraphs: [
          "A short book video cannot carry every character, argument, and turning point. Give it a focused purpose before discussing music or visual effects. You may want to introduce the book’s atmosphere, communicate its central premise, or announce that a new edition is available. Choose a viewer who has not read the book and decide what they should understand by the end.",
          "Match the scope to the intended placement. A video on your website may sit beside a detailed description, while a standalone social post needs enough context to make sense on its own. Identify the final destination for interested viewers. A clear book page is more useful than an instruction that sends people searching through unrelated profiles or outdated links.",
        ],
      },
      {
        heading: "Translate the book rather than summarising it",
        paragraphs: [
          "Select the themes, stakes, and sensory details that genuinely represent the reading experience. For fiction, suggest the central tension without explaining the entire plot. For nonfiction, show the subject and intended reader without implying that a short video can demonstrate every benefit. Keep the emotional register consistent with the book, even when a different style seems fashionable.",
          "Be cautious about visualising characters or settings too literally. Stock footage can introduce details that contradict the text or create unintended expectations. An atmospheric approach using typography, restrained imagery, and the cover may be more appropriate. Share any important boundaries with the creator, including spoilers to avoid and cultural or historical details that require careful handling.",
        ],
      },
      {
        heading: "Gather assets and confirm usage rights",
        paragraphs: [
          "Prepare a clean cover file, the correct title and author spelling, approved descriptive copy, and any relevant brand materials. Supply the publication status and destination link. If the designer needs to animate or crop the cover, confirm that your agreement permits it. Do not assume that owning a finished cover gives unrestricted rights to every underlying illustration or font.",
          "Use music, footage, photographs, and voices only with appropriate permissions for the intended use. A track available in one platform’s library may not be licensed for every other channel or for advertising. Ask who obtains and retains licence records, and clarify any restrictions before production. If generated media is proposed, discuss its suitability, provenance concerns, and applicable platform requirements.",
        ],
      },
      {
        heading: "Make the message understandable without sound",
        paragraphs: [
          "Write a short script or sequence of on-screen messages before editing begins. Each screen should have a clear purpose and enough time to be read comfortably. Keep the book title and author identifiable, and avoid placing essential text where platform controls may cover it. Consider the dimensions and safe areas of each intended destination rather than relying on a single crop.",
          "Provide accurate captions for speech and review them manually, especially for names and invented terms. Ensure text contrasts with its background and does not depend on rapid flashes or constant movement. Watch the draft with sound off, then listen without looking. These checks can reveal missing context, unreadable information, or a voiceover that carries too much of the explanation.",
        ],
      },
      {
        heading: "Agree on review and delivery before publishing",
        paragraphs: [
          "Clarify who approves the concept, script, draft, and final export. Gather feedback in one place and distinguish factual corrections from personal preferences. Check names, dates, spelling, cover details, captions, audio rights, and the closing instruction. Ask for the file formats and versions you actually need, and confirm whether editable project files are included in the agreement.",
          "Before posting, check each platform’s current rules for music, advertising disclosures, content, and links. Preview the upload on a phone to catch cropping or caption problems. Keep the final approved files and licence records organised for later use. A thoughtful video can introduce a book clearly and professionally, but no trailer or short-form format can promise views, readership, or sales.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

export function relatedArticles(article: Article, n = 3): Article[] {
  const others = ARTICLES.filter((candidate) => candidate.slug !== article.slug);
  const limit = Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 3;

  return [
    ...others.filter((candidate) => candidate.category === article.category),
    ...others.filter((candidate) => candidate.category !== article.category),
  ].slice(0, limit);
}
