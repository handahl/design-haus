import React from 'react';
import { Eye, User, Settings, AlertCircle, CheckCircle, XCircle, Mail, Search, Sun, Moon } from 'lucide-react';

interface LiveThemePreviewProps {
  palettes: {light: any, dark: any};
  hasBaseColor: boolean;
  isDarkMode: boolean;
}

const LiveThemePreview: React.FC<LiveThemePreviewProps> = ({ palettes, hasBaseColor, isDarkMode }) => {
  const currentPalette = isDarkMode ? palettes.dark : palettes.light;
  
  if (!currentPalette) return null;

  return (
    <section className="border-t pt-12" style={{ borderColor: 'var(--primary-border)' }}>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Eye className="w-6 h-6" style={{ color: 'var(--primary-accent)' }} />
          <h2 className="text-2xl font-bold" style={{ color: 'var(--primary-heading)' }}>
            Live Theme Preview
          </h2>
          <div className="flex items-center gap-2 ml-4 px-3 py-1 rounded-full text-sm" 
               style={{ 
                 backgroundColor: 'var(--primary-hover)',
                 color: 'var(--primary-paragraph)'
               }}>
            {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </div>
        </div>
        <p className="text-lg" style={{ color: 'var(--primary-paragraph)' }}>
          {hasBaseColor 
            ? 'See how your generated color palette looks across different UI states and interactions'
            : 'This preview shows the default theme. Select base colors above to see your custom theme.'
          }
        </p>
      </div>

      <div className="space-y-8">
        {/* Primary Components */}
        <div className="p-6 rounded-2xl border" 
             style={{ 
               backgroundColor: 'var(--primary-background)',
               borderColor: 'var(--primary-border)'
             }}>
          <h3 className="text-lg font-semibold mb-6" 
              style={{ color: 'var(--primary-heading)' }}>
            Primary Components & Interactive States
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {/* Primary Button with Hover */}
              <div className="space-y-2">
                <button className="w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 hover:opacity-90"
                        style={{ 
                          backgroundColor: 'var(--primary-accent)',
                          color: 'white'
                        }}>
                  Primary Button
                </button>
                <p className="text-xs" style={{ color: 'var(--primary-paragraph)' }}>
                  Hover to see interaction state
                </p>
              </div>
              
              {/* Secondary Button */}
              <button className="w-full py-3 px-6 rounded-lg font-medium border-2 transition-colors duration-200 hover:opacity-80"
                      style={{ 
                        borderColor: 'var(--secondary-accent)',
                        color: 'var(--secondary-accent)',
                        backgroundColor: 'transparent'
                      }}>
                Secondary Button
              </button>

              {/* Disabled Button */}
              <button className="w-full py-3 px-6 rounded-lg font-medium cursor-not-allowed"
                      style={{ 
                        backgroundColor: 'var(--disabled-accent)',
                        color: 'white',
                        opacity: 0.6
                      }}
                      disabled>
                Disabled Button
              </button>

              {/* Input Fields */}
              <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                       style={{ color: 'var(--primary-icon)' }} />
                  <input 
                    type="email" 
                    placeholder="Enter your email..."
                    className="w-full py-3 pl-10 pr-4 rounded-lg border focus:ring-2 focus:outline-none transition-colors duration-200"
                    style={{ 
                      borderColor: 'var(--primary-border)',
                      backgroundColor: 'var(--primary-background)',
                      color: 'var(--primary-paragraph)',
                      '--tw-ring-color': 'var(--primary-accent)'
                    } as React.CSSProperties}
                  />
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                          style={{ color: 'var(--primary-icon)' }} />
                  <input 
                    type="text" 
                    placeholder="Search..."
                    className="w-full py-3 pl-10 pr-4 rounded-lg border focus:ring-2 focus:outline-none transition-colors duration-200"
                    style={{ 
                      borderColor: 'var(--primary-border)',
                      backgroundColor: 'var(--primary-background)',
                      color: 'var(--primary-paragraph)',
                      '--tw-ring-color': 'var(--primary-accent)'
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg" style={{ color: 'var(--primary-heading)' }}>
                Typography Hierarchy
              </h4>
              
              <div className="space-y-3">
                <h1 className="text-2xl font-bold" style={{ color: 'var(--primary-heading)' }}>
                  Primary Heading
                </h1>
                <h2 className="text-xl font-semibold" style={{ color: 'var(--primary-heading)' }}>
                  Secondary Heading
                </h2>
                <p style={{ color: 'var(--primary-paragraph)' }}>
                  This is sample paragraph text that demonstrates how your color palette affects 
                  readability and visual hierarchy. The text should be easily readable against 
                  the background while maintaining proper contrast ratios.
                </p>
                <p className="text-sm" style={{ color: 'var(--primary-placeholder)' }}>
                  This is smaller text using the placeholder color for less prominent content.
                </p>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 hover:opacity-90" 
                   style={{ backgroundColor: 'var(--primary-hover)' }}>
                <User className="w-5 h-5" style={{ color: 'var(--primary-accent)' }} />
                <div>
                  <div className="font-medium" style={{ color: 'var(--primary-heading)' }}>
                    Interactive Element
                  </div>
                  <div className="text-sm" style={{ color: 'var(--primary-paragraph)' }}>
                    Hover to see interaction state
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* State Variations */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Success State */}
          <div className="p-6 rounded-2xl border transition-all duration-200 hover:shadow-lg" 
               style={{ 
                 backgroundColor: 'var(--primary-background)',
                 borderColor: 'var(--success-border)'
               }}>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6" style={{ color: 'var(--success-accent)' }} />
              <h4 className="font-semibold" style={{ color: 'var(--success-heading)' }}>
                Success State
              </h4>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--primary-paragraph)' }}>
              Operation completed successfully. This shows how success messages appear in your theme.
            </p>
            <button className="w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 hover:opacity-90"
                    style={{ 
                      backgroundColor: 'var(--success-accent)',
                      color: 'white'
                    }}>
              Success Action
            </button>
          </div>

          {/* Error State */}
          <div className="p-6 rounded-2xl border transition-all duration-200 hover:shadow-lg" 
               style={{ 
                 backgroundColor: 'var(--primary-background)',
                 borderColor: 'var(--error-border)'
               }}>
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-6 h-6" style={{ color: 'var(--error-accent)' }} />
              <h4 className="font-semibold" style={{ color: 'var(--error-heading)' }}>
                Error State
              </h4>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--primary-paragraph)' }}>
              Something went wrong. This demonstrates error styling and messaging in your theme.
            </p>
            <button className="w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 hover:opacity-90"
                    style={{ 
                      backgroundColor: 'var(--error-accent)',
                      color: 'white'
                    }}>
              Retry Action
            </button>
          </div>

          {/* Disabled State */}
          <div className="p-6 rounded-2xl border" 
               style={{ 
                 backgroundColor: 'var(--primary-background)',
                 borderColor: 'var(--primary-border)',
                 opacity: 0.7
               }}>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6" style={{ color: 'var(--disabled-accent)' }} />
              <h4 className="font-semibold" style={{ color: 'var(--disabled-heading)' }}>
                Disabled State
              </h4>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--disabled-paragraph)' }}>
              This element is currently disabled. Shows how inactive elements appear in your theme.
            </p>
            <button className="w-full py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed"
                    style={{ 
                      backgroundColor: 'var(--disabled-accent)',
                      color: 'white',
                      opacity: 0.6
                    }}
                    disabled>
              Disabled Button
            </button>
          </div>
        </div>

        {/* Selected/Active State */}
        <div className="p-6 rounded-2xl border-2 transition-all duration-200" 
             style={{ 
               backgroundColor: 'var(--selected-background)',
               borderColor: 'var(--selected-accent)'
             }}>
          <h4 className="font-semibold mb-3" style={{ color: 'var(--selected-heading)' }}>
            Selected/Active State
          </h4>
          <p className="text-sm mb-4" style={{ color: 'var(--primary-paragraph)' }}>
            This represents how selected or active elements appear in your theme. 
            Notice the subtle background tint and accent border.
          </p>
          <div className="flex gap-3">
            <button className="py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
                    style={{ 
                      backgroundColor: 'var(--selected-accent)',
                      color: 'white'
                    }}>
              Active Tab
            </button>
            <button className="py-2 px-4 rounded-lg text-sm font-medium border transition-colors duration-200 hover:opacity-80"
                    style={{ 
                      borderColor: 'var(--primary-border)',
                      color: 'var(--primary-paragraph)',
                      backgroundColor: 'transparent'
                    }}>
              Inactive Tab
            </button>
          </div>
        </div>

        {/* Color Swatches Grid */}
        <div className="p-6 rounded-2xl border" 
             style={{ 
               backgroundColor: 'var(--primary-background)',
               borderColor: 'var(--primary-border)'
             }}>
          <h3 className="text-lg font-semibold mb-6 text-center" 
              style={{ color: 'var(--primary-heading)' }}>
            Complete Color System
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(currentPalette.scopes.base).map(([scope, colors]: [string, any]) => (
              <div key={scope} className="text-center">
                <div
                  className="w-full h-16 rounded-lg border-2 mb-2 transition-transform duration-200 hover:scale-105"
                  style={{ 
                    backgroundColor: colors.accent,
                    borderColor: 'var(--primary-border)'
                  }}
                />
                <div className="text-sm font-medium capitalize" 
                     style={{ color: 'var(--primary-heading)' }}>
                  {scope}
                </div>
                <div className="text-xs font-mono" 
                     style={{ color: 'var(--primary-paragraph)' }}>
                  {colors.accent}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Theme Mode Comparison */}
        {hasBaseColor && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Light Mode Preview */}
            <div className="p-6 rounded-2xl border-2" 
                 style={{ 
                   backgroundColor: palettes.light?.scopes?.base?.primary?.background || '#FFFFFF',
                   borderColor: palettes.light?.scopes?.base?.primary?.border || '#E5E7EB',
                   color: palettes.light?.scopes?.base?.primary?.paragraph || '#374151'
                 }}>
              <div className="flex items-center gap-2 mb-4">
                <Sun className="w-5 h-5" style={{ color: palettes.light?.scopes?.base?.primary?.accent }} />
                <h4 className="font-semibold" style={{ color: palettes.light?.scopes?.base?.primary?.heading }}>
                  Light Mode
                </h4>
              </div>
              <p className="text-sm mb-3">
                This is how your theme appears in light mode with proper contrast and readability.
              </p>
              <button className="py-2 px-4 rounded-lg text-sm font-medium"
                      style={{ 
                        backgroundColor: palettes.light?.scopes?.base?.primary?.accent,
                        color: 'white'
                      }}>
                Light Button
              </button>
            </div>

            {/* Dark Mode Preview */}
            <div className="p-6 rounded-2xl border-2" 
                 style={{ 
                   backgroundColor: palettes.dark?.scopes?.base?.primary?.background || '#1F2937',
                   borderColor: palettes.dark?.scopes?.base?.primary?.border || '#374151',
                   color: palettes.dark?.scopes?.base?.primary?.paragraph || '#D1D5DB'
                 }}>
              <div className="flex items-center gap-2 mb-4">
                <Moon className="w-5 h-5" style={{ color: palettes.dark?.scopes?.base?.primary?.accent }} />
                <h4 className="font-semibold" style={{ color: palettes.dark?.scopes?.base?.primary?.heading }}>
                  Dark Mode
                </h4>
              </div>
              <p className="text-sm mb-3">
                This is how your theme appears in dark mode with enhanced colors for visibility.
              </p>
              <button className="py-2 px-4 rounded-lg text-sm font-medium"
                      style={{ 
                        backgroundColor: palettes.dark?.scopes?.base?.primary?.accent,
                        color: 'white'
                      }}>
                Dark Button
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LiveThemePreview;