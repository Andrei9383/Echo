import { Button } from "./ui/button";

export default function ActivityButton({
  children,
  style,
  onPress,
}: {
  children: React.ReactNode;
  style?: object;
  onPress?: () => void;
}) {
  return (
    <Button
      style={{
        ...style,
        width: 170,
        height: 100,
        borderRadius: 20,
        borderCurve: "continuous",
        borderWidth: 1,
      }}
      onPress={onPress}
    >
      {children}
    </Button>
  );
}
