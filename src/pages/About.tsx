import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText, IonButton } from '@ionic/react';
import { useState } from 'react';

const About: React.FC = () => {
  // State to toggle the visibility of the Learn More section
  const [showLearnMore, setShowLearnMore] = useState(false);

  // Toggle the "Learn More" section
  const toggleLearnMore = () => {
    setShowLearnMore(prevState => !prevState);
  };

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
        <style>{`
          .section-container {
            margin-bottom: 16px;
            padding: 12px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          h3 {
            font-size: 1.25rem;
            margin-bottom: 8px;
            font-weight: bold;
          }

          p, ul {
            font-size: 1rem;
            color: #333;
            line-height: 1.5;
          }

          ul {
            padding-left: 20px;
          }

          ul li {
            margin-bottom: 8px;
          }

          .ion-padding {
            padding: 20px;
          }

          .ion-button {
            width: 100%;
            margin-top: 12px;
            padding: 12px;
            text-align: center;
            border-radius: 8px;
            font-size: 1rem;
          }

          .ion-button:hover {
            opacity: 0.9;
          }

          .button-container {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 10px;
          }

          .learn-more-content {
            margin-top: 16px;
            padding: 12px;
            background-color: #f7f7f7;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
        `}</style>

        <IonText>
          <div className="section-container">
            <h3>About This App</h3>
            <p>
              This app demonstrates key concepts of modern mobile development using 
              the Ionic Framework and React. It serves as a simple reference for developers 
              starting their journey in mobile application creation. Whether you're building 
              a mobile or web app, this framework offers tools to speed up your development 
              process while ensuring a native-like experience.
            </p>
          </div>

          <div className="section-container">
            <h3>Core Features</h3>
            <ul>
              <li>🔍 <strong>Search:</strong> Easily find app-related topics and information.</li>
              <li>⭐ <strong>Favorites:</strong> Save key information for quick access and future reference.</li>
              <li>📱 <strong>Responsive:</strong> Optimized for mobile, tablet, and desktop screens.</li>
              <li>💨 <strong>Fast Performance:</strong> Efficient and lightweight for smooth user experience.</li>
              <li>🔒 <strong>Secure:</strong> Implemented with security best practices to keep your data safe.</li>
            </ul>
          </div>

          <div className="section-container">
            <h3>Technologies</h3>
            <ul>
              <li>⚛️ <strong>React:</strong> A powerful JavaScript library for building dynamic and interactive UIs.</li>
              <li>📱 <strong>Ionic:</strong> A mobile-first framework for building fast, native-like mobile apps.</li>
              <li>🛠️ <strong>TypeScript:</strong> A statically typed language that enhances JavaScript with type safety, leading to fewer bugs and better scalability.</li>
            </ul>
          </div>

          <div className="section-container">
            <h3>Development Practices</h3>
            <ul>
              <li>👩‍💻 <strong>Code Reusability:</strong> Leveraging components and hooks to maximize code reusability and maintainability.</li>
              <li>🌐 <strong>Cross-Platform:</strong> Build apps that work seamlessly across multiple platforms (iOS, Android, and web).</li>
              <li>🎯 <strong>Agile Development:</strong> Iterative approach to app development with regular updates and improvements.</li>
            </ul>
          </div>

          {/* Learn More Button */}
          <div className="button-container">
            <IonButton color="primary" expand="block" onClick={toggleLearnMore}>
              {showLearnMore ? 'Show Less' : 'Learn More'}
            </IonButton>
          </div>

          {/* Learn More Content */}
          {showLearnMore && (
            <div className="learn-more-content">
              <h4>More Information About App Development</h4>
              <p>This section dives deeper into the app development process, exploring key topics such as:</p>
              <ul>
                <li>💻 How to design a mobile app interface</li>
                <li>📱 Optimizing apps for performance</li>
                <li>🔐 Best practices for app security</li>
                <li>🛠️ Tools and technologies used in mobile app development</li>
              </ul>
              <p>Understanding these concepts will help you build better and more efficient mobile applications.</p>
            </div>
          )}

        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default About;
