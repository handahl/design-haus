# Design Haus: Project Roadmap

This document outlines the strategic phases and key milestones for the Design Haus project, providing a clear trajectory for development and feature integration.

## Strategic Phases

### Phase 1: Foundational Color System (Current Focus)

* **Objective:** Establish a robust and intelligently dynamic color generation engine, supporting comprehensive theming and foundational UI integration.
* **Key Deliverables:**
    * **Core Color Generation Algorithm Refinement:** Implement the critical correction for 'App Design Style' to ensure holistic and meaningful influence on palette generation, moving beyond superficial filters. This includes detailed algorithmic adjustments for each specified design style (e.g., Modern Minimalist, Brutalist, Dark Mode Elegant, Playful/Cartoonish).
    * **Expanded Base Color Input:** Full integration of three (3) distinct base color inputs, ensuring all contribute visibly to the generated theme.
    * **Intelligent Proposed Palette:** Generation and display of an approximate 8-color complementary palette derived from the base colors, prior to UI role assignment.
    * **Comprehensive `scopes` JSON Generation:** Refined output of the `scopes` JSON to include granular utility colors (backgrounds, text, highlights, deactivated parts, borders, dividers) as shades/tints, and to correctly integrate semantic colors (success, error, disabled) according to their distinct derivation logic.
    * **Full Light/Dark Mode Implementation:** Development of the core logic and UI toggle to generate, store, and dynamically apply both `light` and `dark` theme variants across the entire application.
    * **Enhanced Live Theme Preview:** Expansion of the preview area to:
        * Demonstrate dynamic light/dark mode switching.
        * Show interactive UI component states (hover, active, disabled).
        * Visually represent the generated theme on core UI elements (buttons, text blocks, cards).
    * **Vertical Navigation System:** Implementation of the sticky left-hand vertical tab navigation for 'Color Palettes', 'UI Components', 'Fonts', and 'Borders & Geometry'.
    * **Theme Management UI:** Development of the interface for displaying and selecting between 4 recent/saved themes (2 explicitly saved, 2 most recent).
    * **Export Functionality:** Initial implementation for exporting the generated theme in JSON, CSS variable, and Tailwind CSS config snippet formats.
    * **Conditional UI Activation:** Ensure that further UI exploration or tab functionality is enabled only after at least one base color has been defined in the 'Color Palettes' tab.

### Phase 2: UI Components Tab

* **Objective:** Visually demonstrate the dynamically generated design system across a diverse set of standard user interface components.
* **Key Deliverables:**
    * Creation and integration of the 'UI Components' tab.
    * Development of a library of common UI components (e.g., buttons, input fields, checkboxes, radio buttons, sliders, cards, modals, navigation elements).
    * Application of the active color theme and styling to all components.
    * Display of component states (normal, hover, active, disabled, focused, error, success) for each element.

### Phase 3: Fonts Tab

* **Objective:** Enable exploration and integration of typography within the generated design system.
* **Key Deliverables:**
    * Creation and integration of the 'Fonts' tab.
    * Implementation of font selection capabilities (e.g., Google Fonts integration, local font upload).
    * Demonstration of font styles (headings, body text, monospace) with the active theme's colors.
    * Preview of font sizes, weights, and line heights.

### Phase 4: Borders & Geometry Tab

* **Objective:** Allow for the exploration of structural design elements and their interaction with the color and typographic themes.
* **Key Deliverables:**
    * Creation and integration of the 'Borders & Geometry' tab.
    * Controls for defining border styles, widths, and radii.
    * Exploration of spacing units (padding, margin).
    * Demonstration of shadows, dividers, and other structural elements.
    * Visual representation of geometric shapes and their interaction with the theme.

## Future Enhancements (Post-MVP)

* **Advanced Theme Management:** Implement features such as unlimited saved theme slots, categorization, sharing options (e.g., shareable URLs for themes).
* **Accessibility Auditing:** Development of tools for advanced accessibility checks, including potential for contrast ratio analysis in different color spaces and a **simulated "forced dark mode" view** (deferred to this phase due to complexity).
* **Expanded Design Styles:** Introduction of additional nuanced design styles based on user feedback.
* **Import Existing Design Systems:** Ability to import existing CSS or JSON to analyze and adapt.
* **Code Snippet Generation:** Provide customizable code snippets for integrating generated UI components directly into projects.