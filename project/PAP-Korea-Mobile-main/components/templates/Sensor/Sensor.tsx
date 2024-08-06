// components/sensor.js
import React, { useState } from "react";
import VisibilitySensor from "react-visibility-sensor";
import PropTypes from "prop-types";



const Sensor = ({ children, once }: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <VisibilitySensor
      active={once ? !visible : true}
      onChange={(isVisible) => {
        if (visible && once) {
          return;
        }

        setVisible(isVisible);
      }}
    >
      {children({ isVisible: visible })}
    </VisibilitySensor>
  );
};

Sensor.propTypes = {
  children: PropTypes.func.isRequired,
  once: PropTypes.bool,
};

Sensor.defaultProps = {
  once: false,
};

export default Sensor;