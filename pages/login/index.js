import { AuthLayout } from "components/layouts"
import { Login2 } from "components/Login/Login2"

export default function LoginPage() {
  return (
    <AuthLayout title="Acceso">
      {/* <Login /> */}
      <Login2 />
    </AuthLayout>
  )
}
