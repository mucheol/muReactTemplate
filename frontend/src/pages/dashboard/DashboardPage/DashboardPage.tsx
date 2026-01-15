import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  Stack,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from '@mui/material';
import dayjs from 'dayjs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import type { PeriodType, ChannelType } from './types';
import { PIE_COLORS, CARD_STYLE } from './constants';
import { calculateConversionRate } from './utils';
import { useDashboardData } from './hooks/useDashboardData';
import { StatCard } from './components/StatCard';

const DashboardPage: React.FC = () => {
  const today = dayjs().format('YYYY.MM.DD');

  const [period, setPeriod] = useState<PeriodType>('7d');
  const [channel, setChannel] = useState<ChannelType>('all');

  const { trafficData, totalVisitors, totalOrders, revenue, conversionRate, channelPieData } =
    useDashboardData(period, channel);

  const handleResetFilters = () => {
    setPeriod('7d');
    setChannel('all');
  };

  const handleApplyFilters = () => {
    console.log('필터 적용:', { period, channel });
  };

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* 1. 헤더 */}
        <Box
          sx={{
            mb: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Box>
            <Typography variant="overline" color="primary.main" sx={{ letterSpacing: 1 }}>
              DASHBOARD
            </Typography>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              운영 현황 대시보드
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              서비스의 핵심 지표와 트래픽 흐름을 한눈에 확인하세요.
            </Typography>
            <Typography variant="caption" color="text.secondary">
              기준일: {today}
            </Typography>
          </Box>

          {/* 오른쪽 요약 박스 */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 2,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              minWidth: 220,
            }}
          >
            <CardContent sx={{ py: 1.5, px: 2 }}>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                선택된 기간 요약
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                방문자 {totalVisitors.toLocaleString()}명
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                주문 {totalOrders.toLocaleString()}건
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* 2. 필터 영역 */}
        <Card sx={{ mb: 3, ...CARD_STYLE }}>
          <CardContent sx={{ py: 2 }}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              alignItems={{ xs: 'flex-start', md: 'center' }}
            >
              <Stack direction="row" spacing={2}>
                <TextField
                  select
                  size="small"
                  label="기간"
                  value={period}
                  onChange={(e) =>
                    setPeriod(e.target.value as 'today' | '7d' | '30d')
                  }
                  sx={{ minWidth: 160 }}
                >
                  <MenuItem value="today">오늘</MenuItem>
                  <MenuItem value="7d">최근 7일</MenuItem>
                  <MenuItem value="30d">최근 30일</MenuItem>
                </TextField>

                <TextField
                  select
                  size="small"
                  label="채널"
                  value={channel}
                  onChange={(e) =>
                    setChannel(e.target.value as 'all' | 'web' | 'mobile')
                  }
                  sx={{ minWidth: 160 }}
                >
                  <MenuItem value="all">전체</MenuItem>
                  <MenuItem value="web">웹</MenuItem>
                  <MenuItem value="mobile">모바일</MenuItem>
                </TextField>
              </Stack>

              <Box sx={{ flexGrow: 1 }} />

              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleResetFilters}
                >
                  초기화
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleApplyFilters}
                >
                  적용
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* 3. 상단 통계 카드 4개 */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 2, mb: 3 }}>
          <StatCard
            title="방문자 수"
            value={totalVisitors}
            change="▲ 전일 대비 +5.2%"
            color="primary"
          />
          <StatCard
            title="주문 수"
            value={totalOrders}
            change="▲ 전일 대비 +3.1%"
            color="success"
          />
          <StatCard
            title="매출액"
            value={revenue}
            change="▲ 전일 대비 +7.8%"
            color="warning"
          />
          <StatCard
            title="전환율"
            value={conversionRate}
            change="▲ 전일 대비 +0.3pt"
            color="info"
          />
        </Box>

        {/* 4. 중단: 차트 2개 영역 */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 2, mb: 3 }}>
          {/* 좌측: 메인 차트 */}
          <Box>
            <Card sx={{ height: 340, ...CARD_STYLE }}>
              <CardContent
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  pb: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    트래픽 추이
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    단위: 건
                  </Typography>
                </Box>

                <Typography variant="caption" color="text.secondary">
                  선택된 기간({period}) 동안의 방문자 / 주문 수 추이
                </Typography>

                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ mt: 1 }}
                  alignItems="center"
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box
                      sx={{ width: 12, height: 2, bgcolor: 'primary.main' }}
                    />
                    <Typography variant="caption">방문자 수</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box
                      sx={{ width: 12, height: 2, bgcolor: 'success.main' }}
                    />
                    <Typography variant="caption">주문 수</Typography>
                  </Box>
                </Stack>

                <Box
                  sx={{
                    mt: 2,
                    borderRadius: 1,
                    bgcolor: 'grey.100',
                    flexGrow: 1,
                    p: 1,
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trafficData}
                      margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value: number | undefined, name: string | undefined) => {
                          const label =
                            name === 'visitors' ? '방문자 수' : '주문 수';
                          return [`${(value ?? 0).toLocaleString()}건`, label];
                        }}
                      />
                      <Legend
                        formatter={(value: string | undefined) =>
                          value === 'visitors' ? '방문자 수' : '주문 수'
                        }
                      />
                      <Line
                        type="monotone"
                        dataKey="visitors"
                        name="visitors"
                        stroke={PIE_COLORS[0]}
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="orders"
                        name="orders"
                        stroke={PIE_COLORS[1]}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* 우측: 채널 비율 */}
          <Box>
            <Card sx={{ height: 340, ...CARD_STYLE }}>
              <CardContent
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  pb: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    채널별 비율
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {channel === 'all'
                      ? '전체 채널 기준'
                      : `선택 채널: ${channel}`}
                  </Typography>
                </Box>

                <Typography variant="caption" color="text.secondary">
                  웹 / 모바일 / 기타 채널 비중
                </Typography>


                <Box
                  sx={{
                    mt: 2,
                    borderRadius: 1,
                    bgcolor: 'grey.100',
                    flexGrow: 1,
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={channelPieData}
                          dataKey="value"
                          nameKey="name"
                          outerRadius={65}
                          innerRadius={22}
                          paddingAngle={1}
                          label={false}
                        >
                          {channelPieData.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={PIE_COLORS[index % PIE_COLORS.length]}
                            />
                          ))}
                        </Pie>

                        <Tooltip
                          formatter={(value: number | undefined, name: string | undefined) => [
                            `${value ?? 0}%`,
                            name ?? '',
                          ]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>

                  {/* 차트 아래에 색 + 텍스트로 항목/비율 표시 */}
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mt: 1, justifyContent: 'center' }}
                  >
                    {channelPieData.map((item, index) => (
                      <Box
                        key={item.name}
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: PIE_COLORS[index],
                          }}
                        />
                        <Typography variant="caption">
                          {item.name} {item.value}%
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* 5. 하단: 데이터 테이블 */}
        <Card sx={CARD_STYLE}>
          <CardContent>
            <Box
              sx={{
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                상세 데이터
              </Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  size="small"
                  placeholder="검색"
                  sx={{ minWidth: 160 }}
                />
                <Button variant="outlined" size="small">
                  CSV 내보내기
                </Button>
              </Stack>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead
                  sx={{
                    '& .MuiTableCell-root': {
                      bgcolor: 'grey.100',
                      fontWeight: 600,
                    },
                  }}
                >
                  <TableRow>
                    <TableCell>날짜</TableCell>
                    <TableCell>방문자 수</TableCell>
                    <TableCell>주문 수</TableCell>
                    <TableCell>전환율</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trafficData.map((row) => (
                    <TableRow
                      key={row.name}
                      hover
                      sx={{
                        '&:last-of-type td, &:last-of-type th': { borderBottom: 0 },
                      }}
                    >
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.visitors.toLocaleString()}</TableCell>
                      <TableCell>{row.orders.toLocaleString()}</TableCell>
                      <TableCell>
                        {calculateConversionRate(row.visitors, row.orders)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default DashboardPage;
