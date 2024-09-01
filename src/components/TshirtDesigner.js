import React, { useState, useEffect } from "react";
import TShirtPreview from "./TShirtPreview";

import half_sleeve from "../assets/half_sleeve.png";
import mens_fullsleeve from "../assets/mens_fullsleeve.png";
import mens_hoodie from "../assets/mens_hoodie.png";
import mens_trank from "../assets/mens_trank.png";

const shirtImages = [half_sleeve, mens_fullsleeve, mens_hoodie, mens_trank];
const shirtColors = [
  "#ffffff",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#00ffff",
  "#ff00ff",
  "#ffa500",
  "#800080",
  "#808080",
];

const TshirtDesigner = () => {
  const [text, setText] = useState("");
  const [shirtColor, setShirtColor] = useState("#ffffff");
  const [selectedShirt, setSelectedShirt] = useState(shirtImages[0]);
  const [logoImage, setLogoImage] = useState(null);
  const [fontSize, setFontSize] = useState(30);
  const [fontBold, setFontBold] = useState(false);
  const [fontItalic, setFontItalic] = useState(false);
  const [elementPosition, setElementPosition] = useState({
    left: 100,
    top: 250,
  });
  const [selectedShirtURL, setSelectedShirtURL] = useState("");

  useEffect(() => {
    // When the selected shirt changes, update the selectedShirtURL
    setSelectedShirtURL(selectedShirt);
  }, [selectedShirt]);

  // Convert the default shirt image to a data URL on component mount
  useEffect(() => {
    const fetchShirtImage = async () => {
      try {
        const response = await fetch(shirtImages[0]);
        const blob = await response.blob();
        setSelectedShirt(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error fetching shirt image:", error);
      }
    };
    fetchShirtImage();
  }, []);

  // Handler for shirt selection change
  const handleShirtSelection = async (event) => {
    try {
      const response = await fetch(event.target.value);
      const blob = await response.blob();
      setSelectedShirt(URL.createObjectURL(blob));
      setSelectedShirtURL(URL.createObjectURL(blob)); // Update selectedShirtURL as well
    } catch (error) {
      console.error("Error fetching shirt image:", error);
    }
  };
 

  // Handler for shirt color change
  const handleShirtColorChange = (color) => {
    setShirtColor(color);
  };

  // Handler for logo image upload
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    setLogoImage(URL.createObjectURL(file));
  };

  // Handler for font size input
  const handleFontSizeChange = (event) => {
    setFontSize(parseInt(event.target.value));
  };

  // Handler for font bold option
  const handleFontBoldChange = (event) => {
    setFontBold(event.target.checked);
  };

  // Handler for font italic option
  const handleFontItalicChange = (event) => {
    setFontItalic(event.target.checked);
  };

  // Handler for element position input
  const handleElementPositionChange = (event, positionType) => {
    const { value } = event.target;

    setElementPosition((prevState) => ({
      ...prevState,
      [positionType]: parseInt(value),
    }));
  };

  const handleResetCanvas = () => {
    setText("");
    setShirtColor("#ffffff");
    setSelectedShirt(shirtImages[0]);
    setLogoImage(null);
    setFontSize(30);
    setFontBold(false);
    setFontItalic(false);
    setElementPosition({ left: 100, top: 250 });
    setTextElements("")
  };

  const [textElements, setTextElements] = useState([]);

  const addTextElement = () => {
    if (text.trim() !== "") {
      const newTextElement = {
        text,
        left: elementPosition.left || 100,
        top: elementPosition.top || 250,
        fontSize: fontSize || 30,
        fontBold,
        fontItalic,
      };

      setTextElements([...textElements, newTextElement]);
      setText(""); // Clear the text input field
    }
  };
  

  return (
    <>
      <div className="container mt-5">
        <div className="page-header">
          <h1 className="text-gray-900 lg:ml-6 text-3xl font-bold">
            Customize T-Shirt
          </h1>
          <hr className="my-3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div className="col-span-1">
            <div className="card bg-white dark:bg-gray-900 lg:ml-4 p-4 shadow-md">
              <div className="tab-content" id="nav-tabContent"></div>
              <div
                className="tab-pane fade show active"
                id="options"
                role="tabpanel"
                tabIndex="0"
              >
                <div className="mt-3">
                  <p className="mb-2 text-xl text-white font-bold">
                    Choose a T-Shirt Type:
                  </p>
                  <select
                    id="tshirttype"
                    className="w-full px-3 py-2 mb-4 bg-white border rounded-md focus:outline-none"
                    defaultValue={shirtImages[0]}
                    onChange={handleShirtSelection}
                  >
                    {shirtImages.map((shirt, index) => (
                      <option key={index} value={shirt}>
                        {index === 0
                          ? "Short Sleeve"
                          : index === 1
                          ? "Long Sleeve"
                          : index === 2
                          ? "Hoodies"
                          : "Tank tops"}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-3">
                  <p className="mb-2 text-xl text-white font-bold">
                    Choose a T-Shirt Color:
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {shirtColors.map((color, index) => (
                      <div
                        key={index}
                        className={`w-10 h-10 rounded-full cursor-pointer border ${
                          color === shirtColor ? "border-black" : "border-white"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleShirtColorChange(color)}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="customize"
                role="tabpanel"
                tabIndex="0"
              >
                <div className="mt-3">
                  <p className="mb-2 text-xl text-white font-bold">
                    Insert Text:
                  </p>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="w-full px-3 py-2 mr-2 border rounded-md focus:outline-none"
                      aria-label="Add Text Here"
                      placeholder="Add Text Here..."
                      onChange={(event) => setText(event.target.value)}
                      value={text}
                    />
                    <span className="input-group-text">
                      <button
                        id="add-text"
                        className="flex items-center justify-center w-full h-10 text-white bg-blue-500  focus:outline-none"
                        title="Add text"
                        onClick={addTextElement}
                      >
                        Add text
                      </button>
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="mt-3 text-white">
                    <label htmlFor="formFile" className="block">
                      Upload Custom Picture
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-md focus:outline-none"
                      type="file"
                      id="formFile"
                      onChange={handleLogoUpload}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="mb-2 text-xl text-white font-bold">
                    Text Settings:
                  </p>
                  <div className="flex items-center mb-3">
                    <label htmlFor="fontSize" className="w-32 text-white">
                      Font Size:
                    </label>
                    <input
                      type="number"
                      id="fontSize"
                      name="fontSize"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none"
                      onChange={handleFontSizeChange}
                      value={fontSize}
                    />
                  </div>
                  <div className="flex  text-white items-center mb-3">
                    <label htmlFor="fontBold" className="w-32">
                      Bold:
                    </label>
                    <input
                      type="checkbox"
                      id="fontBold"
                      name="fontBold"
                      className="mr-2 border rounded-md focus:outline-none"
                      onChange={handleFontBoldChange}
                      checked={fontBold}
                    />
                  </div>
                  <div className="flex text-white items-center mb-3">
                    <label htmlFor="fontItalic" className="w-32">
                      Italic:
                    </label>
                    <input
                      type="checkbox"
                      id="fontItalic"
                      name="fontItalic"
                      className="mr-2 border rounded-md focus:outline-none"
                      onChange={handleFontItalicChange}
                      checked={fontItalic}
                    />
                  </div>
                  <div className="flex text-white items-center">
                    <label htmlFor="left" className="w-32">
                      Left:
                    </label>
                    <input
                      type="number"
                      id="left"
                      name="left"
                      className="w-16 px-3 py-2 mr-2 border rounded-md focus:outline-none"
                      onChange={(event) =>
                        handleElementPositionChange(event, "left")
                      }
                      value={elementPosition.left}
                    />
                    <label htmlFor="top" className="w-32">
                      Top:
                    </label>
                    <input
                      type="number"
                      id="top"
                      name="top"
                      className="w-16 px-3 py-2 border rounded-md focus:outline-none"
                      onChange={(event) =>
                        handleElementPositionChange(event, "top")
                      }
                      value={elementPosition.top}
                    />
                  </div>
                  <button
                    className="bg-white h-10 w-20 text-grey-900"
                    onClick={handleResetCanvas}
                  >
                    {" "}
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 ">
            <div className="card bg-white p-4 shadow-md">
              <TShirtPreview
                text={text}
                textElements={textElements}
                shirtColor={shirtColor}
                selectedShirt={selectedShirtURL} // Use selectedShirtURL instead of selectedShirt
                logoImage={logoImage}
                fontSize={fontSize}
                fontBold={fontBold}
                fontItalic={fontItalic}
                elementPosition={elementPosition}
                handleShirtColorChange={handleShirtColorChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TshirtDesigner;
