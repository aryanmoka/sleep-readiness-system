# UI Screenshots and Visual Design Guide

This document describes the expected appearance and user experience of the Training Readiness System interface.

---

## Color Palette

### Primary Colors
- **Blue 600** (#2563eb): Primary buttons, sliders, branding
- **Blue 50** (#eff6ff): Background accents
- **Gray 800** (#1f2937): Primary text
- **Gray 600** (#4b5563): Secondary text

### Status Colors
- **Green 500** (#22c55e): Ready state (≥7.0)
- **Yellow 500** (#eab308): Caution state (5.0-6.9)
- **Red 500** (#ef4444): Rest state (<5.0)

### Background
- **Gradient**: Blue-50 → White → Gray-50 (subtle, professional)

---

## Desktop Layout (≥1024px)

### Overall Structure

```
┌────────────────────────────────────────────────────────────┐
│  [Dumbbell Icon] Training Readiness System                 │
│                  Sleep-Based Recovery Assessment...        │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─────────────────────┐  ┌────────────────────────────┐ │
│  │ INPUT SECTION       │  │ RESULTS SECTION            │ │
│  │                     │  │                            │ │
│  │ Input Your Metrics  │  │ [Large Readiness Display]  │ │
│  │ ─────────────────   │  │                            │ │
│  │                     │  │ Your Readiness Score       │ │
│  │ Sleep Quality: 3/5  │  │      7.32                  │ │
│  │ ━━━━━━━━━━━━━━━━━  │  │     out of 10              │ │
│  │                     │  │                            │ │
│  │ Fatigue Level: 5/10 │  │ [──────██████────────]     │ │
│  │ ━━━━━━━━━━━━━━━━━  │  │                            │ │
│  │                     │  │ ┌────────────────────────┐ │ │
│  │ Stress Level: 3/5   │  │ │ ✓ Recommendation       │ │ │
│  │ ━━━━━━━━━━━━━━━━━  │  │ │ Train Normally         │ │ │
│  │                     │  │ │                        │ │ │
│  │ Caffeine: 1/3       │  │ │ Your body is well...   │ │ │
│  │ ━━━━━━━━━━━━━━━━━  │  │ └────────────────────────┘ │ │
│  │                     │  │                            │ │
│  │ [Calculate Button]  │  │                            │ │
│  │                     │  │                            │ │
│  │ ℹ About This System │  │                            │ │
│  └─────────────────────┘  └────────────────────────────┘ │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  MSc Research Project: Sleep-Based Training Readiness      │
│  Formula: Readiness = 5.65 + (0.75 × Sleep) − ...         │
└────────────────────────────────────────────────────────────┘
```

---

## Component Details

### 1. Header

**Visual Description:**
- White background with bottom border
- Left-aligned layout
- Icon: Blue gradient dumbbell icon in rounded square
- Title: Large, bold, black text "Training Readiness System"
- Subtitle: Smaller gray text "Sleep-Based Recovery Assessment for Amateur Powerlifters"

**Spacing:**
- Padding: 24px vertical, responsive horizontal
- Gap between icon and text: 12px

---

### 2. Input Section

#### Card Container
- White background
- Rounded corners (12px radius)
- Subtle shadow (elevation 1)
- Padding: 24px

#### Section Header
- "Input Your Metrics" - Bold, large text
- "Adjust the sliders..." - Small gray text
- Bottom margin: 16px

#### Input Sliders (×4)

**Each Slider Contains:**

1. **Label Row**
   - Left: Metric name (bold, small, dark gray)
   - Right: Current value (large, bold, blue) with unit

2. **Slider Track**
   - Light gray background (#e5e7eb)
   - Height: 8px
   - Rounded edges

3. **Slider Thumb**
   - Circular (20px diameter)
   - Blue (#2563eb)
   - White border (2px)
   - Subtle shadow
   - Hover: Darker blue, scale 1.1
   - Active: Visual feedback

4. **Description Text**
   - Very small, light gray text
   - Explains the metric
   - Top margin: 8px

**Visual Example:**
```
Sleep Quality                                           3/5
━━━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Rate your sleep quality from poor (1) to excellent (5)
```

#### Calculate Button
- Full width
- Blue background (#2563eb)
- White text, bold, centered
- Padding: 12px vertical
- Rounded (8px)
- Hover: Darker blue
- Disabled state: Gray, cursor not-allowed
- Loading state: Shows spinner icon + "Calculating..."

#### About Section
- Light blue background (#eff6ff)
- Blue border (#bfdbfe)
- Rounded (8px)
- Padding: 16px
- Small text explaining research basis

---

### 3. Results Section

#### Initial State (No Results)
- White card with centered content
- Gray icon (circular background)
- Gray text: "Enter your metrics and click..."
- Minimal, unobtrusive

#### Results Display (After Calculation)

**Score Section:**
```
       Your Readiness Score
              7.32
            out of 10

Low Readiness         High Readiness
█████████████░░░░░░░░░░░░░░░░░░░░
```

- "Your Readiness Score" - Small, uppercase, gray
- Score number - Very large (60px), bold, dark gray
- "out of 10" - Small, gray
- Progress bar:
  - Gray background
  - Colored fill based on score (green/yellow/red)
  - Smooth animation (1 second)
  - Height: 16px

**Recommendation Card:**

Green State (≥7.0):
```
┌──────────────────────────────────────┐
│ ✓  Recommendation                    │
│    Train Normally                    │
│ ─────────────────────────────────────│
│ Your body is well-recovered and      │
│ ready for a normal training session. │
│ Proceed with your planned workout... │
└──────────────────────────────────────┘
```
- Green background tint (#f0fdf4)
- Green border (#bbf7d0)
- Green icon and text (#16a34a)

Yellow State (5.0-6.9):
```
┌──────────────────────────────────────┐
│ ⚠  Recommendation                    │
│    Light Training                    │
│ ─────────────────────────────────────│
│ Your readiness is moderate. Consider │
│ reducing training intensity by 20... │
└──────────────────────────────────────┘
```
- Yellow background tint (#fefce8)
- Yellow border (#fde047)
- Yellow icon and text (#ca8a04)

Red State (<5.0):
```
┌──────────────────────────────────────┐
│ ⚡ Recommendation                     │
│    Rest / Active Recovery            │
│ ─────────────────────────────────────│
│ Your body shows signs of inadequate  │
│ recovery. Prioritize rest, sleep...  │
└──────────────────────────────────────┘
```
- Red background tint (#fef2f2)
- Red border (#fecaca)
- Red icon and text (#dc2626)

---

### 4. Error Display

When API error occurs:
```
┌──────────────────────────────────────┐
│ ✗  Error                        [x]  │
│                                      │
│ Unable to connect to the API server. │
│ Please ensure the backend is running │
└──────────────────────────────────────┘
```
- Red background tint
- Red border
- Red icon
- Dismissible (X button)
- Appears above results

---

### 5. Footer

**Content:**
- Center-aligned
- Three text lines:
  1. "MSc Research Project: Sleep-Based Training Readiness System"
  2. "Model based on empirically validated linear regression analysis"
  3. "Formula: Readiness = 5.65 + (0.75 × Sleep) − (0.44 × Fatigue)..."

**Styling:**
- Light gray background (#f9fafb)
- Top border
- Padding: 24px vertical
- Progressive text sizes (larger to smaller)
- Progressive text colors (darker to lighter)

---

## Mobile Layout (<640px)

### Changes from Desktop:

1. **Single Column Layout**
   - Input section stacks above results section
   - Full width for both sections

2. **Reduced Padding**
   - 16px instead of 24px in cards

3. **Smaller Typography**
   - Header title: Smaller font size
   - Score display: Slightly smaller (48px)

4. **Touch Optimization**
   - Larger slider thumbs (24px)
   - More spacing between interactive elements
   - Larger button height (48px minimum)

5. **Scrollable**
   - Vertical scroll for all content
   - Sticky header (optional)

### Visual Flow:
```
┌─────────────────────┐
│ [Header]            │
├─────────────────────┤
│ [Input Card]        │
│  - Sleep slider     │
│  - Fatigue slider   │
│  - Stress slider    │
│  - Caffeine slider  │
│  - Calculate button │
│  - About box        │
├─────────────────────┤
│ [Results Card]      │
│  - Score display    │
│  - Progress bar     │
│  - Recommendation   │
├─────────────────────┤
│ [Footer]            │
└─────────────────────┘
```

---

## Tablet Layout (640px-1024px)

- Similar to desktop but narrower
- Two columns maintained
- Slightly reduced spacing
- Responsive font sizes

---

## Animations and Interactions

### Slider Interaction
- **Drag**: Smooth thumb movement
- **Hover**: Thumb scales up slightly
- **Active**: Visual feedback

### Button States
- **Default**: Blue background
- **Hover**: Darker blue, cursor pointer
- **Active**: Even darker, slight scale down
- **Disabled**: Gray, cursor not-allowed
- **Loading**: Spinner animation

### Results Appearance
- **Fade In**: 500ms ease-in animation
- **Progress Bar**: Fills from 0% to final percentage over 1 second
- **Score**: Fades in with slight upward movement

### Error Dismissal
- **Fade Out**: 300ms when dismissed

---

## Accessibility Features

### Visual
- High contrast ratios (WCAG AA compliant)
- Clear focus indicators
- Sufficient text sizes

### Interactive
- Keyboard navigation support
- ARIA labels on sliders
- Semantic HTML structure

### Responsive
- Touch-friendly tap targets (minimum 44×44px)
- Readable text at all viewport sizes
- No horizontal scrolling

---

## Expected User Journey

1. **Land on page**
   - See header with clear branding
   - See input section with default values
   - See placeholder in results area

2. **Adjust sliders**
   - Values update immediately
   - Visual feedback on interaction
   - Clear current value display

3. **Click Calculate**
   - Button shows loading state
   - User waits (brief)
   - Button returns to normal

4. **View results**
   - Results fade in smoothly
   - Progress bar animates
   - Color indicates training readiness
   - Text provides clear guidance

5. **Adjust and recalculate**
   - Change sliders
   - Click calculate again
   - Results update smoothly

---

## Design Philosophy

- **Clean**: Minimal clutter, focus on core functionality
- **Professional**: Suitable for academic presentation
- **Intuitive**: No learning curve, immediate understanding
- **Responsive**: Works on all devices
- **Accessible**: Usable by everyone
- **Trustworthy**: Colors and design inspire confidence

---

## Screenshot Checklist

When capturing screenshots for documentation, include:

1. ✓ Desktop view with input at default values
2. ✓ Desktop view showing "Train Normally" (green)
3. ✓ Desktop view showing "Light Training" (yellow)
4. ✓ Desktop view showing "Rest" (red)
5. ✓ Mobile view (portrait)
6. ✓ Tablet view (if available)
7. ✓ Error state display
8. ✓ Loading state (during calculation)
9. ✓ Close-up of slider interaction
10. ✓ Full page view showing header and footer

---

This visual design balances academic professionalism with modern web design standards, creating an interface that is both functional and presentation-ready for MSc evaluation.
