"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";

export default function MemoryCard({ memory, index, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    message: "",
    mood: "",
    image: "",
  });

  // When edit mode is triggered, fill form with memory details
  useEffect(() => {
    if (isEditing && memory) {
      setForm({
        name: memory.name || "",
        title: memory.title || "",
        message: memory.message || "",
        mood: memory.mood || "",
        image: memory.image || "",
      });
    }
  }, [isEditing]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedMemory = { ...form };
    onEdit(updatedMemory, index);
    
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

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Memory</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-3">
            <div>
              <label className="text-sm">Name</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm">Title</label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm">Message</label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm">Mood</label>
              <Input
                value={form.mood}
                onChange={(e) => setForm({ ...form, mood: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm">Image URL</label>
              <Input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
