# Coseli - Knowledge Base

## Brand Overview
**Brand Name:** Coseli
**Product Line:** Custom fit handcrafted leather shoes, sneakers, and shambas.
**Visual Style:** Luxury Minimal (premium restraint, high-end simplicity), Typography First (interwoven with high-quality editorial images).
**Atmosphere:** Bright, airy, flat, and beautiful.

## Technology Stack
- **Framework:** Next.js (App Router)
- **Rendering:** Static Site Generation (SSG) prioritized for SEO product discoverability.
- **Styling:** Tailwind CSS
- **Component Library:** shadcn/ui

## Design System

### 1. Color Palette (Bright, Airy, Flat)
A refined, light cohesive theme that allows the product photography to serve as the hero.
- **Primary Background:** `#FFFFFF` (Pure White) - Creates an airy, expansive feel.
- **Secondary Background:** `#F9F9F9` (Alabaster) - Used for subtle sectioning or product cards without breaking the flat design.
- **Primary Text:** `#1A1A1A` (Almost Black) - High contrast for typography legibility.
- **Secondary Text (Muted):** `#71717A` (Zinc 500) - For descriptions and secondary information.
- **Accent Color:** `#D4AF37` (Muted Gold) or `#E5E5E5` (Neutral Gray) - Used sparingly for interactive elements or very subtle borders to maintain the "flat and elegant" look.

### 2. Typography
Typography is treated as a major design element alongside the imagery.
- **Headings (Editorial Feel):** A high-end Serif like *Playfair Display*, or a sleek geometric Sans-serif like *Inter* or *Outfit* in lighter weights (300-400).
- **Body Text:** Clean, highly legible Sans-serif like *Inter* or *Geist* (14px - 16px, line-height: 1.6+).
- **Usage Strategy:** Extreme restraint. Use large, oversized type for key impact words, paired with plenty of negative space.

### 3. Layout & Structure
- **Whitespace:** Critical. Margins and padding should be very generous (`py-24` or `py-32` in Tailwind).
- **Grid Systems:** Asymmetric or perfectly balanced 2/3 column grids depending on the editorial feel.
- **Images:** High-quality editorial photos take up significant screen real estate. Use flat, un-bordered image containers or full-bleed imagery. 

### 4. Components (shadcn/ui customized)
- **Icons:** Use `lucide-react` for all icons to maintain consistency with standard shadcn/ui implementations.
- **Buttons:** Flat, solid colors (e.g., black background, white text) with slow, luxurious hover effects (e.g., subtle opacity change or slow transition to a dark gray). Avoid heavy shadows to maintain the "flat" requirement.
- **Cards:** No borders or ultra-thin borders (`border border-gray-200`). No drop shadows.
- **Expansive Lists (Show More):** When hiding options in a list (e.g., filter categories), preserve elements in the DOM and animate their visibility by transitioning `max-height` (from `0` to a fixed value like `3rem/12`) and `opacity` (from `0` to `100`). This ensures smooth interaction over instant unmounting.

## Next.js Implementation Details
### SEO & Performance (SSG)
Products should be statically generated at build time using `generateStaticParams`.
This ensures Google bots can crawl the HTML immediately upon requesting the page.

### Folder Structure
```
/
├── src/
│   ├── app/
│   │   ├── page.tsx               # Landing Page (Hero, Featured Products)
│   │   ├── layout.tsx             # Global layout & fonts
│   │   └── products/
│   │       └── [id]/
│   │           └── page.tsx       # SSG Product details
│   ├── components/                # Next/shadcn UI components
│   └── lib/                       # Utilities and mock data
```
