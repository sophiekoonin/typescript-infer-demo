import { paths } from './api'

function fetcher<P extends keyof paths, M extends Method<P>>(basePath: P, method: M) { return async (params?: Params<P, M>) => {
  const pathParams = basePath.match(/{([^}]+)}/g);
  let path = basePath as string;
  if (params?.path) {
    pathParams?.forEach((param) => {
      const paramName = param.replace(/{|}/g, params.path?.[param]);
      path = path.replace(param, `\${params.path.${paramName}}`);
    });
  }

  const fetchUrl = new URL(path, 'https://api.example.com');
  
  if (params?.query) {
    const queryParams = new URLSearchParams();
    Object.entries(params.query).forEach(([key, value]) => {
      fetchUrl.searchParams.append(key, value as string);
    });
    fetchUrl.search = queryParams.toString();
  }

  const init: RequestInit = {
    method: method as string,
  }

  if (params?.requestBody) {
    init.body = JSON.stringify(params.requestBody);
    init.headers = {
      'Content-Type': 'application/json',
    };
  }
  return fetch(fetchUrl, init).then((res) => res.json() as unknown as ResponseType<P, M>);
}
}
const birdsFetcher = fetcher('/birds/{birdId}', 'get');

type _Params<P extends keyof paths, M extends Method<P>> =
 P extends { 
  parameters?: {
    query?: infer PQ;
    path?: infer PP;
  }} ? { query?: PQ; path?: PP } : unknown & paths[P][M] extends {
    parameters: {
      query?: infer MQ;
      path?: infer MP;
    },
    requestBody?: infer RB;
  } ? {
    query?: MQ;
    path?:  MP; 
    requestBody?: RB;
 } : never;

type Params<P extends keyof paths, M extends Method<P>> =
(_Params<P, M>['query'] extends undefined ? { query?: never } : { query: _Params<P, M>['query'] }) &
(_Params<P, M>['path'] extends undefined ? { path?: never } : { path: _Params<P, M>['path'] }) &
(_Params<P, M>['requestBody'] extends undefined ? { requestBody?: never} : { requestBody: _Params<P, M>['requestBody'] });

  

async function main() {
  const data = await birdsFetcher({ path:  { birdId: 4 }});
  console.log(data);
}
main();

type Method<P extends keyof paths> = Exclude<keyof paths[P], 'parameters'>;

type ResponseType<P extends keyof paths, M extends Method<P>> = paths[P][M] extends { responses: { 200: { content: { 'application/json': infer R } } } } ? R : never;


