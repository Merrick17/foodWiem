import React from 'react'

const Mark = ({description, lat, lng}) => {
    return (
      <div lat={lat} lng={lng}>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" >
          <path
            d="M16.2 26.69l5.66-5.66L7.83 7c-3.12 3.12-3.12 8.19 0 11.31l8.37 8.38zm13.57-3.63c3.05 1.43 7.36.42 10.54-2.76 3.83-3.83 4.56-9.3 1.63-12.23C39 5.14 33.52 5.87 29.7 9.7c-3.18 3.18-4.18 7.49-2.76 10.54-4.45 4.44-19.53 19.52-19.53 19.52l2.83 2.83L24 28.83l13.76 13.76 2.83-2.83L26.83 26l2.94-2.94z"
            fill="#111"
          />
            </svg>
            <p style={{ textAlign: "center"}}>{description}</p>
      </div>
    );
}

export default Mark
