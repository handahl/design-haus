import React, { useState, useEffect } from 'react';
import { Palette, Eye, Type, Square, RotateCcw, Sun, Moon } from 'lucide-react';
import ColorPalettesTab from './components/ColorPalettesTab';
import { generateColorPalette } from './utils/colorGenerator';

export interface BaseColor {
  id: string;
  color: string;
  label: string;
}

export interface ColorPaletteConfig {
  baseColors: BaseColor[];
  quality: string;
  designStyle: string;
}

export interface SavedTheme {
  id: string;
  name: string;
  config: ColorPaletteConfig;
  lightPalette: any;
  darkPalette: any;
  timestamp: number;
  isSaved: boolean;
}

const tabs = [
  { id: 'color-palettes', label: 'Color Palettes', icon: Palette },
  { id: 'ui-components', label: 'UI Components', icon: Eye },
  { id: 'fonts', label: 'Fonts', icon: Type },
  { id: 'borders-geometry', label: 'Borders & Geometry', icon: Square },
];

function App() {
  const [activeTab, setActiveTab] = useState('color-palettes');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [config, setConfig] = useState<ColorPaletteConfig>({
    baseColors: [
      { id: '1', color: '', label: 'Base Color 1' },
      { id: '2', color: '', label: 'Base Color 2' },
      { id: '3', color: '', label: 'Base Color 3' },
    ],
    quality: 'Vibrant',
    designStyle: 'Modern Minimalist',
  });

  const [generatedPalettes, setGeneratedPalettes] = useState<{light: any, dark: any}>({
    light: null,
    dark: null
  });
  const [savedThemes, setSavedThemes] = useState<SavedTheme[]>([]);

  // Check if at least one base color is selected
  const hasBaseColor = config.baseColors.some(color => color.color && color.color !== '');

  // Default configuration for initial state
  const defaultConfig: ColorPaletteConfig = {
    baseColors: [
      { id: '1', color: '#3B82F6', label: 'Base Color 1' },
      { id: '2', color: '#10B981', label: 'Base Color 2' },
      { id: '3', color: '#F59E0B', label: 'Base Color 3' },
    ],
    quality: 'Vibrant',
    designStyle: 'Modern Minimalist',
  };

  // Generate palettes whenever config changes
  useEffect(() => {
    const configToUse = hasBaseColor ? config : defaultConfig;
    
    const lightPalette = generateColorPalette(configToUse, false);
    const darkPalette = generateColorPalette(configToUse, true);
    
    setGeneratedPalettes({ light: lightPalette, dark: darkPalette });
    
    // Apply current theme to CSS variables
    applyThemeToDocument(isDarkMode ? darkPalette : lightPalette);
    
    // Update recent tries when user has base colors
    if (hasBaseColor) {
      updateRecentTries(lightPalette, darkPalette);
    }
  }, [config, hasBaseColor, isDarkMode]);

  const applyThemeToDocument = (palette: any) => {
    if (!palette) return;
    
    const root = document.documentElement;
    const colors = palette.scopes.base;

    // Apply all color variables
    Object.entries(colors).forEach(([scope, scopeColors]: [string, any]) => {
      Object.entries(scopeColors).forEach(([property, value]: [string, any]) => {
        root.style.setProperty(`--${scope}-${property}`, value);
      });
    });
  };

  const updateRecentTries = (lightPalette: any, darkPalette: any) => {
    const newTry: SavedTheme = {
      id: `try-${Date.now()}`,
      name: generateThemeName(config),
      config: { ...config },
      lightPalette,
      darkPalette,
      timestamp: Date.now(),
      isSaved: false,
    };

    setSavedThemes(prev => {
      const savedThemes = prev.filter(theme => theme.isSaved);
      const recentTries = prev.filter(theme => !theme.isSaved);
      
      const updatedTries = [newTry, ...recentTries].slice(0, 2);
      return [...savedThemes, ...updatedTries];
    });
  };

  const generateThemeName = (config: ColorPaletteConfig): string => {
    const validColors = config.baseColors.filter(c => c.color).length;
    const style = config.designStyle.split(' ')[0];
    const quality = config.quality;
    return `${style} ${quality} (${validColors} colors)`;
  };

  const handleSaveTheme = (themeName: string) => {
    if (!hasBaseColor) return;

    const newSavedTheme: SavedTheme = {
      id: `saved-${Date.now()}`,
      name: themeName,
      config: { ...config },
      lightPalette: generatedPalettes.light,
      darkPalette: generatedPalettes.dark,
      timestamp: Date.now(),
      isSaved: true,
    };

    setSavedThemes(prev => {
      const savedThemes = prev.filter(theme => theme.isSaved);
      const recentTries = prev.filter(theme => !theme.isSaved);
      
      const updatedSaved = [newSavedTheme, ...savedThemes].slice(0, 2);
      return [...updatedSaved, ...recentTries];
    });
  };

  const handleLoadTheme = (theme: SavedTheme) => {
    setConfig(theme.config);
  };

  const handleResetTheme = () => {
    setConfig({
      baseColors: [
        { id: '1', color: '', label: 'Base Color 1' },
        { id: '2', color: '', label: 'Base Color 2' },
        { id: '3', color: '', label: 'Base Color 3' },
      ],
      quality: 'Vibrant',
      designStyle: 'Modern Minimalist',
    });
  };

  const handleBaseColorChange = (id: string, color: string) => {
    setConfig(prev => ({
      ...prev,
      baseColors: prev.baseColors.map(baseColor =>
        baseColor.id === id ? { ...baseColor, color } : baseColor
      ),
    }));
  };

  const handleQualityChange = (quality: string) => {
    setConfig(prev => ({ ...prev, quality }));
  };

  const handleStyleChange = (designStyle: string) => {
    setConfig(prev => ({ ...prev, designStyle }));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'color-palettes':
        return (
          <ColorPalettesTab
            config={config}
            onBaseColorChange={handleBaseColorChange}
            onQualityChange={handleQualityChange}
            onStyleChange={handleStyleChange}
            onSaveTheme={handleSaveTheme}
            hasBaseColor={hasBaseColor}
            generatedPalettes={generatedPalettes}
            isDarkMode={isDarkMode}
          />
        );
      case 'ui-components':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary-heading)' }}>
              UI Components
            </h2>
            <p style={{ color: 'var(--primary-paragraph)' }}>
              {hasBaseColor 
                ? 'UI Components tab will showcase your theme across different interface elements.'
                : 'Please select at least one base color in the Color Palettes tab to activate this section.'
              }
            </p>
          </div>
        );
      case 'fonts':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary-heading)' }}>
              Fonts
            </h2>
            <p style={{ color: 'var(--primary-paragraph)' }}>
              {hasBaseColor 
                ? 'Fonts tab will explore typography within your design system.'
                : 'Please select at least one base color in the Color Palettes tab to activate this section.'
              }
            </p>
          </div>
        );
      case 'borders-geometry':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary-heading)' }}>
              Borders & Geometry
            </h2>
            <p style={{ color: 'var(--primary-paragraph)' }}>
              {hasBaseColor 
                ? 'Borders & Geometry tab will explore structural design elements.'
                : 'Please select at least one base color in the Color Palettes tab to activate this section.'
              }
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--primary-background)' }}>
      {/* Left Sidebar Navigation */}
      <div className="w-80 flex-shrink-0 border-r" 
           style={{ 
             backgroundColor: 'var(--primary-background)',
             borderColor: 'var(--primary-border)'
           }}>
        <div className="sticky top-0 h-screen overflow-y-auto">
          {/* Saved Themes Section */}
          {savedThemes.length > 0 && (
            <div className="p-6 border-b" style={{ borderColor: 'var(--primary-border)' }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--primary-heading)' }}>
                Saved & Recent Themes
              </h3>
              <div className="space-y-2">
                {savedThemes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleLoadTheme(theme)}
                    className="w-full p-3 rounded-lg border text-left transition-colors duration-200 hover:shadow-sm"
                    style={{ 
                      borderColor: 'var(--primary-border)',
                      backgroundColor: 'var(--primary-background)'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {theme.config.baseColors
                          .filter(c => c.color)
                          .slice(0, 3)
                          .map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded border"
                              style={{ 
                                backgroundColor: color.color,
                                borderColor: 'var(--primary-border)'
                              }}
                            />
                          ))}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate" 
                             style={{ color: 'var(--primary-heading)' }}>
                          {theme.name}
                        </div>
                        <div className="text-xs" 
                             style={{ color: 'var(--primary-paragraph)' }}>
                          {theme.isSaved ? 'Saved' : 'Recent'}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Header */}
          <div className="p-6 border-b" style={{ borderColor: 'var(--primary-border)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" 
                   style={{ backgroundColor: 'var(--primary-accent)' }}>
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold" style={{ color: 'var(--primary-heading)' }}>
                Design Explorer
              </h1>
            </div>
            
            {/* Controls */}
            <div className="space-y-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-2 w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
                style={{ 
                  backgroundColor: 'var(--primary-hover)',
                  color: 'var(--primary-paragraph)'
                }}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>

              {/* Reset Button */}
              <button
                onClick={handleResetTheme}
                className="flex items-center gap-2 w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
                style={{ 
                  backgroundColor: 'var(--primary-hover)',
                  color: 'var(--primary-paragraph)'
                }}
              >
                <RotateCcw className="w-4 h-4" />
                Reset Theme
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="p-6">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const isDisabled = !hasBaseColor && tab.id !== 'color-palettes';
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => !isDisabled && setActiveTab(tab.id)}
                    disabled={isDisabled}
                    className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg text-left font-medium transition-all duration-200 ${
                      isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                    }`}
                    style={{
                      backgroundColor: isActive 
                        ? 'var(--primary-accent)' 
                        : 'transparent',
                      color: isActive 
                        ? 'white' 
                        : isDisabled 
                          ? 'var(--disabled-accent)'
                          : 'var(--primary-paragraph)'
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default App;