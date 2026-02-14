import { useColor } from "@/hooks/useColor";
import { Fonts } from "@/theme/colors";
import {
  FONT_SIZE,
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  FONT_SIZE_LG,
  FONT_SIZE_XL,
  FONT_SIZE_2XL,
  FONT_SIZE_3XL,
} from "@/theme/globals";
import React, { forwardRef } from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";

/**
 * Echo Text Component
 * 
 * Cartoonish, bold, full of personality.
 * Uses Bricolage Grotesque — a quirky, characterful typeface.
 */

type TextVariant =
  | "body"
  | "title"
  | "subtitle"
  | "caption"
  | "heading"
  | "display"
  | "label"
  | "link"
  | "serif"
  | "mono"
  | "tiny";

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  bold?: boolean;
  lightColor?: string;
  darkColor?: string;
  children: React.ReactNode;
}

export const Text = forwardRef<RNText, TextProps>(
  (
    { variant = "body", bold, lightColor, darkColor, style, children, ...props },
    ref,
  ) => {
    const textColor = useColor("text", { light: lightColor, dark: darkColor });
    const mutedColor = useColor("textMuted");
    const primaryColor = useColor("primary");

    const getTextStyle = (): TextStyle => {
      const baseStyle: TextStyle = {
        color: textColor,
        fontFamily: bold ? Fonts.sansBold : Fonts.sans,
      };

      switch (variant) {
        case "display":
          return {
            ...baseStyle,
            fontSize: FONT_SIZE_3XL,
            fontFamily: Fonts.sansBold,
            fontWeight: "900",
            letterSpacing: -1.5,
            lineHeight: FONT_SIZE_3XL * 1.1,
          };
        case "heading":
          return {
            ...baseStyle,
            fontSize: FONT_SIZE_2XL,
            fontFamily: Fonts.sansBold,
            fontWeight: "800",
            letterSpacing: -0.8,
            lineHeight: FONT_SIZE_2XL * 1.2,
          };
        case "title":
          return {
            ...baseStyle,
            fontSize: FONT_SIZE_XL,
            fontFamily: Fonts.sansBold,
            fontWeight: "700",
            letterSpacing: -0.4,
          };
        case "subtitle":
          return {
            ...baseStyle,
            fontSize: FONT_SIZE_LG,
            fontWeight: "600",
          };
        case "label":
          return {
            ...baseStyle,
            fontSize: FONT_SIZE_SM,
            fontFamily: Fonts.sansBold,
            fontWeight: "700",
            letterSpacing: 0.6,
            textTransform: "uppercase",
            color: mutedColor,
          };
        case "caption":
          return {
            ...baseStyle,
            fontSize: FONT_SIZE_SM,
            fontWeight: "400",
            color: mutedColor,
          };
        case "tiny":
          return {
            ...baseStyle,
            fontSize: FONT_SIZE_XS,
            fontWeight: "500",
            color: mutedColor,
          };
        case "link":
          return {
            ...baseStyle,
            fontSize: FONT_SIZE,
            fontFamily: Fonts.sansBold,
            fontWeight: "600",
            color: primaryColor,
            textDecorationLine: "underline",
          };
        case "serif":
          return {
            ...baseStyle,
            fontSize: FONT_SIZE,
            fontFamily: Fonts.serif,
          };
        case "mono":
          return {
            ...baseStyle,
            fontSize: FONT_SIZE,
            fontFamily: Fonts.mono,
          };
        default: // 'body'
          return {
            ...baseStyle,
            fontSize: FONT_SIZE,
            fontWeight: "400",
            lineHeight: FONT_SIZE * 1.5,
          };
      }
    };

    return (
      <RNText ref={ref} style={[getTextStyle(), style]} {...props}>
        {children}
      </RNText>
    );
  },
);

Text.displayName = "Text";
