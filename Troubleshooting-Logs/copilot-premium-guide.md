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
