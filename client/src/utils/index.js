// utils/index.js

// Format timestamps in history screen
export const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  
  // Create unique file name for PDF downloads
  export const generatePDFName = (deficiency, userEmail) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const namePart = userEmail.split("@")[0];
    return `NutriScan_Report_${deficiency}_${namePart}_${timestamp}.pdf`;
  };
  
  // Basic email validator
  export const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  