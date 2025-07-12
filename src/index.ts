import { schema } from './api'
import { Params, ResponseT } from './types'

function createFetcher<P extends keyof schema, M extends keyof schema[P]>(
  path: P,
  method: M
) {
  return async (params?: Params<P, M>) => {
    const templateParams = path.match(/{([^}]+)}/g)
    let realPath = path as string
    if (params?.path) {
      templateParams?.forEach((templateParam) => {
        const paramName = templateParam.replace(/{|}/g, '')
        realPath = realPath.replace(templateParam, params?.path?.[paramName])
      })
    }

    const baseUrl = 'http://localhost:3000'
    const fetchUrl = new URL(realPath, baseUrl)

    if (params?.query) {
      Object.entries(params.query).forEach(([key, value]) => {
        fetchUrl.searchParams.append(key, value as string)
      })
    }

    const options: RequestInit = {
      method: method as string,
    }

    if (params?.requestBody) {
      options.body = JSON.stringify(params.requestBody)
      options.headers = {
        'Content-Type': 'application/json',
      }
    }
    return fetch(fetchUrl, options).then((res) => res.json() as ResponseT<P, M>)
  }
}
const getBird = createFetcher('/birds/{birdId}', 'get')
const addSighting = createFetcher('/users/{userId}/sightings', 'post')
const listBirds = createFetcher('/birds', 'get')

async function main() {
  getBird({ path: { birdId: 1 } })
  const birds = await listBirds()

  const rsp = await addSighting({
    path: { userId: 1 },
    requestBody: {
      birdId: 2,
      timestamp: '2025-06-04',
      lat: 0,
      long: 0.2228486,
      notes: "it's so cute!",
    },
  })
  console.log(rsp)
}

main()
