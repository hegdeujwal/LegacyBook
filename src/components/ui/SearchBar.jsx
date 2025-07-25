"use client";
import { Input } from "@/components/ui/input";

export default function SearchBar({ onSearch }) {
  return (
    <Input
      placeholder="Search by name, title, or message..."
      onChange={(e) => onSearch(e.target.value)}
      className="mb-4"
    />
  );
}
