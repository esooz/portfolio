# Esoo Kim Portfolio

## 실행
모듈 스크립트라서 파일을 더블클릭하면 안 열립니다. 로컬 서버로 여세요.

    npx serve .
    # 또는
    python3 -m http.server 8000

VS Code라면 Live Server 확장으로 index.html을 열어도 됩니다.

## 구조
- index.html — 마크업
- style.css — 스타일 (유리 버튼, 패널)
- main.js — 프로젝트 데이터, 3D 유리판, 인터랙션
- images/ — 작업 이미지 넣는 폴더

## 수정 포인트 (main.js)
- `projects` 배열: 제목, 클라이언트, 연도, 설명, 이미지 (`img: "./images/a.jpg"`)
- `FS` 셰이더: 유리 흐림 정도 (`fog*6.` 블러 강도, `fog*.6` 헤이즈 양)
- `DIR`, `BASE`: 판 간격과 위치
- `damp(5)`: 스크롤 따라오는 속도 (클수록 빠름)

## Vite로 옮길 때
`npm i three` 후 index.html의 importmap 블록만 지우면 됩니다.

## 윗면 두께 (현재 켜짐)
main.js에서 스택 유리판 재질의 `uEdge:{value:1}`을 `0`으로 바꾸면 꺼집니다.
조건: 아주 얇은 반투명 사다리꼴 윗면(T=.0045), 이미지 맨 윗부분 평균색 단색, 앞쪽 모서리로 갈수록 살짝 어둡게.
