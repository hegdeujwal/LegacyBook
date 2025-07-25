// app/page.jsx
"use client";
import MemoryCard from "../components/ui/MemoryCard";
import AddMemoryModal from "../components/ui/AddMemoryModal";
import SearchBar from "../components/ui/SearchBar";
import MemoryCounter from "../components/ui/MemoryCounter";
import { useState, useEffect } from "react";

export default function Home() {
  const [memories, setMemories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("memories");
    if (stored) setMemories(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("memories", JSON.stringify(memories));
  }, [memories]);

  const handleAdd = (memory) => setMemories([memory, ...memories]);

  const filtered = memories.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <AddMemoryModal onAddMemory={handleAdd} />
        <MemoryCounter count={filtered.length} />
      </div>
      <SearchBar onSearch={setSearch} />
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No memories yet. Add one!</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((memory, idx) => (
            <MemoryCard key={idx} memory={memory} />
          ))}
        </div>
      )}
    </main>
  );
}
