import React from "react";
import { cn } from "@/lib/utils";

interface LoadingIndicatorProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  className,
  size = "md",
  variant = "spinner",
}) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  if (variant === "spinner") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div
          className={cn(
            "border-2 border-t-transparent rounded-full animate-spinner",
            sizes[size],
            "border-primary"
          )}
        />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex space-x-1", className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-full bg-primary animate-pulse-subtle",
              size === "sm"
                ? "h-1.5 w-1.5"
                : size === "md"
                ? "h-2 w-2"
                : "h-2.5 w-2.5",
              i === 1 && "animation-delay-200",
              i === 2 && "animation-delay-400"
            )}
            style={{
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    );
  }

  // Pulse variant
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-secondary",
        size === "sm" ? "h-4 w-8" : size === "md" ? "h-5 w-10" : "h-6 w-12",
        className
      )}
    />
  );
};

export default LoadingIndicator;
