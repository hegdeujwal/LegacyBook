"use client";
import { motion } from "framer-motion";
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

// Mood to Emoji Map
const moodEmojiMap = {
  happy: "😊",
  sad: "😢",
  excited: "🤩",
  nostalgic: "🥹",
  grateful: "🙏",
  romantic: "❤️",
  funny: "😂",
  relaxed: "😌",
  surprised: "😲",
  adventurous: "🏞️",
  thoughtful: "🤔",
  proud: "🎉",
};

export default function MemoryCard({ memory, index, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    message: "",
    mood: "",
    image: "",
    timestamp: "",
  });

  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!memory.timestamp) {
      memory.timestamp = new Date().toLocaleString();
    }
  }, []);

  useEffect(() => {
    if (isEditing && memory) {
      setForm({
        name: memory.name || "",
        title: memory.title || "",
        message: memory.message || "",
        mood: memory.mood || "",
        image: memory.image || "",
        timestamp: new Date().toLocaleString(),
      });
      setPreviewImage(memory.image || "");
    }
  }, [isEditing]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
      setForm({ ...form, image: previewURL });
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedMemory = {
      ...form,
      timestamp: new Date().toLocaleString(),
    };
    onEdit(updatedMemory, index);
    setIsEditing(false);
  };

  const emoji = moodEmojiMap[memory.mood?.toLowerCase()] || "";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.5,
        }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
          transition: { duration: 0.3 },
        }}
      >
        <Card className="relative">
          <CardContent className="p-4 space-y-2">
            <img
              src={memory.image || "/default_img.png"}
              alt={memory.title || "Default Memory Image"}
              className="w-full h-48 object-cover rounded-md"
            />

            <h3 className="text-lg font-semibold">
              {emoji} {memory.title}
            </h3>
            <p className="text-sm text-gray-600">{memory.message}</p>
            <p className="text-xs text-right text-gray-400 italic">
              — {memory.name}
            </p>
            <p className="text-xs text-right text-gray-400">
              ⏱ {memory.timestamp}
            </p>

            <div className="flex justify-end gap-2 mt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(memory)} // instead of opening a local dialog
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
      </motion.div>

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
              <select
                className="w-full px-3 py-2 border rounded-md text-sm"
                value={form.mood}
                onChange={(e) => setForm({ ...form, mood: e.target.value })}
              >
                <option value="">Select a mood</option>
                {Object.keys(moodEmojiMap).map((mood) => (
                  <option key={mood} value={mood}>
                    {moodEmojiMap[mood]}{" "}
                    {mood.charAt(0).toUpperCase() + mood.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm">Image Upload</label>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-32 mt-2 rounded-md object-cover"
                />
              )}
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
