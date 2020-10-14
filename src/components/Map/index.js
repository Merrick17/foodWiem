import React, { useState } from "react";
import GoogleMap from "google-map-react";
import Mark from "../Mark";
import Modal from "react-modal";
import ReactStars from "react-stars";
const Map = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [marks, setMarks] = useState([
    {
      name: "restau la3youni",
      lat: 33.8869,
      lng: 9.337844,
      description: "description mta3 restau lena",
      rating: 5,
    },
    {
      name: "restau la3youni",
      lat: 34.8869,
      lng: 15.337844,
      description: "description mta3 restau lena",
      rating: 5,
    },
    {
      name: "restau la3youni",
      lat: 30.8869,
      lng: 5.337844,
      description: "description mta3 restau lena",
      rating: 2,
    },
    {
      name: "restau la3youni",
      lat: 28.8869,
      lng: 9.337844,
      description: "description mta3 restau lena",
      rating: 5,
    },
    {
      name: "restau la3youni",
      lat: 29.8869,
      lng: 9.337844,
      description: "description mta3 restau lena",
      rating: 3,
    },
    {
      name: "restau la3youni",
      lat: 20.8869,
      lng: 13.337844,
      description: "description mta3 restau lena",
      rating: 5,
    },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    lat: 0,
    lng: 0,
    description: "",
    rating: "",
  });
  const { name, lat, lng, description, rating } = formData;
  const customStyles = {
    content: {
      width: "50%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent",
    },
  };

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onChangeRating = (e) => setFormData({ ...formData, rating: e });

  const onSubmit = (e) => {
    e.preventDefault();
    const newMarks = [...marks, { ...formData }];
    setMarks(newMarks);
    setFormData("");
    closeModal();
  };
  return (
    <div style={{ overflowX: "hidden", display: "flex" }}>
      <div style={{ height: "100vh", width: "75%", overflowX: "hidden" }}>
        <GoogleMap
          bootstrapURLKeys={{
            key: "AIzaSyDfcXOKPj2FBy-hE5Z1Npf_NWYap6e5xAA",
          }}
          defaultCenter={{ lat: 33.8869, lng: 9.5375 }}
          defaultZoom={10}>
          {marks.map((mark, index) => {
            return (
              <Mark
                key={index}
                name={mark.name}
                description={mark.description}
                lat={mark.lat}
                lng={mark.lng}></Mark>
            );
          })}
        </GoogleMap>
      </div>
      <div style={{ height: "100vh", width: "25%", paddingLeft: "2rem" }}>
        <div style={{ paddingBottom: "2rem" }}>
          <button onClick={openModal}> Add restaurant</button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}>
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Add Restaurant</h5>
                  <button
                    onClick={closeModal}
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        name="name"
                        placeholder="Restaurant Name"
                        value={name}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div class="row">
                      <div class="col">
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Latitude"
                          id="lat"
                          name="lat"
                          value={lat}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                      <div class="col">
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Longitude"
                          id="lng"
                          name="lng"
                          value={lng}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <ReactStars
                        name="rating"
                        count={5}
                        size={48}
                        color2={"#ffd700"}
                        value={rating}
                        onChange={(e) => onChangeRating(e)}
                      />
                    </div>
                    <button type="submit" class="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        {marks.map((mark, index) => {
          return (
            <div class="media text-muted pt-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
                <path
                  d="M16.2 26.69l5.66-5.66L7.83 7c-3.12 3.12-3.12 8.19 0 11.31l8.37 8.38zm13.57-3.63c3.05 1.43 7.36.42 10.54-2.76 3.83-3.83 4.56-9.3 1.63-12.23C39 5.14 33.52 5.87 29.7 9.7c-3.18 3.18-4.18 7.49-2.76 10.54-4.45 4.44-19.53 19.52-19.53 19.52l2.83 2.83L24 28.83l13.76 13.76 2.83-2.83L26.83 26l2.94-2.94z"
                  fill="#111"
                />
              </svg>
              <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong class="d-block text-gray-dark">{mark.name}</strong>
                <p>{mark.description}</p>
                Latitude: {mark.lat}
                <span> </span>
                Longitude: {mark.lng}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Map;
