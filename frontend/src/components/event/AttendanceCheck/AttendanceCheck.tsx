import { useState } from 'react';
import { Box, Button, Typography, Paper, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export const AttendanceCheck: React.FC = () => {
  const [checkedDays, setCheckedDays] = useState<number[]>([1, 2, 3]); // 예시: 1,2,3일 출석
  const [todayChecked, setTodayChecked] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const today = 4; // 현재 날짜 (예시)
  const totalDays = 30;

  const handleCheckIn = () => {
    if (todayChecked) return;

    setTodayChecked(true);
    setCheckedDays([...checkedDays, today]);
    setShowReward(true);

    setTimeout(() => setShowReward(false), 3000);
  };

  const getDayStatus = (day: number) => {
    if (checkedDays.includes(day)) return 'checked';
    if (day === today) return 'today';
    return 'unchecked';
  };

  const getReward = (day: number) => {
    if (day % 7 === 0) return '1,000P';
    if (day % 14 === 0) return '3,000P';
    if (day === 30) return '10,000P';
    return '100P';
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      {/* 출석 현황 */}
      <Paper elevation={2} sx={{ p: 3, mb: 3, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
          연속 출석
        </Typography>
        <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
          {checkedDays.length}일
        </Typography>
        <Typography variant="body2" color="text.secondary">
          총 적립 포인트: {checkedDays.length * 100}P
        </Typography>
      </Paper>

      {/* 출석 버튼 */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleCheckIn}
          disabled={todayChecked}
          sx={{
            px: 6,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 'bold',
          }}
        >
          {todayChecked ? '오늘 출석 완료!' : '출석 체크하기'}
        </Button>
      </Box>

      {/* 보상 알림 */}
      {showReward && (
        <Paper
          elevation={3}
          sx={{
            p: 2,
            mb: 3,
            textAlign: 'center',
            bgcolor: 'success.light',
            color: 'success.contrastText',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            🎉 출석 체크 완료! +{getReward(today)} 🎉
          </Typography>
        </Paper>
      )}

      {/* 출석 달력 */}
      <Paper elevation={1} sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
          출석 달력
        </Typography>
        <Grid container spacing={1}>
          {Array.from({ length: totalDays }).map((_, index) => {
            const day = index + 1;
            const status = getDayStatus(day);
            const reward = getReward(day);
            const isBonusDay = day % 7 === 0 || day === 30;

            return (
              <Grid size={{ xs: 2.4 }} key={day}>
                <Paper
                  elevation={status === 'today' ? 3 : 1}
                  sx={{
                    p: 1.5,
                    textAlign: 'center',
                    bgcolor:
                      status === 'checked'
                        ? 'primary.light'
                        : status === 'today'
                        ? 'warning.light'
                        : 'background.paper',
                    border: status === 'today' ? 2 : 0,
                    borderColor: 'warning.main',
                    position: 'relative',
                  }}
                >
                  {isBonusDay && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        bgcolor: 'error.main',
                        color: 'white',
                        borderRadius: '50%',
                        width: 20,
                        height: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                      }}
                    >
                      ★
                    </Box>
                  )}

                  <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>
                    Day {day}
                  </Typography>

                  {status === 'checked' ? (
                    <CheckCircleIcon color="primary" sx={{ fontSize: 28 }} />
                  ) : (
                    <RadioButtonUncheckedIcon color="disabled" sx={{ fontSize: 28 }} />
                  )}

                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mt: 0.5,
                      fontWeight: isBonusDay ? 'bold' : 'normal',
                      color: isBonusDay ? 'error.main' : 'text.secondary',
                    }}
                  >
                    {reward}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Paper>

      {/* 출석 혜택 안내 */}
      <Paper elevation={1} sx={{ p: 2, mt: 3, bgcolor: 'info.50' }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          출석 혜택 안내
        </Typography>
        <Typography variant="caption" component="div" color="text.secondary">
          · 매일 출석: 100 포인트
          <br />
          · 7일 연속: 1,000 포인트 보너스
          <br />
          · 14일 연속: 3,000 포인트 보너스
          <br />
          · 30일 완주: 10,000 포인트 보너스
          <br />· 출석이 끊기면 처음부터 다시 시작됩니다.
        </Typography>
      </Paper>
    </Box>
  );
};

export default AttendanceCheck;
