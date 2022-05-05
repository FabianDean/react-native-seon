package com.reactnativeseon;

import android.util.Log;
import androidx.annotation.NonNull;
import android.content.Context;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import io.seon.androidsdk.service.Seon;
import io.seon.androidsdk.service.SeonBuilder;

@ReactModule(name = SeonModule.NAME)
public class SeonModule extends ReactContextBaseJavaModule {
    public static final String NAME = "Seon";
    private static Seon seon = null;
    private static Context context;

    public SeonModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext.getApplicationContext();
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void init(String sessionId, Promise promise) {
        try {
            if (seon != null) {
                throw new Exception("SDK is already initialized");
            }
            Log.d(NAME, "Initializing SDK");
            seon = new SeonBuilder()
                .withContext(context)
                .withSessionId(sessionId)
                .build();
            Log.d(NAME, "SDK initialized");
            promise.resolve(true);
        } catch (Exception e) {
            Log.e(NAME, e.toString());
            promise.reject(e);
        }
    }

    @ReactMethod
    public void setLoggingEnabled(boolean enabled, Promise promise) {
        seon.setLoggingEnabled(enabled);
        Log.d(NAME, "Logging enabled: " + enabled);
        promise.resolve(true);
    }

    @ReactMethod
    public void getFingerprintBase64(Promise promise) {
        Log.d(NAME, "Getting fingerprint");
        String fingerprint = seon.getFingerprintBase64();
        promise.resolve(fingerprint);
    }
}
