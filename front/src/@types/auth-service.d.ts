type Tokens = {
    access: string
    refresh: string

}

interface AuthServiceProps {
    login: (username: string, password: string) => Promise<number>
    logout: () => void
    isAuthenticated: boolean
    register: (username: string, password: string) => Promise<number>
}

export {AuthServiceProps, Tokens}