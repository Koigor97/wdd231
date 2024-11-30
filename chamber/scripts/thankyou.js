document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const fields = {
    fname: params.get("fname") || "Not Provided",
    lname: params.get("lname") || "Not Provided",
    email: params.get("email") || "Not Provided",
    phone: params.get("phone") || "Not Provided",
    "org-name": params.get("company-name") || "Not Provided",
    membership: params.get("membership") || "Not Provided",
    timestamp: new Date().toLocaleString(),
  };

  Object.keys(fields).forEach((key) => {
    const element = document.getElementById(key);
    if (element) element.textContent = fields[key];
  });
});
