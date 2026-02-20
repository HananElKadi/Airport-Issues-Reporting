import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IssuesFeedScreen from '../screens/Issues/IssuesFeedScreen';
import CreateIssueScreen from '../screens/Issues/CreateIssueScreen';
import IssueDetailsFormScreen from '../screens/Issues/IssueDetailsFormScreen';
import headerOptions from './headerOption';
import { TouchableOpacity, Text } from 'react-native';
import COLORS from '../utils/constants';

const Stack = createNativeStackNavigator();

const MenuButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ marginLeft: 16 }}>
    <Text style={{ fontSize: 26, color: COLORS.accent }}>☰</Text>
  </TouchableOpacity>
);

const IssueStack = () => {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name="Issues"
        component={IssuesFeedScreen}
        options={({ navigation }) => ({
          title: 'Report Issues',
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
        options={{ title: 'New Issue' }}
      />
      <Stack.Screen
        name="DetailsForm"
        component={IssueDetailsFormScreen}
        options={{ title: 'Additional Info' }}
      />
    </Stack.Navigator>
  );
};

export default IssueStack;
