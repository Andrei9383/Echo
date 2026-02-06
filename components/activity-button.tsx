import { Button } from "./ui/button";

export default function ActivityButton({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: object;
}) {
  return (
    <Button
      style={{ ...style, width: 170, height: 100, borderRadius: 20 }}
      variant="outline"
    >
      {children}
    </Button>
  );
}
