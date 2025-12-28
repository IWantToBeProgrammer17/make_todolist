export default function NotfoundPage() {
    return (
     <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      overflow: 'hidden'
    }}>
      <div style={{
        fontSize: '10rem',
        fontWeight: 'bold',
        animation: 'bounce 2s infinite',
        marginBottom: '20px'
      }}>
        404
      </div>
      <h1 style={{
        fontSize: '3rem',
        margin: '0 0 20px 0',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
      }}>
        Oops! Page Not Found
      </h1>
      <p style={{
        fontSize: '1.5rem',
        margin: '0 0 40px 0',
        maxWidth: '600px'
      }}>
        The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
      </p>
      <button style={{
        padding: '15px 30px',
        fontSize: '1.2rem',
        backgroundColor: '#ff6b6b',
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
      }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff5252'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ff6b6b'}
      onClick={() => window.location.href = '/app/dashboard'}
      >
        Go Home
      </button>
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-30px);
            }
            60% {
              transform: translateY(-15px);
            }
          }
        `}
      </style>
    </div>
    );
}