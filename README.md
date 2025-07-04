# ☕ 무인카페 키오스크 시스템

무인카페를 위한 키오스크 주문 시스템입니다. 고객이 셀프 주문 및 결제를 진행할 수 있도록 UI 화면을 구현하였으며, 다양한 사용자 환경을 고려한 **저자세 모드**, **고대비 모드**, **수어(수화)** 및 **음성 안내 기능**을 제공합니다.

---

## 🛠️ 사용 기술

- **Frontend**: CSS, JavaScript  
- **형상관리**: Git, GitHub, GitLab  

---

## 💡 주요 기능 (화면 구현 기준)

- 고객용 키오스크 UI 퍼블리싱
- 디자인 시안 기반 화면 구성
- 일반 화면 / 저자세 화면 간 전환 
- CSS를 통한 고대비 모드 전환
- JavaScript로 페이지 간 흐름 연동
- 수어(수화) 영상 안내 제공
- 음성 안내 기능 (.wav 음성 파일 재생)


---

## 🧩 개발 과정

1. **디자인 수령 및 퍼블리싱**  
   - 전달받은 시안을 기반으로 퍼블리싱  
   - 키오스크 사용 환경에 맞는 화면 구조 설계

2. **화면 연동 및 상태 전환**  
   - JavaScript를 활용해 일반/저자세 화면 전환 구현  
   - 휠체어 사용자도 이용 가능한 낮은 위치의 UI 구성  
   - 화면 간 버튼 클릭 흐름 연결

3. **고대비 모드 구현**  
   - CSS 클래스 변경으로 고대비 테마 적용  
   - 저시력 사용자를 위한 시각적 대응

4. **접근성 기능 구현**  
   - 주요 안내 화면에 수어(수화) 영상 삽입  
   - 녹음된 `.wav` 음성 파일 재생 기능 구현

5. **버전 관리 및 기록**  
   - Git, GitHub, GitLab 활용한 소스 코드 관리

---

## ✨ 진행하며 배운 점

- 퍼블리싱부터 기능 구현까지 혼자 작업하며 전체 흐름을 익혔습니다.  
- 접근성을 고려한 UI 구성 방식에 대해 경험할 수 있었습니다.  
- JavaScript로 화면 전환과 오디오 제어 기능을 직접 구현해봤습니다.  
- Git 기반 도구들을 활용해 코드 버전을 관리하고 기록하는 습관을 들였습니다.  
- 사용자 입장에서 기능 흐름과 화면 구성에 대해 고민하는 계기가 되었습니다.

---

## 📸 화면 예시

> https://github.com/user-attachments/assets/02dcface-c5b5-41e6-9c2f-e2c8292afec7

---

## 📂 소스 코드 위치

- 소스 코드는 `screen\BIZ\102\04` 경로에 있습니다.

## 🙋‍♀️ 담당 역할

- 고객용 키오스크 UI 퍼블리싱
- 일반/저자세/고대비 모드 전환 기능 구현 (JavaScript, CSS)  
- 사용자 흐름에 맞춘 페이지 연동 처리  
- Git 기반 도구를 활용한 버전 관리

---

## 🧑‍💻 개발 형태

- 본 프로젝트는 전달받은 디자인 시안을 기반으로 퍼블리싱부터 화면 전환, 접근성 기능 구현까지 혼자서 개발한 개인 작업물입니다.
