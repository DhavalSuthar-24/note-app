import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DetailsModalProps } from "@/interface/common";

const DetailsModal: React.FC<DetailsModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  note,
}) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            {note.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <strong>Category:</strong> {note.category}
          </p>
          <p>
            <strong>Created Time:</strong>{" "}
            {new Date(note.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Description:</strong> {note.description}
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
