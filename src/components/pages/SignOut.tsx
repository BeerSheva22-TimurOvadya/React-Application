
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useEffect, useState } from 'react';

const SignOut: React.FC = () => {
  const dispatch = useDispatch();
  const [displayMessage, setDisplayMessage] = useState(true);

  useEffect(() => {
    dispatch(logout());
    const timer = setTimeout(() => setDisplayMessage(false), 5000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return displayMessage ? <p className='component-logo'>You have been logged out.</p> : null;
};

export default SignOut;
