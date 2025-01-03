import { observer } from "mobx-react-lite"
import { useStore } from "../../stores/store";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './Signup.scss'
import { getAuth } from "firebase/auth";
import Input from "../../components/shared/input/input";


const SignUp = () => {
  const { authStore } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignUp = async () => {

    if (password !== confirmPassword) {
      setError('Passwords er ikke ens');
      return;
    }
    await authStore.signup(email, password, firstName, lastName).then(() => {
      setError('');
      authStore.setUser(auth.currentUser);
      navigate('/projekter')
    })
  }

  return (
    <div className='Signup'>
      <div className='Signup_Title'>
        <p className='SignUp_TitleText'>Opret Bruger</p>
      </div>
      <div className="Signup_Error">
        <p className="Signup_ErrorText">{error}</p>
      </div>
      <div className='Signup_Form'>
        <Input label="Fornavn" value={firstName} placeholder="Fornavn" onChange={(e) => setFirstName(e.target.value)} />
        <Input label="Efternavn" value={lastName} placeholder="Efternavn" onChange={(e) => setLastName(e.target.value)} />
        <Input label="Email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password" />
        <Input label="Bekræft Password" value={confirmPassword} placeholder="Bekræft Password" onChange={(e) => setConfirmPassword(e.target.value)} type="password" />
        <button className='Signup_Form_Button' onClick={() => handleSignUp()}>Opret</button>
      </div>
      <div className='Signup_Signup'>
        <p className='Signup_Signup_Text'>Har du allerede en bruger?</p>
        <Link to="/auth" className='Signup_Signup_Link'>Log ind</Link>
      </div>
    </div >

  )

}

export default observer(SignUp)
