import { useEffect, useState } from 'react'

export default function App() {
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const [installed, setInstalled] = useState(false)
  const [isIphone, setIsIphone] = useState(false)

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    setIsIphone(/iphone|ipad|ipod/.test(userAgent))

    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true

    if (isStandalone) {
      setInstalled(true)
    }

    const beforeInstallHandler = (e: any) => {
      e.preventDefault()
      setInstallPrompt(e)
    }

    const installedHandler = () => {
      setInstalled(true)
    }

    window.addEventListener('beforeinstallprompt', beforeInstallHandler)
    window.addEventListener('appinstalled', installedHandler)

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallHandler)
      window.removeEventListener('appinstalled', installedHandler)
    }
  }, [])

  const handleInstall = () => {
    if (installPrompt) {
      installPrompt.prompt()
    }
  }

  const handleEntrarAgora = () => {
    if (window?.OneSignal && typeof window.OneSignal.showSlidedownPrompt === 'function') {
      window.OneSignal.showSlidedownPrompt()
    }

    setTimeout(() => {
      window.location.href = 'https://pedagoteca.site'
    }, 2000)
  }

  const handleAbrirApp = () => {
    window.location.href = 'https://pedagoteca.site'
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

      {/* 🔁 Mensagem dinâmica */}
      {installed ? (
        <div style={{ marginBottom: 30, maxWidth: 320, textAlign: 'center' }}>
          <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#16a34a' }}>
            ✅ Aplicativo instalado com sucesso!
          </p>
          <p style={{ color: '#475569' }}>
            Procure pelo ícone da <strong>Pedagoteca</strong>{' '}
            <img src="/icon-192.png" alt="Ícone" style={{ width: 20, verticalAlign: 'middle' }} /> 
            na sua tela inicial para acessar.
          </p>

          <button onClick={handleAbrirApp} style={{
            marginTop: 20,
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            fontSize: '16px',
            borderRadius: '12px',
            border: 'none',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            cursor: 'pointer'
          }}>
            🚀 Abrir Aplicativo
          </button>
        </div>
      ) : (
        <p style={{ color: '#475569', marginBottom: 30, maxWidth: 300 }}>
          Toque no botão abaixo para instalar o aplicativo ou continue agora mesmo.
        </p>
      )}

      {/* Mostrar botão de instalação somente se não for iPhone e app ainda não instalado */}
      {!isIphone && installPrompt && !installed && (
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

      {/* Mostrar botão Entrar agora se for iPhone OU já instalado */}
      {(isIphone || installed) && (
        <button onClick={handleEntrarAgora} style={{
          backgroundColor: '#f1f5f9',
          color: '#1e293b',
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '12px',
          border: '1px solid #cbd5e1',
          cursor: 'pointer',
          marginTop: installed ? 12 : 0
        }}>
          Entrar agora
        </button>
      )}
    </div>
  )
}
