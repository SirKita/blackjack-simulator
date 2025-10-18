# Blackjack Simulator - Design Guidelines

## Design Approach

**Selected Approach:** Reference-Based with Retro Gaming Aesthetic

Drawing inspiration from classic casino games combined with The Simpsons' iconic yellow character style. The design merges Vegas casino visual language (felt tables, playing cards, casino chips) with a playful, cartoonish character system that reacts emotionally to gameplay.

**Key Design Principles:**
- Immersive casino atmosphere with authentic card table aesthetics
- Character-driven emotional engagement through avatar reactions
- Clear visual hierarchy prioritizing gameplay while keeping avatar prominent
- Smooth, satisfying animations for card dealing and avatar state changes

---

## Core Design Elements

### A. Color Palette

**Dark Mode Primary (Casino Theme):**
- Background: 140 25% 12% (deep forest green - casino felt)
- Card Table Surface: 140 30% 18% (classic poker table green)
- Card White: 0 0% 98%
- Card Black: 0 0% 8%
- Card Red: 0 75% 45% (hearts/diamonds)

**Avatar & UI Accents:**
- Avatar Skin: 45 100% 60% (bright Simpson yellow)
- Success Green: 142 71% 45%
- Warning/Loss Red: 0 84% 60%
- Chip Gold: 38 90% 50%
- UI Borders: 0 0% 20%

**Typography Colors:**
- Primary Text: 0 0% 95%
- Secondary Text: 0 0% 70%
- Balance Display: 142 71% 45% (positive), 0 84% 60% (negative)

### B. Typography

**Fonts:**
- Primary (Game UI): 'Inter' from Google Fonts - clean, readable for card values and buttons
- Accent (Balance/Betting): 'Orbitron' from Google Fonts - digital casino display feel
- Avatar Name: 'Comic Neue' from Google Fonts - playful character-appropriate

**Hierarchy:**
- Card Values: text-4xl font-bold (Inter)
- Balance Display: text-3xl font-bold (Orbitron)
- Bet Amount: text-2xl font-semibold (Orbitron)
- Button Labels: text-base font-medium (Inter)
- Avatar Status: text-lg font-semibold (Comic Neue)

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, and 8 for consistent rhythm (p-2, m-4, gap-6, h-8, etc.)

**Screen Division:**
- Game Area: w-2/3 (left side) - blackjack table, cards, controls
- Avatar Area: w-1/3 (right side) - character display, balance, emotional state

**Responsive Breakpoints:**
- Desktop (lg): Maintain 2/3 - 1/3 split
- Tablet (md): Stack vertically - game on top, avatar below
- Mobile: Single column, avatar becomes compact header

### D. Component Library

**Avatar Creation Screen:**
- Customization Panel: Grid layout with radio buttons/sliders for each feature
- Feature Options: Hair color (8 choices), eye color (6 choices), nose size (3 sizes), mouth type (5 types), facial hair (4 options including clean shaven), gender body (2 types)
- Live Preview: Large centered avatar preview updating in real-time
- Confirm Button: Prominent "Start Playing" CTA

**Game Table Components:**
- Card Component: Rounded corners (rounded-lg), drop shadow, 3D tilt effect on deal
- Card Back: Red diamond pattern on white (classic Bicycle card style)
- Dealer Area: Top section with "Dealer" label, cards arranged horizontally
- Player Area: Bottom section with "You" label, cards arranged horizontally
- Chip Stack Indicator: Visual representation of bet amount

**Avatar Display:**
- Character Canvas: Large illustration showing full upper body
- Mood Indicator: Dynamic facial expression (5 states from ecstatic to devastated)
- Clothing Layers: 7 tiers of clothing quality (tuxedo → suit → casual → worn → tattered)
- Balance Badge: Prominent $ amount with color-coded background
- Win/Loss Streak: Small indicator showing recent hand results

**Control Elements:**
- Primary Actions: "Hit", "Stand" buttons (large, accessible)
- Secondary Actions: "Double Down", "Split" (conditional, slightly smaller)
- Betting Controls: Chip selector (5, 25, 100, 500, 1000 denominations)
- New Round Button: "Deal" button to start next hand
- Settings Icon: Access to restart/new avatar

**UI Overlays:**
- Hand Result Modal: Win/Loss/Push announcement with $ change
- Blackjack Celebration: Special full-screen animation for natural 21
- Bust Notification: Clear visual feedback for going over 21
- Balance Milestone: Achievements at $50k, $0, $150k, $200k thresholds

### E. Animations

**Card Animations:**
- Deal Animation: Cards slide from deck position to hand (0.3s ease-out)
- Flip Animation: Card reveal rotateY transform (0.4s)
- No distracting particle effects or excessive flourishes

**Avatar Reactions:**
- Expression Change: Smooth 0.5s transition between mood states
- Clothing Swap: Fade transition when crossing balance thresholds (0.6s)
- Win Celebration: Subtle bounce animation on big wins (1s, once)
- Loss Reaction: Slump/sag animation on significant losses (0.8s)

**Balance Updates:**
- Number Counter: Animate from old to new value (0.8s)
- Color Pulse: Brief highlight on win/loss (0.3s)

**Avoid:** Spinning chips, cascading money effects, repeating loops, screen shakes

---

## Images & Visual Assets

**Icons:**
Use Heroicons for UI controls (cog for settings, arrow for bet adjustments, etc.)

**Avatar Construction:**
- SVG-based modular avatar system with interchangeable parts
- Layer structure: Base body → Clothing → Head → Hair → Eyes → Nose → Mouth → Facial Hair
- 7 distinct clothing tiers with clear visual progression
- 5 distinct facial expressions mapped to balance ranges

**Card Graphics:**
- Standard 52-card deck using classic suits (♠ ♥ ♦ ♣)
- Face cards with simplified illustrated faces (not photographs)
- Card back uses geometric red diamond pattern

**No hero images needed** - this is a game interface, not a marketing page. All visual interest comes from the interactive game elements and reactive avatar.

---

## Accessibility & Polish

- Maintain dark mode throughout (casino felt background)
- Form inputs and bet controls have clear focus states
- Card values readable at distance with high contrast
- Avatar state changes clearly communicate financial status
- Keyboard navigation for all game actions (spacebar = Hit, Enter = Stand, etc.)
- Screen reader announcements for card deals and hand results