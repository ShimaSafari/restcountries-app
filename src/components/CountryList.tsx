"use client";
import { useEffect, useMemo } from "react";
import { useCountries } from "@/lib/CountryContext";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function CountryList({
  region,
  search,
  page,
  itemsPerPage,
  setTotalItems,
}: {
  search: string;
  region: string | undefined;
  page: number;
  itemsPerPage: number;
  setTotalItems?: (total: number) => void;
}) {
  const { countries, loading } = useCountries();

  // ---- Filter countries based on search and region
  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesRegion = !region || country.region === region;
      return matchesRegion && matchesSearch;
    });
  }, [countries, search, region]);

  // ---- update totalitems for pagination -----
  useEffect(() => {
    if (setTotalItems) {
      setTotalItems(filteredCountries.length);
    }
  }, [filteredCountries, setTotalItems]);

  // ----paginate countries ---------
  const paginatedCountries = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredCountries.slice(start, start + itemsPerPage);
  }, [filteredCountries, page, itemsPerPage]);

  // ---- handle loading skeleton ----
  if (loading) {
    return (
      <div className="mt-8 sm:mt-12 grid grid-cols-1 mx-10 sm:mx-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 sm:gap-20 md:gap-24 lg:gap-20">
        {Array.from({ length: itemsPerPage }).map((_, item) => (
          <Card
            key={item}
            className="min-w-65 justify-self-center py-0 rounded-sm border-0 overflow-hidden shadow-md"
          >
            <CardHeader className="px-0 h-40">
              <Skeleton className="h-40 w-full" />
            </CardHeader>
            <CardContent className="pt-2 pb-10 flex flex-col gap-1">
              <CardTitle className="mb-1.5">
                <Skeleton className="h-7 w-2/3" />
              </CardTitle>
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // ---- handle empty state ---------
  if (filteredCountries.length === 0) {
    return (
      <div className="flex h-40 justify-center items-center">
        <p className="text-center text-foreground text-xl">
          No countries found.
        </p>
      </div>
    );
  }
  return (
    <div className="mt-8 sm:mt-12 grid grid-cols-1 mx-10 sm:mx-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 sm:gap-20 md:gap-24 lg:gap-20 ">
      {paginatedCountries.map((co) => (
        <Card
          key={co.cca3}
          className="w-65 justify-self-center py-0 rounded-sm overflow-hidden border-0 shadow-md hover:shadow-sidebar-primary/40 hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out "
        >
          <Link href={`/country/${co.cca3}`}>
            <CardHeader className="px-0 h-40">
              <Image
                src={co.flags.svg}
                alt={co.flags.alt ?? co.name.common}
                width={262}
                height={160}
                className="h-40 w-full object-cover rounded-t-sm"
              />
            </CardHeader>
            <CardContent className="font-extralight tracking-wide pt-6 pb-11 flex flex-col gap-1">
              <CardTitle className="text-lg font-bold mb-1.5">
                {co.name.common}
              </CardTitle>
              <p>
                Population:
                <span className="text-card-foreground/70">
                  {" "}
                  {co.population.toLocaleString()}{" "}
                </span>
              </p>
              <p>
                Region:
                <span className="text-card-foreground/70"> {co.region}</span>
              </p>
              <p>
                Capital:
                <span className="text-card-foreground/70">
                  {" "}
                  {co.capital?.[0] ?? "N/A"}
                </span>
              </p>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
