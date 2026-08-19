const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Troubleshooting = require("./models/Troubleshooting");

dotenv.config();

const troubleshootingData = [
  {
    title: "Phone Not Charging",
    category: "Charging & Power",

    symptoms: [
      "Phone does not charge when connected to a charger",
      "Charging connector may feel loose",
      "Charging may start and stop",
      "Charging current may be absent or unstable",
    ],

    possibleCauses: [
      "Charging connector problem",
      "Charging cable or adapter problem",
      "Sub-board problem",
      "Motherboard problem",
    ],

    diagnosticSteps: [
      "Check the charging connector physically.",
      "Test the phone using a 6-port charging device.",
      "Check the charging current in amperes.",
      "If the charging point is loose or the connector does not properly fit, check the charging connector first.",
      "If the connector is properly inserted, check whether the charging current is stable or fluctuating.",
      "If the connector replacement does not solve the problem, diagnose the sub-board.",
      "If the sub-board is not the cause, proceed to motherboard-level diagnosis.",
    ],

    recommendedSolution: [
      "Replace the charging connector if it is damaged or loose.",
      "Repair or replace the sub-board if the issue is related to the sub-board.",
      "Perform motherboard diagnosis if the connector and sub-board are working correctly.",
    ],

    requiredParts: [
      "Charging connector",
      "Sub-board",
    ],

    estimatedPrice:
      "Older mobile models: Charging connector approximately ₹350–₹500; Sub-board approximately ₹650–₹800. Actual pricing depends on the mobile model and part quality.",

    technicianNotes: [
      "Always check the charging connector before moving to sub-board or motherboard diagnosis.",
      "Charging current should be checked during diagnosis.",
      "Repair pricing varies according to the mobile model.",
    ],

    warnings: [
      "Do not directly assume a motherboard fault before checking the charging connector and sub-board.",
      "Motherboard-level repair can involve risk to the device.",
    ],

    customerNotice:
      "RepairX provides troubleshooting guidance only. Actual diagnosis, repair success and pricing may vary depending on the mobile model and device condition.",
  },

  {
    title: "Battery Draining Fast",
    category: "Battery",

    symptoms: [
      "Battery percentage decreases quickly",
      "Phone requires frequent charging",
      "Battery drains even when the phone is not heavily used",
    ],

    possibleCauses: [
      "Battery health degradation",
      "Background applications consuming power",
      "Charging or power management problem",
      "Software-related issue",
    ],

    diagnosticSteps: [
      "Check the battery health and condition.",
      "Check battery usage and identify applications consuming excessive power.",
      "Test the phone after closing unnecessary background applications.",
      "Check whether the battery voltage and charging behavior are normal.",
      "If the battery is degraded, test the phone with a known-good battery.",
    ],

    recommendedSolution: [
      "Replace the battery if its health has significantly degraded.",
      "Remove or restrict unnecessary background applications.",
      "Update the device software if a software issue is suspected.",
      "Perform hardware-level diagnosis if battery replacement does not solve the issue.",
    ],

    requiredParts: [
      "Compatible battery",
    ],

    estimatedPrice:
      "Battery replacement price varies according to the mobile model, battery capacity and part quality.",

    technicianNotes: [
      "Always check battery health before assuming a motherboard problem.",
      "Test with a known-good battery when possible.",
    ],

    warnings: [
      "Do not use a damaged, swollen or physically deformed battery.",
      "Battery replacement should be performed carefully to avoid device damage.",
    ],

    customerNotice:
      "RepairX provides troubleshooting guidance only. Actual diagnosis, repair success and pricing may vary depending on the mobile model and device condition.",
  },

  {
    title: "Phone Not Turning On",
    category: "Power",

    symptoms: [
      "Phone does not power on",
      "No display appears after pressing the power button",
      "Phone may show no charging or boot response",
    ],

    possibleCauses: [
      "Battery completely discharged or damaged",
      "Power button problem",
      "Charging or power circuit problem",
      "Motherboard problem",
    ],

    diagnosticSteps: [
      "Connect the phone to a known-good charger.",
      "Check whether the device shows any charging indication.",
      "Check the battery condition.",
      "Test the power button.",
      "Check charging and power-related components.",
      "If basic power checks are normal, proceed with motherboard-level diagnosis.",
    ],

    recommendedSolution: [
      "Charge or replace the battery if required.",
      "Repair or replace the power button if it is faulty.",
      "Repair the charging or power circuit if required.",
      "Perform motherboard diagnosis when necessary.",
    ],

    requiredParts: [
      "Battery",
      "Power button",
      "Charging components",
    ],

    estimatedPrice:
      "Repair cost depends on the faulty component and mobile model.",

    technicianNotes: [
      "Always perform basic power and battery checks before motherboard diagnosis.",
      "Check for signs of physical or liquid damage.",
    ],

    warnings: [
      "Do not immediately perform motherboard repair without completing basic diagnostics.",
    ],

    customerNotice:
      "RepairX provides troubleshooting guidance only. Actual diagnosis, repair success and pricing may vary depending on the mobile model and device condition.",
  },

  {
    title: "Touchscreen Not Working",
    category: "Display & Touch",

    symptoms: [
      "Touch does not respond",
      "Only part of the screen responds to touch",
      "Touch response is delayed or inconsistent",
    ],

    possibleCauses: [
      "Damaged display",
      "Touch digitizer problem",
      "Display connector problem",
      "Software issue",
    ],

    diagnosticSteps: [
      "Restart the phone and check the touch response.",
      "Inspect the display for cracks or physical damage.",
      "Check the display connector.",
      "Test the device software and touch response.",
      "Test with a known-good display if required.",
    ],

    recommendedSolution: [
      "Replace the display assembly if the display or digitizer is damaged.",
      "Reconnect or repair the display connector if required.",
      "Perform software troubleshooting if the issue is software-related.",
    ],

    requiredParts: [
      "Compatible display assembly",
      "Display connector if required",
    ],

    estimatedPrice:
      "Display replacement cost varies significantly according to the mobile model and display quality.",

    technicianNotes: [
      "Check the connector before replacing the complete display.",
      "Inspect the device for physical damage.",
    ],

    warnings: [
      "Display replacement requires careful handling of the screen and connectors.",
    ],

    customerNotice:
      "RepairX provides troubleshooting guidance only. Actual diagnosis, repair success and pricing may vary depending on the mobile model and device condition.",
  },

  {
    title: "Speaker Not Working",
    category: "Audio",

    symptoms: [
      "No sound from the speaker",
      "Speaker volume is very low",
      "Sound is distorted or crackling",
    ],

    possibleCauses: [
      "Blocked speaker mesh",
      "Damaged speaker",
      "Speaker connector problem",
      "Software or audio setting issue",
    ],

    diagnosticSteps: [
      "Check the device volume and audio settings.",
      "Test the speaker using different audio sources.",
      "Inspect the speaker mesh for blockage.",
      "Check the speaker connector and contacts.",
      "Test with a known-good speaker if required.",
    ],

    recommendedSolution: [
      "Clean the speaker mesh if it is blocked.",
      "Replace the speaker if it is damaged.",
      "Repair the connector or contacts if required.",
      "Check software settings if hardware is working correctly.",
    ],

    requiredParts: [
      "Compatible speaker",
    ],

    estimatedPrice:
      "Speaker replacement cost varies according to the mobile model and part quality.",

    technicianNotes: [
      "Check software and speaker blockage before replacing the speaker.",
    ],

    warnings: [
      "Avoid using excessive force while cleaning the speaker mesh.",
    ],

    customerNotice:
      "RepairX provides troubleshooting guidance only. Actual diagnosis, repair success and pricing may vary depending on the mobile model and device condition.",
  },

  {
    title: "Microphone Not Working",
    category: "Audio",

    symptoms: [
      "Other people cannot hear the user during calls",
      "Voice recordings contain no sound",
      "Microphone works intermittently",
    ],

    possibleCauses: [
      "Blocked microphone opening",
      "Damaged microphone",
      "Microphone connector or circuit problem",
      "Software permission issue",
    ],

    diagnosticSteps: [
      "Check microphone permissions for the required applications.",
      "Test the microphone using the voice recorder.",
      "Inspect and clean the microphone opening carefully.",
      "Check microphone hardware and connectors.",
      "Test with a known-good microphone if required.",
    ],

    recommendedSolution: [
      "Clean the microphone opening if blocked.",
      "Replace the microphone if it is damaged.",
      "Repair the microphone circuit if required.",
      "Correct application permissions if the issue is software-related.",
    ],

    requiredParts: [
      "Compatible microphone",
    ],

    estimatedPrice:
      "Microphone repair or replacement cost varies according to the mobile model.",

    technicianNotes: [
      "Always test microphone permissions and the voice recorder before hardware replacement.",
    ],

    warnings: [
      "Do not insert sharp objects deeply into the microphone opening.",
    ],

    customerNotice:
      "RepairX provides troubleshooting guidance only. Actual diagnosis, repair success and pricing may vary depending on the mobile model and device condition.",
  },

  {
    title: "Camera Not Working",
    category: "Camera",

    symptoms: [
      "Camera application does not open",
      "Camera shows a black screen",
      "Photos or videos cannot be captured",
    ],

    possibleCauses: [
      "Camera application problem",
      "Camera module problem",
      "Camera connector problem",
      "Software issue",
    ],

    diagnosticSteps: [
      "Restart the phone and open the camera again.",
      "Check camera application permissions.",
      "Clear the camera application cache if required.",
      "Inspect the camera module and connector.",
      "Test with a known-good camera module if required.",
    ],

    recommendedSolution: [
      "Resolve camera application or permission issues.",
      "Reconnect the camera module if the connector is loose.",
      "Replace the camera module if it is faulty.",
      "Perform further hardware diagnosis if required.",
    ],

    requiredParts: [
      "Compatible camera module",
    ],

    estimatedPrice:
      "Camera replacement cost varies according to the mobile model and camera module.",

    technicianNotes: [
      "Check software and permissions before replacing the camera module.",
      "Inspect the connector carefully.",
    ],

    warnings: [
      "Handle camera modules carefully to avoid damaging the lens or connector.",
    ],

    customerNotice:
      "RepairX provides troubleshooting guidance only. Actual diagnosis, repair success and pricing may vary depending on the mobile model and device condition.",
  },

  {
    title: "Network / SIM Not Working",
    category: "Network",

    symptoms: [
      "SIM card is not detected",
      "No network signal",
      "Calls or mobile data do not work",
    ],

    possibleCauses: [
      "SIM card problem",
      "SIM tray or connector problem",
      "Network configuration issue",
      "Antenna or motherboard problem",
    ],

    diagnosticSteps: [
      "Remove and reinsert the SIM card.",
      "Test the SIM card in another compatible phone.",
      "Test the phone with another working SIM card.",
      "Check network settings and preferred network mode.",
      "Inspect the SIM connector and antenna connections.",
      "Perform hardware diagnosis if the issue continues.",
    ],

    recommendedSolution: [
      "Replace the SIM card if it is faulty.",
      "Repair or replace the SIM connector if damaged.",
      "Correct network settings if the issue is software-related.",
      "Perform antenna or motherboard diagnosis if required.",
    ],

    requiredParts: [
      "SIM connector if required",
      "Antenna component if required",
    ],

    estimatedPrice:
      "Repair cost varies according to the faulty component and mobile model.",

    technicianNotes: [
      "Always test the SIM card separately before diagnosing the phone hardware.",
      "Check network settings before hardware repair.",
    ],

    warnings: [
      "Do not assume a motherboard fault before checking the SIM card, connector and network settings.",
    ],

    customerNotice:
      "RepairX provides troubleshooting guidance only. Actual diagnosis, repair success and pricing may vary depending on the mobile model and device condition.",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected for seeding...");

    await Troubleshooting.deleteMany({});

    await Troubleshooting.insertMany(troubleshootingData);

    console.log(
      `${troubleshootingData.length} troubleshooting records added successfully!`
    );

    await mongoose.connection.close();

    console.log("Database connection closed.");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();