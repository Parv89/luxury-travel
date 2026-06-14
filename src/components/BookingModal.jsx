import React, { useState } from "react";
import { CreditCard, Check, X, Calendar, Users, ShieldCheck } from "lucide-react";
import { bookingData } from "../data/travelData";

export const BookingModal = ({ isOpen, onClose, selectedItem }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const initialState = {
    fullName: "",
    email: "",
    phone: "",
    travelers: "1",
    checkIn: "",
    checkOut: "",
    specialRequests: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    cardName: "",
  };

  const [bookingForm, setBookingForm] = useState(initialState);
  const [error, setError] = useState("");

  if (!isOpen || !selectedItem) return null;

  // ================= SAFE UPDATE =================
  const handleInputChange = (name, value) => {
    setError("");
    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= VALIDATION =================
  const validateStep = () => {
    if (step === 1) {
      return bookingForm.fullName.trim() && bookingForm.email.trim() && bookingForm.phone.trim();
    }
    if (step === 2) {
      return bookingForm.checkIn && bookingForm.checkOut && bookingForm.travelers;
    }
    if (step === 3) {
      return bookingForm.cardName.trim() && bookingForm.cardNumber.trim() && bookingForm.cardExpiry && bookingForm.cardCVV;
    }
    return true;
  };

  // ================= NEXT STEP =================
  const handleNextStep = () => {
    if (!validateStep()) {
      setError("Please fill all required fields before proceeding.");
      return;
    }
    setError("");
    setStep((prev) => Math.min(prev + 1, 3));
  };

  // ================= BACK STEP =================
  const handlePreviousStep = () => {
    setError("");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // ================= RESET & CLOSE =================
  const handleClose = () => {
    setStep(1);
    setBookingForm(initialState);
    setError("");
    setIsConfirmed(false);
    onClose();
  };

  // ================= SUBMIT =================
  const handleSubmitBooking = (e) => {
    e.preventDefault();
    if (!validateStep()) {
      setError("Please complete your payment details.");
      return;
    }

    setIsSubmitting(true);
    
    // Luxury custom animation delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
      
      // Auto close after success
      setTimeout(() => {
        handleClose();
      }, 3000);
    }, 2000);
  };

  // ================= PRICE CALCULATIONS =================
  const travelersCount = parseInt(bookingForm.travelers || "1", 10);
  const totalPrice = selectedItem.price * travelersCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-300">
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SUCCESS STATE */}
        {isConfirmed ? (
          <div className="p-12 text-center flex flex-col items-center justify-center my-auto space-y-4">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2 animate-bounce">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: '"Playfair Display", serif' }}>
              Booking Confirmed! 🎉
            </h3>
            <p className="text-gray-600 max-w-md">
              Thank you for choosing luxury. A premium itinerary and digital tickets have been sent to <span className="font-semibold text-amber-700">{bookingForm.email}</span>.
            </p>
          </div>
        ) : (
          <>
            {/* ================= HEADER ================= */}
            <div className="p-6 sm:p-8 border-b border-gray-100 bg-gradient-to-r from-amber-50/50 to-transparent">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: '"Playfair Display", serif' }}>
                Book Your Luxury Experience
              </h2>
              <p className="text-amber-700 font-medium text-sm mt-1 flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
                Selected: {selectedItem.name} (${selectedItem.price.toLocaleString()} / person)
              </p>
            </div>

            {/* ================= STEP PROGRESS BAR ================= */}
            <div className="px-8 pt-6">
              <div className="flex items-center justify-between max-w-md mx-auto">
                {[1, 2, 3].map((stepNum) => (
                  <div key={stepNum} className="flex items-center flex-1 last:flex-none">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                      step >= stepNum ? "bg-amber-600 text-white shadow-lg shadow-amber-600/20" : "bg-gray-100 text-gray-400"
                    }`}>
                      {step > stepNum ? <Check className="w-4 h-4 stroke-[3]" /> : stepNum}
                    </div>
                    {stepNum < 3 && (
                      <div className={`flex-1 h-0.5 mx-3 transition-all duration-500 ${
                        step > stepNum ? "bg-amber-600" : "bg-gray-100"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between max-w-md mx-auto text-[11px] font-medium text-gray-400 uppercase tracking-wider mt-2 px-1">
                <span className={step === 1 ? "text-amber-700 font-bold" : ""}>Personal</span>
                <span className={step === 2 ? "text-amber-700 font-bold" : ""}>Details</span>
                <span className={step === 3 ? "text-amber-700 font-bold" : ""}>Payment</span>
              </div>
            </div>

            {/* ERROR ALERT */}
            {error && (
              <div className="mx-8 mt-4 p-3 bg-rose-50 border border-rose-100 text-rose-700 text-sm rounded-xl">
                {error}
              </div>
            )}

            {/* ================= MODAL BODY / FORM ================= */}
            <div className="p-8 overflow-y-auto flex-1">
              
              {/* STEP 1: PERSONAL INFO */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="border-l-2 border-amber-500 pl-3 mb-2">
                    <h3 className="font-semibold text-gray-900">Personal Information</h3>
                    <p className="text-xs text-gray-500">Please enter your contact details</p>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Full Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
                      placeholder="John Doe"
                      value={bookingForm.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Email Address *</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
                        placeholder="john@example.com"
                        value={bookingForm.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
                        placeholder="+91 XXXXX XXXXX"
                        value={bookingForm.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleNextStep}
                    className="w-full bg-gray-900 hover:bg-amber-600 text-white font-medium rounded-xl py-3.5 mt-4 transition-all duration-300 shadow-lg shadow-gray-900/10"
                  >
                    Continue to Details
                  </button>
                </div>
              )}

              {/* STEP 2: BOOKING DETAILS */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="border-l-2 border-amber-500 pl-3 mb-2">
                    <h3 className="font-semibold text-gray-900">Booking Details</h3>
                    <p className="text-xs text-gray-500">Specify tour dates and members</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-gray-400" /> Check-In Date *
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm text-gray-700"
                        value={bookingForm.checkIn}
                        onChange={(e) => handleInputChange("checkIn", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-gray-400" /> Check-Out Date *
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm text-gray-700"
                        value={bookingForm.checkOut}
                        onChange={(e) => handleInputChange("checkOut", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 flex items-center">
                      <Users className="w-3.5 h-3.5 mr-1 text-gray-400" /> Number of Travelers *
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm bg-white text-gray-700"
value={bookingForm.travelers}
onChange={(e) => handleInputChange("travelers", e.target.value)}
>
  {bookingData.travelers.map((t) => (
    <option key={t} value={t}>
      {t} Traveler{t > 1 ? "s" : ""}
    </option>
  ))}
</select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Special Luxury Requests (Optional)</label>
                    <textarea
                      rows="3"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm resize-none"
                      placeholder="Dietary requirements, airport pickup, room upgrades..."
                      value={bookingForm.specialRequests}
                      onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                    />
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button
                      onClick={handlePreviousStep}
                      className="w-1/3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-xl py-3.5 transition-all duration-200"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="w-2/3 bg-gray-900 hover:bg-amber-600 text-white font-medium rounded-xl py-3.5 transition-all duration-300 shadow-lg shadow-gray-900/10"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: PAYMENT METHOD */}
              {step === 3 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  
                  {/* PRICING CARD BREAKDOWN */}
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100/40 p-5 rounded-2xl border border-amber-100/60 text-sm">
                    <h4 className="font-bold text-gray-800 mb-3 uppercase tracking-wider text-xs">Fare Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-600">
                        <span>Base Package Rate ({travelersCount} x Package)</span>
                        <span>${(selectedItem.price).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Total Travelers</span>
                        <span className="font-semibold text-gray-800">{travelersCount}</span>
                      </div>
                      <div className="border-t border-amber-200/60 mt-3 pt-3 flex justify-between font-bold text-base text-gray-900">
                        <span>Grand Total</span>
                        <span className="text-amber-700 text-lg">${totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-2 border-amber-500 pl-3">
                    <h3 className="font-semibold text-gray-900">Secure Checkout</h3>
                    <p className="text-xs text-gray-500">Your payment data is fully encrypted</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Name on Card *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
                        placeholder="John Doe"
                        value={bookingForm.cardName}
                        onChange={(e) => handleInputChange("cardName", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Card Number *</label>
                      <div className="relative">
                        <input
                          type="text"
                          maxLength="19"
                          className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
                          placeholder="XXXX XXXX XXXX XXXX"
                          value={bookingForm.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        />
                        <CreditCard className="w-4 h-4 text-gray-400 absolute left-4 top-4" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Expiry Date *</label>
                        <input
                          type="text"
                          maxLength="5"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
                          placeholder="MM/YY"
                          value={bookingForm.cardExpiry}
                          onChange={(e) => handleInputChange("cardExpiry", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">CVV Security Code *</label>
                        <input
                          type="password"
                          maxLength="3"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
                          placeholder="•••"
                          value={bookingForm.cardCVV}
                          onChange={(e) => handleInputChange("cardCVV", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* SUBMIT BUTTONS */}
                  <div className="flex gap-4 pt-2">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handlePreviousStep}
                      className="w-1/3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-xl py-3.5 transition-all duration-200 disabled:opacity-50"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleSubmitBooking}
                      className="w-2/3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-xl py-3.5 transition-all duration-300 shadow-lg shadow-amber-600/20 flex items-center justify-center space-x-2 disabled:opacity-80"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <ShieldCheck className="w-5 h-5" />
                          <span>Pay & Confirm ${totalPrice.toLocaleString()}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
};