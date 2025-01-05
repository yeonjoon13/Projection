'use client';
import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User, CalendarHeart } from 'lucide-react';

interface HeaderProps {
  collectedBy: string;
  collectedDate: string;
}

const Header: React.FC<HeaderProps> = ({ collectedBy, collectedDate }) => {
  const [user, setUser] = useState<any | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [supabase]);

  const firstName = user?.email?.split('@')[0]; 

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
