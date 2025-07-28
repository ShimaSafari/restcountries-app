"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";

const RegionFilter = ({
  region,
  setRegion,
}: {
  region: string | undefined;
  setRegion: (value: string | undefined) => void;
}) => {
  // --------- Available regions from API ---------
  const allRegion = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  // --------- Handle region change ---------
  const handleRegionChange = (value: string) => {
    setRegion(value === "All" ? undefined : value);
    // console.log(`Selected region: ${value}`);
  };
  return (
    <Select onValueChange={handleRegionChange} value={region}>
      <SelectTrigger
        className={cn(
          "relative w-50 py-6 sm:py-7 shadow-sm bg-card dark:bg-card data-[placeholder]:text-foreground data-[placeholder]:text-xs focus:border-1 focus:border-sidebar-primary",
          "[&_svg:not([data-slot='icon'])]:text-foreground [&_svg:not([data-slot='icon'])]:opacity-100", // default icon change
          "[&_span]:ml-3 [&_span]:text-sm"
        )}
      >
        <SelectValue placeholder="Filter By Region" className="m-20" />
      </SelectTrigger>

      <SelectContent>
        {allRegion.map((re) => (
          <SelectItem key={re} value={re}>
            {re}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RegionFilter;
