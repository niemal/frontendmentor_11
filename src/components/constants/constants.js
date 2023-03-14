export const COLORS = {
  desat_dark_cyan: "hsl(180, 29%, 50%)",
  light_gray_cyan: "hsl(180, 52%, 96%)",
  light_gray_cyan_2: "hsl(180, 31%, 95%)",
  dark_gray_cyan: "hsl(180, 8%, 52%)",
  very_dark_gray_cyan: "hsl(180, 14%, 20%)",
  white: "hsl(0, 0%, 100%)",
};

export const BREAKPOINTS = {
  phone: 600,
  tablet: 1080,
  exclusiveWidth1: 1250,
};

export const QUERIES = {
  phoneAndSmaller: `(max-width: ${BREAKPOINTS.phone / 16}rem)`,
  tabletAndSmaller: `(max-width: ${BREAKPOINTS.tablet / 16}rem)`,
  exclusiveWidth1: `(max-width: ${BREAKPOINTS.exclusiveWidth1 / 16}rem)`,
};
