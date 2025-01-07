import React, { createContext, useState, useContext } from "react";
import * as customerSdk from "../../sdk/src/routes/customer";

const CustomerContext = createContext<{
  customer: customerSdk.Customer | undefined;
  setCustomer: React.Dispatch<
    React.SetStateAction<customerSdk.Customer | undefined>
  >;
}>({ customer: undefined, setCustomer: () => {} });

export const useCustomer = () => useContext(CustomerContext);

export const CustomerProvider = ({ children }: { children: any }) => {
  const [customer, setCustomer] = useState<customerSdk.Customer | undefined>(
    undefined
  );

  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};
