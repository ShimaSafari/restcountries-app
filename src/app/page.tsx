import SearchInput from "@/components/SearchInput";
import RegionFilter from "@/components/RegionFilter";
import CountryList from "@/components/CountryList";
import { useCountries } from '@/lib/CountryContext'

export default function Home() {
  return (
    <main className="container py-6 md:py-12">
      <div className="flex flex-col md:flex-row gap-y-10 md:justify-between md:items-center">
        <SearchInput />
        <RegionFilter />
      </div>
      <CountryList />
    </main>
  );
}
