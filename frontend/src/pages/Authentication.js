import { json, redirect } from 'react-router-dom';
import { setToken } from '../utils/auth';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams,
    mode = searchParams.get('mode') || 'login';

  if (['login', 'signup'].includes(mode) === -1)
    throw json({ message: 'Invalid mode!' }, { status: 422 });

  const data = await request.formData(),
    authData = {
      email: data.get('email'),
      password: data.get('password'),
    };

  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401)
    return response;

  if (!response.ok)
    throw json({ message: 'Something went wrong!' }, { status: 500 });

  const resDate = await response.json(),
    token = resDate.token;

  setToken(token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('token_expiration', expiration.toISOString());

  return redirect('/');
}