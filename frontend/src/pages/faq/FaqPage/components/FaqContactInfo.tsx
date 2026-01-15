import React from 'react';
import { Box, Typography, Stack, Divider, Paper } from '@mui/material';
import { CARD_STYLE } from '../constants';

export const FaqContactInfo: React.FC = () => {
  return (
    <Paper elevation={0} sx={{ ...CARD_STYLE, p: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
        원하는 답변을 찾지 못하셨나요?
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        FAQ에서 해결되지 않는 경우 아래 채널을 통해 문의해 주세요.
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        divider={
          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
        }
      >
        <Box>
          <Typography variant="subtitle2">1:1 문의</Typography>
          <Typography variant="body2" color="text.secondary">
            관리자 페이지 &gt; 고객센터 &gt; 1:1 문의에서 문의를 등록하시면, 영업일 기준 24시간
            이내 답변을 드립니다.
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">이메일</Typography>
          <Typography variant="body2" color="text.secondary">
            support@example.com 으로 문의 내용을 보내주시면 순차적으로 확인 후 답변 드립니다.
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">고객센터 운영 시간</Typography>
          <Typography variant="body2" color="text.secondary">
            평일 09:00 ~ 18:00 (주말·공휴일 휴무)
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};
