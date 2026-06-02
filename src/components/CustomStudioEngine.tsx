import React, { useState, useEffect } from 'react';
import { 
  Sliders, Palette, Sparkles, Terminal, Type, Layout, Trash2, 
  Upload, Download, Share2, Check, Copy, RefreshCw, Layers, ShieldAlert,
  Flame, HelpCircle, X, Star
} from 'lucide-react';
import { motion } from 'motion/react';

// --- SCHEMA & INTERFACES ---
export interface StudioConfig {
  activeScene: string;
  particleCount: number;
  particleSize: number;
  particleSpeed: number;
  glowIntensity: number;
  blurAmount: number;
  depthIntensity: number;
  lightingStrength: number;
  bloomStrength: number;
  shadowQuality: string;
  sceneRotationSpeed: number;
  cameraMovementSpeed: number;
  objectDensity: number;
  objectSize: number;
  animationIntensity: number;

  activeThemePreset: string;
  customColors: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    glowColor: string;
    borderColor: string;
    backgroundColor: string;
    textColor: string;
    cardColor: string;
    particleColor: string;
    cursorColor: string;
    shadowColor: string;
  };

  gradientType: 'linear' | 'radial' | 'mesh' | 'animated' | 'aurora';
  gradientColors: string[];
  gradientSpeed: number;
  gradientAngle: number;
  gradientOpacity: number;
  gradientGlow: number;

  cursorStyleType: string;
  cursorSize: number;
  cursorGlow: number;
  cursorSpeed: number;
  cursorElasticity: number;
  cursorBlur: number;
  cursorColor: string;
  cursorTrailLength: number;
  cursorTrailMode: string;
  cursorMagneticStrength: number;

  animationPreset: 'minimal' | 'smooth' | 'dynamic' | 'cinematic' | 'ultra' | 'experimental';
  animationSpeed: number;
  parallaxIntensity: number;
  floatingIntensity: number;
  hoverIntensity: number;
  cardTiltAmount: number;
  scrollAnimationSpeed: number;
  transitionDuration: number;
  motionBlur: boolean;

  glassBlur: number;
  transparency: number;
  borderGlow: number;
  reflectionIntensity: number;
  shadowSoftness: number;
  cardDepth: number;

  headingFont: string;
  bodyFont: string;
  fontWeight: string;
  letterSpacing: number;
  fontScale: number;

  navStyle: 'dock' | 'sidebar-left' | 'sidebar-right' | 'minimal';
  sidebarWidth: number;
  heroAlignment: 'left' | 'center' | 'right';
  cardDensity: 'dense' | 'comfortable' | 'spacious';
  sectionSpacing: number;
  contentWidth: number;
  gridSize: number;

  enableParticles: boolean;
  enableFloating: boolean;
  enableLighting: boolean;
  enableAmbientGlow: boolean;
  enableAurora: boolean;
  enableDepthFog: boolean;
  enableBloom: boolean;
  enableGlassReflection: boolean;
  enableMotionTrails: boolean;
  enableSpotlight: boolean;
  enableFloatingCode: boolean;
  enableOrbitalObjects: boolean;
  enableMousePhysics: boolean;
  enableHologramMode: boolean;
}

// --- INITIAL DEFAULT VALUES ---
export const defaultStudioConfig: StudioConfig = {
  activeScene: 'particle-universe',
  particleCount: 800,
  particleSize: 0.6,
  particleSpeed: 0.1,
  glowIntensity: 0.8,
  blurAmount: 0.5,
  depthIntensity: 0.7,
  lightingStrength: 1.0,
  bloomStrength: 0.8,
  shadowQuality: 'high',
  sceneRotationSpeed: 1.0,
  cameraMovementSpeed: 1.0,
  objectDensity: 1.0,
  objectSize: 1.0,
  animationIntensity: 1.0,

  activeThemePreset: 'purple',
  customColors: {
    primaryColor: '#11021c',
    secondaryColor: '#30064d',
    accentColor: '#e040fb',
    glowColor: '#e040fb',
    borderColor: 'rgba(224, 64, 251, 0.15)',
    backgroundColor: '#050108',
    textColor: '#faf2ff',
    cardColor: 'rgba(48, 6, 77, 0.35)',
    particleColor: '#e040fb',
    cursorColor: '#e040fb',
    shadowColor: 'rgba(224, 64, 251, 0.1)'
  },

  gradientType: 'aurora',
  gradientColors: ['#00e5ff', '#a855f7', '#ec4899', '#3b82f6'],
  gradientSpeed: 2.0,
  gradientAngle: 135,
  gradientOpacity: 0.15,
  gradientGlow: 0.5,

  cursorStyleType: 'glass',
  cursorSize: 32,
  cursorGlow: 0.5,
  cursorSpeed: 0.15,
  cursorElasticity: 0.5,
  cursorBlur: 0.0,
  cursorColor: '#00e5ff',
  cursorTrailLength: 10,
  cursorTrailMode: 'spark',
  cursorMagneticStrength: 0.8,

  animationPreset: 'cinematic',
  animationSpeed: 1.0,
  parallaxIntensity: 1.0,
  floatingIntensity: 1.0,
  hoverIntensity: 1.0,
  cardTiltAmount: 15,
  scrollAnimationSpeed: 1.0,
  transitionDuration: 0.6,
  motionBlur: false,

  glassBlur: 16,
  transparency: 0.35,
  borderGlow: 1.0,
  reflectionIntensity: 1.0,
  shadowSoftness: 1.0,
  cardDepth: 1.0,

  headingFont: 'Poppins',
  bodyFont: 'Inter',
  fontWeight: '500',
  letterSpacing: 0.0,
  fontScale: 1.0,

  navStyle: 'dock',
  sidebarWidth: 280,
  heroAlignment: 'left',
  cardDensity: 'comfortable',
  sectionSpacing: 100,
  contentWidth: 1400,
  gridSize: 3,

  enableParticles: true,
  enableFloating: true,
  enableLighting: true,
  enableAmbientGlow: true,
  enableAurora: true,
  enableDepthFog: true,
  enableBloom: true,
  enableGlassReflection: true,
  enableMotionTrails: true,
  enableSpotlight: true,
  enableFloatingCode: true,
  enableOrbitalObjects: true,
  enableMousePhysics: true,
  enableHologramMode: false,
};

// --- PRESET THEME CONSTANTS (20 THEMES) ---
export const themePresets: { [key: string]: { label: string, customColors: StudioConfig['customColors'] } } = {
  ocean: {
    label: 'Ocean Blue',
    customColors: {
      primaryColor: '#030f1e', secondaryColor: '#0c2340', accentColor: '#00e5ff', glowColor: '#00e5ff', borderColor: 'rgba(0, 229, 255, 0.15)',
      backgroundColor: '#020914', textColor: '#f0f6fc', cardColor: 'rgba(12, 35, 64, 0.35)', particleColor: '#00e5ff', cursorColor: '#00e5ff', shadowColor: 'rgba(0, 229, 255, 0.1)'
    }
  },
  sunset: {
    label: 'Sunset Orange',
    customColors: {
      primaryColor: '#170702', secondaryColor: '#3e1204', accentColor: '#ff5722', glowColor: '#ff5722', borderColor: 'rgba(255, 87, 34, 0.15)',
      backgroundColor: '#080200', textColor: '#fff2ed', cardColor: 'rgba(62, 18, 4, 0.35)', particleColor: '#ff5722', cursorColor: '#ff5722', shadowColor: 'rgba(255, 87, 34, 0.1)'
    }
  },
  purple: {
    label: 'Royal Purple',
    customColors: {
      primaryColor: '#11021c', secondaryColor: '#30064d', accentColor: '#e040fb', glowColor: '#e040fb', borderColor: 'rgba(224, 64, 251, 0.15)',
      backgroundColor: '#050108', textColor: '#faf2ff', cardColor: 'rgba(48, 6, 77, 0.35)', particleColor: '#e040fb', cursorColor: '#e040fb', shadowColor: 'rgba(224, 64, 251, 0.1)'
    }
  },
  forest: {
    label: 'Forest Green',
    customColors: {
      primaryColor: '#051208', secondaryColor: '#11361c', accentColor: '#00e676', glowColor: '#00e676', borderColor: 'rgba(0, 230, 118, 0.15)',
      backgroundColor: '#020703', textColor: '#eefbee', cardColor: 'rgba(17, 54, 28, 0.35)', particleColor: '#00e676', cursorColor: '#00e676', shadowColor: 'rgba(0, 230, 118, 0.1)'
    }
  },
  flutter: {
    label: 'Flutter Official',
    customColors: {
      primaryColor: '#011627', secondaryColor: '#02569b', accentColor: '#13b9fd', glowColor: '#13b9fd', borderColor: 'rgba(19, 185, 253, 0.2)',
      backgroundColor: '#010d1a', textColor: '#f0f5fa', cardColor: 'rgba(2, 86, 155, 0.25)', particleColor: '#13b9fd', cursorColor: '#13b9fd', shadowColor: 'rgba(19, 185, 253, 0.1)'
    }
  },
  cyberpunk: {
    label: 'Cyberpunk Neon',
    customColors: {
      primaryColor: '#0a000f', secondaryColor: '#21002e', accentColor: '#ff007f', glowColor: '#00ffff', borderColor: 'rgba(255, 0, 127, 0.25)',
      backgroundColor: '#030005', textColor: '#fff2f8', cardColor: 'rgba(33, 0, 46, 0.45)', particleColor: '#ff007f', cursorColor: '#00ffff', shadowColor: 'rgba(255, 0, 127, 0.15)'
    }
  },
  matrix: {
    label: 'Matrix Green',
    customColors: {
      primaryColor: '#000a02', secondaryColor: '#012105', accentColor: '#00ff3c', glowColor: '#00ff3c', borderColor: 'rgba(0, 255, 60, 0.15)',
      backgroundColor: '#000501', textColor: '#eefeef', cardColor: 'rgba(1, 33, 5, 0.35)', particleColor: '#00ff3c', cursorColor: '#00ff3c', shadowColor: 'rgba(0, 255, 60, 0.1)'
    }
  },
  nord: {
    label: 'Nordic Space',
    customColors: {
      primaryColor: '#2e3440', secondaryColor: '#3b4252', accentColor: '#88c0d0', glowColor: '#8fbcbb', borderColor: 'rgba(136, 192, 208, 0.25)',
      backgroundColor: '#232831', textColor: '#eceff4', cardColor: 'rgba(46, 52, 64, 0.45)', particleColor: '#88c0d0', cursorColor: '#88c0d0', shadowColor: 'rgba(136, 192, 208, 0.1)'
    }
  },
  amoled: {
    label: 'Pure AMOLED',
    customColors: {
      primaryColor: '#000000', secondaryColor: '#111111', accentColor: '#00ffcc', glowColor: '#00ffcc', borderColor: 'rgba(0, 255, 204, 0.15)',
      backgroundColor: '#000000', textColor: '#ffffff', cardColor: 'rgba(17, 17, 17, 0.65)', particleColor: '#00ffcc', cursorColor: '#00ffcc', shadowColor: 'rgba(0, 255, 204, 0.05)'
    }
  },
  apple: {
    label: 'Apple White',
    customColors: {
      primaryColor: '#fafafa', secondaryColor: '#f5f5f7', accentColor: '#0071e3', glowColor: '#0071e3', borderColor: 'rgba(0, 113, 227, 0.15)',
      backgroundColor: '#ffffff', textColor: '#1d1d1f', cardColor: 'rgba(245, 245, 247, 0.85)', particleColor: '#0071e3', cursorColor: '#0071e3', shadowColor: 'rgba(0, 113, 227, 0.08)'
    }
  },
  tesla: {
    label: 'Tesla Black',
    customColors: {
      primaryColor: '#050505', secondaryColor: '#111111', accentColor: '#e82127', glowColor: '#e82127', borderColor: 'rgba(232, 33, 39, 0.2)',
      backgroundColor: '#000000', textColor: '#ffffff', cardColor: 'rgba(17, 17, 17, 0.75)', particleColor: '#e82127', cursorColor: '#e82127', shadowColor: 'rgba(232, 33, 39, 0.08)'
    }
  },
  material: {
    label: 'Material You',
    customColors: {
      primaryColor: '#1c1b1f', secondaryColor: '#313033', accentColor: '#d0bcff', glowColor: '#381e72', borderColor: 'rgba(208, 188, 255, 0.2)',
      backgroundColor: '#141318', textColor: '#e6e1e5', cardColor: 'rgba(49, 48, 51, 0.45)', particleColor: '#d0bcff', cursorColor: '#d0bcff', shadowColor: 'rgba(208, 188, 255, 0.1)'
    }
  },
  aurora: {
    label: 'Aurora Skies',
    customColors: {
      primaryColor: '#051016', secondaryColor: '#0e2b20', accentColor: '#02ef9f', glowColor: '#00f2fe', borderColor: 'rgba(2, 239, 159, 0.2)',
      backgroundColor: '#020509', textColor: '#ebfdf5', cardColor: 'rgba(14, 43, 32, 0.45)', particleColor: '#02ef9f', cursorColor: '#00f2fe', shadowColor: 'rgba(2, 239, 159, 0.1)'
    }
  },
  galaxy: {
    label: 'Galaxy Astral',
    customColors: {
      primaryColor: '#0a011a', secondaryColor: '#24054a', accentColor: '#c084fc', glowColor: '#ec4899', borderColor: 'rgba(192, 132, 252, 0.2)',
      backgroundColor: '#050010', textColor: '#fbf7ff', cardColor: 'rgba(36, 5, 74, 0.4)', particleColor: '#c084fc', cursorColor: '#ec4899', shadowColor: 'rgba(192, 132, 252, 0.1)'
    }
  },
  luxury: {
    label: 'Gold Luxury',
    customColors: {
      primaryColor: '#0f0b03', secondaryColor: '#2e220a', accentColor: '#d4af37', glowColor: '#ffdf00', borderColor: 'rgba(212, 175, 55, 0.25)',
      backgroundColor: '#050301', textColor: '#faf7f0', cardColor: 'rgba(46, 34, 10, 0.45)', particleColor: '#d4af37', cursorColor: '#ffd700', shadowColor: 'rgba(212, 175, 55, 0.1)'
    }
  },
  rosegold: {
    label: 'Rose Gold',
    customColors: {
      primaryColor: '#170c0e', secondaryColor: '#3d1c21', accentColor: '#c9828e', glowColor: '#ffccd5', borderColor: 'rgba(201, 130, 142, 0.2)',
      backgroundColor: '#0f0607', textColor: '#fff0f2', cardColor: 'rgba(61, 28, 33, 0.4)', particleColor: '#c9828e', cursorColor: '#ffccd5', shadowColor: 'rgba(201, 130, 142, 0.1)'
    }
  },
  sapphire: {
    label: 'Sapphire Deep',
    customColors: {
      primaryColor: '#020b1c', secondaryColor: '#0a2353', accentColor: '#1a75ff', glowColor: '#3b82f6', borderColor: 'rgba(26, 117, 255, 0.2)',
      backgroundColor: '#010510', textColor: '#f0f5ff', cardColor: 'rgba(10, 35, 83, 0.4)', particleColor: '#1a75ff', cursorColor: '#3b82f6', shadowColor: 'rgba(26, 117, 255, 0.1)'
    }
  },
  emerald: {
    label: 'Classic Emerald',
    customColors: {
      primaryColor: '#011206', secondaryColor: '#053114', accentColor: '#39e67d', glowColor: '#10b981', borderColor: 'rgba(57, 230, 125, 0.2)',
      backgroundColor: '#000a03', textColor: '#ecfdf4', cardColor: 'rgba(5, 49, 20, 0.4)', particleColor: '#39e67d', cursorColor: '#10b981', shadowColor: 'rgba(57, 230, 125, 0.1)'
    }
  },
  crimson: {
    label: 'Crimson Fury',
    customColors: {
      primaryColor: '#140103', secondaryColor: '#3c0309', accentColor: '#ff2d55', glowColor: '#ef4444', borderColor: 'rgba(255, 45, 85, 0.2)',
      backgroundColor: '#0a0001', textColor: '#fff0f2', cardColor: 'rgba(60, 3, 9, 0.4)', particleColor: '#ff2d55', cursorColor: '#ef4444', shadowColor: 'rgba(255, 45, 85, 0.1)'
    }
  },
  ice: {
    label: 'Arctic Ice',
    customColors: {
      primaryColor: '#05151c', secondaryColor: '#103040', accentColor: '#5bd5ff', glowColor: '#38bdf8', borderColor: 'rgba(91, 213, 255, 0.2)',
      backgroundColor: '#020a0d', textColor: '#f0fafe', cardColor: 'rgba(16, 48, 64, 0.45)', particleColor: '#5bd5ff', cursorColor: '#38bdf8', shadowColor: 'rgba(91, 213, 255, 0.1)'
    }
  }
};

// --- DYNAMIC FONT MAPS ---
export const availableFonts = [
  { name: 'Poppins', val: '"Poppins", sans-serif' },
  { name: 'Inter', val: '"Inter", sans-serif' },
  { name: 'Geist', val: '"Geist", sans-serif' },
  { name: 'SF Pro', val: '"SF Pro", -apple-system, sans-serif' },
  { name: 'Outfit', val: '"Outfit", sans-serif' },
  { name: 'Space Grotesk', val: '"Space Grotesk", sans-serif' },
  { name: 'Satoshi', val: '"Satoshi", sans-serif' },
  { name: 'JetBrains Mono', val: '"JetBrains Mono", monospace' }
];

// --- 20 DETAILED SCENE ENUMS ---
export const sceneList20 = [
  { id: 'particles', name: 'Particle Universe' },
  { id: 'galaxy', name: 'Flutter Galaxy' },
  { id: 'grid', name: 'Neon Cyber Grid' },
  { id: 'cubes', name: 'Floating Glass Cubes' },
  { id: 'neural', name: 'AI Neural Network' },
  { id: 'orbital', name: 'Dynamic Orbital System' },
  { id: 'matrix-rain', name: 'Code Matrix Rain' },
  { id: 'tech-icons', name: 'Floating Tech Icons' },
  { id: 'digital-city', name: 'Digital City' },
  { id: 'hologram-circles', name: 'Holographic Interface' },
  { id: 'nebula', name: 'Space Nebula' },
  { id: 'data-streams', name: 'Data Stream Universe' },
  { id: 'globe', name: 'Interactive Globe' },
  { id: 'architecture', name: 'Floating Architecture Diagram' },
  { id: 'quantum', name: 'Quantum Energy Field' },
  { id: 'tesla-sparks', name: 'Tesla Style Environment' },
  { id: 'apple-stage', name: 'Apple Event Stage' },
  { id: 'framer-motion', name: 'Framer Inspired Motion' },
  { id: 'workspace-universe', name: 'Developer Workspace' },
  { id: 'custom-scene', name: 'Custom Scene Builder' }
];

export const cursorStyles20 = [
  { id: 'glass', name: 'Glass Ring' },
  { id: 'dot', name: 'Pixel Dot' },
  { id: 'neon', name: 'Neon Glow' },
  { id: 'apple', name: 'Apple Stage' },
  { id: 'cyber', name: 'Cyber HUD' },
  { id: 'magnetic', name: 'Magnetic Blob' },
  { id: 'blob', name: 'Liquid Plasma' },
  { id: 'terminal', name: 'CLI Terminal' },
  { id: 'rocket', name: 'Rocket Propulsion' },
  { id: 'flutter', name: 'Flutter Icon' },
  { id: 'neural', name: 'Neural Aura' },
  { id: 'matrix', name: 'Matrix Glyphs' },
  { id: 'orbit', name: 'Orbital Rings' },
  { id: 'hologram', name: 'Hologram Cross' }
];

// --- STYLING BLOCK GENERATOR ---
export const generateCustomDynamicStyles = (config: StudioConfig): string => {
  const c = config.customColors;
  const gradientStr = config.gradientType === 'aurora' 
    ? `radial-gradient(circle at 10% 20%, ${config.gradientColors[0] || '#00e5ff'} 0%, transparent 40%),
       radial-gradient(circle at 90% 80%, ${config.gradientColors[1] || '#a855f7'} 0%, transparent 40%),
       radial-gradient(circle at 50% 50%, ${config.gradientColors[2] || '#ec4899'} 0%, transparent 50%),
       ${c.backgroundColor}`
    : config.gradientType === 'mesh'
    ? `linear-gradient(${config.gradientAngle}deg, ${config.gradientColors[0] || '#111'}, ${config.gradientColors[1] || '#222'}, ${config.gradientColors[2] || '#333'})`
    : `linear-gradient(${config.gradientAngle}deg, ${c.backgroundColor} 0%, ${c.primaryColor} 100%)`;

  const headingFontVal = availableFonts.find(f => f.name === config.headingFont)?.val || '"Poppins", sans-serif';
  const bodyFontVal = availableFonts.find(f => f.name === config.bodyFont)?.val || '"Inter", sans-serif';

  return `
    :root {
      --primary-color: ${c.primaryColor} !important;
      --secondary-color: ${c.secondaryColor} !important;
      --accent-color: ${c.accentColor} !important;
      --text-primary: ${c.textColor} !important;
      --text-secondary: ${config.activeThemePreset === 'apple' ? '#6e6e73' : 'rgba(255,255,255,0.6)'} !important;
      --text-accent: ${c.accentColor} !important;
      --card-bg: ${c.cardColor} !important;
      --card-border: ${c.borderColor} !important;
      --bg-gradient: ${gradientStr} !important;
      --shadow-color: ${c.shadowColor} !important;
      --form-input-bg: ${c.primaryColor}B3 !important;
      --glass-blur: ${config.glassBlur}px !important;
      --cursor-color: ${c.cursorColor} !important;
      
      /* Typography Overrides */
      --font-sans: ${bodyFontVal} !important;
      --font-primary: ${bodyFontVal} !important;
      --font-editorial: ${headingFontVal} !important;
    }

    body {
      font-family: ${bodyFontVal} !important;
      font-size: ${config.fontScale * 100}% !important;
      letter-spacing: ${config.letterSpacing}px !important;
    }

    h1, h2, h3, h4, h5, h6, .section-title-premium, .hero-title {
      font-family: ${headingFontVal} !important;
      font-weight: ${config.fontWeight} !important;
    }

    /* Card customization overrides */
    .glass-panel, .card-interactive, .service-card, .project-card, .info-card, .contact-form-container, .theme-drawer {
      backdrop-filter: blur(${config.glassBlur}px) !important;
      -webkit-backdrop-filter: blur(${config.glassBlur}px) !important;
      border: 1px solid ${c.borderColor} !important;
      box-shadow: 0 10px 40px ${c.shadowColor} !important;
      transition: all ${config.transitionDuration}s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }

    /* Spotlight / Glow elements */
    .badge-animated {
      border: 1px solid ${c.borderColor} !important;
      box-shadow: 0 0 ${config.gradientGlow * 15}px ${c.glowColor}4D !important;
    }

    /* Color picker glow state helper */
    .text-glow {
      text-shadow: 0 0 ${config.glowIntensity * 15}px ${c.accentColor}80 !important;
    }
  `;
};

// --- COMPONENT IMPLEMENTATION ---
interface CustomStudioEngineProps {
  config: StudioConfig;
  onChange: (newConfig: StudioConfig) => void;
}

export const CustomStudioEngine: React.FC<CustomStudioEngineProps> = ({ config, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'3d' | 'colors' | 'cursor' | 'anim' | 'glass' | 'fonts' | 'layout' | 'power'>('3d');
  const [copied, setCopied] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');

  // Config Studio 2.0 State Extenders
  const [clockTime, setClockTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['particleSize', 'cursorSize', 'glassBlur']);
  const [recentlyChanged, setRecentlyChanged] = useState<string[]>([]);

  const ALL_STUDIO_FIELDS = [
    { label: 'Particle Count', field: 'particleCount', min: 100, max: 2000, step: 50 },
    { label: 'Particle Size', field: 'particleSize', min: 0.1, max: 2.0, step: 0.05 },
    { label: 'Particle Speed', field: 'particleSpeed', min: 0.01, max: 0.8, step: 0.01 },
    { label: 'Bloom Strength', field: 'bloomStrength', min: 0.0, max: 2.0, step: 0.1 },
    { label: 'Rotation Speed', field: 'sceneRotationSpeed', min: 0.0, max: 3.0, step: 0.1 },
    { label: 'Blur Amount', field: 'blurAmount', min: 0.0, max: 1.0, step: 0.05 },
    { label: 'Object Size', field: 'objectSize', min: 0.2, max: 3.0, step: 0.1 },
    { label: 'Object Density', field: 'objectDensity', min: 0.2, max: 3.5, step: 0.1 },
    { label: 'Cursor Size', field: 'cursorSize', min: 8, max: 64, step: 2 },
    { label: 'Cursor Glow', field: 'cursorGlow', min: 0, max: 50, step: 2 },
    { label: 'Cursor Elasticity', field: 'cursorElasticity', min: 0.05, max: 0.95, step: 0.05 },
    { label: 'Cursor Speed', field: 'cursorSpeed', min: 0.1, max: 3.0, step: 0.1 },
    { label: 'Cursor Trail Length', field: 'cursorTrailLength', min: 1, max: 40, step: 1 },
    { label: 'Scroll Speed', field: 'scrollAnimationSpeed', min: 0.1, max: 3.0, step: 0.1 },
    { label: 'Card Tilt Amount', field: 'cardTiltAmount', min: 0, max: 35, step: 1 },
    { label: 'Glass Blur', field: 'glassBlur', min: 0, max: 40, step: 1 },
    { label: 'Transparency', field: 'transparency', min: 0.05, max: 0.95, step: 0.05 },
    { label: 'Font Scale', field: 'fontScale', min: 0.8, max: 1.5, step: 0.05 }
  ];

  const renderSliderWithStar = (label: string, field: string, min: number, max: number, step: number) => {
    const isFav = favorites.includes(field);
    return (
      <div key={field} className="space-y-1.5 p-2.5 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-all select-none">
        <div className="flex justify-between items-center text-[10px]">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleFavorite(field)}
              className={`p-1 rounded cursor-pointer transition-colors ${isFav ? 'text-yellow-400' : 'text-zinc-500 hover:text-white'}`}
              title={isFav ? 'Unpin setting' : 'Pin setting'}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
            </button>
            <span className="font-extrabold uppercase tracking-wider text-zinc-400">{label}</span>
          </div>
          <span className="font-mono text-[var(--accent)] font-extrabold text-[10.5px]">
            {config[field as keyof StudioConfig] as number}
          </span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={config[field as keyof StudioConfig] as number}
          onChange={e => updateField(field as any, parseFloat(e.target.value))}
          className="w-full accent-[var(--accent)] bg-white/10 h-1 rounded-lg cursor-ew-resize outline-none"
        />
      </div>
    );
  };

  // Sound triggering mechanism
  const playBeep = (freq: number, duration: number) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.value = freq;
      gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (_) {}
  };

  const toggleFavorite = (field: string) => {
    if (favorites.includes(field)) {
      setFavorites(prev => prev.filter(x => x !== field));
    } else {
      setFavorites(prev => [...prev, field]);
    }
    playBeep(600, 0.05);
  };

  const handleResetCategory = (tab: string) => {
    let fieldsToReset: (keyof StudioConfig)[] = [];
    if (tab === '3d') {
      fieldsToReset = ['activeScene', 'particleCount', 'particleSize', 'particleSpeed', 'bloomStrength', 'sceneRotationSpeed', 'blurAmount', 'objectSize', 'objectDensity'];
    } else if (tab === 'cursor') {
      fieldsToReset = ['cursorSize', 'cursorGlow', 'cursorElasticity', 'cursorSpeed', 'cursorTrailLength', 'cursorTrailMode'];
    } else if (tab === 'anim') {
      fieldsToReset = ['scrollAnimationSpeed', 'cardTiltAmount'];
    } else if (tab === 'glass') {
      fieldsToReset = ['glassBlur', 'transparency'];
    } else if (tab === 'fonts') {
      fieldsToReset = ['fontScale'];
    } else if (tab === 'layout') {
      fieldsToReset = ['navStyle', 'sidebarWidth', 'contentWidth', 'sectionSpacing'];
    } else if (tab === 'colors') {
      fieldsToReset = ['customColors', 'gradientType', 'gradientColors', 'gradientSpeed', 'gradientAngle'];
    }
    
    if (fieldsToReset.length > 0) {
      const updated = { ...config };
      fieldsToReset.forEach(field => {
        (updated as any)[field] = (defaultStudioConfig as any)[field];
      });
      onChange(updated);
      
      setRecentlyChanged(prev => [
        `Reset ${tab.toUpperCase()} Category`,
        ...prev
      ].slice(0, 4));
      
      playBeep(450, 0.15);
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setClockTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    // Central Floating UI Manager communications
    const handleToggle = () => setIsOpen(prev => !prev);
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('toggle_config_studio', handleToggle);
    window.addEventListener('open_config_studio', handleOpen);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('toggle_config_studio', handleToggle);
      window.removeEventListener('open_config_studio', handleOpen);
    };
  }, []);

  // Auto-populate preset theme colors when selecting template
  const applyPresetColors = (presetId: string) => {
    if (themePresets[presetId]) {
      const updated = {
        ...config,
        activeThemePreset: presetId,
        customColors: { ...themePresets[presetId].customColors }
      };
      onChange(updated);
      setRecentlyChanged(prev => [`ThemePreset → ${presetId}`, ...prev].slice(0, 4));
      playBeep(640, 0.08);
    }
  };

  const updateField = (field: keyof StudioConfig, val: any) => {
    const updated = { ...config, [field]: val };
    onChange(updated);
    
    setRecentlyChanged(prev => {
      const label = `${String(field)} → ${val}`;
      const cleaned = prev.filter(x => !x.startsWith(`${String(field)} →`));
      return [label, ...cleaned].slice(0, 4);
    });
  };

  const updateColorField = (field: keyof StudioConfig['customColors'], val: string) => {
    const updated = {
      ...config,
      activeThemePreset: 'custom',
      customColors: {
        ...config.customColors,
        [field]: val
      }
    };
    onChange(updated);

    setRecentlyChanged(prev => {
      const label = `Color: ${String(field)} → ${val}`;
      const cleaned = prev.filter(x => !x.startsWith(`Color: ${String(field)} →`));
      return [label, ...cleaned].slice(0, 4);
    });
  };

  const resetToDefault = () => {
    if (window.confirm('Are you sure you want to restore all options to initial stable parameters?')) {
      onChange(defaultStudioConfig);
    }
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(config, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTheme = () => {
    const compressedConfig = btoa(JSON.stringify(config));
    const shareableUrl = `${window.location.origin}${window.location.pathname}?theme_config=${compressedConfig}`;
    navigator.clipboard.writeText(shareableUrl);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(importText);
      if (parsed && typeof parsed === 'object') {
        const merged = { ...defaultStudioConfig, ...parsed };
        onChange(merged);
        setImportError('✓ Configuration loaded correctly!');
        setImportText('');
        setTimeout(() => setImportError(''), 3000);
      } else {
        setImportError('Invalid configuration standard');
      }
    } catch (_) {
      setImportError('Syntax Error - failed to parse custom config');
    }
  };

  // URL query share parameter loader
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const themeConfigParam = params.get('theme_config');
    if (themeConfigParam) {
      try {
        const decoded = JSON.parse(atob(themeConfigParam));
        if (decoded && typeof decoded === 'object') {
          onChange({ ...defaultStudioConfig, ...decoded });
        }
      } catch (_) {
        console.error('Failed to parse shareable configuration framework');
      }
    }
  }, []);

  return (
    <>
      {/* Dynamic Style injection loader tag */}
      <style dangerouslySetInnerHTML={{ __html: generateCustomDynamicStyles(config) }} />

      {/* Floating customize studio trigger removed to enforce single entry point rule */}

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[2080] flex items-center justify-end p-4">
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 150 }}
            className="w-full max-w-[540px] h-[92vh] bg-black/95 border border-white/10 rounded-[32px] flex flex-col justify-between overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,229,255,0.08)] p-6 relative"
          >
            {/* Header control buttons + LUXURY DIGITAL LIVE CLOCK */}
            <div className="border-b border-white/10 pb-4 mb-3 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 rounded-xl">
                    <Palette className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider leading-none">Studio Control Center</h3>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest">Active style: <span className="text-[var(--accent)] font-bold">{config.activeThemePreset}</span></span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={resetToDefault} 
                    title="Reset customization matrix"
                    className="p-1.5 border border-white/10 hover:border-rose-400 hover:text-rose-400 rounded-lg text-zinc-400 bg-black/40 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="p-1.5 border border-white/10 hover:border-[var(--accent)] rounded-lg text-zinc-400 bg-black/40"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* INTEGRATED APPLE EVENT LOCAL TIME CARD */}
              <div className="bg-[#050b14] border border-white/5 rounded-2xl p-3 flex items-center justify-between shadow-inner relative overflow-hidden select-none group/time">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent)]/5 rounded-full blur-xl pointer-events-none" />
                <div className="space-y-0.5 relative z-10">
                  <span className="text-[8px] font-mono font-black uppercase text-white/40 tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    LIVE TELEMETRY • SURAT, INDIA
                  </span>
                  <p className="text-md font-mono font-black text-white/90 tracking-wide">{clockTime || '12:00:00 AM'}</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-mono bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 px-2.5 py-1 rounded-md uppercase font-black tracking-widest">
                    IST ZONE (UTC+5:30)
                  </span>
                </div>
              </div>

              {/* CENTRAL LUXURY SEARCH PANEL */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search settings (e.g., particles, blur, speed, colors)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#03060c] border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20"
                />
              </div>
            </div>

            {/* Quick action preset switchers */}
            <div className="flex gap-1.5 overflow-x-auto pb-3 border-b border-white/5 scrollbar-thin select-none">
              {(Object.keys(themePresets) as string[]).slice(0, 8).map(presetKey => (
                <button
                  key={presetKey}
                  onClick={() => applyPresetColors(presetKey)}
                  className={`px-3 py-1 text-[9px] uppercase font-bold rounded-full border whitespace-nowrap transition-all ${config.activeThemePreset === presetKey ? 'bg-[var(--accent)] text-black border-[var(--accent)]' : 'bg-white/5 text-zinc-400 border-white/5 hover:text-white'}`}
                >
                  {themePresets[presetKey].label}
                </button>
              ))}
            </div>

            {/* Layout studio tabs */}
            <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-6">
              {searchQuery ? (
                /* HIGH-FIDELITY CONSOLIDATED ENGINE LOOKUP IN REAL-TIME */
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 px-2.5 py-1.5 rounded-xl text-[9px] font-bold">
                    <span className="text-cyan-400">SEARCHING PARAMETERS FOR : "{searchQuery.toUpperCase()}"</span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-1.5 py-0.5 rounded bg-black/40 text-rose-400 border border-rose-500/10 hover:border-rose-500/30 uppercase text-[8px]"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="space-y-3.5 pb-6">
                    {[
                      { label: 'Particle Render Count', field: 'particleCount', min: 100, max: 2000, step: 50, tab: '3D SCENE' },
                      { label: 'Individual Particle Size', field: 'particleSize', min: 0.1, max: 2.0, step: 0.05, tab: '3D SCENE' },
                      { label: 'Particle Velocity Speed', field: 'particleSpeed', min: 0.01, max: 0.8, step: 0.01, tab: '3D SCENE' },
                      { label: 'Atmosphere Bloom Strength', field: 'bloomStrength', min: 0.0, max: 2.0, step: 0.1, tab: '3D SCENE' },
                      { label: 'World Rotation Velocity', field: 'sceneRotationSpeed', min: 0.0, max: 3.0, step: 0.1, tab: '3D SCENE' },
                      { label: 'Holographic Blur Level', field: 'blurAmount', min: 0.0, max: 1.0, step: 0.05, tab: '3D SCENE' },
                      { label: 'Main Cursor Size Pixels', field: 'cursorSize', min: 8, max: 64, step: 2, tab: 'CURSOR' },
                      { label: 'Cursor Outer Glow Radius', field: 'cursorGlow', min: 0, max: 50, step: 2, tab: 'CURSOR' },
                      { label: 'Cursor Fluid Elasticity', field: 'cursorElasticity', min: 0.05, max: 0.95, step: 0.05, tab: 'CURSOR' },
                      { label: 'Simulated Trail Depth', field: 'cursorTrailLength', min: 1, max: 40, step: 1, tab: 'CURSOR' },
                      { label: 'Scroll Intensity Velocity', field: 'scrollAnimationSpeed', min: 0.1, max: 3.0, step: 0.1, tab: 'ANIMS' },
                      { label: 'Hologram Tilt Multiplier', field: 'cardTiltAmount', min: 0, max: 35, step: 1, tab: 'ANIMS' },
                      { label: 'Glass Panel Diffusion Blur', field: 'glassBlur', min: 0, max: 40, step: 1, tab: 'GLASS' },
                      { label: 'Glass Sheet Transparency', field: 'transparency', min: 0.05, max: 0.95, step: 0.05, tab: 'GLASS' },
                      { label: 'Dynamic Typography Scale', field: 'fontScale', min: 0.8, max: 1.5, step: 0.05, tab: 'FONTS' }
                    ]
                    .filter(item => 
                      item.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      item.field.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(item => (
                      <div key={item.field} className="space-y-1.5 bg-black/40 border border-white/5 p-2.5 rounded-xl">
                        <div className="flex justify-between items-center text-[9.5px] uppercase">
                          <span className="font-bold text-white/70">{item.label}</span>
                          <span className="font-mono text-[var(--accent)] font-extrabold">{config[item.field as keyof StudioConfig] as any}</span>
                        </div>
                        <input
                          type="range"
                          min={item.min}
                          max={item.max}
                          step={item.step}
                          value={config[item.field as keyof StudioConfig] as number}
                          onChange={(e) => updateField(item.field as keyof StudioConfig, parseFloat(e.target.value))}
                          className="w-full accent-[var(--accent)] bg-white/10 h-1 rounded-lg cursor-ew-resize outline-none"
                        />
                        <div className="flex items-center justify-between text-[7px] text-zinc-500 font-mono">
                          <span>TAB: {item.tab}</span>
                          <span>FIELD: {item.field}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* Category switches */}
                  <div className="grid grid-cols-4 gap-1 border-b border-white/5 pb-3">
                {[
                  { id: '3d', label: '3D Scene', icon: Sparkles },
                  { id: 'colors', label: 'Colors', icon: Palette },
                  { id: 'cursor', label: 'Cursor', icon: Terminal },
                  { id: 'anim', label: 'Anims', icon: Flame },
                  { id: 'glass', label: 'Glass', icon: Layers },
                  { id: 'fonts', label: 'Fonts', icon: Type },
                  { id: 'layout', label: 'Layout', icon: Layout },
                  { id: 'power', label: 'Power', icon: Sliders }
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-2 px-1 text-[9px] rounded-xl flex flex-col items-center gap-1 font-semibold uppercase tracking-wider border transition-all ${activeTab === tab.id ? 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30 font-bold' : 'border-transparent text-zinc-400 hover:text-white bg-black/20'}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* DYNAMIC PARAMETER METRICS (PINNED FAVORITES & TELEMETRY CHECKS) */}
              <div className="space-y-4 border-b border-white/5 pb-4 mb-2 mt-2">
                {favorites.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-black text-yellow-400 uppercase tracking-widest flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /> Pinned Parameters
                    </span>
                    <div className="grid grid-cols-2 gap-2 pb-1.5">
                      {ALL_STUDIO_FIELDS
                        .filter(item => favorites.includes(item.field))
                        .map(item => renderSliderWithStar(item.label, item.field, item.min, item.max, item.step))}
                    </div>
                  </div>
                )}

                {recentlyChanged.length > 0 && (
                  <div className="bg-white/[0.01] border border-white/5 p-2.5 rounded-xl">
                    <span className="text-[8px] font-mono font-black text-cyan-400 uppercase tracking-widest block mb-1">Coordinates Monitor Logs</span>
                    <div className="flex flex-wrap gap-1">
                      {recentlyChanged.map((log, idx) => (
                        <span key={idx} className="text-[7.5px] font-mono bg-white/5 text-zinc-300 px-2 py-0.5 rounded border border-white/5 uppercase">
                          {log}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* TAB 1: 3D CANVAS SCENE MANAGER */}
              {activeTab === '3d' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 px-2.5 py-1.5 rounded-xl">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">Category Config</span>
                    <button
                      onClick={() => handleResetCategory('3d')}
                      className="text-[8px] font-mono uppercase px-2 py-0.5 rounded border border-rose-500/25 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all font-black"
                    >
                      Reset Category
                    </button>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider block mb-2">Select Active 3D Scene Matrix (20 Scenes)</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {sceneList20.map(scene => (
                        <button
                          key={scene.id}
                          onClick={() => {
                            updateField('activeScene', scene.id);
                            playBeep(640, 0.08);
                          }}
                          className={`py-1.5 px-2 text-[8px] uppercase tracking-wider font-extrabold text-left rounded-lg border leading-tight transition-all ${config.activeScene === scene.id ? 'bg-[var(--accent)] text-black border-[var(--accent)]' : 'bg-black/35 text-zinc-400 border-white/10 hover:text-white'}`}
                        >
                          {scene.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Slidable properties */}
                  <div className="space-y-3.5 pt-3 border-t border-white/5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block">Fine-tune rendering engine parameters</span>
                    
                    {[
                      { label: 'Particle Count', field: 'particleCount', min: 100, max: 2000, step: 50 },
                      { label: 'Particle Size', field: 'particleSize', min: 0.1, max: 2.0, step: 0.05 },
                      { label: 'Particle Speed', field: 'particleSpeed', min: 0.01, max: 0.8, step: 0.01 },
                      { label: 'Bloom Strength', field: 'bloomStrength', min: 0.0, max: 2.0, step: 0.1 },
                      { label: 'Rotation Speed', field: 'sceneRotationSpeed', min: 0.0, max: 3.0, step: 0.1 },
                      { label: 'Blur Amount', field: 'blurAmount', min: 0.0, max: 1.0, step: 0.05 },
                      { label: 'Object Size', field: 'objectSize', min: 0.2, max: 3.0, step: 0.1 },
                      { label: 'Object Density', field: 'objectDensity', min: 0.2, max: 3.5, step: 0.1 }
                    ].map(slider => renderSliderWithStar(slider.label, slider.field, slider.min, slider.max, slider.step))}
                  </div>
                </div>
              )}

              {/* TAB 2: UNLIMITED COLOR ENGINE */}
              {activeTab === 'colors' && (
                <div className="space-y-4 font-sans text-white">
                  <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 px-2.5 py-1.5 rounded-xl">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">Category Config</span>
                    <button
                      onClick={() => handleResetCategory('colors')}
                      className="text-[8px] font-mono uppercase px-2 py-0.5 rounded border border-rose-500/25 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all font-black"
                    >
                      Reset Category
                    </button>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                      <Palette className="w-4 h-4" /> Live Theme Architect
                    </span>
                    <p className="text-[10px] text-zinc-400 leading-relaxed">Modify individual color chips to configure custom color definitions in real time.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pb-3">
                    {[
                      { label: 'Accent Key color', field: 'accentColor' },
                      { label: 'Primary Shade', field: 'primaryColor' },
                      { label: 'Secondary Shade', field: 'secondaryColor' },
                      { label: 'Primary Text color', field: 'textColor' },
                      { label: 'Card Backdrop fill', field: 'cardColor' },
                      { label: 'Border Framework outline', field: 'borderColor' },
                      { label: 'Unified Background standard', field: 'backgroundColor' },
                      { label: 'Particles glow shader', field: 'particleColor' },
                      { label: 'Cursor highlight point', field: 'cursorColor' },
                      { label: 'Underlay shadow glow factor', field: 'shadowColor' }
                    ].map(colorSetting => (
                      <div key={colorSetting.field} className="flex items-center gap-2 bg-black/40 p-2 border border-white/5 rounded-xl">
                        <input
                          type="color"
                          value={config.customColors[colorSetting.field as keyof StudioConfig['customColors']]}
                          onChange={e => updateColorField(colorSetting.field as any, e.target.value)}
                          className="w-8 h-8 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                        />
                        <div className="flex flex-col">
                          <span className="text-[8px] uppercase tracking-wider text-zinc-400 leading-none mb-1">{colorSetting.label}</span>
                          <span className="text-[10px] text-white font-mono uppercase font-black tracking-tighter leading-none">
                            {config.customColors[colorSetting.field as keyof StudioConfig['customColors']]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Gradient Designer */}
                  <div className="space-y-3 pt-3 border-t border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)] block">Gradient designer workspace</span>
                    
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-500 block font-mono">Gradient model pattern</label>
                      <div className="grid grid-cols-3 gap-1">
                        {['aurora', 'mesh', 'linear', 'radial', 'animated'].map(gradType => (
                          <button
                            key={gradType}
                            onClick={() => updateField('gradientType', gradType)}
                            className={`py-1 text-[8px] uppercase font-bold rounded-lg border text-center transition-all ${config.gradientType === gradType ? 'bg-[var(--accent)] text-black border-[var(--accent)]' : 'bg-black/35 text-zinc-400 border-white/5'}`}
                          >
                            {gradType}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] text-zinc-400 uppercase">
                        <span>Gradient Animation Speed</span>
                        <span className="font-mono text-cyan-400 font-extrabold">{config.gradientSpeed}</span>
                      </div>
                      <input
                        type="range" min="0.5" max="8.0" step="0.2" value={config.gradientSpeed}
                        onChange={e => updateField('gradientSpeed', parseFloat(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] text-zinc-400 uppercase">
                        <span>Gradient Angle degrees</span>
                        <span className="font-mono text-cyan-400 font-extrabold">{config.gradientAngle}°</span>
                      </div>
                      <input
                        type="range" min="0" max="360" step="10" value={config.gradientAngle}
                        onChange={e => updateField('gradientAngle', parseInt(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CURSOR ENGINE */}
              {activeTab === 'cursor' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 px-2.5 py-1.5 rounded-xl block">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">Category Config</span>
                    <button
                      onClick={() => handleResetCategory('cursor')}
                      className="text-[8px] font-mono uppercase px-2 py-0.5 rounded border border-rose-500/25 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all font-black"
                    >
                      Reset Category
                    </button>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider block mb-2">Select Active Cursor Style State (20 Styles)</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {cursorStyles20.map(style => (
                        <button
                          key={style.id}
                          onClick={() => {
                            updateField('cursorStyleType', style.id);
                            playBeep(640, 0.08);
                          }}
                          className={`py-1.5 px-2 text-[8px] uppercase tracking-wider font-extrabold text-left rounded-lg border leading-tight transition-all ${config.cursorStyleType === style.id ? 'bg-[var(--accent)] text-black border-[var(--accent)]' : 'bg-black/35 text-zinc-400 border-white/10 hover:text-white'}`}
                        >
                          {style.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3.5 pt-3 border-t border-white/5 animate-fade-in">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Interactive trail properties</span>
                    
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-zinc-500 block font-mono">Trail Mode Effect</label>
                      <div className="grid grid-cols-3 gap-1">
                        {['Particle', 'Neon', 'Spark', 'Energy', 'Fire', 'Matrix', 'Digital', 'Galaxy', 'None'].map(trail => (
                          <button
                            key={trail}
                            onClick={() => {
                              updateField('cursorTrailMode', trail.toLowerCase());
                              playBeep(640, 0.08);
                            }}
                            className={`py-1 text-[8px] uppercase font-bold rounded-lg border text-center transition-all ${config.cursorTrailMode === trail.toLowerCase() ? 'bg-[var(--accent)] text-black border-[var(--accent)]' : 'bg-black/35 text-zinc-400 border-white/5'}`}
                          >
                            {trail}
                          </button>
                        ))}
                      </div>
                    </div>

                    {[
                      { label: 'Pointer Core Size', field: 'cursorSize', min: 8, max: 96, step: 2 },
                      { label: 'Pointer Glow strength', field: 'cursorGlow', min: 0.0, max: 2.0, step: 0.1 },
                      { label: 'Follow Elasticity rate', field: 'cursorElasticity', min: 0.05, max: 0.9, step: 0.05 },
                      { label: 'Trail Segment Length', field: 'cursorTrailLength', min: 0, max: 40, step: 2 },
                      { label: 'Magnetic Attraction Factor', field: 'cursorMagneticStrength', min: 0.1, max: 2.0, step: 0.1 }
                    ].map(slider => renderSliderWithStar(slider.label, slider.field, slider.min, slider.max, slider.step))}
                  </div>
                </div>
              )}

              {/* TAB 4: ANIMATIONS */}
              {activeTab === 'anim' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 px-2.5 py-1.5 rounded-xl">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">Category Config</span>
                    <button
                      onClick={() => handleResetCategory('anim')}
                      className="text-[8px] font-mono uppercase px-2 py-0.5 rounded border border-rose-500/25 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all font-black"
                    >
                      Reset Category
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-500 block">Motion Dynamics Preset profiles</label>
                    <div className="grid grid-cols-3 gap-1">
                      {['minimal', 'smooth', 'dynamic', 'cinematic', 'ultra', 'experimental'].map(profile => (
                        <button
                          key={profile}
                          onClick={() => {
                            let speed = 1.0;
                            let cardTilt = 15;
                            if (profile === 'minimal') { speed = 0.2; cardTilt = 0; }
                            else if (profile === 'smooth') { speed = 0.7; cardTilt = 10; }
                            else if (profile === 'cinematic') { speed = 1.2; cardTilt = 20; }
                            else if (profile === 'ultra') { speed = 1.8; cardTilt = 30; }
                            
                            onChange({
                              ...config,
                              animationPreset: profile as any,
                              animationSpeed: speed,
                              cardTiltAmount: cardTilt
                            });
                            playBeep(640, 0.08);
                          }}
                          className={`py-1.5 text-[8px] uppercase font-bold rounded-lg border text-center transition-all ${config.animationPreset === profile ? 'bg-[var(--accent)] text-black border-[var(--accent)]' : 'bg-black/35 text-zinc-400 border-white/5'}`}
                        >
                          {profile}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3.5 pt-3 border-t border-white/5 animate-fade-in">
                    {[
                      { label: 'Overall Motion Speed', field: 'animationSpeed', min: 0.1, max: 3.5, step: 0.1 },
                      { label: 'Scroll Parallax Factor', field: 'parallaxIntensity', min: 0.0, max: 2.5, step: 0.1 },
                      { label: 'Floating object range value', field: 'floatingIntensity', min: 0.0, max: 3.0, step: 0.1 },
                      { label: 'Card Tilt angle degree limit', field: 'cardTiltAmount', min: 0, max: 45, step: 5 },
                      { label: 'Transition Standard Duration', field: 'transitionDuration', min: 0.15, max: 2.0, step: 0.05 }
                    ].map(slider => renderSliderWithStar(slider.label, slider.field, slider.min, slider.max, slider.step))}
                  </div>
                </div>
              )}

              {/* TAB 5: GLASSMORPHISM */}
              {activeTab === 'glass' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 px-2.5 py-1.5 rounded-xl">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">Category Config</span>
                    <button
                      onClick={() => handleResetCategory('glass')}
                      className="text-[8px] font-mono uppercase px-2 py-0.5 rounded border border-rose-500/25 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all font-black"
                    >
                      Reset Category
                    </button>
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-widest text-[#00e5ff] block">Frosted Glass UI parameters</span>

                  {[
                    { label: 'Glass Blur value size', field: 'glassBlur', min: 0, max: 48, step: 2 },
                    { label: 'Transparency opacity factor', field: 'transparency', min: 0.05, max: 0.95, step: 0.05 },
                    { label: 'Thin borders glowing strength', field: 'borderGlow', min: 0.0, max: 2.0, step: 0.1 },
                    { label: 'Interactive spotlight reflection intensity', field: 'reflectionIntensity', min: 0.0, max: 2.0, step: 0.1 },
                    { label: 'Underlay shadow softness', field: 'shadowSoftness', min: 0.0, max: 2.5, step: 0.1 }
                  ].map(slider => renderSliderWithStar(slider.label, slider.field, slider.min, slider.max, slider.step))}
                </div>
              )}

              {/* TAB 6: TYPOGRAPHY */}
              {activeTab === 'fonts' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 px-2.5 py-1.5 rounded-xl">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">Category Config</span>
                    <button
                      onClick={() => handleResetCategory('fonts')}
                      className="text-[8px] font-mono uppercase px-2 py-0.5 rounded border border-rose-500/25 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all font-black"
                    >
                      Reset Category
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider block">Heading Display Font</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {availableFonts.map(f => (
                        <button
                          key={f.name}
                          onClick={() => {
                            updateField('headingFont', f.name);
                            playBeep(640, 0.08);
                          }}
                          className={`py-1.5 px-2 text-[8px] uppercase tracking-wider font-extrabold text-left rounded-lg border leading-tight transition-all ${config.headingFont === f.name ? 'bg-[var(--accent)] text-black border-[var(--accent)]' : 'bg-black/35 text-zinc-400 border-white/10 hover:text-white'}`}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-white/5">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider block">Body Paragraph Font</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {availableFonts.map(f => (
                        <button
                          key={f.name}
                          onClick={() => {
                            updateField('bodyFont', f.name);
                            playBeep(640, 0.08);
                          }}
                          className={`py-1.5 px-2 text-[8px] uppercase tracking-wider font-extrabold text-left rounded-lg border leading-tight transition-all ${config.bodyFont === f.name ? 'bg-[var(--accent)] text-black border-[var(--accent)]' : 'bg-black/35 text-zinc-400 border-white/10 hover:text-white'}`}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-white/5 animate-fade-in">
                    {[
                      { label: 'Typography Spacing width', field: 'letterSpacing', min: -1.5, max: 4.5, step: 0.25 },
                      { label: 'Heading / Paragraph Scale ratio', field: 'fontScale', min: 0.75, max: 1.45, step: 0.05 }
                    ].map(slider => renderSliderWithStar(slider.label, slider.field, slider.min, slider.max, slider.step))}
                  </div>
                </div>
              )}

              {/* TAB 7: LAYOUT */}
              {activeTab === 'layout' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 px-2.5 py-1.5 rounded-xl">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">Category Config</span>
                    <button
                      onClick={() => handleResetCategory('layout')}
                      className="text-[8px] font-mono uppercase px-2 py-0.5 rounded border border-rose-500/25 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all font-black"
                    >
                      Reset Category
                    </button>
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Adaptive grid controls</span>

                  {[
                    { label: 'Sidebar Width size (for side layouts)', field: 'sidebarWidth', min: 200, max: 360, step: 10 },
                    { label: 'Horizontal Content Max Width', field: 'contentWidth', min: 1000, max: 1600, step: 50 },
                    { label: 'Responsive Margin Gutter Spacing', field: 'sectionSpacing', min: 40, max: 160, step: 10 }
                  ].map(slider => renderSliderWithStar(slider.label, slider.field, slider.min, slider.max, slider.step))}
                </div>
              )}

              {/* TAB 8: POWER USER MODE & UTILITIES */}
              {activeTab === 'power' && (
                <div className="space-y-4">
                  <div className="p-3 bg-fuchsia-400/5 border border-fuchsia-400/30 rounded-2xl flex items-start gap-2">
                    <ShieldAlert className="w-5 h-5 text-fuchsia-300 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-black tracking-wider text-fuchsia-300 block leading-none">Power User Configuration Console</span>
                      <p className="text-[9px] text-zinc-400 leading-normal">Fully customize coordinates, render flags, serialize structure as JSON properties, or share with other recruiters directly.</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      onClick={handleExportJSON}
                      className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> : <Download className="w-3.5 h-3.5 text-[var(--accent)]" />}
                      <span>{copied ? 'Copied Custom Config JSON!' : 'Copy Config JSON to Clipboard'}</span>
                    </button>

                    <button
                      onClick={handleShareTheme}
                      className="w-full py-2 bg-indigo-900/40 hover:bg-indigo-900/60 text-indigo-200 border border-indigo-500/30 font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{copiedShare ? 'Copied Shareable URL Link!' : 'Generate Share Link URL'}</span>
                    </button>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">Import Config JSON block</label>
                    <textarea
                      placeholder='Paste customization JSON here (e.g. {"activeScene": "galaxy", "customColors": {...}})...'
                      value={importText}
                      onChange={e => setImportText(e.target.value)}
                      className="w-full h-24 bg-black/50 border border-white/15 rounded-xl p-2.5 outline-none focus:border-[var(--accent)] text-[9px] font-mono text-zinc-300 leading-normal resize-none"
                    />
                    <button
                      onClick={handleImportJSON}
                      className="w-full py-2 bg-gradient-to-r from-orange-400 to-rose-400 text-black font-extrabold text-[10px] uppercase tracking-widest rounded-xl"
                    >
                      <span>Apply Copied Configuration</span>
                    </button>
                    {importError && (
                      <span className="text-[9px] block text-center font-bold text-amber-300 font-mono select-none transition-all">{importError}</span>
                    )}
                  </div>
                </div>
              )}
                </>
              )}
            </div>

            {/* Footer buttons */}
            <div className="border-t border-white/10 pt-4 mt-4 flex items-center justify-between text-[10px] text-zinc-400 select-none">
              <span className="font-mono">config::studio_v5.0.0</span>
              <button 
                onClick={() => {
                  onChange(defaultStudioConfig);
                  setIsOpen(false);
                }} 
                className="text-[var(--accent)] font-bold hover:underline"
              >
                Clear all custom layers
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};
