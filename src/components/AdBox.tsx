import { Card } from "@/components/ui/card";

interface AdBoxProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

export const AdBox = ({ className = "", size = "medium" }: AdBoxProps) => {
  const sizeClasses = {
    small: "h-24",
    medium: "h-32",
    large: "h-48"
  };

  return (
    <Card className={`${sizeClasses[size]} ${className} flex items-center justify-center bg-muted/30 border-2 border-dashed border-muted-foreground/20`}>
      <div className="text-center p-4">
        <p className="text-sm text-muted-foreground font-medium">Advertisement Space</p>
        <p className="text-xs text-muted-foreground/60 mt-1">
          Connect Google AdSense or other ad network
        </p>
      </div>
    </Card>
  );
};
