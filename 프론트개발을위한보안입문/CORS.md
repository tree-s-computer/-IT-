# PreFliight Request

fetch 등에 의해 임의로 HTTP 헤더가 추가 되거나 서버의 리소스를 변경하는 경우 요청은 안전하지 않다.
이와 같은 요청을 전송할 때 사전에 브라우저와 서버 간에 합의가 이뤄진다.
합의된 요청을 허가된 상태에서만 전송하는데 이 요청을 Prefilight Request 라고 한다.

'지금부터 전송하려는 요청이 괜찮은지' 확인하기 위해 PreFliight Request를 전송한다.
해당 Request 는 OPTIONS 메소드를 사용한다.

### PreFliight Reqeust 에 의한 HTTP 메세지

OPTIONS / path HTTP / 1.1
Host: https://cross-origin.example
Access-Control-Request-Method: DELETE
Access-Control-Request-Headers: content-type
Origin: https://site.example

- **Acess-Contro-Request-Method** : 전송하는 요청의 HTTP 메서드 보관
- **Access-Control-Request-Headers** : 전송하는 요청에 포함된 TTP 헤더 보관

# 쿠키를 포함하는 요청 전송

자바스크립트를 사용해 교차 출처로 통신할 때는 쿠키를 서버로 전송하지 않는다. 이는 외부 서버에 보안 정보가 유출되는 리스크를 줄이기 위해서다.
교차 출처의 서버로 쿠키를 전송할 때는 쿠키를 포함하는 요청을 전송한다고 명시해야 한다.

Access-Control-AlloN-Origin 헤더의 값에 그대로 지정하면 모든 출처를 허가하는 것과 같으므로 위험하다.

# 사이드 채널 공격

컴퓨터의 CPU,메모리 등 하드웨어에 대한 공격을 사이드 채널 공격이라고 한다.
사이드 채널 공격중에서도 크게 문제가 된 것은 2018년에 발생한 스펙터이다.
스펙터는 CPU 아키텍처의 취약성을 악용한 공격방법이다.

- 스펙터 : 정밀한 타이머로 계속해서 같은 작업을 반복해 조금씩 메모리의 내용을 추측하는 공격 방법

브라우저는 내부 웹 어플리케이션마다 프로세스를 분리해 사이드 채널 공격을 막는다.

# CORP

CORP 헤더를 설정하면 헤더가 지정된 리소스를 가져올때 동일 출처 또는 동일 사이트로 제한할 수 있다.
Cross-Origin-Resource-Policy: same-origin

# COEP

페이지의 모든 리소스에 CORP 또는 CORS 헤더의 설정을 강제 할 수 있다.
COEP를 활성화하려면 Cross-Origin-Embedder-Policy 헤더를 페이지의 응답에 삽입한다.

# COOP

<a> 요소와 window.open함수로 오픈한 교차 출처페이지의 접근을 제한할수 있다.
