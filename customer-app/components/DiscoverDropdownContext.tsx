import React, { createContext, useContext, useState } from "react";

interface DropdownContextType {
  dropdownValue: string;
  setDropdownValue: React.Dispatch<React.SetStateAction<string>>;
}

const DiscoverDropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

export const DiscoverDropdownProvider = ({ children }: { children: any }) => {
  const [dropdownValue, setDropdownValue] = useState<string>("ANY");

  return (
    <DiscoverDropdownContext.Provider
      value={{ dropdownValue, setDropdownValue }}
    >
      {children}
    </DiscoverDropdownContext.Provider>
  );
};

export const useDropdown = () => {
  const context = useContext(DiscoverDropdownContext);

  if (!context) {
    throw new Error("useDropdown must be used within a DropdownProvider");
  }

  return context;
};
