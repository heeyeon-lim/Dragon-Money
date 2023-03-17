import React from 'react';
import styled from 'styled-components';
// import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';

// 테스트용 주석 추가
const Login: React.FC = () => {
  // 서버에 post 요청을 보내면, 서버는 클라이언트를 google계정선택화면인 'https://accounts.google.com/o/oauth/v2/auth/oauthchooseaccount?rediret-uri=서버주소' 로 redirect-uri를 붙여서 리다이렉트 해준다.

  // const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  // const requestGoogleLoginHandler = (): void => {
  //   // console.log('clientID:', CLIENT_ID);
  //   axios.post(
  //     'http://ec2-15-164-95-47.ap-northeast-2.compute.amazonaws.com/oauth2/authorization/google',
  //     null,
  //   );
  // const clientid =
  //   '837111839897-qut2rrrspaev8hr4fj35n6569k23f4ij.apps.googleusercontent.com';
  // return window.location.assign(
  //   `https://accounts.google.com/o/oauth2/v2/auth?scope=profile&response_type=code&client_id=${clientid}&redirect_uri=http://ec2-15-164-95-47.ap-northeast-2.compute.amazonaws.com/login/oauth2/code/google`,
  // );
  // };

  //   const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  //   console.log(CLIENT_ID);
  // return window.location.assign(
  //   `https://accounts.google.com/o/oauth2/v2/auth?scope=profile&response_type=code&client_id=${CLIENT_ID}&redirect_uri=http://hp5234-dragonmoney-front.s3-website.ap-northeast-2.amazonaws.com/redirect`,
  // );

  // const loginKakaoHandler = () => {
  //   const KAKAO_LOGIN_URL = 'https://dev.somojeon.site/oauth2/authorization/kakao';
  //   const handleKakaoLogin = async () => {
  //     const res = await getFetch(KAKAO_LOGIN_URL);
  //     console.log('카카오톡 로그인 응답 : ', res);
  //   };

  //   axios.get(url, )

  //   export const getFetch = async (url: string) => {
  //     try {
  //       const res = await axios.get(url);
  //       return res.data;
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  // }

  const loginGoogleHandler = () => {
    return window.location.assign(
      'http://ec2-52-78-117-163.ap-northeast-2.compute.amazonaws.com/oauth2/authorization/google',
    );
  };

  return (
    <>
      <LoginMain>
        <LoginForm>
          <div>Logo</div>
          <p>회원가입 없이 간편하게 로그인하세요</p>
          <LoginBtnContainer>
            <button className="btn google" onClick={loginGoogleHandler}>
              <FcGoogle size="24" style={{ margin: '10px' }} />
              Google로 로그인하기
            </button>
            <button className="btn kakao">
              <RiKakaoTalkFill size="24" style={{ margin: '10px' }} />
              Kakao로 로그인하기
            </button>
            <button className="btn naver">
              <SiNaver color="#fff" style={{ margin: '10px' }} />
              Naver로 로그인하기
            </button>
          </LoginBtnContainer>
        </LoginForm>
      </LoginMain>
    </>
  );
};

export default Login;

// 메인 전체
const LoginMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 로그인 폼
const LoginForm = styled.div`
  width: 503px;
  height: 426px;
  margin: auto;
  background-color: var(--background-color);
  border: 2px solid var(--border-color);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  > p {
    color: #5c5c5c;
    font-size: 12px;
  }
`;

// OAuth 버튼 컨테이너
const LoginBtnContainer = styled.div`
  width: 431px;
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > .btn {
    height: 50px;
    border: 1px solid var(--border-color);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  > .google {
    background-color: #fff;
    color: #7b7b7b;
  }
  > .kakao {
    background-color: #f2d303;
    color: #442400;
  }
  > .naver {
    background-color: #03c73c;
    color: #fff;
  }
`;
