#import "Seon.h"

@implementation Seon

NSString * const NAME = @"Seon";

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(init:(NSString *)sessionId
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    RCTLogInfo(@"[%@] Initializing SDK", NAME);
    [SeonFingerprint sharedManager];
    [[SeonFingerprint sharedManager] setSessionId:sessionId];
    RCTLogInfo(@"[%@] SDK initialized", NAME);
    resolve(@YES);
  }
  @catch (NSException *exception) {
    RCTLogError(@"[%@] %@", NAME, exception.reason);
    reject(@"error", exception.reason, nil);
  }
}

RCT_EXPORT_METHOD(setLoggingEnabled:(BOOL)enabled
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  [[SeonFingerprint sharedManager] setLoggingEnabled:enabled];
  RCTLogInfo(@"[%@] Logging enabled: %@", NAME, @(enabled));
  resolve(@YES);
}

RCT_EXPORT_METHOD(getFingerprintBase64:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  RCTLogInfo(@"[%@] Getting fingerprint", NAME);
  NSString * fingerprint = [[SeonFingerprint sharedManager] fingerprintBase64];
  resolve(fingerprint);
}

@end
