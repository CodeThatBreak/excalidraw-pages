"use client";
import { useState, useEffect, useRef } from "react";

export default function IndexPage() {
  const [Comp, setComp] = useState(null);
  const excalRef = useRef(null);
  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) => {
      setComp(comp.Excalidraw);
    });
  }, []);

  const onChange = () => {
    // The ref will get initialized with API
    console.log(excalRef.current, "HEY");
  };
  return (
    <>
      <h1> Excalidraw with Next </h1>
      <div style={{ height: "800px", margin: "40px" }}>
        {Comp && <Comp ref={excalRef} onChange={onChange} />}
      </div>
    </>
  );
}
