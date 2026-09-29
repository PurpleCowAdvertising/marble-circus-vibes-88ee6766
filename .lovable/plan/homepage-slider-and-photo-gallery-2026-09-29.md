# Homepage slider and photo gallery

Add the nine supplied event photos as a polished, mixed-orientation gallery that can grow as more images arrive.

## What will be built

- Replace the current small “past event photos” strip on the homepage with a continuous sliding gallery using the new photos.
- Preserve each photo’s natural portrait or landscape character instead of forcing every image into one crop.
- Add a dedicated `/gallery` page with an editorial masonry-style layout, lazy loading, and a full-screen viewer with previous/next and keyboard controls.
- Add Gallery to the main menu and footer, include the page in the sitemap, and make the page and homepage section controllable from the existing visibility settings.
- Keep the gallery data in one shared file so future photo batches only need to be added once.

## Visual treatment

- Use the site’s black, white, orange and gold visual language.
- Give landscape images wider frames and portrait images taller frames while keeping faces and brand moments clearly visible.
- Homepage slider supports touch swiping, wheel/trackpad scrolling, arrow controls, and reduced-motion preferences.
- The gallery page uses a balanced responsive layout that avoids awkward gaps and opens each image without cropping.

## Technical notes

- Store the supplied images through the existing site asset delivery flow rather than adding large originals to the project.
- Add a shared gallery data module and reusable gallery viewer/slider components.
- Give `/gallery` its own title and social metadata, and preserve all current ticket and hospitality visibility settings.
- Verify the homepage and gallery page on desktop and mobile, including mixed orientations, navigation, and the full-screen viewer.
