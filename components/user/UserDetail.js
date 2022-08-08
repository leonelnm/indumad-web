import { Coding } from "components/Coding"

export const UserDetail = ({ user = null }) => {
  return (
    <>
      <Coding />
      {JSON.stringify(user)}
    </>
  )
}
