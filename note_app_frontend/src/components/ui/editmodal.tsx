import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "../../utils/trpcClient";
import { EditModalProps } from "@/interface/common";

const EditModal: React.FC<EditModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  noteToEdit,
  refetch
}) => {
  const [title, setTitle] = useState<string>(noteToEdit.title);
  const [description, setDescription] = useState<string>(noteToEdit.description);
  const [category, setCategory] = useState<string>(noteToEdit.category);

  const updateNoteMutation = trpc.note.update.useMutation({
    onSuccess: () => {
      refetch();
      setIsModalOpen(false);
      setTitle("");
      setDescription("");
      setCategory("");
    },
    onError: (error) => {
      console.error("Error updating note:", error.message);
    },
  });

  useEffect(() => {
    setTitle(noteToEdit.title);
    setDescription(noteToEdit.description);
    setCategory(noteToEdit.category);
  }, [isModalOpen, noteToEdit]);

  const handleSave = (): void => {
    updateNoteMutation.mutate({
      id: noteToEdit.id,
      title,
      description,
      category,
    });
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
    setTitle(noteToEdit.title);
    setDescription(noteToEdit.description);
    setCategory(noteToEdit.category);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            Edit Note
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter the description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none h-28"
            ></textarea>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex justify-end space-x-4 mt-6">
          <Button
            variant="secondary"
            onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
