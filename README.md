# Delicious Donuts Website

This is a responsive website for a donut shop featuring animated elements, a login page, and a creative design.

## Image Replacement Instructions

The website currently uses placeholder images. To replace them with real images:

1. Find appropriate donut images online (make sure you have the right to use them)
2. Download the images and save them to your project's public folder
3. Update the image paths in the `placeholder-images.tsx` file

### Suggested Image Searches:

- Strawberry donut with sprinkles
- Chocolate glazed donut
- Blueberry cake donut
- Vanilla frosted donut
- Maple bacon donut
- Matcha green tea donut
- Donut shop interior
- Store location map

### How to Replace Images:

1. Save your images to the `public/images/` folder
2. Open `app/placeholder-images.tsx`
3. Update the image paths from placeholders to your actual image paths

Example:
\`\`\`typescript
// Change from:
strawberryDonut: {
  placeholder: "/placeholder.svg?height=300&width=300&text=Strawberry+Donut",
  // ...
}

// To:
strawberryDonut: {
  placeholder: "/images/strawberry-donut.jpg",
  // ...
}
\`\`\`

## Features

- Responsive design for all screen sizes
- Animated elements including rotating donuts
- Login/registration page
- Interactive donut carousel
- Donut-themed color scheme
