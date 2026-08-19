const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Part = require("./models/Part");

dotenv.config();

const partsData = [
  {
    name: "Charging Connector",
    category: "Charging",
    compatibleDevices: [
      "Multiple older Android models",
      "Model dependent",
    ],
    estimatedPrice: "₹350–₹500",
    availability: "Available",
    description:
      "Charging connector used when the phone charging port is damaged, loose or not making proper contact.",
    technicianNotes: [
      "Check the charging connector before diagnosing the sub-board.",
      "Actual part compatibility must be checked according to the mobile model.",
    ],
    customerNotice:
      "Actual pricing and availability may vary depending on the mobile model and part quality.",
  },

  {
    name: "Sub-board",
    category: "Charging",
    compatibleDevices: [
      "Multiple Android models",
      "Model dependent",
    ],
    estimatedPrice: "₹650–₹800",
    availability: "Available",
    description:
      "Sub-board containing charging and other related hardware components in supported mobile models.",
    technicianNotes: [
      "Check the charging connector before replacing the sub-board.",
      "Confirm the exact mobile model before ordering the part.",
    ],
    customerNotice:
      "Actual pricing and availability may vary depending on the mobile model and part quality.",
  },

  {
    name: "Mobile Battery",
    category: "Battery",
    compatibleDevices: [
      "Model specific",
      "Android smartphones",
    ],
    estimatedPrice: "Model dependent",
    availability: "Available",
    description:
      "Replacement battery for mobile devices experiencing battery degradation or battery-related power issues.",
    technicianNotes: [
      "Check battery health before replacement.",
      "Use a compatible battery designed for the specific mobile model.",
    ],
    customerNotice:
      "Battery pricing varies according to mobile model, capacity and part quality.",
  },

  {
    name: "Display Assembly",
    category: "Display",
    compatibleDevices: [
      "Android smartphones",
      "Model specific",
    ],
    estimatedPrice: "Model dependent",
    availability: "Available",
    description:
      "Complete display assembly used for damaged screens, display problems or touchscreen issues.",
    technicianNotes: [
      "Check the display connector before replacing the complete assembly.",
      "Confirm display compatibility with the exact mobile model.",
    ],
    customerNotice:
      "Display pricing varies significantly according to the mobile model and display quality.",
  },

  {
    name: "Speaker",
    category: "Audio",
    compatibleDevices: [
      "Android smartphones",
      "Model specific",
    ],
    estimatedPrice: "Model dependent",
    availability: "Available",
    description:
      "Replacement speaker for phones with no sound, low sound or distorted audio.",
    technicianNotes: [
      "Check speaker blockage and software settings before replacement.",
      "Test the speaker using a known-good component when possible.",
    ],
    customerNotice:
      "Actual pricing depends on the mobile model and part quality.",
  },

  {
    name: "Microphone",
    category: "Audio",
    compatibleDevices: [
      "Android smartphones",
      "Model specific",
    ],
    estimatedPrice: "Model dependent",
    availability: "Available",
    description:
      "Replacement microphone used when the phone cannot properly record or transmit voice.",
    technicianNotes: [
      "Check microphone permissions before hardware replacement.",
      "Inspect the microphone opening for blockage.",
    ],
    customerNotice:
      "Actual pricing depends on the mobile model and part quality.",
  },

  {
    name: "Camera Module",
    category: "Camera",
    compatibleDevices: [
      "Android smartphones",
      "Model specific",
    ],
    estimatedPrice: "Model dependent",
    availability: "Available",
    description:
      "Replacement camera module for phones experiencing camera hardware problems.",
    technicianNotes: [
      "Check camera permissions and software first.",
      "Inspect the camera connector before replacing the module.",
    ],
    customerNotice:
      "Camera module pricing depends on the mobile model and component quality.",
  },

  {
    name: "SIM Connector",
    category: "Network",
    compatibleDevices: [
      "Android smartphones",
      "Model specific",
    ],
    estimatedPrice: "Model dependent",
    availability: "Available",
    description:
      "SIM connector used when the phone cannot properly detect a SIM card due to connector-related problems.",
    technicianNotes: [
      "Test the SIM card in another phone first.",
      "Check the SIM tray and connector before motherboard diagnosis.",
    ],
    customerNotice:
      "Actual pricing depends on the mobile model and repair requirements.",
  },

  {
    name: "Power Button",
    category: "Power",
    compatibleDevices: [
      "Android smartphones",
      "Model specific",
    ],
    estimatedPrice: "Model dependent",
    availability: "Available",
    description:
      "Replacement power button component for devices with a damaged or non-responsive power button.",
    technicianNotes: [
      "Check whether the problem is caused by the button, flex or motherboard.",
      "Confirm compatibility before replacement.",
    ],
    customerNotice:
      "Actual pricing depends on the mobile model and component quality.",
  },
];

const seedParts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected for parts seeding...");

    await Part.deleteMany({});

    await Part.insertMany(partsData);

    console.log(
      `${partsData.length} parts records added successfully!`
    );

    await mongoose.connection.close();

    console.log("Database connection closed.");
  } catch (error) {
    console.error("Parts seeding failed:", error.message);
    process.exit(1);
  }
};

seedParts();