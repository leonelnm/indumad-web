import { AuthLayout } from "components/layouts"
import { Login } from "components/Login"

export default function LoginPage() {
  return (
    <AuthLayout title="Acceso">
      <Login />
    </AuthLayout>
  )
}
