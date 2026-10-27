// This script handles the calculation and display of results for the Universal Measurement Conversion Tool

// Elements
const results = document.getElementById("results");
const loadingIndicator = document.getElementById("loadingIndicator");

// Metric - Length
const millimeterElem = document.getElementById("millimeter");
const centimeterElem = document.getElementById("centimeter");
const decimeterElem = document.getElementById("decimeter");
const meterElem = document.getElementById("meter");
const decameterElem = document.getElementById("decameter");
const hectometerElem = document.getElementById("hectometer");
const kilometerElem = document.getElementById("kilometer");

// Metric - Mass
const milligramElem = document.getElementById("milligram");
const centigramElem = document.getElementById("centigram");
const decigramElem = document.getElementById("decigram");
const gramElem = document.getElementById("gram");
const dekagramElem = document.getElementById("dekagram");
const hectogramElem = document.getElementById("hectogram");
const kilogramElem = document.getElementById("kilogram");

// Metric - Volume (Liquid)
const milliliterElem = document.getElementById("milliliter");
const centiliterElem = document.getElementById("centiliter");
const deciliterElem = document.getElementById("deciliter");
const liquidLiterElem = document.getElementById("liquidLiter");
const kiloliterElem = document.getElementById("kiloliter");

// Metric - Volume (Dry)
const dryLiterElem = document.getElementById("dryLiter");
const cubicmeterElem = document.getElementById("cubicmeter");


// Metric - Temperature
const kelvinElem = document.getElementById("kelvin");
const celsiusElem = document.getElementById("celsius");

// Imperial - Length
const inchElem = document.getElementById("inch");
const footElem = document.getElementById("foot");
const yardElem = document.getElementById("yard");
const mileElem = document.getElementById("mile");

// Imperial - Mass
const ounceElem = document.getElementById("ounce");
const poundElem = document.getElementById("pound");
const tonElem = document.getElementById("ton");

// Imperial - Dry Volume
const dryTeaspoonElem = document.getElementById("dryTeaspoon");
const dryTablespoonElem = document.getElementById("dryTablespoon");
const dryOunceElem = document.getElementById("dryOunce");
const dryCupElem = document.getElementById("dryCup");
const dryPintElem = document.getElementById("dryPint");
const dryQuartElem = document.getElementById("dryQuart");
const dryGallonElem = document.getElementById("dryGallon");

// Imperial - Liquid Volume
const teaspoonElem = document.getElementById("teaspoon");
const tablespoonElem = document.getElementById("tablespoon");
const liquidOunceElem = document.getElementById("liquidOunce");
const cupElem = document.getElementById("cup");
const pintElem = document.getElementById("pint");
const quartElem = document.getElementById("quart");
const gallonElem = document.getElementById("gallon");

// Imperial - Temperature
const fahrenheitElem = document.getElementById("fahrenheit");

// Time
const millisecondElem = document.getElementById("millisecond");
const secondElem = document.getElementById("second");
const minuteElem = document.getElementById("minute");
const hourElem = document.getElementById("hour");
const dayElem = document.getElementById("day");
const weekElem = document.getElementById("week");
const monthElem = document.getElementById("month");
const yearElem = document.getElementById("year");
const decadeElem = document.getElementById("decade");

// Calculate Button and Status Elem
const calculateButtonElem = document.getElementById("calculateButton");
const calculationStatus = document.getElementById("calculationStatus");

// Info Button and Modal
const infoButtonElem = document.getElementById("infoButton");
const infoModalElem = document.getElementById("infoModal");
const closeInfoButtonElem = infoModalElem.querySelector(".close");

// Dark Mode Toggle Button
const darkModeButtonElem = document.getElementById("darkModeButton");

// Global variables
let currentTab = null;
let currentMeasurementSystem = "imperial";
let isCalculating = false;
let previousFocusedElement = null;

// JSON files
const unitsJSONs = {
    length: "/static/lengths.json",
    mass: "/static/weights.json",
    liquidVolume: "/static/liquid_volume.json",
    dryVolume: "/static/dry_volume.json",
    time: "/static/times.json",
    temperature: "/static/temperatures.json"
}

// Groupings and conversion multipliers for units
// Global
const globalUnits = {
    time: [
        "millisecond",
        "second",
        "minute",
        "hour",
        "day",
        "week",
        "month",
        "year",
        "decade",
        "quettasecond",
        "ronnasecond",
        "yottasecond",
        "zettasecond",
        "exasecond",
        "petasecond",
        "terasecond",
        "millennium",
        "century",
        "gigasecond",
        "score",
        "lustrum",
        "olympiad",
        "triennium",
        "biennium",
        "leap year",
        "julian year",
        "common year",
        "quarter",
        "fortnight",
        "megasecond",
        "sidereal day",
        "watch",
        "kilosecond",
        "hectosecond",
        "decasecond",
        "decisecond",
        "centisecond",
        "microsecond",
        "nanosecond",
        "shake",
        "picosecond",
        "svedberg",
        "femtosecond",
        "attosecond",
        "zeptosecond",
        "yoctosecond",
        "rontosecond",
        "quectosecond"
    ]
};

const globalMultipliers = {
    // SI: seconds
    time: {
        quettasecond: 1e30,
        ronnasecond: 1e27,
        yottasecond: 1e24,
        zettasecond: 1e21,
        exasecond: 1e18,
        petasecond: 1e15,
        terasecond: 1e12,
        millennium: 31556952000,
        century: 3155695200,
        gigasecond: 1e9,
        score: 631139040,
        decade: 315569520,
        lustrum: 157784760,
        olympiad: 126227808,
        triennium: 94670856,
        biennium: 63113904,
        year: 31556952,
        "leap year": 31622400,
        "julian year": 31557600,
        "common year": 31536000,
        quarter: 7889238,
        month: 2629746,
        fortnight: 1209600,
        megasecond: 1e6,
        week: 604800,
        day: 86400,
        "sidereal day": 86164.0905,
        watch: 14400,
        hour: 3600,
        kilosecond: 1000,
        hectosecond: 100,
        minute: 60,
        decasecond: 10,
        second: 1,
        decisecond: 1e-1,
        centisecond: 1e-2,
        millisecond: 1e-3,
        microsecond: 1e-6,
        nanosecond: 1e-9,
        shake: 1e-8,
        picosecond: 1e-12,
        svedberg: 1e-13,
        femtosecond: 1e-15,
        attosecond: 1e-18,
        zeptosecond: 1e-21,
        yoctosecond: 1e-24,
        rontosecond: 1e-27,
        quectosecond: 1e-30
    }
};

// Metric
const metricUnits = {
    length: [
        "millimeter",
        "centimeter",
        "decimeter",
        "meter",
        "decameter",
        "hectometer",
        "kilometer",
        "quettameter",
        "ronnameter",
        "yottameter",
        "zettameter",
        "exameter",
        "petameter",
        "terameter",
        "gigameter",
        "hebdometer",
        "megameter",
        "myriameter",
        "scandinavian mile",
        "dimimeter",
        "micrometer",
        "nanometer",
        "Ångström",
        "picometer",
        "Milliångström",
        "micrimeter",
        "femtometer",
        "attometer",
        "zeptometer",
        "yoctometer",
        "rontometer",
        "quectometer"
    ],
    mass: [
        "milligram",
        "centigram",
        "decigram",
        "gram",
        "decagram",
        "hectogram",
        "kilogram",
        "quettagram",
        "ronnagram",
        "yottagram",
        "zettagram",
        "exagram",
        "petagram",
        "teragram",
        "gigagram",
        "metric tonne",
        "megagram",
        "quintal",
        "bar",
        "decibar",
        "centibar",
        "myriagram",
        "grave",
        "decigrave",
        "centigrave",
        "gravet",
        "decigravet",
        "centigravet",
        "milligravet",
        "microgram",
        "nanogram",
        "picogram",
        "femtogram",
        "attogram",
        "zeptogram",
        "yoctogram",
        "rontogram",
        "quectogram",
        "metric carat",
        "metric grain",
        "metric pound",
        "metric ounce",
    ],
    dryVolume: [
        "liter",
        "cubic meter",
        "cubic quettameter",
        "cubic ronnameter",
        "cubic yottameter",
        "cubic zettameter",
        "cubic exameter",
        "cubic petameter",
        "cubic terameter",
        "cubic gigameter",
        "quettaliter",
        "cubic megameter",
        "ronnaliter",
        "cubic kilometer",
        "yottaliter",
        "cubic hectometer",
        "zettaliter",
        "cubic decameter",
        "exaliter",
        "petaliter",
        "teraliter",
        "gigaliter",
        "myriastere",
        "megaliter",
        "kilostere",
        "hectostere",
        "myrialiter",
        "decastere",
        "kiloliter",
        "stere",
        "double hectoliter",
        "hectoliter",
        "decistere",
        "half hectoliter",
        "quarter hectoliter",
        "double decaliter",
        "decaliter",
        "centistere",
        "half decaliter",
        "cubic decimeter",
        "millistere",
        "deciliter",
        "centiliter",
        "milliliter",
        "cubic centimeter",
        "microliter",
        "cubic millimeter",
        "nanoliter",
        "picoliter",
        "femtoliter",
        "cubic micrometer",
        "attoliter",
        "zeptoliter",
        "yoctoliter",
        "cubic nanometer",
        "rontoliter",
        "quectoliter",
        "cubic picometer",
        "cubic femtometer",
        "cubic attometer",
        "cubic zeptometer",
        "cubic yoctometer",
        "cubic rontometer",
        "cubic quectometer"
    ],
    liquidVolume: [
        "milliliter",
        "centiliter",
        "deciliter",
        "liter",
        "kiloliter",
        "quettaliter",
        "ronnaliter",
        "yottaliter",
        "zettaliter",
        "exaliter",
        "petaliter",
        "teraliter",
        "gigaliter",
        "megaliter",
        "hectoliter",
        "decaliter",
        "microliter",
        "nanoliter",
        "picoliter",
        "femtoliter",
        "attoliter",
        "zeptoliter",
        "yoctoliter",
        "rontoliter",
        "quectoliter"
    ],
    temperature: [
        "kelvin",
        "celsius"
    ]
};
const metricMultipliers = {
    // SI: meters
    length: {
        quettameter: 1e30,
        ronnameter: 1e27,
        yottameter: 1e24,
        zettameter: 1e21,
        exameter: 1e18,
        petameter: 1e15,
        terameter: 1e12,
        gigameter: 1e9,
        hebdometer: 1e7,
        megameter: 1e6,
        myriameter: 1e4,
        "scandinavian mile": 1e4,
        kilometer: 1e3,
        hectometer: 1e2,
        decameter: 1e1,
        meter: 1,
        decimeter: 1e-1,
        centimeter: 1e-2,
        millimeter: 1e-3,
        dimimeter: 1e-4,
        micrometer: 1e-6,
        nanometer: 1e-9,
        "Ångström": 1e-10,
        picometer: 1e-12,
        "Milliångström": 1e-13,
        micrimeter: 1e-14,
        femtometer: 1e-15,
        attometer: 1e-18,
        zeptometer: 1e-21,
        yoctometer: 1e-24,
        rontometer: 1e-27,
        quectometer: 1e-30
    },
    // SI: kilograms
    mass: {
        quettagram: 1e27,
        ronnagram: 1e24,
        yottagram: 1e21,
        zettagram: 1e18,
        exagram: 1e15,
        petagram: 1e12,
        teragram: 1e9,
        gigagram: 1e6,
        "metric tonne": 1e3,
        megagram: 1e3,
        quintal: 1e2,
        bar: 1e3,
        decibar: 1e2,
        centibar: 1e1,
        myriagram: 1e1,
        kilogram: 1,
        grave: 1,
        hectogram: 1e-1,
        decigrave: 1e-1,
        decagram: 1e-2,
        centigrave: 1e-2,
        gram: 1e-3,
        gravet: 1e-3,
        decigram: 1e-4,
        decigravet: 1e-4,
        centigram: 1e-5,
        centigravet: 1e-5,
        milligram: 1e-6,
        milligravet: 1e-6,
        microgram: 1e-9,
        nanogram: 1e-12,
        picogram: 1e-15,
        femtogram: 1e-18,
        attogram: 1e-21,
        zeptogram: 1e-24,
        yoctogram: 1e-27,
        rontogram: 1e-30,
        quectogram: 1e-33,
        "metric carat": 0.0002,
        "metric grain": 0.00005,
        "metric pound": 0.5,
        "metric ounce": 0.1
    },
    // SI: liters
    dryVolume: {
        "cubic quettameter": 1e93,
        "cubic ronnameter": 1e84,
        "cubic yottameter": 1e75,
        "cubic zettameter": 1e66,
        "cubic exameter": 1e57,
        "cubic petameter": 1e48,
        "cubic terameter": 1e39,
        "cubic gigameter": 1e30,
        quettaliter: 1e30,
        "cubic megameter": 1e21,
        ronnaliter: 1e27,
        "cubic kilometer": 1e12,
        yottaliter: 1e24,
        "cubic hectometer": 1e9,
        zettaliter: 1e21,
        "cubic decameter": 1e6,
        exaliter: 1e18,
        petaliter: 1e15,
        teraliter: 1e12,
        gigaliter: 1e9,
        myriastere: 1e7,
        megaliter: 1e6,
        kilostere: 1e6,
        hectostere: 1e5,
        myrialiter: 1e4,
        decastere: 1e4,
        kiloliter: 1e3,
        "cubic meter": 1e3,
        stere: 1e3,
        "double hectoliter": 200,
        hectoliter: 100,
        decistere: 100,
        "half hectoliter": 50,
        "quarter hectoliter": 25,
        "double decaliter": 20,
        decaliter: 10,
        centistere: 10,
        "half decaliter": 5,
        liter: 1,
        "cubic decimeter": 1,
        millistere: 1,
        deciliter: 1e-1,
        centiliter: 1e-2,
        milliliter: 1e-3,
        "cubic centimeter": 1e-3,
        microliter: 1e-6,
        "cubic millimeter": 1e-6,
        nanoliter: 1e-9,
        picoliter: 1e-12,
        femtoliter: 1e-15,
        "cubic micrometer": 1e-15,
        attoliter: 1e-18,
        zeptoliter: 1e-21,
        yoctoliter: 1e-24,
        "cubic nanometer": 1e-24,
        rontoliter: 1e-27,
        quectoliter: 1e-30,
        "cubic picometer": 1e-33,
        "cubic femtometer": 1e-42,
        "cubic attometer": 1e-51,
        "cubic zeptometer": 1e-60,
        "cubic yoctometer": 1e-69,
        "cubic rontometer": 1e-78,
        "cubic quectometer": 1e-87
    },
    // SI: liters
    liquidVolume: {
        quettaliter: 1e30,
        ronnaliter: 1e27,
        yottaliter: 1e24,
        zettaliter: 1e21,
        exaliter: 1e18,
        petaliter: 1e15,
        teraliter: 1e12,
        gigaliter: 1e9,
        megaliter: 1e6,
        kiloliter: 1e3,
        hectoliter: 1e2,
        decaliter: 1e1,
        liter: 1,
        deciliter: 1e-1,
        centiliter: 1e-2,
        milliliter: 1e-3,
        microliter: 1e-6,
        nanoliter: 1e-9,
        picoliter: 1e-12,
        femtoliter: 1e-15,
        attoliter: 1e-18,
        zeptoliter: 1e-21,
        yoctoliter: 1e-24,
        rontoliter: 1e-27,
        quectoliter: 1e-30
    },
    // SI: kelvin
    temperature: {
        kelvin: 1,
        celsius: 1
    }
};

// Imperial
const imperialUnits = {
    length: [
        "inch",
        "foot",
        "yard",
        "mile",
        "nautical league",
        "league",
        "geographical mile",
        "admiralty nautical mile",
        "nautical mile",
        "US survey mile",
        "cable length",
        "furlong",
        "international cable",
        "US survey chain",
        "chain",
        "US survey rod",
        "rod",
        "pole",
        "perch",
        "fathom",
        "ell",
        "cubit",
        "US survey foot",
        "span",
        "US survey link",
        "link",
        "shaftment",
        "hand",
        "palm",
        "nail",
        "US survey inch",
        "fingerbreadth",
        "barleycorn",
        "pica",
        "johnsonpica",
        "line",
        "point",
        "johnsonpoint",
        "thou",
        "mil",
        "twip"
    ],

    mass: [
        "ounce",
        "pound",
        "ton",
        "long ton",
        "long hundredweight",
        "hundredweight",
        "slug",
        "quarter",
        "stone",
        "clove",
        "troy pound",
        "apothecaries pound",
        "troy ounce",
        "apothecaries ounce",
        "apothecaries dram",
        "dram",
        "pennyweight",
        "scruple",
        "grain"
    ],

    dryVolume: [
        "teaspoon",
        "tablespoon",
        "ounce",
        "cup",
        "pint",
        "quart",
        "gallon",
        "acre-foot",
        "acre-inch",
        "cord",
        "register ton",
        "cubic yard",
        "imperial bushel",
        "bushel",
        "cubic foot",
        "imperial peck",
        "peck",
        "imperial gallon",
        "US liquid gallon",
        "board foot",
        "imperial quart",
        "imperial pint",
        "imperial gill",
        "gill",
        "imperial fluid ounce",
        "imperial tablespoon",
        "cubic inch",
        "imperial teaspoon",
        "fluid dram",
        "imperial fluid dram",
        "minim",
        "imperial minim"
    ],

    liquidVolume: [
        "teaspoon",
        "tablespoon",
        "ounce",
        "cup",
        "pint",
        "quart",
        "gallon",
        "acre-foot",
        "acre-inch",
        "register ton",
        "cubic yard",
        "imperial bushel",
        "bushel",
        "cubic foot",
        "imperial peck",
        "peck",
        "imperial gallon",
        "US dry gallon",
        "board foot",
        "imperial quart",
        "US dry quart",
        "imperial pint",
        "US dry pint",
        "imperial gill",
        "gill",
        "imperial fluid ounce",
        "imperial tablespoon",
        "cubic inch",
        "imperial teaspoon",
        "fluid dram",
        "imperial fluid dram",
        "minim",
        "imperial minim"
    ],
    temperature: [
        "fahrenheit"
    ]
};
const imperialMultipliers = {
    // SI: meters
    length: {
        "nautical league": 5556,
        league: 4828.032,
        "geographical mile": 1855.325,
        "admiralty nautical mile": 1853.184,
        "nautical mile": 1852,
        "US survey mile": 5280 * (1200 / 3937),
        mile: 1609.344,
        "cable length": 219.456,
        furlong: 201.168,
        "international cable": 185.2,
        "US survey chain": 66 * (1200 / 3937),
        chain: 20.1168,
        "US survey rod": 16.5 * (1200 / 3937),
        rod: 5.0292,
        pole: 5.0292,
        perch: 5.0292,
        fathom: 1.8288,
        ell: 1.143,
        yard: 0.9144,
        cubit: 0.4572,
        "US survey foot": 1200 / 3937,
        foot: 0.3048,
        span: 0.2286,
        "US survey link": 0.66 * (1200 / 3937),
        link: 0.201168,
        shaftment: 0.1524,
        hand: 0.1016,
        palm: 0.0762,
        nail: 0.05715,
        "US survey inch": 100 / 3937,
        inch: 0.0254,
        fingerbreadth: 0.01905,
        barleycorn: 0.0254 / 3,
        pica: 0.0254 / 6,
        johnsonpica: 0.0042164,
        line: 0.0254 / 12,
        point: 0.0254 / 72,
        johnsonpoint: 0.0042164 / 12,
        thou: 0.0000254,
        mil: 0.0000254,
        twip: 0.0254 / 1440
    },
    // SI: kilograms
    mass: {
        "long ton": 1016.0469088,
        ton: 907.18474,
        "long hundredweight": 50.80234544,
        hundredweight: 45.359237,
        slug: 14.593902937,
        quarter: 12.70058636,
        stone: 6.35029318,
        clove: 3.62873896,
        pound: 0.45359237,
        "troy pound": 0.3732417216,
        "apothecaries pound": 0.3732417216,
        "troy ounce": 0.0311034768,
        "apothecaries ounce": 0.0311034768,
        ounce: 0.028349523125,
        "apothecaries dram": 0.0038879346,
        dram: 0.0017718451953125,
        pennyweight: 0.00155517384,
        scruple: 0.0012959782,
        grain: 0.00006479891
    },
    // SI: liters
    dryVolume: {
        "acre-foot": 1233481.83754752,
        "acre-inch": 102790.15312896,
        cord: 3624.556363776,
        "register ton": 2831.6846592,
        "cubic yard": 764.554857984,
        "imperial bushel": 36.36872,
        bushel: 35.23907016688,
        "cubic foot": 28.316846592,
        "imperial peck": 9.09218,
        peck: 8.80976754172,
        "imperial gallon": 4.54609,
        gallon: 4.40488377086,
        "US liquid gallon": 3.785411784,
        "board foot": 2.359737216,
        "imperial quart": 1.1365225,
        quart: 1.101220942715,
        "imperial pint": 0.56826125,
        pint: 0.5506104713575,
        cup: 0.2365882365,
        "imperial gill": 0.1420653125,
        gill: 0.11829411825,
        ounce: 0.0295735295625,
        "imperial fluid ounce": 0.0284130625,
        "imperial tablespoon": 0.0177581640625,
        "cubic inch": 0.016387064,
        tablespoon: 0.01478676478125,
        "imperial teaspoon": 0.005919388020833333,
        teaspoon: 0.00492892159375,
        "fluid dram": 0.0036966911953125,
        "imperial fluid dram": 0.0035516328125,
        minim: 0.000061611519921875,
        "imperial minim": 0.00005919388020833333
    },
    // SI: liters
    liquidVolume: {
        "acre-foot": 1233481.83754752,
        "acre-inch": 102790.15312896,
        "register ton": 2831.6846592,
        "cubic yard": 764.554857984,
        "imperial bushel": 36.36872,
        bushel: 35.23907016688,
        "cubic foot": 28.316846592,
        "imperial peck": 9.09218,
        peck: 8.80976754172,
        "imperial gallon": 4.54609,
        "US dry gallon": 4.40488377086,
        gallon: 3.785411784,
        "board foot": 2.359737216,
        "imperial quart": 1.1365225,
        "US dry quart": 1.101220942715,
        quart: 0.946352946,
        "imperial pint": 0.56826125,
        "US dry pint": 0.5506104713575,
        pint: 0.473176473,
        cup: 0.2365882365,
        "imperial gill": 0.1420653125,
        gill: 0.11829411825,
        ounce: 0.0295735295625,
        "imperial fluid ounce": 0.0284130625,
        "imperial tablespoon": 0.0177581640625,
        "cubic inch": 0.016387064,
        tablespoon: 0.01478676478125,
        "imperial teaspoon": 0.005919388020833333,
        teaspoon: 0.00492892159375,
        "fluid dram": 0.0036966911953125,
        "imperial fluid dram": 0.0035516328125,
        minim: 0.000061611519921875,
        "imperial minim": 0.00005919388020833333
    },
    // SI: kelvin
    temperature: {
        fahrenheit: 5 / 9
    }
};

/* US Customary (might do this later. might be unnecessary)
const customaryUnits = {

};
*/

// Unit order for intro lines (excluding temperature ones); descending order
const introUnitOrders = {
    time: ["decade", "year", "month", "week", "day", "hour", "minute", "second", "millisecond"],
    length: {
        imperial: ["mile", "yard", "foot", "inch"],
        metric: ["kilometer", "meter", "centimeter", "millimeter"]
    },
    mass: {
        imperial: ["ton", "pound", "ounce"],
        metric: ["kilogram", "gram", "milligram"]
    },
    dryVolume: {
        imperial: ["gallon", "quart", "pint", "cup", "ounce", "tablespoon", "teaspoon"],
        metric: ["cubic meter", "liter"]
    },
    liquidVolume: {
        imperial: ["gallon", "quart", "pint", "cup", "ounce", "tablespoon", "teaspoon"],
        metric: ["kiloliter", "liter", "milliliter"]
    }
};

// Unit SIs
const unitSI = {
    time: "second",
    length: "meter",
    mass: "kilogram",
    volume: "liter",
    temperature: "kelvin"
}

// This function loads the passed measurement files and returns the data
async function loadJSON(jsonFile) {
    const response = await fetch(jsonFile);
    if (!response.ok) {
        throw new Error(
            `Failed to load ${jsonFile}. ` +
            `HTTP status: ${response.status}`
        );
    }

    const data = await response.json();
    return data;
}

// This function normalizes numbers to a maximum of 3 decimal places and removes trailing zeroes. If the number exceeds a certain value, it is shortened to a large-number form.
function formatNumber(number) {
    number = Number(number);

    // Handle invalid or non-finite numbers
    if (Number.isNaN(number)) {
        return "NaN";
    }

    if (!Number.isFinite(number)) {
        return String(number);
    }

    const absNumber = Math.abs(number);
    // Format and return number in exponential notation if it is about to exceed JavaScript's max finite number, 1.797693e308
    if (absNumber > 1.79e308) {
        return number.toExponential(4);
    }

    // Format and return number normally if it is below 1 billion
    if (absNumber < 1e9) {
        return Number(number.toFixed(3)).toLocaleString();
    }

    // Calculate the largest power of 1000 represented
    const exponent = Math.floor(Math.log10(absNumber));
    let power = Math.floor(exponent / 3) * 3;

    // Find the coefficient
    let shortNumber = absNumber / (10 ** power);

    // Round to four decimal places
    shortNumber = Number(shortNumber.toFixed(3));

    // If rounding produces 1000, move to the next large-number label
    if (shortNumber >= 1000 && power < 306) {
        shortNumber /= 1000;
        power += 3;
    }

    // Get the corresponding large-number label
    const largeNumberLabel = getLargeNumberLabel(power);

    // Restore the negative sign if necessary
    const sign = number < 0 ? "-" : "";

    return `${sign}${shortNumber.toLocaleString()} ${largeNumberLabel}`;
}

// This function returns the label for a large number.
// Cool fact: I got this idea after seeing idle games do this kind of number formatting.
function getLargeNumberLabel(power) {
    const index = (power / 3) - 1;
    const basicLabels = [
        "million",
        "billion",
        "trillion",
        "quadrillion",
        "quintillion",
        "sextillion",
        "septillion",
        "octillion",
        "nonillion",
        "decillion",
        "undecillion",
        "duodecillion",
        "tredecillion",
        "quattuordecillion",
        "quindecillion",
        "sexdecillion",
        "septendecillion",
        "octodecillion",
        "novemdecillion"
    ];

    // Handle the first 19 basic labels
    if (index < basicLabels.length) {
        return basicLabels[index];
    }

    // Handle indexes 100 and 101
    if (index === 100) {
        return "centillion"
    }
    if (index === 101) {
        return "uncentillion"
    }

    // Tens prefixes for indexes from 20 to 99.
    const tensLabels = {
        20: "vigintillion",
        30: "trigintillion",
        40: "quadragintillion",
        50: "quinquagintillion",
        60: "sexagintillion",
        70: "septuagintillion",
        80: "octogintillion",
        90: "nonagintillion"
    };

    const unitPrefixes = [
        "",
        "un",
        "duo",
        "tres",
        "quattuor",
        "quin",
        "sex",
        "septen",
        "octo",
        "novem"
    ];

    const tens = Math.floor(index / 10) * 10;
    const units = index % 10;

    if (units === 0) {
        return tensLabels[tens];
    }

    return unitPrefixes[units] + tensLabels[tens];
}
// This function handles the return of results for the passed units list, that is additive (so basically everything except temperature)
function getAdditiveResults(unitsList, conversionList, unitOrder, introUnitOrder) {
    let entriesToDisplay = [];
    let singleUnit = null;
    let singleUnitValue = 0;
    let resultsString = "";

    // Store value as a single-unit decimal number, starting from the highest ranked, non-zero unit defined
    for (const unit of introUnitOrder) {
        const value = Number(unitsList[unit]);
        if (Number.isFinite(value) && value !== 0) {
            singleUnit = unit;
            break;
        }
    }

    // Handle if nothing was entered (for redundancy)
    if (singleUnit === null) {
        return "Please enter at least one value.";
    }

    // Get the total measurement expressed as the selected single unit
    singleUnitValue = conversionList[singleUnit];

    // Build a list of what the user originally entered
    for (const unit of introUnitOrder) {
        const value = Number(unitsList[unit]);

        if (Number.isFinite(value) && value !== 0) {
            entriesToDisplay.push(
                `${formatNumber(value)} ${pluralizeUnit(unit, value)}`
            );
        }
    }

    // Build the introductory line
    if (entriesToDisplay.length === 1) {
        resultsString =
            `<div class="tape-h2">${entriesToDisplay[0]} is roughly:<br></div>`;
    } else {
        resultsString =
            `<div class="tape-h2">${entriesToDisplay.join(", ")} ` +
            `is roughly:<br></div>`;
    }

    // Display results
    resultsString += formatConversions(conversionList, unitOrder);

    // results.innerHTML = resultsString;
    return resultsString;
}

// This function handles the return of results for temperature conversions.
function getTemperatureResults(unitsList, conversionList, unitOrder) {
    let enteredUnit = null;
    let enteredValue = null;
    let resultsString = ``;

    for (const unit of unitOrder) {
        const value = Number(unitsList[unit]);

        if (Number.isFinite(value) && value !== 0) {
            enteredUnit = unit;
            enteredValue = value;
            break;
        }
    }

    if (enteredUnit === null) {
        return "Please enter a temperature.";
    }

    // If imperial, that likely means it'll just be fahrenheit. So, we'll skip the "is roughly" part since it would just be redundant to state the temp again.
    if (currentMeasurementSystem === "imperial") {
        resultsString =
            `<div class="tape-h2">${formatNumber(enteredValue)} ${pluralizeUnit(enteredUnit, enteredValue)} <br></div>`;
    } else {
        resultsString =
            `<div class="tape-h2">${formatNumber(enteredValue)} ${pluralizeUnit(enteredUnit, enteredValue)} ` +
            `is roughly:<br></div>`;
        resultsString += formatConversions(conversionList, unitOrder);
    }

    return resultsString;
}

// This function handles the input validation and input locking for temperature HTML fields. If any of the given fields have text in them, the other fields are locked.
function handleTemperatureFields(activeElem, otherElems) {
    const hasValue = activeElem.value !== "";

    for (const elem of otherElems) {
        elem.disabled = hasValue;
    }
}

// This function formats the output of conversion lists
function formatConversions(conversionList, unitOrder) {
    let resultsString = "";
    for (const unit of unitOrder) {
        const value = conversionList[unit];

        // Skip invalid values or those without conversion
        if (typeof value !== "number" || !Number.isFinite(value)) {
            console.warn(`Invalid or missing conversion value for: ${unit}`);
            continue;
        }

        // Skip values that round to 0.000
        if (Math.abs(value) < 0.0005) {
            continue;
        }

        const formattedValue = formatNumber(value);
        resultsString +=
            `<h3>${formattedValue} ` +
            `${pluralizeUnit(unit, value)}</h3>`;
    }

    return resultsString;
}

// This function formats the pluralizing of unit names
function pluralizeUnit(unit, value) {
    if (value === 1) {
        return unit;
    }
    const irregularPlurals = {
        foot: "feet",
        inch: "inches",
        kelvin: "degrees kelvin",
        fahrenheit: "degrees fahrenheit",
        celsius: "degrees celsius"
    };

    return irregularPlurals[unit] ?? `${unit}s`;
}

// This function does the conversion calculation for the passed length measurement into all other available units.
function convertUnitsLength(units, fromUnit, toUnit) {
    units = Number(units);
    let unitsSI = 0;
    let convertedLength = 0;

    // Convert the input into SI (meters)
    if (metricUnits.length.includes(fromUnit)) {
        unitsSI = units * metricMultipliers.length[fromUnit];
    } else if (imperialUnits.length.includes(fromUnit)) {
        unitsSI = units * imperialMultipliers.length[fromUnit];
    }
    // Convert SI (meters) into the requested unit
    if (metricUnits.length.includes(toUnit)) {
        convertedLength = unitsSI / metricMultipliers.length[toUnit];
    } else if (imperialUnits.length.includes(toUnit)) {
        convertedLength = unitsSI / imperialMultipliers.length[toUnit];
    }

    return convertedLength;
}

// This function does the conversion calculation for the passed weight measurement into all other available units.
function convertUnitsMass(units, fromUnit, toUnit) {
    units = Number(units);
    let unitsSI = 0;
    let convertedMass = 0;

    // Convert the input into SI (kilograms)
    if (metricUnits.mass.includes(fromUnit)) {
        unitsSI = units * metricMultipliers.mass[fromUnit];
    } else if (imperialUnits.mass.includes(fromUnit)) {
        unitsSI = units * imperialMultipliers.mass[fromUnit];
    }
    // Convert SI (kilograms) into the requested unit
    if (metricUnits.mass.includes(toUnit)) {
        convertedMass = unitsSI / metricMultipliers.mass[toUnit];
    } else if (imperialUnits.mass.includes(toUnit)) {
        convertedMass = unitsSI / imperialMultipliers.mass[toUnit];
    }

    return convertedMass;
}

// This function does the conversion calculation for the passed dry volume measurement into all other available units.
function convertUnitsDryVolume(units, fromUnit, toUnit) {
    units = Number(units);
    let unitsSI = 0;
    let convertedDryVolume = 0;

    // Normalize any dryounce input to match the multiplier list
    if (fromUnit === "dryounce") {
        fromUnit = "ounce";
    }
    if (toUnit === "dryounce") {
        toUnit = "ounce";
    }

    // Convert the input into SI (liters)
    if (metricUnits.dryVolume.includes(fromUnit)) {
        unitsSI = units * metricMultipliers.dryVolume[fromUnit];
    } else if (imperialUnits.dryVolume.includes(fromUnit)) {
        unitsSI = units * imperialMultipliers.dryVolume[fromUnit];
    }
    // Convert SI (liters) into the requested unit
    if (metricUnits.dryVolume.includes(toUnit)) {
        convertedDryVolume = unitsSI / metricMultipliers.dryVolume[toUnit];
    } else if (imperialUnits.dryVolume.includes(toUnit)) {
        convertedDryVolume = unitsSI / imperialMultipliers.dryVolume[toUnit];
    }

    return convertedDryVolume;
}

// This function does the conversion calculation for the passed liquid volume measurement into all other available units.
function convertUnitsLiquidVolume(units, fromUnit, toUnit) {
    units = Number(units);
    let unitsSI = 0;
    let convertedLiquidVolume = 0;

    // Convert the input into SI (liters)
    if (metricUnits.liquidVolume.includes(fromUnit)) {
        unitsSI = units * metricMultipliers.liquidVolume[fromUnit];
    } else if (imperialUnits.liquidVolume.includes(fromUnit)) {
        unitsSI = units * imperialMultipliers.liquidVolume[fromUnit];
    }
    // Convert SI (liters) into the requested unit
    if (metricUnits.liquidVolume.includes(toUnit)) {
        convertedLiquidVolume = unitsSI / metricMultipliers.liquidVolume[toUnit];
    } else if (imperialUnits.liquidVolume.includes(toUnit)) {
        convertedLiquidVolume = unitsSI / imperialMultipliers.liquidVolume[toUnit];
    }

    return convertedLiquidVolume;
}

// This function does the conversion calculation for the passed time measurement into all other available units.
function convertUnitsTime(units, fromUnit, toUnit) {
    units = Number(units);
    let unitsSI = 0;
    let convertedTime = 0;

    // Convert the input into seconds
    unitsSI = units * globalMultipliers.time[fromUnit];

    // Convert seconds into the requested unit
    convertedTime = unitsSI / globalMultipliers.time[toUnit];

    return convertedTime;
}

// This function does the conversion calculation for the passed temperature measurement into all other available units.
function convertUnitsTemperature(units, fromUnit, toUnit) {
    units = Number(units);

    let unitsSI = 0;
    let convertedTemperature = 0;

    if (metricUnits.temperature.includes(fromUnit)) {
        // SI base unit: kelvin
        if (fromUnit === "kelvin") {
            unitsSI = units;
        } else {
            unitsSI = units + 273.15;
        }

        // Make copy of unitsSI and convert it to the SI base unit for imperial
        const imperialSI = 9/5 * (unitsSI - 273.15) + 32;

        if (toUnit === "kelvin") {
            convertedTemperature = unitsSI;
        } else if (toUnit === "celsius") {
            convertedTemperature = unitsSI - 273.15;
        } else if (toUnit === "fahrenheit") {
            convertedTemperature = imperialSI;
        }
    } else if (imperialUnits.temperature.includes(fromUnit)){
        switch (fromUnit) {
            case "fahrenheit":
                unitsSI = units;
                break;
        }

        // Make copy of unitsSI and convert it to the SI base unit for imperial
        const metricSI = (unitsSI + 459.67) * 5/9;
        switch (toUnit) {
            case "fahrenheit":
                convertedTemperature = unitsSI;
                break;
            case "kelvin":
                convertedTemperature = metricSI;
                break;
            case "celsius":
                convertedTemperature = metricSI - 273.15;
                break;
        }
    }

    return convertedTemperature;
}

// This function calls the calculations and displays the results to the user
async function universalMeasurementConversion(unitsList) {
    console.log("Current system: ", currentMeasurementSystem);
    console.log("Current tab: ", currentTab);
    console.log("Data in unitsList:");
    for (const key in unitsList) {
        if (unitsList.hasOwnProperty(key)) {
            console.log(`${key}: ${unitsList[key]}`);
        }
    }

    // Verify that the user has entered something. Display a message if they havent and terminate this function.
    // This was added waaaay far along into coding. Would've just done a full refactor but I'm lazy, and this method is quicker anyways.
    const hasEnteredValue = Object.values(unitsList).some(value => {
        const numericValue = Number(value);
        return Number.isFinite(numericValue) && numericValue !== 0;
    });

    if (!hasEnteredValue) {
        results.innerHTML = "Please enter at least one value.";
        return;
    }
    let formattedInput = "";
    let conversionList = {};
    let metricUnitsList = {}
    let metricConversionList = {};
    let imperialUnitsList = {};
    let imperialConversionList = {};
    let resultsString = ``;
    if (currentTab === "Length") {
        console.log("Performing calculation for length...");
        let unitsSI = 0;
        let measurementComparisons = {};

        if (currentMeasurementSystem === "metric") {
            metricUnitsList = unitsList;
            console.log("Current system is metric. Performing metric calculations first.");
            // Step through unitsList
            // For each non-SI unitsList entry that isn't null or zero:
                // Break down units to SI
                // Add result to unitsSI
            for (const key in metricUnitsList) {
                if (metricUnitsList.hasOwnProperty(key)) {
                    const itemSI = convertUnitsLength(metricUnitsList[key], key, "meter");
                    unitsSI += itemSI;
                }
            }
            // Calculate and return decimal version of unitsSI in all available units
            metricConversionList = {};
            for (const unit of metricUnits.length) {
                metricConversionList[unit] = convertUnitsLength(
                    unitsSI,
                    unitSI.length,
                    unit
                );
            }
            console.log("Metric calculations complete.");
            for (const key in metricConversionList) {
                if (metricConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} meters in ${key}s: ${metricConversionList[key]}`);
                }
            }
            // Format metric conversion results
            resultsString += getAdditiveResults(metricUnitsList, metricConversionList, metricUnits.length, introUnitOrders.length.metric);

            // Calculate imperial conversions
            console.log("Performing imperial calculations...");
            imperialConversionList = {};
            for (const unit of imperialUnits.length) {
                imperialConversionList[unit] = convertUnitsLength(
                    unitsSI,
                    unitSI.length,
                    unit
                );
            }

            console.log("Imperial calculations complete.")
            for (const key in imperialConversionList) {
                if (imperialConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} meters in ${key}s: ${imperialConversionList[key]}`);
                }
            }

            // Format imperial conversion results
            resultsString += 
                `<div class="tape-h2">In imperial units, that's roughly:<br></div>`;
            
            resultsString += formatConversions(imperialConversionList, imperialUnits.length);


        } else if (currentMeasurementSystem === "imperial") {
            imperialUnitsList = unitsList;
            console.log("Current system is imperial. Performing imperial calculations first.");
            for (const key in imperialUnitsList) {
                if (imperialUnitsList.hasOwnProperty(key)) {
                    const itemSI = convertUnitsLength(imperialUnitsList[key], key, "meter");
                    unitsSI += itemSI;
                }
            }
            // Calculate and return decimal version of unitsSI in all available units
            imperialConversionList = {};
            for (const unit of imperialUnits.length) {
                imperialConversionList[unit] = convertUnitsLength(
                    unitsSI,
                    unitSI.length,
                    unit
                );
            }
            console.log("Imperial calculations complete.");
            for (const key in imperialConversionList) {
                if (imperialConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} meters in ${key}s: ${imperialConversionList[key]}`);
                }
            }
            
            // Format imperial conversion results
            resultsString += getAdditiveResults(imperialUnitsList, imperialConversionList, imperialUnits.length, introUnitOrders.length.imperial);
            
            // Calculate metric conversions
            console.log("Performing metric calculations...");
            metricConversionList = {};
            for (const unit of metricUnits.length) {
                metricConversionList[unit] = convertUnitsLength(
                    unitsSI,
                    unitSI.length,
                    unit
                );
            }
            console.log("Metric calculations complete.");
            for (const key in metricConversionList) {
                if (metricConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} meters in ${key}s: ${metricConversionList[key]}`);
                }
            }
            
            resultsString +=
                `<div class="tape-h2">In metric units, that's roughly:<br></div>`;

            resultsString += formatConversions(metricConversionList, metricUnits.length);
        }

        // Run measurement comparison calculations
        console.log("Performing length comparison calculations...");

        // Load the JSON and wait until it is available
        const jsonData = await loadJSON(unitsJSONs.length);

        // Extract the length entries from the JSON object
        const lengthEntries = jsonData.lengths;

        // Compare the user's measurement against each reference item
        measurementComparisons = measurementComparison(
            unitsSI,
            unitSI.length,
            lengthEntries,
            "length"
        );

        // Format comparison results
        let comparisonResults = "";

        if (measurementComparisons.length > 0) {
            comparisonResults += `<div class="tape-h2">For reference, that's roughly:<br></div>`;

            for (const entry of measurementComparisons) {
                const formattedQuotient = formatNumber(entry.quotient);
                const imageHTML = entry.image
                    ? `<img
                        src="${entry.image}"
                        alt="${entry.item}"
                        class="comparisonImage"
                        loading="lazy"
                    >`
                    : "";

                comparisonResults += `
                    <div class="comparisonEntry">
                        <h2>${entry.item} (x ${formattedQuotient})</h2>
                        ${imageHTML}
                        <h3>${entry.sentence}</h3>
                    </div>
                `;
            }
        } else {
            comparisonResults +=
                `<div class="tape-h2">For reference:<br></div>` +
                `<h3>No applicable comparisons were found. More items for comparison will be added in the future. Check back later, or enter a new measurement!</h3>`;
        }

        resultsString += comparisonResults;

        console.log("Length comparison calculations complete.");
        
        // Display results
        results.innerHTML = resultsString;

    } else if (currentTab === "Mass") {
        console.log("Performing calculation for mass...");
        let unitsSI = 0;
        if (currentMeasurementSystem === "metric") {
            metricUnitsList = unitsList;
            console.log("Current system is metric. Performing metric calculations first.");
            for (const key in metricUnitsList) {
                if (metricUnitsList.hasOwnProperty(key)) {
                    const itemSI = convertUnitsMass(metricUnitsList[key], key, "kilogram");
                    unitsSI += itemSI;
                }
            }
            // Calculate and return decimal version of unitsSI in all available units
            metricConversionList = {};
            for (const unit of metricUnits.mass) {
                metricConversionList[unit] = convertUnitsMass(
                    unitsSI,
                    unitSI.mass,
                    unit
                );
            }
            console.log("Metric calculations complete.");
            for (const key in metricConversionList) {
                if (metricConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} kilograms in ${key}s: ${metricConversionList[key]}`);
                }
            }

            // Format metric conversion results
            resultsString += getAdditiveResults(metricUnitsList, metricConversionList, metricUnits.mass, introUnitOrders.mass.metric);

            // Calculate imperial conversions
            console.log("Performing imperial calculations...");
            imperialConversionList = {};

            for (const unit of imperialUnits.mass) {
                imperialConversionList[unit] = convertUnitsMass(
                    unitsSI,
                    unitSI.mass,
                    unit
                );
            }

            console.log("Imperial calculations complete.")
            for (const key in imperialConversionList) {
                if (imperialConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} kilograms in ${key}s: ${imperialConversionList[key]}`);
                }
            }

            // Format imperial conversion results
            resultsString += 
                `<div class="tape-h2">In imperial units, that's roughly:<br></div>`;
            
            resultsString += formatConversions(imperialConversionList, imperialUnits.mass);
        
        } else if (currentMeasurementSystem === "imperial") {
            imperialUnitsList = unitsList;
            console.log("Current system is imperial. Performing imperial calculations first.");
            for (const key in imperialUnitsList) {
                if (imperialUnitsList.hasOwnProperty(key)) {
                    const itemSI = convertUnitsMass(imperialUnitsList[key], key, "kilogram");
                    unitsSI += itemSI;
                }
            }
            // Calculate and return decimal version of unitsSI in all available units
            imperialConversionList = {};

            for (const unit of imperialUnits.mass) {
                imperialConversionList[unit] = convertUnitsMass(
                    unitsSI,
                    unitSI.mass,
                    unit
                );
            }
            console.log("Imperial calculations complete.");
            for (const key in imperialConversionList) {
                if (imperialConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} kilograms in ${key}s: ${imperialConversionList[key]}`);
                }
            }

            // Format imperial conversion results
            resultsString += getAdditiveResults(imperialUnitsList, imperialConversionList, imperialUnits.mass, introUnitOrders.mass.imperial);

            // Calculate metric conversions
            console.log("Performing metric calculations...");
            metricConversionList = {};

            for (const unit of metricUnits.mass) {
                metricConversionList[unit] = convertUnitsMass(
                    unitsSI,
                    unitSI.mass,
                    unit
                );
            }

            console.log("Metric calculations complete.")
            for (const key in metricConversionList) {
                if (metricConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} kilograms in ${key}s: ${metricConversionList[key]}`);
                }
            }

            // Format metric conversion results
            resultsString +=
                `<div class="tape-h2">In metric units, that's roughly:<br></div>`;

            resultsString += formatConversions(metricConversionList, metricUnits.mass);
        }

        // Run measurement comparison calculations
        console.log("Performing mass comparison calculations...");

        // Load the JSON and wait until it is available
        const jsonData = await loadJSON(unitsJSONs.mass);

        // Extract the length entries from the JSON object
        const weightEntries = jsonData.weights;

        // Compare the user's measurement against each reference item
        measurementComparisons = measurementComparison(
            unitsSI,
            unitSI.mass,
            weightEntries,
            "mass"
        );

        // Format comparison results
        let comparisonResults = "";

        if (measurementComparisons.length > 0) {
            comparisonResults += `<div class="tape-h2">For reference, that's roughly:<br></div>`;

            for (const entry of measurementComparisons) {
                const formattedQuotient = formatNumber(entry.quotient);
                const imageHTML = entry.image
                    ? `<img
                        src="${entry.image}"
                        alt="${entry.item}"
                        class="comparisonImage"
                        loading="lazy"
                    >`
                    : "";

                comparisonResults += `
                    <div class="comparisonEntry">
                        <h2>${entry.item} (x ${formattedQuotient})</h2>
                        ${imageHTML}
                        <h3>${entry.sentence}</h3>
                    </div>
                `;
            }
        } else {
            comparisonResults +=
                `<div class="tape-h2">For reference:<br></div>` +
                `<h3>No applicable comparisons were found. More items for comparison will be added in the future. Check back later, or enter a new measurement!</h3>`;
        }

        resultsString += comparisonResults;

        console.log("Mass comparison calculations complete.");

        results.innerHTML = resultsString;

    } else if (currentTab === "Dry") {
        console.log("Performing calculation for dry volume...");
        let unitsSI = 0;
        if (currentMeasurementSystem === "metric") {
            metricUnitsList = unitsList;
            console.log("Current system is metric. Performing metric calculations first.");
            for (const key in metricUnitsList) {
                if (metricUnitsList.hasOwnProperty(key)) {
                    const itemSI = convertUnitsDryVolume(metricUnitsList[key], key, "liter");
                    unitsSI += itemSI;
                }
            }
            // Calculate and return decimal version of unitsSI in all available units
            metricConversionList = {};

            for (const unit of metricUnits.dryVolume) {
                metricConversionList[unit] = convertUnitsDryVolume(
                    unitsSI,
                    unitSI.volume,
                    unit
                );
            }
            console.log("Calculations complete.");
            for (const key in metricConversionList) {
                if (metricConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} liters in ${key}s: ${metricConversionList[key]}`);
                }
            }

            // Format metric conversion results
            resultsString += getAdditiveResults(metricUnitsList, metricConversionList, metricUnits.dryVolume, introUnitOrders.dryVolume.metric);

            // Calculate imperial conversions
            console.log("Performing imperial calculations...");
            imperialConversionList = {};

            for (const unit of imperialUnits.dryVolume) {
                imperialConversionList[unit] = convertUnitsDryVolume(
                    unitsSI,
                    unitSI.volume,
                    unit
                );
            }

            console.log("Imperial calculations complete.")
            for (const key in imperialConversionList) {
                if (imperialConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} liters in ${key}s: ${imperialConversionList[key]}`);
                }
            }

            // Format imperial conversion results
            resultsString += 
                `<div class="tape-h2">In imperial units, that's roughly:<br></div>`;
            
            resultsString += formatConversions(imperialConversionList, imperialUnits.dryVolume);

        } else if (currentMeasurementSystem === "imperial") {
            imperialUnitsList = unitsList;
            console.log("Current system is imperial. Performing imperial calculations first.");
            for (const key in imperialUnitsList) {
                if (imperialUnitsList.hasOwnProperty(key)) {
                    const itemSI = convertUnitsDryVolume(imperialUnitsList[key], key, "liter");
                    unitsSI += itemSI;
                }
            }
            // Calculate and return decimal version of unitsSI in all available units
            imperialConversionList = {};

            for (const unit of imperialUnits.dryVolume) {
                imperialConversionList[unit] = convertUnitsDryVolume(
                    unitsSI,
                    unitSI.volume,
                    unit
                );
            }
            
            console.log("Imperial calculations complete.");
            for (const key in imperialConversionList) {
                if (imperialConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} liters in ${key}s: ${imperialConversionList[key]}`);
                }
            }

            // Format imperial conversion results
            resultsString += getAdditiveResults(imperialUnitsList, imperialConversionList, imperialUnits.dryVolume, introUnitOrders.dryVolume.imperial);

            // Calculate metric conversions
            console.log("Performing metric calculations...");
            metricConversionList = {};

            for (const unit of metricUnits.dryVolume) {
                metricConversionList[unit] = convertUnitsDryVolume(
                    unitsSI,
                    unitSI.volume,
                    unit
                );
            }

            console.log("Metric calculations complete.")
            for (const key in metricConversionList) {
                if (metricConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} liters in ${key}s: ${metricConversionList[key]}`);
                }
            }

            // Format metric conversion results
            resultsString +=
                `<div class="tape-h2">In metric units, that's roughly:<br></div>`;

            resultsString += formatConversions(metricConversionList, metricUnits.dryVolume);

        }

        // Run measurement comparison calculations
        console.log("Performing volume comparison calculations...");

        // Load the JSON and wait until it is available
        const jsonData = await loadJSON(unitsJSONs.dryVolume);

        // Extract the length entries from the JSON object
        const dryEntries = jsonData.dryvolume;

        // Compare the user's measurement against each reference item
        measurementComparisons = measurementComparison(
            unitsSI,
            unitSI.volume,
            dryEntries,
            "dry volume"
        );

        // Format comparison results
        let comparisonResults = "";

        if (measurementComparisons.length > 0) {
            comparisonResults += `<div class="tape-h2">For reference, that's roughly:<br></div>`;

            for (const entry of measurementComparisons) {
                const formattedQuotient = formatNumber(entry.quotient);
                const imageHTML = entry.image
                    ? `<img
                        src="${entry.image}"
                        alt="${entry.item}"
                        class="comparisonImage"
                        loading="lazy"
                    >`
                    : "";

                comparisonResults += `
                    <div class="comparisonEntry">
                        <h2>${entry.item} (x ${formattedQuotient})</h2>
                        ${imageHTML}
                        <h3>${entry.sentence}</h3>
                    </div>
                `;
            }
        } else {
            comparisonResults +=
                `<div class="tape-h2">For reference:<br></div>` +
                `<h3>No applicable comparisons were found. More items for comparison will be added in the future. Check back later, or enter a new measurement!</h3>`;
        }

        resultsString += comparisonResults;

        console.log("Volume comparison calculations complete.");

        results.innerHTML = resultsString;
    } else if (currentTab === "Liquid") {
        console.log("Performing calculation for liquid volume...");
        let unitsSI = 0;
        if (currentMeasurementSystem === "metric") {
            metricUnitsList = unitsList;
            console.log("Current system is metric. Performing metric calculations first.");
            for (const key in metricUnitsList) {
                if (metricUnitsList.hasOwnProperty(key)) {
                    const itemSI = convertUnitsLiquidVolume(metricUnitsList[key], key, "liter");
                    unitsSI += itemSI;
                }
            }
            // Calculate and return decimal version of unitsSI in all available units
            metricConversionList = {};

            for (const unit of metricUnits.liquidVolume) {
                metricConversionList[unit] = convertUnitsLiquidVolume(
                    unitsSI,
                    unitSI.volume,
                    unit
                );
            }
            console.log("Metric calculations complete.");
            for (const key in metricConversionList) {
                if (metricConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} liters in ${key}s: ${metricConversionList[key]}`);
                }
            }

            // Format metric conversion results
            resultsString += getAdditiveResults(metricUnitsList, metricConversionList, metricUnits.liquidVolume, introUnitOrders.liquidVolume.metric);

            // Calculate imperial conversions
            console.log("Performing imperial calculations...");
            imperialConversionList = {};

            for (const unit of imperialUnits.liquidVolume) {
                imperialConversionList[unit] = convertUnitsLiquidVolume(
                    unitsSI,
                    unitSI.volume,
                    unit
                );
            }

            console.log("Imperial calculations complete.")
            for (const key in imperialConversionList) {
                if (imperialConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} liters in ${key}s: ${imperialConversionList[key]}`);
                }
            }

            // Format imperial conversion results
            resultsString += 
                `<div class="tape-h2">In imperial units, that's roughly:<br></div>`;
            
            resultsString += formatConversions(imperialConversionList, imperialUnits.liquidVolume);        


        } else if (currentMeasurementSystem === "imperial") {
            imperialUnitsList = unitsList;
            console.log("Current system is imperial. Performing imperial calculations first.");
            for (const key in imperialUnitsList) {
                if (imperialUnitsList.hasOwnProperty(key)) {
                    const itemSI = convertUnitsLiquidVolume(imperialUnitsList[key], key, "liter");
                    unitsSI += itemSI;
                }
            }
            // Calculate and return decimal version of unitsSI in all available units
            imperialConversionList = {};

            for (const unit of imperialUnits.liquidVolume) {
                imperialConversionList[unit] = convertUnitsLiquidVolume(
                    unitsSI,
                    unitSI.volume,
                    unit
                );
            }
            console.log("Imperial calculations complete.");
            for (const key in imperialConversionList) {
                if (imperialConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} liters in ${key}s: ${imperialConversionList[key]}`);
                }
            }

            // Format imperial conversion results
            resultsString += getAdditiveResults(imperialUnitsList, imperialConversionList, imperialUnits.liquidVolume, introUnitOrders.liquidVolume.imperial);

            // Calculate metric conversions
            console.log("Performing metric calculations...");
            metricConversionList = {};

            for (const unit of metricUnits.liquidVolume) {
                metricConversionList[unit] = convertUnitsLiquidVolume(
                    unitsSI,
                    unitSI.volume,
                    unit
                );
            }

            console.log("Metric calculations complete.")
            for (const key in metricConversionList) {
                if (metricConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} liters in ${key}s: ${metricConversionList[key]}`);
                }
            }

            // Format metric conversion results
            resultsString +=
                `<div class="tape-h2">In metric units, that's roughly:<br></div>`;

            resultsString += formatConversions(metricConversionList, metricUnits.liquidVolume);

        }

        // Run measurement comparison calculations
        console.log("Performing volume comparison calculations...");

        // Load the JSON and wait until it is available
        const jsonData = await loadJSON(unitsJSONs.liquidVolume);

        // Extract the length entries from the JSON object
        const liquidEntries = jsonData.liquidvolume;

        // Compare the user's measurement against each reference item
        measurementComparisons = measurementComparison(
            unitsSI,
            unitSI.volume,
            liquidEntries,
            "liquid volume"
        );

        // Format comparison results
        let comparisonResults = "";

        if (measurementComparisons.length > 0) {
            comparisonResults += `<div class="tape-h2">For reference, that's roughly:<br></div>`;

            for (const entry of measurementComparisons) {
                const formattedQuotient = formatNumber(entry.quotient);
                const imageHTML = entry.image
                    ? `<img
                        src="${entry.image}"
                        alt="${entry.item}"
                        class="comparisonImage"
                        loading="lazy"
                    >`
                    : "";

                comparisonResults += `
                    <div class="comparisonEntry">
                        <h2>${entry.item} (x ${formattedQuotient})</h2>
                        ${imageHTML}
                        <h3>${entry.sentence}</h3>
                    </div>
                `;
            }
        } else {
            comparisonResults +=
                `<div class="tape-h2">For reference:<br></div>` +
                `<h3>No applicable comparisons were found. More items for comparison will be added in the future. Check back later, or enter a new measurement!</h3>`;
        }

        resultsString += comparisonResults;

        console.log("Volume comparison calculations complete.");

        results.innerHTML = resultsString;
    } else if (currentTab === "Time") {
        // SI base unit: second
        console.log("Performing calculation for time...");
        let unitsSI = 0;
        // Step through unitsList
        // For each non-SI unitsList entry that isn't null or zero:
            // Break down units to SI, either imperial or metric which is defined in "currentMeasurementSystem"
            // Add result to unitsSI
        for (const key in unitsList) {
            if (unitsList.hasOwnProperty(key)) {
                const itemSI = convertUnitsTime(unitsList[key], key, "second");
                unitsSI += itemSI;
            }
        }
        // Calculate and return decimal version of unitsSI in all available units
        conversionList = {}
        for (const unit of globalUnits.time) {
            conversionList[unit] = convertUnitsTime(
                unitsSI,
                unitSI.time,
                unit
            )
        }
    
        console.log("Calculations complete.");
        for (const key in conversionList) {
            if (conversionList.hasOwnProperty(key)) {
                console.log(`${unitsSI} seconds in ${key}s: ${conversionList[key]}`);
            }
        }

        // Display results
        resultsString += getAdditiveResults(unitsList, conversionList, globalUnits.time, introUnitOrders.time);

        // Run measurement comparison calculations
        console.log("Performing time comparison calculations...");

        // Load the JSON and wait until it is available
        const jsonData = await loadJSON(unitsJSONs.time);

        // Extract the length entries from the JSON object
        const timeEntries = jsonData.times;

        // Compare the user's measurement against each reference item
        measurementComparisons = measurementComparison(
            unitsSI,
            unitSI.time,
            timeEntries,
            "time"
        );

        // Format comparison results
        let comparisonResults = "";

        if (measurementComparisons.length > 0) {
            comparisonResults += `<div class="tape-h2">For reference, that's roughly:<br></div>`;

            for (const entry of measurementComparisons) {
                const formattedQuotient = formatNumber(entry.quotient);
                const imageHTML = entry.image
                    ? `<img
                        src="${entry.image}"
                        alt="${entry.item}"
                        class="comparisonImage"
                        loading="lazy"
                    >`
                    : "";

                comparisonResults += `
                    <div class="comparisonEntry">
                        <h2>${entry.item} (x ${formattedQuotient})</h2>
                        ${imageHTML}
                        <h3>${entry.sentence}</h3>
                    </div>
                `;
            }
        } else {
            comparisonResults +=
                `<div class="tape-h2">For reference:<br></div>` +
                `<h3>No applicable comparisons were found. More items for comparison will be added in the future. Check back later, or enter a new measurement!</h3>`;
        }

        resultsString += comparisonResults;

        console.log("Time comparison calculations complete.");

        results.innerHTML = resultsString;


    } else if (currentTab === "Temperature") {
        console.log("Performing calculation for temperature...");
        let unitsSI = 0;
        if (currentMeasurementSystem === "metric") {
            metricUnitsList = unitsList;
            console.log("Current system is metric. Performing metric calculations first.");
            for (const key in metricUnitsList) {
                if (metricUnitsList.hasOwnProperty(key)) {
                    const value = Number(metricUnitsList[key]);

                    if (Number.isFinite(value) && value !== 0) {
                        unitsSI = convertUnitsTemperature(value, key, "kelvin");
                        break;
                    }
                }
            }
            // Calculate and return decimal version of unitsSI in all available units
            metricConversionList = {
                kelvin: unitsSI,
                celsius: convertUnitsTemperature(unitsSI, "kelvin", "celsius")
            };
            console.log("Metric calculations complete.");
            for (const key in metricConversionList) {
                if (metricConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} kelvin in ${key}s: ${metricConversionList[key]}`);
                }
            }
            // Format metric conversion results
            resultsString += getTemperatureResults(metricUnitsList, metricConversionList, metricUnits.temperature);

            // Calculate imperial conversions
            console.log("Performing imperial calculations...");
            imperialConversionList = {
                fahrenheit: convertUnitsTemperature(unitsSI, "kelvin", "fahrenheit")
            };

            console.log("Imperial calculations complete.")
            for (const key in imperialConversionList) {
                if (imperialConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} kelvin in ${key}s: ${imperialConversionList[key]}`);
                }
            }

            // Format imperial conversion results
            resultsString += 
                `<div class="tape-h2">In imperial units, that's roughly:<br></div>`;
            
            resultsString += formatConversions(imperialConversionList, imperialUnits.temperature);       

        } else if (currentMeasurementSystem === "imperial") {
            imperialUnitsList = unitsList;
            console.log("Current system is imperial. Performing imperial calculations first.");
            for (const key in imperialUnitsList) {
                if (imperialUnitsList.hasOwnProperty(key)) {
                    const value = Number(imperialUnitsList[key]);

                    if (Number.isFinite(value) && value !== 0) {
                        unitsSI = convertUnitsTemperature(value, key, "kelvin");
                        break;
                    }
                }
            }
            // Calculate and return decimal version of unitsSI in all available units
            imperialConversionList = {
                fahrenheit: convertUnitsTemperature(unitsSI, "kelvin", "fahrenheit")
            };
            console.log("Imperial calculations complete.");
            for (const key in imperialConversionList) {
                if (imperialConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} kelvin in ${key}s: ${imperialConversionList[key]}`);
                }
            }

            // Format imperial conversion results
            resultsString += getTemperatureResults(imperialUnitsList, imperialConversionList, imperialUnits.temperature);

            // Calculate metric conversions
            console.log("Performing metric calculations...");
            metricConversionList = {
                kelvin: unitsSI,
                celsius: convertUnitsTemperature(unitsSI, "kelvin", "celsius")
            };

            for (const key in metricConversionList) {
                if (metricConversionList.hasOwnProperty(key)) {
                    console.log(`${unitsSI} kelvin in ${key}s: ${metricConversionList[key]}`);
                }
            }

            // Format metric conversion results
            resultsString +=
                `<div class="tape-h2">In metric units, that's roughly:<br></div>`;

            resultsString += formatConversions(metricConversionList, metricUnits.temperature);

        }

        // Run measurement comparison calculations
        console.log("Performing temperature comparison calculations...");

        // Load the JSON and wait until it is available
        const jsonData = await loadJSON(unitsJSONs.temperature);

        // Extract the length entries from the JSON object
        const temperatureEntries = jsonData.temperatures;

        // Compare the user's measurement against each reference item
        measurementComparisons = measurementComparison(
            unitsSI,
            unitSI.temperature,
            temperatureEntries,
            "temperature"
        );

        // Format comparison results
        let comparisonResults = "";

        if (measurementComparisons.length > 0) {
            comparisonResults += `<div class="tape-h2">For reference, that's roughly:<br></div>`;

            for (const entry of measurementComparisons) {
                const formattedQuotient = formatNumber(entry.quotient);
                const imageHTML = entry.image
                    ? `<img
                        src="${entry.image}"
                        alt="${entry.item}"
                        class="comparisonImage"
                        loading="lazy"
                    >`
                    : "";

                comparisonResults += `
                    <div class="comparisonEntry">
                        <h2>${entry.item} (x ${formattedQuotient})</h2>
                        ${imageHTML}
                        <h3>${entry.sentence}</h3>
                    </div>
                `;
            }
        } else {
            comparisonResults +=
                `<div class="tape-h2">For reference:<br></div>` +
                `<h3>No applicable comparisons were found. More items for comparison will be added in the future. Check back later, or enter a new measurement!</h3>`;
        }

        resultsString += comparisonResults;

        console.log("Temperature comparison calculations complete.");

        results.innerHTML = resultsString;

    }
}

// This function handles the comparison calculations of the passed unitsSI of the passed units, with the entries in the passed JSON data
function measurementComparison(unitsSI, unit, jsonData, type) {
    let comparisons = [];
    jsonData.forEach(item => {
        let itemsSI = 0;
        // Convert item's measurement to passed unit
        if (type === "length") {
            itemsSI = convertUnitsLength(item.length, item.units, unit);
        } else if (type === "mass") {
            itemsSI = convertUnitsMass(item.weight, item.units, unit);
        } else if (type === "dry volume") {
            itemsSI = convertUnitsDryVolume(item.volume, item.units, unit);
        } else if (type === "liquid volume") {
            itemsSI = convertUnitsLiquidVolume(item.volume, item.units, unit);
        } else if (type === "temperature") {
            itemsSI = convertUnitsTemperature(item.temperature, item.units, unit);
        } else if (type === "time") {
            itemsSI = convertUnitsTime(item.time, item.units, unit);
        }

        // Prevent division by zero (the world will explode if this happens) or invalid measurements
        if (!Number.isFinite(itemsSI) || itemsSI <= 0) {
            console.warn(`Invalid reference measurement for: ${item.item}`);
            return;
        }

        // Get quotient of how many times unitsSI fits into the item
        const comparisonQuotient = unitsSI / itemsSI;

        // if comparisonQuotient is greater than or equal to item's "useIf", format comparison sentence, build comparison object and add it to comparisons.
        if (comparisonQuotient >= item.useIf) {
            const formattedQuotient = formatNumber(comparisonQuotient);
            const formattedSentence = item.sentencePortion.replace("_", formattedQuotient);
            const comparisonObject = {
                item: item.item,
                quotient: comparisonQuotient,
                sentence: formattedSentence,
                image: item.image || null
            };

            comparisons.push(comparisonObject);
        }
    });

    return comparisons;
}

// This function handles the selection and display of root unit entry fields
function displayOptions(evt, tabName) {
    var i, tabContent, tabLinks;

    // Store the current tab
    currentTab = tabName;

    // Get all elements with class="rootTabContent" and hide them
    tabContent = document.getElementsByClassName("rootTabContent");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Get all elements with class="rootTabLinks" and remove the class "active"
    tabLinks = document.getElementsByClassName("rootTabLinks");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
        tabLinks[i].setAttribute("aria-pressed", "false");
    }

    // Show the current tab and add an "active" class to its button
    const selectedTab = document.getElementById(tabName);
    selectedTab.style.display = "block";
    evt.currentTarget.classList.add("active");
    evt.currentTarget.setAttribute("aria-pressed", "true");

    // Determine which measurement system is active in the selected root tab
    const activeSubTab = selectedTab.querySelector(".subTabLinks.active");
    if (activeSubTab) {
        // Retrieve the selected subtab's corresponding content
        const subTabButtons = selectedTab.querySelectorAll(".subTabLinks");
        const activeIndex = Array.from(subTabButtons).indexOf(activeSubTab);

        // Subtabs are ordered Imperial first, Metric second
        if (activeIndex === 0) {
            currentMeasurementSystem = "imperial";
        } else if (activeIndex === 1) {
            currentMeasurementSystem = "metric";
        }
    } else if (tabName === "Time") {
        // Time doesn't have Metric/Imperial subtabs so it is ignored
        currentMeasurementSystem = "metric";
    }

    console.log("Current tab:", currentTab);
    console.log("Current measurement system:", currentMeasurementSystem);

    // Clear the text content of the results element
    results.textContent = "";
}

// This function handles the selection and display of subtab entry fields
function displaySubOptions(evt, subTabName, measurementSystem) {
    const rootTab = evt.currentTarget.closest(".rootTabContent");

    // Hide subtabs belonging ONLY to the currently open root tab
    const subTabContent = rootTab.getElementsByClassName("subTabContent");
    for (let i = 0; i < subTabContent.length; i++) {
        subTabContent[i].style.display = "none";
    }

    // Remove active state ONLY from subtab buttons in this root tab
    const subTabLinks = rootTab.getElementsByClassName("subTabLinks");
    for (let i = 0; i < subTabLinks.length; i++) {
        subTabLinks[i].classList.remove("active");
        subTabLinks[i].setAttribute("aria-pressed", "false");
    }

    // Show selected subtab
    document.getElementById(subTabName).style.display = "block";

    // Mark selected button active
    evt.currentTarget.classList.add("active");
    evt.currentTarget.setAttribute("aria-pressed", "true");

    // Store selected measurement system
    currentMeasurementSystem = measurementSystem;

    // Clear the text content of the results element
    results.textContent = "";
}

// This function handles the initialization of measurement conversion and comparision calculations when the user clicks calculate or presses enter
async function initializeCalculation() {
    // Prevent additional calculations while one is running
    if (isCalculating) {
        return;
    }

    // Verify a measurement category has been selected
    if (!currentTab) {
        results.textContent = "Please select a measurement category.";
        return;
    }

    // Verify a system was selected for categories that require one
    if (currentTab !== "Time") {
        const rootTab = document.getElementById(currentTab);
        const visibleSubTab = Array.from(
            rootTab.querySelectorAll(".subTabContent")
        ).find(subTab =>
            getComputedStyle(subTab).display !== "none"
        );
        if (!visibleSubTab) {
            results.textContent =
                "Please select Imperial or Metric.";
            return;
        }
    }

    isCalculating = true;

    // Get entered measurements
    const enteredMeasurements = createMeasurementList();

    // Get whether or not user has entered a value
    const hasEnteredValue = Object.values(enteredMeasurements)
        .some(value => {
            if (String(value).trim() === "") {
                return false;
            }
            const number = Number(value);
            return Number.isFinite(number);
        });
    if (!hasEnteredValue) {
        results.textContent = "Please enter at least one value.";
        isCalculating = false;
        return;
    }

    // Remember original disabled states and lock user controls
    const originalStates = lockMeasurementControls();

    try {
        console.log("Starting measurement calculation...");
        
        // Clear previous results
        results.innerHTML = "";

        // Display loading indicator, allowing browser to render it before performing the calculation
        setLoadingIndicator(true);
        await new Promise(resolve =>{
            requestAnimationFrame(() => {
                requestAnimationFrame(resolve);
            });
        });

        // Run measurement calculation and wait for completion
        calculationStatus.textContent = "Calculating measurements.";
        await universalMeasurementConversion(enteredMeasurements);
        console.log("Measurement calculation complete.");
        calculationStatus.textContent = "Calculation complete. Results are available below.";
    } catch (error) {
        // Catch calculation or JSON loading errors
        console.error("An error occured while performing measurement calculation: ", error);
        calculationStatus.textContent = "Calculation failed. Please try again.";
        // Note to self: once I start working on CSS, maybe this could have a fancy popup instead of just showing the error raw in results?
        results.textContent = "An error occured while calculating your measurements. Please try again.";
    } finally {
        // Hide the loading indicator and restore user controls
        setLoadingIndicator(false);
        unlockMeasurementControls(originalStates);
        isCalculating = false;
    }
}

// This function disables all buttons and input fields during calculation. Returns their original disabled states so they can be restored.
function lockMeasurementControls() {
    const controls = document.querySelectorAll("button, input");
    const originalStates = new Map();

    for (const control of controls) {
        // Remember whether user control was disabled before loading
        originalStates.set(control, control.disabled);

        // Lock user control
        control.disabled = true;
    }

    return originalStates;
}

// This function restores user controls to their original disabled states.
function unlockMeasurementControls(originalStates) {
    for (const [control, wasDisabled] of originalStates) {
        control.disabled = wasDisabled;
    }
}

// This function is used to show or hide the loading indicator.
function setLoadingIndicator(isLoading) {
    loadingIndicator.hidden = !isLoading;
}

// This function gathers the info in the form fields and puts them together into an object, before returning that object
function createMeasurementList() {
    let measurementList = {};
    if (currentMeasurementSystem === "metric") {
        if (currentTab === "Length") {
            measurementList = {
                millimeter: millimeterElem.value,
                centimeter: centimeterElem.value,
                meter: meterElem.value,
                kilometer: kilometerElem.value
            };
        } else if (currentTab === "Mass") {
            measurementList = {
                milligram: milligramElem.value,
                gram: gramElem.value,
                kilogram: kilogramElem.value
            };
        } else if (currentTab === "Dry") {
            measurementList = {
                liter: dryLiterElem.value,
                "cubic meter": cubicmeterElem.value
            };
        } else if (currentTab === "Liquid") {
            measurementList = {
                milliliter: milliliterElem.value,
                liter: liquidLiterElem.value,
                kiloliter: kiloliterElem.value
            };
        } else if (currentTab === "Time") {
            measurementList = {
                millisecond: millisecondElem.value,
                second: secondElem.value,
                minute: minuteElem.value,
                hour: hourElem.value,
                day: dayElem.value,
                week: weekElem.value,
                month: monthElem.value,
                year: yearElem.value,
                decade: decadeElem.value
            };
        } else if (currentTab === "Temperature") {
            measurementList = {
                kelvin: kelvinElem.value,
                celsius: celsiusElem.value
            };
        }
    } else if (currentMeasurementSystem === "imperial") {
        if (currentTab === "Length") {
            measurementList = {
                inch: inchElem.value,
                foot: footElem.value,
                yard: yardElem.value,
                mile: mileElem.value
            };
        } else if (currentTab === "Mass") {
            measurementList = {
                ounce: ounceElem.value,
                pound: poundElem.value,
                ton: tonElem.value
            };
        } else if (currentTab === "Dry") {
            measurementList = {
                teaspoon: dryTeaspoonElem.value,
                tablespoon: dryTablespoonElem.value,
                ounce: dryOunceElem.value,
                cup: dryCupElem.value,
                pint: dryPintElem.value,
                quart: dryQuartElem.value,
                gallon: dryGallonElem.value
            };
        } else if (currentTab === "Liquid") {
            measurementList = {
                teaspoon: teaspoonElem.value,
                tablespoon: tablespoonElem.value,
                ounce: liquidOunceElem.value,
                cup: cupElem.value,
                pint: pintElem.value,
                quart: quartElem.value,
                gallon: gallonElem.value
            };
        } else if (currentTab === "Time") {
            measurementList = {
                millisecond: millisecondElem.value,
                second: secondElem.value,
                minute: minuteElem.value,
                hour: hourElem.value,
                day: dayElem.value,
                week: weekElem.value,
                month: monthElem.value,
                year: yearElem.value,
                decade: decadeElem.value
            };
        } else if (currentTab === "Temperature") {
            measurementList = {
                fahrenheit: fahrenheitElem.value
            };
        }
    }
    return measurementList;
}

// This function is used to close the info modal and restore page navigation controls
function closeInfoModal() {
    infoModalElem.style.display = "none";
    document.body.style.overflow = "";

    // Return focus to the element that opened the modal
    if (previousFocusedElement) {
        previousFocusedElement.focus();
    }
}

// Event listeners
kelvinElem.addEventListener("input", () => {
    handleTemperatureFields(kelvinElem, [celsiusElem]);
});

celsiusElem.addEventListener("input", () => {
    handleTemperatureFields(celsiusElem, [kelvinElem]);
});

fahrenheitElem.addEventListener("input", () => {
    // Unless I add more imperial temperature units, this will remain blank.
});

calculateButtonElem.addEventListener("click", async () => {
    initializeCalculation();
});

document.addEventListener("keydown", (event) => {
    // Only initiate calculation when Enter is pressed inside an enabled measurement input field
    if (
        event.key === "Enter" &&
        event.target.matches(".unitEntry input") &&
        !event.target.disabled &&
        !event.repeat &&
        infoModalElem.style.display !== "block"
    ) {
        event.preventDefault();
        initializeCalculation();
    }
});

infoButtonElem.addEventListener("click", async () => {
    previousFocusedElement = document.activeElement;
    infoModalElem.style.display = "block";
    document.body.style.overflow = "hidden";

    // Move keyboard focus into the modal
    closeInfoButtonElem.focus();
});

closeInfoButtonElem.addEventListener("click", closeInfoModal);

infoModalElem.addEventListener("click", (event) => {
    if (event.target === infoModalElem) {
        closeInfoModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (infoModalElem.style.display !== "block") {
        return;
    }
    if (event.key === "Escape") {
        event.preventDefault();
        closeInfoModal();
        return;
    }
    if (event.key === "Tab") {
        const focusableElements = Array.from(
            infoModalElem.querySelectorAll(
                'button:not(:disabled), a[href], input:not(:disabled), ' +
                'select:not(:disabled), textarea:not(:disabled), ' +
                '[tabindex]:not([tabindex="-1"])'
            )
        ).filter(element => element.getClientRects().length > 0);

        if (focusableElements.length === 0) {
            event.preventDefault();
            return;
        }

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (
            !event.shiftKey &&
            document.activeElement === last
        ) {
            event.preventDefault();
            first.focus();
        } else if (!infoModalElem.contains(document.activeElement)) {
            event.preventDefault();
            first.focus();
        }
    }
});

darkModeButtonElem.addEventListener('click', function() {
    const isDarkMode = document.body.classList.toggle('dark-mode');

    // Change da icon
    darkModeButtonElem.textContent = isDarkMode ? "☀️" : "🌙";

    // Update the button's aria label
    darkModeButtonElem.setAttribute(
        "aria-label",
        isDarkMode ? "Switch to light mode" : "Switch to dark mode"
    );
});