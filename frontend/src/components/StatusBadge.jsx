import { STATUS } from '../data/mockData'

const colorMap = {
  amber: 'bg-amber-100 text-amber-600',
  teal: 'bg-teal-100 text-teal-600',
  moss: 'bg-moss-100 text-moss-600',
  coral: 'bg-coral-100 text-coral-600',
}

export default function StatusBadge({ status }) {
  const info = STATUS[status]
  if (!info) return null

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${colorMap[info.color]}`}
    >
      {info.label}
    </span>
  )
}
