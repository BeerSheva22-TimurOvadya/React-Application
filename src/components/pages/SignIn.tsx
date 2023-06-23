import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { useState } from 'react';
import { RootState } from '../../redux/store';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const handleLogin = () => {
    dispatch(login(username));
    setUsername('');
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <div className='component-logo'>
      <input 
        type='text' 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder='Username'
      />
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
};

export default SignIn;
