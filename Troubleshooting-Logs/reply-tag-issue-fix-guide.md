# Reply Tag 노출 이슈 해결 가이드

## 문제 상황

봇 응답에 `[[reply_to_current]]` 태그가 그대로 노출되는 문제가 발생했습니다. (코드 수정으로 해결됨)

> **2026-02-14 업데이트**: 본 문제는 `gpt-5-mini`, `gpt-4o` 등 모델 종류와 무관하게 `normalize-reply.ts`의 로직 누락이 원인이었으며, 아래 가이드에 따라 코드를 수정한 후 해결되었습니다.

### 증상

```
사용자: "안녕하세요"
봇: "[[reply_to_current]] 안녕하세요! 무엇을 도와드릴까요?"
```

태그가 제거되지 않고 사용자에게 그대로 보이는 상태입니다.

## 원인 분석

### 근본 원인

`src/auto-reply/reply/normalize-reply.ts` 파일의 `normalizeReplyPayload` 함수에서 **reply 태그를 제거하는 로직이 누락**되어 있었습니다.

### 실행 흐름

```
봇 응답 생성
  ↓
normalizeReplyPayload (normalize-reply.ts)
  ↓
Heartbeat 토큰 제거 ✅
  ↓
Reply 태그 제거 ❌ (누락됨)
  ↓
텍스트 정제
  ↓
사용자에게 전달 (태그가 그대로 노출됨)
```

## 해결 방법

### 1. 코드 수정

`src/auto-reply/reply/normalize-reply.ts` 파일을 다음과 같이 수정합니다:

#### Import 추가

```typescript
import { parseInlineDirectives } from "../../utils/directive-tags.js";
```

#### 태그 제거 로직 추가

Heartbeat 토큰 제거 후, 텍스트 정제 전에 다음 코드를 추가합니다:

```typescript
// Strip reply tags ([[reply_to_current]], [[reply_to:id]], etc.) from final output
if (text) {
  const parsed = parseInlineDirectives(text, {
    stripAudioTag: false,
    stripReplyTags: true,
  });
  text = parsed.text;
}
```

### 2. 빌드 및 배포

#### 로컬 빌드 확인

```bash
npm run build
```

#### Docker 이미지 재빌드

```bash
docker compose build openclaw-gateway
```

#### 게이트웨이 재시작

```bash
docker compose up -d openclaw-gateway
```

## 수정 후 동작

### 기대 결과

```
사용자: "안녕하세요"
봇: "안녕하세요! 무엇을 도와드릴까요?"
```

`[[reply_to_current]]` 태그가 완전히 제거되어 깔끔한 응답만 표시됩니다.

## 기술 세부사항

### 수정된 파일

- `src/auto-reply/reply/normalize-reply.ts`

### 관련 파일 (참고용)

- `src/utils/directive-tags.ts` - `parseInlineDirectives` 함수 정의
- `src/auto-reply/reply/reply-dispatcher.ts` - `normalizeReplyPayload` 호출
- `src/web/auto-reply/deliver-reply.ts` - 최종 응답 전달

### 처리 순서

1. **Heartbeat 토큰 제거** - 내부 상태 체크용 토큰 제거
2. **Reply 태그 제거** - `[[reply_to_current]]`, `[[reply_to:id]]` 등 제거
3. **텍스트 정제** - 사용자 대면 텍스트 정리
4. **LINE 디렉티브 파싱** - LINE 메신저 전용 기능 처리
5. **응답 프리픽스 추가** - 필요시 응답 앞에 프리픽스 추가

## 검증 방법

### 1. 빌드 성공 확인

```bash
npm run build
```

에러 없이 빌드가 완료되어야 합니다.

### 2. 실제 테스트

봇에게 메시지를 보내고 응답에 `[[reply_to_current]]` 태그가 보이지 않는지 확인합니다.

### 3. 로그 확인

```bash
docker compose logs openclaw-gateway | grep "reply_to"
```

로그에서 태그 처리 관련 에러가 없는지 확인합니다.

## 추가 참고사항

### parseInlineDirectives 옵션

```typescript
parseInlineDirectives(text, {
  stripAudioTag: false,    // 오디오 태그는 유지
  stripReplyTags: true,    // Reply 태그는 제거
});
```

### 지원되는 Reply 태그 형식

- `[[reply_to_current]]` - 현재 메시지에 답장
- `[[reply_to: message_id]]` - 특정 메시지에 답장

모든 형식이 정규표현식 `REPLY_TAG_RE`로 감지되어 제거됩니다.
