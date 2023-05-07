import styles from "./header.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { eventsData } from "../../eventsData";
import { headerTags } from "../../headerTags";

export default function Header({
  onSearch,
  setSelectedEventType,
  selectedEvents,
  setFilters,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const inputRef = useRef(null);

  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFilterButtonClick = () => {
    setShowPopup(!showPopup);
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filtered = eventsData.filter((event) =>
      event.eventTitle.toLowerCase().includes(searchQuery)
    );
    onSearch(filtered);
  };

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [name]: checked,
      };
      let filteredEvents = eventsData;
      const locationFilters = Object.entries(newFilters).filter(
        ([filterName, filterValue]) => filterValue
      );
      if (locationFilters.length > 0) {
        filteredEvents = filteredEvents.filter((event) =>
          locationFilters.some(([filterName]) => {
            const locationName =
              filterName.charAt(0).toUpperCase() +
              filterName.slice(1).replace(/([A-Z])/g, " $1");
            return event.eventLocation === locationName;
          })
        );
      }
      onSearch(filteredEvents);
      return newFilters;
    });
  };

  const labelVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <header className={styles.header}>
        <Image
          priority={true}
          src="/Exclude.png"
          alt="logo"
          width={63}
          height={63}
          className={styles.header__logo}
        />
        <h1 className={styles.header__title}>ETKİNLİKLER</h1>
        <div className={styles.header__tags}>
          {headerTags.map((tag) => {
            return (
              <p
                onClick={() => {
                  if (tag.name === "Tüm Etkinlikler") {
                    setSelectedEventType(null);
                  } else {
                    setSelectedEventType(tag.name);
                  }
                }}
                key={tag.id}
                className={styles.header__tags__item}
              >
                {tag.name}
              </p>
            );
          })}
        </div>
        <div className={styles.header__searchBox}>
          <Image
            onClick={handleImageClick}
            src="/search.png"
            alt="search"
            width={24}
            height={24}
          />
          <input
            ref={inputRef}
            className={styles.header__searchBox__input}
            type="text"
            placeholder="Etkinlik Ara"
            aria-label="Etkinlik Ara"
            onChange={handleSearch}
          />
        </div>
      </header>
      <div className={styles.filterAndCalender__bgColor}></div>
      <div className={styles.filterAndCalender}>
        <button
          onClick={handleFilterButtonClick}
          className={styles.filterAndCalender__filterBtn}
        >
          <Image src="/filter.png" alt="filter" width={10} height={18} />
          <span className={styles.filterAndCalender__filterBtn__span}>
            Filtreler
          </span>
        </button>
        <button
          onClick={handleCalendarClick}
          className={styles.filterAndCalender__calenderBtn}
        >
          <Image src="/calender.png" alt="calender" width={22} height={22} />
          <span className={styles.filterAndCalender__calenderBtn__span}>
            Takvimde Gör
          </span>
        </button>

        {showCalendar && (
          <div className={styles.filterAndCalender__calendarPopup}>
            <button
              onClick={() => setShowCalendar(false)}
              className={styles.filterAndCalender__calendarPopup__closeButton}
            >
              X
            </button>
            <h3>Seçilen Etkinlikler</h3>
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event) => (
                <div
                  className={styles.filterAndCalender__calenderPopup__inner}
                  key={event.id}
                >
                  <Image
                    src={`/${event.eventImage}`}
                    alt="eventImage"
                    width={308}
                    height={172}
                  />
                  <p>{event.eventDate}</p>
                  <p>{event.eventTitle}</p>
                  <p>{event.eventLocation}</p>
                </div>
              ))
            ) : (
              <p className={styles.filterAndCalender__eventNotSelected}>
                Henüz bir etkinlik seçilmedi.
              </p>
            )}
          </div>
        )}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={styles.filterAndCalender__popup}
            >
              <h2
                className={styles.filterAndCalender__popup__eventLocationTitle}
              >
                Etkinlik Mekanı
              </h2>
              <motion.div
                className={styles.filterAndCalender__popup__inputs}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                initial="hidden"
                animate="visible"
              >
                <motion.label variants={labelVariants}>
                  <input
                    type="checkbox"
                    name="maximumUniqHall"
                    id="maximumUniqHall"
                    onChange={handleFilterChange}
                  />
                  Maximum Uniq Hall
                </motion.label>

                <motion.label variants={labelVariants}>
                  <input
                    type="checkbox"
                    name="maximumUniqBox"
                    id="maximumUniqBox"
                    onChange={handleFilterChange}
                  />
                  Maximum Uniq Box
                </motion.label>

                <motion.label variants={labelVariants}>
                  <input
                    type="checkbox"
                    name="maximumUniqLounge"
                    id="maximumUniqLounge"
                    onChange={handleFilterChange}
                  />
                  Maximum Uniq Lounge
                </motion.label>

                <motion.label variants={labelVariants}>
                  <input
                    type="checkbox"
                    name="maximumUniqAcikHava"
                    id="maximumUniqAcikHava"
                    onChange={handleFilterChange}
                  />
                  Maximum Uniq Açıkhava
                </motion.label>

                <motion.label
                  variants={labelVariants}
                  className={styles.filterAndCalender__bahceFuaye}
                >
                  <input
                    type="checkbox"
                    name="bahceFuaye"
                    id="bahceFuaye"
                    onChange={handleFilterChange}
                  />
                  Bahçe Fuaye
                </motion.label>
              </motion.div>
              <h2 className={styles.filterAndCalender__popup__eventDateTitle}>
                Etkinlik Tarihi
              </h2>
              <motion.div
                className={styles.filterAndCalender__popup__dateInputs}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                initial="hidden"
                animate="visible"
              >
                <motion.label
                  transition={{ delay: 0.5 }}
                  variants={labelVariants}
                >
                  <input
                    type="checkbox"
                    name="guncelEtkinlikler"
                    id="guncelEtkinlikler"
                  />
                  Güncel Etkinlikler
                </motion.label>

                <motion.label
                  transition={{ delay: 0.6 }}
                  variants={labelVariants}
                  className={styles.filterAndCalender__pastEvents}
                >
                  <input
                    type="checkbox"
                    name="gecmisEtkinlikler"
                    id="gecmisEtkinlikler"
                  />
                  Geçmiş Etkinlikler
                </motion.label>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
