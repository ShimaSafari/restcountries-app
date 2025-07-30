"use client";
import SearchInput from "@/components/SearchInput";
import RegionFilter from "@/components/RegionFilter";
import CountryList from "@/components/CountryList";
import { useState } from "react";
import { CountryPagination } from "@/components/CountryPagination";

export default function Home() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 28;
  return (
    <main className="container">
      <div className="sticky top-[80px] z-40 w-full bg-background rounded-b-sm shadow-md shadow-background">
        <div className="flex flex-col gap-y-10 md:flex-row md:items-center md:justify-between">
          <SearchInput search={search} setSearch={setSearch} />
          <RegionFilter region={region} setRegion={setRegion} />
        </div>
      </div>
      <div>
        <CountryList
          search={search}
          region={region}
          page={page}
          itemsPerPage={itemsPerPage}
          setTotalItems={setTotalItems}
        />
      </div>
      <div>
        <CountryPagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </main>
  );
}
