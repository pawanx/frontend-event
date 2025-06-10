import { Link } from "react-router-dom";
import useFetch from "../useFetch";
import { useState } from "react";
import Header from "./Header";

const Body = () => {
  const { data, loading, error } = useFetch(
    "https://backend-events-swart.vercel.app/events"
  );
  const [filterType, setFilterType] = useState("Both");
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSubmittedQuery(searchQuery);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error occured: {error.message}</p>;
  if (!data) return <p>No Event found.</p>;

  const filteredEvents = data.Events.filter((event) => {
    const matchesType =
      filterType === "Both" ? true : event.eventType === filterType;

    const query = submittedQuery.toLowerCase();
    const matchesSearch =
      event.name.toLowerCase().includes(query) ||
      event.eventTags.some((tag) => tag.toLowerCase().includes(query));

    return matchesType && matchesSearch;
  });
  return (
    <>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchSubmit={handleSearchSubmit}
      />

      <div className="bg-light">
        <div className="container d-flex justify-content-between align-items-center mt-3">
          <h2>Meetup Events</h2>
          <select
            name="eventType"
            id="eventType"
            className="form-select w-25"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="Both">Both</option>
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
          </select>
        </div>

        <div className="container">
          <div className="row mt-4">
            {filteredEvents.map((event) => (
              <div className="col-md-4" key={event._id}>
                <Link
                  to={`/events/${event.id}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="card mb-3">
                    <div className="position-relative">
                      <img
                        src={event.imgUrl}
                        className="card-img-top"
                        alt={event.name}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <span className="badge position-absolute top-0 start-0 m-2 badge text-bg-light py-2">
                        {event.eventType}
                      </span>
                    </div>
                    <small className="ms-3">
                      {event.date} &#183; {event.time}
                    </small>
                    <div className="card-body">
                      <div className="card-title">
                        <h5>{event.name}</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
