import { useState, useEffect } from 'react';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonInput,
  IonLabel,
  IonButton,
  IonList,
  IonItem,
  IonPopover,
  IonIcon
} from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';
import { supabase } from '../utils/supabaseClient';  // Adjust path as necessary

// Define a sample data structure for topics related to App Development
interface Topic {
  topic_id: string;
  title: string;
  description: string;
  content: string;
  created_at: string;
}

const AppDevContentContainer: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [query, setQuery] = useState<string>('');
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
  const [popoverState, setPopoverState] = useState<{ open: boolean; event: Event | null; topicId: string | null }>({ open: false, event: null, topicId: null });

  // Sample topics data
  const allTopics: Topic[] = [
    {
      topic_id: '1',
      title: 'Introduction to Mobile App Development',
      description: 'Learn the basics of mobile app development including native and hybrid development.',
      content: 'Mobile App Development is one of the fastest-growing fields in technology. This topic covers the basics of mobile development...',
      created_at: '2025-05-01',
    },
    {
      topic_id: '2',
      title: 'Cross-Platform Mobile Development with Ionic',
      description: 'Explore the power of the Ionic framework to build cross-platform apps.',
      content: 'Ionic allows developers to build apps that work on both Android and iOS from a single codebase...',
      created_at: '2025-04-28',
    },
    {
      topic_id: '3',
      title: 'Building Apps with React Native',
      description: 'Learn how React Native helps developers to create mobile apps using JavaScript and React.',
      content: 'React Native enables you to use your React skills to build mobile applications for both iOS and Android...',
      created_at: '2025-04-15',
    },
    {
      topic_id: '4',
      title: 'Advanced App Development with TypeScript',
      description: 'Dive into TypeScript and learn how it can improve app development by adding type safety to JavaScript.',
      content: 'TypeScript adds type definitions to JavaScript, which helps with code quality and maintainability...',
      created_at: '2025-03-30',
    },
    {
      topic_id: '5',
      title: 'App Deployment and Testing',
      description: 'Learn the process of deploying and testing your app before it reaches the app stores.',
      content: 'This topic explains the best practices for testing your app and getting it ready for deployment...',
      created_at: '2025-03-25',
    },
  ];

  // Initially, set the topics and the filtered topics
  useEffect(() => {
    setTopics(allTopics);
    setFilteredTopics(allTopics);
  }, []);

  // Handle search functionality
  const handleSearch = (query: string) => {
    setQuery(query);
    if (query === '') {
      setFilteredTopics(topics); // If query is empty, show all topics
    } else {
      const filtered = topics.filter((topic) =>
        topic.title.toLowerCase().includes(query.toLowerCase()) ||
        topic.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTopics(filtered);
    }
  };

  return (
    <IonContent>
      {/* App Development Content Introduction */}
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>App Development Topics</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonLabel>
            In this section, you'll find valuable resources about various App Development topics such as Mobile App Development, Cross-Platform Development, and more.
          </IonLabel>
        </IonCardContent>
      </IonCard>

      {/* Search Bar */}
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Search App Development Topics</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonInput
            value={query}
            onIonInput={e => handleSearch(e.detail.value!)}
            placeholder="Search for App Development topics..."
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
          />
        </IonCardContent>
      </IonCard>

      {/* Display Filtered Topics */}
      <IonList>
        {filteredTopics.length === 0 ? (
          <IonItem>No results found</IonItem>
        ) : (
          filteredTopics.map((topic) => (
            <IonCard key={topic.topic_id}>
              <IonCardHeader>
                <IonCardTitle>{topic.title}</IonCardTitle>
                <IonCardSubtitle>{new Date(topic.created_at).toLocaleString()}</IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
                <IonLabel>{topic.description}</IonLabel>
              </IonCardContent>

              {/* Popover with Edit and Delete options */}
              <IonPopover
                isOpen={popoverState.open && popoverState.topicId === topic.topic_id}
                event={popoverState.event}
                onDidDismiss={() => setPopoverState({ open: false, event: null, topicId: null })}
              >
                <IonButton fill="clear" onClick={() => { /* Edit logic */ }}>
                  Edit
                </IonButton>
                <IonButton fill="clear" color="danger" onClick={() => { /* Delete logic */ }}>
                  Delete
                </IonButton>
              </IonPopover>
            </IonCard>
          ))
        )}
      </IonList>
    </IonContent>
  );
};

export default AppDevContentContainer;
