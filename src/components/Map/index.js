import GoogleMap from 'google-map-react'
import Mark from '../Mark'
import Modal from 'react-modal'
import ReactStars from 'react-stars'
import axios from 'axios'
import Swal from 'sweetalert2'

import React, { Component } from 'react'
import resto from '../../data/resto.json'
export default class Map extends Component {
  constructor(props) {
    super(props)
    this.customStyles = {
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
    this.state = {
      modalIsOpen: false,
      commentModalIsOpen: false,
      filterRating: '',
      currentRestaurant: '',
      currentComment: '',
      marks: [],
      formData: {
        name: '',
        lat: 0,
        lng: 0,
        description: '',
        rating: '',
      },
      userlocation: {
        lat: '',
        lng: '',
      },
      defaultPosition: {
        lat: 33.8869,
        lng: 9.5375,
      },
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onChangeFilterRating = this.onChangeFilterRating.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.openCommentModal = this.openCommentModal.bind(this)
    this.closeCommentModal = this.closeCommentModal.bind(this)
    this.onSubmitComment = this.onSubmitComment.bind(this)
    this.onChangeComment = this.onChangeComment.bind(this)
    this.onChangeRating = this.onChangeRating.bind(this)
    this.getData = this.getData.bind(this)
    this.setCurrentRestaurant = this.setCurrentRestaurant.bind(this)
  }
  componentDidMount() {
    Modal.setAppElement(document.getElementById('root'))

    //console.log('Daaataaa', resto.resto)
    this.setState({
      marks: resto.resto,
    })
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords)
      this.setState({
        userlocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      })
      console.log(this.state.userlocation)
      this.getData()
    })
  }

  setCurrentRestaurant(ind) {
    this.setState({
      currentRestaurant: ind,
    })
  }
  getData() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.userlocation.lat},${this.state.userlocation.lng}&radius=2000&type=restaurant&key=AIzaSyAMDtC9Z6uMrTV_NsWjjdeskdGE5W-hITY`,
        {},
      )
      .then((res) => {
        let data = res.data.results
        let newData = data.map((elm) => {
          //console.log(elm.photos[0])
          if (elm.photos != undefined && elm.photos[0]) {
            return {
              name: elm.name,
              photos: elm.photos[0].html_attributions,
              lat: elm.geometry.location.lat,
              lng: elm.geometry.location.lng,
              description: '',
              rating: 0,
              comments: [],
            }
          } else {
            return {
              name: elm.name,

              lat: elm.geometry.location.lat,
              lng: elm.geometry.location.lng,
              description: '',
              rating: 0,
              comments: [],
            }
          }
        })
        this.setState({
          marks: this.state.marks.concat(newData),
        })
        console.log('State', this.state.marks)
      })
  }
  onChangeRating = (e) => {
    this.setState({
      formData: { ...this.state.formData, rating: e },
    })
  }
  onChangeFilterRating = (e) => {
    //     setFilterRating(e.target.value)
    this.setState({
      filterRating: e.target.value,
    })
  }
  openModal() {
    this.setState({
      modalIsOpen: true,
    })
  }
  closeModal() {
    this.setState({
      modalIsOpen: false,
    })
  }
  openCommentModal() {
    //setCommentModalIsOpen(true)
    this.setState({
      commentModalIsOpen: true,
    })
  }
  closeCommentModal() {
    //setCommentModalIsOpen(false)
    // setCurrentComment({ username: 'user1', commentBody: '' })
    this.setState({
      commentModalIsOpen: false,
      username: 'user1',
      commentBody: '',
    })
  }
  onChangeComment = (e) => {
    this.setState({
      currentComment: {
        ...this.state.currentComment,
        [e.target.name]: e.target.value,
      },
    })
    //setCurrentComment({ ...currentComment, [e.target.name]: e.target.value })
    // console.log(currentComment)
  }

  onChange = (e) =>
    //setFormData({ ...formData, [e.target.name]: e.target.value })
    //onChangeRating = (e) => setFormData({ ...formData, rating: e })
    (this.onChangeFilterRating = (e) => {
      //setFilterRating(e.target.value)
    })
  onSubmitComment = (e) => {
    e.preventDefault()
    const newMarks = this.state.marks
    newMarks[this.state.currentRestaurant].comments.push(
      this.state.currentComment,
    )

    this.setState({
      marks: newMarks,
      formData: '',
    })
    // setMarks(newMarks)
    // setCurrentComment({ username: 'user1', commentBody: '' })
  }
  onSubmit = (e) => {
    e.preventDefault()
    const newMarks = [...this.state.marks, { ...this.state.formData }]
    this.setState({
      marks: newMarks,
      formData: '',
    })
    console.log(this.state.marks)
    // setMarks(newMarks)
    // setFormData('')
    this.closeModal()
  }
  render() {
    return (
      <div style={{ overflowX: 'hidden', display: 'flex' }}>
        <div style={{ height: '100vh', width: '75%', overflowX: 'hidden' }}>
          <GoogleMap
            onClick={({ x, y, lat, lng, event }) => {
              // Swal.fire('Lat: ' + lat + ' ,Lng: ' + lng)
              Swal.mixin({
                input: 'text',
                confirmButtonText: 'Next &rarr;',
                showCancelButton: true,
                progressSteps: ['1', '2'],
              })
                .queue([
                  {
                    title: 'Name ',
                    text: 'Add a name',
                  },
                  {
                    title: 'Description',
                    text: 'Add A description',
                  },
                ])
                .then((result) => {
                  if (result.value) {
                    console.log(result.value)
                    const answers = JSON.stringify(result.value)
                    let markerData = {
                      name: result.value[0],
                      lat: lat,
                      lng: lng,
                      description: result.value[1],
                      rating: 0,
                      comments: [],
                    }
                    const newMarks = [...this.state.marks, { ...markerData }]
                    this.setState({
                      marks: newMarks,
                      formData: '',
                    })
                    Swal.fire({
                      title: 'All done!',
                      html: `
                      New Restaurant:

                      <pre><h5>Name: ${markerData.name}</h5> <br>
                      <h5>Description: ${markerData.description}</h5> <br>
                      <h5>Lat: ${markerData.lat}</h5> <br>
                      <h5>Lng: ${markerData.lng}</h5> <br>
                      </pre>
                    `,
                      confirmButtonText: 'Ok!',
                    })
                  }
                })

              //setMarks(newMarks)
            }}
            bootstrapURLKeys={{
              key: 'AIzaSyAMDtC9Z6uMrTV_NsWjjdeskdGE5W-hITY',
            }}
            center={{
              lat: this.state.defaultPosition.lat,
              lng: this.state.defaultPosition.lng,
            }}
            defaultZoom={10}
          >
            {this.state.marks.map((mark, index) => {
              return mark.photos != undefined ? (
                <Mark
                  key={index}
                  name={mark.name}
                  description={mark.description}
                  lat={mark.lat}
                  lng={mark.lng}
                  photos={mark.photos}
                ></Mark>
              ) : (
                <Mark
                  key={index}
                  name={mark.name}
                  description={mark.description}
                  lat={mark.lat}
                  lng={mark.lng}
                  photos={` <a href="https://placeholder.com"><img src="https://via.placeholder.com/250"></a>`}
                ></Mark>
              )
            })}
          </GoogleMap>
        </div>
        <div style={{ height: '100vh', width: '25%', paddingLeft: '2rem' }}>
          <div style={{ paddingBottom: '2rem', paddingTop: '2rem' }}>
            <div className="row">
              <div className="col">
                <button onClick={this.openModal} className="btn btn-primary">
                  Add restaurant
                </button>
              </div>
              <div className="col">
                <button
                  onClick={() => {
                    this.setState({
                      defaultPosition: this.state.userlocation,
                    })
                    console.log(this.state.defaultPosition)
                  }}
                  className="btn btn-primary"
                >
                  Go to my position
                </button>
              </div>
              <div className="col">
                <select
                  onChange={(e) => this.onChangeFilterRating(e)}
                  className="custom-select"
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
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={this.customStyles}
              appElement={document.getElementById('app')}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Restaurant</h5>
                    <button
                      onClick={this.closeModal}
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={(e) => this.onSubmit(e)}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Restaurant Name"
                          value={this.state.name}
                          onChange={(e) => this.onChange(e)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          placeholder="Description"
                          value={this.state.description}
                          onChange={(e) => this.onChange(e)}
                        />
                      </div>
                      <div className="row">
                        <div className="col">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Latitude"
                            id="lat"
                            name="lat"
                            value={this.state.lat}
                            onChange={(e) => this.onChange(e)}
                          />
                        </div>
                        <div className="col">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Longitude"
                            id="lng"
                            name="lng"
                            value={this.state.lng}
                            onChange={(e) => this.onChange(e)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <ReactStars
                          name="rating"
                          count={5}
                          size={48}
                          color2={'#ffd700'}
                          value={this.state.rating}
                          onChange={(e) => this.onChangeRating(e)}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
            <Modal
              isOpen={this.state.commentModalIsOpen}
              onRequestClose={this.state.closeModal}
              style={this.customStyles}
              appElement={document.getElementById('app')}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Comment Section</h5>
                    <button
                      onClick={this.closeCommentModal}
                      type="button"
                      className="close"
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
                    {this.state.marks[this.state.currentRestaurant] &&
                      this.state.marks[this.state.currentRestaurant].comments &&
                      this.state.marks[
                        this.state.currentRestaurant
                      ].comments.map((comment, i) => {
                        return (
                          <div className="media" key={i}>
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-person-fill"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                              ></path>
                            </svg>
                            <div className="media-body">
                              <h6 className="mt-0">{comment.username}</h6>
                              {comment.commentBody}
                            </div>
                          </div>
                        )
                      })}
                  </div>
                  <div className="modal-body">
                    <form onSubmit={(e) => this.onSubmitComment(e)}>
                      <div className="form-group">
                        <textarea
                          type="text"
                          className="form-control"
                          id="commentBody"
                          name="commentBody"
                          placeholder="Your opinion"
                          value={this.state.currentComment.commentBody}
                          onChange={(e) => this.onChangeComment(e)}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      onClick={this.closeCommentModal}
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
          {this.state.marks
            .filter((mark) =>
              this.state.filterRating
                ? Math.floor(mark.rating) == this.state.filterRating
                : true,
            )
            .map((mark, index) => {
              return (
                <div className="media text-muted pt-3" key={index}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                  >
                    <path
                      d="M16.2 26.69l5.66-5.66L7.83 7c-3.12 3.12-3.12 8.19 0 11.31l8.37 8.38zm13.57-3.63c3.05 1.43 7.36.42 10.54-2.76 3.83-3.83 4.56-9.3 1.63-12.23C39 5.14 33.52 5.87 29.7 9.7c-3.18 3.18-4.18 7.49-2.76 10.54-4.45 4.44-19.53 19.52-19.53 19.52l2.83 2.83L24 28.83l13.76 13.76 2.83-2.83L26.83 26l2.94-2.94z"
                      fill="#111"
                    />
                  </svg>
                  <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <strong className="d-block text-gray-dark">
                      {mark.name}
                    </strong>
                    <p>{mark.description}</p>
                    Latitude: {mark.lat}
                    <span> </span>
                    Longitude: {mark.lng}
                    <span> </span>
                    Rating: {mark.rating}
                    <span> </span>
                    <br></br>
                    Adresse: {mark.adresse}
                    <span> </span>
                    <button
                      onClick={() => {
                        this.openCommentModal()
                        this.setCurrentRestaurant(index)
                      }}
                      type="button"
                      className="btn btn-outline-primary"
                    >
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-chat-left-dots-fill"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}
