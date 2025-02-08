import { createContext, useContext } from "react"
import { RegisterFormData, User } from "../lib/types"
import { useAuth as useAuthHook } from "../hooks/use-auth-hook"

type AuthProviderProps = {
    children: React.ReactNode
}

type AuthProviderState = {
    user: User | null
    login: (username: string, password: string) => Promise<User>
    signup: (data: RegisterFormData) => Promise<User>
    logout: () => Promise<null>
    isLoading: boolean
    isError: boolean
}

const initialState: AuthProviderState = {
    user: null,
    login: async () => {
        throw new Error('AuthProvider not initialized')
    },
    signup: async () => {
        throw new Error('AuthProvider not initialized')
    },
    logout: async () => {
        throw new Error('AuthProvider not initialized')
    },
    isLoading: false,
    isError: false,
}

const AuthContext = createContext<AuthProviderState>(initialState)

export function AuthProvider({ children }: AuthProviderProps) {
    const { user, login, signup, logout, isLoading, isError } = useAuthHook()

    const value = {
        user: user || null,
        login,
        signup,
        logout,
        isLoading,
        isError,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}