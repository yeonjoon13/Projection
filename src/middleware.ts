import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/sign-in', '/sign-up'];

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    
    const supabase = createMiddlewareClient({ req, res });
    
    const { data: { session } } = await supabase.auth.getSession();
    
    if (publicRoutes.includes(req.nextUrl.pathname)) {
        return res;
    }
    
    if (!session) {
        const redirectUrl = new URL('/', req.url);
        return NextResponse.redirect(redirectUrl);
    }
    
    return res;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|public|assets).*)',
    ],
};
