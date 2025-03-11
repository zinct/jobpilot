"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/components/dropdown-menu";

export function CustomDropdown({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
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
}) {
  // Find the selected option label
  const selectedOption = options.find((option) =>
    typeof option === "object" ? option.value === value : option === value
  );

  const selectedLabel = selectedOption
    ? typeof selectedOption === "object"
      ? selectedOption.label
      : selectedOption
    : placeholder;

  // Handle option selection
  const handleSelect = (option) => {
    if (onChange) {
      onChange(typeof option === "object" ? option.value : option);
    }
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
          <span className="truncate">{selectedLabel}</span>
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
          const isSelected = optionValue === value;

          return (
            <DropdownMenuItem
              key={index}
              className={`${isSelected ? "bg-white/10" : ""} ${itemClassName}`}
              onClick={() => handleSelect(option)}
            >
              {optionLabel}
              {isSelected && (
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cyan-400"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Example usage component
export function DropdownExample() {
  const [value, setValue] = React.useState("");

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Default Dropdown</h3>
      <CustomDropdown
        options={options}
        value={value}
        onChange={setValue}
        placeholder="Select an option"
      />

      <h3 className="text-lg font-medium">Primary Variant</h3>
      <CustomDropdown
        options={options}
        value={value}
        onChange={setValue}
        variant="primary"
      />

      <h3 className="text-lg font-medium">Full Width</h3>
      <CustomDropdown
        options={options}
        value={value}
        onChange={setValue}
        fullWidth
      />
    </div>
  );
}
