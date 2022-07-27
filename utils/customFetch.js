/**
 * Fetch to **url** with **options**, use *nextjs api* by default
 * @param {object} { url, options, isNextApi }
 * @returns {object} {status, ok, error, data}
 */

const controller = new AbortController()

const customFetch = async ({ url, options, isNextApi = false }) => {
  const apipath = isNextApi ? "/api" : process.env.NEXT_PUBLIC_INDUMAD_API

  const defaultHeader = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
  }

  options.credentials = "include"

  options.signal = controller.signal

  options.headers = options.headers
    ? { ...defaultHeader, ...options.headers }
    : defaultHeader

  options.body = JSON.stringify(options.body) || false
  if (!options.body) delete options.body

  setTimeout(() => controller.abort(), 3000)

  const endpoint = `${apipath}${url}`

  console.log(options)

  try {
    const res = await fetch(endpoint, options)
    const data = await res.json()
    return {
      status: res.status,
      ok: res.ok,
      data,
    }
  } catch (error) {
    console.log(error)
    // TODO ADD sentry
    return {
      ok: false,
      status: 500,
      error: {
        name: error.name,
        msg: error.message,
        code: error.code,
      },
    }
  }
}

export const get = async ({ url, options = {}, isNextApi }) => {
  options.method = "GET"
  return await customFetch({ url, options, isNextApi })
}

export const post = async ({ url, options = {}, isNextApi }) => {
  options.method = "POST"
  return await customFetch({ url, options, isNextApi })
}

export const put = async ({ url, options = {}, isNextApi }) => {
  options.method = "PUT"
  return await customFetch({ url, options, isNextApi })
}

export const del = async ({ url, options = {}, isNextApi }) => {
  options.method = "DELETE"
  return await customFetch({ url, options, isNextApi })
}
