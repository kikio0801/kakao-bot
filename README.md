# 🦞 kakao-bot (OpenClaw x Kakaotalk)

[![OpenClaw](https://img.shields.io/badge/OpenClaw-Latest-FF4500?logo=robot&logoColor=white)](https://openclaw.ai)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Swift](https://img.shields.io/badge/Swift-6.x-F05138?logo=swift&logoColor=white)](https://developer.apple.com/swift/)
[![Kotlin](https://img.shields.io/badge/Kotlin-2.x-7F52FF?logo=kotlin&logoColor=white)](https://kotlinlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![KakaoTalk](https://img.shields.io/badge/KakaoTalk-Bridge-FFCD00?logo=kakaotalk&logoColor=black)](https://www.kakaocorp.com/)

**OpenClaw AI 에이전트를 카카오톡과 연동하는 실험적인 프로젝트**입니다.

> **Notice**: 개인정보 보호를 위해 `.env` 설정 파일이 제거되었습니다. 
> 이로 인해 현재 상태로는 별도의 환경 변수 설정 없이 동작하지 않으며, 실행을 위해서는 사용자가 직접 환경 설정을 구성해야 합니다.

## 🚀 프로젝트 목적

> **"OpenClaw의 게이트웨이 아키텍처 분석과 카카오톡 연동의 실험적 구현"**
>
> 본 프로젝트는 두 가지 핵심 목표를 위해 구축되었습니다:
> 1. **OpenClaw 구조 분석**: OpenClaw의 핵심 역할인 '게이트웨이'로서의 구조를 심도 있게 분석합니다.
> 2. **카카오톡 연동 실험**: 분석된 아키텍처를 바탕으로 **카카오톡**을 새로운 채널로 연동하는 실험적인 구현을 수행하고 기술적 가능성을 검증합니다.
>
> OpenClaw에서 카카오톡 연동을 공식적으로 지원하지 않으므로, 본 프로젝트는 커스텀 채널 연동을 위한 기술적 레퍼런스 및 실험실 역할을 합니다.

## ✨ 핵심 기능

- **OpenClaw 파워**:
  - OpenClaw의 강력한 세션 관리, 툴 실행, 에이전트 라우팅 기능을 그대로 활용합니다.
- **카카오톡 인터페이스**:
  - 별도의 앱 설치 없이 익숙한 카카오톡 채팅방에서 AI와 자연스럽게 소통합니다.
- **실험적 브리지**:
  - 카카오톡과 로컬 AI 에이전트 간의 통신을 위한 실험적인 브리지 구조를 테스트합니다.
- **문제 해결 로그**:
  - 한국어 사용자들을 위한 별도의 트러블슈팅 가이드와 로그를 체계적으로 제공합니다.

## 📂 프로젝트 구조

```text
kakao-bot/
├── .openclaw/            # OpenClaw 설정 및 데이터 (Sanitized)
├── Troubleshooting-Logs/ # 📚 트러블 슈팅 및 가이드 문서
├── src/                  # OpenClaw 소스 코드
├── apps/                 # OpenClaw 애플리케이션 모듈
├── docker-compose.yml    # 컨테이너 실행 설정
└── README.md             # 프로젝트 문서
```

## 🚀 시작하기

### 사전 요구사항

- **Node.js**: 22.x 이상
- **Package Manager**: pnpm (권장)

### 설치 및 로컬 개발

```bash
# 의존성 설치
pnpm install

# OpenClaw 온보딩 (초기 설정)
pnpm openclaw onboard --install-daemon

# 게이트웨이 실행
pnpm gateway:watch
```

## 📚 문서 및 가이드 (Troubleshooting)

본 프로젝트는 실험적인 성격이 강하므로, 개발 과정에서 마주친 문제들과 해결 방법을 별도로 기록하고 있습니다.
자세한 내용은 [**Troubleshooting-Logs**](./Troubleshooting-Logs) 디렉토리를 참고해 주세요.

## ⚖️ Open Source Credits

본 프로젝트는 아래의 오픈소스 프로젝트들을 참고하여 개발되었습니다.

- **[OpenClaw](https://github.com/openclaw/openclaw)**: Multi-channel AI gateway and agent platform.
- **[ClawdBot Kakaotalk](https://github.com/tornado1014/clawdbot-kakaotalk)**: KakaoTalk integration bridge for AI agents.

<br><br>
## 🚀 차기 계획: 안티그래비티봇 개발 기획서

### 1. 프로젝트 개요 및 핵심 목표
*   **목표**: 텔레그램 메신저와 로컬 환경의 '안티그래비티 에디터'를 양방향으로 연결하여, 언제 어디서든 스마트폰으로 로컬 워크스페이스의 코드를 제어하고 원격 바이브 코딩을 수행하는 시스템 구축.
*   **보안 및 아키텍처 원칙**: 코드를 VPS 등 외부 서버에 올리지 않고, 로컬 노트북에 설치된 에디터를 Ngrok 터널링으로 직접 제어하여 프라이빗 레포지토리의 보안을 100% 유지.
*   **비용 및 계정 안전성**: 구글/클로드 공식 API 대신 깃허브 코파일럿 Auth 기반 모델(GPT-5 mini 등)을 사용하여 계정 밴 리스크를 원천 차단하고 무제한 대화 처리를 지원.

    *   **비용 효율성**: 깃허브 코파일럿 5달러 요금제 사용 시 GPT-5 mini 모델을 크레딧 제한 없이 사용 가능.

*   **시각적 피드백 강화**: 단순한 텍스트/코드 반환을 넘어, '코각DIR'의 컨셉을 차용하여 실행된 웹/GUI 화면을 자동으로 스크린샷 캡처하여 메신저로 전송함으로써 모바일 환경에서도 완벽한 결과물 확인 지원.

### 2. 참고 소스 및 벤치마킹 전략
본 프로젝트는 아래의 제공된 소스들을 적극 분석하여 아키텍처와 코드를 차용합니다.

*   **[Main Base] 소놀봇(Sonolbot) v1 & v2 자료**
    *   개발 난이도를 대폭 낮추기 위해 소놀봇의 텔레그램 봇 뼈대, 인라인 버튼 UI, 비동기 통신 로직, 로컬 데몬 구조를 적극 포크(Fork)하여 사용.
*   **[Reference Only] 오픈클로 (OpenClaw) & 코각DIR**
    *   **오픈클로**: 세션 관리 방식과 로컬 파일 시스템(`memory.jsonl`, `agent.md`) 기반의 상태 추적 개념 참고.
    *   **코각DIR**: 텔레그램으로 명령 시 Playwright/가상 디스플레이 등을 활용해 결과물(웹페이지, GUI)의 화면을 캡처하여 전송해주는 '시각적 피드백 파이프라인' 아이디어 차용.

### 3. 시스템 구성 및 데이터 흐름
*   **Messenger UI (Telegram)**: 사용자의 명령 입력, 진행 상태 실시간 확인, 결과물(이미지, 코드 스니펫, 캡처 화면) 수신.
*   **Bot Backend & LLM (FastAPI 기반)**: 텔레그램 이벤트를 Webhook으로 고속 수신하고, 코파일럿 연동 LLM을 통해 사용자의 자연어 지시를 파싱 및 요약. FastAPI의 강력한 비동기 처리(Async)를 활용.
*   **Memory Sync (Supabase)**: 봇과 로컬 데몬 사이의 단일 공용 메모리. `messages`(대화 기록)와 `tasks`(명령 큐) 테이블을 관리하여 양방향 상태를 완벽히 일치시킴.
*   **Local Daemon (FastAPI + Playwright + Ngrok)**: 로컬 워크스페이스에서 실행되는 FastAPI 데몬. Supabase의 새로운 `tasks`를 감지하여 안티그래비티 에디터로 전달하며, Playwright를 내장하여 결과물 화면을 캡처하는 기능 수행.
*   **Execution Engine (Anti-Gravity Editor)**: 기존 소놀봇의 '클로드 코드(CLI)' 역할을 대체. 데몬으로부터 명령을 받아 실제 코드를 작성/수정하고 결과 로그를 데몬으로 반환.

### 4. 단계별 개발 마일스톤 (Action Plan)
*   **Phase 1**: 기반 인프라 및 단일 메모리(Supabase) 구축
*   **Phase 2**: 텔레그램 봇 코어 개발 (소놀봇 코드 + FastAPI)
*   **Phase 3**: 로컬 브릿지 데몬 및 시각적 피드백(Playwright) 세팅
*   **Phase 4**: 안티그래비티 에디터 통합 (엔진 교체 - 핵심)
*   **Phase 5**: 양방향 동기화 및 보안/예외 처리
