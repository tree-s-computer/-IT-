# Server Actions and Mutations

서버 액션은 서버에서 실행되는 비동기 함수입니다.
서버 및 클라이언트 컴포넌트에서 Next.js 애플리케이션의 양식 제출 및 데이터 변형을 처리하는 데 사용할 수 있습니다.

서버 컴포넌트는 인라인 함수 수준 또는 모듈 수준의 "서버 사용" 지시문을 사용할 수 있습니다.
서버 액션을 인라인하려면 함수 본문 상단에 "use server"를 추가합니다:

```javascript
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
