export interface Note {
    id: number;
    title: string;
    description:string;
    category: string;
    createdAt: string;
    updatedAt?: string;
}

export interface AddModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}


export interface DeleteModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    noteToDelete:Note;
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
}

export interface NoteCardProps {
    note: Note;
}