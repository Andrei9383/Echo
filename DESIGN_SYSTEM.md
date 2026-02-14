# 🦇 Echo Design System

## Brand Identity

**Echo** is a lifestyle activity tracker that logs what you're doing every 30 minutes.
The mascot is a cute purple bat — **Echo the Bat** — who guides users through their day.

### Design Direction: "Playful Nocturnal"
Inspired by Duolingo's cartoonish, gamified approach, but with a night-sky aesthetic.

---

## 🎨 Color Palette

### Core Brand Colors (from Echo mascot)

| Token | Hex | Usage |
|-------|-----|-------|
| `indigo800` | `#1c1650` | Dark backgrounds, text on light |
| `indigo600` | `#302680` | Primary action buttons, links |
| `lavender500` | `#9081b8` | Echo's body, medium accents |
| `lavender300` | `#c4b9e0` | Borders on light theme, muted text dark |
| `cream` | `#f5f0e3` | Echo's belly, warm backgrounds |
| `creamLight` | `#faf8f0` | Light mode background |
| `pink400` | `#f0a0b2` | Accent color, Echo's ears |

### Semantic Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `primary` | `#302680` | `#a99bcc` | Main CTA buttons, links |
| `accent` | `#f0a0b2` | `#e8879b` | Secondary CTA, highlights |
| `success` | `#58d4a0` | `#7de8bb` | Completed activities, positive |
| `warning` | `#ffc63e` | `#ffd76e` | Streaks, caution states |
| `destructive` | `#e8574a` | `#ff7b6b` | Delete, error states |
| `info` | `#5cc5ff` | `#8ed9ff` | Informational badges |

### Gamification Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `streakActive` | `#ffc63e` | Streak fire / active days |
| `xpGain` | `#58d4a0` | XP earned indicators |
| `levelBadge` | brand primary | Level badges |

---

## ✏️ Typography

**Font: Bricolage Grotesque** — quirky, chunky, full of character.

| Variant | Size | Weight | Usage |
|---------|------|--------|-------|
| `display` | 42px | 900 | Hero text, big numbers |
| `heading` | 34px | 800 | Page headings |
| `title` | 26px | 700 | Card titles, section headers |
| `subtitle` | 20px | 600 | Subsection headers |
| `body` | 16px | 400 | Default paragraph text |
| `label` | 13px | 700 | Uppercase labels |
| `caption` | 13px | 400 | Secondary/muted text |
| `tiny` | 11px | 500 | Smallest text |
| `mono` | 16px | 400 | Code, timestamps |

---

## 📐 Spacing & Sizing

| Token | Value | Usage |
|-------|-------|-------|
| `SPACING_XS` | 4px | Tight gaps |
| `SPACING_SM` | 8px | Small gaps |
| `SPACING_MD` | 16px | Default spacing |
| `SPACING_LG` | 24px | Section padding |
| `SPACING_XL` | 32px | Large sections |
| `HEIGHT` | 52px | Default button/input |
| `HEIGHT_SM` | 42px | Small button |
| `HEIGHT_LG` | 58px | Large button |

---

## 🔵 Border Radius

Everything is bubbly and rounded — Duolingo-style.

| Token | Value | Usage |
|-------|-------|-------|
| `CORNERS` | 16px | Buttons, cards |
| `CORNERS_SM` | 10px | Chips, badges |
| `CORNERS_XS` | 6px | Small elements |
| `CORNERS_FULL` | 999px | Pills, circles |

---

## 🎭 Shadows

Bold bottom shadows create a "physical button" / 3D effect.

| Token | Usage |
|-------|-------|
| `SHADOW_SM` | Subtle card shadow |
| `SHADOW_MD` | Default card shadow |
| `SHADOW_LG` | Elevated elements |
| `SHADOW_BUTTON` | Duolingo-style 3D button |
| `SHADOW_BUTTON_PRESSED` | Pressed button state |

---

## 🧩 Components

### Button
- **Variants**: default, accent, success, destructive, secondary, outline, ghost, link
- **Sizes**: sm (42px), default (52px), lg (58px), icon
- **Features**: Bold bottom border for 3D effect, bouncy spring press animation, haptic feedback

### Card
- Visible 2px border, 16px radius, continuous border curve
- Optional `animated` prop for bounce-on-press
- Sub-components: CardHeader, CardTitle, CardDescription, CardContent, CardFooter

### Badge
- **Variants**: default, success, warning, destructive, info, xp, streak, level
- Chunky rounded shape with bold text

### Chip
- Tappable filter/tag with emoji, color coding, selected state
- Bouncy press animation

### ProgressBar
- Full-pill shape, bouncy spring fill animation
- Specialized `XpProgress` variant with XP counter

### StreakCounter
- Fire emoji with large animated count
- 7-day dot grid with staggered spring entrance

### StatCard
- Compact card with emoji, bold value, label
- Used in grid layouts for dashboard stats

### TimeSlot
- 30-minute interval card with color accent strip
- Shows activity name, emoji, and "NOW" badge for current slot

### EchoMascot
- Floating idle animation (translate + rotate)
- Speech bubble support for contextual messages
- Uses the bat mascot image

### ToggleSwitch
- Bouncy animated toggle with color interpolation
- Visible border on track

### Separator
- Horizontal/vertical divider

### Text
- All typography variants in one component
- `bold` prop for quick weight switching

---

## 🎬 Animation Language

All animations use **spring physics** from `react-native-reanimated`:

| Config | Damping | Stiffness | Mass | Feel |
|--------|---------|-----------|------|------|
| `SPRING_BOUNCY` | 10 | 150 | 0.8 | Fun overshoot |
| `SPRING_RESPONSIVE` | 18 | 300 | 0.6 | Quick, snappy |
| `SPRING_GENTLE` | 20 | 120 | 1.0 | Soft, smooth |

### Press Interaction Pattern
1. **Press in**: Scale to 0.95-0.97 + translateY down 2-3px (simulates pushing a physical button)
2. **Press out**: Spring back to 1.0 with `SPRING_BOUNCY` (fun overshoot)

### Entrance Animations
- Staggered with `withDelay()` for lists
- Scale from 0.5 → 1.0 with spring
- Opacity fade from 0 → 1

---

## 🦇 Mascot Usage Guidelines

- **Homepage**: Floating with greeting message
- **Empty states**: Encouraging message ("Start tracking!")
- **Streak milestones**: Excited with celebration
- **Reminders**: Gentle prompt to log activity
- Size: 80-140px depending on context
