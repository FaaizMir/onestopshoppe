import React, { useEffect, useRef, useCallback } from 'react';
import { fabric } from 'fabric';

const TShirtPreview = ({
  textElements,
  shirtColor,
  selectedShirt,
  logoImage,
  fontSize,
  fontBold,
  fontItalic,
  elementPosition,
  handleResetCanvas,
  handleShirtColorChange,
}) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const imageRef = useRef(null);

  const updateCanvas = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    canvas.clear();

    if (selectedShirt) {
      // Create a fabric.Image object for the shirt
      fabric.Image.fromURL(
        selectedShirt,
        (shirtImg) => {
          // Customize shirt image properties here
          imageRef.current = shirtImg;
          canvas.add(shirtImg);

          // Create fabric.Textbox objects for each text element
          textElements.forEach((textElement) => {
            const { text, left, top, fontSize, fontBold, fontItalic } = textElement;
            const textObj = new fabric.Textbox(text, {
              left,
              top,
              selectable: true,
              fontSize: fontSize || 30,
              fontWeight: fontBold ? 'bold' : 'normal',
              fontStyle: fontItalic ? 'italic' : 'normal',
              textAlign: 'left',
              hasControls: true,
              lockScalingX: false,
              lockScalingY: false,
            });
            canvas.add(textObj);
          });

          // Create a fabric.Image object for the logo
          if (logoImage) {
            fabric.Image.fromURL(
              logoImage,
              (logoImg) => {
                // Customize logo image properties here
                canvas.add(logoImg);
                canvas.renderAll();
              },
              { crossOrigin: 'anonymous' }
            );
          }

          canvas.renderAll();
        },
        { crossOrigin: 'anonymous' }
      );
    }
  },);

  // Handle changing the shirt color
  const handleChangeShirtColor = () => {
    if (imageRef.current) {
      imageRef.current.filters = [new fabric.Image.filters.HueRotation()];
      imageRef.current.filters[0].rotation = 2 * Math.random() - 1;
      imageRef.current.applyFilters();
      fabricCanvasRef.current.requestRenderAll();
    }
  };

  // Watch for changes in shirtColor and trigger color change function
  useEffect(() => {
    handleChangeShirtColor();
  }, [shirtColor]);

  // Initialize Fabric.js canvas on component mount
  useEffect(() => {
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
    });

    // Add event listeners for object selection and movement
    fabricCanvasRef.current.on('object:selected', (e) => {
      const selectedObject = e.target;
      selectedObject.lockScalingX = false;
      selectedObject.lockScalingY = false;
    });

    fabricCanvasRef.current.on('before:selection:cleared', (e) => {
      const deselectedObject = e.target;
      deselectedObject.lockScalingX = true;
      deselectedObject.lockScalingY = true;
    });

   // Make the canvas elements movable
  fabricCanvasRef.current.on('object:moving', (e) => {
    const movedObject = e.target;
    // Get the current mouse position
    const mousePos = fabricCanvasRef.current.getPointerPosition();
    // Update the object's coordinates based on the mouse position
    movedObject.setCoords(mousePos);
  });
  }, []);

  useEffect(() => {
    updateCanvas();
  }, [updateCanvas]);

  return (
    <div className="canvas-container">
      <div className="canvas-wrapper">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default TShirtPreview;
