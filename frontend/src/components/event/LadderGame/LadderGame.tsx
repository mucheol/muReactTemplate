import { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';

interface PrizeItem {
  id: number;
  name: string;
  probability: number;
  color: string;
}

interface LadderGameProps {
  prizes: PrizeItem[];
  onPrizeWon: (prize: PrizeItem) => void;
}

export const LadderGame: React.FC<LadderGameProps> = ({ prizes, onPrizeWon }) => {
  const [selectedStart, setSelectedStart] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPath, setCurrentPath] = useState<number[]>([]);
  const [selectedPrize, setSelectedPrize] = useState<PrizeItem | null>(null);
  const [ladderStructure, setLadderStructure] = useState<number[][]>([]);

  const numPaths = prizes.length;
  const numLevels = 8;

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

  const generateLadder = (start: number, targetEnd: number): number[][] => {
    const ladder: number[][] = [];
    let currentPosition = start;

    for (let level = 0; level < numLevels; level++) {
      ladder.push([]);
    }

    // 목표 지점으로 가는 경로 생성
    const stepsToTarget = targetEnd - start;
    const levelsPerStep = Math.floor(numLevels / (Math.abs(stepsToTarget) || 1));

    for (let level = 0; level < numLevels; level++) {
      if (currentPosition !== targetEnd && level % levelsPerStep === 0 && level > 0) {
        const direction = stepsToTarget > 0 ? 1 : -1;
        ladder[level].push(currentPosition);
        currentPosition += direction;
      }
    }

    // 추가 랜덤 다리 생성
    for (let level = 0; level < numLevels; level++) {
      if (Math.random() > 0.6 && ladder[level].length === 0) {
        const randomPos = Math.floor(Math.random() * (numPaths - 1));
        if (!ladder[level].includes(randomPos)) {
          ladder[level].push(randomPos);
        }
      }
    }

    return ladder;
  };

  const tracePath = (start: number, ladder: number[][]): number[] => {
    const path = [start];
    let currentPos = start;

    for (let level = 0; level < ladder.length; level++) {
      if (ladder[level].includes(currentPos)) {
        currentPos += 1;
      } else if (currentPos > 0 && ladder[level].includes(currentPos - 1)) {
        currentPos -= 1;
      }
      path.push(currentPos);
    }

    return path;
  };

  const startGame = (startIndex: number) => {
    if (isAnimating) return;

    setSelectedStart(startIndex);
    setSelectedPrize(null);
    setIsAnimating(true);

    const targetPrize = selectPrizeByProbability();
    const targetIndex = prizes.findIndex((p) => p.id === targetPrize.id);
    const ladder = generateLadder(startIndex, targetIndex);
    setLadderStructure(ladder);

    const path = tracePath(startIndex, ladder);
    setCurrentPath([]);

    let step = 0;
    const interval = setInterval(() => {
      if (step < path.length) {
        setCurrentPath((prev) => [...prev, path[step]]);
        step++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
        setSelectedPrize(targetPrize);
        onPrizeWon(targetPrize);
      }
    }, 300);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      {/* 출발점 선택 버튼 */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {prizes.map((_, index) => (
          <Button
            key={index}
            variant={selectedStart === index ? 'contained' : 'outlined'}
            onClick={() => !isAnimating && setSelectedStart(index)}
            disabled={isAnimating}
            sx={{ minWidth: 60 }}
          >
            {index + 1}번
          </Button>
        ))}
      </Box>

      {/* 사다리 그림 */}
      <Box
        sx={{
          position: 'relative',
          width: numPaths * 80,
          height: numLevels * 60 + 80,
          bgcolor: '#f5f5f5',
          borderRadius: 2,
          p: 2,
        }}
      >
        <svg width="100%" height="100%">
          {/* 세로 선 */}
          {Array.from({ length: numPaths }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={40 + i * 80}
              y1={20}
              x2={40 + i * 80}
              y2={numLevels * 60 + 20}
              stroke={selectedStart === i ? '#1976d2' : '#333'}
              strokeWidth={selectedStart === i ? 4 : 2}
            />
          ))}

          {/* 가로 다리 */}
          {ladderStructure.map((level, levelIndex) =>
            level.map((pos) => (
              <line
                key={`h-${levelIndex}-${pos}`}
                x1={40 + pos * 80}
                y1={20 + (levelIndex + 1) * 60}
                x2={40 + (pos + 1) * 80}
                y2={20 + (levelIndex + 1) * 60}
                stroke="#666"
                strokeWidth={3}
              />
            ))
          )}

          {/* 현재 경로 애니메이션 */}
          {currentPath.map((pos, index) => {
            if (index === 0) return null;
            const prevPos = currentPath[index - 1];
            return (
              <g key={`path-${index}`}>
                {prevPos !== pos ? (
                  // 가로 이동
                  <line
                    x1={40 + prevPos * 80}
                    y1={20 + index * 60}
                    x2={40 + pos * 80}
                    y2={20 + index * 60}
                    stroke="#f44336"
                    strokeWidth={6}
                    opacity={0.8}
                  />
                ) : (
                  // 세로 이동
                  <line
                    x1={40 + pos * 80}
                    y1={20 + (index - 1) * 60}
                    x2={40 + pos * 80}
                    y2={20 + index * 60}
                    stroke="#f44336"
                    strokeWidth={6}
                    opacity={0.8}
                  />
                )}
                <circle
                  cx={40 + pos * 80}
                  cy={20 + index * 60}
                  r={8}
                  fill="#f44336"
                />
              </g>
            );
          })}
        </svg>
      </Box>

      {/* 도착점 (경품) */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        {prizes.map((prize, index) => (
          <Paper
            key={prize.id}
            elevation={currentPath[currentPath.length - 1] === index ? 6 : 1}
            sx={{
              width: 70,
              p: 1.5,
              textAlign: 'center',
              bgcolor: prize.color,
              border:
                currentPath[currentPath.length - 1] === index
                  ? '3px solid #f44336'
                  : '1px solid #ddd',
              transform:
                currentPath[currentPath.length - 1] === index ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.3s',
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.7rem' }}>
              {prize.name}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* 시작 버튼 */}
      <Button
        variant="contained"
        size="large"
        onClick={() => selectedStart !== null && startGame(selectedStart)}
        disabled={isAnimating || selectedStart === null}
        sx={{
          px: 6,
          py: 1.5,
          fontSize: '1.1rem',
          fontWeight: 'bold',
        }}
      >
        {isAnimating ? '진행 중...' : selectedStart !== null ? '사다리 타기 시작!' : '출발점을 선택하세요'}
      </Button>

      {/* 결과 표시 */}
      {selectedPrize && !isAnimating && (
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
            🎉 결과 🎉
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {selectedPrize.name}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {selectedPrize.name === '꽝'
              ? '아쉽네요! 다음 기회에 도전하세요!'
              : '축하합니다! 마이페이지에서 확인하세요.'}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default LadderGame;
