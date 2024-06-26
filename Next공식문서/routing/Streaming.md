# What is Streaming?

React와 Next.js에서 스트리밍이 어떻게 작동하는지 알아보려면 서버 측 렌더링(SSR)과 그 한계를 이해하는 것이 도움이 됩니다.

# SSR

| SSR을 사용하면 사용자가 페이지를 보고 상호작용하기 전에 완료해야 하는 일련의 단계가 있습니다:

먼저 특정 페이지의 모든 데이터를 서버에서 가져옵니다.
그런 다음 서버에서 페이지의 HTML을 렌더링합니다.
페이지의 HTML, CSS 및 JavaScript가 클라이언트로 전송됩니다.
생성된 HTML과 CSS를 사용해 비대화형 사용자 인터페이스가 표시됩니다.
마지막으로 React는 사용자 인터페이스에 hydrate를 공급하여 대화형 인터페이스로 만듭니다.

이러한 단계는 순차적이고 차단적입니다.

# Improving loading performance

- 서버는 모든 데이터를 가져온 후에만 페이지의 HTML을 렌더링할 수 있습니다.
- 그리고 클라이언트에서는 페이지의 모든 컴포넌트에 대한 코드가 다운로드된 후에만 React가 UI에 수분을 공급할 수 있습니다.

  ** React 및 Next.js를 사용한 SSR은 사용자에게 비대화형 페이지를 최대한 빨리 표시하여 체감 로딩 성능을 개선하는 데 도움이 됩니다.**

하지만 페이지가 사용자에게 표시되기 전에 서버에서 모든 데이터 가져오기를 완료해야 하므로 여전히 느릴 수 있습니다.
스트리밍을 사용하면 페이지의 HTML을 작은 청크로 나누고 서버에서 클라이언트로 해당 청크를 점진적으로 전송할 수 있습니다.
이렇게 하면 모든 데이터가 로드될 때까지 기다리지 않고 페이지의 일부를 더 빨리 표시할 수 있습니다.

# React의 컴포넌트 모델

스트리밍은 각 컴포넌트를 하나의 청크로 간주할 수 있기 때문에 React의 컴포넌트 모델에서 잘 작동합니다. 우선 순위가 높거나(예: 제품 정보) 데이터에 의존하지 않는 컴포넌트(예: 레이아웃)를 먼저 전송할 수 있으며, React는 더 일찍 하이드레이션을 시작할 수 있습니다. 우선순위가 낮은 컴포넌트(예: 리뷰, 관련 제품)는 데이터를 가져온 후 동일한 서버 요청으로 전송할 수 있습니다.

# What could be improved

스트리밍은 긴 데이터 요청으로 인해 페이지 렌더링이 차단되는 것을 방지하고자 할 때 특히 유용하며, TTFB(Time To First Byte)와 FCP(First Contentful Paint)를 줄일 수 있기 때문입니다. 또한 특히 느린 디바이스에서 인터랙티브 시간(TTI)을 개선하는 데 도움이 됩니다.

# Example

Next.js에서 스트리밍을 실행시키는 방법은 두 가지가 있습니다.

1. 페이지 레벨은 loading.tsx 를 사용해서
2. 특정 컴포넌트는<Suspense> 를 사용해서

## Suspense

<Suspense>는 비동기 동작(예: 데이터 가져오기)을 수행하는 컴포넌트를 래핑하고, 동작이 진행되는 동안 폴백 UI(예: 스켈레톤, 스피너)를 표시한 다음 동작이 완료되면 컴포넌트를 교체하는 방식으로 작동합니다.

Suspense를 사용하면 다음과 같은 이점을 얻을 수 있습니다:

Streaming Server Rendering - - 서버에서 클라이언트로 HTML을 점진적으로 렌더링합니다.
Selective Hydration - React는 사용자 상호작용에 따라 어떤 컴포넌트를 먼저 인터랙티브하게 만들지 우선순위를 정합니다.

## SEO

Next.js는 생성 메타데이터 내부의 데이터 가져오기가 완료될 때까지 기다렸다가 클라이언트로 UI를 스트리밍합니다.
이렇게 하면 스트리밍된 응답의 첫 부분에 <head> 태그가 포함되도록 보장합니다.
**스트리밍은 서버에서 렌더링되므로 SEO에 영향을 미치지 않습니다.** Google의 리치 결과 테스트 도구를 사용하여 Google의 웹 크롤러에 페이지가 어떻게 표시되는지 확인하고 직렬화된 HTML(소스)을 볼 수 있습니다.
