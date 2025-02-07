import { createContext, useContext } from "react"
import { RegisterFormData, User } from "../lib/types"
import { useAuth as useAuthHook } from "../hooks/use-auth-hook"

type AuthProviderProps = {
    children: React.ReactNode
}

type AuthProviderState = {
    user: User | undefined
    login: (username: string, password: string) => Promise<{ username: string }>
    signup: (data: RegisterFormData) => Promise<any>
    logout: () => Promise<null>
    isLoading: boolean
    isError: boolean
}

const initialState: AuthProviderState = {
    user: undefined,
    login: async () => ({ username: '' }),
    signup: async () => ({}),
    logout: async () => null,
    isLoading: false,
    isError: false,
}

const AuthContext = createContext<AuthProviderState>(initialState)

export function AuthProvider({ children }: AuthProviderProps) {
    const auth = useAuthHook()

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined)
        throw new Error("useAuth must be used within an AuthProvider")

    return context
}