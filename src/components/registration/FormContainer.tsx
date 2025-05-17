
import React from 'react';

interface FormContainerProps {
  children: React.ReactNode;
}

const FormContainer = ({ children }: FormContainerProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 relative overflow-hidden">
      {/* Egyptian flag colors - top decoration */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-party-red via-white to-black"></div>
      
      {children}
    </div>
  );
};

export default FormContainer;
