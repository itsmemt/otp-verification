import React, { useState, useRef } from "react";
import "./App.css"
const PhoneVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showPopup, setShowPopup] = useState(false);
  const inputRef = useRef([]);

  const handleOnChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleOnPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .slice(0, 6)
      .split("");
    const newOtp = [...otp];
    pastedData.forEach((data, index) => {
      if (isNaN(data)) {
        return;
      }
      newOtp[index] = data;
    });
    setOtp(newOtp);
  };

  const handleOnKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    } else if (e.keyCode >= 37 && e.keyCode <= 40) {
      // Arrow keys
      const newIndex =
        e.keyCode === 37 || e.keyCode === 38 ? index - 1 : index + 1;
      if (newIndex >= 0 && newIndex < 6) {
        inputRef.current[newIndex].focus();
      }
    }
  };
  const handleClear = () => {
    setOtp(["", "", "", "", "", ""]);
    inputRef.current[0].focus();
  };
  const handleOnClick = () => {
    setShowPopup(true);
  };
  return (
    <div className="container">
     <main>
      <div className="heading">
        <button onClick={handleOnClick}>Send OTP</button>
      </div>
      <hr/>
      <div className="heading">
        {showPopup && (
          <div className="popup-container">
            <div className="popup">
              <h3>Phone Verification</h3>
              <p>Enter the OTP you recieved on 9891XXXXXX</p>
              <div className="otp-container">
                {otp.map((data, index) => (
                  <input
                    className="otp-input"
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleOnChange(e, index)}
                    onKeyDown={(e) => handleOnKeyDown(e, index)}
                    onPaste={handleOnPaste}
                    ref={(ref) => (inputRef.current[index] = ref)}
                  />
                ))}
              </div>
              <div className="bottom">
              <button onClick={handleClear}>Clear</button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
              <button>Verify Phone Number</button>
              </div>

            </div>
          </div>
        )}
      </div>
      </main>
    </div>
  );
};

export default PhoneVerification;
