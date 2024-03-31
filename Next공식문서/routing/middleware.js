export const config = {
  matcher: [
    /*
     - api (API 경로)
     - _next/static(정적 파일)
     - _next/image(이미지 최적화 파일)
     - favicon.ico(파비콘 파일)
     로 시작하는 경로를 제외한 모든 요청 경로를 일치시킵니다:
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [{ type: "header", key: "x-present" }],
      missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
    },
  ],
};

/*
source: 이 필드는 요청 경로의 패턴을 정의합니다. 여기서 사용된 정규 표현식은 특정 시작하는 경로를 제외한 모든 경로에 대한 요청을 매칭합니다.

missing과 has: 이 배열들은 요청의 헤더에 특정 키(또는 키와 값의 조합)가 있는지 혹은 없는지를 기준으로 요청이 미들웨어를 거치게 할지를 결정합니다.
missing 배열은 해당 헤더가 없을 때 조건이 만족됩니다.
*/
