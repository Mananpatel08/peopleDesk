"use client";

import { useUser } from "@/hooks/useAuth";
import { User } from "@/types";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useContext, useEffect, useState, createContext } from "react";

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    refetchCurrentUser: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
    isLoadingCurrentUser: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const { data: currentUser, refetch: refetchCurrentUser, isLoading: isLoadingCurrentUser } = useUser();

    useEffect(() => {
        if (currentUser) {
            setUser(currentUser);
        }
    }, [currentUser]);

    return (
        <UserContext.Provider value={{ user, setUser, refetchCurrentUser, isLoadingCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
