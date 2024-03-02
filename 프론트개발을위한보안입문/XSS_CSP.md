# DOM기반 XSS

dom기반 xss의 원인이 되는 브라우저의 기능은 소스와 싱크로 분류할 수 있다.
DOM 기반 XSS를 발생시키는 원인이 되는 location.hash 문자열과 같은 것을 '소스' 라고 하며,
소스의 문자열에서 자바스크립트를 생성하고 실행하는 것을 '싱크' 라고 한다.

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

# Trusted Types

_TrustedTypes 활성화하기_ : Content-Security-Policy: require-trusted-types-for 'script';

검사되지 않은 문자열을 HTML 에 삽입하는 것을 금지하는 기능. 기본값이 비활성화 상태
policy 함수로 검사된 안전한 타입만 HTML에 삽입할 수 있으므로 문자열을 그대로 반영하려고 하면 에러가 발생한다.

브라우저가 Trusted Types 를 지원하지 않을 수 있으므로 함수 사용이 가능한지 체크를 해야한다. [ 158p ]

# 마무리

- xss는 공격자가 만든 함정에 의해 브라우저에서 공격자의 코드를 실행시키는 공격
- xss는 동일 출처 정책으로는 막을 수 없다.
- xss는 라이브러리,프레임워크, 브라우저의 기능을 사용해서 막을 수 있다.
- CSP는 xss등 인젝션 공격을 막기 위한 브라우저의 기능이다.
- CSP는 강력하지만 웹 애플리케이션이 동작할 때 문제가 생길 수 있으므로 보고서를 모니터링 하면서 적용해야 한다.
