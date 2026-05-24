import { Product, Review } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Custom Mustang Sequential LED Taillights (2010-2014)',
    price: 425,
    category: 'lighting',
    compatibilities: [
      { make: 'Ford', model: 'Mustang', years: [2010, 2011, 2012, 2013, 2014], notes: 'Fits all V6, GT, Boss 302, Shelby GT500 models' }
    ],
    condition: 'Custom Specialized',
    description: 'Fully custom styled black sequential taillights with smoky lenses. Upgrades the 10-14 rear panel to an ultra-modern premium hyper-glow look. Pure plug-and-play harness included.',
    imageSeed: 'mustang_taillights_custom',
    isMustangSpecial: true,
    isFordSpecial: true
  },
  {
    id: '2',
    title: 'Mustang GT Performance Intake Manifold (2007-2010)',
    price: 400,
    category: 'performance',
    compatibilities: [
      { make: 'Ford', model: 'Mustang', years: [2007, 2008, 2009, 2010], notes: 'Designed for 4.6L 3V V8 engines (GT models)' }
    ],
    condition: 'OEM Original / Like New',
    description: 'Genuine factory High-Flow OEM Intake Manifold. In exceptional clean condition, tested and inspected. Perfect replacement or project build for increasing throttle response/air flow.',
    imageSeed: 'mustang_manifold',
    isMustangSpecial: true,
    isFordSpecial: true
  },
  {
    id: '3',
    title: 'Mustang GT Smoked Custom Taillights (2010-2014)',
    price: 435,
    category: 'lighting',
    compatibilities: [
      { make: 'Ford', model: 'Mustang', years: [2010, 2011, 2012, 2013, 2014], notes: 'Compatible with all trims, premium triple-bar design' }
    ],
    condition: 'Custom Specialized',
    description: 'Premium dark smoked custom housing taillights. Fully integrated matrix sequence amber turn signals with crystalline red brakes. Adds massive aggressiveness to your rear quarter.',
    imageSeed: 'mustang_taillights_smoked',
    isMustangSpecial: true,
    isFordSpecial: true
  },
  {
    id: '4',
    title: 'NITROUS SEC FOOSE Custom Chrome Rims (Set of 4, 20")',
    price: 1800,
    category: 'wheels',
    compatibilities: [
      { make: 'Ford', model: 'Mustang', years: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023], notes: '5x114.3 Bolt pattern, absolute showstoppers' },
      { make: 'Dodge', model: 'Charger', years: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023], notes: 'Requires specific hubcentric adapter offsets' }
    ],
    condition: 'Pre-owned / Mint',
    description: 'Stunning premium-finish genuine Nitrous SEC Foose deep-lip 20-inch chrome wheels. Superb condition with zero curb rash. Designed to wrap performance tires in unmatched style.',
    imageSeed: 'foose_rims',
    isMustangSpecial: true,
    isFordSpecial: false
  },
  {
    id: '5',
    title: 'OEM Mustang GT 4.6L Sport Mufflers (2010)',
    price: 220,
    category: 'performance',
    compatibilities: [
      { make: 'Ford', model: 'Mustang', years: [2010], notes: 'Bolts directly to OEM mid-pipes for 4.6L V8' }
    ],
    condition: 'OEM Original / Like New',
    description: 'Original equipment manufacture dual mufflers for the 2010 Mustang GT 4.6. Delivers a clean, deep, and throaty muscle rumble without annoying cabin drone. Removed at low mileage.',
    imageSeed: 'mustang_mufflers',
    isMustangSpecial: true,
    isFordSpecial: true
  },
  {
    id: '6',
    title: 'OEM Mustang Replacement Taillights (2010-2012)',
    price: 150,
    originalPrice: 170,
    category: 'lighting',
    compatibilities: [
      { make: 'Ford', model: 'Mustang', years: [2010, 2011, 2012], notes: 'Perfect OEM direct replacement' }
    ],
    condition: 'OEM Original / Good',
    description: 'Factory stock replacement taillight lenses. All mounting clips intact, amber bulbs tested, crystal clean lens surface with minor structural weathering as typical for year.',
    imageSeed: 'mustang_taillights_oem_10',
    isMustangSpecial: true,
    isFordSpecial: true
  },
  {
    id: '7',
    title: 'OEM Shelby/GT Style Front Hood Assembly (2005-2009)',
    price: 300,
    category: 'body',
    compatibilities: [
      { make: 'Ford', model: 'Mustang', years: [2005, 2006, 2007, 2008, 2009], notes: 'Direct replacement panel, bolt-on hinge matches' }
    ],
    condition: 'OEM Original / Like New',
    description: 'Original aluminum hood with factory lines, finished in clean primer, ready to be custom-matched to your paint. True structural sound-isolation material attached on underside.',
    imageSeed: 'mustang_hood_oem',
    isMustangSpecial: true,
    isFordSpecial: true
  },
  {
    id: '8',
    title: 'Mustang Fiberglass Boy Racer Aggressive Spoiler (2005-2009)',
    price: 580,
    category: 'body',
    compatibilities: [
      { make: 'Ford', model: 'Mustang', years: [2005, 2006, 2007, 2008, 2009], notes: 'Mounts securely to rear deck lid' }
    ],
    condition: 'Custom Specialized',
    description: 'Ultra-lightweight fiberglass aerofoil spoiler styled in the muscular "Boy Racer" format. High downforce drag profile, primed black. Dramatically lowers optical aspect of the rear chassis.',
    imageSeed: 'mustang_spoiler_racer',
    isMustangSpecial: true,
    isFordSpecial: true
  },
  {
    id: '9',
    title: 'OEM Original Audi Machined Grey S5 A5 Alloy Rim (19")',
    price: 310,
    category: 'wheels',
    compatibilities: [
      { make: 'Audi', model: 'S5', years: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016], notes: 'Part number: 8T0601025DF 5 Double-spoke original factory standard offset' },
      { make: 'Audi', model: 'A5', years: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016] }
    ],
    condition: 'OEM Original / Like New',
    description: 'Authentic 19-inch machined metallic grey factory wheel rim. Completely balances perfectly, free from structural fractures, bends, or severe scratches. Laser-guided hub calibration tested.',
    imageSeed: 'audi_rim',
    isMustangSpecial: false,
    isFordSpecial: false
  },
  {
    id: '10',
    title: '1993 Dodge Viper RT/10 Roadster Classic (5K Original Miles)',
    price: 79500,
    originalPrice: 85000,
    category: 'cars',
    compatibilities: [
      { make: 'Dodge', model: 'Viper', years: [1993], notes: 'An absolute masterpiece of American V10 automotive heritage' }
    ],
    condition: 'Pre-owned / Mint',
    description: 'Sought-after, numbers-matching Gen 1 Roadster in pristine, collector-grade shape. Loaded with its legendary 8.0L overhead-valve V10 kicking 400HP. Full service logs, brand new Michelin tires.',
    imageSeed: 'dodge_viper_real',
    isMustangSpecial: false,
    isFordSpecial: false
  },
  {
    id: '11',
    title: '1948 Plymouth Voyager Restomod Minivan Cruiser',
    price: 17000,
    originalPrice: 18500,
    category: 'cars',
    compatibilities: [
      { make: 'Plymouth', model: 'Voyager', years: [1948], notes: 'Classic 100K miles resto-build' }
    ],
    condition: 'Pre-owned / Mint',
    description: 'Charming post-war style restomod styled cruiser. Features customized heavy leather bench interiors, modern automatic transmission swaps, updated suspension, and outstanding chrome lines.',
    imageSeed: 'plymouth_voyager_48',
    isMustangSpecial: false,
    isFordSpecial: false
  },
  {
    id: '12',
    title: 'OEM Mustang GT Style Front Grille Overlay (2005-2009)',
    price: 100,
    category: 'body',
    compatibilities: [
      { make: 'Ford', model: 'Mustang', years: [2005, 2006, 2007, 2008, 2009], notes: 'Fits standard GT center fog light housing' }
    ],
    condition: 'OEM Original / Good',
    description: 'OEM black honeycomb front grille assembly. Bold muscle styling with center cutout channels, ready to accept custom driving or halo fog pods. Restores a pure, direct-face profile.',
    imageSeed: 'mustang_grille',
    isMustangSpecial: true,
    isFordSpecial: true
  },
  {
    id: '13',
    title: 'Cyberscoop Cowl Induction Dual-Port Hood Scoop',
    price: 235,
    category: 'body',
    compatibilities: [
      { make: 'Ford', model: 'Mustang', years: [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010], notes: 'Fiberspun high quality cowl induction scoop' }
    ],
    condition: 'Custom Specialized',
    description: 'Cyberscoop cowl-induction functional scoop engineered from lightweight Unlimited Products fiberspun resin. Excellent air compression draft and high gloss clear-coated surface.',
    imageSeed: 'hood_scoop',
    isMustangSpecial: true,
    isFordSpecial: true
  },
  {
    id: '14',
    title: 'OEM Mustang 2015-2023 Premium LED Taillights (Set of 2)',
    price: 150,
    category: 'lighting',
    compatibilities: [
      { make: 'Ford', model: 'Mustang', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023], notes: 'Fits both Fastback and Convertible builds (S550 platform)' }
    ],
    condition: 'OEM Original / Like New',
    description: 'Near-showroom condition modern S550 triple-bar vertical taillights. Removed from 2019 GT with less than 2,000 miles for custom upgrades. Flawless glossy acrylic casing with zero scuffs.',
    imageSeed: 'mustang_s550_tails',
    isMustangSpecial: true,
    isFordSpecial: true
  },
  {
    id: '15',
    title: 'OEM Mustang Replacement Driver Window Glass (2010-2014)',
    price: 140,
    category: 'body',
    compatibilities: [
      { make: 'Ford', model: 'Mustang', years: [2010, 2011, 2012, 2013, 2014], notes: 'Left-side front driver main glass panel' }
    ],
    condition: 'OEM Original / Like New',
    description: 'Genuine Ford OEM shatterproof clear tempered side window glass. Free from deep edge-scuffs or scraping grooves. Pre-fitted with factory alignment rails for rapid slide installation.',
    imageSeed: 'mustang_window',
    isMustangSpecial: true,
    isFordSpecial: true
  },
  {
    id: '16',
    title: 'Mustang Premium Driver Side Comfort Door Panel (2010-2014)',
    price: 150,
    category: 'interior',
    compatibilities: [
      { make: 'Ford', model: 'Mustang', years: [2010, 2011, 2012, 2013, 2014], notes: 'Front Driver Side Left Door Panel Assembly' }
    ],
    condition: 'OEM Original / Good',
    description: 'Factory carbon-texture charcoal door card. Fits master power-window switches comfortably. Stitching in tight showroom layout, no synthetic lifting or deep vinyl scuffs.',
    imageSeed: 'mustang_door_panel',
    isMustangSpecial: true,
    isFordSpecial: true
  },
  {
    id: '17',
    title: 'Mustang OEM Driver Side Door Panel Outer Shell (2010-2014)',
    price: 255,
    category: 'body',
    compatibilities: [
      { make: 'Ford', model: 'Mustang', years: [2010, 2011, 2012, 2013, 2014], notes: 'Driver side primary structural steel door unit' }
    ],
    condition: 'OEM Original / Good',
    description: 'Solid heavy steel structural door card shell. Perfectly aligned hinge pathways, zero deep structural rust or major panel ripples. Unpainted base, perfect for crash repair setups.',
    imageSeed: 'mustang_door',
    isMustangSpecial: true,
    isFordSpecial: true
  },
  {
    id: '18',
    title: 'XTD Stage 2 High Friction Performance Clutch Kit',
    price: 310,
    category: 'performance',
    compatibilities: [
      { make: 'Chrysler', model: 'PT Cruiser', years: [2001, 2002, 2003, 2004, 2005, 2006], notes: 'High-friction organic brass compound for high heat loads' }
    ],
    condition: 'New',
    description: 'Unopened brand-new-in-box (NOS) premium XTD Stage 2 sport performance clutch kit. Ideal for handling heavy turbo boost/street torque. Delivers an intense clamping load.',
    imageSeed: 'clutch_kit',
    isMustangSpecial: false,
    isFordSpecial: false
  },
  {
    id: '19',
    title: 'Dodge Charger R/T Classic Jada Toys Diecast Scale (1:24)',
    price: 45,
    category: 'collectibles',
    compatibilities: [
      { make: 'Collection', model: 'Diecast', years: [] }
    ],
    condition: 'New',
    description: 'Collector-grade Jada Metals 1:24 die-cast replica of a legendary black Dodge Charger. Intricate detailing of supercharger, fully opening doors, chrome wheel barrels. Pristine box.',
    imageSeed: 'charger_jada',
    isMustangSpecial: false,
    isFordSpecial: false
  },
  {
    id: '20',
    title: 'Dodge Viper RT/10 Collector Scale Heavy Metal (1:18)',
    price: 120,
    category: 'collectibles',
    compatibilities: [
      { make: 'Collection', model: 'Diecast', years: [] }
    ],
    condition: 'New',
    description: 'High-end 1:18 scale official licensed Dodge Viper RT/10 diecast model. Finished in authentic viper bright red paint. Includes working steering and spring functional suspensions.',
    imageSeed: 'viper_diecast',
    isMustangSpecial: false,
    isFordSpecial: false
  },
  {
    id: '21',
    title: 'CONTRA FOR YOU Premium Eau De Parfum (100ml)',
    price: 35,
    category: 'lifestyle',
    compatibilities: [
      { make: 'Lifestyle', model: 'Scent', years: [] }
    ],
    condition: 'New',
    description: 'SCW Exclusive selection. A deep, masculine aroma matching heavy notes of warm cedar, fine leather, and subtle spice. Packaged securely, designed to match the power of clean-cut style.',
    imageSeed: 'cologne',
    isMustangSpecial: false,
    isFordSpecial: false
  },
  {
    id: '22',
    title: 'Air Jordan 1 High "Shadow" Premium Vintage (Retro Line)',
    price: 80,
    category: 'lifestyle',
    compatibilities: [
      { make: 'Lifestyle', model: 'Streetwear', years: [] }
    ],
    condition: 'OEM Original / Like New',
    description: 'Iconic Jordan 1 high-tops in Shadow grey/black leather colorway. Excellent condition, very gently worn, authentic detailing, sturdy outsole grip intact. Size US 10.5.',
    imageSeed: 'aj1_shadow',
    isMustangSpecial: false,
    isFordSpecial: false
  },
  {
    id: '23',
    title: 'SCW Heavy-Duty Ergo Concrete & Construction Knee Pads',
    price: 65,
    category: 'lifestyle',
    compatibilities: [
      { make: 'Equipment', model: 'Garage Work', years: [] }
    ],
    condition: 'New',
    description: 'Ultra comfort, dual gel padding knee preservation pads. Features secure double buckle straps and dynamic non-skid plastic face shields. Essential gear for extensive garage wrenching or floor work.',
    imageSeed: 'knee_pads',
    isMustangSpecial: false,
    isFordSpecial: false
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'John',
    rating: 5,
    date: 'February 4, 2026',
    comment: 'Very smooth transaction. Item was as described, seller maintained communication and was courteous and professional.',
    notableStrengths: ['Punctuality', 'Communication', 'Pricing', 'Item Description']
  },
  {
    id: 'r2',
    name: 'Vi',
    rating: 5,
    date: 'August 7, 2025',
    comment: 'Awesome pricing on OEM parts. Extremely nice and kept me updated the whole way. Met up right on time at Lake Elsinore. Highly recommend Alexander!',
    notableStrengths: ['Punctuality', 'Communication', 'Pricing', 'Item Description']
  },
  {
    id: 'r3',
    name: 'Sebastian',
    rating: 5,
    date: 'March 20, 2026',
    comment: 'Smooth meetup and taillights look amazing. Communicated clearly and set up everything super easily. Outstanding seller.',
    notableStrengths: ['Communication', 'Pricing', 'Item Description']
  },
  {
    id: 'r4',
    name: 'Robert D.',
    rating: 5,
    date: 'May 2, 2026',
    comment: 'Absolute life saver for classic and modern parts. Saved hundreds on custom body trim and intake parts.',
    notableStrengths: ['Communication', 'Item Description']
  }
];
