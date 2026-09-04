interface BulletListProps {
  items: string[];
  bulletColor?: string;
  bulletIcon?: string;
  itemClassName?: string;
  highlightFirst?: boolean;
}

export default function BulletList({ 
  items, 
  bulletColor = "text-cyan-400",
  bulletIcon = "→",
  itemClassName = "flex items-start gap-3 hover:text-white transition-colors duration-300",
  highlightFirst = false
}: BulletListProps) {
  return (
    <ul className="space-y-3 text-gray-300">
      {items.map((item, index) => (
        <li 
          key={index} 
          className={
            highlightFirst && index === 0 
              ? "flex items-start gap-3 text-white font-semibold bg-indigo-500/20 p-3 rounded-lg -mx-3 hover:bg-indigo-500/30 transition-colors duration-300"
              : itemClassName
          }
        >
          <span className={`${bulletColor} mt-1`}>{bulletIcon}</span>
          {item}
        </li>
      ))}
    </ul>
  );
}