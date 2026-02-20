// import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import IssueDrawer from './src/navigation/IssueDrawer';
import { useEffect } from 'react';
import { setIssue } from './src/store/slices/IssueSlice';
import { useDispatch } from 'react-redux';
const dummyIssues = [
  {
    id: '1',
    title: 'Malfunctioning Boarding Gate Scanner',
    description:
      'The boarding pass scanner at Gate A12 fails intermittently and delays passenger boarding.',
    category: 'Electrical',
    status: 'Open',
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    location: 'Terminal 1, Gate A12, Boarding Area',
    reported: 'Ground Operations Staff',
    updated: '2026-01-27T08:55:00Z',
  },
  {
    id: '2',
    title: 'Water Leakage Near Restrooms',
    description:
      'Continuous water leakage from a pipe near the public restrooms causing a slippery floor.',
    category: 'Plumbing',
    status: 'In-Progress',
    images: ['https://via.placeholder.com/150'],
    location: 'Terminal 2, Public Restrooms, Concourse B',
    reported: 'Security Staff',
    updated: '2026-01-27T09:40:00Z',
  },
  {
    id: '3',
    title: 'Cracked Tile in Arrival Hall',
    description:
      'Several floor tiles are cracked near the arrival exit, posing a tripping hazard.',
    category: 'Structural',
    status: 'Resolved',
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    location: 'Terminal 3, Arrival Hall, Exit Zone',
    reported: 'Maintenance Staff',
    updated: '2026-01-26T16:20:00Z',
  },
  {
    id: '4',
    title: 'Flickering Lights in Security Check',
    description:
      'Overhead lights are flickering intermittently, reducing visibility during security screening.',
    category: 'Electrical',
    status: 'Open',
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    location: 'Terminal 1, Security Checkpoint C',
    reported: 'Security Staff',
    updated: '2026-01-27T10:05:00Z',
  },
  {
    id: '5',
    title: 'Overflowing Trash Bins',
    description:
      'Trash bins have not been emptied and are overflowing, causing hygiene concerns.',
    category: 'Janitorial',
    status: 'In-Progress',
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    location: 'Terminal 2, Food Court Area',
    reported: 'Cleaning Staff',
    updated: '2026-01-27T10:30:00Z',
  },
  {
    id: '6',
    title: 'Baggage Carousel Not Displaying Flight Info',
    description:
      'The digital display above baggage carousel 5 is blank and not showing flight numbers.',
    category: 'IT',
    status: 'Open',
    images: ['https://via.placeholder.com/150'],
    location: 'Terminal 1, Baggage Claim, Carousel 5',
    reported: 'Ground Operations Staff',
    updated: '2026-01-27T11:00:00Z',
  },
  {
    id: '7',
    title: 'Loose Handrail on Escalator',
    description:
      'The handrail on the escalator feels loose and may pose a safety risk to passengers.',
    category: 'Safety',
    status: 'Resolved',
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    location: 'Terminal 3, Departure Level, Escalator E2',
    reported: 'Maintenance Staff',
    updated: '2026-01-26T14:10:00Z',
  },
];

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIssue(dummyIssues));
  }, [dispatch]);

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>
    <NavigationContainer>
      <IssueDrawer />
    </NavigationContainer>
    // </SafeAreaView>
  );
}
export default App;
