// app/index.tsx
import HeavyComponent from "@/components/HeavyComponent";
import React, { useEffect, useRef, useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const [data, setData] = useState<number[]>([]);
  const [showHeavyComponent, setShowHeavyComponent] = useState(false);
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  // Using useRef to store mount time without causing re-renders
  const mountTime = useRef(Date.now());

  const renderTime = Date.now() - mountTime.current;
  console.log(`Component took ${renderTime} ms to mount`);

  const loadData = () => {
    const start = Date.now();
    const sampleData = Array.from({ length: 1000 }, (_, i) => i + 1);
    setData(sampleData);
    const end = Date.now();
    console.log("Data Loading Time:", end - start, "ms");
  };

  const handleLoadComponent = () => {
    setIsComponentLoaded(true);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Conditional Rendering Demo</Text>
      <Button title="Load Component" onPress={handleLoadComponent} />
      {isComponentLoaded && <HeavyComponent />}
      <Button
        title="Load Heavy Component"
        onPress={() => setShowHeavyComponent(true)}
      />
      {showHeavyComponent && <HeavyComponent />}
    </View>
  );
}
