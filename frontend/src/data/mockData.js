// Mock data for Wanderlust & Co. - Luxury Travel Website

export const destinations = [
  {
    id: 1,
    name: "Ireland",
    subtitle: "The Emerald Isle",
    description: "A land of myth, magic, and forty shades of green, where ancient history meets warm hospitality.",
    fullDescription: "From the wild Atlantic coast to the ancient east, Ireland is a country of breathtaking landscapes and rich heritage. Experience private access to historic castles, play on world-class golf links, and immerse yourself in a culture renowned for its storytelling and music. Our curated Irish journeys take you beyond the guidebooks into the heart of the local community.",
    image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=1200&h=800&fit=crop&q=80",
    highlights: ["Cliffs of Moher", "Book of Kells", "Ring of Kerry", "Giant's Causeway"],
    gallery: [
      "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506450257322-26210f845be9?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    id: 2,
    name: "Scotland",
    subtitle: "Untamed Beauty",
    description: "Rugged highlands, mysterious lochs, and a history as dramatic as the scenery.",
    fullDescription: "Scotland is a land of romance and rebellion, where every glen has a story. Journey through the majestic Highlands, visit the Isle of Skye, and tour exclusive whisky distilleries. Whether you're tracking red deer on a private estate or sleeping in a 16th-century tower house, Scotland offers an escape into a wilder, more elemental world.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop&q=80",
    highlights: ["Isle of Skye", "Edinburgh Castle", "Loch Ness", "The Highlands"],
    gallery: [
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520116468816-95b69f847357?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    id: 3,
    name: "England",
    subtitle: "Quintessential Charm",
    description: "From the bustling streets of London to the honey-colored villages of the Cotswolds.",
    fullDescription: "England offers a perfect blend of royal pageantry and pastoral peace. Explore the avant-garde art scenes of London, walk the jurassic coast, or retreat to a manor house in the rolling countryside. Our English experiences focus on the exclusive: after-hours palace tours, private garden visits, and meetings with local artisans.",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=800&fit=crop&q=80",
    highlights: ["London & The Thames", "The Cotswolds", "Lake District", "Bath Spa"],
    gallery: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1482483569428-c92c5a08990d?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1605364808383-71cd95754877?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    id: 4,
    name: "Africa",
    subtitle: "Wild & Majestic",
    description: "The ultimate frontier of luxury travel, offering encounters with the world's most magnificent wildlife.",
    fullDescription: "Africa is a continent that touches the soul. Witness the Great Migration in the Serengeti, trek with gorillas in Rwanda, or relax on the pristine beaches of Zanzibar. Our safari experiences combine the thrill of the wild with unparalleled luxury, featuring exclusive lodges, private guides, and conservation-focused itineraries.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=800&fit=crop&q=80",
    highlights: ["The Serengeti", "Okavango Delta", "Cape Town", "Victoria Falls"],
    gallery: [
      "https://images.unsplash.com/photo-1547471080-7541fbe93655?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484318571209-661cf29d69c3?w=800&h=600&fit=crop&q=80"
    ]
  },

];

export const experiences = [
  {
    id: 1,
    title: "Culinary Journeys",
    description: "Savor exquisite local cuisines with private chefs and exclusive tastings",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    category: "gastronomy"
  },
  {
    id: 2,
    title: "The Old Course Legacy",
    description: "Secure your guaranteed tee time at St Andrews, the hallowed ground where the game began. Experience the legendary 17th Road Hole and the iconic Swilcan Bridge.",
    fullDescription: "Embark on a pilgrimage to the birthplace of golf at the legendary Old Course at St Andrews. This isn't just a round of golf—it's a journey through 600 years of golfing history. Walk the same fairways as legends like Bobby Jones, Jack Nicklaus, and Tiger Woods. Our exclusive VIP package guarantees you a coveted morning tee time, bypassing the famous ballot system that leaves most golfers waiting years for access.",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1592919505780-303950717480?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596727362302-b8d891c42ab8?w=800&h=600&fit=crop"
    ],
    category: "golf-escapes",
    duration: "4-6 HOURS",
    type: "VIP ACCESS",
    difficulty: "Championship",
    groupSize: "2-4 Players",
    bestSeason: "May - September",
    courseInfo: {
      designer: "Old Tom Morris (1864)",
      par: 72,
      yardage: "7,305 yards",
      established: 1552
    },
    pricing: {
      from: "£2,500",
      currency: "GBP",
      perPerson: true,
      includes: "Green fees, caddie, transfers"
    },
    inclusions: [
      "Guaranteed priority tee time (no ballot required)",
      "Expert local caddie with championship experience",
      "Private luxury transfer from Edinburgh or Glasgow",
      "Exclusive R&A Clubhouse access and tour",
      "Post-round whisky tasting in the Balvonie Room",
      "Professional photography package",
      "Commemorative Old Course bag tag and scorecard"
    ],
    itinerary: [
      { time: "06:00", activity: "Luxury vehicle pickup from your accommodation" },
      { time: "07:30", activity: "Arrive at St Andrews, light breakfast at Rusacks Hotel" },
      { time: "08:30", activity: "Meet your championship caddie, warm-up session" },
      { time: "09:00", activity: "Tee off on the 1st hole - the widest fairway in golf" },
      { time: "13:00", activity: "Complete your round at the iconic 18th" },
      { time: "13:30", activity: "R&A Clubhouse tour and exclusive lunch" },
      { time: "15:00", activity: "Whisky tasting and presentation ceremony" }
    ],
    highlights: ["Guaranteed 1st Tee Time", "Private Historian Caddie", "R&A Clubhouse Access", "Post-Round Balvonie Room Malt Tasting"]
  },
  {
    id: 9,
    title: "Royal County Down Immersion",
    description: "Navigate the rugged dunes and breathtaking scenery of the world's top-ranked course in the Murlough Nature Reserve. A true test of precision amidst the Mountains of Mourne.",
    fullDescription: "Discover why Royal County Down has been voted the world's number one golf course multiple times. Set against the dramatic backdrop of the Mountains of Mourne sweeping down to the Irish Sea, this masterpiece of links golf offers an unforgettable experience. The legendary 'bearded' bunkers, towering dunes, and blind shots create one of the most exhilarating and challenging rounds you'll ever play.",
    image: "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1611374243147-44a702c2d44c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1589489873423-d1745278a8f4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600728596236-2075e8db7e60?w=800&h=600&fit=crop"
    ],
    category: "golf-escapes",
    duration: "5-7 HOURS",
    type: "PRIVATE CADDIE",
    difficulty: "Championship+",
    groupSize: "2-4 Players",
    bestSeason: "April - October",
    courseInfo: {
      designer: "Old Tom Morris / Harry Vardon",
      par: 71,
      yardage: "7,186 yards",
      established: 1889
    },
    pricing: {
      from: "£1,800",
      currency: "GBP",
      perPerson: true,
      includes: "Green fees, caddie, luxury transfer"
    },
    inclusions: [
      "Championship tee access with priority booking",
      "Expert local caddie with intimate course knowledge",
      "Luxury Slieve Donard Resort transfer",
      "Pre-round strategy session with course insights",
      "Blind shot navigation masterclass",
      "Post-round refreshments in the clubhouse",
      "Exclusive access to practice facilities"
    ],
    itinerary: [
      { time: "07:00", activity: "Pickup from Belfast or Dublin" },
      { time: "08:30", activity: "Arrive at Slieve Donard Resort, breakfast" },
      { time: "09:30", activity: "Caddie introduction and course strategy briefing" },
      { time: "10:00", activity: "Tee off with views of the Mourne Mountains" },
      { time: "14:30", activity: "Complete round, clubhouse refreshments" },
      { time: "15:30", activity: "Optional spa session at Slieve Donard" }
    ],
    highlights: ["Mourne Mountain Backdrop", "World Rank #1 Course", "Blind Shot Mastery Session", "Luxury Slieve Donard Transfer", "Championship Links Layout"]
  },
  {
    id: 10,
    title: "Ballybunion Atlantic Links",
    description: "Experience the dramatic cliff-top fairways and crashing waves of Ireland's most soulful links course. Navigate the massive sand dunes and changing Atlantic winds.",
    fullDescription: "Tom Watson called Ballybunion 'a course on which many golf architects should live and play before they build golf courses.' This wild Atlantic masterpiece features some of the most dramatic cliff-top golf holes in the world. The Old Course winds through towering sand dunes with stunning ocean views from nearly every hole, while the challenging winds from the Atlantic create a different course every day.",
    image: "/images/golf/ballybunion_header.png",
    gallery: [
      "/images/golf/ballybunion_gallery1.png",
      "/images/golf/turnberry_gallery1.png",
      "/images/golf/turnberry_gallery2.png"
    ],
    category: "golf-escapes",
    duration: "4-6 HOURS",
    type: "COASTAL ESCAPE",
    difficulty: "Championship",
    groupSize: "2-4 Players",
    bestSeason: "May - September",
    courseInfo: {
      designer: "Simpson/Hewson/Watson",
      par: 71,
      yardage: "6,802 yards",
      established: 1893
    },
    pricing: {
      from: "€1,200",
      currency: "EUR",
      perPerson: true,
      includes: "Both courses, caddie, lunch"
    },
    inclusions: [
      "Access to both Old Course and Cashen Course",
      "Expert caddie with wind-reading expertise",
      "Pre-round warm-up on the Cashen Course",
      "Atlantic wind navigation coaching session",
      "Traditional Irish lunch in the clubhouse",
      "Signature 11th hole photography session",
      "Commemorative Ballybunion merchandise"
    ],
    itinerary: [
      { time: "08:00", activity: "Arrive at Ballybunion, warm breakfast" },
      { time: "09:00", activity: "Cashen Course warm-up round (9 holes)" },
      { time: "11:00", activity: "Break and wind reading session with caddie" },
      { time: "11:30", activity: "Tee off on the legendary Old Course" },
      { time: "15:30", activity: "Complete round, traditional Irish lunch" },
      { time: "17:00", activity: "Clubhouse tour and merchandise" }
    ],
    highlights: ["Cashen Course Warm-up", "Cliffside Elevation Challenges", "Signature 11th Hole Insight", "Atlantic Wind Navigation Lesson", "Tom Watson's Favourite Links"]
  },
  {
    id: 11,
    title: "Muirfield Private Tradition",
    description: "Step inside the Honourable Company of Edinburgh Golfers, one of the most exclusive clubs in the world. Experience the unique clockwise and anti-clockwise loops.",
    fullDescription: "Muirfield is home to the Honourable Company of Edinburgh Golfers—the oldest golf club in the world. This ultra-private venue rarely opens its doors to visitors, making a round here one of golf's most coveted experiences. The brilliant Harry Colt design features two loops of nine holes that run in opposite directions, ensuring you'll face the wind from every angle. The formal traditions, silver service lunch, and immaculate conditions create an unforgettable day.",
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596727362302-b8d891c42ab8?w=800&h=600&fit=crop"
    ],
    category: "golf-escapes",
    duration: "FULL DAY",
    type: "MEMBERS ONLY",
    difficulty: "Championship",
    groupSize: "2-4 Players",
    bestSeason: "May - October",
    courseInfo: {
      designer: "Harry Colt (1925)",
      par: 71,
      yardage: "7,245 yards",
      established: 1744
    },
    pricing: {
      from: "£3,500",
      currency: "GBP",
      perPerson: true,
      includes: "Full day experience with all meals"
    },
    inclusions: [
      "Exclusive access facilitated through member connections",
      "Silver service traditional lunch in the clubhouse",
      "Formal jacket-and-tie dining experience",
      "Classic alternate-shot foursomes format option",
      "Private tour of the trophy room and archives",
      "Championship caddie with Open experience",
      "Full day use of all facilities"
    ],
    itinerary: [
      { time: "09:00", activity: "Arrive at Muirfield, formal introduction" },
      { time: "09:30", activity: "Tour of the historic clubhouse and museum" },
      { time: "10:00", activity: "Morning round - 18 holes" },
      { time: "13:30", activity: "Silver service luncheon in the dining room" },
      { time: "15:00", activity: "Afternoon round or relaxation" },
      { time: "18:00", activity: "Evening drinks and departure" }
    ],
    highlights: ["Honourable Company Tradition", "Silver Service Luncheon", "Classic Alternating Foursomes", "Private Museum Viewing", "Harry Colt Design"]
  },
  {
    id: 12,
    title: "Turnberry Ailsa Revival",
    description: "Play against a backdrop of the iconic lighthouse, Ailsa Craig, and the Isle of Arran. Revisit the site of the 1977 'Duel in the Sun' on this meticulously restored masterpiece.",
    fullDescription: "The Ailsa Course at Trump Turnberry Resort is one of golf's most photogenic and challenging tests. Immortalized by the legendary 1977 'Duel in the Sun' between Tom Watson and Jack Nicklaus, this stunning links has been meticulously restored to championship glory. The iconic lighthouse, views of Ailsa Craig rising from the sea, and the dramatic coastal holes create an unforgettable visual and golfing experience.",
    image: "https://images.unsplash.com/photo-1592919505780-303950717480?w=1200&h=800&fit=crop",
    gallery: [
      "/images/golf/turnberry_gallery1.png",
      "/images/golf/turnberry_gallery2.png",
      "https://picsum.photos/id/17/800/600"
    ],
    category: "golf-escapes",
    duration: "5 HOURS",
    type: "ILLUSTRIOUS HISTORY",
    difficulty: "Championship",
    groupSize: "2-4 Players",
    bestSeason: "May - September",
    courseInfo: {
      designer: "Mackenzie Ross / Martin Ebert",
      par: 71,
      yardage: "7,489 yards",
      established: 1901
    },
    pricing: {
      from: "£2,200",
      currency: "GBP",
      perPerson: true,
      includes: "Green fees, caddie, spa access"
    },
    inclusions: [
      "Championship tee access on the restored Ailsa Course",
      "Expert caddie with local knowledge",
      "Lighthouse halfway house refreshments",
      "Post-round luxury spa session",
      "Duel in the Sun historical tour",
      "Bruce's Castle 9th hole photography",
      "Resort dining credit included"
    ],
    itinerary: [
      { time: "08:00", activity: "Arrive at Turnberry Resort" },
      { time: "08:30", activity: "Breakfast with views of Ailsa Craig" },
      { time: "09:30", activity: "Meet caddie, driving range warm-up" },
      { time: "10:00", activity: "Tee off on the Ailsa Course" },
      { time: "14:00", activity: "Complete round, clubhouse lunch" },
      { time: "15:30", activity: "Turnberry Spa treatment" },
      { time: "17:00", activity: "Sunset drinks overlooking the course" }
    ],
    highlights: ["Lighthouse Halfway House", "Championship Tee Access", "1977 Duel in the Sun Lore", "Luxury Spa Recovery Session", "Bruce's Castle 9th Hole"]
  },
  {
    id: 13,
    title: "K Club Ryder Cup Legacy",
    description: "Walk the fairways that witnessed the 2006 Ryder Cup glory on the Palmer North Course. A parkland masterpiece where the River Liffey comes into play on multiple holes.",
    fullDescription: "The K Club's Palmer North Course is Ireland's premier parkland golf experience and the only Irish venue to host the Ryder Cup (2006). Designed by the legendary Arnold Palmer, this 550-acre estate features the River Liffey weaving through 7 spectacular holes. The American-style target golf is a refreshing change from links play, with water hazards, mature trees, and immaculately manicured fairways providing a different but equally challenging test.",
    image: "/images/golf/turnberry_gallery1.png",
    gallery: [
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&h=600&fit=crop"
    ],
    category: "golf-escapes",
    duration: "5-6 HOURS",
    type: "PARKLAND PERFECTION",
    difficulty: "Resort Championship",
    groupSize: "2-4 Players",
    bestSeason: "April - October",
    courseInfo: {
      designer: "Arnold Palmer (1991)",
      par: 72,
      yardage: "7,350 yards",
      established: 1991
    },
    pricing: {
      from: "€950",
      currency: "EUR",
      perPerson: true,
      includes: "Green fees, buggy, fine dining"
    },
    inclusions: [
      "Access to the Palmer North Course",
      "Ryder Cup commemorative guided tour",
      "Electric buggy with GPS yardage system",
      "River Liffey island green experience",
      "Fine dining at The K Club restaurant",
      "Access to the Palmer South Course option",
      "K Club spa and leisure facilities"
    ],
    itinerary: [
      { time: "09:00", activity: "Arrive at The K Club estate" },
      { time: "09:30", activity: "Ryder Cup Trophy room and history tour" },
      { time: "10:30", activity: "Tee off on the Palmer North Course" },
      { time: "15:00", activity: "Complete round at the River Liffey 18th" },
      { time: "15:30", activity: "Fine dining lunch at The Legends Restaurant" },
      { time: "17:00", activity: "Leisure time or Palmer South 9 holes" }
    ],
    highlights: ["Arnold Palmer Signature Layout", "Ryder Cup Commemorative Tour", "River Liffey Island Greens", "Fine Dining Pavilion Access", "550-Acre Estate Setting"]
  },
  {
    id: 14,
    title: "Royal Troon Championship Test",
    description: "Home of the 'Postage Stamp'—the shortest and one of the most famous holes in Open history. Face the relentless trial of deep bunkers, gorse, and the wind.",
    fullDescription: "Royal Troon has hosted The Open Championship nine times, producing some of golf's most dramatic moments. The legendary 8th hole—the 'Postage Stamp'—is just 123 yards but features a tiny green surrounded by deep bunkers that have humbled the world's best players. The classic out-and-back links layout means you'll play into the prevailing wind on the back nine, making the closing stretch one of golf's toughest finishes.",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592919505780-303950717480?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&h=600&fit=crop&q=80"
    ],
    category: "golf-escapes",
    duration: "4-5 HOURS",
    type: "LINKS CHALLENGE",
    difficulty: "Championship",
    groupSize: "2-4 Players",
    bestSeason: "May - September",
    courseInfo: {
      designer: "Willie Fernie / James Braid",
      par: 71,
      yardage: "7,190 yards",
      established: 1878
    },
    pricing: {
      from: "£1,600",
      currency: "GBP",
      perPerson: true,
      includes: "Green fees, caddie, clubhouse access"
    },
    inclusions: [
      "Championship course access at Royal Troon",
      "Expert caddie with gale-force strategy expertise",
      "Postage Stamp 8th hole masterclass",
      "Clubhouse archive and trophy viewing",
      "Railway Hole challenge experience",
      "Luxury Ayrshire coast transfer",
      "Troon clubhouse dining privileges"
    ],
    itinerary: [
      { time: "08:00", activity: "Luxury transfer along the Ayrshire coast" },
      { time: "09:00", activity: "Arrive at Royal Troon, clubhouse welcome" },
      { time: "09:30", activity: "Caddie briefing and course strategy" },
      { time: "10:00", activity: "Tee off on the Old Course" },
      { time: "14:00", activity: "Complete round, clubhouse refreshments" },
      { time: "15:00", activity: "Archive tour and trophy room visit" },
      { time: "16:00", activity: "Return transfer" }
    ],
    highlights: ["Postage Stamp Mastery", "Gale-Force Strategy Caddie", "Troon Clubhouse Archive Access", "Luxury Ayrshire Coast Transfer", "The Railway Hole Challenge"]
  },
  {
    id: 3,
    title: "Monart Destination Spa",
    description: "Ireland's premier destination spa, nestled in 100 acres of tranquil Wexford woodland. A sanctuary of serenity for complete mind-body renewal.",
    fullDescription: "Escape to Monart, Ireland's first and most acclaimed destination spa, where the art of relaxation has been perfected. Set within 100 acres of ancient woodland and walled gardens, this adult-only retreat offers a haven of peace far from the modern world. Every detail has been designed to promote wellbeing—from the thermal suite with its vitality pool, salt grotto, and Finnish sauna, to the organic gardens that supply the award-winning restaurant.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&h=600&fit=crop&q=80"
    ],
    category: "wellness-retreats",
    duration: "2-5 NIGHTS",
    type: "DESTINATION SPA",
    difficulty: "All Levels",
    groupSize: "Individual or Couples",
    bestSeason: "Year-round",
    pricing: {
      from: "€850",
      currency: "EUR",
      perPerson: true,
      includes: "Accommodation, treatments, meals"
    },
    inclusions: [
      "Luxury suite accommodation with garden views",
      "Full Irish breakfast and gourmet dinner daily",
      "Two signature spa treatments per day",
      "Unlimited thermal suite access",
      "Guided woodland meditation walks",
      "Yoga and pilates classes",
      "Organic afternoon tea experience"
    ],
    itinerary: [
      { time: "08:00", activity: "Sunrise yoga in the conservatory" },
      { time: "09:30", activity: "Organic breakfast in the restaurant" },
      { time: "11:00", activity: "Morning spa treatment" },
      { time: "13:00", activity: "Light lunch and garden stroll" },
      { time: "15:00", activity: "Thermal suite relaxation" },
      { time: "17:00", activity: "Afternoon treatment" },
      { time: "19:30", activity: "Gourmet dinner with wine" }
    ],
    highlights: ["100 Acres of Woodland", "Thermal Suite & Salt Grotto", "Organic Garden Restaurant", "Award-Winning Treatments"]
  },
  {
    id: 15,
    title: "Ashford Castle Spa Retreat",
    description: "Experience royal wellness in an 800-year-old castle on the shores of Lough Corrib, combining ancient healing traditions with modern luxury.",
    fullDescription: "Within the storied walls of Ashford Castle, one of Ireland's most magnificent properties, lies a spa experience fit for royalty. The award-winning spa draws on centuries of Celtic healing wisdom, using indigenous botanicals and time-honored techniques. After your treatments, explore the 350-acre estate, take a falcon experience, or simply relax by roaring fires in grand drawing rooms.",
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&h=600&fit=crop&q=80"
    ],
    category: "wellness-retreats",
    duration: "3-7 NIGHTS",
    type: "CASTLE SPA",
    difficulty: "All Levels",
    groupSize: "Individual, Couples, Groups",
    bestSeason: "Year-round",
    pricing: {
      from: "€1,500",
      currency: "EUR",
      perPerson: true,
      includes: "Castle suite, treatments, dining"
    },
    inclusions: [
      "Stateroom or suite accommodation",
      "Daily spa treatment of choice",
      "Full Irish breakfast and afternoon tea",
      "Access to 350-acre estate activities",
      "Private cinema screening",
      "Billiards room and wine cellar access",
      "Complimentary falconry experience"
    ],
    itinerary: [
      { time: "08:00", activity: "Morning swim in the castle pool" },
      { time: "09:30", activity: "Full Irish breakfast in George V Dining Room" },
      { time: "11:00", activity: "Signature Celtic Ritual treatment" },
      { time: "13:00", activity: "Light lunch on the terrace" },
      { time: "15:00", activity: "Estate walk or falconry" },
      { time: "17:00", activity: "Afternoon tea in the Drawing Room" },
      { time: "20:00", activity: "Fine dining experience" }
    ],
    highlights: ["800-Year-Old Castle", "Celtic Healing Traditions", "350-Acre Estate", "Falconry Experience"]
  },
  {
    id: 16,
    title: "Cliff House Wellness Escape",
    description: "Perched on the Ardmore cliffs, this award-winning hotel offers dramatic Atlantic views and a world-class spa experience.",
    fullDescription: "The Cliff House Hotel clings dramatically to the cliffs of Ardmore Bay, offering breathtaking views of the Wild Atlantic Way. The Well spa takes full advantage of this spectacular setting, with treatment rooms overlooking the crashing waves below. The holistic approach combines seaweed therapies, hot stone treatments, and mindfulness practices with the natural power of the Atlantic.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=80"
    ],
    category: "wellness-retreats",
    duration: "2-4 NIGHTS",
    type: "COASTAL WELLNESS",
    difficulty: "All Levels",
    groupSize: "Individual or Couples",
    bestSeason: "April - October",
    pricing: {
      from: "€750",
      currency: "EUR",
      perPerson: true,
      includes: "Sea-view room, treatments, breakfast"
    },
    inclusions: [
      "Sea-view suite with private balcony",
      "Daily signature spa treatment",
      "Full Irish breakfast with sea views",
      "Seaweed wrap and ocean therapy",
      "Cliff walks with wellness guide",
      "Michelin-star dining experience",
      "Sunrise yoga on the terrace"
    ],
    itinerary: [
      { time: "07:00", activity: "Sunrise yoga overlooking the Atlantic" },
      { time: "08:30", activity: "Breakfast with panoramic sea views" },
      { time: "10:00", activity: "Seaweed therapy treatment" },
      { time: "12:00", activity: "Cliff walk to Ardmore Round Tower" },
      { time: "14:00", activity: "Light seafood lunch" },
      { time: "16:00", activity: "Hot stone massage" },
      { time: "19:00", activity: "Michelin-starred dinner" }
    ],
    highlights: ["Cliffside Location", "Seaweed Therapies", "Michelin-Star Dining", "Atlantic Cliff Walks"]
  },
  {
    id: 17,
    title: "Adare Manor Wellness Journey",
    description: "Ultra-luxury wellness at Ireland's grandest manor house, where Victorian elegance meets contemporary spa innovation.",
    fullDescription: "Adare Manor represents the pinnacle of Irish hospitality, and its spa is no exception. This neo-Gothic masterpiece, set on 840 acres along the River Maigue, offers a wellness experience that matches its architectural grandeur. The spa features an indoor pool, hydrotherapy circuits, and treatment rooms that blend period elegance with cutting-edge wellness technology.",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&h=600&fit=crop&q=80"
    ],
    category: "wellness-retreats",
    duration: "3-5 NIGHTS",
    type: "LUXURY ESTATE",
    difficulty: "All Levels",
    groupSize: "Individual, Couples, Groups",
    bestSeason: "Year-round",
    pricing: {
      from: "€2,000",
      currency: "EUR",
      perPerson: true,
      includes: "Suite, full spa program, dining"
    },
    inclusions: [
      "Manor house suite accommodation",
      "Bespoke wellness consultation",
      "Daily spa treatments and therapies",
      "Hydrotherapy circuit access",
      "Full breakfast and dinner daily",
      "Private estate activities",
      "Butler service throughout stay"
    ],
    itinerary: [
      { time: "08:00", activity: "Private morning stretch session" },
      { time: "09:00", activity: "Breakfast in the Oak Room" },
      { time: "10:30", activity: "Wellness consultation and treatment" },
      { time: "13:00", activity: "Light lunch in the Carriage House" },
      { time: "14:30", activity: "Hydrotherapy circuit" },
      { time: "16:30", activity: "Afternoon tea in the Gallery" },
      { time: "19:30", activity: "Tasting menu dinner" }
    ],
    highlights: ["Neo-Gothic Manor House", "840-Acre Estate", "Hydrotherapy Circuit", "Butler Service"]
  },
  {
    id: 18,
    title: "Powerscourt Springs Sanctuary",
    description: "A hidden wellness gem in the Wicklow Mountains, offering holistic healing in Ireland's garden county.",
    fullDescription: "Nestled in the Wicklow Mountains, known as the 'Garden of Ireland,' Powerscourt Springs offers an intimate wellness sanctuary just an hour from Dublin. The ESPA-operated spa draws inspiration from the surrounding landscape, incorporating local botanicals and spring water into its treatments. The Georgian manor setting provides an atmosphere of refined tranquility.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&h=600&fit=crop&q=80"
    ],
    category: "wellness-retreats",
    duration: "1-3 NIGHTS",
    type: "MOUNTAIN RETREAT",
    difficulty: "All Levels",
    groupSize: "Individual or Couples",
    bestSeason: "Year-round",
    pricing: {
      from: "€550",
      currency: "EUR",
      perPerson: true,
      includes: "Room, spa access, breakfast"
    },
    inclusions: [
      "Mountain-view accommodation",
      "ESPA signature treatment",
      "Full Irish breakfast",
      "Thermal suite and pool access",
      "Guided Wicklow nature walk",
      "Aromatherapy workshop",
      "Powerscourt Gardens admission"
    ],
    itinerary: [
      { time: "08:30", activity: "Guided mountain meditation" },
      { time: "09:30", activity: "Organic breakfast" },
      { time: "11:00", activity: "ESPA signature facial" },
      { time: "13:00", activity: "Garden lunch" },
      { time: "14:30", activity: "Powerscourt Gardens exploration" },
      { time: "16:30", activity: "Thermal suite relaxation" },
      { time: "19:00", activity: "Dinner with mountain views" }
    ],
    highlights: ["Wicklow Mountains Setting", "ESPA Treatments", "Powerscourt Gardens", "Georgian Manor"]
  },
  {
    id: 4,
    title: "Ancestral Roots Journey",
    description: "Trace your family lineage through centuries of Irish history with our expert genealogists and local historians.",
    fullDescription: "Embark on a deeply personal journey to discover your Irish ancestry. Our team of professional genealogists has spent months researching your family tree before you arrive, uncovering stories, locations, and living relatives you never knew existed. Walk the land your ancestors farmed, visit the churches where they were baptized, and meet distant cousins still living in the same villages.",
    image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1564399580075-5dfe19c205f3?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&h=600&fit=crop&q=80"
    ],
    category: "heritage-tours",
    duration: "5-7 DAYS",
    type: "GENEALOGY EXPERIENCE",
    difficulty: "Easy",
    groupSize: "2-8 People",
    bestSeason: "April - October",
    pricing: {
      from: "€3,500",
      currency: "EUR",
      perPerson: true,
      includes: "Research, guide, accommodation"
    },
    inclusions: [
      "Pre-trip genealogical research package",
      "Professional genealogist escort throughout",
      "Visits to ancestral homesteads and villages",
      "National Archives and records access",
      "Meeting with living relatives arranged",
      "Premium accommodation in historic hotels",
      "Commemorative family history book"
    ],
    itinerary: [
      { time: "Day 1", activity: "Dublin arrival, genealogy briefing, National Library visit" },
      { time: "Day 2", activity: "Travel to ancestral county, local records research" },
      { time: "Day 3", activity: "Homestead visits, cemetery exploration" },
      { time: "Day 4", activity: "Meet living relatives, traditional dinner" },
      { time: "Day 5", activity: "Church records, baptismal fonts, local museum" },
      { time: "Day 6", activity: "Landscape tour, photography session" },
      { time: "Day 7", activity: "Farewell, family book presentation" }
    ],
    highlights: ["Pre-Trip Research", "Meet Living Relatives", "Ancestral Homesteads", "Family History Book"]
  },
  {
    id: 19,
    title: "Ancient Celtic Trail",
    description: "Journey through 5,000 years of Celtic history, from Newgrange to the Hill of Tara and beyond.",
    fullDescription: "Step back through millennia of Celtic civilization on this immersive archaeological journey. From the Neolithic passage tombs of the Boyne Valley, older than the Egyptian pyramids, to the sacred Hill of Tara where High Kings were crowned, you'll explore Ireland's most significant ancient sites with expert archaeologists and Celtic historians.",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&h=600&fit=crop&q=80"
    ],
    category: "heritage-tours",
    duration: "4-6 DAYS",
    type: "ARCHAEOLOGICAL",
    difficulty: "Moderate",
    groupSize: "4-12 People",
    bestSeason: "March - November",
    pricing: {
      from: "€2,800",
      currency: "EUR",
      perPerson: true,
      includes: "Expert guide, entries, luxury transport"
    },
    inclusions: [
      "Private access to Newgrange inner chamber",
      "Expert archaeologist guide throughout",
      "Hill of Tara ceremonial experience",
      "Celtic ritual and mythology sessions",
      "Traditional harp and storytelling evening",
      "Luxury castle hotel accommodation",
      "All site entry fees included"
    ],
    itinerary: [
      { time: "Day 1", activity: "Dublin, National Museum, Celtic collections" },
      { time: "Day 2", activity: "Newgrange, Knowth, Boyne Valley tombs" },
      { time: "Day 3", activity: "Hill of Tara, Loughcrew cairns" },
      { time: "Day 4", activity: "Clonmacnoise, early Christian heritage" },
      { time: "Day 5", activity: "Rock of Cashel, Cahir Castle" },
      { time: "Day 6", activity: "Farewell, Celtic blessing ceremony" }
    ],
    highlights: ["Newgrange Inner Chamber", "Hill of Tara Ceremony", "5,000 Years of History", "Expert Archaeologists"]
  },
  {
    id: 20,
    title: "Literary Ireland Odyssey",
    description: "Walk in the footsteps of Joyce, Yeats, Wilde, and Beckett through Dublin's literary landmarks.",
    fullDescription: "Ireland has produced more Nobel Prize-winning authors per capita than any nation on Earth. This literary pilgrimage takes you through the Dublin of James Joyce's Ulysses, the Sligo landscapes that inspired W.B. Yeats, and the wit-filled haunts of Oscar Wilde. Meet contemporary Irish writers, attend private readings, and explore the world's greatest literary tradition.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop&q=80"
    ],
    category: "heritage-tours",
    duration: "3-5 DAYS",
    type: "LITERARY HERITAGE",
    difficulty: "Easy",
    groupSize: "2-10 People",
    bestSeason: "Year-round",
    pricing: {
      from: "€1,800",
      currency: "EUR",
      perPerson: true,
      includes: "Expert guide, entries, special events"
    },
    inclusions: [
      "Trinity College Book of Kells private viewing",
      "Bloomsday-style Ulysses walking tour",
      "Yeats country exclusive tour in Sligo",
      "Private reading with Irish author",
      "Abbey Theatre performance tickets",
      "Writers' pub crawl experience",
      "Signed first edition Irish book gift"
    ],
    itinerary: [
      { time: "Day 1", activity: "Dublin, Trinity College, Oscar Wilde statue" },
      { time: "Day 2", activity: "Joyce Tower, Ulysses walking tour" },
      { time: "Day 3", activity: "Travel to Sligo, Yeats country" },
      { time: "Day 4", activity: "Private author meeting, Abbey Theatre" },
      { time: "Day 5", activity: "Literary pub crawl, farewell dinner" }
    ],
    highlights: ["Book of Kells Private View", "Meet Irish Authors", "Yeats Country Tour", "Abbey Theatre"]
  },
  {
    id: 21,
    title: "Scottish Highland Heritage",
    description: "Explore clan history, ancient castles, and the Jacobite legacy across the dramatic Scottish Highlands.",
    fullDescription: "Journey through the mist-shrouded glens and rugged peaks of the Scottish Highlands, tracing centuries of clan warfare, Jacobite rebellion, and Highland tradition. From Culloden's haunting battlefield to the ancestral seats of great clan chiefs, this immersive experience brings Scottish history to life with expert historians, traditional music, and access to private clan estates.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534695215921-52f8a19e7909?w=800&h=600&fit=crop&q=80"
    ],
    category: "heritage-tours",
    duration: "5-8 DAYS",
    type: "CLAN HERITAGE",
    difficulty: "Moderate",
    groupSize: "2-12 People",
    bestSeason: "May - September",
    pricing: {
      from: "£3,200",
      currency: "GBP",
      perPerson: true,
      includes: "Guide, castle stays, private access"
    },
    inclusions: [
      "Clan genealogy research and consultation",
      "Private castle estate access",
      "Culloden battlefield exclusive tour",
      "Traditional Highland games experience",
      "Whisky distillery private tasting",
      "Castle or manor accommodation",
      "Bagpipe and ceilidh evening"
    ],
    itinerary: [
      { time: "Day 1", activity: "Edinburgh, Castle, clan research" },
      { time: "Day 2", activity: "Travel to Highlands, Stirling Castle" },
      { time: "Day 3", activity: "Glencoe, Fort William, Jacobite history" },
      { time: "Day 4", activity: "Culloden, Inverness, clan estates" },
      { time: "Day 5", activity: "Skye or whisky country" },
      { time: "Day 6", activity: "Highland games, ceilidh night" }
    ],
    highlights: ["Clan Genealogy", "Culloden Battlefield", "Private Castle Access", "Highland Games"]
  },
  {
    id: 22,
    title: "Viking & Medieval Dublin",
    description: "Discover Dublin's 1,000-year history from Viking settlement to medieval metropolis.",
    fullDescription: "Dublin was founded by Vikings in 841 AD, and this expert-led tour peels back the layers of the city's millennium of history. Walk the medieval streets where Vikings traded, explore the crypts where Norman knights lie in eternal rest, and discover the treasures of a city that has been conquered, rebuilt, and reimagined countless times.",
    image: "https://images.unsplash.com/photo-1549918864-48ac978761a4?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555109307-f7d9da25c244?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&h=600&fit=crop&q=80"
    ],
    category: "heritage-tours",
    duration: "2-3 DAYS",
    type: "CITY HERITAGE",
    difficulty: "Easy",
    groupSize: "2-15 People",
    bestSeason: "Year-round",
    pricing: {
      from: "€650",
      currency: "EUR",
      perPerson: true,
      includes: "Expert guide, entries, walking tours"
    },
    inclusions: [
      "Dublinia Viking museum experience",
      "Christ Church Cathedral crypts access",
      "Medieval walking tour of Temple Bar",
      "Kilmainham Gaol historical tour",
      "Dublin Castle state apartments",
      "Traditional Irish music evening",
      "Archaeological dig experience"
    ],
    itinerary: [
      { time: "Day 1", activity: "Viking Dublin, Dublinia, Wood Quay" },
      { time: "Day 2", activity: "Medieval Dublin, crypts, castle" },
      { time: "Day 3", activity: "Georgian Dublin, Kilmainham, farewell" }
    ],
    highlights: ["Viking Museums", "Cathedral Crypts", "Dublin Castle", "1,000 Years of History"]
  },
  {
    id: 5,
    title: "Ashford Castle Royal Experience",
    description: "Live like royalty in an 800-year-old castle on the shores of Lough Corrib, Ireland's most iconic luxury estate.",
    fullDescription: "Ashford Castle has welcomed guests for over 800 years, from the de Burgo clan to the Guinness family, and now you. Set on 350 acres along Lough Corrib, this fairy-tale castle offers an experience unlike any other—falconry on ancient grounds, fishing in pristine waters, and dining in candlelit chambers where history whispers from every stone.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop&q=80"
    ],
    category: "castle-stays",
    duration: "2-7 NIGHTS",
    type: "MEDIEVAL CASTLE",
    difficulty: "Luxury",
    groupSize: "2-24 Guests",
    bestSeason: "Year-round",
    pricing: {
      from: "€1,200",
      currency: "EUR",
      perPerson: true,
      includes: "Suite, breakfast, activities"
    },
    inclusions: [
      "Stateroom or suite accommodation",
      "Full Irish breakfast daily",
      "Complimentary falconry experience",
      "Access to 350-acre estate",
      "Afternoon tea in the Connaught Room",
      "Private cinema and billiards",
      "Estate activities: archery, fishing, golf"
    ],
    itinerary: [
      { time: "Day 1", activity: "Castle arrival, champagne welcome, estate tour" },
      { time: "Day 2", activity: "Falconry morning, spa afternoon, fine dining" },
      { time: "Day 3", activity: "Lake cruise, golf or fishing" },
      { time: "Day 4", activity: "Departure with keepsake" }
    ],
    highlights: ["800-Year History", "Falconry School", "Lough Corrib Estate", "Michelin Dining"]
  },
  {
    id: 23,
    title: "Dromoland Castle Estate",
    description: "Experience Irish nobility at this 16th-century castle, ancestral home of the O'Brien clan, descendants of Brian Boru.",
    fullDescription: "Dromoland Castle stands as one of the few properties in Ireland that can truly claim royal lineage. Home to the O'Brien family, direct descendants of High King Brian Boru, this magnificent estate offers 450 acres of parkland, a championship golf course, and hospitality refined over five centuries. Every suite tells a story; every meal celebrates tradition.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=600&fit=crop&q=80"
    ],
    category: "castle-stays",
    duration: "2-5 NIGHTS",
    type: "NOBLE ESTATE",
    difficulty: "Luxury",
    groupSize: "2-16 Guests",
    bestSeason: "Year-round",
    pricing: {
      from: "€950",
      currency: "EUR",
      perPerson: true,
      includes: "Castle room, breakfast, golf"
    },
    inclusions: [
      "Castle or estate wing accommodation",
      "Full breakfast in the Earl of Thomond Room",
      "Championship golf green fees",
      "Spa treatment credit",
      "Private estate walking trails",
      "Clay pigeon shooting session",
      "Evening whiskey tasting"
    ],
    itinerary: [
      { time: "Day 1", activity: "Arrival, castle tour, afternoon tea" },
      { time: "Day 2", activity: "Golf morning, spa afternoon" },
      { time: "Day 3", activity: "Country pursuits: shooting, fishing" },
      { time: "Day 4", activity: "Farewell Irish breakfast" }
    ],
    highlights: ["Royal O'Brien Heritage", "Championship Golf", "450-Acre Estate", "Historic Dining"]
  },
  {
    id: 24,
    title: "Ballynahinch Castle Retreat",
    description: "A romantic lakeside castle in the wild heart of Connemara, surrounded by mountains, rivers, and ancient woodland.",
    fullDescription: "Ballynahinch Castle sits at the heart of a 700-acre private estate in Connemara, where the Twelve Bens mountains meet the Owenmore River. This intimate castle offers world-class salmon fishing, walking trails through ancient oak woodlands, and a sense of wild Irish romance that has captivated guests from maharajas to movie stars.",
    image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800&h=600&fit=crop&q=80"
    ],
    category: "castle-stays",
    duration: "2-4 NIGHTS",
    type: "ROMANTIC RETREAT",
    difficulty: "Relaxed Luxury",
    groupSize: "2-8 Guests",
    bestSeason: "March - November",
    pricing: {
      from: "€680",
      currency: "EUR",
      perPerson: true,
      includes: "Riverside room, breakfast, fishing"
    },
    inclusions: [
      "Riverside or castle room accommodation",
      "Full Irish breakfast",
      "Salmon fishing permit (seasonal)",
      "Estate walking maps and guides",
      "Wellies and outdoor gear",
      "Picnic hamper for estate walks",
      "Fireside whiskey nightcap"
    ],
    itinerary: [
      { time: "Day 1", activity: "Arrival, riverside walk, fireside dinner" },
      { time: "Day 2", activity: "Salmon fishing or woodland walk" },
      { time: "Day 3", activity: "Connemara exploration, castle dinner" },
      { time: "Day 4", activity: "Leisurely breakfast, departure" }
    ],
    highlights: ["700-Acre Wilderness", "Salmon Fishing Rights", "Twelve Bens Views", "Wild Romance"]
  },
  {
    id: 25,
    title: "Adare Manor Grand Experience",
    description: "Ultra-luxury in Ireland's grandest Gothic Revival manor, home to one of Europe's finest golf courses.",
    fullDescription: "Adare Manor is Ireland's crown jewel of luxury hospitality. This neo-Gothic masterpiece, set on 840 acres along the River Maigue in County Limerick, has been meticulously restored to offer an unparalleled experience. The Tom Fazio-designed golf course hosts the Ryder Cup 2027, while the spa, dining, and service set new standards for Irish hospitality.",
    image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80"
    ],
    category: "castle-stays",
    duration: "3-7 NIGHTS",
    type: "ULTRA-LUXURY MANOR",
    difficulty: "Premium Luxury",
    groupSize: "2-20 Guests",
    bestSeason: "Year-round",
    pricing: {
      from: "€2,500",
      currency: "EUR",
      perPerson: true,
      includes: "Manor suite, dining, golf"
    },
    inclusions: [
      "Manor house suite accommodation",
      "Full breakfast and dinner daily",
      "Tom Fazio golf course access",
      "Spa treatment per stay",
      "Butler service",
      "Estate activities included",
      "Champagne welcome"
    ],
    itinerary: [
      { time: "Day 1", activity: "Manor arrival, suite orientation, dinner" },
      { time: "Day 2", activity: "Championship golf, spa recovery" },
      { time: "Day 3", activity: "Estate activities, fine dining" },
      { time: "Day 4", activity: "Leisurely departure" }
    ],
    highlights: ["Ryder Cup 2027 Venue", "840-Acre Estate", "Butler Service", "Neo-Gothic Splendor"]
  },
  {
    id: 26,
    title: "Cabra Castle Gothic Romance",
    description: "A fairytale Gothic castle in the Irish midlands, where medieval towers meet Victorian elegance.",
    fullDescription: "Cabra Castle rises from the Cavan countryside like something from a Gothic romance. With origins dating to the 12th century and major expansions in Victorian times, this stunning castle offers turrets, towers, and secret gardens. The intimate setting makes it perfect for those seeking authentic castle living without the overwhelming grandeur of larger properties.",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop&q=80"
    ],
    category: "castle-stays",
    duration: "1-4 NIGHTS",
    type: "GOTHIC CASTLE",
    difficulty: "Boutique Luxury",
    groupSize: "2-12 Guests",
    bestSeason: "Year-round",
    pricing: {
      from: "€450",
      currency: "EUR",
      perPerson: true,
      includes: "Castle room, breakfast, tour"
    },
    inclusions: [
      "Castle or courtyard accommodation",
      "Full Irish breakfast",
      "Private castle tour with historian",
      "Access to 100 acres of gardens",
      "Drawing room with open fires",
      "Nine-hole golf course",
      "Dinner in the castle restaurant"
    ],
    itinerary: [
      { time: "Day 1", activity: "Castle arrival, garden exploration, dinner" },
      { time: "Day 2", activity: "Castle tour, golf, afternoon tea" },
      { time: "Day 3", activity: "Breakfast, departure" }
    ],
    highlights: ["12th Century Origins", "Gothic Towers", "Intimate Setting", "Secret Gardens"]
  },
  {
    id: 6,
    title: "Wild Atlantic Coastal Hike",
    description: "Traverse the dramatic cliff paths of the Wild Atlantic Way, from the Cliffs of Moher to Sliabh Liag.",
    fullDescription: "Experience the raw power of the Atlantic Ocean on this guided hiking expedition along Europe's western edge. Walk the iconic Cliffs of Moher away from the crowds, explore the remote splendor of Sliabh Liag (Europe's highest sea cliffs), and discover hidden coves accessible only by foot. Our expert guides share local folklore, geology, and history as you breathe the freshest air in the world.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&h=600&fit=crop&q=80"
    ],
    category: "adventure-expeditions",
    duration: "6-8 HOURS",
    type: "COASTAL HIKING",
    difficulty: "Moderate",
    groupSize: "4-12 People",
    bestSeason: "April - September",
    pricing: {
      from: "€150",
      currency: "EUR",
      perPerson: true,
      includes: "Guide, transport, lunch"
    },
    inclusions: [
      "Expert local hiking guide",
      "Private transport from accommodation",
      "Gourmet picnic lunch with local produce",
      "National Park entry fees",
      "Hiking poles and safety gear",
      "Post-hike refreshments in local pub"
    ],
    itinerary: [
      { time: "09:00", activity: "Pick up and scenic drive to trailhead" },
      { time: "10:30", activity: "Begin coastal hike at exclusive access point" },
      { time: "13:00", activity: "Picnic lunch overlooking the Atlantic" },
      { time: "14:00", activity: "Continue hike to main viewpoint" },
      { time: "16:00", activity: "Traditional pub visit for music and food" }
    ],
    highlights: ["Cliffs of Moher", "Sliabh Liag", "Hidden Coves", "Local Folklore"]
  },
  {
    id: 27,
    title: "Killarney Lakes Kayak",
    description: "Paddle through the legendary Lakes of Killarney, exploring ancient island ruins and diverse wildlife.",
    fullDescription: "Glide silently through the mystical Lakes of Killarney, surrounded by the MacGillycuddy's Reeks mountains. This kayaking adventure takes you to Innisfallen Island, home to a 7th-century monastery, and offers unique chances to spot red deer, white-tailed eagles, and otters. Whether sunrise or sunset, the stillness of the lakes is a magical experience.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520116468816-95b69f847357?w=800&h=600&fit=crop&q=80"
    ],
    category: "adventure-expeditions",
    duration: "3-4 HOURS",
    type: "LAKE KAYAKING",
    difficulty: "Easy/Moderate",
    groupSize: "2-8 People",
    bestSeason: "March - October",
    pricing: {
      from: "€95",
      currency: "EUR",
      perPerson: true,
      includes: "Kayak hire, guide, snack"
    },
    inclusions: [
      "Top-quality kayak and equipment rental",
      "Certified kayak instructor/guide",
      "Visit to Innisfallen Island ruins",
      "Waterproof gear and life jackets",
      "Hot drinks and homemade scones",
      "Wildlife spotting opportunities"
    ],
    itinerary: [
      { time: "09:00", activity: "Meet at Ross Castle pier" },
      { time: "09:30", activity: "Safety briefing and launch" },
      { time: "11:00", activity: "Land on Innisfallen Island" },
      { time: "12:30", activity: "Return paddle across Lough Leane" }
    ],
    highlights: ["Ross Castle", "Innisfallen Island", "Red Deer", "Mountain Views"]
  },
  {
    id: 28,
    title: "Ring of Kerry Cycle",
    description: "Cycle Ireland's most famous scenic route, enjoying breathtaking mountain and coastal views at your own pace.",
    fullDescription: "Experience the world-renowned Ring of Kerry on two wheels. This supported cycling tour captures the essence of the Iveragh Peninsula—rugged coastlines, charming villages like Sneem and Waterville, and the majestic Molls Gap. With e-bike options available, you can tackle the hills with ease and focus on the stunning panorama unfolding around every bend.",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80"
    ],
    category: "adventure-expeditions",
    duration: "1-3 DAYS",
    type: "SCENIC CYCLING",
    difficulty: "Moderate/Active",
    groupSize: "2-10 People",
    bestSeason: "April - October",
    pricing: {
      from: "€250",
      currency: "EUR",
      perPerson: true,
      includes: "Bike hire, support vehicle"
    },
    inclusions: [
      "Premium road bike or e-bike rental",
      "Support vehicle for luggage and tired legs",
      "Local cycling guide",
      "Route maps and GPS units",
      "Daily lunch stops in local villages",
      "Mechanical support"
    ],
    itinerary: [
      { time: "Day 1", activity: "Killarney to Caherdaniel" },
      { time: "Day 2", activity: "Caherdaniel to Portmagee" },
      { time: "Day 3", activity: "Portmagee to Killarney via Molls Gap" }
    ],
    highlights: ["Molls Gap", "Skellig Ring", "Ladies View", "Sneem Village"]
  },
  {
    id: 29,
    title: "Donegal Sea Stack Climb",
    description: "For the adventurous: climb towering sea stacks off the rugged Donegal coast in a world-unique environment.",
    fullDescription: "Donegal is home to a unique collection of sea stacks—towers of rock rising hundreds of feet from the Atlantic Ocean. This expedition offers a rare opportunity to climb these geological giants under the guidance of expert climbers. It's a raw, wild, and adrenaline-fueled adventure in one of Ireland's most remote corners.",
    image: "https://images.unsplash.com/photo-1521336575822-6da63fb45455?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502126324834-38f8e02d7160?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1456613820599-bfe244172af5?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522509585149-c9cd39d1f39b?w=800&h=600&fit=crop&q=80"
    ],
    category: "adventure-expeditions",
    duration: "FULL DAY",
    type: "ROCK CLIMBING",
    difficulty: "Challenging",
    groupSize: "1-4 People",
    bestSeason: "May - September",
    pricing: {
      from: "€300",
      currency: "EUR",
      perPerson: true,
      includes: "Instructor, gear, boat"
    },
    inclusions: [
      "Expert climbing instruction and guidance",
      "All technical climbing equipment",
      "Safety zodiac boat support",
      "Wetsuits and safety gear",
      "GoPro footage of your climb",
      "Packed lunch on the ocean"
    ],
    itinerary: [
      { time: "08:30", activity: "Gear check and safety briefing" },
      { time: "09:30", activity: "Boat trip to sea stack location" },
      { time: "10:30", activity: "Tyrolean traverse or kayak approach" },
      { time: "11:30", activity: "Guided climb of the sea stack" },
      { time: "14:00", activity: "Summit celebration and lunch" },
      { time: "16:30", activity: "Return to shore" }
    ],
    highlights: ["Unclimbed Routes", "Atlantic Ocean", "Technical Climbing", "Remote Wilderness"]
  },
  {
    id: 30,
    title: "Connemara Beach Riding",
    description: "Gallop across white sandy beaches on native pristine Connemara ponies.",
    fullDescription: "Experience the thrill of horseback riding on the pristine beaches of Connemara. Ride a sure-footed Connemara Pony or an Irish Hunter along the coastline of the Wild Atlantic Way. From gentle trots in the shallows to exhilarating gallops on the sand, this equestrian adventure caters to all levels and offers a unique perspective on the landscape.",
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548678747-a8c19f987ca7?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598556776374-13617008af72?w=800&h=600&fit=crop&q=80"
    ],
    category: "adventure-expeditions",
    duration: "2-4 HOURS",
    type: "HORSE RIDING",
    difficulty: "All Levels",
    groupSize: "1-6 People",
    bestSeason: "Year-round",
    pricing: {
      from: "€120",
      currency: "EUR",
      perPerson: true,
      includes: "Horse, guide, equipment"
    },
    inclusions: [
      "Appropriate horse/pony matching",
      "Professional equestrian guide",
      "Riding hat and boots rental",
      "Beach ride experience",
      "Photos of your ride",
      "Introduction to Connemara Pony history"
    ],
    itinerary: [
      { time: "10:00", activity: "Arrival at stables and horse matching" },
      { time: "10:30", activity: "Trek through dunes to the beach" },
      { time: "11:00", activity: "Beach riding (pace to suit ability)" },
      { time: "12:00", activity: "Return trek via coastal path" }
    ],
    highlights: ["Connemara Ponies", "White Sand Beaches", "Privately Guided", "Atlantic Views"]
  },
  {
    id: 31,
    title: "Wicklow Mountains E-Bike",
    description: "Explore the 'Garden of Ireland' with effortless ease on a premium e-bike tour of mountains and lakes.",
    fullDescription: "Discover the rolling hills and deep valleys of the Wicklow Mountains National Park without the grueling climbs. Our premium e-bikes make light work of the terrain, allowing you to visit Glendalough, the Guinness Lake (Lough Tay), and the Sally Gap. Enjoy the freedom of the open road and the fresh mountain air on this exhilarating two-wheeled tour.",
    image: "https://images.unsplash.com/photo-1519119820535-64bc63b15ad8?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565799797239-a8a8b5f2e4fb?w=800&h=600&fit=crop&q=80"
    ],
    category: "adventure-expeditions",
    duration: "HALF DAY",
    type: "E-BIKE TOUR",
    difficulty: "Easy/Moderate",
    groupSize: "2-12 People",
    bestSeason: "March - October",
    pricing: {
      from: "€110",
      currency: "EUR",
      perPerson: true,
      includes: "E-bike, guide, transfer"
    },
    inclusions: [
      "High-performance E-Bike rental",
      "Helmet and safety accessories",
      "Support vehicle accompaniment",
      "Local expert guide",
      "Refreshment stop in Roundwood",
      "Return transport from Dublin"
    ],
    itinerary: [
      { time: "09:00", activity: "Depart Dublin" },
      { time: "10:00", activity: "Collect bikes at Roundwood" },
      { time: "10:30", activity: "Cycle to Lough Tay & Sally Gap" },
      { time: "12:30", activity: "Descent to Glendalough" },
      { time: "13:30", activity: "Lunch and monastic site walk" }
    ],
    highlights: ["Glendalough", "Sally Gap", "Lough Tay", "Guinness Estate"]
  },
  {
    id: 7,
    title: "Family Castle Adventure",
    description: "A magical journey for the whole family, featuring falconry, archery, and castle exploration.",
    fullDescription: "Create unforgettable family memories with this castle-based adventure. Stay in a real Irish castle where history comes alive. Learn the ancient art of falconry with hawks landing on your arm, practice archery like a medieval knight, and explore secret gardens and dungeon tours. It's history disguised as pure fun, perfect for all ages.",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1485550409059-9afb054cada4?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544979590-37e9b47cd705?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1605445205562-b9b5f3d790e8?w=800&h=600&fit=crop&q=80"
    ],
    category: "family",
    duration: "3-5 DAYS",
    type: "FAMILY ADVENTURE",
    difficulty: "Easy/Fun",
    groupSize: "Family (4-10)",
    bestSeason: "Year-round",
    pricing: {
      from: "€2,500",
      currency: "EUR",
      perPerson: false,
      includes: "Family suite, all activities"
    },
    inclusions: [
      "Family castle suite accommodation",
      "Private falconry experience (1.5 hours)",
      "Archery lesson for adults and kids",
      "Interactive castle history tour",
      "Medieval banquet dinner",
      "Treasure hunt in the estate gardens",
      " babysitting services one evening"
    ],
    itinerary: [
      { time: "Day 1", activity: "Arrival and costume fitting" },
      { time: "Day 2", activity: "Falconry and Archery" },
      { time: "Day 3", activity: "Treasure Hunt and Dungeon Tour" },
      { time: "Day 4", activity: "Farewell Medieval Feast" }
    ],
    highlights: ["Falconry", "Archery", "Treasure Hunt", "Medieval Banquet"]
  },
  {
    id: 32,
    title: "Celtic Fairy Trail & Myths",
    description: "Discover the magic of Ireland with fairy trails, storytelling, and mythical landscapes.",
    fullDescription: "Spark your children's imagination on this journey through the land of myths and legends. Visit the Giant's Causeway, search for leprechauns in enchanting forests, and listen to traditional storytellers weave tales of warriors and faeries by the fireside. This tour blends outdoor exploration with the magic of Irish folklore.",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop&q=80"
    ],
    category: "family",
    duration: "4-6 DAYS",
    type: "MYTH & MAGIC",
    difficulty: "Easy",
    groupSize: "Family (3-8)",
    bestSeason: "April - October",
    pricing: {
      from: "€2,200",
      currency: "EUR",
      perPerson: false,
      includes: "Guide, hotels, entry fees"
    },
    inclusions: [
      "Expert storyteller guide",
      "Visit to Giant's Causeway",
      "Underground boat trip in caves",
      "Fairy trail workshops",
      "Traditional cottage rental",
      "Sheepdog demonstration",
      "Chocolate factory visit"
    ],
    itinerary: [
      { time: "Day 1", activity: "Dublin Myths & Legends Tour" },
      { time: "Day 2", activity: "Hidden Heartlands & Fairy Trees" },
      { time: "Day 3", activity: "West Coast Magic & Cliffs" },
      { time: "Day 4", activity: "Giant's Causeway Adventure" }
    ],
    highlights: ["Giant's Causeway", "Storytelling", "Sheepdogs", "Chocolate Factory"]
  },
  {
    id: 33,
    title: "Wildlife Safari: Sea & Sky",
    description: "An educational wildlife adventure: whale watching, seal spotting, and puffin colonies.",
    fullDescription: "Ireland's coastline is teeming with life. This family safari takes you out on the Atlantic to spot dolphins and whales, visits seal sanctuaries, and takes a boat trip to the Skelligs to see puffins. It's a hands-on, educational adventure perfect for budding biologists and nature lovers.",
    image: "https://images.unsplash.com/photo-1575304675716-e4d0d36746f3?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1588165171080-c89ac14da102?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80"
    ],
    category: "family",
    duration: "3 DAYS",
    type: "WILDLIFE SAFARI",
    difficulty: "Moderate",
    groupSize: "Family (4-12)",
    bestSeason: "May - September",
    pricing: {
      from: "€1,800",
      currency: "EUR",
      perPerson: false,
      includes: "Boat trips, guide, stay"
    },
    inclusions: [
      "Whale & Dolphin watching boat trip",
      "Puffin island cruise (seasonal)",
      "Aquarium private tour",
      "Coastal foraging walk",
      "Binoculars and wildlife checklists",
      "Picnic lunches on the coast"
    ],
    itinerary: [
      { time: "Day 1", activity: "West Cork Whale Watching" },
      { time: "Day 2", activity: "Seal Island & Kayaking" },
      { time: "Day 3", activity: "Puffin Colony & Coastal Hike" }
    ],
    highlights: ["Whales & Dolphins", "Puffins", "Seals", "Coastal Foraging"]
  },
  {
    id: 34,
    title: "Steam Train & Coastal Tracks",
    description: "All aboard for a nostalgic journey on vintage steam trains and spectacular coastal railways.",
    fullDescription: "Take a step back in time with a family rail adventure. Ride the steam train along the River Suir, experience the spectacular Causeway Coast rail journey, and take the unique Lartigue Monorail. It's a relaxed, scenic way to see the country that delights kids and grandparents alike.",
    image: "https://images.unsplash.com/photo-1533939626388-7e5af923d3a0?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549487928-863a8a071f11?w=800&h=600&fit=crop&q=80"
    ],
    category: "family",
    duration: "4 DAYS",
    type: "RAIL ADVENTURE",
    difficulty: "Easy",
    groupSize: "Family (Unlimited)",
    bestSeason: "April - September",
    pricing: {
      from: "€1,600",
      currency: "EUR",
      perPerson: false,
      includes: "All train tickets, hotels"
    },
    inclusions: [
      "Steam train experience tickets",
      "Coastal rail journey passes",
      "Model railway village visit",
      "Transport between stations",
      "Family-friendly station hotels",
      "Driver/guide for non-rail segments"
    ],
    itinerary: [
      { time: "Day 1", activity: "Waterford & Suir Valley Railway" },
      { time: "Day 2", activity: "West Cork Model Railway Village" },
      { time: "Day 3", activity: "Lartigue Monorail Experience" },
      { time: "Day 4", activity: "Causeway Coast Rail Journey" }
    ],
    highlights: ["Steam Trains", "Model Village", "Coastal Canoramas", "Lartigue Monorail"]
  },
  {
    id: 35,
    title: "Outdoor Activity Centre",
    description: "High-energy fun at Ireland's premier outdoor parks: ziplining, high ropes, and water parks.",
    fullDescription: "Ideally suited for families with teenagers, this action-packed itinerary hits the best adventure parks in the country. Fly down ziplines in the forest, tackle high-ropes courses, and splash out at aqua parks. It's active, safe, and guaranteed to burn off energy.",
    image: "https://images.unsplash.com/photo-1533591380327-9a499a0ed38d?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596323485741-6143c7739506?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544367563-12123d8965cd?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop&q=80"
    ],
    category: "family",
    duration: "3 DAYS",
    type: "ACTIVE FUN",
    difficulty: "Active",
    groupSize: "Family (4-8)",
    bestSeason: "May - September",
    pricing: {
      from: "€1,400",
      currency: "EUR",
      perPerson: false,
      includes: "All activity passes, lodge"
    },
    inclusions: [
      "Zipit Forest Adventure pass",
      "Aqua park entry",
      "High ropes course instruction",
      "Mountain biking trail pass",
      "Self-catering forest lodge",
      "Pizza night included"
    ],
    itinerary: [
      { time: "Day 1", activity: "Zipit Forest Park Adventure" },
      { time: "Day 2", activity: "Lough Key Forest & Activity Park" },
      { time: "Day 3", activity: "Aqua Park Splashdown" }
    ],
    highlights: ["Ziplining", "High Ropes", "Water Park", "Forest Lodges"]
  },
  {
    id: 8,
    title: "Coastal Bliss",
    description: "Private yacht charters and exclusive beach retreats",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    category: "luxury"
  }
];

export const privateRentals = [
  {
    id: 1,
    name: "Luggala Estate",
    location: "Wicklow Mountains, Ireland",
    bedrooms: 7,
    guests: 14,
    description: "The Guinness family's former ancestral home, nestled in a valley of breathtaking beauty.",
    fullDescription: "Luggala Lodge is an exquisite 18th-century gothic revival house set in a hidden valley of the Wicklow Mountains. Once the home of the Guinness family, it has hosted artists, musicians, and poets for decades. The estate spans 5,000 acres of mountain and lakeshore, offering absolute privacy and a unique bohemian luxury aesthetic.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=800&fit=crop&q=80",
    price: "From €25,000/week",
    amenities: ["Private Lake", "House Staff", "library", "Formal Gardens", "Helipad"],
    type: "Historic Estate",
    gallery: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    id: 2,
    name: "Eilean Shona House",
    location: "Private Island, Scotland",
    bedrooms: 8,
    guests: 16,
    description: "Currently inspiration for Neverland, this private island offers wild freedom and classic luxury.",
    fullDescription: "Escape to your own private island in the Scottish Hebrides. Eilean Shona House is glorious, traditional, and totally secluded. With no cars on the island, it is a haven for wildlife and relaxation. The house is furnished with eclectic antiques and bold art, creating a warm, inviting atmosphere for large gatherings.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop&q=80",
    price: "From £15,000/week",
    amenities: ["Private Island", "Chef Service", "Boat Access", "Wild Swimming", "Billiards Room"],
    type: "Private Island",
    gallery: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    id: 3,
    name: "The Georgian Townhouse",
    location: "Edinburgh, Scotland",
    bedrooms: 5,
    guests: 10,
    description: "An architectural masterpiece in the heart of Edinburgh's New Town.",
    fullDescription: "Experience city living at its finest in this restored Georgian masterpiece. Located in Edinburgh's UNESCO World Heritage New Town, this property combines period grandeur with contemporary comfort. High ceilings, original fireplaces, and widespread views of the city make it the perfect base for urban exploration.",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&h=800&fit=crop&q=80",
    price: "From £1,200/night",
    amenities: ["City Center", "Rooftop Terrace", "Cinema Room", "Concierge", "Wine Cellar"],
    type: "City Residence",
    gallery: [
      "https://images.unsplash.com/photo-1503348128456-654cf0496884?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    id: 4,
    name: "Kinsale Coastal Lodge",
    location: "Cork, Ireland",
    bedrooms: 6,
    guests: 12,
    description: "Modern architectural marvel perched on the cliffs overlooking the Celtic Sea.",
    fullDescription: "This award-winning contemporary glass-walled villa offers uninterrupted views of the ocean from every room. Private access to a secluded beach, a heated infinity pool, and a state-of-the-art kitchen make it a dream for those who appreciate modern design and ocean living. Located near the gourmet capital of Kinsale.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&h=800&fit=crop&q=80",
    price: "From €8,000/week",
    amenities: ["Infinity Pool", "Private Beach", "Smart Home", "BBQ Terrace", "Gym"],
    type: "Modern Villa",
    gallery: [
      "https://images.unsplash.com/photo-1512918580421-32c299cacdad?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    id: 5,
    name: "Cotswold Stone Manor",
    location: "Gloucestershire, England",
    bedrooms: 9,
    guests: 18,
    description: "Honey-colored stone, rose gardens, and roaring fires in a picture-perfect English village.",
    fullDescription: "Embodying the essence of the English countryside, this 16th-century manor house is surrounded by manicured gardens and rolling hills. Inside, expect oak beams, flagstone floors, and four-poster beds. It's the ultimate setting for a traditional English country escape, complete with croquet on the lawn and afternoon tea in the drawing room.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&q=80",
    price: "From £9,500/week",
    amenities: ["Tennis Court", "Heated Pool", "Croquet Lawn", "Aga Kitchen", "Stables"],
    type: "Country Manor",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    id: 6,
    name: "Tuscan Vineyard Estate",
    location: "Tuscany, Italy",
    bedrooms: 10,
    guests: 20,
    description: "A restorative retreat among the vines, producing its own Chianti Classico.",
    fullDescription: "Live la dolce vita in this restored farmhouse complex overlooking its own vineyards and olive groves. The estate features a private wine cellar, a cooking school kitchen for private lessons, and a saltwater pool with panoramic views of the Tuscan hills. Perfect for food and wine lovers.",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&h=800&fit=crop&q=80",
    price: "From €12,000/week",
    amenities: ["Private Vineyard", "Pool", "Pizza Oven", "Wine Cellar", "Cookery School"],
    type: "Vineyard Villa",
    gallery: [
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&h=600&fit=crop&q=80"
    ]
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Charlotte & James W.",
    location: "New York, USA",
    quote: "Our traversal of the Emerald Isle was an absolute masterpiece of curation. W&C didn't just plan a trip; they orchestrated a series of unforgettable moments that resonated with our souls.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"
  },
  {
    id: 2,
    name: "The Sterling Family",
    location: "London, UK",
    quote: "To find a partner who understands the nuance of multi-generational travel is rare. W&C delivered a journey of profound connection and effortless elegance that we will cherish for a lifetime.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
  },
  {
    id: 3,
    name: "Julian Vane",
    location: "Hong Kong",
    quote: "The level of access provided was truly unparalleled. From private gallery viewings to after-hours estate tours, every experience felt like a privilege reserved only for the few.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
  }
];



export const partners = [
  { id: 1, name: "Virtuoso", logo: "virtuoso" },
  { id: 2, name: "Travel + Leisure", logo: "travel-leisure" },
  { id: 3, name: "Condé Nast", logo: "conde-nast" },
  { id: 4, name: "Relais & Châteaux", logo: "relais" },
  { id: 5, name: "Select Hotels", logo: "select" }
];

export const blogPosts = [
  {
    id: 1,
    title: "The Art of Slow Travel in the Scottish Highlands",
    excerpt: "In a world demanding speed, the Highlands invite us to pause. Discover why the true magic of Scotland is revealed only to those who linger.",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1600&q=80",
    date: "June 15, 2025",
    category: "Travel Philosophy",
    author: {
      name: "Alexander Sterling",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
    },
    readingTime: "6 min read",
    content: [
      {
        type: "paragraph",
        text: "The morning mist clung to the valleys of the Highlands like a forgotten secret. As the first light touched the peaks of Buachaille Etive Mòr, the landscape transformed into a tapestry of gold and emerald—a vivid reminder that in the wild, time follows a completely different rhythm."
      },
      {
        type: "quote",
        text: "Luxury is not about the price of the thread, but the depth of the story it weaves into your soul."
      },
      {
        type: "paragraph",
        text: "We spent hours navigating the ancient trails of Glencoe, guided not by digital maps but by the intuition of our local tracker, Ewan. Here, far from the digital hum of modern life, we found a silence so profound it felt like a presence purely of its own. It is in these moments of quietude that the Highlands truly speak."
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?w=1200&q=80",
        caption: "The majestic silence of Glencoe at dawn."
      },
      {
        type: "paragraph",
        text: "There is a specific kind of clarity that only arrives when you are completely surrounded by the untamed. In the heart of the reserve, boundaries between the self and the environment begin to dissolve. You are no longer just an observer; you become part of the wind, the stone, and the heather."
      },
      {
        type: "paragraph",
        text: "As evening descended, we returned to our private estate. A fire crackled in the hearth, and the scent of aged peat and oak filled the air. We shared stories over a dram of 18-year-old single malt, realizing that the most profound journeys are those that bring us back to ourselves."
      }
    ]
  },
  {
    id: 2,
    title: "Ireland's Hidden Culinary Renaissance",
    excerpt: "Beyond the hearty staples of the past, a new generation of chefs is redefining Irish cuisine with hyper-local ingredients and avant-garde technique.",
    image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=1600&q=80",
    date: "June 8, 2025",
    category: "Gastronomy",
    author: {
      name: "Daria Voskresenskaya",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    readingTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text: "For decades, Irish food was misunderstood, often reduced to its simplest elements. But travel across the emerald counties today, and you will encounter a culinary revolution. From the seaweed-foraging chefs of Galway to the farm-to-table estates in Cork, Ireland is undergoing a delicious renaissance."
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
        caption: "Fresh, locally sourced ingredients form the heart of modern Irish cooking."
      },
      {
        type: "paragraph",
        text: "At the heart of this movement is a deep respect for the land. We visited a small organic farm in County Wicklow where the menu is dictated solely by what the soil yields that morning. 'If it's not in the ground today, it's not on the plate,' the head chef told us."
      },
      {
        type: "quote",
        text: "True flavor is born from the rain, the soil, and the hands that tend it."
      },
      {
        type: "paragraph",
        text: "Dining here is an intimate affair. It is not just about sustenance; it is storytelling on a plate. Each course narrates the history of the region, from the ancient fishing traditions of the coast to the pastoral heritage of the midlands. It is a taste of Ireland, refined and reimagined for the modern palate."
      }
    ]
  },
  {
    id: 3,
    title: "Safari Season: The Rhythm of the Serengeti",
    excerpt: "Witnessing the Great Migration is not merely a sightseeing opportunity; it is a humbling encounter with the primal force of nature itself.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=80",
    date: "May 28, 2025",
    category: "Safari",
    author: {
      name: "Marcus Thorne",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80"
    },
    readingTime: "7 min read",
    content: [
      {
        type: "paragraph",
        text: "The earth trembles before you see them. A low, rhythmic thrumming that vibrates through the soles of your boots. Then, they appear on the horizon—a shifting, living sea of wildebeest and zebra, moving as one vast organism across the golden plains."
      },
      {
        type: "paragraph",
        text: "We were stationed at a private mobile camp, set up specifically to intercept the migration deep in the Serengeti. There were no other vehicles for miles, only the endless sky and the raw drama of survival unfolding before our eyes."
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1547471080-7541fbe93655?w=1200&q=80",
        caption: "The golden hour on the plains of East Africa."
      },
      {
        type: "quote",
        text: "In the bush, you do not watch nature. You enter it."
      },
      {
        type: "paragraph",
        text: "The nights were equally enchanting. Under a canopy of stars so bright they felt within reach, we listened to the distant roar of lions asserting their dominion. It is a place where humanity feels small, and that is a beautiful thing. It reminds us of our place in the greater web of life."
      }
    ]
  },
  {
    id: 4,
    title: "Kyoto: Where Tradition Meets Tomorrow",
    excerpt: "Exploring the silent temples and bustling streets of Japan's ancient capital, finding stillness in the center of motion.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&q=80",
    date: "May 12, 2025",
    category: "Cultural Immersion",
    author: {
      name: "Yuki Tanaka",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80"
    },
    readingTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text: "Kyoto is a city of layers. On the surface, it is a bustling modern metropolis. But step through a wooden gate, and you are transported centuries back in time. The smell of incense, the sound of a rake on gravel, the sight of a moss garden glistening in the rain."
      },
      {
        type: "quote",
        text: "Silence is not the absence of sound, but the presence of peace."
      },
      {
        type: "paragraph",
        text: "We participated in a private tea ceremony at a Zen temple normally closed to the public. The master moved with a fluidity that was hypnotic, every gesture precise and meaningful. It was a lesson in mindfulness—a reminder that the most ordinary actions, when performed with intention, become art."
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?w=1200&q=80",
        caption: "The serene beauty of a Kyoto zen garden."
      }
    ]
  }
];

export const teamMembers = [
  {
    id: 1,
    name: "Eleanor Ashworth",
    role: "Founder & CEO",
    bio: "With over 25 years crafting journeys for royalty and tastemakers, Eleanor's vision defines the art of modern exploration.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Sebastian Clarke",
    role: "Head of Curation",
    bio: "An anthropologist by training, Sebastian uncovers the cultural narratives that transform a trip into a legacy.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1000&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Fiona MacLeod",
    role: "Destination Director",
    bio: "Fiona's little black book opens doors to private castles, hidden distilleries, and the world's most exclusive estates.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1000&fit=crop&q=80"
  }
];

export const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1679579162726-2be1a7a27b61?w=1920&q=80",
    title: "Timeless Luxury",
    subtitle: "Experience the hallmark of bespoke travel across the British Isles and beyond"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1589489873423-d1745278a8f4?w=1920&q=80",
    title: "Highland Majesty",
    subtitle: "Where ancient legends meet modern elegance in the heart of Scotland"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1535082623926-b39352a03fb7?w=1920&q=80",
    title: "Safaris Unveiled",
    subtitle: "Witness the extraordinary drama of the African wild from a position of ultimate luxury"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1920&q=80",
    title: "Italian Elegance",
    subtitle: "From Renaissance treasures to sun-drenched Amalfi coastal escapes"
  }

];

export const navigationConfig = {
  experiences: [
    {
      id: 'culinary',
      label: 'Culinary Journeys',
      subtitle: 'Taste the World',
      description: 'Savor exquiste local cuisines, from Michelin-star dining to authentic street food and vineyard tours.',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop', // Fine dining/vineyard
      href: '/experiences/culinary-journeys',
      featured: [
        { label: 'Michelin-star Dining', href: '/experiences/culinary-journeys/michelin' },
        { label: 'Local Market Tours', href: '/experiences/culinary-journeys/markets' },
        { label: 'Wine & Cheese Trails', href: '/experiences/culinary-journeys/wine-trails' },
        { label: 'Coastal Seafood Routes', href: '/experiences/culinary-journeys/seafood' }
      ]
    },
    {
      id: 'golf',
      label: 'Golf Escapes',
      subtitle: 'Legendary Links',
      description: 'Tee off at the world’s most prestigious courses, set against breathtaking oceanfronts and rolling greens.',
      image: 'https://images.unsplash.com/photo-1535131749006-b7f58c9903b8?q=80&w=2070&auto=format&fit=crop', // Golf course
      href: '/experiences/golf-escapes',
      featured: [
        { label: 'Scotland Links', href: '/experiences/golf-escapes/scotland' },
        { label: 'Ireland Championship', href: '/experiences/golf-escapes/ireland' },
        { label: 'Luxury Stay & Play', href: '/experiences/golf-escapes/packages' },
        { label: 'Historic Courses', href: '/experiences/golf-escapes/historic' }
      ]
    },
    {
      id: 'wellness',
      label: 'Wellness Retreats',
      subtitle: 'Restore Balance',
      description: 'Reconnect with your inner self in serene landscapes, from Nordic spas to silent Himalayan retreats.',
      image: 'https://images.unsplash.com/photo-1571896349842-6e53ce41e86a?q=80&w=2071&auto=format&fit=crop', // Spa/Wellness
      href: '/experiences/wellness-retreats',
      featured: [
        { label: 'Ayurveda Retreats', href: '/experiences/wellness-retreats/ayurveda' },
        { label: 'Nordic Spas', href: '/experiences/wellness-retreats/nordic' },
        { label: 'Silent Retreats', href: '/experiences/wellness-retreats/silent' },
        { label: 'Digital Detox', href: '/experiences/wellness-retreats/detox' }
      ]
    },
    {
      id: 'heritage',
      label: 'Heritage Tours',
      subtitle: 'Walk Through History',
      description: 'Step into the past with private tours of ancient castles, royal palaces, and UNESCO world heritage sites.',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070&auto=format&fit=crop', // Old city/castle
      href: '/experiences/heritage-tours',
      featured: [
        { label: 'Guided Cultural Trails', href: '/experiences/heritage-tours/trails' },
        { label: 'UNESCO Routes', href: '/experiences/heritage-tours/unesco' },
        { label: 'Royal History', href: '/experiences/heritage-tours/royal' },
        { label: 'Ancient Architecture', href: '/experiences/heritage-tours/architecture' }
      ]
    },
    {
      id: 'castles',
      label: 'Castle Stays',
      subtitle: 'Royal Living',
      description: 'Immerse yourself in history with exclusive stays in restored castles and châteaux across Europe.',
      image: 'https://images.unsplash.com/photo-1533154683836-84ea2a4e3c8c?q=80&w=2068&auto=format&fit=crop', // Castle
      href: '/experiences/castle-stays',
      featured: [
        { label: 'Ireland Castles', href: '/experiences/castle-stays/ireland' },
        { label: 'Scottish Highlands', href: '/experiences/castle-stays/scotland' },
        { label: 'French Châteaux', href: '/experiences/castle-stays/france' },
        { label: 'Heritage Luxury', href: '/experiences/castle-stays/luxury' }
      ]
    },
    {
      id: 'adventure',
      label: 'Adventure Expeditions',
      subtitle: 'Thrilling Frontiers',
      description: 'Embark on bold journeys to the ends of the earth, from Arctic treks to African safaris.',
      image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=2070&auto=format&fit=crop', // Adventure/Mountain
      href: '/experiences/adventure-expeditions',
      featured: [
        { label: 'Luxury Safari', href: '/experiences/adventure-expeditions/safari' },
        { label: 'Arctic Trips', href: '/experiences/adventure-expeditions/arctic' },
        { label: 'Desert Drives', href: '/experiences/adventure-expeditions/desert' },
        { label: 'Island Hopping', href: '/experiences/adventure-expeditions/islands' }
      ]
    }
  ],
  destinations: [
    {
      id: 'ireland',
      label: 'Ireland',
      subtitle: 'The Emerald Isle',
      image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=800&q=80',
      href: '/destinations/ireland',
      featured: [
        { label: 'Cliffs of Moher', href: '/destinations/ireland/cliffs' },
        { label: 'Historic Castles', href: '/destinations/ireland/castles' },
        { label: 'Golf Links', href: '/destinations/ireland/golf' },
        { label: 'Coastal Villages', href: '/destinations/ireland/coastal' }
      ]
    },
    {
      id: 'scotland',
      label: 'Scotland',
      subtitle: 'Untamed Beauty',
      image: 'https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?q=80&w=1974&auto=format&fit=crop', // Scotland
      href: '/destinations/scotland',
      featured: [
        { label: 'The Highlands', href: '/destinations/scotland/highlands' },
        { label: 'Lochs & Glens', href: '/destinations/scotland/lochs' },
        { label: 'Castle Trails', href: '/destinations/scotland/castles' },
        { label: 'Whisky Distilleries', href: '/destinations/scotland/whisky' }
      ]
    },
    {
      id: 'england',
      label: 'England',
      subtitle: 'Quintessential Charm',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop', // London
      href: '/destinations/england',
      featured: [
        { label: 'London Cityscapes', href: '/destinations/england/london' },
        { label: 'The Cotswolds', href: '/destinations/england/cotswolds' },
        { label: 'Royal Palaces', href: '/destinations/england/palaces' },
        { label: 'Historic Towns', href: '/destinations/england/historic' }
      ]
    },
    {
      id: 'africa',
      label: 'Africa',
      subtitle: 'Wild & Majestic',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
      href: '/destinations/africa',
      featured: [
        { label: 'Great Migration', href: '/destinations/africa/migration' },
        { label: 'Luxury Lodges', href: '/destinations/africa/lodges' },
        { label: 'Desert Safaris', href: '/destinations/africa/desert' },
        { label: 'Hot Air Balloons', href: '/destinations/africa/balloon' }
      ]
    }
  ]
};

