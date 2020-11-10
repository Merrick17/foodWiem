import React from 'react'
import Modal from 'react-modal'
const customStyles = {
  content: {
    width: '25rem',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
}
const Mark = ({ description, lat, lng, name, photos }) => {
  var subtitle
  const [modalIsOpen, setIsOpen] = React.useState(false)
  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }
  function createMarkup(text) {
    return { __html: text }
  }
  return (
    <div lat={lat} lng={lng} onMouseEnter={openModal} onMouseLeave={closeModal}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="card">
          <div dangerouslySetInnerHTML={createMarkup(photos)} />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
            <button className="btn btn-primary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </Modal>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        onClick={() => {
          console.log('clicked..')
        }}
      >
        <path
          d="M16.2 26.69l5.66-5.66L7.83 7c-3.12 3.12-3.12 8.19 0 11.31l8.37 8.38zm13.57-3.63c3.05 1.43 7.36.42 10.54-2.76 3.83-3.83 4.56-9.3 1.63-12.23C39 5.14 33.52 5.87 29.7 9.7c-3.18 3.18-4.18 7.49-2.76 10.54-4.45 4.44-19.53 19.52-19.53 19.52l2.83 2.83L24 28.83l13.76 13.76 2.83-2.83L26.83 26l2.94-2.94z"
          fill="#111"
        />
      </svg>
      <p style={{ textAlign: 'center' }}>{name}</p>
    </div>
  )
}

export default Mark
