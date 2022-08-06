import { Avatar } from "@mui/material"
import { useAuthContext } from "hooks/context"
import React from "react"

export const AvatarLetter = () => {
  const { user } = useAuthContext()
  const letter = user ? user.name.charAt().toUpperCase() : null

  return <Avatar sx={{ width: 30, height: 30 }}>{letter}</Avatar>
}
