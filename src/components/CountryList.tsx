"use client";
import { useMemo } from "react";
import { useCountries } from "@/lib/CountryContext";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function CountryList({
  region,
  search,
}: {
  search: string;
  region: string | undefined;
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

  if (loading) {
    return (
      <div className="text-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (filteredCountries.length === 0) {
    return <div className="text-center">No countries found.</div>;
  }
  return (
    <div className="mt-8 sm:mt-12 grid grid-cols-1 mx-10 sm:mx-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 sm:gap-20 md:gap-24 lg:gap-20 ">
      {filteredCountries.map((co) => (
        <Card
          key={co.cca3}
          className="min-w-65 justify-self-center py-0 rounded-sm overflow-hidden border-0 shadow-md hover:shadow-sidebar-primary/40 hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out "
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
