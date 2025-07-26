"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const RegionFilter = () => {
  const [region, setRegion] = useState<string | undefined>(undefined);

  const allRegion = ["All", "Africa", "America", "Asia", "Europe", "Oceania"];

  const handleRegionChange = (value: string) => {
    setRegion(value === "All" ? undefined : value);
    console.log(`Selected region: ${value}`);
    
  };
  return (
    <Select onValueChange={handleRegionChange} value={region}>
      <SelectTrigger className="w-50 py-6 sm:py-7 shadow-sm border-0 text-foreground">
        <SelectValue placeholder="Filter By Region" />
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
