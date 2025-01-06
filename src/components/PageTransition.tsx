import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

interface PageTransitionProps {
    children: ReactNode;
}
function PageTransition({ children }: PageTransitionProps) {
    const [animation, setAnimation] = useState('animate-fadeIn');
    const location = useLocation();

    useEffect(() => {
        setAnimation('animate-slideOut');
        const timer = setTimeout(() => setAnimation('animate-slideIn'), 500);
        console.log('animation')
        return () => clearTimeout(timer);
    }, [location]);

    return (
        <div className={`transition-all duration-500${animation}`}>
            {children}
        </div>
    );
}

export default PageTransition;
