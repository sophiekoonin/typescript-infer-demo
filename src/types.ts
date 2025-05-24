import { schema } from './api'

type _Params<
  P extends keyof schema,
  M extends keyof schema[P]
> = schema[P][M] extends {
  parameters: {
    query?: infer Q
    path?: infer PP
  }
  requestBody?: { content: infer RB }
}
  ? {
      query: Q
      path: PP
      requestBody: RB extends unknown ? undefined : RB
    }
  : never

export type ResponseT<
  P extends keyof schema,
  M extends keyof schema[P]
> = schema[P][M] extends { response: { content: infer R } } ? R : never

export type Params<
  P extends keyof schema,
  M extends keyof schema[P]
> = (_Params<P, M>['query'] extends undefined
  ? { query?: never }
  : { query?: _Params<P, M>['query'] }) &
  (_Params<P, M>['path'] extends undefined
    ? { path?: never }
    : { path: _Params<P, M>['path'] }) &
  (_Params<P, M>['requestBody'] extends undefined
    ? { requestBody?: never }
    : { requestBody: _Params<P, M>['requestBody'] })
