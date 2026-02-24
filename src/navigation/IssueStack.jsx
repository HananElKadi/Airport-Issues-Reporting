import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IssuesFeedScreen from '../screens/Issues/IssuesFeedScreen';
import CreateIssueScreen from '../screens/Issues/CreateIssueScreen';
import IssueDetailsFormScreen from '../screens/Issues/IssueDetailsFormScreen';
import HeaderOptions from '../components/Header/HeaderOption';
import { MenuButton } from '../components/Header/HeaderButtons';

const Stack = createNativeStackNavigator();

const IssueStack = () => {
  return (
    <Stack.Navigator screenOptions={HeaderOptions}>
      <Stack.Screen
        name="Issues"
        component={IssuesFeedScreen}
        options={({ navigation }) => ({
          title: 'REPORT ISSUES',
          headerLeft: () => (
            <MenuButton
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CreateIssue"
        component={CreateIssueScreen}
        options={{ title: 'NEW ISSUE' }}
      />
      <Stack.Screen
        name="DetailsForm"
        component={IssueDetailsFormScreen}
        options={{ title: 'ISSUE DETAILS' }}
      />
    </Stack.Navigator>
  );
};

export default IssueStack;
