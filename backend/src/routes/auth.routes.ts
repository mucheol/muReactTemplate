import express = require('express');

const router = express.Router();

// 간단 인메모리 유저 저장소
type User = {
  id: number;
  email: string;
  password: string; // 나중에 해시로 교체
  name: string;
};

const users: User[] = [];
let nextId = 1;

// 회원가입 API
router.post('/register', (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: '이메일, 비밀번호, 이름은 필수입니다.' });
  }

  // 이메일 중복 체크
  const exists = users.find((u) => u.email === email);
  if (exists) {
    return res.status(409).json({ message: '이미 사용 중인 이메일입니다.' });
  }

  const newUser: User = { id: nextId++, email, password, name };
  users.push(newUser);

  return res.status(201).json({
    message: '회원가입 성공',
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    },
  });
});

// 로그인 API
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: '이메일과 비밀번호를 입력해 주세요.' });
  }

  const user = users.find((u) => u.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
  }

  // 문자열 토큰 (나중에 JWT로 교체 가능)
  const token = `fake-${user.id}-${Date.now()}`;

  return res.status(200).json({
    message: '로그인 성공',
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
});

export = router;
