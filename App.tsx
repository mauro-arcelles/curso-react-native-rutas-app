import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { PermissionsProvider } from './src/context/PermissionsContext';
import Navigator from './src/navigator/Navigator';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

const AppState = ({ children }: any) => {
  return (
    <PermissionsProvider>
      {children}
    </PermissionsProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
