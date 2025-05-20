import { paths } from "./api"
import { Method, Params, ResponseT } from "./types"

function fetcher<P extends keyof paths, M extends Method<P>>(
  basePath: P,
  method: M
) {
  return async (params?: Params<P, M>) => {
    const pathParams = basePath.match(/{([^}]+)}/g)
    let path = basePath as string
    if (params?.path) {
      pathParams?.forEach((param) => {
        const paramName = param.replace(/{|}/g, params.path?.[param])
        path = path.replace(param, `\${params.path.${paramName}}`)
      })
    }

    const fetchUrl = new URL(path, "http://localhost:3000")

    if (params?.query) {
      const queryParams = new URLSearchParams()
      Object.entries(params.query).forEach(([key, value]) => {
        fetchUrl.searchParams.append(key, value as string)
      })
      fetchUrl.search = queryParams.toString()
    }

    const init: RequestInit = {
      method: method as string,
    }

    if (params?.requestBody) {
      init.body = JSON.stringify(params.requestBody)
      init.headers = {
        "Content-Type": "application/json",
      }
    }
    return fetch(fetchUrl, init).then(
      (res) => res.json() as unknown as ResponseT<P, M>
    )
  }
}
const birdFetcher = fetcher("/birds/{birdId}", "get")
const addSighting = fetcher("/users/{userId}/sightings", "post")
const listAllBirds = fetcher("/birds", "get")

async function main() {
  const data = await addSighting({
    path: {
      userId: "123",
    },
    requestBody: {
      birdId: 2,
      lat: 1,
      long: 2,
      timestamp: new Date().toISOString(),
    },
  })
  console.log(data)
}
main()
