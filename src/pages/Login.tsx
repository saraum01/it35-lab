import { 
  IonAlert,
  IonAvatar,
  IonButton,
  IonContent, 
  IonIcon, 
  IonInput, 
  IonInputPasswordToggle,  
  IonPage,  
  IonToast,  
  useIonRouter
} from '@ionic/react';
import { logoIonic } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      ion-content {
        --background: transparent;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }

      .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 30px;
        border-radius: 12px;
        backdrop-filter: blur(6px);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        max-width: 90%;
        margin: 25% auto 0 auto;
      }

      .login-avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid #f5f5f5;
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
      }

      .login-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }

      ion-input {
        width: 100%;
        --background: #fafafa;
        --color: #333;
        --placeholder-color: #999;
        --highlight-color-focused: #555;
        --border-color: #ddd;
        --padding-start: 16px;
        --padding-end: 16px;
        margin-bottom: 10px;
        border-radius: 8px;
      }

      .login-input {
        --color: #333;
        --placeholder-color: #999;
        --highlight-color-focused: #555;
        --border-color: #ccc;
        color: #333;
        margin-bottom: 16px;
        font-size: 16px;
        --padding-start: 12px;
        --padding-end: 12px;
        --padding-top: 14px;
        --padding-bottom: 14px;
        transition: all 0.2s ease;
        border-radius: 8px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
      }

      .login-input:hover {
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
        transform: scale(1.01);
      }

      .login-input:focus-within {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
      }

      .register-text {
        margin-top: 20px;
        text-align: center;
        color: #555;
        font-size: 16px;
        font-weight: 400;
      }
 
      ion-button {
        --background: #555;
        --color: white;
        font-weight: 500;
        margin-top: 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
      }
      
      .register-text a {
        color: #555;
        text-decoration: none;
        font-weight: 600;
        transition: color 0.2s ease;
      }

      .register-text a:hover {
        color: #222;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }

    setShowToast(true); 
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 300);
  };
  
  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <div style={{
          display: 'flex',
          color:'#555',
          flexDirection:'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:'25%'
        }}>
         <IonAvatar className="login-avatar">
          <img
            src="https://img.freepik.com/premium-photo/moon-queen-whose-face-was-beautiful-light-full-moon-she-stood-palace-balcony-background-vertical-wallpaper-ai-generated-image_1085517-5932.jpg?w=360"
            alt="User Avatar"
          />
        </IonAvatar>
        <h1 style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#333',
          textShadow: '0 1px 2px rgba(0,0,0,0.1)',
          fontSize: '2.5rem'
        }}>
          USER LOGIN
        </h1>


<IonInput
  style={{
    color: '#333',
    '--highlight-color-focused': '#555',
    '--border-color': '#ddd',
    '--placeholder-color': '#999',
    '--background': 'transparent',
    fontSize: '1rem',
    marginTop: '10px'
  }}
  label="Email"
  labelPlacement="floating"
  fill="outline"
  type="email"
  placeholder="Enter Email"
  value={email}
  onIonChange={e => setEmail(e.detail.value!)}
/>

          <IonInput
  style={{
    marginTop: '10px',
    color: '#333',
    '--highlight-color-focused': '#555',
    '--border-color': '#ddd',
    '--placeholder-color': '#999',
    '--background': 'transparent',
    fontSize: '1rem'
  }}
  fill="outline"
  type="password"
  placeholder="Password"
  value={password}
  onIonChange={e => setPassword(e.detail.value!)}
>

            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
          </IonInput>
        </div>
        <IonButton onClick={doLogin} expand="full" shape='round'>
          Login
        </IonButton>

        <IonButton routerLink="/it35-lab/register" expand="full" fill="clear" shape='round' color='medium'>
          Don't have an account? Register here
        </IonButton>

        {/* Reusable AlertBox Component */}
        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

        {/* IonToast for success message */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="dark"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;