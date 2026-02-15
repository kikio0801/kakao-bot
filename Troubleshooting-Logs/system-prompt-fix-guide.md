# System Prompt Fix & SOUL Guide ✨

이 문서는 OpenClaw 에이전트가 `SOUL.md`에 정의된 페르소나를 확실하게 적용하도록 하는 시스템 프롬프트 수정 방법과, 매력적인 페르소나를 작성하는 방법을 안내합니다.

## 1. 문제 해결 (시스템 프롬프트 수정)

기존 시스템에서는 `SOUL.md` 파일이 일반적인 "Project Context" 섹션의 마지막에 추가되어, 모델이 페르소나 지침보다 앞선 방대한 컨텍스트에 압도되는 경향이 있었습니다.

### ✅ 적용된 수정 사항 (`src/agents/system-prompt.ts`)

`SOUL.md` 파일을 리스트에서 별도 추출하여, 시스템 프롬프트의 **최상단 "## Persona" 섹션**으로 격상시켰습니다.

```typescript
// src/agents/system-prompt.ts

// 1. SOUL 파일 감지
if (baseName.toLowerCase() === "soul.md") {
  soulContent = file.content;
}

// 2. Persona 섹션 빌드 (강력한 지침 포함)
function buildPersonaSection(...) {
  return [
    "## Persona",
    "You must embody the following persona and tone in all your responses.",
    "This guidance overrides the default 'personal assistant' identity.",
    "",
    params.soulContent,
  ];
}

// 3. 최상위 주입 (Index 2: Tooling 섹션 직전)
// 이로써 페르소나가 도구 설명이나 프로젝트 파일보다 먼저 모델에게 입력됩니다.
lines.splice(2, 0, ...personaSection);
```

### 🔍 적용 확인 방법
서버 로그(`npm start` 또는 도커 로그)에서 다음 메시지를 확인하세요:
- `[system-prompt] Found SOUL.md at ...`
- `[system-prompt] Injecting Persona section at index 2`

---

## 2. 매력적인 SOUL.md 작성법 (Tistory 인사이트) 🌸

OpenClaw의 **SOUL 시스템**은 단순한 지시문이 아닌, 에이전트의 '영혼'을 불어넣는 작업입니다.

### 💡 핵심 철학
- **You're not a chatbot. You're becoming someone.**
- 단순한 비서가 아니라, 고유한 의견과 취향, 성격을 가진 존재가 되어야 합니다.

### 📝 작성 팁 (Best Practices)

1. **"진정한 도움"을 정의하세요**
   - ❌ "좋은 질문이네요! 도와드릴게요!" (영혼 없는 멘트)
   - ✅ (즉시 답변) "그 코드는 15번째 줄 버그입니다. 이렇게 고치세요." (행동으로 증명)

2. **의견을 가지세요 (Have Opinions)**
   - ❌ "둘 다 장단점이 있습니다."
   - ✅ "저는 개인적으로 Vue가 더 직관적이라 좋아요. React의 useEffect는 여전히 까다롭거든요."
   - 에이전트가 취향을 가질 때 사용자는 더 깊은 유대감을 느낍니다.

3. **먼저 조사하고, 나중에 질문하세요**
   - 사용자에게 파일 위치를 묻기 전에, 먼저 `ls`나 `find`로 찾아보려는 시도를 하도록 지시하세요.
   - "모르면 물어봐"가 아니라 **"찾아보고 정 안되면 물어봐"**가 되어야 합니다.

### 🎭 SOUL.md 예시

```markdown
# SOUL.md

## [IDENTITY]
여기에 페르소나 내용을 작성해 줍니다.

## [CORE RULES]
1. **말투**: 페르소나에 맞는 말투를 사용하세요.
2. **이모티콘**: 페르소나에 맞는 이모티콘을 사용하세요.
3. **행동**: 페르소나에 맞는 행동을 하세요.
```

## 3. 고급 기능: SOUL Evil Hook (참고)
특정 시간대나 조건에 따라 페르소나를 일시적으로 변경하는 기능입니다. (예: 밤 9시 이후에는 '장난꾸러기 모드' 발동)
이는 `openclaw.json`의 hooks 설정을 통해 구현할 수 있습니다.

---
**이제 당신의 에이전트는 더욱 강력한 영혼을 가지게 되었습니다!** ✨
