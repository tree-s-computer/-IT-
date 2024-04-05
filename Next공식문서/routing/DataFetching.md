# Data Fetching, Caching, and Revalidating

데이터 불러오기는 모든 애플리케이션의 핵심 부분입니다. 이 페이지에서는 React와 Next.js에서 데이터를 불러오고, 캐싱하고, 재검증하는 방법을 살펴봅니다.

데이터를 가져오는 방법에는 네 가지가 있습니다:

1. 서버에서 가져오기 사용
2. 서버에서, 타사 라이브러리 사용
3. 클라이언트에서 라우트 핸들러를 통해
4. 클라이언트에서, 타사 라이브러리 사용.

# Fetching Data on the Server with fetch

Next.js는 네이티브 fetch 웹 API를 확장하여 서버의 각 fetch 요청에 대한 캐싱 및 재검증 동작을 구성할 수 있도록 합니다.
React는 fetch를 확장하여 React 컴포넌트 트리를 렌더링하는 동안 fetch 요청을 자동으로 메모화합니다.
서버 컴포넌트, 라우트 핸들러, 서버 액션에서 async/await과 함께 fetch를 사용할 수 있습니다.

### Good to know

Next.js는 쿠키 및 헤더와 같은 서버 컴포넌트에서 데이터를 가져올 때 필요한 유용한 기능을 제공합니다.
이러한 함수는 요청 시간 정보에 의존하기 때문에 경로가 동적으로 렌더링됩니다.
경로 핸들러에서는 경로 핸들러가 React 컴포넌트 트리의 일부가 아니므로 가져오기 요청이 메모화되지 않습니다.
서버 액션에서는 가져오기 요청이 캐시되지 않습니다(기본 캐시: 저장 없음).
TypeScript가 있는 서버 컴포넌트에서 async/await을 사용하려면, TypeScript 5.1.3 이상과 @types/react 18.2.8 이상을 사용해야 합니다.

# Caching Data

캐싱은 데이터를 저장하므로 요청할 때마다 데이터 소스에서 데이터를 다시 가져올 필요가 없습니다.
기본적으로 Next.js는 서버의 데이터 캐시에 가져오기 반환값을 자동으로 캐시합니다.
즉, 빌드 시간 또는 요청 시간에 데이터를 가져와서 캐시한 후 각 데이터 요청에 재사용할 수 있습니다.

````// 'force-cache' is the default, and can be omitted
fetch('https://...', { cache: 'force-cache' })```
````

# Server Actions and Mutations

서버 액션은 서버에서 실행되는 비동기 함수입니다.
서버 및 클라이언트 컴포넌트에서 Next.js 애플리케이션의 양식 제출 및 데이터 변형을 처리하는 데 사용할 수 있습니다.

서버 컴포넌트는 인라인 함수 수준 또는 모듈 수준의 "서버 사용" 지시문을 사용할 수 있습니다.
서버 액션을 인라인하려면 함수 본문 상단에 "use server"를 추가합니다:

```
// Server Component
export default function Page() {
  // Server Action
  async function create() {
    'use server'

    // ...
  }

  return (
    // ...
  )
}
```
