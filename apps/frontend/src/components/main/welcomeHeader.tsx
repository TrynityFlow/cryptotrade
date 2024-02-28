import { useContext } from "react"
import { LoginContext } from "../../libs/loginContext"

export const WelcomeHeader = () => {
    const {user} = useContext(LoginContext)

    return (
        <h2 className="font-semibold text-2xl">
            HI, {user?.username.toUpperCase()}!
        </h2>
    )
}
