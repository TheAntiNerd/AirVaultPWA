'use client'
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'authenticated') {
        return (
            <div>
                <p>Signed in as {session?.user?.email}</p>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => signIn('google')}>Sign in with Google</button>
        </div>
    );
}
