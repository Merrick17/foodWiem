import React, { useState } from 'react'
import GoogleMap from 'google-map-react'
import Mark from '../Mark'
import Modal from 'react-modal'
import ReactStars from 'react-stars'
import { useToasts } from 'react-toast-notifications'
const Map = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false)
  const { addToast } = useToasts()
  const [filterRating, setFilterRating] = useState('')
  const [currentRestaurant, setCurrentRestaurant] = useState('')
  const [currentComment, setCurrentComment] = useState({
    username: 'user1',
    commentBody: '',
  })
  const [marks, setMarks] = useState([
    {
      name: 'restau la3youni',
      lat: 33.8869,
      lng: 9.337844,
      description: 'description mta3 restau lena',
      rating: 5,
      comments: [
        {
          username: 'user1',
          commentBody:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, totam.',
        },
        {
          username: 'user2',
          commentBody:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, totam.',
        },
      ],
    },
    {
      name: 'restau la3youni',
      lat: 34.8869,
      lng: 15.337844,
      description: 'description mta3 restau lena',
      rating: 5,
      comments: [],
    },
    {
      name: 'restau la3youni',
      lat: 30.8869,
      lng: 5.337844,
      description: 'description mta3 restau lena',
      rating: 2,
      comments: [],
    },
    {
      name: 'restau la3youni',
      lat: 28.8869,
      lng: 9.337844,
      description: 'description mta3 restau lena',
      rating: 5,
      comments: [],
    },
    {
      name: 'restau la3youni',
      lat: 29.8869,
      lng: 9.337844,
      description: 'description mta3 restau lena',
      rating: 3,
      comments: [],
    },
    {
      name: 'restau la3youni',
      lat: 20.8869,
      lng: 13.337844,
      description: 'description mta3 restau lena',
      rating: 5,
      comments: [],
    },
  ])
  const [formData, setFormData] = useState({
    name: '',
    lat: 0,
    lng: 0,
    description: '',
    rating: '',
  })
  const { name, lat, lng, description, rating } = formData
  const customStyles = {
    content: {
      width: '50%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'transparent',
    },
  }

  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }
  function openCommentModal() {
    setCommentModalIsOpen(true)
  }
  function closeCommentModal() {
    setCommentModalIsOpen(false)
    setCurrentComment({ username: 'user1', commentBody: '' })
  }
  const onChangeComment = (e) => {
    setCurrentComment({ ...currentComment, [e.target.name]: e.target.value })
    console.log(currentComment)
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onChangeRating = (e) => setFormData({ ...formData, rating: e })
  const onChangeFilterRating = (e) => {
    setFilterRating(e.target.value)
  }

  const onSubmitComment = (e) => {
    e.preventDefault()
    const newMarks = marks
    newMarks[currentRestaurant].comments.push(currentComment)
    setMarks(newMarks)
    setCurrentComment({ username: 'user1', commentBody: '' })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const newMarks = [...marks, { ...formData }]
    setMarks(newMarks)
    setFormData('')
    closeModal()
  }
  const addNewMarker = () => {}
  return (
    <div style={{ overflowX: 'hidden', display: 'flex' }}>
      <div style={{ height: '100vh', width: '75%', overflowX: 'hidden' }}>
        <GoogleMap
          onClick={({ x, y, lat, lng, event }) => {
            addToast('Lat: ' + lat + ' ,Lng: ' + lng, {
              appearance: 'success',
              autoDismiss: false,
            })
            let markerData = {
              name: '',
              lat: lat,
              lng: lng,
              description: '',
              rating: 0,
              comments: [],
            }
            const newMarks = [...marks, { ...markerData }]
            setMarks(newMarks)
          }}
          bootstrapURLKeys={{
            key: 'AIzaSyDfcXOKPj2FBy-hE5Z1Npf_NWYap6e5xAA',
          }}
          defaultCenter={{ lat: 33.8869, lng: 9.5375 }}
          defaultZoom={10}
        >
          {marks.map((mark, index) => {
            return (
              <Mark
                key={index}
                name={mark.name}
                description={mark.description}
                lat={mark.lat}
                lng={mark.lng}
              ></Mark>
            )
          })}
        </GoogleMap>
      </div>
      <div style={{ height: '100vh', width: '25%', paddingLeft: '2rem' }}>
        <div style={{ paddingBottom: '2rem', paddingTop: '2rem' }}>
          <div class="row">
            <div class="col">
              <button onClick={openModal} className="btn btn-primary">
                Add restaurant
              </button>
            </div>
            <div class="col">
              <select
                onChange={(e) => onChangeFilterRating(e)}
                class="custom-select"
              >
                <option value="">Choose Rating</option>
                <option value="1">★</option>
                <option value="2">★★</option>
                <option value="3">★★★</option>
                <option value="4">★★★★</option>
                <option value="5">★★★★★</option>
              </select>
            </div>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Add Restaurant</h5>
                  <button
                    onClick={closeModal}
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
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
                        color2={'#ffd700'}
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
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={commentModalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Comment Section</h5>
                  <button
                    onClick={closeCommentModal}
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div
                  style={{
                    borderBottom: '1px solid #dee2e6',
                    padding: '1rem 1rem',
                  }}
                >
                  {marks[currentRestaurant] &&
                    marks[currentRestaurant].comments &&
                    marks[currentRestaurant].comments.map((comment, i) => {
                      return (
                        <div class="media">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-person-fill"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                            ></path>
                          </svg>
                          <div class="media-body">
                            <h6 class="mt-0">{comment.username}</h6>
                            {comment.commentBody}
                          </div>
                        </div>
                      )
                    })}
                </div>
                <div class="modal-body">
                  <form onSubmit={(e) => onSubmitComment(e)}>
                    <div class="form-group">
                      <textarea
                        type="text"
                        class="form-control"
                        id="commentBody"
                        name="commentBody"
                        placeholder="Your opinion"
                        value={currentComment.commentBody}
                        onChange={(e) => onChangeComment(e)}
                      />
                    </div>
                    <button type="submit" class="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    onClick={closeCommentModal}
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        {marks
          .filter((mark) =>
            filterRating ? Math.floor(mark.rating) == filterRating : true,
          )
          .map((mark, index) => {
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
                  <span> </span>
                  Rating: {mark.rating}
                  <span> </span>
                  <button
                    onClick={() => {
                      openCommentModal()
                      setCurrentRestaurant(index)
                    }}
                    type="button"
                    class="btn btn-outline-primary"
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-chat-left-dots-fill"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                      ></path>
                    </svg>
                  </button>
                </p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Map
