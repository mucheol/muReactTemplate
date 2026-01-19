import React from "react";
import {
	Box,
	Container,
	Typography,
	Card,
	CardContent,
	Stack,
	Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import dayjs from "dayjs";

// 홈 페이지 (기본 랜딩)
const HomePage: React.FC = () => {
	const today = dayjs().format("YYYY.MM.DD");

	return (
		<Box sx={{ bgcolor: "grey.50", minHeight: "100vh", py: 4 }}>
			<Container maxWidth="lg">
				{/* 헤더 */}
				<Box sx={{ mb: 4 }}>
					<Typography
						variant="overline"
						color="primary.main"
						sx={{ letterSpacing: 1 }}
					>
						HOME
					</Typography>
					<Typography
						variant="h4"
						component="h1"
						sx={{ fontWeight: 700, mb: 0.5 }}
					>
						운영 센터 홈
					</Typography>
					<Typography variant="body2" color="text.secondary">
						서비스 운영 현황을 한눈에 보고, 상단 메뉴를 통해 주요 기능으로
						이동하세요.
					</Typography>
					<Typography variant="caption" color="text.secondary">
						기준일: {today}
					</Typography>
				</Box>

				{/* 주요 영역 현황 요약 카드 */}
				<Box
					sx={{
						mb: 4,
						display: "flex",
						flexWrap: "wrap",
						gap: 2,
					}}
				>
					{/* 공통 카드 스타일: 조금 더 작은 카드 + 개수 추가 */}
					{[
						{
							icon: <DashboardIcon color="primary" />,
							title: "대시보드",
							desc: "운영 지표를 한눈에 모니터링합니다.",
							sub: `최근 갱신: ${today}`,
						},
						{
							icon: <EventNoteIcon color="primary" />,
							title: "예약 관리",
							desc: "오늘 및 예정된 예약을 관리합니다.",
							sub: "오늘 예약: 0건 (더미)",
						},
						{
							icon: <HelpOutlineIcon color="primary" />,
							title: "FAQ 관리",
							desc: "자주 묻는 질문과 답변을 관리합니다.",
							sub: "등록된 FAQ: 0개 (더미)",
						},
						{
							icon: <PersonOutlineIcon color="primary" />,
							title: "마이페이지",
							desc: "내 계정/알림 설정을 확인합니다.",
							sub: "마지막 로그인: 오늘 (더미)",
						},
					].map((card) => (
						<Card
							key={card.title}
							sx={{
								flex: "1 1 220px", // ✅ 더 작은 카드
								maxWidth: 260,
								borderRadius: 2,
								border: "1px solid",
								borderColor: "grey.200",
							}}
						>
							<CardContent sx={{ py: 1.5 }}>
								<Stack spacing={0.75}>
									{card.icon}
									<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
										{card.title}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{card.desc}
									</Typography>
									<Typography variant="caption" color="text.secondary">
										{card.sub}
									</Typography>
								</Stack>
							</CardContent>
						</Card>
					))}
				</Box>

				{/* 오늘 간단 요약 카드 (추가) */}
				<Grid container spacing={2} sx={{ mb: 4 }}>
					<Grid item xs={12} sm={4}>
						<Card
							sx={{
								borderRadius: 2,
								border: "1px solid",
								borderColor: "grey.200",
							}}
						>
							<CardContent sx={{ py: 1.5 }}>
								<Typography variant="caption" color="text.secondary">
									오늘 방문자 (더미)
								</Typography>
								<Typography variant="h6" sx={{ fontWeight: 700 }}>
									0 명
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Card
							sx={{
								borderRadius: 2,
								border: "1px solid",
								borderColor: "grey.200",
							}}
						>
							<CardContent sx={{ py: 1.5 }}>
								<Typography variant="caption" color="text.secondary">
									오늘 예약 (더미)
								</Typography>
								<Typography variant="h6" sx={{ fontWeight: 700 }}>
									0 건
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Card
							sx={{
								borderRadius: 2,
								border: "1px solid",
								borderColor: "grey.200",
							}}
						>
							<CardContent sx={{ py: 1.5 }}>
								<Typography variant="caption" color="text.secondary">
									처리 대기 요청 (더미)
								</Typography>
								<Typography variant="h6" sx={{ fontWeight: 700 }}>
									0 건
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>

				{/* 공지 / 업데이트 / 도움말 영역 */}
				<Grid container spacing={2}>
					<Grid item xs={12} md={8}>
						<Card
							sx={{
								borderRadius: 2,
								border: "1px solid",
								borderColor: "grey.200",
							}}
						>
							<CardContent>
								<Stack
									direction="row"
									spacing={1}
									alignItems="center"
									sx={{ mb: 1.5 }}
								>
									<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
										공지사항
									</Typography>
									<Chip label="NEW" size="small" color="primary" />
								</Stack>
								<Stack spacing={1}>
									<Typography variant="body2">
										• 시스템 점검 안내 (01/25 02:00 ~ 04:00)
									</Typography>
									<Typography variant="body2">
										• 신규 대시보드 위젯 베타 기능 오픈
									</Typography>
									<Typography variant="body2">
										• 예약 내역 CSV 다운로드 기능 추가
									</Typography>
								</Stack>
							</CardContent>
						</Card>
					</Grid>

					<Grid item xs={12} md={4}>
						<Card
							sx={{
								borderRadius: 2,
								border: "1px solid",
								borderColor: "grey.200",
							}}
						>
							<CardContent>
								<Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
									빠른 도움말
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ mb: 1 }}
								>
									자주 사용하는 기능의 간단 가이드를 확인해 보세요.
								</Typography>
								<Stack spacing={0.5}>
									<Typography variant="body2">• 예약 등록/수정 방법</Typography>
									<Typography variant="body2">• 대시보드 지표 설명</Typography>
									<Typography variant="body2">
										• 계정/비밀번호 변경 방법
									</Typography>
								</Stack>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default HomePage;
