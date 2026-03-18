/**
 * src/pages/public/FranchiseSuccessPage.jsx
 * Success page shown after franchise application submission
 */

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";

export default function FranchiseSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [referenceId, setReferenceId] = useState(null);

  useEffect(() => {
    // Get reference ID from navigation state or localStorage
    const refId =
      location.state?.referenceId || localStorage.getItem("franchiseRefId");
    setReferenceId(refId);
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/10 to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-accent"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-heading font-bold text-primary mb-3">
          Application Submitted!
        </h1>

        {/* Message */}
        <p className="text-text/70 mb-8">
          Thank you for your interest in becoming a Saveetha Amravati University
          franchise partner. Your application has been received successfully.
        </p>

        {/* Reference ID Card */}
        {referenceId && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
            <p className="text-sm text-text/60 mb-2">
              Application Reference ID
            </p>
            <p className="text-2xl font-mono font-bold text-primary break-all">
              {referenceId}
            </p>
            <p className="text-xs text-text/50 mt-2">
              Save this number to track your application status
            </p>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-heading font-semibold text-primary mb-3">
            What Happens Next?
          </h3>
          <ol className="space-y-2 text-sm text-text/70">
            <li className="flex gap-3">
              <span className="font-bold text-accent flex-shrink-0">1.</span>
              <span>
                Our partnership team will review your application within 5-7
                business days
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-accent flex-shrink-0">2.</span>
              <span>
                We'll contact you via phone/email to discuss next steps
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-accent flex-shrink-0">3.</span>
              <span>Schedule an introductory call with our franchise team</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-accent flex-shrink-0">4.</span>
              <span>
                Finalize terms and get started on your franchise journey
              </span>
            </li>
          </ol>
        </div>

        {/* Contact Info */}
        <div className="mb-8">
          <p className="text-sm text-text/60 mb-3">
            Have questions? Get in touch:
          </p>
          <a
            href="mailto:franchise@saveethaamaravatiuniversity.ac.in"
            className="block text-accent hover:text-accent/80 font-medium text-sm mb-2"
          >
            📧 franchise@saveethaamaravatiuniversity.ac.in
          </a>
          <a
            href="tel:+918062182405"
            className="block text-accent hover:text-accent/80 font-medium text-sm"
          >
            📞 +91 8062182405
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
          <Button
            type="button"
            variant="accent"
            onClick={() => navigate("/about")}
          >
            Learn More About SAU
          </Button>
        </div>
      </div>
    </div>
  );
}
