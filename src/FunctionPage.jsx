import React from "react";
import CodeBlock from "./CodeBlock";

const FunctionPage = ({ className, functions }) => (
  <div className="function-page">
    {functions.map((fn) => (
      <div key={fn.name} id={fn.name} className="function-section">
        <p class="text-2xl font-bold">{fn.name}</p>
        <div
          dangerouslySetInnerHTML={{ __html: fn.description }}
        />
        <CodeBlock code={fn.exampleCode} />
      </div>
    ))}
  </div>
);

export default FunctionPage;
