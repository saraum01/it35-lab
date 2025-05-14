import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonText 
} from '@ionic/react';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Inline style block */}
        <style>{`
          .section-container {
            margin-bottom: 24px;
            padding: 16px;
            background-color: #f1f1f1;
            border-radius: 12px;
          }
        `}</style>

        <IonText>

         

          <div className="section-container">
            <h3>Welcome to the App!</h3>
            <p>
              This mobile app was created as part of our Application Development coursework. 
              It showcases fundamental principles in mobile development using the Ionic Framework and React.
            </p>
          </div>

         <div className="section-container">
            <h3>Main Features</h3>
            <ul>
              <li>🔍 <strong>Search:</strong> Easily explore topics and concepts related to mobile app development.</li>
              <li>❤️ <strong>Favorites:</strong> Mark important sections for quick reference later.</li>
              <li>ℹ️ <strong>Modals:</strong> View helpful information through interactive popup components.</li>
              <li>📱 <strong>Mobile-First Design:</strong> Tailored for smartphones, tablets, and desktop views.</li>
            </ul>
          </div>

          <div className="section-container">
            <h3>Technologies Used</h3>
            <ul>
              <li>⚛️ <strong>React:</strong> A popular JavaScript library for building dynamic interfaces.</li>
              <li>📱 <strong>Ionic:</strong> A mobile UI toolkit for building high-quality cross-platform apps.</li>
              <li>🧠 <strong>TypeScript:</strong> A superset of JavaScript that adds static typing for scalability.</li>
            </ul>
          </div>

        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default About;
