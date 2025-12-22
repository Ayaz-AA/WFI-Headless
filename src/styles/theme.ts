export const colors = {
  primary: {
    orange: '#d46527',
    blue: '#224dd0',
    gradient: {
      from: '#ff512f',
      to: '#f09819',
    },
  },
  text: {
    primary: '#2f2b24',
    secondary: '#364153',
    tertiary: '#4a5565',
    muted: '#6a7282',
    light: '#888d90',
    white: '#ffffff',
  },
  background: {
    white: '#ffffff',
    light: '#f7f9fc',
    beige: '#f4f3f2',
    gray: '#f2f2f2',
    dark: '#090914',
  },
  border: {
    default: '#dcd9d0',
    light: '#e5e7eb',
    dark: '#2f2b24',
    gray: '#d46527',
  },
  status: {
    success: '#2563eb',
    warning: '#f09819',
  },
} as const;

export const typography = {
  fontFamily: {
    heading: ['Bayon', 'sans-serif'],
    body: ['Inter', 'sans-serif'],
    secondary: ['Arimo', 'sans-serif'],
  },
  fontSize: {
    xs: '8px',
    sm: '13px',
    base: '14px',
    md: '15px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '29.1px',
    '5xl': '52px',
    '6xl': '56px',
    '7xl': '68px',
    '8xl': '96px',
    '9xl': '200px',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.18,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
} as const;

export const borderRadius = {
  sm: '2px',
  md: '5px',
  lg: '8px',
  xl: '12px',
  '2xl': '20px',
  '3xl': '34px',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0px 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0px 20px 25px rgba(0, 0, 0, 0.1)',
  card: '0px 490px 137px 0px rgba(166,118,63,0),0px 313px 125px 0px rgba(166,118,63,0.01),0px 176px 106px 0px rgba(166,118,63,0.05),0px 78px 78px 0px rgba(166,118,63,0.09),0px 20px 43px 0px rgba(166,118,63,0.1)',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
} as const;

export const buttonStyles = {
  primary: 'bg-white border-2 border-solid border-white text-[#2f2b24] rounded-[5px] px-5 py-3 font-medium text-sm',
  secondary: 'border border-[#2f2b24] border-solid text-[#2f2b24] rounded-[5px] px-5 py-3 font-medium text-sm',
  outline: 'border-2 border-solid border-white text-white rounded-[5px] px-5 py-3 font-medium text-sm',
  orange: 'border border-[#d46527] border-solid text-[#d46527] rounded-[5px] px-5 py-3 font-medium text-sm',
} as const;

export const containerStyles = {
  maxWidth: '1440px',
  padding: '0 88px',
  paddingMobile: '0 20px',
} as const;

