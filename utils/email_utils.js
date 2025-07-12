// Get welcome email template
exports.getWelcomeEmailTemplate = (name) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
      <h2 style="color: #333;">Welcome to Our Platform!</h2>
      <p>Hello ${name},</p>
      <p>Thank you for joining our platform. We're excited to have you on board!</p>
      <p>With your new account, you can:</p>
      <ul>
        <li>Browse and book our products</li>
        <li>Manage your bookings</li>
        <li>Read and comment on our blog posts</li>
      </ul>
      <p>If you have any questions, feel free to contact our support team.</p>
      <p>Best regards,<br>The Team</p>
    </div>
  `;
};

// Get booking confirmation email template
exports.getBookingConfirmationTemplate = (bookingDetails) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
      <h2 style="color: #333;">Booking Confirmation</h2>
      <p>Thank you for your booking!</p>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <p><strong>Booking ID:</strong> #${bookingDetails.bookingId}</p>
        <p><strong>Product:</strong> ${bookingDetails.productName}</p>
        <p><strong>Date:</strong> ${bookingDetails.bookingDate}</p>
        <p><strong>Price:</strong> $${bookingDetails.price.toFixed(2)}</p>
      </div>
      <p>You can view your booking details in your account dashboard.</p>
      <p>Best regards,<br>The Team</p>
    </div>
  `;
};