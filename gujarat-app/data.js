// ==========================================
// data.js - State, District, AC, and Taluka Data Store
// ==========================================

const GujaratData = {
  metadata: {
    title: "State Map",
    subtitle: "182 ACs, 33 Districts & 248 Talukas",
    year: 2027
  },
  
  // Placeholder structure for dropdowns and layers matching app logic
  districts: [
    { name: "Ahmedabad", acs: [], talukas: [] },
    { name: "Banaskantha", acs: ["11. Vadgam [Banaskantha]"], talukas: ["Palanpur"] },
    { name: "Surat", acs: [], talukas: [] },
    { name: "Vadodara", acs: [], talukas: [] }
  ]
};

console.log("Gujarat 2027 Data Loaded Successfully.");
