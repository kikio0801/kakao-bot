# 🦞 kakao-bot (OpenClaw x Kakaotalk)

[![OpenClaw](https://img.shields.io/badge/OpenClaw-Latest-FF4500?logo=robot&logoColor=white)](https://openclaw.ai)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Swift](https://img.shields.io/badge/Swift-6.x-F05138?logo=swift&logoColor=white)](https://developer.apple.com/swift/)
[![Kotlin](https://img.shields.io/badge/Kotlin-2.x-7F52FF?logo=kotlin&logoColor=white)](https://kotlinlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![KakaoTalk](https://img.shields.io/badge/KakaoTalk-Bridge-FFCD00?logo=kakaotalk&logoColor=black)](https://www.kakaocorp.com/)

**OpenClaw AI 에이전트를 카카오톡과 연동하는 실험적인 프로젝트**입니다.

## 🚀 프로젝트 목적

> **"개인화된 AI 비서를 가장 친숙한 메신저에서 만납니다."**
>
> 본 프로젝트는 로컬 중심의 AI 에이전트 플랫폼인 **OpenClaw**를 한국의 대표 메신저인 **카카오톡**과 연동하여, **일상적인 대화 환경에서 고도화된 AI 비서 기능을 실험하고 검증**하기 위해 시작되었습니다.
>
> OpenClaw에서 카카오톡 연동을 공식적으로 지원하지 않고 있기 때문에 **실험적인 연동(Experimental Integration)**을 통해 새로운 가능성을 탐구합니다.

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

by. Yoon SangHwan
