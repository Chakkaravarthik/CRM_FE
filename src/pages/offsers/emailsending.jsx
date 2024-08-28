import React, { useState, useEffect } from 'react';
import { fetchEvents, sendEmail } from '../../apis/auth'; // Adjust the import path if needed

const EmailSender = () => {
  const [emailSubject, setEmailSubject] = useState('');
  const [emailText, setEmailText] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    getEvents();
  }, []);

  const handleSendEmail = async () => {
    if (!emailSubject || !emailText || !selectedEvent) {
      setMessage('Please fill out all fields and select an event.');
      return;
    }

    try {
      const response = await sendEmail({
        subject: emailSubject,
        text: emailText,
        events: selectedEvent, // Send selectedEvent as an array
      });

      if (response.code === 1) {
        setMessage('Emails sent successfully!');
        setEmailSubject('')
        setEmailText('')
        setEvents([])
      } else {
        setMessage('Failed to send emails.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setMessage('Error sending email.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-warning mb-4">Send Bulk Email</h2>
      <div className="mb-3">
        <label htmlFor="emailSubject" className="form-label">Email Subject:</label>
        <input
          type="text"
          className="form-control"
          id="emailSubject"
          value={emailSubject}
          onChange={(e) => setEmailSubject(e.target.value)}
          placeholder="Enter email subject"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="emailText" className="form-label">Email Text:</label>
        <textarea
          className="form-control"
          id="emailText"
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          placeholder="Enter email text"
          rows="4"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="events" className="form-label">Select Customer Group</label>
        <select
          className="form-select"
          id="events"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
        >
          <option value="">Choose Customer Group</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>
              {event.OfferzoneName}
            </option>
          ))}
        </select>
      </div>
      <button
        className="btn btn-warning w-100"
        onClick={handleSendEmail}
      >
        Send Email
      </button>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
};

export default EmailSender;
