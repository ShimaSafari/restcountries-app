"use client";

import { Input } from "./ui/input";
import { Search } from "lucide-react";
export default function SearchInput({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div>
      <div className="relative">
        <div className="absolute left-7 top-0 h-full w-5 flex items-center">
          <Search className="h-5 w-5" />
        </div>
        <Input
          value={search}
          type="searach"
          onChange={handleSearch}
          className="w-full md:w-80 lg:w-120 bg-card dark:bg-card border-0 py-6 sm:py-7 placeholder:text-foreground placeholder:text-xs sm:placeholder:text-sm pl-20 focus-visible:ring-1 focus-visible:ring-sidebar-primary shadow-sm"
          placeholder="Search for a country..."
        />
      </div>
    </div>
  );
}
