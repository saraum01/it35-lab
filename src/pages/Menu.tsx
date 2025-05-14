import { 
  IonAlert,
  IonButton,
  IonButtons,
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonItem, 
  IonMenu, 
  IonMenuButton, 
  IonMenuToggle, 
  IonPage, 
  IonRouterOutlet, 
  IonSplitPane, 
  IonTitle, 
  IonToast, 
  IonToolbar, 
  useIonRouter
} from '@ionic/react';

import { 
  homeOutline, 
  logOutOutline, 
  rocketOutline, 
  settingsOutline, 
  helpCircleOutline 
} from 'ionicons/icons';

import { Redirect, Route } from 'react-router';
import { useState } from 'react';

import Home from './Home';
import About from './About';
import Details from './Details';
import Contact from './ContactUs'; 
import EditProfilePage from './EditProfile';
import { supabase } from '../utils/supabaseClient';

const Menu: React.FC = () => {
  const navigation = useIonRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const path = [
    { name: 'Home', url: '/it35-lab/app/home', icon: homeOutline },
    { name: 'About', url: '/it35-lab/app/about', icon: rocketOutline },
    { name: 'Profile', url: '/it35-lab/app/profile', icon: settingsOutline },
    { name: 'Contact Us', url: '/it35-lab/app/contact', icon: helpCircleOutline },
  ];

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setShowToast(true);
      setTimeout(() => {
        navigation.push('/it35-lab', 'back', 'replace'); 
      }, 300); 
    } else {
      setErrorMessage(error.message);
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonSplitPane contentId="main">
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {path.map((item, index) => (
              <IonMenuToggle key={index}>
                <IonItem routerLink={item.url} routerDirection="forward">
                  <IonIcon icon={item.icon} slot="start" />
                  {item.name}
                </IonItem>
              </IonMenuToggle>
            ))}

            {/* Logout Button */}
            <IonButton expand="full" onClick={handleLogout}>
              <IonIcon icon={logOutOutline} slot="start" />
              Logout
            </IonButton>
          </IonContent>
        </IonMenu>

        <IonRouterOutlet id="main">
          <Route exact path="/it35-lab/app/home" component={Home} />
          <Route exact path="/it35-lab/app/home/details" component={Details} />
          <Route exact path="/it35-lab/app/about" component={About} />
          <Route exact path="/it35-lab/app/profile" component={EditProfilePage} />
          <Route exact path="/it35-lab/app/contact" component={Contact} />

          <Route exact path="/it35-lab/app">
            <Redirect to="/it35-lab/app/home" />
          </Route>
        </IonRouterOutlet>

        {/* Logout Error Alert */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Logout Failed"
          message={errorMessage}
          buttons={['OK']}
        />

        {/* Logout Success Toast */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Logout Successful"
          duration={1500}
          position="top"
          color="primary"
        />
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;
