'use client'
import { createContext, useContext, useState, SetStateAction, Dispatch, ReactNode } from 'react';

// type DataContextProps = {
//   children: ReactNode;
// };

// type DataContextType = {
//   loggedInFullName: any;
//   setLoggedInFullName: Dispatch<SetStateAction<any>>;
//   loggedInUserName: any;
//   setLoggedInUserName: Dispatch<SetStateAction<any>>;
// };

const LoginContext = createContext(undefined);

export const LoginContextProvider = ({ children }) => {
  const [loggedInUserId, setLoggedInUserId] = useState('');
  const [loggedInUserName, setLoggedInUserName] = useState('');

  return (
    <LoginContext.Provider value={{ loggedInUserId, setLoggedInUserId, loggedInUserName, setLoggedInUserName}}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContextData = () => {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }

  return context;
};
