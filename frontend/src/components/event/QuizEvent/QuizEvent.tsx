import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  LinearProgress,
  Alert,
} from '@mui/material';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizEventProps {
  questions: QuizQuestion[];
}

export const QuizEvent: React.FC<QuizEventProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setIsAnswered(true);
    setAnswers([...answers, selectedAnswer]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correctCount++;
      }
    });
    return correctCount;
  };

  const getReward = (score: number) => {
    if (score === questions.length) return '5,000원 쿠폰';
    if (score >= questions.length * 0.8) return '3,000원 쿠폰';
    if (score >= questions.length * 0.6) return '1,000 포인트';
    if (score >= questions.length * 0.4) return '500 포인트';
    return '참여 감사 100 포인트';
  };

  if (showResult) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    const reward = getReward(score);

    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            🎉 퀴즈 완료! 🎉
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
              {score} / {questions.length}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              정답률: {percentage.toFixed(0)}%
            </Typography>
          </Box>

          <Alert severity={percentage >= 60 ? 'success' : 'info'} sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              획득 보상: {reward}
            </Typography>
            <Typography variant="body2">마이페이지에서 확인하실 수 있습니다.</Typography>
          </Alert>

          {/* 문제별 정오답 */}
          <Box sx={{ textAlign: 'left', mt: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              문제별 결과
            </Typography>
            {questions.map((q, index) => (
              <Paper key={q.id} elevation={1} sx={{ p: 2, mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 'bold',
                      color: answers[index] === q.correctAnswer ? 'success.main' : 'error.main',
                    }}
                  >
                    Q{index + 1}.
                  </Typography>
                  <Typography variant="body2">{q.question}</Typography>
                  <Box sx={{ ml: 'auto' }}>
                    {answers[index] === q.correctAnswer ? (
                      <Typography variant="caption" color="success.main" sx={{ fontWeight: 'bold' }}>
                        ✓ 정답
                      </Typography>
                    ) : (
                      <Typography variant="caption" color="error.main" sx={{ fontWeight: 'bold' }}>
                        ✗ 오답
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={() => window.location.reload()}
            sx={{ mt: 3 }}
          >
            다시 도전하기
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      {/* 진행 상황 */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            문제 {currentQuestionIndex + 1} / {questions.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {progress.toFixed(0)}%
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 1 }} />
      </Box>

      {/* 문제 */}
      <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
          Q{currentQuestionIndex + 1}. {currentQuestion.question}
        </Typography>

        <RadioGroup value={selectedAnswer} onChange={(e) => handleAnswerSelect(Number(e.target.value))}>
          {currentQuestion.options.map((option, index) => {
            let bgcolor = 'background.paper';
            let borderColor = 'divider';

            if (isAnswered) {
              if (index === currentQuestion.correctAnswer) {
                bgcolor = 'success.light';
                borderColor = 'success.main';
              } else if (index === selectedAnswer) {
                bgcolor = 'error.light';
                borderColor = 'error.main';
              }
            } else if (index === selectedAnswer) {
              bgcolor = 'primary.light';
              borderColor = 'primary.main';
            }

            return (
              <Paper
                key={index}
                elevation={selectedAnswer === index && !isAnswered ? 2 : 0}
                sx={{
                  p: 2,
                  mb: 1.5,
                  border: 2,
                  borderColor,
                  bgcolor,
                  cursor: isAnswered ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': isAnswered
                    ? {}
                    : {
                        bgcolor: 'action.hover',
                        borderColor: 'primary.main',
                      },
                }}
                onClick={() => handleAnswerSelect(index)}
              >
                <FormControlLabel
                  value={index}
                  control={<Radio disabled={isAnswered} />}
                  label={
                    <Typography variant="body1" sx={{ fontWeight: selectedAnswer === index ? 'bold' : 'normal' }}>
                      {option}
                    </Typography>
                  }
                  sx={{ width: '100%', m: 0 }}
                />
              </Paper>
            );
          })}
        </RadioGroup>
      </Paper>

      {/* 정답 피드백 */}
      {isAnswered && (
        <Alert severity={isCorrect ? 'success' : 'error'} sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {isCorrect ? '✓ 정답입니다!' : '✗ 오답입니다.'}
          </Typography>
          <Typography variant="body2">
            정답: {currentQuestion.options[currentQuestion.correctAnswer]}
          </Typography>
        </Alert>
      )}

      {/* 버튼 */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {!isAnswered ? (
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            sx={{ px: 6 }}
          >
            답안 제출
          </Button>
        ) : (
          <Button variant="contained" size="large" onClick={handleNextQuestion} sx={{ px: 6 }}>
            {currentQuestionIndex < questions.length - 1 ? '다음 문제' : '결과 확인'}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default QuizEvent;
