import React from "react";

interface TypographyProps {
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "div";
  color?: string;
  className?: string;
  children: React.ReactNode;
  fontSize?: string; // Optional: font size
  fontWeight?: string; // Optional: font weight
  textAlign?: "left" | "center" | "right" | "justify"; // Optional: text alignment
  textTransform?: "uppercase" | "capitalize" | "lowercase"; // Optional: text transformation
  textShadow?: string; // Optional: text shadow effect
  lineHeight?: string; // Optional: line height
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  color = "text-black",
  className = "",
  children,
  fontSize = "text-base", // Default to medium text size
  fontWeight = "font-normal", // Default to normal font weight
  textAlign = "left", // Default to left-aligned text
  textTransform = "none", // Default to no text transformation
  textShadow = "none", // Default to no text shadow
  lineHeight = "leading-normal", // Default line height
}) => {
  const Tag = variant;

  return (
    <Tag
      className={`${color} ${fontSize} ${fontWeight} ${textAlign} ${textTransform} ${textShadow} ${lineHeight} ${className}`}
    >
      {children}
    </Tag>
  );
};

export { Typography };
