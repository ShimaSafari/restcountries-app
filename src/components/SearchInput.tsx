"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
export default function SearchInput() {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(search);
    
    
  };
  return (
    <div className="">
      {/* <Search/> */}
      <Input
        value={search}
        onChange={handleSearch}
        className="w-full md:w-80 lg:w-120 bg-card dark:bg-card border-0 py-6 sm:py-7 placeholder:text-foreground placeholder:text-xs sm:placeholder:text-sm"
        placeholder="Search for a country..."
      />
    </div>
  );
}
