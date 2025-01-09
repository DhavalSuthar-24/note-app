import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpcClient";
import { DeleteModalProps } from "@/interface/common";


const DeleteModal: React.FC<DeleteModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  noteToDelete,
}) => {
  const deleteNoteMutation = trpc.note.delete.useMutation({
    onSuccess: () => {
      console.log(`Note with ID ${noteToDelete.id} deleted successfully.`);
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error("Error deleting note:", error.message);
    },
  });

  const handleDelete = () => {
    deleteNoteMutation.mutate(noteToDelete.id);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            Delete Note
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p className="text-sm text-gray-700">
            Are you sure you want to delete the note{" "}
            <span className="font-bold">{noteToDelete.title}</span>?
          </p>
        </div>
        <DialogFooter className="space-x-4">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
            {/* {deleteNoteMutation.isLoading ? "Deleting..." : "Delete"} */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
