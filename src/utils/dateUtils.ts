export const getArgentinaDate = (date: string | Date) => {
  const UTCDate = typeof date === 'string' ? date : date.toISOString()

  const StrDate = new Date(UTCDate).toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  return StrDate
}
