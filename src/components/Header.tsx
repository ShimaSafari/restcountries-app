import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <div className="bg-card border-0 shadow-sm">
      <header className="container py-5.5 flex justify-between items-center">
        <h1 className="text-sm md:text-2xl font-bold">Where in the world?</h1>
        <ThemeToggle />
      </header>
    </div>
  );
}
