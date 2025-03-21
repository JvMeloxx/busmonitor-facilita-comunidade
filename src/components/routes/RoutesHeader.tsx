
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface RoutesHeaderProps {
  companyName: string;
}

const RoutesHeader = ({ companyName }: RoutesHeaderProps) => {
  return (
    <header className="sticky top-0 z-10 bg-background shadow-md p-4">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <Link to="/" className="focus-ring rounded-full p-2">
          <ArrowLeft size={24} />
        </Link>
        
        <h1 className="text-xl font-semibold">
          Rotas e Horários - {companyName}
        </h1>
        
        <div className="w-10"></div> {/* Spacer for alignment */}
      </div>
    </header>
  );
};

export default RoutesHeader;
