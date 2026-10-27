function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[char];
  });
}

async function sendBookingTicket(booking) {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is missing in Render Environment.');
  }

  if (!booking.email) {
    throw new Error('Customer email address is missing.');
  }

  const name = escapeHtml(booking.name || 'Valued Guest');
  const destination = escapeHtml(
    booking.destination || 'Your Destination'
  );
  const travelDate = escapeHtml(
    booking.travelDate || 'Not specified'
  );
  const guests = escapeHtml(booking.guests ?? 'Not specified');
  const status = escapeHtml(booking.status || 'Pending');
  const bookingId = escapeHtml(booking._id || 'N/A');

  const html = `
  <!DOCTYPE html>
  <html>
  <body style="margin:0;background:#f4f6f2;font-family:Arial,sans-serif;color:#173d30;">
    <div style="max-width:620px;margin:30px auto;background:#ffffff;border-radius:14px;overflow:hidden;">
      <div style="background:#123b2e;padding:32px 24px;text-align:center;">
        <h1 style="margin:0;color:#d4af37;font-size:27px;">LUXURY TRAVEL</h1>
        <p style="margin:10px 0 0;color:#ffffff;">Your journey begins with us</p>
      </div>

      <div style="padding:30px 25px;">
        <h2 style="color:#173d30;">Booking Confirmation</h2>
        <p>Hello ${name},</p>
        <p>Thank you for choosing Luxury Travel Agency. Your booking has been received successfully.</p>

        <div style="border:1px solid #e4d6a3;border-radius:10px;padding:20px;margin:24px 0;">
          <p><strong>Booking ID:</strong> ${bookingId}</p>
          <p><strong>Destination:</strong> ${destination}</p>
          <p><strong>Travel Date:</strong> ${travelDate}</p>
          <p><strong>Guests:</strong> ${guests}</p>
          <p><strong>Status:</strong>
            <span style="color:#a17b14;font-weight:bold;">${status}</span>
          </p>
        </div>

        <p>We look forward to making your journey memorable.</p>
        <p style="margin-top:28px;">Warm regards,<br>
        <strong style="color:#173d30;">Luxury Travel Agency</strong></p>
      </div>

      <div style="background:#123b2e;padding:16px;text-align:center;color:#e4d6a3;font-size:12px;">
        Thank you for travelling with us.
      </div>
    </div>
  </body>
  </html>`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Luxury Travel <onboarding@resend.dev>',
      to: [booking.email],
      subject: `Your Travel Booking Confirmation - ${booking.destination || 'Luxury Travel'}`,
      text: `Hello ${booking.name || 'Valued Guest'},

Your booking has been received.

Booking ID: ${booking._id || 'N/A'}
Destination: ${booking.destination || 'Not specified'}
Travel Date: ${booking.travelDate || 'Not specified'}
Guests: ${booking.guests ?? 'Not specified'}
Status: ${booking.status || 'Pending'}

Thank you for choosing Luxury Travel Agency.`,
      html,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      `Resend email failed (${response.status}): ${result.message || JSON.stringify(result)}`
    );
  }

  console.log('Booking email sent successfully:', result.id);
  return result;
}

module.exports = { sendBookingTicket };




