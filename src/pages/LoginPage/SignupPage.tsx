import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../lib/axios"; // axios 인스턴스 import
import kakao from "../../assets/images/social/kakao-logo.png";
import google from "../../assets/images/social/google-logo.png";
import logo from "../../assets/images/logo/logo.svg";
import "../../styles/auth.css";
import "../../styles/global.css";

interface FormValues {
  nickname: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

const SignupPage: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    nickname: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const navigate = useNavigate();
  const user = localStorage.getItem("accessToken");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.password !== values.passwordRepeat) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const { nickname, email, password } = values;
    try {
      await axios.post("/auth/signUp", {
        nickname,
        email,
        password,
      });

      // 회원가입 후 로그인 처리
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      // 로그인 성공 시 토큰 저장 및 페이지 이동
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/login");
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  useEffect(() => {
    if (user) navigate("/login");
  }, [user, navigate]);

  return (
    <div className="body">
      <main className="auth-container">
        <a href="/" className="logo-home-link" aria-label="홈으로 이동">
          <img src={logo} alt="판다마켓 로고" />
        </a>

        <form id="loginForm" method="post" onSubmit={handleSubmit}>
          <div className="input-item">
            <label className="email">이메일</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해 주세요"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-item">
            <label className="nickname">닉네임</label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              placeholder="닉네임을 입력해 주세요"
              value={values.nickname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-item">
            <label className="password">비밀번호</label>
            <div className="input-wrapper">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                value={values.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-item">
            <label className="passwordConfirmation">비밀번호 확인</label>
            <div className="input-wrapper">
              <input
                id="passwordConfirmation"
                name="passwordRepeat"
                type="password"
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
                value={values.passwordRepeat}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="button pill-button full-width">
            회원가입
          </button>
        </form>

        <div className="social-login-container">
          <h3>간편 로그인하기</h3>
          <div className="social-login-links-container">
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="구글 로그인"
            >
              <img src={google} alt="구글 로그인" width="42" />
            </a>
            <a
              href="https://www.kakaocorp.com/page/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="카카오톡 로그인"
            >
              <img src={kakao} alt="카카오톡 로그인" width="42" />
            </a>
          </div>
        </div>

        <div className="auth-switch">
          이미 회원이신가요? <a href="/login">로그인</a>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
