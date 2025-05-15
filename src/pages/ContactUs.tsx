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
import { logoFacebook, mailOutline, logoGithub, callOutline } from 'ionicons/icons';

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
          <div style={{ marginBottom: '30px', textAlign: 'center' }}>
            <h2 style={{ fontWeight: '600', fontSize: '2rem', color: '#333' }}>Let's Connect!</h2>
            <p style={{ fontSize: '1.1rem', color: '#555' }}>
              We may be quiet like the moon 🌙, but we’d still love to hear from you.<br />
              Feel free to reach out through any of the platforms below.
            </p>
          </div>
        </IonText>

        {/* Contact Options */}
        <IonCard style={{ borderRadius: '20px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
          <IonCardHeader>
            <IonCardTitle style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#444' }}>Connect with Us</IonCardTitle>
          </IonCardHeader>
          <IonCardContent style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Email Button */}
            <IonButton 
              color="primary" 
              expand="block" 
              href="mailto:20212047@nbsc.edu.ph" 
              target="_blank"
              style={{ borderRadius: '10px', fontWeight: '500' }}
            >
              <IonIcon icon={mailOutline} slot="start" />
              Send an Email
            </IonButton>

            {/* Facebook Button */}
            <IonButton 
              color="tertiary" 
              expand="block" 
              href="https://www.facebook.com/mariel.saraum" 
              target="_blank"
              style={{ borderRadius: '10px', fontWeight: '500' }}
            >
              <IonIcon icon={logoFacebook} slot="start" />
              Visit Facebook
            </IonButton>

            {/* GitHub Button */}
            <IonButton 
              color="dark" 
              expand="block" 
              href="https://github.com/saraum01" 
              target="_blank"
              style={{ borderRadius: '10px', fontWeight: '500' }}
            >
              <IonIcon icon={logoGithub} slot="start" />
              View GitHub Profile
            </IonButton>

            {/* Call Us Button */}
            <IonButton 
              color="success" 
              expand="block" 
              href="tel:+1234567890" 
              target="_blank"
              style={{ borderRadius: '10px', fontWeight: '500' }}
            >
              <IonIcon icon={callOutline} slot="start" />
              Call Us
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* FAQ Section */}
        <IonCard style={{ borderRadius: '20px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', marginTop: '30px', padding: '20px' }}>
          <IonCardHeader>
            <IonCardTitle style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#444' }}>Frequently Asked Questions (FAQ)</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div style={{ color: '#555' }}>
              <h4>1. How can I contact support?</h4>
              <p>You can reach us through email, Facebook, or our phone number. Please use the buttons above to get in touch.</p>

              <h4>2. Where can I find your documentation?</h4>
              <p>Our documentation is available on GitHub. You can find the link to our repository above.</p>

              <h4>3. What are your support hours?</h4>
              <p>We are available 24/7! Feel free to reach out anytime, and we will get back to you as soon as possible.</p>

              <h4>4. Can I collaborate with you on a project?</h4>
              <p>Absolutely! If you’re interested in collaborating on a project, feel free to contact us via email or visit our GitHub profile for potential collaboration opportunities.</p>

              <h4>5. Do you offer app development services?</h4>
              <p>Yes, we offer mobile app development services! If you're looking for development services, please reach out through the contact methods above, and we’ll discuss your project.</p>
            </div>
          </IonCardContent>
        </IonCard>
        
      </IonContent>
    </IonPage>
  );
};

export default Contact;
