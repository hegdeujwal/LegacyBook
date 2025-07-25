"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export default function MemoryCard({ memory }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-full max-w-sm shadow-lg dark:bg-muted bg-white rounded-2xl">
        <CardContent className="p-5">
          <div className="flex items-center gap-4 mb-4">
            <Avatar>
              <AvatarImage src={memory.image || "/default-avatar.png"} />
            </Avatar>
            <div>
              <p className="font-semibold">{memory.name}</p>
              <p className="text-sm text-gray-500">{memory.timestamp}</p>
            </div>
          </div>
          <p className="text-lg font-bold mb-1">{memory.title}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {memory.message}
          </p>
          {memory.mood && <p className="mt-2 text-xl">{memory.mood}</p>}
        </CardContent>
      </Card>
    </motion.div>
  );
}
