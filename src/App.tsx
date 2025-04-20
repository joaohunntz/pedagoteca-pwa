import { useEffect, useState } from 'react'

export default function App() {
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const [installed, setInstalled] = useState(false)
  const [isIphone, setIsIphone] = useState(false)
  const [showGif, setShowGif] = useState(false)

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    setIsIphone(/iphone|ipad|ipod/.test(userAgent))

    const verificarSeInstalado = () => {
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true

      setInstalled(isStandalone)
    }

    verificarSeInstalado()

    const beforeInstallHandler = (e: any) => {
      e.preventDefault()
      setInstallPrompt(e)
    }

    const installedHandler = () => {
      setInstalled(true)
    }

    window.addEventListener('beforeinstallprompt', beforeInstallHandler)
    window.addEventListener('appinstalled', installedHandler)
    window.addEventListener('focus', verificarSeInstalado)

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallHandler)
      window.removeEventListener('appinstalled', installedHandler)
      window.removeEventListener('focus', verificarSeInstalado)
    }
  }, [])

  // 👇 INICIALIZAÇÃO SEGURA DO ONESIGNAL
  useEffect(() => {
    if (!(window as any).OneSignalInitialized) {
      (window as any).OneSignalInitialized = true

      ;(window as any).OneSignalDeferred = (window as any).OneSignalDeferred || []
      ;(window as any).OneSignalDeferred.push(async function (OneSignal: any) {
        await OneSignal.init({
          appId: "09039362-ba90-4093-aeed-ed2c9a9594a1",
          serviceWorkerPath: "/OneSignalSDKWorker.js",
        })

        const enabled = await OneSignal.isPushNotificationsEnabled()
        console.log("Notificações ativas?", enabled)
      })
    }
  }, [])

  const handleInstall = () => {
    if (isIphone) {
      setShowGif(true)
    } else if (installPrompt) {
      installPrompt.prompt()
    }
  }

  const handleEntrarAgora = () => {
    setTimeout(() => {
      window.location.href = 'https://app--pedagoteca-9b521c1a.base44.app/'
    }, 2000)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f8ff',
      fontFamily: 'system-ui, sans-serif',
      padding: 20,
      textAlign: 'center'
    }}>
      <img
        src="/corujinha.png"
        alt="Pedagoteca"
        width={160}
        height={160}
        style={{ marginBottom: 20 }}
      />

      <h1 style={{
        fontSize: '2rem',
        color: '#1e293b'
      }}>
        Uhuul! Tudo certo. Vamos começar?
      </h1>

      <p style={{ color: '#475569', marginBottom: 30, maxWidth: 300 }}>
        Toque no botão abaixo para instalar o aplicativo ou continue agora mesmo.
      </p>

      {!installed && (
        <button onClick={handleInstall} style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '12px',
          border: 'none',
          marginBottom: '12px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          cursor: 'pointer'
        }}>
          📲 Instalar Aplicativo
        </button>
      )}

      {isIphone && showGif && (
        <div style={{ maxWidth: 320 }}>
          <p style={{ fontSize: '14px', color: '#475569' }}>
            Toque em <strong>Compartilhar</strong> e depois em <strong>“Adicionar à
