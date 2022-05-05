import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
} from 'react-native';
import * as RNSeon from 'react-native-seon';

const Button = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.button}>
      <Text>{title}</Text>
    </View>
  </TouchableOpacity>
);

export default function App() {
  const [fingerprint, setFingerprint] = useState<string | undefined>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Button title="Init" onPress={() => RNSeon.init('TEST')} />
        <Button
          title="Enable logging"
          onPress={() => RNSeon.setLoggingEnabled()}
        />
        <Button
          title="Disable logging"
          onPress={() => RNSeon.setLoggingEnabled(false)}
        />
        <Button
          title="Get fingerprint"
          onPress={() => {
            RNSeon.getFingerprintBase64().then((fp) => {
              setFingerprint(fp);
            });
          }}
        />
        <Text>{`Fingerprint:\n${fingerprint}`}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'aqua',
    padding: 10,
    marginBottom: 5,
  },
});
