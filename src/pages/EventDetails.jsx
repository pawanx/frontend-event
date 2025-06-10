import Header from "../components/Header";
import useFetch from "../useFetch";
import { useParams } from "react-router-dom";
import { FaClock, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
const EventDetails = () => {
  const { eventId } = useParams();
  const { data, loading, error } = useFetch(
    `https://backend-events-swart.vercel.app/events/${eventId}`
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error occured: {error.message}</p>;
  if (!data) return <p>No Event found.</p>;
  const event = data.Event;
  return (
    <>
      <Header />
      <div className="container py-4 bg-light">
        <div className="row">
          <div className="col-md-8">
            <h2>{event.name}</h2>
            <div>
              Hosted by: <br />
              <strong>{event.hostedBy}</strong>
            </div>
            <img
              src={event.imgUrl}
              style={{ height: "400px", width: "600px" }}
              className="mt-5"
            />
            <h3 className="py-3 mt-3">Details:</h3>
            <p>{event.details}</p>
            <h3>Additional Information:</h3>
            <p>
              <strong>Dress Code: </strong>
              {event.dressCode}
            </p>
            <p>
              <strong>Age Restriction: </strong>
              {event.ageRestriction} and above
            </p>
            <h3>Event Tags:</h3>
            {event.eventTags.map((tag) => (
              <span className="badge text-bg-danger py-2 me-2">{tag} </span>
            ))}
          </div>

          <div className="col-md-4">
            <div>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center py-2">
                    <FaClock size={20} className="me-2" />
                    <div>
                      {event.date} at {event.time}
                    </div>
                  </div>

                  <div className="d-flex align-items-center py-2">
                    <FaMapMarkerAlt className="me-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="d-flex align-items-center py-2">
                    <FaMoneyBillWave className="me-2" />
                    <span>₹ {event.price}</span>
                  </div>
                </div>
              </div>

              <div className="py-4">
                <h3 className="py-3">Speakers: ({event.speakers.length})</h3>

                <div className="row">
                  {event.speakers.map((speaker) => (
                    <div className="col-md-6">
                      <div className="card py-2">
                        <img
                          src={speaker.imageUrl}
                          alt={speaker.name}
                          className="card-img-top rounded-circle mx-auto"
                          style={{ height: "100px", width: "100px" }}
                        />
                        <div className="card-body">
                          <p className="card-text text-center">
                            <strong>{speaker.name}</strong>
                          </p>
                          <p className="card-text text-center">
                            {speaker.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <button className="btn btn-danger w-50">RSVP</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
