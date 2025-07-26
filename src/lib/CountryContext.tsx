"use client"
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";
import { Country } from "@/lib/country";

interface CountryContextType {
  countries: Country[];
  loading: boolean;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch countries with specific fields to avoid 400 error ---------
  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca3,flags,population,region,subregion,capital,languages,currencies,borders"
        );
        if (!response.ok) toast.warning("Failed to fetch countries");
        const data: Country[] = await response.json();
        setCountries(data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching countries. Please try again later.");
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  return (
    <CountryContext.Provider value={{ countries, loading }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountries() {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountries must be used within a CountryProvider");
  }
  return context;
}
