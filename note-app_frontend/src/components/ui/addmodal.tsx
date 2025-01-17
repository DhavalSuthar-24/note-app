import React, { useState } from "react";
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
import { AddModalProps } from "@/interface/common";

const AddModal: React.FC<AddModalProps> = ({ isModalOpen, setIsModalOpen, refetch }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const createNoteMutation = trpc.note.create.useMutation({
    onSuccess: () => {
      refetch()
      setIsModalOpen(false);
      setTitle("");
      setDescription("");
      setCategory("");
    },
    onError: (error) => {
      console.error("Error creating note:", error.message);
    },
  });

  const handleSave = (): void => {
    createNoteMutation.mutate({
      title,
      description,
      category,
    });
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
    setTitle("");
    setDescription("");
    setCategory("");
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-lg p-8 bg-white rounded-xl shadow-xl border border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">Add a New Note</DialogTitle>
          <p className="text-sm text-gray-500">Fill out the details below to create a new note.</p>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter the description"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            ></textarea>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <Select value={category} onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg">
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

        <DialogFooter className="mt-6 flex justify-end space-x-4">
          <Button
            variant="secondary"
            onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}>
           Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;