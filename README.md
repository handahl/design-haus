# Design Haus: An AI-Orchestrated Design System Explorer

## Project Overview

Design Haus is an innovative web application designed for comprehensive exploration and generation of dynamic design systems. It serves as a sophisticated tool for visualizing how core design parameters—such as color palettes, typography, UI components, and geometric forms—interact to create cohesive and impactful visual identities.

This project is meticulously orchestrated by a human designer, leveraging advanced AI agents for code generation and technical implementation. The intent is to demonstrate a highly efficient workflow where strategic design vision is translated directly into functional code through precise AI directives.

## Key Features

### Current Capabilities (Phase 1 Focus)

* **Dynamic Color Palette Generation:** Generates comprehensive color themes based on 1-3 user-defined base colors, selected color quality (e.g., Vibrant, Muted, Neon), and specific app design styles (e.g., Modern Minimalist, Dark Mode Elegant, Brutalist).
* **Intelligent Palette Derivation:** Extends selected base colors into a proposed palette of approximately 8 complementary colors, ensuring aesthetic harmony and adherence to established design principles.
* **Granular Color Roles:** Assigns generated colors to a wide array of UI roles including backgrounds, text, highlighted text, disabled states, borders, and more, demonstrating nuanced application.
* **Semantic Color Integration:** Incorporates universal semantic colors for success, error, and disabled states, derived consistently with the overall theme.
* **Light / Dark Mode Toggle:** Provides seamless, dynamic switching between distinct light and dark theme variations, generated for each design system.
* **Comprehensive Live Preview:** Offers a real-time, interactive visualization of the generated theme applied to essential UI components (buttons, text blocks, cards), showcasing hover, active, and disabled states.
* **Persistent Theme Management:** Allows for saving and quick switching between 4 themes (2 explicitly saved, 2 most recently generated).
* **Intuitive Vertical Navigation:** Features a sticky left-hand vertical navigation bar for efficient access to different design system parameters (Color Palettes, UI Components, Fonts, Borders & Geometry).
* **Conditional UI Progression:** Ensures core theme attributes are defined before enabling full exploration of subsequent design elements.

### Planned Features (Roadmap)

* **UI Components Tab:** Detailed demonstration of the generated theme applied to a diverse library of common UI elements.
* **Fonts Tab:** Integration of typography selection and its interaction with the established color system.
* **Borders & Geometry Tab:** Exploration of structural design elements, shapes, and spacing influenced by the chosen theme.
* **Advanced Theme Management:** Expansion of saved theme slots, import/export capabilities beyond current formats, and sharing functionalities.
* **Accessibility Tools:** Implementation of specific tools for evaluating color accessibility, potentially including advanced color space analysis (e.g., simulated forced dark mode view).

## Technology Stack

* **Framework:** React
* **Build Tool:** Vite
* **Language:** TypeScript
* **Styling:** Tailwind CSS, PostCSS
* **Linting:** ESLint
* **Version Control:** Git / GitHub

## Installation & Local Development

To set up and run Design Haus locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/handahl/design-haus.git](https://github.com/handahl/design-haus.git)
    cd design-haus
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will typically be accessible at `http://localhost:5173` (or another port as indicated by Vite).

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.