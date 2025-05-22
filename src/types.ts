import { schema } from './api'

type _Params<
  P extends keyof schema,
  M extends keyof schema[P]
> = schema[P][M] extends {
  parameters: {
    query?: infer MQ
    path?: infer MP
  }
  requestBody?: infer RB
}
  ? {
      query: MQ
      path: MP
      requestBody: RB extends { content: infer R } ? R : never
    }
  : never

export type Method<P extends keyof schema> = Exclude<
  keyof schema[P],
  'parameters'
>

export type ResponseT<
  P extends keyof schema,
  M extends keyof schema[P]
> = schema[P][M] extends { responses: { content: infer R } } ? R : never

export type Params<
  P extends keyof schema,
  M extends keyof schema[P]
> = (_Params<P, M>['query'] extends undefined
  ? { query?: never }
  : { query: _Params<P, M>['query'] }) &
  (_Params<P, M>['path'] extends undefined
    ? { path?: never }
    : { path: _Params<P, M>['path'] }) &
  (_Params<P, M>['requestBody'] extends undefined
    ? { requestBody?: never }
    : { requestBody: _Params<P, M>['requestBody'] })

type GetBirdParams = Params<'/birds/{birdId}', 'get'>
