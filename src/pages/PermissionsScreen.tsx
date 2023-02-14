import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PermissionsContext } from '../context/PermissionsContext';
import BlackButton from '../components/BlackButton';

const PermissionsScreen = () => {

  const {permissions, askLocationPermission} = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text>Es necesario el uso del GPS para usar esta aplicación</Text>

      <BlackButton
        title="Permiso"
        onPress={askLocationPermission}
      />

      <Text>
        {JSON.stringify(permissions, null, 5)}
      </Text>
    </View>
  );
};

export default PermissionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
