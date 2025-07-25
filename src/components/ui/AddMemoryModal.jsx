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
import { useState } from "react";

export default function AddMemoryModal({ onAddMemory }) {
  const [form, setForm] = useState({
    name: "",
    title: "",
    message: "",
    image: "",
    mood: "",
  });

  const handleSubmit = () => {
    const newMemory = {
      ...form,
      timestamp: new Date().toLocaleString(),
    };
    onAddMemory(newMemory);
    setForm({ name: "", title: "", message: "", image: "", mood: "" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Memory</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Memory</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {["name", "title", "message", "mood", "image"].map((field) => (
            <div key={field}>
              <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
              {field === "message" ? (
                <Textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
              ) : (
                <Input
                  value={form[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                />
              )}
            </div>
          ))}
          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
