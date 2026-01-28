import { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';

interface PrizeItem {
  id: number;
  name: string;
  probability: number;
  color: string;
}

interface PrizeWheelProps {
  prizes: PrizeItem[];
  onPrizeWon: (prize: PrizeItem) => void;
}

export const PrizeWheel: React.FC<PrizeWheelProps> = ({ prizes, onPrizeWon }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<PrizeItem | null>(null);

  const selectPrizeByProbability = (): PrizeItem => {
    const totalProbability = prizes.reduce((sum, prize) => sum + prize.probability, 0);
    let random = Math.random() * totalProbability;

    for (const prize of prizes) {
      random -= prize.probability;
      if (random <= 0) {
        return prize;
      }
    }
    return prizes[0];
  };

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedPrize(null);

    const prize = selectPrizeByProbability();
    const prizeIndex = prizes.findIndex((p) => p.id === prize.id);
    const sliceAngle = 360 / prizes.length;
    // 각 칸의 중앙을 가리키도록 sliceAngle의 절반을 더함
    const targetAngle = prizeIndex * sliceAngle + sliceAngle / 2;

    // 여러 바퀴 돌고 목표 각도에 정확히 멈춤
    const spins = 5;
    const finalRotation = rotation + 360 * spins + (360 - targetAngle);

    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedPrize(prize);
      onPrizeWon(prize);
    }, 4000);
  };

  const sliceAngle = 360 / prizes.length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      {/* 룰렛 */}
      <Box sx={{ position: 'relative', width: 350, height: 350 }}>
        {/* 화살표 표시 */}
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '15px solid transparent',
            borderRight: '15px solid transparent',
            borderTop: '30px solid #f44336',
            zIndex: 10,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
          }}
        />

        {/* 룰렛 휠 */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 200 200">
            {prizes.map((prize, index) => {
              const startAngle = (index * sliceAngle - 90) * (Math.PI / 180);
              const endAngle = ((index + 1) * sliceAngle - 90) * (Math.PI / 180);
              const midAngle = (startAngle + endAngle) / 2;

              const x1 = 100 + 100 * Math.cos(startAngle);
              const y1 = 100 + 100 * Math.sin(startAngle);
              const x2 = 100 + 100 * Math.cos(endAngle);
              const y2 = 100 + 100 * Math.sin(endAngle);

              const textX = 100 + 60 * Math.cos(midAngle);
              const textY = 100 + 60 * Math.sin(midAngle);

              return (
                <g key={prize.id}>
                  <path
                    d={`M 100 100 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`}
                    fill={prize.color}
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#333"
                    fontSize="10"
                    fontWeight="bold"
                    transform={`rotate(${index * sliceAngle}, ${textX}, ${textY})`}
                  >
                    {prize.name}
                  </text>
                </g>
              );
            })}
            {/* 중앙 원 */}
            <circle cx="100" cy="100" r="20" fill="#fff" stroke="#333" strokeWidth="2" />
          </svg>
        </Box>
      </Box>

      {/* 버튼 */}
      <Button
        variant="contained"
        size="large"
        onClick={spinWheel}
        disabled={isSpinning}
        sx={{
          px: 6,
          py: 1.5,
          fontSize: '1.1rem',
          fontWeight: 'bold',
          background: isSpinning
            ? 'grey.400'
            : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        }}
      >
        {isSpinning ? '돌리는 중...' : '룰렛 돌리기!'}
      </Button>

      {/* 결과 표시 */}
      {selectedPrize && (
        <Paper
          elevation={3}
          sx={{
            p: 3,
            textAlign: 'center',
            bgcolor: 'success.light',
            color: 'success.contrastText',
            minWidth: 300,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            🎉 축하합니다! 🎉
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {selectedPrize.name}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {selectedPrize.name === '꽝'
              ? '다음 기회에 도전해보세요!'
              : '마이페이지에서 확인하실 수 있습니다.'}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default PrizeWheel;
