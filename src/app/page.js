"use client";
import MemoryCard from "../components/ui/MemoryCard";
import AddMemoryModal from "../components/ui/AddMemoryModal";
import SearchBar from "../components/ui/SearchBar";
import MemoryCounter from "../components/ui/MemoryCounter";
import { useState, useEffect } from "react";
import ThemeToggle from "../components/ui/ThemeToggle";

export default function Home() {
  const [memories, setMemories] = useState([]);
  const [search, setSearch] = useState("");
  const [editingMemory, setEditingMemory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("memories");
    if (stored) setMemories(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("memories", JSON.stringify(memories));
  }, [memories]);

  const handleAdd = (memory) => {
    const timestamp = new Date().toLocaleString(); // Human-readable format
    const memoryWithTimestamp = { ...memory, timestamp };
    setMemories([memoryWithTimestamp, ...memories]);
  };

  const handleDelete = (indexToDelete) => {
    const updated = memories.filter((_, i) => i !== indexToDelete);
    setMemories(updated);
  };

  const handleEdit = (updatedMemory, indexToEdit) => {
    const updated = [...memories];
    updated[indexToEdit] = updatedMemory;
    setMemories(updated);
  };
  const handleEditClick = (memory) => {
    setEditingMemory(memory);
    setModalOpen(true);
  };

  const filtered = memories.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-6 max-w-5xl mx-auto bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen transition-colors">
      <div className="flex justify-between items-center mb-4">
        <AddMemoryModal
          triggerLabel="Add Memory"
          onAddMemory={handleAdd}
          onUpdateMemory={(timestamp, updatedMemory) => {
            const index = memories.findIndex((m) => m.timestamp === timestamp);
            if (index !== -1) {
              handleEdit(updatedMemory, index);
            }
          }}
          editingMemory={editingMemory}
          open={modalOpen}
          setOpen={setModalOpen}
        />

        <div className="flex flex-col items-center">
          <MemoryCounter count={filtered.length} />
          <div className="mt-4 self-start ml-16">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <SearchBar onSearch={setSearch} />
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No memories yet. Add one!</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((memory, idx) => (
            <MemoryCard
              key={idx}
              memory={memory}
              index={idx}
              onDelete={handleDelete}
              onEdit={() => handleEditClick(memory)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
