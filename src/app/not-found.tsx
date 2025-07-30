"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button asChild variant="outline" className="mt-4">
        <Link href="/">Back to Home</Link>
      </Button>
    </main>
  );
}
