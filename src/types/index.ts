export type TypographyToken =
  | "h1"
  | "h2"
  | "h3"
  | "h3medium"
  | "subtitle"
  | "body"
  | "body2"
  | "button";

export interface TypographyStyle {
  fontFamily: string;
  fontWeight: number;
  fontSizePx: number;
  lineHeightPx: number;
  letterSpacing: string;
}

export type Typography = Record<TypographyToken, TypographyStyle>;

