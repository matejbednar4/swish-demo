import React, { createContext, useState, useContext } from "react";
import * as customerSdk from "../../sdk/src/routes/customer";

const CustomerContext = createContext<{
  customer: customerSdk.Customer;
  setCustomer: React.Dispatch<React.SetStateAction<customerSdk.Customer>>;
}>({ customer: customerSdk.emptyCustomer, setCustomer: () => {} });

export const useCustomer = () => useContext(CustomerContext);

export const CustomerProvider = ({ children }: { children: any }) => {
  const [customer, setCustomer] = useState<customerSdk.Customer>(
    customerSdk.emptyCustomer
  );

  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};
