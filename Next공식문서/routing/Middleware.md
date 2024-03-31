# Middleware

미들웨어를 사용하면 요청이 완료되기 전에 코드를 실행할 수 있습니다. 그런 다음 들어오는 요청에 따라 요청 또는 응답 헤더를 재작성, 리디렉션, 수정하거나 직접 응답하여 응답을 수정할 수 있습니다.

캐시된 콘텐츠와 경로가 일치하기 전에 미들웨어가 실행됩니다. 자세한 내용은 경로 매칭을 참조하세요.

# Use Cases

1. 인증 및 권한 부여: 특정 페이지 또는 API 경로에 대한 액세스 권한을 부여하기 전에 사용자 신원을 확인하고 세션 쿠키를 확인합니다.

2. 서버 측 리디렉션: 특정 조건(예: 로캘, 사용자 역할)에 따라 서버 수준에서 사용자를 리디렉션합니다.
   경로 재작성: 요청 속성에 따라 API 경로 또는 페이지에 대한 경로를 동적으로 다시 작성하여 A/B 테스트, 기능 롤아웃 또는 레거시 경로를 지원합니다.

3. 봇 탐지: 봇 트래픽을 감지하고 차단하여 리소스를 보호하세요.

4. 로깅 및 분석: 페이지 또는 API에서 처리하기 전에 요청 데이터를 캡처하고 분석하여 인사이트를 얻으세요.

5. 기능 플래깅: 원활한 기능 출시 또는 테스트를 위해 동적으로 기능을 활성화 또는 비활성화합니다.

# 미들웨어가 최적의 접근방식이 아닐때

1. 복잡한 데이터 가져오기 및 조작

2. 무거운 계산 작업

3. 광범위한 세션 관리
   미들웨어는 기본적으로 세션 작업을 관리할 수 있지만, 광범위한 세션 관리는 전용 인증 서비스 또는 라우트 핸들러 내에서 관리해야 한다.

4. 데이터베이스 작업

# Matching Paths

미들웨어는 프로젝트의 모든 경로에 대해 호출됩니다. 따라서 특정 경로를 정확하게 타겟팅하거나 제외하려면 매처를 사용하는 것이 중요합니다.

[실행순서]

1. headers from next.config.js
2. redirects from next.config.js
3. Middleware (rewrites, redirects, etc.)
4. beforeFiles (rewrites) from next.config.js
5. Filesystem routes (public/, \_next/static/, pages/, app/, etc.)
6. afterFiles (rewrites) from next.config.js
7. Dynamic Routes (/blog/[slug])
8. fallback (rewrites) from next.config.js

# NextResponse

- 들어오는 요청을 다른 URL로 리디렉션합니다.
- 지정된 URL을 표시하여 응답을 다시 작성합니다.
- API 경로, getServerSideProps 및 재작성 대상에 대한 요청 헤더 설정
- 응답 쿠키 설정
- 응답 헤더 설정

**To produce a response from Middleware, you can:**
rewrite to a route (Page or Route Handler) that produces a response
return a NextResponse directly. See Producing a Response
