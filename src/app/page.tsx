"use client";
import SearchInput from "@/components/SearchInput";
import RegionFilter from "@/components/RegionFilter";
import CountryList from "@/components/CountryList";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<string | undefined>(undefined);
  return (
    <main className="container py-6 md:py-12">
      <div className="flex flex-col md:flex-row gap-y-10 md:justify-between md:items-center">
        <SearchInput search={search} setSearch={setSearch} />
        <RegionFilter region={region} setRegion={setRegion} />
      </div>
      <CountryList search={search} region={region} />
    </main>
  );
}
