import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon
} from '@ionic/react';
import { logoFacebook, mailOutline, logoGithub } from 'ionicons/icons';

const Contact: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Contact Us</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonText>
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <h2>Let's connect!</h2>
            <p>
              We may be quiet like the moon 🌙, but we’d still love to hear from you.<br />
              Feel free to reach out through any of the platforms below.
            </p>
          </div>
        </IonText>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Connect with Us</IonCardTitle>
          </IonCardHeader>
          <IonCardContent style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <IonButton color="primary" expand="block" href="mailto:20212047@nbsc.edu.ph" target="_blank">
              <IonIcon icon={mailOutline} slot="start" />
              Send an Email
            </IonButton>

            <IonButton color="tertiary" expand="block" href="https://www.facebook.com/mariel.saraum" target="_blank">
              <IonIcon icon={logoFacebook} slot="start" />
              Visit Facebook
            </IonButton>

            <IonButton color="dark" expand="block" href="https://github.com/saraum01" target="_blank">
              <IonIcon icon={logoGithub} slot="start" />
              View GitHub Profile
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Contact;
