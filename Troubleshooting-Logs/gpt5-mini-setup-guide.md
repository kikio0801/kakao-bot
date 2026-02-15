# GPT-5 Mini 설정 가이드

## AI Provider 등록

OpenClaw에서 GitHub Copilot의 GPT-5 Mini 모델을 사용하려면 다음 명령어를 순서대로 실행하세요.

### 1. 모델 설정

```bash
docker compose run --rm openclaw-cli models set github-copilot/gpt-5-mini
```

이 명령어는 GPT-5 Mini를 기본 AI 모델로 설정합니다.

### 2. GitHub Copilot 인증

```bash
docker compose run --rm -it openclaw-cli models auth login-github-copilot
```

이 명령어는 GitHub Copilot 계정으로 로그인하여 인증을 완료합니다.

> **참고**: `-it` 플래그는 대화형 터미널 세션을 위해 필요합니다.

## 설정 확인

설정이 완료되면 `.openclaw/openclaw.json` 파일에서 다음과 같이 확인할 수 있습니다:

```json
{
  "defaultModel": "github-copilot/gpt-5-mini",
  "providers": {
    "github-copilot": {
      "authenticated": true
    }
  }
}
```

## 게이트웨이 재시작

설정 변경 후 게이트웨이를 재시작하여 변경사항을 적용하세요:

```bash
docker compose restart openclaw-gateway
```

## 문제 해결

### 인증 실패 시

1. GitHub Copilot 구독이 활성화되어 있는지 확인
2. 인터넷 연결 상태 확인
3. 다시 로그인 시도:
   ```bash
   docker compose run --rm -it openclaw-cli models auth logout-github-copilot
   docker compose run --rm -it openclaw-cli models auth login-github-copilot
   ```

### 모델이 작동하지 않을 때

1. 게이트웨이 로그 확인:
   ```bash
   docker compose logs openclaw-gateway
   ```
2. 모델 설정 재확인:
   ```bash
   docker compose run --rm openclaw-cli models list
   ```
