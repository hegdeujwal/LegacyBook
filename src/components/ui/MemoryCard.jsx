"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import AddMemoryModal from "./AddMemoryModal";

export default function MemoryCard({ memory, index, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (updatedMemory) => {
    onEdit(index, updatedMemory);
    setIsEditing(false);
  };

  return (
    <>
      <Card className="relative">
        <CardContent className="p-4 space-y-2">
          {memory.image && (
            <img
              src={memory.image}
              alt="Memory"
              className="w-full h-40 object-cover rounded-md"
            />
          )}
          <h3 className="text-lg font-semibold">{memory.title}</h3>
          <p className="text-sm text-gray-600">{memory.message}</p>
          <p className="text-xs text-right text-gray-400 italic">
            — {memory.name}
          </p>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="w-4 h-4 mr-1" /> Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(index)}
            >
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {isEditing && (
        <AddMemoryModal
          isEditing
          initialMemory={memory}
          onClose={() => setIsEditing(false)}
          onAddMemory={handleEdit}
        />
      )}
    </>
  );
}
