# Data Fetching, Caching, and Revalidating

데이터 불러오기는 모든 애플리케이션의 핵심 부분입니다. 이 페이지에서는 React와 Next.js에서 데이터를 불러오고, 캐싱하고, 재검증하는 방법을 살펴봅니다.

## 데이터를 가져오는 방법 네 가지

1. 서버에서 가져오기 사용
2. 서버에서, 타사 라이브러리 사용
3. 클라이언트에서 라우트 핸들러를 통해
4. 클라이언트에서, 타사 라이브러리 사용.

# Fetch를 사용하여 서버에서 데이터 가져오기

Next.js는 네이티브 fetch 웹 API를 확장하여 서버의 각 fetch 요청에 대한 캐싱 및 재검증 동작을 구성할 수 있도록 합니다. React는 fetch를 확장하여 React 컴포넌트 트리를 렌더링하는 동안 fetch 요청을 자동으로 메모화합니다.

\*서버 컴포넌트, 라우트 핸들러, 서버 액션에서 async/await과 함께 fetch를 사용할 수 있습니다.

## For example

```javascript
async function getData() {
  const res = await fetch("https://api.example.com/...");
  // The return value is _not_ serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <main></main>;
}
```

### Good to know

- Next.js는 쿠키 및 헤더와 같은 서버 컴포넌트에서 데이터를 가져올 때 필요한 유용한 기능을 제공합니다.
- 이러한 함수는 요청 시간 정보에 의존하기 때문에 경로가 동적으로 렌더링됩니다.
- 경로 핸들러에서는 경로 핸들러가 React 컴포넌트 트리의 일부가 아니므로 가져오기 요청이 메모화되지 않습니다.
- 서버 액션에서는 가져오기 요청이 캐시되지 않습니다(기본 캐시: 저장 없음).
- TypeScript가 있는 서버 컴포넌트에서 async/await을 사용하려면, TypeScript 5.1.3 이상과 @types/react 18.2.8 이상을 사용해야 합니다.

# Caching Data

캐싱은 데이터를 저장하므로 요청할 때마다 데이터 소스에서 데이터를 다시 가져올 필요가 없습니다.

기본적으로 Next.js는 서버의 데이터 캐시에 가져오기 반환값을 자동으로 캐시합니다.
즉, 빌드 시간 또는 요청 시간에 데이터를 가져와서 캐시한 후 각 데이터 요청에 재사용할 수 있습니다.

````javascript
// 'force-cache' is the default, and can be omitted
fetch('https://...', { cache: 'force-cache' })```
````

#### 그러나 예외가 있는데, 다음과 같은 경우에는 가져오기 요청이 캐시되지 않습니다:

- Used inside a Server Action.
- Used inside a Route Handler that uses the POST method.

# Revalidating Data

Revalidating은 데이터 캐시를 지우고 최신 데이터를 다시 가져오는 프로세스입니다. 데이터가 변경되어 최신 정보를 표시하고 싶을 때 유용합니다.

캐시된 데이터는 두 가지 방법으로 재검증할 수 있습니다:

1. Time-based Revalidation: 일정 시간이 지나면 데이터를 자동으로 재검증합니다. 이 방법은 자주 변경되지 않고 최신성이 그다지 중요하지 않은 데이터에 유용합니다.

2. On-demand revalidation: 이벤트(예: 양식 제출)를 기반으로 데이터를 수동으로 재검증합니다. 온디맨드 재검증은 태그 기반 또는 경로 기반 접근 방식을 사용하여 데이터 그룹을 한 번에 재검증할 수 있습니다. 이 기능은 가능한 한 빨리 최신 데이터를 표시하려는 경우(예: 헤드리스 CMS의 콘텐츠가 업데이트되는 경우)에 유용합니다.

### Time-based

시간 간격을 두고 데이터를 재검증하려면 fetch의 next.revalidate 옵션을 사용하여 리소스의 캐시 수명(초)을 설정할 수 있습니다.

```javascript
fetch("https://...", { next: { revalidate: 3600 } });
```

### On-demand

서버 액션 또는 라우트 핸들러 내부의 경로(revalidatePath) 또는 캐시 태그(revalidateTag)로 데이터를 온디맨드 방식으로 재검증할 수 있습니다.

Next.js에는 경로 전반에서 가져오기 요청의 무효화를 위한 캐시 태그 시스템이 있습니다.

가져오기를 사용할 때 하나 이상의 태그로 캐시 항목에 태그를 지정하는 옵션이 있습니다. 그런 다음 재검증태그를 호출하여 해당 태그와 관련된 모든 항목의 유효성을 재검증할 수 있습니다. 예를 들어 다음 가져오기 요청은 캐시 태그 컬렉션을 추가합니다:

```javascript
export default async function Page() {
  const res = await fetch("https://...", { next: { tags: ["collection"] } });
  const data = await res.json();
  // ...
}
```

그런 다음 서버 액션에서 재검증태그를 호출하여 "collection"으로 태그된 이 가져오기 호출의 유효성을 재검증할 수 있습니다.

```javascript
"use server";

import { revalidateTag } from "next/cache";

export default async function action() {
  revalidateTag("collection");
}
```

# Error handling and revalidation

데이터 재검증을 시도하는 동안 오류가 발생하면 마지막으로 성공적으로 생성된 데이터가 캐시에서 계속 제공됩니다. 다음 후속 요청 시 Next.js는 데이터 재검증을 다시 시도합니다.

# Opting out of Data Caching

fetch requests are not cached if:

The cache: 'no-store' is added to fetch requests.

The revalidate: 0 option is added to individual fetch requests.

The fetch request is inside a Router Handler that uses the POST method.

The fetch request comes after the usage of headers or cookies.

The const dynamic = 'force-dynamic' route segment option is used.

The fetchCache route segment option is configured to skip cache by default.

The fetch request uses Authorization or Cookie headers and there's an uncached request above it in the component tree.

# Individual fetch Requests

개별 가져오기 요청에 대한 캐싱을 사용하지 않으려면 가져오기의 캐시 옵션을 'no-store'으로 설정하면 됩니다. 이렇게 하면 모든 요청에 대해 데이터를 동적으로 가져오게 됩니다.

# Multiple fetch Requests

경로 세그먼트(예: 레이아웃 또는 페이지)에 여러 개의 가져오기 요청이 있는 경우 세그먼트 구성 옵션을 사용하여 세그먼트의 모든 데이터 요청에 대한 캐싱 동작을 구성할 수 있습니다. 그러나 각 가져오기 요청의 캐싱 동작을 개별적으로 구성하는 것이 좋습니다. 이렇게 하면 캐싱 동작을 보다 세밀하게 제어할 수 있습니다.

# Fetching Data on the Client with Route Handlers

클라이언트 컴포넌트에서 데이터를 가져와야 하는 경우 클라이언트에서 라우트 핸들러를 호출할 수 있습니다. 라우트 핸들러는 서버에서 실행되어 데이터를 클라이언트로 반환합니다. 이는 API 토큰과 같은 민감한 정보를 클라이언트에 노출하고 싶지 않을 때 유용합니다.

# Server Components and Route Handlers

서버 컴포넌트는 서버에서 렌더링되므로 데이터를 가져오기 위해 서버 컴포넌트에서 라우트 핸들러를 호출할 필요가 없습니다. 대신 서버 컴포넌트 내부에서 직접 데이터를 가져올 수 있습니다.

# Fetching Data on the Client with third-party libraries

SWR 또는 TanStack Query와 같은 타사 라이브러리를 사용하여 클라이언트에서 데이터를 가져올 수도 있습니다. 이러한 라이브러리는 요청 메모화, 캐싱, 재검증 및 데이터 변경을 위한 자체 API를 제공합니다.

## Future APIs:

use는 함수가 반환한 프로미스를 수락하고 처리하는 React 함수입니다. 현재 클라이언트 컴포넌트에서 use 를 래핑하여 fetch 하는 것은 권장되지 않습니다. 여러 번의 재렌더링을 유발할 수 있습니다.

# summaries

1. server에서 데이터를 가져온다. 서버 컴포넌트, 라우트 핸들러, 서버액션을 함께 사용할 수 있다.
2. 기본적으로 데이터 캐싱을 한다. 옵션을 줄수 있다. 서버액션,포스트 메소드는 예외로 요청이 캐싱되지 않는다.
3. revalidate 로 최신 데이터를 가져올 수 있다. Time-based 와 On-demand 두가지 방법이 있다.
4. 데이터 재검증중 오류가 발생하면 마지막으로 성공적으로 생성된 데이터가 제공된다.
