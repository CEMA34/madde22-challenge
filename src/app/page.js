"use client";
import Header from "../components/header";
import Events from "../components/events";
import { useState } from "react";
import { eventsData } from "../eventsData";

export default function Home() {
  const [filteredSearchData, setFilteredSearchData] = useState(eventsData);
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [filters, setFilters] = useState({
    maximumUniqHall: false,
    maximumUniqBox: false,
    maximumUniqLounge: false,
    maximumUniqAcikHava: false,
    bahceFuaye: false,
  });

  return (
    <>
      <Header
        onSearch={setFilteredSearchData}
        selectedEventType={selectedEventType}
        setSelectedEventType={setSelectedEventType}
        selectedEvents={selectedEvents}
        filters={filters}
        setFilters={setFilters}
      />
      <Events
        eventsData={filteredSearchData}
        selectedEventType={selectedEventType}
        selectedEvents={selectedEvents}
        setSelectedEvents={setSelectedEvents}
        filters={filters}
      />
    </>
  );
}
