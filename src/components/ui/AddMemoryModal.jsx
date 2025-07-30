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
import { toast } from "sonner";

export default function AddMemoryModal({
  onAddMemory,
  onUpdateMemory,
  editingMemory = null,
  triggerLabel = "Add Memory",
  open,
  setOpen,
}) {
  const [form, setForm] = useState({
    name: "",
    title: "",
    message: "",
    mood: "",
    image: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setPreviewImage(null);
    setForm((prev) => ({ ...prev, image: "" }));

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setPreviewImage(base64Image); // Instant preview

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Image }),
        });
        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: base64Image }),
          });

          const data = await res.json();

          if (res.ok) {
            setForm((prev) => ({ ...prev, image: data.url }));
            console.log("Uploaded to Cloudinary:", data.url);
            toast.success("Image uploaded!");
          } else {
            console.error("Cloudinary upload failed:", data.message);
            toast.error("Image upload failed.");
          }
        } catch (err) {
          console.error("Image upload error:", err);
          toast.error("Something went wrong while uploading.");
        }

        const data = await res.json();

        if (res.ok) {
          setForm((prev) => ({ ...prev, image: data.url }));
          console.log("Uploaded to Cloudinary:", data.url);
        } else {
          console.error("Cloudinary upload failed:", data.message);
        }
      } catch (err) {
        console.error("Image upload error:", err);
      } finally {
        setIsUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (isUploading) {
      toast.info("Please wait for the image to finish uploading.");
      return;
    }

    const memory = {
      ...form,
      timestamp: new Date().toLocaleString(),
    };

    if (editingMemory) {
      onUpdateMemory(editingMemory.timestamp, memory);
      toast.success("Memory updated successfully!");
    } else {
      onAddMemory(memory);
      toast.success("Memory added!");
    }

    setForm({ name: "", title: "", message: "", mood: "", image: "" });
    setPreviewImage(null);
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
            <label className="text-sm">Mood</label>
            <select
              value={form.mood}
              onChange={(e) => setForm({ ...form, mood: e.target.value })}
              className="w-full rounded-md border px-3 py-2 text-sm text-black dark:text-white bg-white dark:bg-zinc-900"
            >
              <option value="">Select Mood</option>
              <option value="Happy">😄 Happy</option>
              <option value="Sad">😢 Sad</option>
              <option value="Excited">🤩 Excited</option>
              <option value="Angry">😠 Angry</option>
              <option value="Nostalgic">🕰️ Nostalgic</option>
              <option value="Grateful">🙏 Grateful</option>
              <option value="Romantic">❤️ Romantic</option>
              <option value="Funny">😂 Funny</option>
              <option value="Anxious">😰 Anxious</option>
              <option value="Surprised">😲 Surprised</option>
            </select>
          </div>

          {/* Image Upload */}
          {/* Image Upload */}
          <div>
            <Label>Image</Label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {(previewImage || form.image) && (
              <img
                src={previewImage || form.image}
                alt="Preview"
                className="mt-2 w-full max-h-[400px] object-contain rounded-md border"
              />
            )}
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={isUploading}
          >
            {isUploading
              ? "Uploading..."
              : editingMemory
              ? "Update Memory"
              : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
