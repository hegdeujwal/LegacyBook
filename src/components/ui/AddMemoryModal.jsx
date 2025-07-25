"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export default function AddMemoryModal({
  onAddMemory,
  onUpdateMemory,
  editingMemory = null,
  triggerLabel = "Add Memory",
}) {
  const [form, setForm] = useState({
    name: "",
    title: "",
    message: "",
    mood: "",
    image: "",
  });

  const [open, setOpen] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editingMemory) {
      setForm({
        name: editingMemory.name || "",
        title: editingMemory.title || "",
        message: editingMemory.message || "",
        mood: editingMemory.mood || "",
        image: editingMemory.image || "",
      });
    }
  }, [editingMemory]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const memory = {
      ...form,
      timestamp: new Date().toLocaleString(),
    };

    if (editingMemory) {
      onUpdateMemory(editingMemory.timestamp, memory);
    } else {
      onAddMemory(memory);
    }

    setForm({ name: "", title: "", message: "", mood: "", image: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-6 space-y-4">
        <DialogHeader>
          <DialogTitle>{editingMemory ? "Edit" : "Add"} Memory</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Name */}
          <div>
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Title */}
          <div>
            <Label>Title</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          {/* Message */}
          <div>
            <Label>Message</Label>
            <Textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          {/* Mood */}
          <div>
            <Label>Mood</Label>
            <Input
              value={form.mood}
              onChange={(e) => setForm({ ...form, mood: e.target.value })}
            />
          </div>

          {/* Image Upload */}
          {/* Image Upload */}
          <div>
            <Label>Image</Label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="mt-2 w-full max-h-[400px] object-contain rounded-md border"
              />
            )}
          </div>

          <Button onClick={handleSubmit} className="w-full">
            {editingMemory ? "Update Memory" : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
