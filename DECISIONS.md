# Technical Decisions

A running log of the technical decisions made while building the Sherry's Food
Tour landing page. Each entry captures the context, the decision, the reasoning,
and the outcome so future work (and future contributors) can understand *why*
the project looks the way it does.

> Note: dates reflect when these decisions were documented (2026-06-10). The
> underlying work was carried out over the preceding days.

---

## Decision: Project setup — Next.js 16 App Router + Tailwind v4 + TypeScript

**Date:** 2026-06-10
**Context:** We needed a foundation for a marketing/landing site that renders a
Figma design faithfully, loads fast, and is easy to iterate on. The repo began
as a stock `create-next-app` (App Router, JavaScript).
**Decision:** Build on **Next.js 16.2.6** with the **App Router** (`app/`),
**React 19**, **Tailwind CSS v4** (via `@tailwindcss/postcss`, configured
through the CSS-first `@theme` block in `app/globals.css`), and **TypeScript**
for component code. Entry files (`app/layout.js`, `app/page.js`) stayed as JS
from the scaffold; new components are authored in `.tsx`.
**Reason:** App Router gives us Server Components by default and first-class
`next/font` + `next/image` support, which matter for a media-heavy landing page.
Tailwind v4's `@theme` block lets us declare the Figma design tokens (brand
colors, font families) in one place. TypeScript on the components catches prop
and markup mistakes early without forcing a full JS→TS migration of the
scaffold.
**Result:** A working App Router site. `app/page.js` composes nine section
components; design tokens live in `app/globals.css`; Google fonts (Open Sans,
Instrument Sans, Work Sans) plus a local font (Gveret Levin) are wired in
`app/layout.js`. AGENTS.md flags that this Next.js version has breaking changes,
so we consult `node_modules/next/dist/docs/` before using unfamiliar APIs.

---

## Decision: Use the Figma MCP server instead of manual screenshots

**Date:** 2026-06-10
**Context:** The design exists in Figma. We had to get from that design to code,
and the two realistic options were (a) eyeball screenshots and recreate layout
and styling by hand, or (b) connect to the design programmatically via the
Figma MCP server.
**Decision:** Use the **Figma MCP server** as the source of truth for layout,
spacing, colors, typography, and assets — not manual screenshots.
**Reason:** Screenshots only give an approximate visual; every measurement,
color, and font has to be guessed and re-checked by eye, which is slow and
error-prone. The MCP server exposes the *actual* design data — exact hex values,
spacing, font families, and exportable assets — so the build matches the design
instead of approximating it.
**Result:** Brand colors were lifted directly from the design (see the
`/* Brand colors (from Figma) */` block in `app/globals.css`:
`--color-gold: #ffd700`, `--color-cream`, `--color-sage`, `--color-ink`, etc.),
and the typography stack maps Figma's fonts to CSS variables. Components use the
real values (e.g. the Hero CTA's `#FFD700` gold) rather than approximations.

---

## Decision: Add a proper `tsconfig.json` (replacing `jsconfig.json`)

**Date:** 2026-06-10
**Context:** The scaffold shipped with a `jsconfig.json` because it was a
JavaScript project. Once we started writing components in `.tsx`, the editor and
Next.js needed real TypeScript configuration — type checking, JSX handling, and
the `@/*` path alias were not being honored.
**Decision:** Remove `jsconfig.json` and add a **`tsconfig.json`** configured for
Next.js 16: `strict: true`, `jsx: "react-jsx"`, `moduleResolution: "bundler"`,
`allowJs: true`, the `next` TS plugin, and a `@/*` → `./*` path alias. Add the
TypeScript toolchain to `devDependencies` (`typescript`, `@types/node`,
`@types/react`, `@types/react-dom`).
**Reason:** `jsconfig.json` and `tsconfig.json` are mutually exclusive — Next.js
uses the TS config when TypeScript is present and ignores the JS one. Keeping
both (or only the JS one) meant type checking and the path alias silently didn't
work. `allowJs: true` is the key setting: it lets the leftover `.js` entry files
(`layout.js`, `page.js`) coexist with `.tsx` components without forcing a full
conversion.
**Reason it counts as a "fix":** the mismatch between `jsconfig.json` and `.tsx`
files was producing editor/build type errors; switching to `tsconfig.json` with
`allowJs` resolved them.
**Result:** TypeScript now type-checks the `.tsx` components, the `@/*` alias
resolves, and the JS scaffold files still compile. `jsconfig.json` is deleted in
git status; `tsconfig.json` is the new untracked file.

---

## Decision: Download images via Figma MCP into `public/images/`

**Date:** 2026-06-10
**Context:** The design includes photography (hero, tour locations, "the deets"
gallery), brand marks (logo, founder photo), and a set of UI/feature icons. We
needed these as real files the app can serve, and the choice was again MCP
export vs. manually saving images out of Figma.
**Decision:** **Export/download assets through the Figma MCP server** straight
into `public/images/`, keeping Figma's intended formats — `.png`/`.jpg` for
photography, `.svg` for icons and simple vector graphics.
**Reason:** MCP export pulls the assets at the right resolution and format
directly from the design, avoiding the quality loss, wrong crops, and naming
drift that come from manually screenshotting or re-saving by hand. Serving them
from `public/` lets `next/image` optimize the raster photos at request time.
**Result:** `public/images/` holds the photography (`hero.png`, `dadaocheng.png`,
`ningxia.png`, `ximen.png`, `deets_1..3.jpg`), brand assets (`logo.png`,
`sherry.png`), and vector icons (`icon-phone.svg`, `icon-whatsapp.svg`,
`icon-instagram.svg`, `icon-menu.svg`, `icon-play.svg`,
`icon-check-circle.svg`, plus the `why-*` feature assets). Components reference
them through `next/image` (e.g. `<Image src="/images/hero.png" fill priority />`
in `Hero.tsx`).

> Housekeeping: macOS AppleDouble sidecar files (`._*`) accompany these assets on
> this volume and should be excluded from git (e.g. via `.gitignore`) rather than
> committed.

---

## Decision: One component per design section under `app/components/`

**Date:** 2026-06-10
**Context:** The landing page is a single long scroll made of distinct visual
sections. We needed a structure that maps cleanly to the design and keeps each
section independently editable.
**Decision:** Split the page into **one `.tsx` component per Figma section**,
all living in `app/components/`, and compose them top-to-bottom in
`app/page.js`. Components are **React Server Components** by default (no
unnecessary `"use client"`). Section-local data (e.g. the Hero's stats array) is
declared as a plain const inside its component.
**Reason:** A component-per-section structure keeps each part of the page small,
self-contained, and easy to locate against the design. Server Components keep the
client bundle minimal for what is largely static marketing content. `page.js`
reads as a table of contents for the whole page.
**Result:** Nine components — `Navbar`, `Hero`, `WhyUs`, `HotTours`, `TheDeets`,
`MeetFoodie`, `Testimonials`, `BookingForm`, `Footer` — composed in `page.js`
inside a `Navbar / <main> / Footer` shell. `layout.js` provides the font
variables and a `min-h-full flex flex-col` body so the footer sits correctly.

---

## Decision: Mobile-first responsive layout with Tailwind breakpoints

**Date:** 2026-06-10
**Context:** The site has to look right from small phones up to large desktops,
and the Figma design specifies a wide (1440px) desktop canvas. We needed a
consistent responsive strategy across every section.
**Decision:** Author styles **mobile-first** using Tailwind's default breakpoint
prefixes (`sm`, `md`, `lg`). Base (unprefixed) classes target the smallest
screens; larger breakpoints layer on bigger spacing, type scale, and layout.
Content is centered in a `max-w-[1440px]` container matching the Figma frame,
with padding that steps up per breakpoint.
**Reason:** Mobile-first is Tailwind's native model — unprefixed = smallest, then
min-width overrides — which keeps the responsive intent readable and avoids
desktop-down overrides. Capping at `1440px` honors the design's canvas while
letting the layout scale down fluidly.
**Result:** Every section scales across breakpoints. The Hero is representative:
padding (`px-6 pt-28` → `sm:px-10` → `md:px-16` → `lg:px-20 lg:min-h-[1030px]`),
heading type (`text-3xl` → `sm:text-5xl` → `md:text-6xl` → `lg:text-[72px]`), and
the CTA button (`h-12 w-56` → `sm:h-14 w-64` → `md:h-[70px] w-[300px]`) all step
up with the same mobile-first pattern.

---

## Decision: Backend email sending via Resend + form validation via Zod

**Date:** 2026-08-26
**Context:** Both booking forms (`BookingForm` on the homepage and the detailed
booking page at `/booking/`) were client-side only, redirecting to a confirmation
page on submit without actually processing or validating the data. User enquiries
and bookings were not being captured or communicated to the business.
**Decision:** Implement **backend form handling** with two new API routes:
- `POST /api/contact` — handles the homepage enquiry form (Name, Phone, Email,
  No. of People, Dates, Message)
- `POST /api/booking` — handles the tour booking form (Tour, Adults, Children,
  Date, Time)

Use **Zod** for server-side schema validation and **Resend** for transactional
email delivery. Both routes send:
1. A notification email to `sherrychang813@gmail.com` (admin)
2. A confirmation email to the user

**Reason:** Zod provides type-safe runtime validation with precise error messages;
it catches bad data before email send, keeping the email pipeline clean. Resend is
a modern email delivery service with a simple API and good deliverability — better
than trying to self-host SMTP or integrate with a legacy email system. Sending two
emails (admin + user confirmation) closes the loop: the business knows a booking
came in, and the customer has proof we received it.
**Constraints:** If Resend is down or misconfigured, the form submission will fail
loudly (the user sees an error). This is intentional — we do not attempt to store
unconfirmed bookings in a queue or database fallback, keeping the architecture
simple. If email delivery is critical, a future decision can add a database layer
(e.g. Supabase or Google Sheets) to persist bookings even if email fails.
**Result:** Created `/lib/validation.ts` with Zod schemas (`contactFormSchema`,
`bookingFormSchema`). Both form components now track state, submit to the API
routes, and show error messages on failure or redirect to `/booking/confirmation`
on success. Email templates are HTML and include all booking details. The `.env.local`
file now requires `RESEND_API_KEY=<key>` to function. Guest info (name, email, phone)
is collected directly on `/booking/page.tsx` before submission to `/api/booking`.

---

## Decision: Replace Dates text input with a dynamic `<select>` dropdown

**Date:** 2026-08-27
**Context:** The `BookingForm` homepage enquiry form had a plain `<input type="text">` for the Dates field, with a placeholder like "Wednesday, 2 April 2025". Users had to type a date manually, which was error-prone and inconsistent — submitted date strings could vary in format, making it harder to read incoming enquiries.
**Decision:** Replace the Dates text input with a `<select>` dropdown that dynamically generates every calendar date for the next 3 months (starting from tomorrow), formatted as `"Weekday, D Month YYYY"` (e.g. `"Wednesday, 2 April 2025"`) using `toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })`. The first option is a disabled placeholder ("Select a date"). The select is styled to match the existing "No. of People" select — same `fieldClass`, `appearance-none`, and chevron-down SVG overlay.
**Reason:** A dropdown eliminates free-text entry errors and guarantees consistent date formatting in the notification emails received by Sherry. No new dependencies are needed — date generation uses vanilla JS `Date` arithmetic. The option value uses the same formatted string as before, so the API route and email templates require no changes.
**Result:** `BookingForm.tsx` now renders a date `<select>` that is populated at render time with ~90 date options covering the next 3 months. Form submission behavior and API contract are unchanged.

---

## Decision: Add optional Message field to /booking/ page

**Date:** 2026-08-27
**Context:** The detailed booking page at `/booking/` collected guest name, email, and phone, but had no free-text field for guests to communicate dietary requirements, group composition, or special requests. This information was available on the homepage `BookingForm` (which already had a required Message field) but was missing from the tour-specific booking flow.
**Decision:** Add an optional **Message** textarea to the Guest Information section of `/app/booking/page.tsx`, below the Phone Number field. Update `bookingFormSchema` in `/lib/validation.ts` to include `message: z.string().optional()`. Update both email templates in `/app/api/booking/route.ts` to conditionally render the message if provided — in the admin notification and the guest confirmation.
**Reason:** Dietary requirements and children's ages are operationally important for Sherry to prepare the tour; giving guests a free-text field at booking time reduces back-and-forth follow-up. Making it optional avoids adding friction to the core booking flow. The homepage form already set the precedent with the same placeholder text.
**Result:** The Guest Information section on `/booking/page.tsx` now ends with a Message textarea (optional, 4 rows, same border/focus styling as the other inputs). The Zod schema accepts and validates the field. Both admin and guest emails conditionally include the message block when present.

---

## Decision: Change tour pricing from US$80 to NTD$2,500

**Date:** 2026-08-27
**Context:** The booking page at `/booking/` displayed pricing in USD ($80 per adult). The business operates in Taiwan and prices tours in New Taiwan Dollars; displaying USD was incorrect and potentially confusing for local and international guests alike.
**Decision:** Update `/app/booking/page.tsx` to price adults at **NTD$2,500** per person. Change the `total` calculation from `adults * 80` to `adults * 2500`. Update the Booking Summary display from `Adult: {adults} x $80` to `Adult: {adults} x $2,500` and from `Total: US$${total}` to `Total: NTD$${total.toLocaleString()}`.
**Reason:** NTD is the correct currency for this business. `toLocaleString()` is applied to the total so large numbers render with comma separators (e.g. `5,000`, `10,000`) for readability. No backend schema changes were needed — the `total` field in `bookingFormSchema` is typed as a number and remains currency-agnostic.
**Result:** The Booking Summary now shows `Adult: 1 x $2,500` and `Total: NTD$2,500`, scaling correctly as participants are added (e.g. 3 adults → `Total: NTD$7,500`). The total value submitted to `/api/booking` reflects the NTD amount.

---

## Decision: Google Sheets client database via googleapis Service Account

**Date:** 2026-08-27
**Context:** Both form submissions (homepage enquiries via `/api/contact` and tour bookings via `/api/booking`) were sending notification emails to Sherry but had no persistent record. Enquiry and booking data existed only in email inboxes, making it hard to search, filter, or analyze submissions over time. Sherry requested a way to view and manage incoming bookings and enquiries without building a custom admin dashboard.
**Decision:** Add **Google Sheets integration** using the `googleapis` npm package and service account authentication. Create two new files:
- `/app/lib/googleSheets.ts` — exports `appendToSheet(sheetName, values)` function that uses a JWT service account to authenticate and append rows to a Google Sheet
- `/app/lib/initSheets.ts` — CLI script to initialize both sheets with header rows (run once with `npx tsx app/lib/initSheets.ts`)

Update both API routes to conditionally log submissions to Google Sheets *after* the admin email succeeds, in a separate try/catch so Sheets write failure never blocks email delivery or the user's success response.
**Reason:** Google Sheets is free, widely familiar, and Sherry can access and manage data directly without needing custom UI. The service account approach requires no user login — only environment variables (`GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEETS_ID`). Logging to Sheets is a fire-and-forget operation that fails silently (logged to console) if the service account credentials are missing or the sheet is unreachable, preserving the reliability of the core booking/email flow.
**Constraints:** Sheets write failure must never block email send or user success response. Both sheets auto-insert rows in reverse chronological order (newest first) using the `INSERT_ROWS` insert data option. Timestamps use `Asia/Taipei` timezone via `toLocaleString()` for local context.
**Result:** Created `/app/lib/googleSheets.ts` (connection & append logic) and `/app/lib/initSheets.ts` (header initialization). Updated `/app/api/contact/route.ts` to log enquiries (Name, Phone, Email, No. of People, Dates, Message, timestamp). Updated `/app/api/booking/route.ts` to log bookings (Tour, Date, Time, Adults, Children, Total NTD, Guest Name, Email, Phone, timestamp). Both routes wrap Sheets operations in try/catch; on error, an error message is logged to console but form submission completes successfully.

---

## Decision: Google Sheets client database via googleapis Service Account

**Date:** 2026-08-27
**Context:** Sherry needs a way to view all booking and enquiry submissions
without any admin UI. The data is already being sent via email (Resend), but
a structured database makes it easy to filter, sort, and export records.
**Decision:** Use **Google Sheets** as the client database, written to via the
**googleapis** npm package with a **Service Account** for authentication.
Two sheets (tabs) store data separately: "Bookings" and "Enquiries".
**Reason:** Google Sheets is free, requires no extra infrastructure, and Sherry
can view and filter data directly without any technical knowledge. Service
Account authentication is stable (no token expiry unlike OAuth) and works
reliably in a Vercel serverless environment.
**Files created:**
- `app/lib/googleSheets.ts` — `appendToSheet()` helper used by both API routes
- `app/lib/initSheets.ts` — one-time script to write header rows (run with `npx tsx`)
**Constraints:**
- Sheets write failure must never block email delivery or the user success response
- All `appendToSheet()` calls are wrapped in separate try/catch blocks
- Timestamps use Asia/Taipei timezone
**Result:** Every Contact form submission appends a row to "Enquiries"; every
Booking form submission appends a row to "Bookings". Both sheets have header
rows initialized via `initSheets.ts`.
