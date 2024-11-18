import React, { useState } from "react";
import Sidebar from "./Sidebar";
import FunctionPage from "./FunctionPage";
import CodeBlock from "./CodeBlock";

const Documentation = () => {
  const classData = [
    {
      name: "Global",
      functions: [
        { 
          name: "Notify", 
          description: "Displays notification on screen", 
          exampleCode: "Notify(message)" 
        },
        { 
          name: "getRoamingPath", 
          description: "returns path to flarial folder", 
          exampleCode: "getRoamingPath()" 
        },
        { 
          name: "onEvent", 
          description: `
          <p>Event listener</p>
          event name list:
          
          <table style="width:100%">
            <tr>
              <th>Name</th>
              <th>Argument</th>
            </tr>
            <tr>
              <td>onKeyEvent</td>
              <td>int: key, int: action</td>
            </tr>
            <tr>
              <td>onMouseEvent</td>
              <td>int: button, int: action</td>
            </tr>
            <tr>
              <td>onPacketReceiveEvent</td>
              <td>int: packet id</td>
            </tr>
            <tr>
              <td>onTickEvent</td>
              <td></td>
            </tr>
            <tr>
              <td>onRenderEvent</td>
              <td></td>
            </tr>
          </table>
          `, 
          exampleCode: `onEvent(eventname, function()
end)` 
        },
      ],
    },
    {
      name: "GUI",
      functions: [
        { 
          name: "Color", 
          description: "returns color", 
          exampleCode: "GUI.Color(float: r, float: g, float: b, float: a) " 
        },
        { 
          name: "RoundedRect", 
          description: `<p>Draws RoundedRect on screen</p>
          Shoud be executed only in onRenderEvent
          `, 
          exampleCode: "GUI.RoundedRect(int: x, int: y, GUI.Color: color, float: radiusX, float: radiusY, float: height, float: width)" 
        },
        { 
          name: "TextWithFont", 
          description: `Draws text <p>Shoud be executed only in onRenderEvent</p> <p>Recommended to use Constraints for a font size`, 
          exampleCode: "GUI.TextWithFont(int: x, int: y, string: text, float: height, float: width, float: fontSize) " 
        },
        { 
          name: "RoundedHollowRect", 
          description: `<p>Draws RoundedHollowRect on screen</p>
          Shoud be executed only in onRenderEvent
          `, 
          exampleCode: "GUI.RoundedHollowRect(int: x, int: y, GUI.Color: color,float: height float: width, float: rounding, float: shadowSize)" 
        },
      ],
    },
    {
      "name": "Constraints",
      "functions": [
        {
          "name": "PercentageConstraint",
          "description": "Calculates a percentage-based constraint",
          "exampleCode": "Constraints.PercentageConstraint(float: percentage, string: edge, bool: ignore_stack)"
        },
        {
          "name": "RelativeConstraint",
          "description": "Calculates a relative constraint",
          "exampleCode": "Constraints.RelativeConstraint(float: percent, string: dimension, bool: ignore_stack)"
        },
        {
          "name": "CenterConstraint",
          "description": "Calculates the center position",
          "exampleCode": "Constraints.CenterConstraint(float: width, float: height, string: axis, float: xModifier, float: yModifier, bool: ignore_stack)"
        },
        {
          "name": "RoundingConstraint",
          "description": "Calculates rounding constraints for radius X and Y",
          "exampleCode": "Constraints.RoundingConstraint(float: radiusX, float: radiusY)"
        },
        {
          "name": "FontScaler",
          "description": "Scales the font size based on a dimension",
          "exampleCode": "Constraints.FontScaler(float: dimension)"
        },
        {
          "name": "CalculatePercentage",
          "description": "Calculates percentage-based positions for X and Y",
          "exampleCode": "Constraints.CalculatePercentage(float: x, float: y, float: adjustWidth, float: adjustHeight)"
        }
      ]
    },
  ];

  const [currentClass, setCurrentClass] = useState(null);

  const handleFunctionSelect = (className, functionName) => {
    setCurrentClass(className === "Home" ? null : className);
  
    if (functionName) {
      setTimeout(() => {
        const element = document.getElementById(functionName);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const manifestFileCOntent = `{
    "name": "Module name", 
    "description": "Module description", 
    "main_class": "scriptname.lua"
}`;

const minScriptContent = `function onEnable()
    Notify("enabled")
end

function onDisable()
    Notify("disabled")
end`;
  

  const renderContent = () => {
    if (!currentClass) {
      return (
        <div className="home-content">
            <div className="function-section">
              <p class="text-2xl font-bold">About</p>
              <p>Flarial scripting api uses lua 5.4.7. Scripting api allows you to create you own custom modules.</p>
              <p>Scripts can be found in the script browser (TBD), however you can add one yourself by pasting the script folder in this path</p>
              <i>this location can change if you have a version switcher</i>
              <CodeBlock code="%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\RoamingState\Flarial\scripts" />
              <p><strong>WARNING:</strong>Scripts from external sources can contain unwanted abilities</p>
            </div>

            <div className="function-section">
              <p class="text-2xl font-bold">Setting up</p>
              <a class="underline" href = "https://code.visualstudio.com/">VSCode download</a>
              <p>Tab completer:</p>
              <CodeBlock code="not done" />
            </div>

            <div className="function-section">
              <p class="text-2xl font-bold">Creating your first script</p>
              <p>Create a new folder with the name of your script, and make "scriptname".json file in:</p>
              <CodeBlock code="%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\RoamingState\Flarial\scripts" />
              <p>Content of your "scriptname".json file shoud be: </p>
              <CodeBlock code={manifestFileCOntent} />




              <p>Create "scriptname".lua file</p>
              <p>Minimal script:</p>
              <CodeBlock code={minScriptContent} />
            </div>
        </div>
      );
    }

    const selectedClass = classData.find((cls) => cls.name === currentClass);
    if (selectedClass) {
      return (
        <FunctionPage
          key={selectedClass.name}
          className={selectedClass.name}
          functions={selectedClass.functions}
        />
      );
    }

    return null;
  };

  return (
    <div className="documentation">
      <Sidebar
        classes={[{ name: "Home" }, ...classData]}
        onFunctionSelect={handleFunctionSelect}
      />
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default Documentation;
