import { paths } from './api'

type _Params<P extends keyof paths, M extends Method<P>> = paths[P][M] extends {
  parameters: {
    query?: infer MQ
    path?: infer MP
  }
  requestBody?: infer RB
}
  ? {
      query?: MQ
      path?: MP
      requestBody?: RB extends { content: { 'application/json': infer R } }
        ? R
        : never
    }
  : never

export type Method<P extends keyof paths> = Exclude<
  keyof paths[P],
  'parameters'
>

type SuccessResponse = 200 | 201 | 204

export type ResponseT<
  P extends keyof paths,
  M extends Method<P>
> = paths[P][M] extends { responses: infer R }
  ? {
      [K in keyof R]: K extends SuccessResponse
        ? R[K] extends {
            content: { 'application/json': infer RC }
          }
          ? RC
          : never
        : never
    }[keyof R]
  : never

export type Params<P extends keyof paths, M extends Method<P>> = (_Params<
  P,
  M
>['query'] extends undefined
  ? { query?: never }
  : { query: _Params<P, M>['query'] }) &
  (_Params<P, M>['path'] extends undefined
    ? { path?: never }
    : { path: _Params<P, M>['path'] }) &
  (_Params<P, M>['requestBody'] extends undefined
    ? { requestBody?: never }
    : { requestBody: _Params<P, M>['requestBody'] })

type asdf = Params<'/birds/{birdId}', 'get'>
