import { createContext, useContext, useState } from "react";

// const {title, setTitle} = useContext(TitleContext);
// <TitleContext.Provider value={title, setTitle}>

//Provider value={setTitle}
const TitleContext = createContext();

function DemoInnerBoxContent() {
  // get Provider value
  const setTitle = useContext(TitleContext);
  return (
    <div>
      <button
        onClick={() => {
          setTitle(Math.random());
        }}
      >
        Update title!
      </button>
    </div>
  );
}

function DemoinnerBox() {
  return <DemoInnerBoxContent />;
}

function DemoInner() {
  return <DemoinnerBox />;
}
export default function Demo() {
  const [title, setTitle] = useState("I am title");
  return (
    <TitleContext.Provider value={setTitle}>
      <div>
        title:{title}
        <DemoInner />
      </div>
    </TitleContext.Provider>
  );
}
