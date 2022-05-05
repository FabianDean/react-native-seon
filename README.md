# react-native-seon

Seon SDK for React Native

## Installation

```sh
npm install react-native-seon
```

## Usage

```js
import * as RNSeon from "react-native-seon";

// ...

const sessionId = "SESSION_ID";

// Initialize SDK
RNSeon.init(sessionId);

// Enable/disable logging
RNSeon.setLoggingEnabled(true /* or false */);

// Compute device fingerprint
let deviceFingerprint;

RNSeon.getFingerprintBase64().then((fp) => {
  deviceFingerprint = fp;
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
