
const express = require('express');
const Booking = require('../models/Booking');
const adminAuth = require('../middleware/adminAuth');
const { sendBookingTicket } = require('../utils/emailService');

const router = express.Router();

// Create a new booking

router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    // Booking response turant bhejo
    res.status(201).json({
      message: 'Booking created successfully!',
      booking,
    });

    // Email background mein bhejne ki koshish karo
    sendBookingTicket(booking)
      .then(() => {
        console.log('Booking ticket email sent successfully.');
      })
      .catch((emailError) => {
        console.error(
          'Booking saved, but ticket email failed:',
          emailError.message
        );
      });
  } catch (error) {
    if (!res.headersSent) {
      res.status(400).json({
        message: 'Failed to create booking',
        error: error.message,
      });
    }
  }
});


// Get all bookings (Admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch bookings',
      error: error.message,
    });
  }
});


 // Update booking status (Admin only)
router.patch('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['Pending', 'Confirmed', 'Cancelled'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid booking status.',
      });
    }

    const oldBooking = await Booking.findById(req.params.id);

    if (!oldBooking) {
      return res.status(404).json({
        message: 'Booking not found.',
      });
    }

    const previousStatus = oldBooking.status;

    oldBooking.status = status;
    await oldBooking.save();

    
if (
  status !== previousStatus &&
  (status === 'Confirmed' || status === 'Cancelled')
) {
  try {
    await sendBookingTicket(oldBooking);
    console.log(`Booking ${status.toLowerCase()} email sent successfully.`);
  } catch (emailError) {
    console.error(
      `Booking updated, but ${status.toLowerCase()} email failed:`,
      emailError.message
    );
  }
}


    res.json({
      message: 'Booking status updated successfully!',
      booking: oldBooking,
    });
  } catch (error) {
    const isInvalidId = error.name === 'CastError';

    res.status(isInvalidId ? 400 : 500).json({
      message: isInvalidId
        ? 'Invalid booking ID.'
        : 'Failed to update booking status.',
    });
  }
});


module.exports = router;

