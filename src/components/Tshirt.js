import React from 'react';
import TShirtPreview from './TShirtPreview';
import TShirtDesigner from './TshirtDesigner';

const Tshirt = () => {
  // const [text, setText] = useState('');
  // const [textColor, setTextColor] = useState('#000000');
  // const [shirtColor, setShirtColor] = useState('#ffffff');
  // const [logoImage, setLogoImage] = useState(null);

  return (
    <div>
      <TShirtDesigner
        // text={text}
        // textColor={textColor}
        // shirtColor={shirtColor}
        // logoImage={logoImage}
        // setText={setText}
        // setTextColor={setTextColor}
        // setShirtColor={setShirtColor}
        // setLogoImage={setLogoImage}
      />
      <TShirtPreview 
      // text={text} textColor={textColor} shirtColor={shirtColor} logoImage={logoImage} 
      />
    </div>
  );
};

export default Tshirt;
