import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Alert, Button, FormGroup, Input } from '../../components/UI';
import Icon from '../../components/UI/Icon';
import styles from './LoginPage.module.css';
import axios from "axios";

export default function LoginPage() {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', password:'', confirm:'' });
  const set = k => e => setForm({...form,[k]:e.target.value});

  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {

    if (tab === "login") {

      const response = await axios.post(
        "https://saferoute-backend-x5b6.onrender.com/login",
        {
          email: form.email,
          password: form.password,
        }
      );

    

login({
  name: response.data.name,
  email: form.email,
});

navigate("/", { replace: true });
    } else {

      if (form.password !== form.confirm) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "https://saferoute-backend-x5b6.onrender.com/register",
        {
          name: form.name,
          email: form.email,
          password: form.password,
        }
      );

      alert(response.data.message);

      setTab("login");

      setForm({
        name: "",
        email: "",
        password: "",
        confirm: "",
      });
    }

  } catch (error) {

    setError(
      error.response?.data?.message ||
      "Something went wrong"
    );

  } finally {

    setLoading(false);

  }
};
const handleGoogleLogin = async () => {

  setError("");

  const success = await googleLogin();

  if (success) {

    navigate("/", { replace: true });

  } else {

    setError("Google sign in failed");

  }

};
  const handleKeyDown = e => { if(e.key==='Enter') handleSubmit(); };

  return (
    <div className={`${styles.page} page-enter`}>
      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <div className={styles.logoIcon}><Icon name="shield" size={30} color="#fff"/></div>
          <h1 className={styles.logoText}>SafeRoute</h1>
          <p className={styles.logoSub}>Road Safety Intelligence Platform</p>
        </div>
        <div className={styles.tabs}>
          {['login','register'].map(t=>(
            <button key={t} className={`${styles.tab} ${tab===t?styles.tabActive:''}`}
              onClick={()=>{setTab(t);setError('');}}>
              {t==='login'?'Sign In':'Register'}
            </button>
          ))}
        </div>
        {error && <Alert variant="danger"><Icon name="x" size={16} color="var(--danger)"/>{error}</Alert>}
        {tab==='register' && <FormGroup label="Full Name"><Input placeholder="Your full name" value={form.name} onChange={set('name')} onKeyDown={handleKeyDown}/></FormGroup>}
        <FormGroup label="Email Address"><Input type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} onKeyDown={handleKeyDown}/></FormGroup>
        <FormGroup label="Password">
          <div className={styles.passWrap}>
            <Input type={showPass?'text':'password'} placeholder="••••••••" value={form.password} onChange={set('password')} onKeyDown={handleKeyDown} style={{paddingRight:44}}/>
            <button className={styles.eyeBtn} onClick={()=>setShowPass(!showPass)} type="button">
              <Icon name={showPass?'eyeOff':'eye'} size={17} color="var(--text3)"/>
            </button>
          </div>
        </FormGroup>
        {tab==='register' && <FormGroup label="Confirm Password"><Input type="password" placeholder="••••••••" value={form.confirm} onChange={set('confirm')} onKeyDown={handleKeyDown}/></FormGroup>}
        {tab==='login' && <div className={styles.forgotRow}><a href="#forgot" className={styles.forgotLink}>Forgot password?</a></div>}
        <Button variant="navy" fullWidth onClick={handleSubmit} disabled={loading}>
          {loading
            ?<><span className="pulse">●</span>&nbsp;{tab==='login'?'Signing In…':'Creating Account…'}</>
            :<><Icon name={tab==='login'?'lock':'check'} size={16}/>{tab==='login'?'Sign In':'Create Account'}</>}
        </Button>
        
        {tab === "login" && (
        <>
        <div
          style={{
             textAlign: "center",
             margin: "18px 0",
             color: "var(--text3)",
             fontSize: "0.9rem"
          }}
       >
         OR
        </div>

    <Button
      fullWidth
      onClick={handleGoogleLogin}
      style={{
        background: "#fff",
        color: "#444",
        border: "1px solid var(--border)"
      }}
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        width="18"
        style={{ marginRight: 10 }}
      />
      Continue with Google
    </Button>
  </>
)}


        <p className={styles.switchRow}>
          {tab==='login'?'New to SafeRoute?':'Already have an account?'}&nbsp;
          <button className={styles.switchBtn} onClick={()=>{setTab(tab==='login'?'register':'login');setError('');}}>
            {tab==='login'?'Register now':'Sign in'}
          </button>
        </p>
        <div className={styles.backRow}>
          <button className={styles.backBtn} onClick={()=>navigate('/')}>← Back to Home</button>
        </div>
      </div>
      <p className={styles.footer}>🔒 Secured by SafeRoute Safety Protocol</p>
    </div>
  );
}
