import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import Logo from '../../assets/Logo.png';
import LoginBtn from './LoginBtn';
import SearchBar from './SearchBar';
import SearchBtn from './SearchToggle';
import PostBtn from './PostBtn';
import MediumProfileImg from './MediumProfileImg';

function HeaderDefault() {
  const navigate = useNavigate();
  const state = useAppSelector((state) => state);
  const { pathname } = useLocation();
  return state.header.search ? (
    <SearchHead>
      <SearchBar />
    </SearchHead>
  ) : (
    <NavHead>
      <div>
        <Main onClick={() => navigate('/')}>
          <img src={Logo} height={30}></img>
        </Main>
        <nav>
          {['/seoulrent', '/recommendloan', '/happyhouse'].includes(
            pathname,
          ) ? (
            <NavBtnClicked onClick={() => navigate('/happyhouse')}>
              집구하기
            </NavBtnClicked>
          ) : (
            <NavBtn onClick={() => navigate('/happyhouse')}>집구하기</NavBtn>
          )}
          {['/stock'].includes(pathname) ? (
            <NavBtnClicked onClick={() => navigate('/')}>
              뜨는주식
            </NavBtnClicked>
          ) : (
            <NavBtn onClick={() => navigate('/')}>뜨는주식</NavBtn>
          )}
          {['/calculator'].includes(pathname) ? (
            <NavBtnClicked onClick={() => navigate('/')}>
              세금계산기
            </NavBtnClicked>
          ) : (
            <NavBtn onClick={() => navigate('/')}>세금계산기</NavBtn>
          )}
        </nav>
        <Btns>
          {pathname === '/' && <SearchBtn />}
          {state.header.login ? (
            <>
              <PostBtn /> <MediumProfileImg />
            </>
          ) : (
            <>
              <LoginBtn />
            </>
          )}
        </Btns>
      </div>
    </NavHead>
  );
}
export default HeaderDefault;

export const NavBtn = styled.button`
  background-color: #fff;
  cursor: pointer;
  :hover {
    color: #0069ca;
    transition: 0.3s;
  }
`;

export const NavBtnClicked = styled(NavBtn)`
  border-bottom: 1px solid #0069ca;
  color: #0069ca;
`;

const Main = styled.button`
  background-color: #fff;
  cursor: pointer;
`;
const NavHead = styled.header`
  border-bottom: 1px solid #d9d9d9;
  background-color: #fff;
  z-index: 98;
  padding: 10px 0;
  margin: 0 auto;
  div {
    max-width: 1100px;
    align-items: center;
    :first-child {
      margin: 0px auto;
      display: flex;
      justify-content: space-between;
    }
  }
  nav {
    width: 400px;
    display: flex;
    justify-content: space-between;
  }
`;
const SearchHead = styled.header`
  border-bottom: 1px solid #d9d9d9;
  background-color: #fff;
  padding: 10px 0;
  z-index: 98;
  div {
    max-width: 1100px;
    align-items: center;
    :first-child {
      display: flex;
      justify-content: space-between;
    }
  }
`;
const Btns = styled.div`
  display: flex;
`;
