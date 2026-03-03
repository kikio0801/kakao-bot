# GitHub Copilot 프리미엄 모델 사용 가이드 (우회 및 설정)

본 문서는 GitHub Copilot의 프리미엄 모델 사용량 차감 우회 방법과 실제 테스트 결과를 정리한 가이드입니다.

## 📌 핵심 요약
- **GPT-4o 모델**: GitHub Copilot의 개인용 API 엔드포인트(`api.individual.githubcopilot.com`)를 통해 `gpt-4o` 모델을 호출할 경우, **프리미엄 사용량(Premium Interactions)이 차감되지 않음**을 확인했습니다.
- **제한 사항**: `claude-3.5-sonnet`, `gemini-1.5-pro` 등 타사 모델은 동일한 방법으로 호출 시 `400 Bad Request` 오류가 발생하며 사용이 불가능했습니다.
- **결론**: `gpt-4o` 모델을 기본 모델로 설정하여 무제한에 가까운 고품질 모델 사용이 가능합니다.

---

## 🔗 참조 링크
- **원본 블로그**: [GitHub Copilot 프리미엄 모델 우회 방법](https://wikidocs.net/blog/@jaehong/7050/)
  - 해당 포스트에서 소개된 내용을 바탕으로 검증을 진행했습니다.

---

## 🛠️ 설정 방법 (OpenClaw)

OpenClaw에서 `gpt-4o`를 기본 모델로 사용하도록 설정하는 방법입니다.

### 1. `openclaw.json` 수정
`.openclaw/openclaw.json` 파일에서 `primary` 모델을 `github-copilot/gpt-4o`로 변경합니다.

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "github-copilot/gpt-4o"
      },
      "models": {
        "github-copilot/gpt-4o": {}
      }
    }
  }
}
```

### 2. 코드 수정 (필요 시)
`src/config/defaults.ts` 등에서 `gpt-mini` 등의 별칭이 `gpt-4o`를 가리키도록 수정합니다.

```typescript
// src/config/defaults.ts
export const DEFAULT_MODEL_ALIASES = {
  // ...
  "gpt-mini": "openai/gpt-4o", // gpt-5-mini 대신 gpt-4o 사용
  // ...
};
```

---

## 🧪 테스트 결과 상세

### 테스트 환경
- **API Endpoint**: `https://api.individual.githubcopilot.com/chat/completions`
- **인증 방식**: `ghu_` 토큰을 `tid_` 토큰으로 교환하여 사용 (`/copilot_internal/v2/token`)
- **User-Agent**: `GitHubCopilotChat/0.26.7`
- **Editor-Version**: `vscode/1.96.2`

### 모델별 결과
| 모델 ID | 요청 결과 | 프리미엄 차감 여부 | 비고 |
| :--- | :---: | :---: | :--- |
| **gpt-4o** | ✅ 성공 | **차감 안됨** | 응답 정상, 쿼터 유지 (300/300) |
| **gpt-5-mini** | ✅ 성공 | 차감 안됨 | 실제로는 gpt-4o-mini 수준 (OpenAI 모델) |
| **claude-3.5-sonnet** | ❌ 실패 | - | 400 Bad Request (Model not supported) |
| **gemini-2.0-flash** | ❌ 실패 | - | 400 Bad Request |
| **o1-preview** | ❌ 실패 | - | 400 Bad Request |

### 결론
블로그에서 언급된 방법은 **특정 OpenAI 모델(`gpt-4o` 등)**에 대해 유효하며, 이를 통해 프리미엄 쿼터 소모 없이 고성능 모델을 사용할 수 있습니다. 타사 모델(Claude, Gemini)은 현재 이 우회 경로로 접근이 차단되어 있습니다.

---

## 🔑 GitHub Copilot 토큰(`ghu_`, `gho_`) 획득 방법 (웹 인증 방식)

로컬 PC(VS Code 등)에 토큰이 없거나 다른 환경에서 토큰을 추출해야 할 경우, GitHub Device Flow를 이용해 손쉽게 발급받을 수 있습니다.

### Python 추출 스크립트 작성 및 실행
다음 Python 코드를 실행하면 브라우저를 통해 인증하고 토큰을 발급받을 수 있습니다 (사전 요구사항: `httpx` 설치 필요).

```python
import httpx, asyncio

CLIENT_ID = "~~~~~~~~~~"  # GitHub Copilot VS Code App ID
DEVICE_CODE_URL = "https://github.com/login/device/code"
ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token"

async def main():
    async with httpx.AsyncClient() as client:
        # 1. Device Code 요청
        resp = await client.post(DEVICE_CODE_URL, data={"client_id": CLIENT_ID, "scope": "read:user"}, headers={"Accept": "application/json"})
        device_info = resp.json()
        
        print(f"👉 브라우저로 이동: {device_info['verification_uri']}")
        print(f"🔑 코드 입력: {device_info['user_code']}")
        print("인증할 때까지 대기합니다...")
        
        # 2. Token 폴링
        while True:
            resp = await client.post(ACCESS_TOKEN_URL, data={"client_id": CLIENT_ID, "device_code": device_info['device_code'], "grant_type": "urn:ietf:params:oauth:grant-type:device_code"}, headers={"Accept": "application/json"})
            data = resp.json()
            if "access_token" in data:
                print(f"✅ 발급된 토큰: {data['access_token']}")
                break
            await asyncio.sleep(device_info['interval'])

asyncio.run(main())
```

터미널에서 실행 후 안내되는 링크(`https://github.com/login/device`)로 들어가 영문 코드를 입력하면 즉시 `gho_` 또는 `ghu_` 형태의 토큰이 출력됩니다. 이 토큰을 사용할 API의 헤더나 환경변수에 넣으면 됩니다.

---

## 🚀 추가 팁: 프론트엔드 - 백엔드 연동 및 CORS 설정 가이드

API를 프론트엔드(React, Next.js 등)와 연동하여 커스텀 채팅 봇이나 분석 도구를 만들 때, 다음 두 가지 사항을 반드시 확인하세요.

### 1. 토큰 보안 (프론트엔드 통신 노출 금지)
API 통신에 사용되는 `gho_` 또는 `ghu_` 토큰은 클라이언트(프론트엔드) 코드에 하드코딩하거나 브라우저 네트워크 요청 헤더에 직접 노출해서는 안 됩니다.
- ❌ **안 좋은 예**: 프론트엔드 `fetch` 요청의 `Authorization` 헤더에 토큰을 담아 직접 전송. (네트워크 탭을 통해 토큰 탈취 위험)
- ✅ **해결책**: 토큰은 **백엔드(FastAPI 등)의 `.env` 파일에 안전하게 저장** (`GITHUB_TOKEN=gho_...`)하고, 프론트엔드에서는 껍데기만 있는 자체 API 엔드포인트(`. /api/chat`)를 찔러 백엔드가 깃허브 토큰을 대신 실어 깃허브 서버로 내보내도록(Proxy 방식) 설계합니다. 프론트엔드 헤더에서는 인증 관련 내용을 완전히 제거하세요.

### 2. CORS (Cross-Origin Resource Sharing) 허용
로컬 테스트 시 프론트엔드(예: `localhost:3000`)와 백엔드(예: `localhost:8000`)의 포트가 다르면 브라우저의 Preflight(사전) 요청에서 CORS 정책 위반 에러(`401 Unauthorized` 또는 `Network Error`)가 일어납니다. 프론트엔드에서 보낸 가짜 Authorization 헤더 때문에 GitHub 인증 서버가 401을 뱉는 경우도 흔합니다.

백엔드 서버에 명시적으로 CORS 미들웨어를 추가하여 프론트엔드 origin을 허용해 주어야 렌더링 측과 완벽하게 통신이 연결됩니다.

**FastAPI CORS 설정 예시:**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 허용할 프론트엔드 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
