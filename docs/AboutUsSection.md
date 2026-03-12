# AboutUs Section - Architecture & Components

## Overview

The AboutUs section is a sophisticated two-part layout component that showcases university information with an integrated profile slider. It uses a generic, reusable slider component that can work with any type of content.

---

## Components

### 1. **GenericSlider Component** (`GenericSlider.jsx`)

A flexible, reusable slider component that works with any slide content.

#### Props:

- **`slides`** (Array) - Array of slide objects (required)
- **`size`** (String) - Height variant: `'small'` | `'medium'` | `'large'` (default: `'medium'`)
- **`effect`** (String) - Animation effect: `'fade'` | `'slide'` (default: `'fade'`)
- **`autoPlay`** (Boolean) - Auto-rotate slides (default: `true`)
- **`autoPlayInterval`** (Number) - Interval in milliseconds (default: `5000`)
- **`renderSlide`** (Function) - Custom render function for each slide (optional)

#### Features:

- ✅ Auto-play with configurable interval
- ✅ Manual navigation with arrow buttons
- ✅ Dot indicators for quick access
- ✅ Smooth fade/slide transitions
- ✅ Responsive design
- ✅ Pause on interaction

#### Usage Example:

```jsx
<GenericSlider
  slides={profileData}
  size="large"
  effect="fade"
  autoPlay={true}
  autoPlayInterval={6000}
  renderSlide={(profile) => (
    <div>
      {profile.name}: {profile.testimonial}
    </div>
  )}
/>
```

---

### 2. **AboutUsSection Component** (`AboutUsSection.jsx`)

Main component that combines about content with the profile slider.

#### Structure:

```
┌─────────────────────────────────────────────────────────────┐
│ UPPER PART - ABOUT CONTENT                                  │
├────────────────────────┬────────────────────────────────────┤
│ • Heading              │ Social Icons (Phone, WhatsApp,     │
│ • Content Text         │ Facebook, Instagram)               │
│ • Read More Toggle     │ CTA Buttons (Admission, Online)    │
└────────────────────────┴────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ CENTER TAGLINE (Maroon color)                               │
│ "AIU: A GATEWAY TO HIGHER EDUCATION"                        │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ BOTTOM PART - PROFILE SLIDER                                │
├─────────────────────────────────────────────────────────────┤
│ • Circular Profile Image                                    │
│ • Testimonial Quote                                         │
│ • Name & Title                                              │
│ • Navigation Arrows & Dots                                  │
└─────────────────────────────────────────────────────────────┘
```

#### Props:

- **`data`** (Object) - About section configuration with:
  - `heading` - Section heading
  - `content` - About text content
  - `tagline` - Center tagline (uses secondary color)
  - `readMoreText` - Label for expand/collapse
  - `profiles` - Array of profile objects (each with `name`, `title`, `image`, `testimonial`)

#### Color Usage:

- **Primary Navy** (`--color-primary`): Background, section backgrounds
- **Secondary Maroon** (`--color-secondary`): Center tagline, CTA buttons
- **Accent Gold** (`--color-accent`): Accents, highlights, social icons
- **White**: Text on colored backgrounds

---

## Data Structure

### Mock Data Location

`src/data/header.mock.js` → `publicMock.aboutUs`

### Profile Object Structure:

```javascript
{
  id: 1,
  name: "Prof. (Dr) Manik Saha",
  title: "Chief Minister of Tripura",
  image: "https://...", // Profile image URL
  testimonial: "It gives me immense pleasure..." // Quote text
}
```

### AboutUs Section Structure:

```javascript
aboutUs: {
  heading: "About Us",
  content: "Welcome to Aryavart...", // Long text
  tagline: "AIU: A GATEWAY TO HIGHER EDUCATION",
  readMoreText: "Read More...",
  profiles: [ /* array of profile objects */ ]
}
```

---

## Responsive Design

### Mobile (320px - 639px)

- Single column layout
- Smaller profile image (w-32 h-32)
- Stacked social icons
- Smaller fonts (text-sm)
- Hamburger-friendly buttons

### Tablet (640px - 1023px)

- Two-column layout starts
- Medium profile image (w-40 h-40)
- Horizontal social icons
- Normal fonts (text-base)

### Desktop (1024px+)

- Full two-column layout
- Large profile image
- All elements properly spaced
- Large typography

---

## Features & Interactions

### 1. **Read More Toggle**

```javascript
const [showFullContent, setShowFullContent] = useState(false);
// Toggle between truncated (300 chars) and full content
```

### 2. **Profile Slider**

- **Auto-rotation**: Changes profile every 6 seconds
- **Manual Navigation**: Arrow buttons to move between profiles
- **Quick Access**: Dot indicators to jump to specific profile
- **Fade Effect**: Smooth fade-in/fade-out transitions

### 3. **Social Media Buttons**

- Phone: Opens dialer
- WhatsApp: Opens WhatsApp chat
- Facebook: Links to Facebook page
- Instagram: Links to Instagram profile

### 4. **CTA Buttons**

- **Admission Enquiry**: Secondary color (maroon)
- **Online Form**: Primary color (navy)
- Hover effects with smooth transitions

---

## Styling & Colors

### CSS Variables (from index.css)

```css
--color-primary: #0b1f4b; /* Navy Blue */
--color-secondary: #a12a2a; /* Maroon Red */
--color-accent: #a12a2a; /* Gold/Accent */
```

### Tailwind Classes Used

- Responsive grid: `grid md:grid-cols-2`
- Padding: `py-12 sm:py-16 px-6 sm:px-8`
- Typography: `text-3xl sm:text-5xl font-heading font-bold`
- Spacing: `gap-8`, `gap-4`, `gap-2`
- Shadows: `shadow-lg`
- Transitions: `transition duration-500`

---

## Integration Steps

### 1. Add to About Page

```jsx
import AboutUsSection from "../../components/public/about/AboutUsSection";
import { publicMock } from "../../data/header.mock";

export default function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    setAboutData(publicMock.aboutUs);
  }, []);

  return (
    <div>
      {aboutData && <AboutUsSection data={aboutData} />}
      {/* Other sections */}
    </div>
  );
}
```

### 2. Update Mock Data

Edit `src/data/header.mock.js` and add/modify `aboutUs` object with your content.

### 3. Customize for Other Uses

```jsx
// Use GenericSlider for testimonials
<GenericSlider
  slides={testimonials}
  size="medium"
  effect="fade"
  renderSlide={(testimonial) => (
    <TestimonialCard data={testimonial} />
  )}
/>

// Use GenericSlider for news/articles
<GenericSlider
  slides={news}
  size="large"
  effect="slide"
  autoPlayInterval={8000}
  renderSlide={(article) => (
    <NewsCard data={article} />
  )}
/>
```

---

## Performance Considerations

1. **Image Optimization**: Use properly sized images (400x400px recommended)
2. **Lazy Loading**: Profile images lazy-load by default in modern browsers
3. **Auto-play Control**: Pauses on interaction, resumes after inactivity
4. **Responsive Images**: Tailwind scaling handles different screen sizes
5. **Bundle Size**: GenericSlider is ~3KB minified

---

## Customization Examples

### Change Slider Speed

```jsx
<GenericSlider
  {...props}
  autoPlayInterval={3000} // 3 seconds instead of 6
/>
```

### Change Slider Effect

```jsx
<GenericSlider
  {...props}
  effect="slide" // Slide animation instead of fade
/>
```

### Change Tagline Color

Edit `AboutUsSection.jsx` - change `color: "var(--color-secondary)"` to desired color variable.

### Add More Profiles

Edit `src/data/header.mock.js` and add more objects to `aboutUs.profiles` array.

---

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE 11: ❌ Not supported (uses CSS Grid, modern JavaScript)

---

## Future Enhancements

- [ ] Keyboard navigation (Arrow keys)
- [ ] Touch swipe support for mobile
- [ ] Lazy load images with intersection observer
- [ ] Accessibility improvements (ARIA labels)
- [ ] Custom theme colors from admin panel
- [ ] Video testimonials support
