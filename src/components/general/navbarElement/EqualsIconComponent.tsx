// EqualsIconComponent.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface EqualsIconComponentProps {
    isEqualsMenuOpen: boolean;
    handleEqualsClick: () => void;
}

const EqualsIconComponent: React.FC<EqualsIconComponentProps> = ({
    isEqualsMenuOpen,
    handleEqualsClick,
}) => (
    <div className="flex items-center sm:hidden">
        <img
            src={isEqualsMenuOpen ? '/x.svg' : '/equals.svg'}
            alt={isEqualsMenuOpen ? 'Close Menu' : 'Equals Logo'}
            width={isEqualsMenuOpen ? 40 : 100}
            height={isEqualsMenuOpen ? 40 : 100}
            className={cn(
                'cursor-pointer',
                isEqualsMenuOpen ? 'w-10 h-10 mr-[30px]' : 'h-auto'
            )}
            onClick={handleEqualsClick}
        />
    </div>
);

export default EqualsIconComponent;
