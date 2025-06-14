import React, { useState } from 'react';
import { Palette, Settings, Brush, Copy, Download, Save, Lightbulb } from 'lucide-react';
import { ColorPaletteConfig } from '../App';
import LiveThemePreview from './LiveThemePreview';

interface ColorPalettesTabProps {
  config: ColorPaletteConfig;
  onBaseColorChange: (id: string, color: string) => void;
  onQualityChange: (quality: string) => void;
  onStyleChange: (style: string) => void;
  onSaveTheme: (name: string) => void;
  hasBaseColor: boolean;
  generatedPalettes: {light: any, dark: any};
  isDarkMode: boolean;
}

const qualities = [
  {
    value: 'Matte',
    label: 'Matte',
    description: 'Reduced saturation (20-40%), slightly lower brightness (60-80%)',
  },
  {
    value: 'Vibrant',
    label: 'Vibrant',
    description: 'High saturation (80-100%), moderate brightness (70-90%)',
  },
  {
    value: 'Neon',
    label: 'Neon',
    description: 'Very high saturation (90-100%), high luminosity (80-100%)',
  },
  {
    value: 'Muted',
    label: 'Muted',
    description: 'Low saturation (10-30%), desaturated, leaning towards gray',
  },
];

const styles = [
  {
    value: 'Modern Minimalist',
    label: 'Modern Minimalist',
    description: 'Clean contrasts, restricted palette, subtle elements',
  },
  {
    value: 'Retro/Vintage',
    label: 'Retro/Vintage',
    description: 'Warm, sepia-toned hues, desaturated appearance',
  },
  {
    value: 'Dark Mode Elegant',
    label: 'Dark Mode Elegant',
    description: 'Deep backgrounds, high contrast, vivid accents',
  },
  {
    value: 'Playful/Cartoonish',
    label: 'Playful/Cartoonish',
    description: 'Bright, saturated colors, exaggerated contrasts',
  },
  {
    value: 'Brutalist',
    label: 'Brutalist',
    description: 'Bold contrasts, primary colors, harsh borders',
  },
];

const ColorPalettesTab: React.FC<ColorPalettesTabProps> = ({
  config,
  onBaseColorChange,
  onQualityChange,
  onStyleChange,
  onSaveTheme,
  hasBaseColor,
  generatedPalettes,
  isDarkMode,
}) => {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [themeName, setThemeName] = useState('');

  const currentPalette = isDarkMode ? generatedPalettes.dark : generatedPalettes.light;

  const handleColorChange = (id: string, color: string) => {
    onBaseColorChange(id, color);
  };

  const handleHexChange = (id: string, value: string) => {
    if (value.match(/^#[0-9A-Fa-f]{0,6}$/)) {
      onBaseColorChange(id, value);
    }
  };

  const handleSaveTheme = () => {
    if (themeName.trim() && hasBaseColor) {
      onSaveTheme(themeName.trim());
      setThemeName('');
      setSaveDialogOpen(false);
    }
  };

  const handleCopyJson = async () => {
    if (!currentPalette) return;
    try {
      const exportData = {
        light: generatedPalettes.light?.scopes,
        dark: generatedPalettes.dark?.scopes
      };
      await navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
    } catch (err) {
      console.error('Failed to copy JSON:', err);
    }
  };

  const handleDownloadJson = () => {
    if (!currentPalette) return;
    const exportData = {
      light: generatedPalettes.light?.scopes,
      dark: generatedPalettes.dark?.scopes
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color-palette.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadCss = () => {
    if (!currentPalette) return;
    
    let cssContent = ':root {\n  /* Light Theme */\n';
    
    // Light theme variables
    const lightColors = generatedPalettes.light?.scopes?.base;
    if (lightColors) {
      Object.entries(lightColors).forEach(([scope, scopeColors]: [string, any]) => {
        Object.entries(scopeColors).forEach(([property, value]: [string, any]) => {
          cssContent += `  --${scope}-${property}: ${value};\n`;
        });
      });
    }
    
    cssContent += '}\n\n[data-theme="dark"] {\n  /* Dark Theme */\n';
    
    // Dark theme variables
    const darkColors = generatedPalettes.dark?.scopes?.base;
    if (darkColors) {
      Object.entries(darkColors).forEach(([scope, scopeColors]: [string, any]) => {
        Object.entries(scopeColors).forEach(([property, value]: [string, any]) => {
          cssContent += `  --${scope}-${property}: ${value};\n`;
        });
      });
    }
    
    cssContent += '}';

    const blob = new Blob([cssContent], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color-palette.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadTailwind = () => {
    if (!currentPalette) return;
    
    const lightColors = generatedPalettes.light?.scopes?.base;
    const darkColors = generatedPalettes.dark?.scopes?.base;

    const tailwindConfig = `// Add this to your tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Light theme colors
        ${Object.entries(lightColors || {}).map(([scope, scopeColors]: [string, any]) => `
        ${scope}: {
          ${Object.entries(scopeColors).map(([property, value]: [string, any]) => 
            `${property}: '${value}',`
          ).join('\n          ')}
        },`).join('')}
      }
    }
  },
  // For dark mode support, use CSS variables or Tailwind's dark mode classes
}`;

    const blob = new Blob([tailwindConfig], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tailwind-colors.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" 
               style={{ backgroundColor: 'var(--primary-accent)' }}>
            <Palette className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold" style={{ color: 'var(--primary-heading)' }}>
            Color Palettes
          </h1>
        </div>
        <p className="text-xl leading-relaxed max-w-4xl mx-auto" 
           style={{ color: 'var(--primary-paragraph)' }}>
          Create sophisticated, cohesive color schemes using advanced color theory. 
          Select base colors, choose quality preferences, and pick design styles to generate 
          comprehensive light and dark theme palettes.
        </p>
      </div>

      {/* Base Colors Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Palette className="w-8 h-8" style={{ color: 'var(--primary-accent)' }} />
            <h2 className="text-3xl font-bold" style={{ color: 'var(--primary-heading)' }}>
              Base Colors
            </h2>
          </div>
          <p className="text-lg" style={{ color: 'var(--primary-paragraph)' }}>
            Select up to three distinct base colors that will form the foundation of your palette
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {config.baseColors.map((baseColor, index) => (
            <div key={baseColor.id} className="text-center">
              <div className="mb-4">
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <input
                    type="color"
                    value={baseColor.color || '#000000'}
                    onChange={(e) => handleColorChange(baseColor.id, e.target.value)}
                    className="absolute inset-0 w-full h-full rounded-2xl border-4 cursor-pointer"
                    style={{ 
                      borderColor: 'var(--primary-border)',
                      backgroundColor: baseColor.color || '#f9fafb'
                    }}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2" 
                    style={{ color: 'var(--primary-heading)' }}>
                  {baseColor.label}
                </h3>
                <input
                  type="text"
                  value={baseColor.color}
                  onChange={(e) => handleHexChange(baseColor.id, e.target.value)}
                  placeholder="#000000"
                  className="w-full px-4 py-2 text-center font-mono text-sm rounded-lg border focus:ring-2 focus:outline-none"
                  style={{ 
                    borderColor: 'var(--primary-border)',
                    backgroundColor: 'var(--primary-background)',
                    color: 'var(--primary-paragraph)',
                    '--tw-ring-color': 'var(--primary-accent)'
                  } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Harmonious Palette Preview */}
      {hasBaseColor && currentPalette?.harmoniousPalette && (
        <section className="mb-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8" style={{ color: 'var(--primary-accent)' }} />
              <h2 className="text-3xl font-bold" style={{ color: 'var(--primary-heading)' }}>
                Generated Harmonious Palette
              </h2>
            </div>
            <p className="text-lg" style={{ color: 'var(--primary-paragraph)' }}>
              8 complementary colors derived from your base colors using color theory principles
            </p>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 max-w-4xl mx-auto">
            {currentPalette.harmoniousPalette.map((color: string, index: number) => (
              <div key={index} className="text-center">
                <div
                  className="w-full h-16 rounded-lg border-2 mb-2"
                  style={{ 
                    backgroundColor: color,
                    borderColor: 'var(--primary-border)'
                  }}
                />
                <div className="text-xs font-mono" 
                     style={{ color: 'var(--primary-paragraph)' }}>
                  {color}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quality Selection */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Settings className="w-8 h-8" style={{ color: 'var(--primary-accent)' }} />
            <h2 className="text-3xl font-bold" style={{ color: 'var(--primary-heading)' }}>
              Color Quality
            </h2>
          </div>
          <p className="text-lg" style={{ color: 'var(--primary-paragraph)' }}>
            Choose how saturated and bright your colors should appear
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {qualities.map((quality) => (
            <label
              key={quality.value}
              className={`block p-6 rounded-xl border-2 cursor-pointer transition-all duration-200`}
              style={{
                borderColor: config.quality === quality.value 
                  ? 'var(--primary-accent)' 
                  : 'var(--primary-border)',
                backgroundColor: config.quality === quality.value 
                  ? 'var(--primary-hover)' 
                  : 'var(--primary-background)'
              }}
            >
              <input
                type="radio"
                name="quality"
                value={quality.value}
                checked={config.quality === quality.value}
                onChange={(e) => onQualityChange(e.target.value)}
                className="sr-only"
              />
              <div className="text-center">
                <div className="font-semibold text-lg mb-2" 
                     style={{ color: 'var(--primary-heading)' }}>
                  {quality.label}
                </div>
                <div className="text-sm leading-relaxed" 
                     style={{ color: 'var(--primary-paragraph)' }}>
                  {quality.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Style Selection */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brush className="w-8 h-8" style={{ color: 'var(--primary-accent)' }} />
            <h2 className="text-3xl font-bold" style={{ color: 'var(--primary-heading)' }}>
              Design Style
            </h2>
          </div>
          <p className="text-lg" style={{ color: 'var(--primary-paragraph)' }}>
            Select the overall aesthetic approach that will fundamentally shape your color system
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {styles.map((style) => (
            <label
              key={style.value}
              className={`block p-6 rounded-xl border-2 cursor-pointer transition-all duration-200`}
              style={{
                borderColor: config.designStyle === style.value 
                  ? 'var(--primary-accent)' 
                  : 'var(--primary-border)',
                backgroundColor: config.designStyle === style.value 
                  ? 'var(--primary-hover)' 
                  : 'var(--primary-background)'
              }}
            >
              <input
                type="radio"
                name="style"
                value={style.value}
                checked={config.designStyle === style.value}
                onChange={(e) => onStyleChange(e.target.value)}
                className="sr-only"
              />
              <div className="text-center">
                <div className="font-semibold text-lg mb-2" 
                     style={{ color: 'var(--primary-heading)' }}>
                  {style.label}
                </div>
                <div className="text-sm leading-relaxed" 
                     style={{ color: 'var(--primary-paragraph)' }}>
                  {style.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Export Section */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary-heading)' }}>
            Export Your Design System
          </h2>
          <p className="text-lg" style={{ color: 'var(--primary-paragraph)' }}>
            Save your theme or export it in various formats (includes both light and dark modes)
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setSaveDialogOpen(true)}
            disabled={!hasBaseColor}
            className="flex items-center gap-2 py-3 px-6 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: 'var(--primary-accent)',
              color: 'white'
            }}
          >
            <Save className="w-4 h-4" />
            Save Theme
          </button>
          
          <button
            onClick={handleCopyJson}
            disabled={!hasBaseColor}
            className="flex items-center gap-2 py-3 px-6 rounded-lg font-medium border-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              borderColor: 'var(--primary-accent)',
              color: 'var(--primary-accent)',
              backgroundColor: 'transparent'
            }}
          >
            <Copy className="w-4 h-4" />
            Copy JSON
          </button>
          
          <button
            onClick={handleDownloadJson}
            disabled={!hasBaseColor}
            className="flex items-center gap-2 py-3 px-6 rounded-lg font-medium border-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              borderColor: 'var(--primary-border)',
              color: 'var(--primary-paragraph)',
              backgroundColor: 'transparent'
            }}
          >
            <Download className="w-4 h-4" />
            JSON File
          </button>
          
          <button
            onClick={handleDownloadCss}
            disabled={!hasBaseColor}
            className="flex items-center gap-2 py-3 px-6 rounded-lg font-medium border-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              borderColor: 'var(--primary-border)',
              color: 'var(--primary-paragraph)',
              backgroundColor: 'transparent'
            }}
          >
            <Download className="w-4 h-4" />
            CSS File
          </button>
          
          <button
            onClick={handleDownloadTailwind}
            disabled={!hasBaseColor}
            className="flex items-center gap-2 py-3 px-6 rounded-lg font-medium border-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              borderColor: 'var(--primary-border)',
              color: 'var(--primary-paragraph)',
              backgroundColor: 'transparent'
            }}
          >
            <Download className="w-4 h-4" />
            Tailwind Config
          </button>
        </div>
      </section>

      {/* Save Theme Dialog */}
      {saveDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-6 rounded-2xl max-w-md w-full mx-4" 
               style={{ backgroundColor: 'var(--primary-background)' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--primary-heading)' }}>
              Save Theme
            </h3>
            <input
              type="text"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              placeholder="Enter theme name..."
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none mb-4"
              style={{ 
                borderColor: 'var(--primary-border)',
                backgroundColor: 'var(--primary-background)',
                color: 'var(--primary-paragraph)',
                '--tw-ring-color': 'var(--primary-accent)'
              } as React.CSSProperties}
            />
            <div className="flex gap-3">
              <button
                onClick={handleSaveTheme}
                disabled={!themeName.trim()}
                className="flex-1 py-3 px-6 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
                style={{ 
                  backgroundColor: 'var(--primary-accent)',
                  color: 'white'
                }}
              >
                Save
              </button>
              <button
                onClick={() => setSaveDialogOpen(false)}
                className="flex-1 py-3 px-6 rounded-lg font-medium border-2 transition-colors duration-200"
                style={{ 
                  borderColor: 'var(--primary-border)',
                  color: 'var(--primary-paragraph)',
                  backgroundColor: 'transparent'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Theme Preview */}
      <LiveThemePreview 
        palettes={generatedPalettes} 
        hasBaseColor={hasBaseColor} 
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default ColorPalettesTab;