
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define company types and theme properties
export type CompanyType = 'tarifeZero' | 'ctExpresso' | 'catedral' | null;

interface ThemeContextType {
  company: CompanyType;
  setCompany: (company: CompanyType) => void;
  companyName: string;
  companyColor: string;
  companyLightColor: string;
  resetCompany: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [company, setCompanyState] = useState<CompanyType>(null);

  // Load company selection from localStorage on initial render
  useEffect(() => {
    const savedCompany = localStorage.getItem('selectedCompany') as CompanyType;
    if (savedCompany) {
      setCompanyState(savedCompany);
    }
  }, []);

  // Update localStorage when company changes
  const setCompany = (newCompany: CompanyType) => {
    setCompanyState(newCompany);
    if (newCompany) {
      localStorage.setItem('selectedCompany', newCompany);
    }
  };

  const resetCompany = () => {
    setCompanyState(null);
    localStorage.removeItem('selectedCompany');
  };

  // Define company-specific properties
  let companyName = '';
  let companyColor = '';
  let companyLightColor = '';

  switch(company) {
    case 'tarifeZero':
      companyName = 'Tarifa Zero';
      companyColor = '#22c55e'; // Green-500
      companyLightColor = '#dcfce7'; // Green-100
      break;
    case 'ctExpresso':
      companyName = 'CT Expresso';
      companyColor = '#eab308'; // Yellow-500
      companyLightColor = '#fef9c3'; // Yellow-100
      break;
    case 'catedral':
      companyName = 'Catedral (Kandango)';
      companyColor = '#f97316'; // Orange-500
      companyLightColor = '#ffedd5'; // Orange-100
      break;
    default:
      companyName = 'BusAqui';
      companyColor = '#3b82f6'; // Default blue
      companyLightColor = '#eff6ff'; // Default light blue
  }

  const value = {
    company,
    setCompany,
    companyName,
    companyColor,
    companyLightColor,
    resetCompany
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
