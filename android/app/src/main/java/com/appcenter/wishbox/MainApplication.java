package com.appcenter.wishbox;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.image.zoom.ReactImageZoom;
import com.reactnative.photoview.PhotoViewPackage;
import com.wix.reactnativenotifications.RNNotificationsPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.vydia.UploaderReactPackage;
import com.microsoft.codepush.react.CodePush;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.imagepicker.ImagePickerPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;

import java.util.Arrays;
import java.util.List;

import me.neo.react.StatusBarPackage; 

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new GoogleAnalyticsBridgePackage(),
            new ReactImageZoom(),
            new StatusBarPackage(),
            new PhotoViewPackage(),
            new RNNotificationsPackage(MainApplication.this),
            new RNFetchBlobPackage(),
            new UploaderReactPackage(),
            new SplashScreenReactPackage(),
            new ImagePickerPackage(),
            new CodePush("JQ_5RGcXhy74UVasGx4foofQ8c_B4JbRVLAlz", getApplicationContext(), BuildConfig.DEBUG),
            new ReactNativeI18n(),
            new VectorIconsPackage(),
            new RNDeviceInfo(),
            new ReactNativeConfigPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
