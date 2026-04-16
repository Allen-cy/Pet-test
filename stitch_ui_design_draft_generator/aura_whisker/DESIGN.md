```markdown
# Design System Document: An Editorial Approach to Fate

## 1. Overview & Creative North Star
**The Creative North Star: "The Soulful Archivist"**

This design system moves away from the clinical, "app-like" interfaces common in the tech industry. Instead, it draws inspiration from high-end editorial archives and boutique apothecary journals. The goal is to make the user feel as though they are uncovering a profound, predestined truth about their connection to the animal kingdom.

We reject the rigid, "boxed-in" layout of traditional mobile apps. Instead, we embrace **Organic Asymmetry**. Elements should feel like they were placed by hand on a heavy-stock paper. By utilizing overlapping layers, oversized typography, and a "borderless" philosophy, we create a digital experience that feels tactile, compassionate, and deeply premium.

---

## 2. Color Philosophy: The "No-Line" Rule
Our palette is anchored in the warmth of the earth (`background: #fcf9f4`). We use color not just for decoration, but as a structural tool and an emotional signifier.

### The Foundation
- **Primary (`#72553d`):** A sophisticated deep cocoa that grounds the experience.
- **Surface Strategy:** We strictly prohibit the use of 1px solid borders to define sections. Depth and containment must be achieved via **Background Shifts**:
    - **Base:** `surface` (#fcf9f4)
    - **Sections:** Use `surface-container-low` (#f6f3ee) for large content areas.
    - **Floating Elements:** Use `surface-container-lowest` (#ffffff) to suggest a lighter, "lifting" paper stock.

### Category Accents (The Fate Spectrum)
Each pet category carries its own soul. When a user matches with a specific animal, the interface should subtly "bleed" into that category's tonal world using subtle radial gradients behind the main content:
- **Cats:** Warm Earth (#E8C9A0)
- **Dogs:** Verdant Forest (#A8D88A)
- **Rabbits:** Ethereal Lavender (#C9B4E8)
- **Small Animals:** Golden Amber (#F0C878)
- **Fish:** Deep Oceanic (#78C8F0)
- **Birds:** Meadow Lime (#C8E878)

**The Signature Texture:** Use a subtle radial gradient (e.g., `primary` to `primary-container`) on Hero CTAs to move beyond "flat" design and provide a sense of luminous depth.

---

## 3. Typography: The Editorial Voice
We use a high-contrast typographic scale to create an authoritative yet poetic rhythm.

*   **The Soul (Headings):** **Noto Serif**. This choice conveys history and meaning. We use `display-lg` (3.5rem) and `headline-md` (1.75rem) to introduce results and emotional insights, creating a "moment of pause."
*   **The Clarity (Body):** **Plus Jakarta Sans**. A modern, clean sans-serif used for instructional text and tags. It ensures that the poetic nature of the brand doesn't sacrifice legibility.

**Hierarchical Intent:**
- **Display-LG:** For the "Fate Reveal" (e.g., "The Midnight Feline").
- **Headline-SM:** For insightful personality traits.
- **Body-LG:** For the "Narrative" or "Story" of the match.
- **Label-MD:** All-caps with 0.05em letter spacing for category tags.

---

## 4. Elevation & Tonal Layering
Traditional drop shadows are too aggressive for this experience. We achieve depth through a **Layering Principle**.

*   **Tonal Stacking:** Place a `surface-container-lowest` card on top of a `surface-container-low` background. This creates a natural "lift" based on color values alone.
*   **Ambient Shadows:** For interactive floating elements, use a "Whisper Shadow":
    - Blur: 32px to 64px.
    - Opacity: 4% to 8%.
    - Color: A tinted version of `on-surface` (never pure black).
*   **The Ghost Border:** If accessibility requires a stroke, use `outline-variant` at 15% opacity. Never use high-contrast outlines.
*   **Glassmorphism:** For overlays or navigation bars, use a 40% opacity `surface` color with a `backdrop-filter: blur(20px)`. This allows the "fate" colors of the background to softly bleed through the UI.

---

## 5. Signature Components

### Cards (The "Fortune" Deck)
- **Radii:** Always `xl` (3rem/48px). This exaggerated roundness feels organic and safe.
- **Content:** Forbid divider lines. Use `body-sm` spacing (0.75rem) to separate sections within the card.
- **Interaction:** On hover/tap, the card should scale slightly (1.02x) rather than darkening.

### Buttons (The "Call to Action")
- **Primary:** Rounded `full`. Background: `primary` (#72553d). Label: `on-primary` (#ffffff).
- **Secondary:** Transparent background with a `Ghost Border`.
- **Tertiary:** Text-only in `primary`, with a slight underline of 1px at 30% opacity.

### Selection Chips (Personality Traits)
- **Style:** Use `surface-container-high` backgrounds.
- **Active State:** Transition to the category-specific accent color (e.g., the Cat Accent #E8C9A0) with `on-primary-fixed` text.

### The Fate Input (Text Fields)
- **Style:** Minimalist. No bounding box. Only a bottom "Ghost Border" that expands into a 2px `primary` line when focused.
- **Animation:** Labels should float up using a Noto Serif `label-md` style.

---

## 6. Do’s and Don'ts

### Do
- **Do** use intentional white space. Let the typography breathe like a luxury magazine.
- **Do** overlap images. Have a pet photo slightly "break" the boundary of its container card for a custom, bespoke feel.
- **Do** use "soft" imagery. Photos should have high-key lighting or warm filters to match the beige base.

### Don't
- **Don't** use 90-degree corners. Everything must be rounded (`md` scale or higher) to maintain the "compassionate" tone.
- **Don't** use pure black (#000000) for text. Use `on-surface` (#1c1c19) to maintain a soft, ink-on-paper look.
- **Don't** use standard "system" icons. Use thin-stroke, hand-drawn, or custom-curated iconography.
- **Don't** use dividers or horizontal rules. Use vertical space to separate thoughts.

---

## 7. Spacing Scale
We utilize a generous spacing scale to prevent the UI from feeling "crowded":
- **Tight:** 0.5rem (sm) — for labels and icons.
- **Standard:** 1.5rem (md) — for internal card padding.
- **Editorial:** 3rem (xl) — for section margins and separating distinct "fate" results.

*This design system is a living document intended to guide the creation of a soulful, high-end digital journey that honors the bond between humans and their pets.*```