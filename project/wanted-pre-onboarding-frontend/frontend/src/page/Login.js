import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useInputs from "../hooks/useInputs";
import { apis } from "../store/api";

const INITIAL_VALUES = {
  email: "",
  password: ""
};

const Home = () => {
	const navigate = useNavigate();
	// input의 커스텀훅
	const [values, onChange] = useInputs(INITIAL_VALUES);
	// 오류메시지 상태저장
	const [loadingError, setLoadingError] = useState(null);
	const [emailMessage, setEmailMessage] = useState('');
	const [passwordMessage, setPasswordMessage] = useState('');
	// 유효성 검사
	const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

	const onChangeEmail = useCallback((e) => {
		const { name, value } = e.target;
    onChange(name, value)
		const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

    if (!emailRegex.test(value)) {
      setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요!!')
      setIsEmail(false)
    } else {
      setEmailMessage('올바른 이메일 형식이에요 : )')
      setIsEmail(true)
    }
	},[onChange]);

	const onChangePassword = useCallback((e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const { name, value } = e.target;
    onChange(name, value)

    if (!passwordRegex.test(value)) {
      setPasswordMessage('숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요!')
      setIsPassword(false)
    } else {
      setPasswordMessage('안전한 비밀번호 입니다.')
      setIsPassword(true)
    }
  }, [onChange])

  const handleSubmit = async (e) => {
    e.preventDefault();
		let result;
		try{
			setLoadingError(null);
			result = await apis.signIn(values);
		} catch (error) {
			setLoadingError(error);
			return;
		}
		navigate('/todo');
		localStorage.setItem('accessToken', result.data.access_token);
  };

	return (
		<AuthWrap className="auth_wrap">
			<h1>로그인</h1>
			<div>
				<label className="inner required">아이디(이메일)</label>
				<input name="email" type="email" onChange={(e) => onChangeEmail(e)}/>
				{values.email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
			</div>
			<div>
				<label className="inner required">비밀번호</label>
				<input name="password" type="password" onChange={(e) => onChangePassword(e)}/>
				{values.password.length > 0 && <span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>}
			</div>
			<button disabled={!isEmail || !isPassword} onClick={handleSubmit}>전송</button>
			<span className="signup" onClick={() => navigate('/signup')}>회원가입</span>
			{loadingError?.message && <span>{loadingError.response.data.message}</span>}
		</AuthWrap>
	)
}

const AuthWrap = styled.div`
	width: 220px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	div {margin-bottom: 8px;}
	input {width:100%;}
	button {width: 100%; margin-top:10px;}
	.signup {display:block; font-size: 12px; text-align: right; margin-top:10px; cursor: pointer;}
`
export default Home;