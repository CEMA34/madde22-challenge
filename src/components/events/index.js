import styles from "./events.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Events({
  eventsData,
  selectedEventType,
  selectedEvents,
  setSelectedEvents,
  filters,
}) {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showMore, setShowMore] = useState([]);

  /*  console.log(filteredEvents); */

  useEffect(() => {
    if (selectedEventType) {
      const filtered = eventsData.filter(
        (event) =>
          event.eventType.toLowerCase() === selectedEventType.toLowerCase()
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(eventsData);
    }
  }, [selectedEventType, eventsData]);

  const handleAddToCalendar = (event) => {
    if (selectedEvents.includes(event)) {
      setSelectedEvents(selectedEvents.filter((item) => item !== event));
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  useEffect(() => {
    let filtered = eventsData;

    // Filter the events based on the selected event type
    if (selectedEventType) {
      filtered = filtered.filter(
        (event) =>
          event.eventType.toLowerCase() === selectedEventType.toLowerCase()
      );
    }

    // Filter the events based on the selected filters
    const locationFilters = Object.entries(filters).filter(
      ([filterName, filterValue]) => filterValue
    );
    if (locationFilters.length > 0) {
      filtered = filtered.filter((event) =>
        locationFilters.some(([filterName]) => {
          const locationName =
            filterName.charAt(0).toUpperCase() +
            filterName.slice(1).replace(/([A-Z])/g, " $1");
          return event.eventLocation === locationName;
        })
      );
    }
    setFilteredEvents(filtered);
  }, [selectedEventType, eventsData, filters]);

  const getEventTypeClass = (eventType) => {
    switch (eventType) {
      case "Tiyatro":
        return styles.tiyatro;
      case "Çocuk":
        return styles.cocuk;
      case "Stand up":
        return styles["stand-up"];
      case "Sinema":
        return styles.sinema;
      case "Konser":
        return styles.konser;
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      {filteredEvents.map((event) => {
        const paragraphs = event.eventDescription.split("\n");
        const eventTypeClass = getEventTypeClass(event.eventType);
        return (
          <main
            key={event.id}
            className={`${styles.events} ${
              selectedEvents.includes(event) ? styles.boxShadow : ""
            }`}
          >
            <div className={styles.events__frame}>
              <div className={styles.events__frame__bgColor}></div>
              <p className={styles.events__frame__date}>
                {event.eventDate.split(" ").map((part, index) => (
                  <span key={index}>{part}</span>
                ))}
              </p>
              <p className={`${eventTypeClass} ${styles.events__frame__type}`}>
                {event.eventType}
              </p>
              <Image
                priority={true}
                className={styles.events__frame__image}
                src={`/${event.eventImage}`}
                alt={"eventImage"}
                width={308}
                height={172}
              />
            </div>
            <div className={styles.events__information}>
              <h2
                className={`${styles.events__information__title} ${
                  selectedEvents.includes(event) ? styles.titleSelected : ""
                }`}
              >
                {event.eventTitle}
              </h2>
              <div className={styles.events__information__location}>
                <Image
                  src="/Location.png"
                  alt="location"
                  width={10}
                  height={14}
                />
                <p>{event.eventLocation}</p>
              </div>

              {paragraphs.map((paragraph, index) => (
                <p
                  className={styles.events__information__description}
                  key={index}
                >
                  {showMore[event.id] && showMore[event.id].includes(index)
                    ? paragraph
                    : `${paragraph.substring(0, 90)}...`}
                  <span
                    onClick={() =>
                      setShowMore((prevState) => ({
                        ...prevState,
                        [event.id]: prevState[event.id]
                          ? prevState[event.id].includes(index)
                            ? prevState[event.id].filter((i) => i !== index)
                            : [...prevState[event.id], index]
                          : [index],
                      }))
                    }
                    className={styles.events__information__description__more}
                  >
                    {showMore[event.id] && showMore[event.id].includes(index)
                      ? " Daha Az Göster"
                      : " Detaylı Bilgi"}
                  </span>
                </p>
              ))}
            </div>
            <div className={styles.events__buttons}>
              <button className={styles.events__buttons__buyTicketBtn}>
                Bilet Al
              </button>
              <div className={styles.events__buttonsInner}>
                <button
                  onClick={() => handleAddToCalendar(event)}
                  className={styles.events__buttonsInner__add}
                >
                  <Image
                    src={
                      selectedEvents.includes(event) ? "/added.png" : "/add.png"
                    }
                    alt="add"
                    width={22}
                    height={22}
                  />
                  <p className={styles.events__buttonsInner__addToCalendar}>
                    {selectedEvents.includes(event)
                      ? "Takvime Eklendi"
                      : "Takvime Ekle"}
                  </p>
                </button>
              </div>
            </div>
          </main>
        );
      })}
    </div>
  );
}
