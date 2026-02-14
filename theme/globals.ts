/**
 * Echo Design System — Global Tokens
 * 
 * Cartoonish, bouncy, Duolingo-inspired sizing.
 * Everything is chunky, rounded, and fun.
 */

// ─── Sizing ────────────────────────────────────────────────
export const HEIGHT = 52;         // Default button/input height — chunky & tappable
export const HEIGHT_SM = 42;      // Small button/input height
export const HEIGHT_LG = 58;      // Large button/input height

// ─── Typography ────────────────────────────────────────────
export const FONT_SIZE = 16;      // Base body text
export const FONT_SIZE_XS = 11;   // Tiny labels
export const FONT_SIZE_SM = 13;   // Small captions
export const FONT_SIZE_MD = 16;   // Body
export const FONT_SIZE_LG = 20;   // Subtitles
export const FONT_SIZE_XL = 26;   // Titles
export const FONT_SIZE_2XL = 34;  // Headings / hero text
export const FONT_SIZE_3XL = 42;  // Big display text

// ─── Corners ───────────────────────────────────────────────
// Duolingo-style = very rounded, bubbly, soft
export const BORDER_RADIUS = 16;  // Default border radius for cards, sheets
export const CORNERS = 16;        // Button corner radius — pill-ish
export const CORNERS_SM = 10;     // Smaller elements like chips/badges
export const CORNERS_XS = 6;      // Tiny elements
export const CORNERS_FULL = 999;  // Full pill/circle

// ─── Spacing ───────────────────────────────────────────────
export const SPACING_XS = 4;
export const SPACING_SM = 8;
export const SPACING_MD = 16;
export const SPACING_LG = 24;
export const SPACING_XL = 32;
export const SPACING_2XL = 48;

// ─── Shadows ───────────────────────────────────────────────
// Duolingo uses bold bottom shadows on buttons / cards
export const SHADOW_SM = {
    shadowColor: '#1c165080',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
};

export const SHADOW_MD = {
    shadowColor: '#1c165080',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
};

export const SHADOW_LG = {
    shadowColor: '#1c165080',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
};

// Cartoon "pressed" shadow — makes things feel 3D
export const SHADOW_BUTTON = {
    shadowColor: '#13103a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 4,
};

export const SHADOW_BUTTON_PRESSED = {
    shadowColor: '#13103a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 1,
};

// ─── Animation ─────────────────────────────────────────────
// Bouncy, playful spring configs for react-native-reanimated
export const SPRING_BOUNCY = {
    damping: 10,
    stiffness: 150,
    mass: 0.8,
};

export const SPRING_RESPONSIVE = {
    damping: 18,
    stiffness: 300,
    mass: 0.6,
};

export const SPRING_GENTLE = {
    damping: 20,
    stiffness: 120,
    mass: 1,
};

// ─── Border ────────────────────────────────────────────────
export const BORDER_WIDTH = 3;    // Bold cartoon borders
export const BORDER_WIDTH_SM = 2;
export const BORDER_WIDTH_LG = 4;
