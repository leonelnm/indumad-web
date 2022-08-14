// eslint-disable-next-line camelcase
import { AuthLayout } from "components/layouts"
import { Login2 } from "components/Login/Login2"
import { cookieNames } from "utils/cookies"

export default function LoginPage(props) {
  return (
    <AuthLayout title="Acceso">
      {/* <Login /> */}
      <Login2 />
    </AuthLayout>
  )
}

export async function getServerSideProps(context) {
  if (context.req.cookies[cookieNames.token]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  }
}

LoginPage.Auth = false
