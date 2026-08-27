// =================================================================
// GUJARAT CAMPAIGN DASHBOARD - MAIN APP ENGINE (ALL 34 DISTRICTS)
// =================================================================

const GujaratFullData = [
  // 1. Kachchh
  { district: "Kachchh", distCoords: [69.8597, 23.2420], assembly: "1 - Abdasa", acCoords: [68.83, 23.24], talukas: ["Abdasa", "Lakhpat", "Nakhatrana"] },
  { district: "Kachchh", distCoords: [69.8597, 23.2420], assembly: "2 - Mandvi", acCoords: [69.35, 22.83], talukas: ["Mandvi", "Mundra"] },
  { district: "Kachchh", distCoords: [69.8597, 23.2420], assembly: "3 - Bhuj", acCoords: [69.67, 23.25], talukas: ["Bhuj"] },
  { district: "Kachchh", distCoords: [69.8597, 23.2420], assembly: "4 - Anjar", acCoords: [70.02, 23.03], talukas: ["Anjar"] },
  { district: "Kachchh", distCoords: [69.8597, 23.2420], assembly: "5 - Gandhidham", acCoords: [70.13, 23.08], talukas: ["Gandhidham"] },
  { district: "Kachchh", distCoords: [69.8597, 23.2420], assembly: "6 - Rapar", acCoords: [70.35, 23.56], talukas: ["Rapar", "Bhachau"] },

  // 2. Banaskantha
  { district: "Banaskantha", distCoords: [72.18, 24.17], assembly: "7 - Vav", acCoords: [71.35, 23.96], talukas: ["Vav", "Suigam"] },
  { district: "Banaskantha", distCoords: [72.18, 24.17], assembly: "8 - Tharad", acCoords: [71.63, 24.40], talukas: ["Tharad"] },
  { district: "Banaskantha", distCoords: [72.18, 24.17], assembly: "9 - Dhanera", acCoords: [72.01, 24.51], talukas: ["Dhanera"] },
  { district: "Banaskantha", distCoords: [72.18, 24.17], assembly: "10 - Danta", acCoords: [72.72, 24.22], talukas: ["Danta", "Amirgadh"] },
  { district: "Banaskantha", distCoords: [72.18, 24.17], assembly: "11 - Vadgam", acCoords: [72.53, 23.83], talukas: ["Vadgam"] },
  { district: "Banaskantha", distCoords: [72.18, 24.17], assembly: "12 - Palanpur", acCoords: [72.43, 24.17], talukas: ["Palanpur"] },
  { district: "Banaskantha", distCoords: [72.18, 24.17], assembly: "13 - Deesa", acCoords: [72.18, 24.25], talukas: ["Deesa"] },
  { district: "Banaskantha", distCoords: [72.18, 24.17], assembly: "14 - Deodar", acCoords: [71.74, 24.10], talukas: ["Deodar", "Bhabhar"] },
  { district: "Banaskantha", distCoords: [72.18, 24.17], assembly: "15 - Kankrej", acCoords: [71.76, 23.75], talukas: ["Kankrej"] },

  // 3. Patan
  { district: "Patan", distCoords: [71.85, 23.85], assembly: "16 - Radhanpur", acCoords: [71.60, 23.83], talukas: ["Radhanpur", "Santalpur", "Sami"] },
  { district: "Patan", distCoords: [71.85, 23.85], assembly: "17 - Chanasma", acCoords: [72.11, 23.71], talukas: ["Chanasma", "Harij", "Sankheshwar"] },
  { district: "Patan", distCoords: [71.85, 23.85], assembly: "18 - Patan", acCoords: [72.12, 23.85], talukas: ["Patan", "Saraswati"] },
  { district: "Patan", distCoords: [71.85, 23.85], assembly: "19 - Sidhpur", acCoords: [72.38, 23.91], talukas: ["Sidhpur"] },

  // 4. Mehsana
  { district: "Mehsana", distCoords: [72.38, 23.58], assembly: "20 - Kheralu", acCoords: [72.62, 23.88], talukas: ["Kheralu", "Satlasana"] },
  { district: "Mehsana", distCoords: [72.38, 23.58], assembly: "21 - Unjha", acCoords: [72.39, 23.80], talukas: ["Unjha"] },
  { district: "Mehsana", distCoords: [72.38, 23.58], assembly: "22 - Visnagar", acCoords: [72.55, 23.70], talukas: ["Visnagar"] },
  { district: "Mehsana", distCoords: [72.38, 23.58], assembly: "23 - Becharaji", acCoords: [72.08, 23.49], talukas: ["Bechraji"] },
  { district: "Mehsana", distCoords: [72.38, 23.58], assembly: "24 - Kadi", acCoords: [72.33, 23.30], talukas: ["Kadi"] },
  { district: "Mehsana", distCoords: [72.38, 23.58], assembly: "25 - Mehsana", acCoords: [72.38, 23.59], talukas: ["Mehsana"] },
  { district: "Mehsana", distCoords: [72.38, 23.58], assembly: "26 - Vijapur", acCoords: [72.75, 23.56], talukas: ["Vijapur"] },

  // 5. Sabarkantha
  { district: "Sabarkantha", distCoords: [73.30, 23.60], assembly: "27 - Himatnagar", acCoords: [72.96, 23.60], talukas: ["Himatnagar"] },
  { district: "Sabarkantha", distCoords: [73.30, 23.60], assembly: "28 - Idar", acCoords: [73.04, 23.83], talukas: ["Idar"] },
  { district: "Sabarkantha", distCoords: [73.30, 23.60], assembly: "29 - Khedbrahma", acCoords: [73.10, 24.02], talukas: ["Khedbrahma", "Poshina", "Vijaynagar"] },
  { district: "Sabarkantha", distCoords: [73.30, 23.60], assembly: "30 - Bhiloda", acCoords: [73.39, 23.75], talukas: ["Bhiloda"] },
  { district: "Sabarkantha", distCoords: [73.30, 23.60], assembly: "31 - Modasa", acCoords: [73.30, 23.47], talukas: ["Modasa"] },
  { district: "Sabarkantha", distCoords: [73.30, 23.60], assembly: "32 - Bayad", acCoords: [73.20, 23.21], talukas: ["Bayad", "Malpur"] },
  { district: "Sabarkantha", distCoords: [73.30, 23.60], assembly: "33 - Prantij", acCoords: [72.88, 23.43], talukas: ["Prantij", "Talod"] },

  // 6. Aravalli
  { district: "Aravalli", distCoords: [73.35, 23.52], assembly: "31 - Modasa", acCoords: [73.30, 23.47], talukas: ["Modasa", "Dhansura"] },
  { district: "Aravalli", distCoords: [73.35, 23.52], assembly: "32 - Bayad", acCoords: [73.20, 23.21], talukas: ["Bayad", "Malpur"] },

  // 7. Gandhinagar
  { district: "Gandhinagar", distCoords: [72.68, 23.22], assembly: "34 - Dahegam", acCoords: [72.81, 23.17], talukas: ["Dahegam"] },
  { district: "Gandhinagar", distCoords: [72.68, 23.22], assembly: "35 - Gandhinagar South", acCoords: [72.68, 23.15], talukas: ["Gandhinagar"] },
  { district: "Gandhinagar", distCoords: [72.68, 23.22], assembly: "36 - Gandhinagar North", acCoords: [72.63, 23.21], talukas: ["Gandhinagar"] },
  { district: "Gandhinagar", distCoords: [72.68, 23.22], assembly: "37 - Mansa", acCoords: [72.65, 23.43], talukas: ["Mansa"] },
  { district: "Gandhinagar", distCoords: [72.68, 23.22], assembly: "38 - Kalol", acCoords: [72.52, 23.23], talukas: ["Kalol"] },

  // 8. Ahmedabad
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "39 - Viramgam", acCoords: [72.04, 23.12], talukas: ["Viramgam", "Mandal", "Detroj-Rampura"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "40 - Sanand", acCoords: [72.38, 22.98], talukas: ["Sanand", "Bavla"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "41 - Ghatlodia", acCoords: [72.54, 23.05], talukas: ["Ahmedabad City"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "42 - Vejalpur", acCoords: [72.51, 22.99], talukas: ["Ahmedabad City"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "43 - Vatva", acCoords: [72.63, 22.98], talukas: ["Ahmedabad City"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "44 - Ellisbridge", acCoords: [72.55, 23.02], talukas: ["Ahmedabad City"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "45 - Naranpura", acCoords: [72.55, 23.06], talukas: ["Ahmedabad City"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "46 - Nikol", acCoords: [72.67, 23.06], talukas: ["Ahmedabad City"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "47 - Naroda", acCoords: [72.67, 23.08], talukas: ["Ahmedabad City"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "48 - Thakkarbapa Nagar", acCoords: [72.63, 23.06], talukas: ["Ahmedabad City"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "49 - Bapunagar", acCoords: [72.62, 23.03], talukas: ["Ahmedabad City"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "50 - Amraiwadi", acCoords: [72.63, 23.01], talukas: ["Ahmedabad City"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "51 - Dariapur", acCoords: [72.58, 23.03], talukas: ["Ahmedabad City"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "52 - Jamalpur-Khadia", acCoords: [72.57, 23.01], talukas: ["Ahmedabad City"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "53 - Maninagar", acCoords: [72.60, 22.99], talukas: ["Ahmedabad City"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "54 - Danilimda", acCoords: [72.58, 22.97], talukas: ["Ahmedabad City"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "55 - Sabarmati", acCoords: [72.58, 23.09], talukas: ["Ahmedabad City"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "56 - Asarwa", acCoords: [72.60, 23.05], talukas: ["Ahmedabad City"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "57 - Daskroi", acCoords: [72.66, 22.95], talukas: ["Daskroi"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "58 - Dholka", acCoords: [72.43, 22.72], talukas: ["Dholka", "Bavla"] },
  { district: "Ahmedabad", distCoords: [72.57, 23.02], assembly: "59 - Dhandhuka", acCoords: [71.99, 22.37], talukas: ["Dhandhuka", "Dholera"] },

  // 9. Surendranagar
  { district: "Surendranagar", distCoords: [71.65, 22.72], assembly: "60 - Dasada", acCoords: [71.43, 23.36], talukas: ["Dasada", "Lakhtar"] },
  { district: "Surendranagar", distCoords: [71.65, 22.72], assembly: "61 - Limbdi", acCoords: [71.81, 22.56], talukas: ["Limbdi", "Chuda", "Sayla"] },
  { district: "Surendranagar", distCoords: [71.65, 22.72], assembly: "62 - Wadhwan", acCoords: [71.70, 22.72], talukas: ["Wadhwan"] },
  { district: "Surendranagar", distCoords: [71.65, 22.72], assembly: "63 - Chotila", acCoords: [71.20, 22.42], talukas: ["Chotila", "Muli", "Thangadh"] },
  { district: "Surendranagar", distCoords: [71.65, 22.72], assembly: "64 - Dhrangadhra", acCoords: [71.47, 22.98], talukas: ["Dhrangadhra", "Halvad"] },

  // 10. Morbi
  { district: "Morbi", distCoords: [70.83, 22.82], assembly: "65 - Morbi", acCoords: [70.83, 22.82], talukas: ["Morbi", "Malia"] },
  { district: "Morbi", distCoords: [70.83, 22.82], assembly: "66 - Tankara", acCoords: [70.74, 22.68], talukas: ["Tankara", "Lathi"] },
  { district: "Morbi", distCoords: [70.83, 22.82], assembly: "67 - Wankaner", acCoords: [70.93, 22.62], talukas: ["Wankaner"] },

  // 11. Rajkot
  { district: "Rajkot", distCoords: [70.80, 22.30], assembly: "68 - Rajkot East", acCoords: [70.80, 22.30], talukas: ["Rajkot"] },
  { district: "Rajkot", distCoords: [70.80, 22.30], assembly: "69 - Rajkot West", acCoords: [70.78, 22.30], talukas: ["Rajkot"] },
  { district: "Rajkot", distCoords: [70.80, 22.30], assembly: "70 - Rajkot South", acCoords: [70.81, 22.27], talukas: ["Rajkot"] },
  { district: "Rajkot", distCoords: [70.80, 22.30], assembly: "71 - Rajkot Rural", acCoords: [70.72, 22.25], talukas: ["Rajkot", "Kotda Sangani", "Lodhika"] },
  { district: "Rajkot", distCoords: [70.80, 22.30], assembly: "72 - Jasdan", acCoords: [71.20, 22.03], talukas: ["Jasdan", "Vinchhiya"] },
  { district: "Rajkot", distCoords: [70.80, 22.30], assembly: "73 - Gondal", acCoords: [70.79, 21.96], talukas: ["Gondal"] },
  { district: "Rajkot", distCoords: [70.80, 22.30], assembly: "74 - Jetpur", acCoords: [70.62, 21.76], talukas: ["Jetpur", "Jamkandorna"] },
  { district: "Rajkot", distCoords: [70.80, 22.30], assembly: "75 - Dhoraji", acCoords: [70.45, 21.73], talukas: ["Dhoraji", "Upleta"] },

  // 12. Jamnagar
  { district: "Jamnagar", distCoords: [70.07, 22.47], assembly: "76 - Kalavad", acCoords: [70.36, 22.22], talukas: ["Kalavad"] },
  { district: "Jamnagar", distCoords: [70.07, 22.47], assembly: "77 - Jamnagar Rural", acCoords: [70.05, 22.40], talukas: ["Jamnagar", "Dhrol", "Jodiya"] },
  { district: "Jamnagar", distCoords: [70.07, 22.47], assembly: "78 - Jamnagar North", acCoords: [70.07, 22.47], talukas: ["Jamnagar"] },
  { district: "Jamnagar", distCoords: [70.07, 22.47], assembly: "79 - Jamnagar South", acCoords: [70.06, 22.45], talukas: ["Jamnagar"] },
  { district: "Jamnagar", distCoords: [70.07, 22.47], assembly: "80 - Jamjodhpur", acCoords: [69.91, 21.90], talukas: ["Jamjodhpur"] },

  // 13. Devbhumi Dwarka
  { district: "Devbhumi Dwarka", distCoords: [69.80, 22.24], assembly: "81 - Khambhalia", acCoords: [69.78, 22.20], talukas: ["Khambhalia", "Okhamandal"] },
  { district: "Devbhumi Dwarka", distCoords: [69.80, 22.24], assembly: "82 - Dwarka", acCoords: [69.08, 22.24], talukas: ["Dwarka", "Kalyanpur"] },

  // 14. Porbandar
  { district: "Porbandar", distCoords: [69.60, 21.64], assembly: "83 - Porbandar", acCoords: [69.60, 21.64], talukas: ["Porbandar", "Ranavav"] },
  { district: "Porbandar", distCoords: [69.60, 21.64], assembly: "84 - Kutiyana", acCoords: [69.90, 21.62], talukas: ["Kutiyana"] },

  // 15. Junagadh
  { district: "Junagadh", distCoords: [70.45, 21.52], assembly: "85 - Manavadar", acCoords: [70.14, 21.49], talukas: ["Manavadar", "Vanthali"] },
  { district: "Junagadh", distCoords: [70.45, 21.52], assembly: "86 - Junagadh", acCoords: [70.45, 21.52], talukas: ["Junagadh"] },
  { district: "Junagadh", distCoords: [70.45, 21.52], assembly: "87 - Visavadar", acCoords: [70.68, 21.37], talukas: ["Visavadar", "Bhesan"] },
  { district: "Junagadh", distCoords: [70.45, 21.52], assembly: "88 - Keshod", acCoords: [70.25, 21.31], talukas: ["Keshod", "Mangrol", "Malia Hatina"] },

  // 16. Gir Somnath
  { district: "Gir Somnath", distCoords: [70.38, 20.91], assembly: "89 - Somnath", acCoords: [70.40, 20.90], talukas: ["Veraval", "Patan-Veraval"] },
  { district: "Gir Somnath", distCoords: [70.38, 20.91], assembly: "90 - Talala", acCoords: [70.52, 21.03], talukas: ["Talala"] },
  { district: "Gir Somnath", distCoords: [70.38, 20.91], assembly: "91 - Kodinar", acCoords: [70.70, 20.79], talukas: ["Kodinar"] },
  { district: "Gir Somnath", distCoords: [70.38, 20.91], assembly: "92 - Una", acCoords: [71.03, 20.82], talukas: ["Una", "Gir Gadhada"] },

  // 17. Amreli
  { district: "Amreli", distCoords: [71.22, 21.60], assembly: "93 - Dhari", acCoords: [71.02, 21.32], talukas: ["Dhari", "Bagasara", "Kunkavav Vadia"] },
  { district: "Amreli", distCoords: [71.22, 21.60], assembly: "94 - Amreli", acCoords: [71.22, 21.60], talukas: ["Amreli"] },
  { district: "Amreli", distCoords: [71.22, 21.60], assembly: "95 - Lathi", acCoords: [71.38, 21.72], talukas: ["Lathi", "Lilia"] },
  { district: "Amreli", distCoords: [71.22, 21.60], assembly: "96 - Savarkundla", acCoords: [71.31, 21.33], talukas: ["Savarkundla", "Bhesan"] },
  { district: "Amreli", distCoords: [71.22, 21.60], assembly: "97 - Rajula", acCoords: [71.43, 21.04], talukas: ["Rajula", "Jafrabad"] },

  // 18. Bhavnagar
  { district: "Bhavnagar", distCoords: [72.15, 21.76], assembly: "98 - Gariadhar", acCoords: [71.58, 21.55], talukas: ["Gariadhar"] },
  { district: "Bhavnagar", distCoords: [72.15, 21.76], assembly: "99 - Mahuva", acCoords: [71.76, 21.08], talukas: ["Mahuva"] },
  { district: "Bhavnagar", distCoords: [72.15, 21.76], assembly: "100 - Talaja", acCoords: [72.05, 21.34], talukas: ["Talaja"] },
  { district: "Bhavnagar", distCoords: [72.15, 21.76], assembly: "101 - Bhavnagar Rural", acCoords: [72.15, 21.76], talukas: ["Bhavnagar", "Sihor", "Umrala"] },
  { district: "Bhavnagar", distCoords: [72.15, 21.76], assembly: "102 - Bhavnagar East", acCoords: [72.16, 21.77], talukas: ["Bhavnagar City"] },
  { district: "Bhavnagar", distCoords: [72.15, 21.76], assembly: "103 - Bhavnagar West", acCoords: [72.14, 21.75], talukas: ["Bhavnagar City"] },

  // 19. Botad
  { district: "Botad", distCoords: [71.67, 22.17], assembly: "104 - Gadhada", acCoords: [71.58, 21.97], talukas: ["Gadhada", "Umrala"] },
  { district: "Botad", distCoords: [71.67, 22.17], assembly: "105 - Botad", acCoords: [71.67, 22.17], talukas: ["Botad", "Ranpur"] },

  // 20. Anand
  { district: "Anand", distCoords: [72.93, 22.56], assembly: "106 - Khambhat", acCoords: [72.62, 22.31], talukas: ["Khambhat"] },
  { district: "Anand", distCoords: [72.93, 22.56], assembly: "107 - Borsad", acCoords: [72.90, 22.41], talukas: ["Borsad"] },
  { district: "Anand", distCoords: [72.93, 22.56], assembly: "108 - Anklav", acCoords: [73.02, 22.43], talukas: ["Anklav"] },
  { district: "Anand", distCoords: [72.93, 22.56], assembly: "109 - Umreth", acCoords: [73.11, 22.68], talukas: ["Umreth"] },
  { district: "Anand", distCoords: [72.93, 22.56], assembly: "110 - Anand", acCoords: [72.93, 22.56], talukas: ["Anand"] },
  { district: "Anand", distCoords: [72.93, 22.56], assembly: "111 - Petlad", acCoords: [72.85, 22.47], talukas: ["Petlad"] },
  { district: "Anand", distCoords: [72.93, 22.56], assembly: "112 - Sojitra", acCoords: [72.82, 22.57], talukas: ["Sojitra"] },

  // 21. Kheda
  { district: "Kheda", distCoords: [72.68, 22.75], assembly: "113 - Matar", acCoords: [72.68, 22.53], talukas: ["Matar"] },
  { district: "Kheda", distCoords: [72.68, 22.75], assembly: "114 - Nadiad", acCoords: [72.86, 22.70], talukas: ["Nadiad"] },
  { district: "Kheda", distCoords: [72.68, 22.75], assembly: "115 - Mehmedabad", acCoords: [72.77, 22.84], talukas: ["Mehmedabad"] },
  { district: "Kheda", distCoords: [72.68, 22.75], assembly: "116 - Mahudha", acCoords: [72.91, 22.83], talukas: ["Mahudha", "Kapadvanj"] },
  { district: "Kheda", distCoords: [72.68, 22.75], assembly: "117 - Thasra", acCoords: [73.07, 22.87], talukas: ["Thasra", "Galateshwar"] },
  { district: "Kheda", distCoords: [72.68, 22.75], assembly: "118 - Kapadvanj", acCoords: [73.07, 23.02], talukas: ["Kapadvanj"] },

  // 22. Mahisagar
  { district: "Mahisagar", distCoords: [73.50, 23.10], assembly: "119 - Balasinor", acCoords: [73.34, 22.98], talukas: ["Balasinor", "Virpur"] },
  { district: "Mahisagar", distCoords: [73.50, 23.10], assembly: "120 - Lunawada", acCoords: [73.61, 23.13], talukas: ["Lunawada", "Khanpur"] },
  { district: "Mahisagar", distCoords: [73.50, 23.10], assembly: "121 - Santrampur", acCoords: [73.72, 23.17], talukas: ["Santrampur"] },

  // 23. Panchmahal
  { district: "Panchmahal", distCoords: [73.61, 22.77], assembly: "122 - Shehra", acCoords: [73.52, 23.35], talukas: ["Shehra", "Morva Hadaf"] },
  { district: "Panchmahal", distCoords: [73.61, 22.77], assembly: "123 - Godhra", acCoords: [73.61, 22.77], talukas: ["Godhra"] },
  { district: "Panchmahal", distCoords: [73.61, 22.77], assembly: "124 - Kalol", acCoords: [73.45, 22.60], talukas: ["Kalol"] },
  { district: "Panchmahal", distCoords: [73.61, 22.77], assembly: "125 - Halol", acCoords: [73.47, 22.50], talukas: ["Halol", "Jambughoda"] },

  // 24. Dahod
  { district: "Dahod", distCoords: [74.25, 22.84], assembly: "126 - Fatepura", acCoords: [74.05, 23.18], talukas: ["Fatepura"] },
  { district: "Dahod", distCoords: [74.25, 22.84], assembly: "127 - Jhalod", acCoords: [74.06, 23.08], talukas: ["Jhalod"] },
  { district: "Dahod", distCoords: [74.25, 22.84], assembly: "128 - Limkheda", acCoords: [73.93, 22.84], talukas: ["Limkheda"] },
  { district: "Dahod", distCoords: [74.25, 22.84], assembly: "129 - Dahod", acCoords: [74.25, 22.84], talukas: ["Dahod"] },
  { district: "Dahod", distCoords: [74.25, 22.84], assembly: "130 - Garbada", acCoords: [74.12, 22.72], talukas: ["Garbada"] },
  { district: "Dahod", distCoords: [74.25, 22.84], assembly: "131 - Devgadhbaria", acCoords: [73.90, 22.70], talukas: ["Devgadh Baria"] },

  // 25. Vadodara
  { district: "Vadodara", distCoords: [73.18, 22.30], assembly: "132 - Savli", acCoords: [73.22, 22.56], talukas: ["Savli", "Karjan"] },
  { district: "Vadodara", distCoords: [73.18, 22.30], assembly: "133 - Vaghodia", acCoords: [73.42, 22.33], talukas: ["Vaghodia"] },
  { district: "Vadodara", distCoords: [73.18, 22.30], assembly: "134 - Dabhoi", acCoords: [73.42, 22.10], talukas: ["Dabhoi"] },
  { district: "Vadodara", distCoords: [73.18, 22.30], assembly: "135 - Vadodara City", acCoords: [73.18, 22.30], talukas: ["Vadodara City"] },
  { district: "Vadodara", distCoords: [73.18, 22.30], assembly: "136 - Sayajigunj", acCoords: [73.19, 22.32], talukas: ["Vadodara City"] },
  { district: "Vadodara", distCoords: [73.18, 22.30], assembly: "137 - Akota", acCoords: [73.16, 22.31], talukas: ["Vadodara City"] },
  { district: "Vadodara", distCoords: [73.18, 22.30], assembly: "138 - Raopura", acCoords: [73.19, 22.30], talukas: ["Vadodara City"] },
  { district: "Vadodara", distCoords: [73.18, 22.30], assembly: "139 - Manjalpur", acCoords: [73.18, 22.27], talukas: ["Vadodara City"] },
  { district: "Vadodara", distCoords: [73.18, 22.30], assembly: "140 - Padra", acCoords: [72.98, 22.34], talukas: ["Padra"] },
  { district: "Vadodara", distCoords: [73.18, 22.30], assembly: "141 - Karjan", acCoords: [73.12, 21.93], talukas: ["Karjan"] },

  // 26. Chhota Udaipur
  { district: "Chhota Udaipur", distCoords: [74.01, 22.32], assembly: "142 - Chhota Udaipur", acCoords: [74.01, 22.32], talukas: ["Chhota Udaipur", "Kavant", "Jetpur Pavi"] },
  { district: "Chhota Udaipur", distCoords: [74.01, 22.32], assembly: "143 - Jetpur Pavi", acCoords: [73.90, 22.42], talukas: ["Jetpur Pavi", "Naswadi"] },
  { district: "Chhota Udaipur", distCoords: [74.01, 22.32], assembly: "144 - Sankheda", acCoords: [73.57, 22.28], talukas: ["Sankheda", "Tilakwada"] },

  // 27. Narmada
  { district: "Narmada", distCoords: [73.50, 21.87], assembly: "145 - Nandod", acCoords: [73.50, 21.87], talukas: ["Rajpipla", "Nandod", "Garudeshwar"] },
  { district: "Narmada", distCoords: [73.50, 21.87], assembly: "146 - Dediapada", acCoords: [73.78, 21.63], talukas: ["Dediapada", "Sagbara"] },

  // 28. Bharuch
  { district: "Bharuch", distCoords: [72.99, 21.70], assembly: "147 - Jambusar", acCoords: [72.79, 22.04], talukas: ["Jambusar", "Amod"] },
  { district: "Bharuch", distCoords: [72.99, 21.70], assembly: "148 - Vagra", acCoords: [72.84, 21.75], talukas: ["Vagra"] },
  { district: "Bharuch", distCoords: [72.99, 21.70], assembly: "149 - Bharuch", acCoords: [72.99, 21.70], talukas: ["Bharuch"] },
  { district: "Bharuch", distCoords: [72.99, 21.70], assembly: "150 - Ankleshwar", acCoords: [72.99, 21.63], talukas: ["Ankleshwar", "Hansot"] },
  { district: "Bharuch", distCoords: [72.99, 21.70], assembly: "151 - Jhagadia", acCoords: [73.16, 21.72], talukas: ["Jhagadia", "Valia"] },

  // 29. Surat
  { district: "Surat", distCoords: [72.83, 21.17], assembly: "155 - Olpad", acCoords: [72.76, 21.28], talukas: ["Olpad"] },
  { district: "Surat", distCoords: [72.83, 21.17], assembly: "156 - Mangrol", acCoords: [73.08, 21.25], talukas: ["Mangrol", "Umarpada"] },
  { district: "Surat", distCoords: [72.83, 21.17], assembly: "157 - Mandvi", acCoords: [73.30, 21.25], talukas: ["Mandvi"] },
  { district: "Surat", distCoords: [72.83, 21.17], assembly: "158 - Kamrej", acCoords: [72.93, 21.26], talukas: ["Kamrej"] },
  { district: "Surat", distCoords: [72.83, 21.17], assembly: "159 - Surat East", acCoords: [72.84, 21.20], talukas: ["Surat City"] },
  { district: "Surat", distCoords: [72.83, 21.17], assembly: "160 - Surat North", acCoords: [72.83, 21.22], talukas: ["Surat City"] },
  { district: "Surat", distCoords: [72.83, 21.17], assembly: "161 - Varachha Road", acCoords: [72.86, 21.22], talukas: ["Surat City"] },
  { district: "Surat", distCoords: [72.83, 21.17], assembly: "162 - Karanj", acCoords: [72.85, 21.20], talukas: ["Surat City"] },
  { district: "Surat", distCoords: [72.83, 21.17], assembly: "163 - Limbayat", acCoords: [72.88, 21.17], talukas: ["Surat City"] },
  { district: "Surat", distCoords: [72.83, 21.17], assembly: "164 - Udhna", acCoords: [72.84, 21.16], talukas: ["Surat City"] },
  { district: "Surat", distCoords: [72.83, 21.17], assembly: "165 - Majura", acCoords: [72.81, 21.18], talukas: ["Surat City"] },
  { district: "Surat", distCoords: [72.83, 21.17], assembly: "166 - Katargam", acCoords: [72.83, 21.23], talukas: ["Surat City"] },
  { district: "Surat", distCoords: [72.83, 21.17], assembly: "167 - Surat West", acCoords: [72.79, 21.19], talukas: ["Surat City"] },
  { district: "Surat", distCoords: [72.83, 21.17], assembly: "168 - Choryasi", acCoords: [72.78, 21.15], talukas: ["Choryasi"] },
  { district: "Surat", distCoords: [72.83, 21.17], assembly: "169 - Bardoli", acCoords: [73.11, 21.12], talukas: ["Bardoli", "Palsana"] },
  { district: "Surat", distCoords: [72.83, 21.17], assembly: "170 - Mahuva", acCoords: [73.18, 21.08], talukas: ["Mahuva"] },

  // 30. Tapi
  { district: "Tapi", distCoords: [73.71, 21.21], assembly: "171 - Vyara", acCoords: [73.39, 21.11], talukas: ["Vyara", "Valod"] },
  { district: "Tapi", distCoords: [73.71, 21.21], assembly: "172 - Nizar", acCoords: [74.05, 21.45], talukas: ["Nizar", "Kukarmunda", "Uchchhal"] },
  { district: "Tapi", distCoords: [73.71, 21.21], assembly: "173 - Songadh", acCoords: [73.53, 21.15], talukas: ["Songadh"] },

  // 31. Dang
  { district: "Dang", distCoords: [73.79, 20.76], assembly: "174 - Dangs", acCoords: [73.79, 20.76], talukas: ["Ahwa", "Waghai", "Subir"] },

  // 32. Navsari
  { district: "Navsari", distCoords: [72.92, 20.95], assembly: "175 - Jalalpore", acCoords: [72.91, 20.94], talukas: ["Jalalpore"] },
  { district: "Navsari", distCoords: [72.92, 20.95], assembly: "176 - Navsari", acCoords: [72.92, 20.95], talukas: ["Navsari"] },
  { district: "Navsari", distCoords: [72.92, 20.95], assembly: "177 - Gandevi", acCoords: [72.98, 20.82], talukas: ["Gandevi", "Chikhli"] },
  { district: "Navsari", distCoords: [72.92, 20.95], assembly: "178 - Vansda", acCoords: [73.35, 20.67], talukas: ["Vansda"] },

  // 33. Valsad
  { district: "Valsad", distCoords: [72.93, 20.61], assembly: "179 - Dharampur", acCoords: [73.17, 20.55], talukas: ["Dharampur"] },
  { district: "Valsad", distCoords: [72.93, 20.61], assembly: "180 - Valsad", acCoords: [72.93, 20.63], talukas: ["Valsad"] },
  { district: "Valsad", distCoords: [72.93, 20.61], assembly: "181 - Pardi", acCoords: [72.90, 20.48], talukas: ["Pardi", "Vapi"] },
  { district: "Valsad", distCoords: [72.93, 20.61], assembly: "182 - Kaprada", acCoords: [73.20, 20.27], talukas: ["Kaprada"] },
  { district: "Valsad", distCoords: [72.93, 20.61], assembly: "183 - Umbergaon", acCoords: [72.72, 20.21], talukas: ["Umbergaon"] }
];

let map;

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('maplibre-container')) {
    map = new maplibregl.Map({
      container: 'maplibre-container',
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [71.1924, 22.2587],
      zoom: 7,
      maxBounds: [[68.1, 20.1], [74.5, 24.7]],
      minZoom: 6.8
    });
  }

  populateDropdowns();
  renderIssues();
  renderVolunteers();
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

// Navigation Tab Switcher
function switchTab(index, btn) {
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
  btn.classList.add('active');
  const targetSection = document.getElementById('section-' + index);
  if (targetSection) targetSection.classList.add('active');
  if (index === 1 && map) { setTimeout(() => { map.resize(); }, 200); }
}

// Live Countdown Timer Engine
function updateCountdown() {
  const targetDate = new Date('December 1, 2027 00:00:00').getTime();
  const diff = targetDate - new Date().getTime();

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    if (document.getElementById('cd-days')) {
      document.getElementById('cd-days').innerText = String(days).padStart(3, '0');
      document.getElementById('cd-hours').innerText = String(hours).padStart(2, '0');
      document.getElementById('cd-mins').innerText = String(mins).padStart(2, '0');
      document.getElementById('cd-secs').innerText = String(secs).padStart(2, '0');
    }
  }
}

// Populate Dropdowns
function populateDropdowns() {
  const distSel = document.getElementById('filter-district');
  const acSel = document.getElementById('filter-assembly');
  const modalAcSel = document.getElementById('modalAcSelect');

  if (distSel) {
    distSel.innerHTML = '<option value="">-- All Districts --</option>';
    [...new Set(GujaratFullData.map(d => d.district))].sort().forEach(d => distSel.innerHTML += `<option value="${d}">${d}</option>`);
  }
  if (acSel) {
    acSel.innerHTML = '<option value="">-- All Seats --</option>';
    GujaratFullData.forEach(item => acSel.innerHTML += `<option value="${item.assembly}">${item.assembly}</option>`);
  }
  if (modalAcSel) {
    modalAcSel.innerHTML = '<option value="">-- Select AC --</option>';
    GujaratFullData.forEach(item => modalAcSel.innerHTML += `<option value="${item.assembly}">${item.assembly}</option>`);
  }
}

// Cascading Taluka selection based on AC in Issue Form
function onModalAcChange(assemblyName) {
  const talSel = document.getElementById('modalTalukaSelect');
  if (!talSel) return;
  talSel.innerHTML = '<option value="">-- Select Taluka --</option>';
  const match = GujaratFullData.find(d => d.assembly === assemblyName);
  if (match && match.talukas) {
    match.talukas.forEach(t => talSel.innerHTML += `<option value="${t}">${t}</option>`);
  }
}

// Issue Modal Management
function openIssueModal() {
  const overlay = document.getElementById('issueModalOverlay');
  if (overlay) overlay.style.display = 'flex';
}

function closeIssueModal() {
  const overlay = document.getElementById('issueModalOverlay');
  if (overlay) overlay.style.display = 'none';
}

var issuesList = JSON.parse(localStorage.getItem('gujarat_issues_v1') || '[]');

function saveNewIssue() {
  const desc = document.getElementById('modalIssueDesc').value.trim();
  const ac = document.getElementById('modalAcSelect').value;
  const taluka = document.getElementById('modalTalukaSelect').value;
  const geotag = document.getElementById('modalGeoTag').value.trim();
  const level = document.getElementById('modalLevel').value;
  const poc = document.getElementById('modalPoc').value.trim();
  const contact = document.getElementById('modalContact').value.trim();
  const impact = document.getElementById('modalImpact').value;

  if (!desc || !ac) {
    alert('Please provide an issue description and select an Assembly Constituency.');
    return;
  }

  issuesList.push({ desc, ac, taluka, geotag, level, poc, contact, impact, date: new Date().toLocaleDateString() });
  localStorage.setItem('gujarat_issues_v1', JSON.stringify(issuesList));
  
  closeIssueModal();
  renderIssues();
  
  document.getElementById('modalIssueDesc').value = '';
  document.getElementById('modalGeoTag').value = '';
  document.getElementById('modalPoc').value = '';
  document.getElementById('modalContact').value = '';
}

function renderIssues() {
  const container = document.getElementById('issuesListContainer');
  if (!container) return;

  if (issuesList.length === 0) {
    container.innerHTML = '<div style="background: rgba(255,255,255,0.6); padding: 14px; border-radius: 12px; font-size: 13px; color: var(--text-muted); text-align: center; font-weight: 600;">No issues recorded yet. Click "+ Add Issue" to log ground reports.</div>';
    return;
  }

  container.innerHTML = issuesList.map((i, idx) => `
    <div style="background: var(--card-bg); border: 1.5px solid var(--border-color); padding: 12px; border-radius: 12px; margin-bottom: 8px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div style="font-weight: 800; font-size: 14px; color: var(--text-main);">${i.desc}</div>
        <button onclick="issuesList.splice(${idx}, 1); localStorage.setItem('gujarat_issues_v1', JSON.stringify(issuesList)); renderIssues();" style="background:none; border:none; color:#ff3b30; cursor:pointer; font-weight:700;">Delete</button>
      </div>
      <div style="font-size: 12px; color: var(--text-muted); margin-top: 6px; display: flex; gap: 10px; flex-wrap: wrap;">
        <span>🗳️ <strong>${i.ac}</strong></span>
        <span>📍 <strong>${i.taluka || 'N/A'}</strong></span>
        <span>🏷️ <strong>${i.level}</strong></span>
        <span>⚡ Impact: <span style="color: ${i.impact === 'Critical' ? 'red' : i.impact === 'High' ? 'orange' : 'green'};">${i.impact}</span></span>
      </div>
      ${i.poc ? `<div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">👤 PoC: ${i.poc} (${i.contact || 'No phone'}) | 🌐 GPS: ${i.geotag || 'None'}</div>` : ''}
    </div>
  `).join('');
}

function renderVolunteers() {
  const container = document.getElementById('volunteerListContainer');
  if (container) {
    container.innerHTML = '<div style="font-size: 13px; color: var(--text-muted);">Field volunteers module ready.</div>';
  }
}
