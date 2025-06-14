import { ColorPaletteConfig } from '../App';

// Advanced color manipulation utilities
function hexToHsl(hex: string): [number, number, number] {
  if (!hex || hex === '') return [0, 0, 50];
  
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  const toHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Generate harmonious color palette from base colors
function generateHarmoniousPalette(baseColors: string[], quality: string): string[] {
  const validColors = baseColors.filter(c => c && c !== '');
  if (validColors.length === 0) return [];

  const palette: string[] = [];
  
  // Process each base color according to quality
  validColors.forEach(color => {
    const [h, s, l] = hexToHsl(color);
    
    // Apply quality transformations
    let adjustedColor: string;
    switch (quality) {
      case 'Matte':
        adjustedColor = hslToHex(h, Math.min(s * 0.6, 40), Math.min(l * 0.9, 75));
        break;
      case 'Vibrant':
        adjustedColor = hslToHex(h, Math.max(s * 1.2, 80), Math.min(Math.max(l, 65), 85));
        break;
      case 'Neon':
        adjustedColor = hslToHex(h, Math.max(s * 1.4, 95), Math.min(Math.max(l, 75), 95));
        break;
      case 'Muted':
        adjustedColor = hslToHex(h, Math.min(s * 0.4, 25), l);
        break;
      default:
        adjustedColor = color;
    }
    
    palette.push(adjustedColor);
    
    // Generate complementary and analogous colors
    const [adjH, adjS, adjL] = hexToHsl(adjustedColor);
    
    // Analogous colors (±30 degrees)
    palette.push(hslToHex((adjH + 30) % 360, adjS, adjL));
    palette.push(hslToHex((adjH - 30 + 360) % 360, adjS, adjL));
    
    // Complementary color (180 degrees)
    palette.push(hslToHex((adjH + 180) % 360, adjS, adjL));
  });

  // Add neutral variations
  const primaryHsl = hexToHsl(palette[0] || '#3B82F6');
  palette.push(hslToHex(primaryHsl[0], 10, 90)); // Light neutral
  palette.push(hslToHex(primaryHsl[0], 15, 20)); // Dark neutral
  palette.push(hslToHex(primaryHsl[0], 5, 60));  // Mid neutral
  palette.push(hslToHex(primaryHsl[0], 8, 40));  // Darker mid neutral

  return palette.slice(0, 8); // Return 8 colors max
}

// Design style specific color derivation
function deriveColorsForStyle(
  palette: string[], 
  designStyle: string, 
  isDarkMode: boolean = false
): any {
  const primary = palette[0] || '#3B82F6';
  const secondary = palette[1] || '#10B981';
  const accent1 = palette[2] || '#F59E0B';
  const accent2 = palette[3] || '#EF4444';
  const lightNeutral = palette[4] || '#F9FAFB';
  const darkNeutral = palette[5] || '#1F2937';
  const midNeutral = palette[6] || '#6B7280';
  const darkMidNeutral = palette[7] || '#374151';

  // Semantic colors (largely independent but quality-influenced)
  const semanticColors = {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6'
  };

  switch (designStyle) {
    case 'Modern Minimalist':
      return generateModernMinimalistTheme(
        primary, secondary, lightNeutral, darkNeutral, midNeutral, semanticColors, isDarkMode
      );
    
    case 'Retro/Vintage':
      return generateRetroVintageTheme(
        primary, secondary, accent1, lightNeutral, darkNeutral, semanticColors, isDarkMode
      );
    
    case 'Dark Mode Elegant':
      return generateDarkModeElegantTheme(
        primary, secondary, accent1, darkNeutral, midNeutral, semanticColors, true // Always dark
      );
    
    case 'Playful/Cartoonish':
      return generatePlayfulCartoonishTheme(
        primary, secondary, accent1, accent2, lightNeutral, darkNeutral, semanticColors, isDarkMode
      );
    
    case 'Brutalist':
      return generateBrutalistTheme(
        primary, secondary, lightNeutral, darkNeutral, semanticColors, isDarkMode
      );
    
    default:
      return generateModernMinimalistTheme(
        primary, secondary, lightNeutral, darkNeutral, midNeutral, semanticColors, isDarkMode
      );
  }
}

function generateModernMinimalistTheme(
  primary: string, secondary: string, lightNeutral: string, 
  darkNeutral: string, midNeutral: string, semanticColors: any, isDarkMode: boolean
) {
  const bg = isDarkMode ? '#FAFAFA' : '#FFFFFF';
  const surface = isDarkMode ? '#F5F5F5' : '#FEFEFE';
  const textPrimary = isDarkMode ? '#1A1A1A' : '#0A0A0A';
  const textSecondary = isDarkMode ? '#4A4A4A' : '#6A6A6A';
  const border = isDarkMode ? '#E0E0E0' : '#F0F0F0';
  
  return {
    primary: {
      accent: primary,
      background: bg,
      paragraph: textSecondary,
      heading: textPrimary,
      border: adjustColorOpacity(primary, 0.2),
      hover: adjustColorOpacity(primary, 0.05),
      icon: textSecondary,
      separator: border,
      placeholder: adjustColorOpacity(textSecondary, 0.6),
      accentForeground: getContrastColor(primary),
      backdrop: '#00000008'
    },
    secondary: {
      accent: secondary,
      background: bg,
      paragraph: textSecondary,
      heading: textPrimary,
      border: border,
      hover: adjustColorOpacity(secondary, 0.05),
      icon: textSecondary,
      separator: border,
      placeholder: adjustColorOpacity(textSecondary, 0.6),
      accentForeground: getContrastColor(secondary),
      backdrop: '#00000008'
    },
    // ... continue with other states
    disabled: generateDisabledState(bg, textSecondary, border),
    selected: generateSelectedState(primary, bg, textPrimary),
    error: generateSemanticState(semanticColors.error, bg, textPrimary),
    success: generateSemanticState(semanticColors.success, bg, textPrimary)
  };
}

function generateRetroVintageTheme(
  primary: string, secondary: string, accent: string,
  lightNeutral: string, darkNeutral: string, semanticColors: any, isDarkMode: boolean
) {
  // Warm, sepia-toned palette
  const bg = isDarkMode ? '#2C2416' : '#FDF6E3';
  const surface = isDarkMode ? '#3A2F1A' : '#F5E6D3';
  const textPrimary = isDarkMode ? '#E6D5B8' : '#3C2415';
  const textSecondary = isDarkMode ? '#C4A876' : '#5D4E37';
  
  // Desaturate and warm up the primary colors
  const [h1, s1, l1] = hexToHsl(primary);
  const [h2, s2, l2] = hexToHsl(secondary);
  
  const vintagePrimary = hslToHex((h1 + 15) % 360, s1 * 0.7, l1 * 0.8);
  const vintageSecondary = hslToHex((h2 + 10) % 360, s2 * 0.6, l2 * 0.75);
  
  return {
    primary: {
      accent: vintagePrimary,
      background: bg,
      paragraph: textSecondary,
      heading: textPrimary,
      border: '#D2B48C',
      hover: surface,
      icon: '#8B4513',
      separator: '#D2B48C',
      placeholder: '#8B7355',
      accentForeground: getContrastColor(vintagePrimary),
      backdrop: '#00000015'
    },
    secondary: {
      accent: vintageSecondary,
      background: bg,
      paragraph: textSecondary,
      heading: textPrimary,
      border: '#D2B48C',
      hover: surface,
      icon: '#8B4513',
      separator: '#D2B48C',
      placeholder: '#8B7355',
      accentForeground: getContrastColor(vintageSecondary),
      backdrop: '#00000015'
    },
    disabled: generateDisabledState(bg, '#A0956B', '#D2B48C'),
    selected: generateSelectedState(vintagePrimary, bg, textPrimary),
    error: generateSemanticState('#CD5C5C', bg, textPrimary), // Muted red
    success: generateSemanticState('#8FBC8F', bg, textPrimary) // Muted green
  };
}

function generateDarkModeElegantTheme(
  primary: string, secondary: string, accent: string,
  darkNeutral: string, midNeutral: string, semanticColors: any, isDarkMode: boolean
) {
  const bg = '#0A0A0A';
  const surface = '#121212';
  const surfaceElevated = '#1E1E1E';
  const textPrimary = '#FFFFFF';
  const textSecondary = '#B3B3B3';
  const border = '#333333';
  
  // Enhance colors for dark mode visibility
  const [h1, s1, l1] = hexToHsl(primary);
  const [h2, s2, l2] = hexToHsl(secondary);
  
  const darkPrimary = hslToHex(h1, Math.min(s1 * 1.2, 90), Math.max(l1, 60));
  const darkSecondary = hslToHex(h2, Math.min(s2 * 1.2, 90), Math.max(l2, 60));
  
  return {
    primary: {
      accent: darkPrimary,
      background: bg,
      paragraph: textSecondary,
      heading: textPrimary,
      border: darkPrimary,
      hover: surfaceElevated,
      icon: textSecondary,
      separator: border,
      placeholder: '#666666',
      accentForeground: '#000000',
      backdrop: '#00000080'
    },
    secondary: {
      accent: darkSecondary,
      background: bg,
      paragraph: textSecondary,
      heading: textPrimary,
      border: border,
      hover: surfaceElevated,
      icon: textSecondary,
      separator: border,
      placeholder: '#666666',
      accentForeground: '#000000',
      backdrop: '#00000080'
    },
    disabled: generateDisabledState(bg, '#555555', border),
    selected: generateSelectedState(darkPrimary, surface, textPrimary),
    error: generateSemanticState('#FF6B6B', bg, textPrimary),
    success: generateSemanticState('#51CF66', bg, textPrimary)
  };
}

function generatePlayfulCartoonishTheme(
  primary: string, secondary: string, accent1: string, accent2: string,
  lightNeutral: string, darkNeutral: string, semanticColors: any, isDarkMode: boolean
) {
  const bg = isDarkMode ? '#1A1625' : '#FFFBF0';
  const surface = isDarkMode ? '#252030' : '#FFF5E6';
  const textPrimary = isDarkMode ? '#F0E6FF' : '#1A202C';
  const textSecondary = isDarkMode ? '#C4B5FD' : '#2D3748';
  
  // Boost saturation and brightness for playful feel
  const [h1, s1, l1] = hexToHsl(primary);
  const [h2, s2, l2] = hexToHsl(secondary);
  
  const playfulPrimary = hslToHex(h1, Math.min(s1 * 1.4, 95), Math.min(l1 * 1.1, 80));
  const playfulSecondary = hslToHex(h2, Math.min(s2 * 1.4, 95), Math.min(l2 * 1.1, 80));
  
  return {
    primary: {
      accent: playfulPrimary,
      background: bg,
      paragraph: textSecondary,
      heading: textPrimary,
      border: playfulPrimary,
      hover: surface,
      icon: textSecondary,
      separator: '#FBD38D',
      placeholder: isDarkMode ? '#9F7AEA' : '#A0AEC0',
      accentForeground: getContrastColor(playfulPrimary),
      backdrop: '#00000020'
    },
    secondary: {
      accent: playfulSecondary,
      background: bg,
      paragraph: textSecondary,
      heading: textPrimary,
      border: '#FBD38D',
      hover: surface,
      icon: textSecondary,
      separator: '#FBD38D',
      placeholder: isDarkMode ? '#9F7AEA' : '#A0AEC0',
      accentForeground: getContrastColor(playfulSecondary),
      backdrop: '#00000020'
    },
    disabled: generateDisabledState(bg, isDarkMode ? '#6B46C1' : '#A0AEC0', '#FBD38D'),
    selected: generateSelectedState(playfulPrimary, surface, textPrimary),
    error: generateSemanticState('#FF6B9D', bg, textPrimary), // Playful pink-red
    success: generateSemanticState('#51CF66', bg, textPrimary) // Bright green
  };
}

function generateBrutalistTheme(
  primary: string, secondary: string, lightNeutral: string,
  darkNeutral: string, semanticColors: any, isDarkMode: boolean
) {
  const bg = isDarkMode ? '#000000' : '#FFFFFF';
  const textPrimary = isDarkMode ? '#FFFFFF' : '#000000';
  const border = isDarkMode ? '#FFFFFF' : '#000000';
  
  // Use pure, uncompromising colors
  const brutalistPrimary = isDarkMode ? '#FFFFFF' : '#000000';
  const brutalistSecondary = primary; // Keep one accent color
  
  return {
    primary: {
      accent: brutalistSecondary,
      background: bg,
      paragraph: textPrimary,
      heading: textPrimary,
      border: border,
      hover: isDarkMode ? '#1A1A1A' : '#F5F5F5',
      icon: textPrimary,
      separator: border,
      placeholder: isDarkMode ? '#666666' : '#999999',
      accentForeground: getContrastColor(brutalistSecondary),
      backdrop: '#00000050'
    },
    secondary: {
      accent: brutalistPrimary,
      background: bg,
      paragraph: textPrimary,
      heading: textPrimary,
      border: border,
      hover: isDarkMode ? '#1A1A1A' : '#F5F5F5',
      icon: textPrimary,
      separator: border,
      placeholder: isDarkMode ? '#666666' : '#999999',
      accentForeground: isDarkMode ? '#000000' : '#FFFFFF',
      backdrop: '#00000050'
    },
    disabled: generateDisabledState(bg, isDarkMode ? '#666666' : '#999999', border),
    selected: generateSelectedState(brutalistSecondary, bg, textPrimary),
    error: generateSemanticState('#FF0000', bg, textPrimary), // Pure red
    success: generateSemanticState('#00FF00', bg, textPrimary) // Pure green
  };
}

// Helper functions
function generateDisabledState(bg: string, textColor: string, border: string) {
  return {
    accent: '#9CA3AF',
    background: bg,
    paragraph: textColor,
    heading: textColor,
    border: border,
    hover: bg,
    icon: '#D1D5DB',
    separator: border,
    placeholder: '#D1D5DB',
    accentForeground: '#FFFFFF',
    backdrop: '#00000010'
  };
}

function generateSelectedState(accent: string, bg: string, textColor: string) {
  const [h, s] = hexToHsl(accent);
  const selectedBg = hslToHex(h, Math.min(s, 20), 95);
  
  return {
    accent: accent,
    background: selectedBg,
    paragraph: textColor,
    heading: accent,
    border: accent,
    hover: hslToHex(h, Math.min(s, 15), 92),
    icon: accent,
    separator: accent,
    placeholder: adjustColorOpacity(textColor, 0.6),
    accentForeground: getContrastColor(accent),
    backdrop: '#00000015'
  };
}

function generateSemanticState(accent: string, bg: string, textColor: string) {
  return {
    accent: accent,
    background: bg,
    paragraph: accent,
    heading: accent,
    border: adjustColorOpacity(accent, 0.3),
    hover: adjustColorOpacity(accent, 0.1),
    icon: accent,
    separator: adjustColorOpacity(accent, 0.3),
    placeholder: adjustColorOpacity(accent, 0.6),
    accentForeground: getContrastColor(accent),
    backdrop: '#00000015'
  };
}

function adjustColorOpacity(color: string, opacity: number): string {
  const [h, s, l] = hexToHsl(color);
  return hslToHex(h, s, l + (100 - l) * (1 - opacity));
}

function getContrastColor(bgColor: string): string {
  const [, , l] = hexToHsl(bgColor);
  return l > 50 ? '#000000' : '#FFFFFF';
}

// Main generation function
export function generateColorPalette(config: ColorPaletteConfig, isDarkMode: boolean = false) {
  const { baseColors, quality, designStyle } = config;
  
  // Get valid base colors
  const validBaseColors = baseColors
    .filter(color => color.color && color.color !== '')
    .map(color => color.color);
  
  // Generate harmonious palette
  const harmoniousPalette = generateHarmoniousPalette(validBaseColors, quality);
  
  // Derive colors based on design style
  const derivedColors = deriveColorsForStyle(harmoniousPalette, designStyle, isDarkMode);
  
  return {
    harmoniousPalette,
    scopes: {
      base: derivedColors
    }
  };
}