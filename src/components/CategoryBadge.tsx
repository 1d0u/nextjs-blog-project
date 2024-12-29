interface CategoryBadgeProps {
  name: string
  color?: string
  className?: string
}

export default function CategoryBadge({ name, color = '#FF5733', className = '' }: CategoryBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${className}`}
      style={{
        backgroundColor: `${color}15`, // %15 opaklık
        color: color,
        border: `1px solid ${color}30`, // %30 opaklık
      }}
    >
      {name}
    </span>
  )
} 