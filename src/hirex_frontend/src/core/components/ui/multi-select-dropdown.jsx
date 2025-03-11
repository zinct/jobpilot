"use client";

import * as React from "react";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/core/components/dropdown-menu";

export function MultiSelectDropdown({
  options = [],
  selectedValues = [],
  onChange,
  placeholder = "Select options",
  variant = "default",
  size = "default",
  className,
  triggerClassName,
  contentClassName,
  itemClassName,
  disabled = false,
  fullWidth = false,
  align = "center",
  side = "bottom",
  maxDisplay = 2,
}) {
  // Handle option selection
  const handleSelect = (value) => {
    if (onChange) {
      if (selectedValues.includes(value)) {
        onChange(selectedValues.filter((v) => v !== value));
      } else {
        onChange([...selectedValues, value]);
      }
    }
  };

  // Get display text
  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;

    const selectedOptions = options
      .filter((option) =>
        selectedValues.includes(
          typeof option === "object" ? option.value : option
        )
      )
      .map((option) => (typeof option === "object" ? option.label : option));

    if (selectedOptions.length <= maxDisplay) {
      return selectedOptions.join(", ");
    }

    return `${selectedOptions.slice(0, maxDisplay).join(", ")} +${
      selectedOptions.length - maxDisplay
    } more`;
  };

  // Button variants
  const buttonVariants = {
    default: "border border-white/10 bg-white/5 text-white hover:bg-white/10",
    primary:
      "bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600",
    outline: "border border-white/10 text-white hover:bg-white/10",
    ghost: "text-white hover:bg-white/10",
  };

  return (
    <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            className={`${buttonVariants[variant]} ${
              fullWidth ? "w-full" : ""
            } justify-between ${triggerClassName}`}
            size={size}
            disabled={disabled}
          >
            <span className="truncate">{getDisplayText()}</span>
            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={`${
            fullWidth ? "w-[var(--radix-dropdown-trigger-width)]" : ""
          } ${contentClassName}`}
          align={align}
          side={side}
        >
          {options.map((option, index) => {
            const optionValue =
              typeof option === "object" ? option.value : option;
            const optionLabel =
              typeof option === "object" ? option.label : option;
            const isSelected = selectedValues.includes(optionValue);

            return (
              <DropdownMenuCheckboxItem
                key={index}
                className={`${
                  isSelected ? "bg-white/10" : ""
                } ${itemClassName}`}
                checked={isSelected}
                onSelect={(e) => {
                  e.preventDefault();
                  handleSelect(optionValue);
                }}
              >
                {optionLabel}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Selected tags display (optional) */}
      {selectedValues.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {options
            .filter((option) =>
              selectedValues.includes(
                typeof option === "object" ? option.value : option
              )
            )
            .map((option, index) => {
              const optionValue =
                typeof option === "object" ? option.value : option;
              const optionLabel =
                typeof option === "object" ? option.label : option;

              return (
                <div
                  key={index}
                  className="flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-950/50 to-violet-950/50 px-2 py-1 text-sm"
                >
                  <span>{optionLabel}</span>
                  <button
                    onClick={() => handleSelect(optionValue)}
                    className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

// Example usage component
export function MultiSelectExample() {
  const [selectedValues, setSelectedValues] = React.useState([]);

  const options = [
    { value: "react", label: "React" },
    { value: "nextjs", label: "Next.js" },
    { value: "typescript", label: "TypeScript" },
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "nodejs", label: "Node.js" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Multi-Select Dropdown</h3>
      <MultiSelectDropdown
        options={options}
        selectedValues={selectedValues}
        onChange={setSelectedValues}
        placeholder="Select skills"
        fullWidth
      />

      <div className="mt-4">
        <p>Selected values: {selectedValues.join(", ") || "None"}</p>
      </div>
    </div>
  );
}
