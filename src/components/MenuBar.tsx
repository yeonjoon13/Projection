import React, { useState } from 'react';
import axios from 'axios';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


interface MenuBarProps {
  fileId: number;
  onDelete: () => void; 
}

const MenuBar: React.FC<MenuBarProps> = ({ fileId, onDelete }) => {

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/spring/api/v1/file-upload/${fileId}`);
      onDelete(); 
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className='flex gap-1 text-red-600 items-center cursor-pointer' onClick={handleDelete}>
          <TrashIcon className="w-4 h-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
      
    </DropdownMenu>
    
  );
};

export default MenuBar;
