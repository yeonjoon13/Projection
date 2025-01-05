import React from 'react';
import { User, CalendarHeart } from 'lucide-react';
import { useSession } from '@supabase/supabase-js';
import { supabase } from './supabaseClient'; // Adjust the import according to your file structure

interface HeaderProps {
  collectedBy: string;
  collectedDate: string;
}

const Header: React.FC<HeaderProps> = ({ collectedBy, collectedDate }) => {
  const { data: session } = useSession(); 
  const user = session?.user; 
  const firstName = user?.email; 

  return (
    <header className="mt-10 py-4 px-12">
      <div className="mb-10">
        <h1 className="text-5xl font-bold">{firstName}'s Blood Test</h1>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-600" />
            <span>For {firstName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-600" />
            <span>By {collectedBy}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarHeart className="w-4 h-4 text-gray-600" />
            <span>Collected {collectedDate}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
