// ==========================================
// data.js - Strict Relational Dataset for Gujarat Geography
// ==========================================

const GujaratRelationalData = {
  districts: [
    {
      name: "Kachchh",
      assemblies: ["1 - Abdasa", "2 - Mandvi", "3 - Bhuj", "4 - Anjar", "5 - Gandhidham", "6 - Rapar"],
      talukas: ["Bhuj", "Anjar", "Gandhidham", "Rapar", "Mandvi", "Nakhatrana", "Lakhpat", "Abdasa", "Mundra", "Bhachau"]
    },
    {
      name: "Valsad",
      assemblies: ["178 - Dharampur", "179 - Valsad", "180 - Pardi", "181 - Kaprada", "182 - Umbergaon"],
      talukas: ["Valsad", "Pardi", "Umbergaon", "Vapi", "Dharampur", "Kaprada"]
    },
    {
      name: "Navsari",
      assemblies: ["174 - Jalalpore", "175 - Navsari", "176 - Gandevi", "177 - Vansda"],
      talukas: ["Navsari", "Jalalpore", "Gandevi", "Chikhli", "Vansda", "Khergam"]
    },
    {
      name: "Ahmedabad",
      assemblies: ["39 - Viramgam", "40 - Sanand", "41 - Ghatlodia", "42 - Vejalpur", "43 - Vatva", "44 - Ellisbridge", "45 - Naranpura", "46 - Nikol", "47 - Naroda", "48 - Thakkarbapa Nagar", "49 - Bapunagar", "50 - Amraiwadi", "51 - Dariapur", "52 - Jamalpur-Khadia", "53 - Maninagar", "54 - Danilimda", "55 - Sabarmati", "56 - Asarwa", "57 - Daskroi", "58 - Dholka", "59 - Dhandhuka"],
      talukas: ["Ahmedabad City", "Sanand", "Daskroi", "Dhandhuka", "Viramgam", "Bavla", "Dholka", "Mandal", "Detroj"]
    },
    {
      name: "Surat",
      assemblies: ["150 - Surat East", "151 - Surat North", "152 - Surat West", "153 - Varachha Road", "154 - Karanj", "155 - Olpad", "156 - Mangrol", "157 - Mandvi", "158 - Kamrej", "168 - Choryasi", "169 - Bardoli", "170 - Mahuva"],
      talukas: ["Surat City", "Choryasi", "Bardoli", "Mahuva", "Mandvi", "Olpad", "Palsana", "Kamrej", "Mangrol", "Umarpada"]
    },
    {
      name: "Rajkot",
      assemblies: ["68 - Rajkot East", "69 - Rajkot West", "70 - Rajkot South", "71 - Rajkot Rural", "72 - Jasdan", "73 - Gondal", "74 - Jetpur", "75 - Dhoraji"],
      talukas: ["Rajkot", "Jetpur", "Gondal", "Jasdan", "Dhoraji", "Upleta", "Lodhika", "Kotda Sangani", "Paddhari", "Vinchhiya", "Jamkandorna"]
    }
  ]
};

let allAssemblies = [];
let allDistricts = [];
GujaratRelationalData.districts.forEach(d => {
  allDistricts.push(d.name);
  allAssemblies = allAssemblies.concat(d.assemblies);
});
GujaratRelationalData.allAssemblies = allAssemblies.sort();
GujaratRelationalData.allDistricts = allDistricts.sort();
