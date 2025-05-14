import React, { useState } from 'react';
import {
    IonButton,
    IonContent,
    IonInput,
    IonInputPasswordToggle,
    IonPage,
    IonTitle,
    IonModal,
    IonText,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonAlert,
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import { useEffect } from 'react';
import bcrypt from 'bcryptjs';

// Reusable Alert Component
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

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

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
    
          .login-header {
            font-size: 24px;
            font-weight: 500;
            color: #333;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            text-align: center;
            margin-bottom: 20px;
          }
    
          .login-password-input {
            margin-top: 10px;
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
    
          ion-button {
            --background: #555;
            --color: white;
            font-weight: 500;
            margin-top: 10px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
          }
    
          ion-button[fill="clear"] {
            color: #555;
            --color: #555;
            --background-hover: rgba(0, 0, 0, 0.05);
            text-decoration: underline;
            margin-top: 5px;
            font-size: 14px;
            font-weight: 500;
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

    const handleOpenVerificationModal = () => {
        if (!email.endsWith("@nbsc.edu.ph")) {
            setAlertMessage("Only @nbsc.edu.ph emails are allowed to register.");
            setShowAlert(true);
            return;
        }

        if (password !== confirmPassword) {
            setAlertMessage("Passwords do not match.");
            setShowAlert(true);
            return;
        }

        setShowVerificationModal(true);
    };

    const doRegister = async () => {
        setShowVerificationModal(false);
    
        try {
            // Sign up in Supabase authentication
            const { data, error } = await supabase.auth.signUp({ email, password });
    
            if (error) {
                throw new Error("Account creation failed: " + error.message);
            }
    
            // Hash password before storing in the database
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
    
            // Insert user data into 'users' table
            const { error: insertError } = await supabase.from("users").insert([
                {
                    username,
                    user_email: email,
                    user_firstname: firstName,
                    user_lastname: lastName,
                    user_password: hashedPassword,
                },
            ]);
    
            if (insertError) {
                throw new Error("Failed to save user data: " + insertError.message);
            }
    
            setShowSuccessModal(true);
        } catch (err) {
            // Ensure err is treated as an Error instance
            if (err instanceof Error) {
                setAlertMessage(err.message);
            } else {
                setAlertMessage("An unknown error occurred.");
            }
            setShowAlert(true);
        }
    };
    
    return (
        <IonPage>
            <IonContent className='ion-padding'>
                <h1 style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#333',
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    fontSize: '2.5rem',
                    marginTop: '5%',
                    marginBottom: '20px'
                }}>Create your account</h1>

                <IonInput 
                    label="Username" 
                    labelPlacement="stacked" 
                    fill="outline" 
                    type="text" 
                    placeholder="Enter a unique username" 
                    value={username} 
                    onIonChange={e => setUsername(e.detail.value!)} 
                    style={{ 
                        marginTop: '15px',
                        color: '#333',
                        '--highlight-color-focused': '#555',
                        '--border-color': '#ddd',
                        '--placeholder-color': '#999'
                    }} 
                />
                
                <IonInput 
                    label="First Name" 
                    labelPlacement="stacked" 
                    fill="outline" 
                    type="text" 
                    placeholder="Enter your first name" 
                    value={firstName} 
                    onIonChange={e => setFirstName(e.detail.value!)} 
                    style={{ 
                        marginTop: '15px',
                        color: '#333',
                        '--highlight-color-focused': '#555',
                        '--border-color': '#ddd',
                        '--placeholder-color': '#999'
                    }} 
                />
                
                <IonInput 
                    label="Last Name" 
                    labelPlacement="stacked" 
                    fill="outline" 
                    type="text" 
                    placeholder="Enter your last name" 
                    value={lastName} 
                    onIonChange={e => setLastName(e.detail.value!)} 
                    style={{ 
                        marginTop: '15px',
                        color: '#333',
                        '--highlight-color-focused': '#555',
                        '--border-color': '#ddd',
                        '--placeholder-color': '#999'
                    }} 
                />
                
                <IonInput 
                    label="Email" 
                    labelPlacement="stacked" 
                    fill="outline" 
                    type="email" 
                    placeholder="youremail@nbsc.edu.ph" 
                    value={email} 
                    onIonChange={e => setEmail(e.detail.value!)} 
                    style={{ 
                        marginTop: '15px',
                        color: '#333',
                        '--highlight-color-focused': '#555',
                        '--border-color': '#ddd',
                        '--placeholder-color': '#999'
                    }} 
                />
                
                <IonInput 
                    label="Password" 
                    labelPlacement="stacked" 
                    fill="outline" 
                    type="password" 
                    placeholder="Enter password" 
                    value={password} 
                    onIonChange={e => setPassword(e.detail.value!)} 
                    style={{ 
                        marginTop: '15px',
                        color: '#333',
                        '--highlight-color-focused': '#555',
                        '--border-color': '#ddd',
                        '--placeholder-color': '#999'
                    }}
                >
                    <IonInputPasswordToggle slot="end" />
                </IonInput>
                
                <IonInput 
                    label="Confirm Password" 
                    labelPlacement="stacked" 
                    fill="outline" 
                    type="password" 
                    placeholder="Confirm password" 
                    value={confirmPassword} 
                    onIonChange={e => setConfirmPassword(e.detail.value!)} 
                    style={{ 
                        marginTop: '15px',
                        color: '#333',
                        '--highlight-color-focused': '#555',
                        '--border-color': '#ddd',
                        '--placeholder-color': '#999'
                    }}
                >
                    <IonInputPasswordToggle slot="end" />
                </IonInput>

                <IonButton 
                    onClick={handleOpenVerificationModal} 
                    expand="full" 
                    shape='round' 
                    style={{ 
                        marginTop: '20px'
                    }}
                >
                    Register
                </IonButton>
                
                <p style={{ 
                    textAlign: 'center',
                    color: '#555',
                    marginTop: '15px'
                }}>
                    Already have an account? <a href="/it35-lab" style={{ color: '#555', fontWeight: '500' }}>Sign in</a>
                </p>

                {/* Verification Modal */}
                <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
                    <IonContent className="ion-padding">
                        <IonCard className="ion-padding" style={{ marginTop: '25%', color: '#333' }}>
                            <IonCardHeader>
                                <IonCardTitle>User Registration Details</IonCardTitle>
                                <hr />
                                <IonCardSubtitle>Username</IonCardSubtitle>
                                <IonCardTitle>{username}</IonCardTitle>

                                <IonCardSubtitle>Email</IonCardSubtitle>
                                <IonCardTitle>{email}</IonCardTitle>

                                <IonCardSubtitle>Name</IonCardSubtitle>
                                <IonCardTitle>{firstName} {lastName}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent></IonCardContent>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5px' }}>
                                <IonButton fill="clear" color="medium" onClick={() => setShowVerificationModal(false)}>Cancel</IonButton>
                                <IonButton color="dark" onClick={doRegister}>Confirm</IonButton>
                            </div>
                        </IonCard>
                    </IonContent>
                </IonModal>

                {/* Success Modal */}
                <IonModal isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)}>
                    <IonContent className="ion-padding" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center', marginTop: '35%' }}>
                        <IonTitle style={{ marginTop: '35%', color: '#333' }}>Registration Successful 🎉</IonTitle>
                        <IonText color="medium">
                            <p>Your account has been created successfully.</p>
                            <p>Please check your email address.</p>
                        </IonText>
                        <IonButton routerLink="/it35-lab" routerDirection="back" color="dark">
                            Go to Login
                        </IonButton>
                    </IonContent>
                </IonModal>

                {/* Reusable AlertBox Component */}
                <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

            </IonContent>
        </IonPage>
    );
};

export default Register;