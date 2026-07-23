// Get these three values from https://dashboard.emailjs.com after setup.
//
// EMAILJS_SERVICE_ID  - Email Services tab
// EMAILJS_TEMPLATE_ID - Email Templates tab
// EMAILJS_PUBLIC_KEY  - Account -> General tab

export const EMAILJS_SERVICE_ID: string = "service_7gpwf8a";
export const EMAILJS_TEMPLATE_ID: string = "template_c75l7ae";
export const EMAILJS_PUBLIC_KEY: string = "N_zGFHurDlh8Ge822";

export const isEmailjsConfigured =
  EMAILJS_SERVICE_ID !== "REPLACE_WITH_SERVICE_ID" &&
  EMAILJS_TEMPLATE_ID !== "REPLACE_WITH_TEMPLATE_ID" &&
  EMAILJS_PUBLIC_KEY !== "REPLACE_WITH_PUBLIC_KEY";