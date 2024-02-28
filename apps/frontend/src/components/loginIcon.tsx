import { Avatar, AvatarIcon, Button, Link, NavbarItem } from "@nextui-org/react"
import { useContext } from "react"
import { LoginContext } from "../libs/loginContext"
import { useProfile } from "../hooks/queryHooks"

export const LoginIcon = () => {
    const {isError} = useProfile()
    
    if(!isError) {
        return (
            <NavbarItem>
                <Avatar
                    icon={<AvatarIcon />}
                    classNames={{
                    base: "bg-primary-700",
                    icon: "text-black/80",
                    }}
                />
            </NavbarItem>
        )
    }

    return (
        <>
            <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
            <Button as={Link} color="primary" href="/register" variant="flat">
            Sign Up
            </Button>
            </NavbarItem>
        </>
    )
}
