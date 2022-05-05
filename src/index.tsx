import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-seon' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const PREFIX = '[RNSeon]';

const Seon = NativeModules.Seon
  ? NativeModules.Seon
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

/**
 * Initialize SEON SDK
 * @param {string} sessionId Custom session ID
 */
export async function init(sessionId: string): Promise<void> {
  try {
    await Seon.init(sessionId);
    console.log(PREFIX, 'SDK initialized');
  } catch (e) {
    console.error(PREFIX, e);
  }
}

/**
 * Enable/disable logging (viewable via `logcat` or in Xcode)
 * @param {boolean} enabled
 */
export async function setLoggingEnabled(
  enabled: boolean = true
): Promise<void> {
  await Seon.setLoggingEnabled(enabled);
  console.log(PREFIX, `Logging enabled: ${enabled}`);
}

/**
 * Compute and return device fingerprint
 * @returns {string} fingerprint as an encrypted, base64 encoded string
 */
export async function getFingerprintBase64(): Promise<string> {
  const fingerprint = await Seon.getFingerprintBase64();
  console.log(PREFIX, 'Computed device fingerprint');
  return fingerprint;
}
