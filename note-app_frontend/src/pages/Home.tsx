import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NoteCard from "@/components/ui/notecard";
import AddModel from "../components/ui/addmodal";
import {trpc} from "../utils/trpcClient";
import { Note } from "@/interface/common";


const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);

  const { data, error, isLoading , refetch} = trpc.note.getAll.useQuery({ page:1 });

  useEffect(() => {
    if (data) setNotes(data);
  }, [data]);

  if (isLoading) return <p>Loading notes...</p>;

  if (error) return <p>Error: {error.message}</p>;

  const filteredNotes = notes?.filter((note: Note) => {
    const matchesQuery =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeTab === "all" || note.category.toLowerCase() === activeTab;

    return matchesQuery && matchesCategory;
  });


  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="h-8 w-7 text-primary rounded-lg bg-primary/10 p-1">
            📝
          </div>
          <span className="text-xl font-semibold">Notes</span>
        </div>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search"
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          className="w-full sm:w-auto"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Note
        </Button>
      </div>

      <div className="border-b">
        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="all">ALL</TabsTrigger>
            <TabsTrigger value="personal">PERSONAL</TabsTrigger>
            <TabsTrigger value="home">HOME</TabsTrigger>
            <TabsTrigger value="business">BUSINESS</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes && filteredNotes.length > 0 ? (
          filteredNotes.map((note: Note) => (
            <NoteCard key={note.id} note={note} refetch={refetch}/>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center py-16 text-center">
            <div className="text-gray-400">
              <Search className="h-10 w-10 mx-auto text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">
                No results found
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Try adjusting your search or filter options.
              </p>
            </div>
          </div>
        )}
      </div>

      <AddModel isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} refetch={refetch}/>
    </div>
  );
};

export default Home;
