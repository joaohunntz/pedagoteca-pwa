useEffect(() => {
  if (!(window as any).OneSignalInitialized) {
    (window as any).OneSignalInitialized = true

    ;(window as any).OneSignal = (window as any).OneSignal || []
    ;(window as any).OneSignal.push(function () {
      (window as any).OneSignal.init({
        appId: "SUA_APP_ID_AQUI", // substitua pelo seu ID real
        serviceWorkerPath: "/OneSignalSDKWorker.js"
      })
    })
  }
}, [])
