import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the AurthContext 
interface AuthContextType {
    isLogged: boolean;
    loggedUserId: string | null;
    setIsLogged: (value: boolean) => void;
    setLoggedUserId: (value: string | null) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

// Create a provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [loggedUserId, setLoggedUserId] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{ isLogged, loggedUserId, setIsLogged, setLoggedUserId }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy access to the context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;


