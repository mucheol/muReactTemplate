import { useState } from 'react';
import { Box, Button, Typography, Paper, Grid, LinearProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface StampLocation {
  id: string;
  title: string;
  description: string;
  path: string;
}

interface StampRallyProps {
  locations: StampLocation[];
}

export const StampRally: React.FC<StampRallyProps> = ({ locations }) => {
  const [visitedLocations, setVisitedLocations] = useState<string[]>(['shop', 'blog']); // 예시: 이미 방문한 곳
  const [showReward, setShowReward] = useState(false);

  const progress = (visitedLocations.length / locations.length) * 100;
  const isCompleted = visitedLocations.length === locations.length;

  const handleVisit = (locationId: string, path: string) => {
    if (visitedLocations.includes(locationId)) {
      // 이미 방문한 곳이면 해당 페이지로 이동
      window.location.href = path;
    } else {
      // 방문하지 않은 곳이면 스탬프 찍고 이동
      setVisitedLocations([...visitedLocations, locationId]);
      setTimeout(() => {
        window.location.href = path;
      }, 1000);
    }
  };

  const handleClaimReward = () => {
    setShowReward(true);
  };

  const getLocationIcon = (locationId: string) => {
    if (visitedLocations.includes(locationId)) {
      return <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main' }} />;
    }
    return <RadioButtonUncheckedIcon sx={{ fontSize: 60, color: 'grey.300' }} />;
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      {/* 진행 현황 */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            스탬프 투어 진행 현황
          </Typography>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            {visitedLocations.length} / {locations.length}
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 1, mb: 1 }} />
        <Typography variant="body2" color="text.secondary" textAlign="right">
          {progress.toFixed(0)}% 완료
        </Typography>
      </Paper>

      {/* 완료 보상 */}
      {isCompleted && !showReward && (
        <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: 'warning.light', textAlign: 'center' }}>
          <EmojiEventsIcon sx={{ fontSize: 48, color: 'warning.dark', mb: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            축하합니다! 모든 스탬프를 모았습니다!
          </Typography>
          <Button variant="contained" size="large" color="warning" onClick={handleClaimReward}>
            보상 받기 (5,000원 쿠폰)
          </Button>
        </Paper>
      )}

      {showReward && (
        <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: 'success.light', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            🎉 5,000원 쿠폰 지급 완료! 🎉
          </Typography>
          <Typography variant="body2">마이페이지 > 쿠폰함에서 확인하실 수 있습니다.</Typography>
        </Paper>
      )}

      {/* 스탬프 목록 */}
      <Grid container spacing={2}>
        {locations.map((location) => {
          const isVisited = visitedLocations.includes(location.id);

          return (
            <Grid item xs={12} sm={6} md={4} key={location.id}>
              <Paper
                elevation={isVisited ? 3 : 1}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  bgcolor: isVisited ? 'success.50' : 'background.paper',
                  border: 2,
                  borderColor: isVisited ? 'success.main' : 'divider',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
                onClick={() => handleVisit(location.id, location.path)}
              >
                {/* 스탬프 아이콘 */}
                <Box sx={{ mb: 2 }}>{getLocationIcon(location.id)}</Box>

                {/* 위치 정보 */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {location.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {location.description}
                </Typography>

                {/* 버튼 */}
                <Button
                  variant={isVisited ? 'outlined' : 'contained'}
                  size="small"
                  fullWidth
                  color={isVisited ? 'success' : 'primary'}
                >
                  {isVisited ? '✓ 방문 완료' : '방문하기'}
                </Button>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* 안내 사항 */}
      <Paper elevation={1} sx={{ p: 2, mt: 3, bgcolor: 'info.50' }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          스탬프 투어 안내
        </Typography>
        <Typography variant="caption" component="div" color="text.secondary">
          · 각 위치를 방문하여 스탬프를 모아보세요.
          <br />
          · 모든 스탬프를 모으면 5,000원 쿠폰을 드립니다.
          <br />
          · 스탬프는 한 번만 찍을 수 있습니다.
          <br />· 이벤트 기간 내에 완료해야 보상을 받을 수 있습니다.
        </Typography>
      </Paper>
    </Box>
  );
};

export default StampRally;
