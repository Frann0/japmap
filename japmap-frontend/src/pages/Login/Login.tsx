import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import { useEffect, useState } from 'react';
import Input from '../../components/shared/input/input';


const LoginPage = () => {
  const { authStore } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    authStore.attemptLogin(email, password);
  }

  useEffect(() => {
    if (authStore.user) {
      navigate('/projekter')
    }
  }, [authStore.user])


  return (
    <div className='LoginPage'>
      <div className='LoginPage_Title'>
        <p className='LoginPage_TitleText'>Login</p>
      </div>
      <div className='LoginPage_Form'>
        <Input label="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className='LoginPage_Form_Button' onClick={() => handleLogin()}>Login</button>
      </div>
      <div className='LoginPage_Signup'>
        <p className='LoginPage_Signup_Text'>Har du ikke en bruger?</p>
        <Link to="/auth/signup" className='LoginPage_Signup_Link'>Opret bruger</Link>
      </div>
    </div>
  )
}

export default observer(LoginPage);
