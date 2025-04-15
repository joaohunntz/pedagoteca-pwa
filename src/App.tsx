import { useEffect, useState } from 'react'

export default function App() {
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const beforeInstallHandler = (e: any) => {
      e.preventDefault()
      setInstallPrompt(e)
    }

    const installedHandler = () => {
      setInstalled(true)
      window.location.href = 'https://pedagoteca.site'
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
        Toque no botão abaixo para instalar a Pedagoteca no seu dispositivo.
      </p>

      {installPrompt && !installed && (
        <button onClick={handleInstall} style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '12px',
          border: 'none',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          cursor: 'pointer'
        }}>
          📲 Instalar Aplicativo
        </button>
      )}
    </div>
  )
}
