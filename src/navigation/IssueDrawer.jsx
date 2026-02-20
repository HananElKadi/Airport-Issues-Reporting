import { createDrawerNavigator } from '@react-navigation/drawer';
import IssueStack from './IssueStack';
import DrawerContent from '../components/UI/Drawer';

const Drawer = createDrawerNavigator();

export default function IssueDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="IssueStack"
        component={IssueStack}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}
