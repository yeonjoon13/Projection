'use client';
import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import logoImage from '/public/assets/logo.png';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

export default function Nav() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
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
            if (session?.user) {
                router.refresh(); 
            }
        });

        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, [supabase, router]);

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut();
            setUser(null);
            router.push('/');
            router.refresh(); // Force a refresh after sign out
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className='py-4' style={{ position: 'relative', zIndex: 1000 }}>
            <div className='items-center justify-between flex'>
                <Link href="/" className='flex gap-2 ml-10 items-center text-xl text-black font-medium'>
                    <Image src={logoImage} width="50" height="50" alt="logo" />
                    Projection
                </Link>

                <div className='flex gap-2 mr-10'>
                    {!user && (
                        <>
                            <Link href="/sign-up">
                                <Button className='rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                                    Sign Up
                                </Button>
                            </Link>
                            <Link href="/sign-in">
                                <Button className='rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 border border-black'>
                                    Login
                                </Button>
                            </Link>
                        </>
                    )}
                    {user && (
                        <>
                            <Link href="/dashboard">
                                <Button className='rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 border border-black'>
                                    Dashboard
                                </Button>
                            </Link>
                            <Button
                                onClick={handleSignOut}
                                className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                            >
                                Sign Out
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
