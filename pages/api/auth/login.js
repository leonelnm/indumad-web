import { get, post } from "utils/customFetch"

export default async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) {
    return res.status(405).end()
  }

  if (req.method === "POST") {
    console.log("STEP Nextjs: /api/auth/login ")
    const { username, password } = req.body

    const { status, data, error } = await post({
      url: "/auth/login",
      options: {
        body: {
          username,
          password,
        },
      },
      isNextApi: false,
    })

    if (error) {
      res.status(status).json(error)
    } else {
      res.status(status).json(data)
    }
  }

  if (req.method === "GET") {
    console.log("STEP Nextjs: GET /api/auth/login ")
    console.log(req)
    console.log(req.headers.cookie)

    const { status, data, error } = await get({
      url: "/auth/validateToken",
      isNextApi: false,
      options: {},
    })

    if (error) {
      res.status(status).json(error)
    } else {
      res.status(status).json(data)
    }
  }
}
