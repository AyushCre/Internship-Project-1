export default function Message({ type = 'info', children }) {
  const color = type === 'error' ? '#dc2626' : type === 'success' ? '#16a34a' : '#0ea5e9'
  const bg = type === 'error' ? '#fee2e2' : type === 'success' ? '#dcfce7' : '#e0f2fe'
  const border = type === 'error' ? '#fecaca' : type === 'success' ? '#bbf7d0' : '#bae6fd'
  return (
    <div style={{ padding: 12, border: `1px solid ${border}`, background: bg, color, borderRadius: 8 }}>
      {children}
    </div>
  )
}
