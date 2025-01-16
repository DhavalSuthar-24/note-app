import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EditModal from "@/components/ui/editmodal";
import { Eye, Pencil, Trash2 } from "lucide-react";
import DetailsModal from "./detailsmodal";
import DeleteModal from "./deletemodal";
import { NoteCardProps } from "@/interface/common";

const NoteCard: React.FC<NoteCardProps> = ({ note, refetch }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);

  const openEditModal = (): void => {
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (): void => {
    setIsDeleteModalOpen(true);
  };

  const openDetailsModal = (): void => {
    setIsDetailsModalOpen(true);
  };

  function truncateText(text: string, wordLimit: number): string {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "…";
    }
    return text;
  }

  const getTagColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "business":
        return "bg-purple-100 text-purple-800";
      case "home":
        return "bg-green-100 text-green-800";
      case "personal":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Card key={note.id} className="relative group">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-4 flex-1">
              <Badge variant="secondary" className={getTagColor(note.category)}>
                {note.category}
              </Badge>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <h3 className="font-medium">{note.title}</h3>
                </div>
                <p className="text-sm text-gray-500">
                  {" "}
                  {truncateText(note.description, 20)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-fuchsia-100"
                onClick={openEditModal}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-indigo-100"
                onClick={openDetailsModal}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                onClick={openDeleteModal}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 text-sm text-gray-400">
          </div>
        </CardContent>
      </Card>

      {isEditModalOpen && (
        <EditModal
          noteToEdit={note}
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          refetch={refetch}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          noteToDelete={note}
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          refetch={refetch}
        />
      )}

      {isDetailsModalOpen && (
        <DetailsModal
          note={note}
          isModalOpen={isDetailsModalOpen}
          setIsModalOpen={setIsDetailsModalOpen}
        />
      )}
    </>
  );
};

export default NoteCard;
