export interface Note {
    id: number;
    title: string;
    description:string;
    category: string;
    createdAt: string;
    updatedAt?: string;
    refetch?: () => void;
}
export interface AddModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    refetch: ()=> void;
}

export interface DeleteModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    noteToDelete:Note;
    refetch: () => void;
}
export interface DetailsModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    note: Note;
}
export interface EditModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    noteToEdit: { id: number; title: string; description: string; category: string }; 
    refetch: () => void;
}

export interface NoteCardProps {
    note: Note;
    refetch: () => void;
}