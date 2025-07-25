import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function UploadPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl shadow-xl border border-neutral-300 bg-white p-8 text-center"
      >
        <div className="flex justify-center mb-4 text-yellow-500">
          <AlertTriangle size={48} />
        </div>
        <h1 className="text-2xl font-bold mb-2">Upload Page Under Construction</h1>
        <p className="text-muted-foreground mb-6">
          We're currently working very hard on this feature. It'll be ready soon!
        </p>
        <Button variant="outline" disabled className="cursor-not-allowed opacity-60">
          Upload Disabled
        </Button>
      </motion.div>
    </div>
  );
}
