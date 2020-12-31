import React, { useCallback, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from '../hooks/useInput';

import { loginRequestAction } from '../reducers/user';

// const ButtonWrapper = styled.div`
// 	margin-top: 10px;
// `;

const FormWrapper = styled(Form)`
	padding: 10px;
`;

const LoginForm = () => {
	const dispatch = useDispatch()
	const { logInLoading, logInError } = useSelector(state => state.user);

	const buttonStyle = useMemo(() => ({ marginTop: 10 }), []);

	const [email, onChangeEmail] = useInput('');
	const [password, onChangePassword] = useInput('');

	useEffect(() => {
		if (logInError) {
			alert(logInError);
		}
	}, [logInError]);

	const onSubmitForm = useCallback(() => {
		
		console.log(email, password);
		dispatch(loginRequestAction({ email, password }));

	}, [email, password]);

	return (
		<FormWrapper onFinish={onSubmitForm}>
			<div>
				<label htmlFor="user-email">이메일</label>
				<br />
				<Input 
					name="user-email"
					type="email" 
					value={email} 
					onChange={onChangeEmail} 
					required 
				/>
			</div>
			<div>
				<label htmlFor="user-password">비밀번호</label>
				<br />
				<Input
					name="user-password"
					type="password"
					value={password}
					onChange={onChangePassword}
					required
				/>
			</div>
			<div style={buttonStyle}>
				<Button 
					type="primary" 
					htmlType="submit" 
					loading={logInLoading}
				>
					로그인
				</Button>
				<Link href="/signup">
					<a>
						<Button>회원가입</Button>
					</a>
				</Link>
			</div>
		</FormWrapper>
	);
};

export default LoginForm;
