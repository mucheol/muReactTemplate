# 배포 가이드 (Deployment Guide)

이 문서는 muReactTemplate을 Vercel(프론트엔드) + Render(백엔드)로 무료 배포하는 방법을 안내합니다.

## 📋 배포 전 체크리스트

- [ ] GitHub 계정
- [ ] Vercel 계정 (GitHub 연동)
- [ ] Render 계정 (GitHub 연동)

---

## 🚀 1단계: GitHub에 코드 푸시

```bash
# 현재 변경사항 확인
git status

# 원격 저장소에 푸시
git push origin main
```

---

## 🖥️ 2단계: 백엔드 배포 (Render)

### 2-1. Render 설정

1. [Render](https://render.com/) 접속 및 로그인
2. **New +** 버튼 클릭 → **Web Service** 선택
3. GitHub 저장소 연결
4. 저장소에서 `muReactTemplate` 선택

### 2-2. 배포 설정

**Build & Deploy 설정:**
```
Name: mureacttemplate-backend (원하는 이름)
Region: Singapore (가장 가까운 지역)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install && npm run build && npx prisma generate && npx prisma migrate deploy
Start Command: npm start
Instance Type: Free
```

### 2-3. 환경 변수 설정

**Environment Variables** 섹션에서 다음 추가:

```
NODE_ENV = production
PORT = 4000
CORS_ORIGIN = https://your-frontend-url.vercel.app
```

> **주의**: `CORS_ORIGIN`은 프론트엔드 배포 후 Vercel URL로 업데이트해야 합니다.

### 2-4. 배포 시작

- **Create Web Service** 버튼 클릭
- 배포 완료까지 약 5-10분 소요
- 배포 완료 후 URL 복사 (예: `https://mureacttemplate-backend.onrender.com`)

---

## 🌐 3단계: 프론트엔드 배포 (Vercel)

### 3-1. Vercel 설정

1. [Vercel](https://vercel.com/) 접속 및 로그인
2. **Add New...** → **Project** 선택
3. GitHub 저장소 `muReactTemplate` Import

### 3-2. 프로젝트 설정

**Configure Project:**
```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build (자동 감지)
Output Directory: dist (자동 감지)
Install Command: npm install (자동 감지)
```

### 3-3. 환경 변수 설정

**Environment Variables** 섹션에서 추가:

```
Name: VITE_API_URL
Value: https://your-backend-url.onrender.com/api
Environment: Production
```

> **중요**: Render에서 복사한 백엔드 URL 뒤에 `/api` 붙이기!

예시:
```
VITE_API_URL = https://mureacttemplate-backend.onrender.com/api
```

### 3-4. 배포 시작

- **Deploy** 버튼 클릭
- 배포 완료까지 약 2-3분 소요
- 배포 완료 후 URL 복사 (예: `https://mureacttemplate.vercel.app`)

---

## 🔄 4단계: CORS 설정 업데이트

프론트엔드 배포 완료 후, 백엔드 CORS 설정을 업데이트해야 합니다.

### Render에서 환경 변수 수정

1. Render 대시보드 → 백엔드 서비스 선택
2. **Environment** 탭 클릭
3. `CORS_ORIGIN` 값을 Vercel URL로 변경

```
CORS_ORIGIN = https://mureacttemplate.vercel.app
```

4. **Save Changes** 클릭
5. 서비스가 자동으로 재배포됩니다 (약 1-2분)

---

## ✅ 5단계: 배포 확인

### 프론트엔드 테스트
1. Vercel URL 접속
2. 홈 페이지 로드 확인
3. 블로그, 쇼핑몰 등 페이지 이동 테스트

### 백엔드 연동 테스트
1. 블로그 페이지에서 게시글 로드 확인
2. 예약 페이지에서 예약 생성 테스트
3. 관리자 페이지 로그인 테스트

---

## 🔧 추가 설정 (선택사항)

### 커스텀 도메인 연결

**Vercel (프론트엔드):**
1. 프로젝트 → Settings → Domains
2. 도메인 추가 및 DNS 설정

**Render (백엔드):**
1. 서비스 → Settings → Custom Domain
2. 도메인 추가 및 DNS 설정

### 데이터베이스 백업

SQLite 파일은 Render 서버에 저장되므로, 정기적으로 백업하는 것이 좋습니다.

```bash
# Render Shell에서 실행
sqlite3 prisma/dev.db .dump > backup.sql
```

---

## 🐛 문제 해결

### 1. "Failed to fetch" 에러
**원인**: CORS 설정 문제
**해결**: Render 환경 변수 `CORS_ORIGIN`이 Vercel URL과 정확히 일치하는지 확인

### 2. 첫 접속이 느림
**원인**: Render 무료 플랜은 15분 비활성 시 슬립 모드
**해결**: 정상 동작입니다. 첫 요청만 5-10초 소요, 이후 정상 속도

### 3. 이미지 업로드 안됨
**원인**: Render는 재배포 시 업로드 파일 삭제
**해결**:
- 포트폴리오용: 샘플 이미지 URL 사용
- 실서비스: AWS S3, Cloudinary 등 클라우드 스토리지 사용

### 4. DB 데이터 사라짐
**원인**: Render 무료 플랜은 재배포 시 SQLite 초기화
**해결**:
- 포트폴리오용: Prisma seed로 샘플 데이터 자동 생성
- 실서비스: PostgreSQL로 마이그레이션

---

## 📊 배포 후 관리

### 자동 배포 설정

GitHub `main` 브랜치에 푸시하면 자동으로 배포됩니다:
- **Vercel**: 커밋 즉시 자동 배포
- **Render**: 커밋 즉시 자동 배포

### 배포 로그 확인

**Vercel:**
- 프로젝트 → Deployments → 최근 배포 클릭

**Render:**
- 서비스 → Logs 탭

---

## 💰 비용 (무료 플랜 기준)

| 서비스 | 무료 한도 | 초과 시 |
|--------|-----------|---------|
| **Vercel** | 100GB 대역폭/월 | 유료 플랜 전환 |
| **Render** | 750시간/월, 슬립모드 | 유료 플랜 $7/월 |

포트폴리오 용도로는 무료 플랜으로 충분합니다!

---

## 🎉 배포 완료!

축하합니다! 이제 누구나 접속 가능한 웹사이트가 되었습니다.

**배포 URL 예시:**
- 프론트엔드: `https://mureacttemplate.vercel.app`
- 백엔드: `https://mureacttemplate-backend.onrender.com`

---

## 📝 면접 시 설명 포인트

1. **풀스택 배포 경험**: Vercel + Render 조합으로 프론트/백엔드 분리 배포
2. **환경 변수 관리**: 개발/프로덕션 환경 분리
3. **CORS 이해**: 프론트엔드-백엔드 간 통신 보안 설정
4. **CI/CD**: GitHub 연동 자동 배포 파이프라인
5. **비용 최적화**: 무료 플랜 활용하여 포트폴리오 운영

---

## 📚 참고 자료

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [Express Deployment Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
