interface HeadingProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="flex  gap-x-4">
      {icon}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
