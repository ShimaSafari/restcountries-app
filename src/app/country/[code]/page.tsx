"use client";
import * as React from "react";
import Image from "next/image";
import { useCountries } from "@/lib/CountryContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoaderCircle, MoveLeft } from "lucide-react";
import Link from "next/link";

export default function CountryDetail({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { countries, loading } = useCountries();
  const router = useRouter();
  const { code } = React.use(params);

  // --------- Find country by code ---------
  const country = countries.find((c) => c.cca3 === code);

  // --------- Handle loading state with skeleton ---------
  if (loading) {
    return (
      <main className="container py-8 flex flex-col gap-4 justify-center items-center">
        <LoaderCircle className="size-10 text-sidebar-primary animate-spin" />
        Loading... please wait
      </main>
    );
  }
  // --------- Handle not found state ---------
  if (!country) {
    return (
      <main className="container py-8 text-center text-xl flex flex-col items-center gap-4">
        <p>Country not found.</p>
        <Button
          onClick={() => router.push("/")}
          className="bg-card text-foreground shadow-lg w-34 flex justify-center gap-x-4 hover:bg-card hover:text-sidebar-primary"
          size="lg"
        >
          <MoveLeft className="size-6" /> Back
        </Button>
      </main>
    );
  }
  return (
    <main className="container">
      {/* -------- 1- div back button */}
      <div className="w-full mb-10">
        <Button
          onClick={() => router.push("/")}
          className="bg-card text-foreground shadow-lg w-34 flex justify-center gap-x-4 hover:bg-card hover:text-sidebar-primary"
          size="lg"
        >
          <MoveLeft className="size-6" /> Back
        </Button>
      </div>
      {/* -------- 2- div content */}

      <div className="w-full grid grid-cols-1 sm:gap-x-10 lg:gap-y-10 lg:gap-x-20 lg:grid-cols-2">
        {/* ---- 2-1 img ----- */}
        <Image
          src={country.flags.svg}
          alt={country.flags.alt ?? country.name.common}
          width={540}
          height={500}
          className="h-auto w-full object-cover rounded-sm shadow"
        />
        {/* ---- 2-2 div data content ----- */}
        <div>
          <h1 className="text-2xl md:text-4xl font-bold my-4">
            {country.name.common}
          </h1>
          {/* --- 2-2-1 grid country most data */}
          <div className="grid grid-cols-1 gap-y-10 sm:gap-x-10 md:grid-cols-2 justify-between">
            <div className="font-extralight tracking-wide flex flex-col gap-2">
              <p>
                Native Name:{" "}
                <span className="text-card-foreground/70">
                  {country.name.official}
                </span>
              </p>
              <p>
                Population:
                <span className="text-card-foreground/70">
                  {" "}
                  {country.population.toLocaleString()}{" "}
                </span>
              </p>
              <p>
                Region:
                <span className="text-card-foreground/70">
                  {" "}
                  {country.region}
                </span>
              </p>
              <p>
                Subregion:{" "}
                <span className="text-card-foreground/70">
                  {country.subregion ?? "N/A"}
                </span>
              </p>
              <p>
                Capital:{" "}
                <span className="text-card-foreground/70">
                  {country.capital?.[0] ?? "N/A"}
                </span>
              </p>
            </div>
            <div className="font-extralight tracking-wide flex flex-col gap-2">
              <p>
                Country Code:{" "}
                <span className="text-card-foreground/70">
                  {country.cca3 ?? "N/A"}
                </span>
              </p>
              <p>
                Currencies:{" "}
                <span className="text-card-foreground/70">
                  {country.currencies
                    ? Object.values(country.currencies)
                        .map((c) => `${c.name}`)
                        .join(", ")
                    : "N/A"}
                </span>
              </p>
              <p>
                Languages:{" "}
                <span className="text-card-foreground/70">
                  {country.languages
                    ? Object.values(country.languages).join(", ")
                    : "N/A"}
                </span>
              </p>
            </div>
          </div>
          {/* --- 2-2-2 grid country borders */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0">
            <p className="font-bold">Border Countries:</p>
            <div className="flex flex-wrap gap-2 col-span-3">
              {country.borders?.length ? (
                country.borders.map((border) => {
                  const borderCountry = countries.find(
                    (c) => c.cca3 === border
                  );
                  return borderCountry ? (
                    <Link key={border} href={`/country/${border}`}>
                      <Button
                        variant="outline"
                        className="bg-card text-foreground shadow-md hover:bg-card hover:text-sidebar-primary"
                      >
                        {borderCountry.name.common}
                      </Button>
                    </Link>
                  ) : null;
                })
              ) : (
                <span>N/A</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
