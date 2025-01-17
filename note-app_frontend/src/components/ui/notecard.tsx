

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EditModal from "@/components/ui/editmodal";
import { Eye, Pencil, Trash2 } from 'lucide-react';
import DetailsModal from "./detailsmodal";
import DeleteModal from "./deletemodal";
import { NoteCardProps } from "@/interface/common";
import { gsap } from "gsap";

const NoteCard: React.FC<NoteCardProps> = ({ note, refetch }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;
    const buttons = buttonsRef.current;

    if (card && content && buttons) {
      gsap.set(buttons, { opacity: 0, y: 10 });

      const enterAnimation = gsap.timeline({ paused: true });
      enterAnimation
        .to(card, { y: -5, duration: 0.3, ease: "power2.out" })
        .to(content, { y: -3, duration: 0.2, ease: "power2.out" }, 0)
        .to(buttons, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0);

      card.addEventListener("mouseenter", () => enterAnimation.play());
      card.addEventListener("mouseleave", () => enterAnimation.reverse());
    }

    return () => {
      if (card) {
        card.removeEventListener("mouseenter", () => {});
        card.removeEventListener("mouseleave", () => {});
      }
    };
  }, []);

  const openEditModal = (): void => {
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (): void => {
    setIsDeleteModalOpen(true);
  };

  const openDetailsModal = (): void => {
    setIsDetailsModalOpen(true);
  };

  const getTagColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "business":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "home":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "personal":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <>
      <Card ref={cardRef} key={note.id} className="relative group overflow-hidden bg-slate-200 hover:bg-slate-300 dark:bg-gray-800 shadow-md hover:shadow-lg .">
        <CardContent ref={contentRef} className="p-4 sm:p-6">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-start">
              <Badge variant="secondary" className={`${getTagColor(note.category)} text-xs`}>
                {note.category}
              </Badge>
              <div ref={buttonsRef} className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900"
                  onClick={openEditModal}
                >
                  <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-indigo-100 dark:hover:bg-indigo-900"
                  onClick={openDetailsModal}
                >
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-red-100 dark:hover:bg-red-900"
                  onClick={openDeleteModal}
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
            <h3 className="font-medium text-lg leading-tight">{note.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
              {note.description}
            </p>
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

