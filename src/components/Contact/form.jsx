import { useRef, useState } from "react";
import {
  Upload,
  ArrowUpRight,
  Check,
  Mail,
  RefreshCw,
  MapPin,
  Phone,
} from "lucide-react";

import { FaInstagram } from "react-icons/fa";


const API_BASE_URL = "https://api.southcult.com/api";

const SUBMISSION_API = `${API_BASE_URL}/submissions`;
const SEND_OTP_API = `${API_BASE_URL}/otp/send`;
const VERIFY_OTP_API = `${API_BASE_URL}/otp/verify`;

// -----------------------------------------
// CONSTANTS
// -----------------------------------------
const MAX_FILE_SIZE = 500 * 1024 * 1024;

const ALLOWED_EXTENSIONS = [
  "wav",
  "mp3",
  "mp4",
  "mov",
  "pdf",
  "docx",
];

const ALLOWED_MIME_TYPES = [
  "audio/wav",
  "audio/x-wav",
  "audio/wave",
  "audio/mpeg",
  "video/mp4",
  "video/quicktime",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ALLOWED_CATEGORIES = [
  "Music",
  "Film",
  "Documentary",
  "Script",
  "Visual Art",
];

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  city: "",
  category: "Music",
  title: "",
  about: "",
  portfolio: "",
  file: null,
};

// -----------------------------------------
// COMPONENT
// -----------------------------------------
export default function WorkSubmission() {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(INITIAL_FORM);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpMessage, setOtpMessage] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [verificationToken, setVerificationToken] = useState("");
  // -----------------------------------------
  // HANDLE INPUT CHANGE
  // -----------------------------------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    const newValue = files
      ? files[0] || null
      : value;

    // If email changes after OTP was verified,
    // OTP verification becomes invalid.
    if (name === "email") {
      setOtpSent(false);
      setOtpVerified(false);
      setOtp("");
      setOtpError("");
      setOtpMessage("");
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setMessage("");
    setError("");
  };

  // -----------------------------------------
  // VALIDATE FORM
  // -----------------------------------------
  const validateForm = () => {
    const newErrors = {};

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const city = form.city.trim();
    const title = form.title.trim();
    const about = form.about.trim();
    const portfolio = form.portfolio.trim();

    // NAME
    if (!name) {
      newErrors.name = "Please enter your full name.";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (name.length > 100) {
      newErrors.name =
        "Name must be less than 100 characters.";
    }

    // EMAIL
    if (!email) {
      newErrors.email =
        "Please enter your email address.";
    } else if (email.length > 255) {
      newErrors.email =
        "Email address is too long.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    // PHONE
    if (!phone) {
      newErrors.phone =
        "Please enter your phone number.";
    } else {
      const digitsOnly = phone.replace(/\D/g, "");

      if (
        digitsOnly.length < 7 ||
        digitsOnly.length > 15
      ) {
        newErrors.phone =
          "Please enter a valid phone number.";
      } else if (!/^[+()\d\s-]+$/.test(phone)) {
        newErrors.phone =
          "Phone number contains invalid characters.";
      }
    }

    // CITY
    if (city.length > 100) {
      newErrors.city =
        "City / State must be less than 100 characters.";
    }

    // CATEGORY
    if (!ALLOWED_CATEGORIES.includes(form.category)) {
      newErrors.category =
        "Please select a valid category.";
    }

    // PROJECT TITLE
    if (title && title.length < 2) {
      newErrors.title =
        "Project title must be at least 2 characters.";
    } else if (title.length > 200) {
      newErrors.title =
        "Project title must be less than 200 characters.";
    }

    // ABOUT
    if (about && about.length < 20) {
      newErrors.about =
        "Please tell us a little more about your work.";
    } else if (about.length > 2000) {
      newErrors.about =
        "Description must be less than 2,000 characters.";
    }

    // PORTFOLIO
    if (portfolio) {
      try {
        const url = new URL(portfolio);

        if (
          !["http:", "https:"].includes(url.protocol)
        ) {
          newErrors.portfolio =
            "Please enter a valid HTTP or HTTPS URL.";
        }
      } catch {
        newErrors.portfolio =
          "Please enter a valid portfolio URL.";
      }
    }

    // FILE
    if (!form.file) {
      newErrors.file =
        "Please upload your work.";
    } else {
      const file = form.file;

      const extension = file.name
        .split(".")
        .pop()
        ?.toLowerCase();

      if (
        !extension ||
        !ALLOWED_EXTENSIONS.includes(extension)
      ) {
        newErrors.file =
          "Unsupported file type. Please upload WAV, MP3, MP4, MOV, PDF or DOCX.";
      }

      if (
        file.type &&
        !ALLOWED_MIME_TYPES.includes(file.type)
      ) {
        newErrors.file =
          "This file type is not supported.";
      }

      if (file.size === 0) {
        newErrors.file =
          "The selected file is empty.";
      }

      if (file.size > MAX_FILE_SIZE) {
        newErrors.file =
          "File size must be less than 500 MB.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // -----------------------------------------
  // SEND OTP
  // -----------------------------------------
  const handleSendOTP = async () => {
    setOtpError("");
    setOtpMessage("");
    setError("");
    setMessage("");

    // Validate entire form first
    if (!validateForm()) {
      return;
    }

    const email = form.email.trim();

    setIsSendingOTP(true);

    try {
      const response = await fetch(SEND_OTP_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const contentType =
        response.headers.get("content-type") || "";

      let data = {};

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        data = {
          message: text,
        };
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
          "Unable to send OTP. Please try again."
        );
      }

      setOtpSent(true);
      setOtpVerified(false);
      setOtp("");

      setOtpMessage(
        data?.message ||
        `OTP has been sent to ${email}.`
      );
    } catch (err) {
      console.error("OTP send error:", err);

      setOtpError(
        err?.message ||
        "Unable to send OTP. Please try again."
      );
    } finally {
      setIsSendingOTP(false);
    }
  };

  // -----------------------------------------
  // VERIFY OTP
  // -----------------------------------------
  const handleVerifyOTP = async () => {
    setOtpError("");
    setOtpMessage("");

    if (!otp.trim()) {
      setOtpError("Please enter the OTP.");
      return;
    }

    if (!/^\d{6}$/.test(otp.trim())) {
      setOtpError("Please enter the 6-digit OTP.");
      return;
    }

    setIsVerifyingOTP(true);

    try {
      const response = await fetch(VERIFY_OTP_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim(),
          otp: otp.trim(),
        }),
      });

      const contentType =
        response.headers.get("content-type") || "";

      let data = {};

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = {
          message: text,
        };
      }

      if (!response.ok) {
        throw new Error(
          data?.message || "Invalid or expired OTP."
        );
      }

      // IMPORTANT
      if (!data?.verificationToken) {
        throw new Error(
          "Verification succeeded, but no verification token was returned."
        );
      }

      // Store token returned by backend
      setVerificationToken(data.verificationToken);

      setOtpVerified(true);
      setOtpError("");

      setOtpMessage(
        data?.message || "Email verified successfully."
      );

      console.log(
        "✅ Verification token received"
      );
    } catch (err) {
      console.error(
        "OTP verification error:",
        err
      );

      setOtpVerified(false);
      setVerificationToken("");

      setOtpError(
        err?.message ||
        "Invalid or expired OTP."
      );
    } finally {
      setIsVerifyingOTP(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // -----------------------------------------
    // EMAIL VERIFICATION
    // -----------------------------------------
    if (!otpVerified) {
      setError("Please verify your email before submitting.");
      return;
    }

    if (!verificationToken) {
      setError("A valid email verification token is required.");
      return;
    }

    // -----------------------------------------
    // VALIDATE FORM
    // -----------------------------------------
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // -----------------------------------------
      // GET FORM VALUES
      // -----------------------------------------
      const name = String(form.name || "").trim();
      const email = String(form.email || "").trim();
      const phone = String(form.phone || "").trim();
      const city = String(form.city || "").trim();
      const category = String(form.category || "").trim();
      const title = String(form.title || "").trim();
      const about = String(form.about || "").trim();
      const portfolio = String(form.portfolio || "").trim();

      // -----------------------------------------
      // CREATE FORMDATA
      // -----------------------------------------
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("city", city);
      formData.append("category", category);
      formData.append("title", title);
      formData.append("about", about);
      formData.append("portfolio", portfolio);

      // -----------------------------------------
      // EMAIL VERIFICATION TOKEN
      // -----------------------------------------
      formData.append(
        "verificationToken",
        verificationToken
      );

      // -----------------------------------------
      // FILE
      // -----------------------------------------
      if (form.file) {
        formData.append("file", form.file);
      }

      // -----------------------------------------
      // DEBUG
      // -----------------------------------------
      console.log("================================");
      console.log("Submitting form...");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Phone:", phone);
      console.log("City:", city);
      console.log("Category:", category);
      console.log("Title:", title);
      console.log("About:", about);
      console.log("Portfolio:", portfolio);
      console.log("OTP verified:", otpVerified);
      console.log(
        "Verification token:",
        verificationToken
      );
      console.log(
        "Verification token length:",
        verificationToken.length
      );
      console.log(
        "File:",
        form.file ? form.file.name : "No file"
      );
      console.log("================================");

      // -----------------------------------------
      // SEND SUBMISSION
      // -----------------------------------------
      const response = await fetch(
        SUBMISSION_API,
        {
          method: "POST",
          body: formData,
        }
      );

      // -----------------------------------------
      // READ RESPONSE
      // -----------------------------------------
      const contentType =
        response.headers.get("content-type") || "";

      let data = {};

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        data = {
          message: text,
        };
      }

      // -----------------------------------------
      // HANDLE ERROR
      // -----------------------------------------
      if (!response.ok) {
        throw new Error(
          data?.message ||
          "Unable to submit your work."
        );
      }

      // -----------------------------------------
      // SUCCESS
      // -----------------------------------------
      console.log(
        "✅ Submission successful:",
        data
      );

      setMessage(
        data?.message ||
        "Your submission has been received successfully."
      );

      setError("");

      // -----------------------------------------
      // RESET OTP
      // -----------------------------------------
      setOtp("");
      setOtpSent(false);
      setOtpVerified(false);
      setVerificationToken("");

      // -----------------------------------------
      // RESET FORM
      // -----------------------------------------
      setForm(INITIAL_FORM);

      // -----------------------------------------
      // RESET FILE INPUT
      // -----------------------------------------
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (err) {
      console.error(
        "Submission error:",
        err
      );

      setError(
        err?.message ||
        "Unable to submit your work. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  // -----------------------------------------
  // INPUT CLASS
  // -----------------------------------------
  const inputClass = (field) =>
    `w-full bg-transparent border rounded-xl px-4 py-4 outline-none transition ${errors[field]
      ? "border-red-500/60 focus:border-red-500"
      : "border-white/15 focus:border-white"
    }`;

  // -----------------------------------------
  // RENDER
  // -----------------------------------------
  return (
    <>
      <section className="bg-[#050505] text-white px-6 py-24">
        <div className="max-w-4xl mx-auto">

          {/* HEADER */}
          <p className="text-sm tracking-[0.3em] uppercase text-white/40">
            Open Submissions
          </p>

          <h2 className="font-clash text-5xl mt-4">
            Submit Your Work
          </h2>

          <p className="text-white/60 mt-4 mb-12">
            Music, films, documentaries, scripts and
            visual stories. We review every original
            submission.
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6"
          >

            {/* NAME + EMAIL */}
            <div className="grid md:grid-cols-2 gap-5">

              {/* NAME */}
              <div>
                <input
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass("name")}
                  maxLength={100}
                  autoComplete="name"
                  required
                />

                {errors.name && (
                  <p className="text-red-400 text-xs mt-2">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass("email")}
                  maxLength={255}
                  autoComplete="email"
                  required
                  disabled={otpVerified}
                />

                {errors.email && (
                  <p className="text-red-400 text-xs mt-2">
                    {errors.email}
                  </p>
                )}

                {/* VERIFIED */}
                {otpVerified && (
                  <div className="flex items-center gap-2 mt-2 text-green-400 text-xs">
                    <Check size={14} />
                    Email verified
                  </div>
                )}
              </div>
            </div>

            {/* PHONE + CITY */}
            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass("phone")}
                  maxLength={30}
                  autoComplete="tel"
                  required
                />

                {errors.phone && (
                  <p className="text-red-400 text-xs mt-2">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <input
                  name="city"
                  placeholder="City / State"
                  value={form.city}
                  onChange={handleChange}
                  className={inputClass("city")}
                  maxLength={100}
                />

                {errors.city && (
                  <p className="text-red-400 text-xs mt-2">
                    {errors.city}
                  </p>
                )}
              </div>
            </div>

            {/* CATEGORY */}
            <div>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={`${inputClass(
                  "category"
                )} appearance-none bg-[#050505] text-white cursor-pointer`}
                required
              >
                <option
                  value="Music"
                  className="bg-[#050505]"
                >
                  Music
                </option>

                <option
                  value="Film"
                  className="bg-[#050505]"
                >
                  Film
                </option>

                <option
                  value="Documentary"
                  className="bg-[#050505]"
                >
                  Documentary
                </option>

                <option
                  value="Script"
                  className="bg-[#050505]"
                >
                  Script
                </option>

                <option
                  value="Visual Art"
                  className="bg-[#050505]"
                >
                  Visual Art
                </option>
              </select>

              {errors.category && (
                <p className="text-red-400 text-xs mt-2">
                  {errors.category}
                </p>
              )}
            </div>

            {/* PROJECT TITLE */}
            <div>
              <input
                name="title"
                placeholder="Project Title"
                value={form.title}
                onChange={handleChange}
                className={inputClass("title")}
                maxLength={200}
              />

              {errors.title && (
                <p className="text-red-400 text-xs mt-2">
                  {errors.title}
                </p>
              )}
            </div>

            {/* ABOUT */}
            <div>
              <textarea
                name="about"
                rows={6}
                placeholder="Tell us about your work..."
                value={form.about}
                onChange={handleChange}
                className={`${inputClass(
                  "about"
                )} resize-none`}
                maxLength={2000}
              />

              <div className="flex justify-between mt-2">

                {errors.about ? (
                  <p className="text-red-400 text-xs">
                    {errors.about}
                  </p>
                ) : (
                  <span />
                )}

                <span className="text-xs text-white/30">
                  {form.about.length}/2000
                </span>

              </div>
            </div>

            {/* PORTFOLIO */}
            <div>
              <input
                name="portfolio"
                type="url"
                placeholder="Portfolio / Google Drive / Vimeo Link"
                value={form.portfolio}
                onChange={handleChange}
                className={inputClass("portfolio")}
                maxLength={500}
              />

              {errors.portfolio && (
                <p className="text-red-400 text-xs mt-2">
                  {errors.portfolio}
                </p>
              )}
            </div>

            {/* FILE UPLOAD */}
            <div>

              <label
                className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition ${errors.file
                  ? "border-red-500/60"
                  : "border-white/15 hover:border-white/40"
                  }`}
              >
                <Upload
                  size={34}
                  className="mb-3 text-white/70"
                />

                <p className="font-medium">
                  Upload Your Work
                </p>

                <span className="text-sm text-white/45 mt-1 text-center">
                  WAV · MP3 · MP4 · MOV · PDF · DOCX
                </span>

                <span className="text-xs text-white/30 mt-2">
                  Maximum file size: 500 MB
                </span>

                <input
                  ref={fileInputRef}
                  type="file"
                  name="file"
                  accept=".wav,.mp3,.mp4,.mov,.pdf,.docx"
                  onChange={handleChange}
                  className="hidden"
                />

                {form.file && (
                  <p className="mt-4 text-sm text-white/70 text-center break-all">
                    {form.file.name}
                  </p>
                )}
              </label>

              {errors.file && (
                <p className="text-red-400 text-xs mt-2">
                  {errors.file}
                </p>
              )}
            </div>

            {/* ---------------------------------
              OTP SECTION
          ---------------------------------- */}
            {!otpVerified && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-4">

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail size={18} />
                  </div>

                  <div>
                    <p className="font-medium">
                      Verify your email
                    </p>

                    <p className="text-xs text-white/40 mt-1">
                      We will send a verification code
                      before your work is submitted.
                    </p>
                  </div>
                </div>

                {/* SEND OTP */}
                {!otpSent && (
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={isSendingOTP}
                    className="w-full rounded-xl border border-white/20 py-3 flex items-center justify-center gap-2 hover:bg-white hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSendingOTP ? (
                      <>
                        <RefreshCw
                          size={16}
                          className="animate-spin"
                        />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        <Mail size={16} />
                        Verify Email & Continue
                      </>
                    )}
                  </button>
                )}

                {/* OTP INPUT */}
                {otpSent && (
                  <div className="space-y-4">

                    <div>
                      <label className="block text-xs text-white/50 mb-2">
                        Enter OTP
                      </label>

                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={8}
                        placeholder="Enter verification code"
                        value={otp}
                        onChange={(e) => {
                          const value =
                            e.target.value.replace(
                              /\D/g,
                              ""
                            );

                          setOtp(value);
                          setOtpError("");
                        }}
                        className={`w-full bg-transparent border rounded-xl px-4 py-4 outline-none tracking-[0.4em] text-center text-lg ${otpError
                          ? "border-red-500/60"
                          : "border-white/15 focus:border-white"
                          }`}
                      />

                      {otpError && (
                        <p className="text-red-400 text-xs mt-2">
                          {otpError}
                        </p>
                      )}
                    </div>

                    {/* OTP MESSAGE */}
                    {otpMessage && (
                      <p className="text-green-400 text-xs">
                        {otpMessage}
                      </p>
                    )}

                    {/* VERIFY */}
                    <button
                      type="button"
                      onClick={handleVerifyOTP}
                      disabled={
                        isVerifyingOTP ||
                        otp.length < 4
                      }
                      className="w-full bg-white text-black rounded-xl py-3 flex items-center justify-center gap-2 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isVerifyingOTP ? (
                        <>
                          <RefreshCw
                            size={16}
                            className="animate-spin"
                          />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Check size={16} />
                          Verify OTP
                        </>
                      )}
                    </button>

                    {/* RESEND */}
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      disabled={isSendingOTP}
                      className="w-full text-xs text-white/50 hover:text-white transition"
                    >
                      {isSendingOTP
                        ? "Sending..."
                        : "Didn't receive the code? Resend OTP"}
                    </button>

                  </div>
                )}
              </div>
            )}

            {/* VERIFIED MESSAGE */}
            {otpVerified && (
              <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check
                    size={16}
                    className="text-green-400"
                  />
                </div>

                <div>
                  <p className="text-sm text-green-400 font-medium">
                    Email verified successfully
                  </p>

                  <p className="text-xs text-green-400/60 mt-1">
                    You can now submit your work.
                  </p>
                </div>
              </div>
            )}

            {/* SUCCESS */}
            {message && (
              <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                {message}
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !otpVerified
              }
              className="w-full bg-white text-black rounded-full py-4 flex items-center justify-center gap-2 font-medium hover:gap-3 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Uploading..."
                : "Submit Work"}

              {!isSubmitting && (
                <ArrowUpRight size={18} />
              )}
            </button>

            <p className="text-center text-xs text-white/35">
              We usually respond within 2–3 days.
            </p>

          </form>
        </div>
      </section>



      {/* CONTACT & ENQUIRY */}
      <section className="relative overflow-hidden bg-[#050505] px-5 py-16 text-white sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">

          {/* Section Header */}
          <div className="mb-10 flex flex-col justify-between gap-5 md:mb-12 md:flex-row md:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-white/60" />
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                  Get in Touch
                </p>
              </div>

              <h2 className="font-clash text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Let's start a <span className="text-white/40">conversation.</span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-white/45 md:pb-1">
              Have an event, collaboration, or creative idea in mind?
              We'd love to hear from you.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* ADDRESS */}
            <div className="group relative flex min-h-[270px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 sm:p-7 lg:p-8">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                  <MapPin size={21} />
                </div>

                <span className="text-xs tracking-widest text-white/25">
                  01
                </span>
              </div>

              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Find Us
                </p>

                <h3 className="mt-2 font-clash text-2xl">
                  Our Address
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/50">
                  R.S. Puram, Coimbatore,
                  <br />
                  Tamil Nadu, India
                </p>
              </div>

              <div className="mt-auto pt-6">
                <a
                  href="https://maps.app.goo.gl/G2P3okStsoc4q3hk8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  Get Directions
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </div>
            </div>

            {/* ENQUIRIES */}
            <div className="group relative flex min-h-[270px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 sm:p-7 lg:p-8">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                  <Phone size={21} />
                </div>

                <span className="text-xs tracking-widest text-white/25">
                  02
                </span>
              </div>

              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Let's Talk
                </p>

                <h3 className="mt-2 font-clash text-2xl">
                  General Enquiries
                </h3>

                <a
                  href="tel:+917904775772"
                  className="mt-4 inline-block text-xl font-medium tracking-tight transition-colors hover:text-white/60 lg:text-2xl"
                >
                  +91 7904775772
                </a>

                <p className="mt-2 text-sm leading-6 text-white/45">
                  Events, partnerships &amp; collaborations.
                </p>
              </div>

              <div className="mt-auto pt-6">
                <a
                  href="tel:+917904775772"
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  Call Us
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </div>
            </div>

            {/* INSTAGRAM */}
            <div className="group relative flex min-h-[270px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 sm:p-7 lg:p-8">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                  <FaInstagram size={21} />
                </div>

                <span className="text-xs tracking-widest text-white/25">
                  03
                </span>
              </div>

              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Follow Along
                </p>

                <h3 className="mt-2 font-clash text-2xl">
                  Join Our Community
                </h3>

                <a
                  href="https://www.instagram.com/south_cult_music"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-xl font-medium transition-colors hover:text-white/60"
                >
                  @southcult
                </a>

                <p className="mt-2 text-sm leading-6 text-white/45">
                  Discover our events, performances &amp; latest updates.
                </p>
              </div>

              <div className="mt-auto pt-6">
                <a
                  href="https://www.instagram.com/south_cult_music"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow SouthCult on Instagram"
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  Follow Us
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

    </>
  );
}