# CSP개요

서버에서 허용되지 않은 js의 실행과 리소스 불러오기 등을 차단하며, 브라우저에서 CSP를 지원한다.
헤더를 응답에 포함해 활성화 할 수 있다.

# Strict CSP

CSP를 적용한 페이지는 HTML내 자바스크립트를 작성하는 인라인 스크립트가 금지된다.
사용하려면 unsafe-inline 키워드를 사용해야 한다.
따라서 안전하게 실행하기 위해 nonce-source와 hash-source라는 CSP 헤더를 사용해야 한다.

### 설정값

Content-Security-Policy:
script-src nonce-tXCHNF14THbBvCj3G0WmQ==' object-src none;'
base-uri 'none';

## nce-source

스크립트 요소에 지정된 랜덤 토큰이 CSP 헤더에 지정된 토큰과 일치하지 않으면 에러를 발생시키는 기능
nonce-source를 사용하려면 CSP헤더를 응답에 포함시켜야 한다.

## hash-source

CSP 헤더에 자바스크립트와 css 코드의 해시값을 지정한다.
HTML, CSs, 자바스크립트로만 구성되고, 서버가 없는 정적사이트는 요청마다 nonce값을 생성할 수는 없지만,
hash-source를 사용하면 안전하게 CSP를 설정할 수 있다.

## strict-dynamic

script 요소를 동적으로 생성하고 싶을때는 strict-dynamic 키워드를 사용한다.
그러나 DOM기반 XS싱크인 inerHTML과 document.write는기능이 제한된다.
