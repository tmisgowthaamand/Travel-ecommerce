
import json
import uuid

raw_data = [
{
"name": "HRX Force Urban Trolley with Laptop",
"description": "Meet the HRX Force Cabin Pro. Made for travellers who like their journeys smooth and their tech within reach. With a front easy access compartment for your laptop, you’ll glide through airport security checks easy and breezy. Fits laptops up to 15.6”, with the durability and style HRX is built on. Easy Access Front Compartment: A quick-open front panel for laptop and essentials, plus a secure flush lock and premium twin-puller finish. Easy-Access Secure Lock: Flush-mounted lock system lets you open and pack in seconds while keeping your belongings protected at all times.",
"image_urls": [
"https://img.youtube.com/vi/gUZWzBJTBJw/0.jpg?q=90",
"https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3797445475465857475",
"https://i.ytimg.com/vi/uMyOTZcTI6Y/sddefault.jpg"
]
},
{
"name": "HRX Helium Small Cabin Suitcase (56 cm) 8 Wheels - by Hrithik Roshan",
"description": "Thoughtfully designed for Going Places. The HRX Helium Luggage is lightweight, compact, and engineered for life on the move — whether it’s flights, train rides, or road trips.\n\n**• Effortless 8-Wheel Motion**\nGlides smooth in every direction — from tight terminals to cobbled streets.\n\n**• 360° Spinner Wheels**\nUltra-responsive and whisper-quiet, built for fast moves and sharp turns.\n\n**• Waterproof Inside & Out**\nSpills, splashes, or sudden rain — you’re covered.\n\n**• Includes Wet & Dry Pouch**\nYour sweaty gym gear or last-minute swims now have a clean, sealed space.\n\n**• Feather-Light. Built Tough.\nHigh-strength shell that resists scratches, pressure, and drama.\n\n• Smart Internal Storage**\nTie-down straps and compartments that make chaos look organised.\n\n**• Telescopic Handle**\nWith Ergonomic grip with Soft Handle\n\nEffortless 360° Motion\nWith 8 hub-cap spinner wheels, enjoy whisper-smooth movement in every direction. Whether you’re sprinting through terminals or cruising over uneven ground, the 360° wheel system ensures zero effort, total control.\n\nBuilt-In Combo Lock\nTravel with confidence thanks to the secure, integrated number lock. Your essentials stay protected, giving you complete peace of mind from check-in to check-out.",
"image_urls": [
"https://i.ytimg.com/vi/tbgU2IIq1Mw/sddefault.jpg",
"https://i.ytimg.com/vi/uMyOTZcTI6Y/hqdefault.jpg",
"https://i.ytimg.com/vi/SNZbBi6f0aQ/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGF4gXiheMA8=&rs=AOn4CLBlxPV9hYa0MydOkgHGltBf4tPeVQ"
]
},
{
"name": "Rareism' Bingo Women's Bag-One Size",
"description": "Introducing the Rareism Women Bingo, the perfect bag for any occasion. Made with soft and durable fabric, this bag is both stylish and functional. With a unique plain design, it's sure to stand out from the crowd. Don't miss out on adding this to your collection.\n\nProduct Name: Women Bingo Bag\nMaterial: Soft and durable fabric\nDesign: Unique plain design with a stylish, minimal aesthetic\nStyle: Elegant and versatile — suitable for any occasion\nFunctionality: Combines fashion with everyday practicality\nFeature: Lightweight and comfortable to carry\nIdeal For: Daily use, casual outings, or special events\nHighlight: A must-have addition to any modern wardrobe",
"image_urls": [
"http://thehouseofrare.com/cdn/shop/collections/BAGS-RSM_collection_app_13_030f8f47-e2d8-4645-bf5a-38cb22491c78_grande.png?v=1740837762",
"http://thehouseofrare.com/cdn/shop/collections/accessories_app_grande.png?v=1743074371",
"https://myescplan.com/cdn/shop/files/Walletguideline_0003_Layer3_1_53be75ee-d4ae-4c04-bffb-822833985164.png?v=1762767932&width=400"
]
},
{
"name": "Rare Rabbit' Sionis (Leather) Men's Bag",
"description": "Introducing Rare Rabbit Men Sionis Black Leather Bags, the perfect addition to your everyday style. Made from high-quality leather, these bags offer durability and sophistication. With spacious compartments, they provide ample space for all your essentials. Elevate your look with these timeless and versatile bags. Material: High-quality genuine leather for durability and premium feel Design: Timeless and versatile with a sophisticated, sleek look Functionality: Spacious compartments for organized storage of essentials Style: Combines elegance and practicality for everyday use Usage: Ideal for work, travel, or casual outings Highlight: Elevates everyday style with a refined, classic aesthetic Internal zip and slip pockets for organization Stylish designs that go from airport to brunch",
"image_urls": [
"https://regalcorporategift.com/wp-content/uploads/2025/03/Rare-Rabbit-Signature-Executive-Bag.jpg",
"https://thehouseofrare.com/cdn/shop/files/Frame_41821_250x.png?v=1720342911",
"https://myescplan.com/cdn/shop/files/Walletguideline_0003_Layer3_1_53be75ee-d4ae-4c04-bffb-822833985164.png?v=1762767932&width=400"
]
},
{
"name": "HRX by Hrithik Roshan Small Cabin Suitcase (56 cm) 8 Wheels - Kyoto",
"description": "Thoughtfully designed for Going Places. The HRX Kyoto Value Pack Luggage is lightweight, compact, and engineered for life on the move — whether it’s flights, train rides, or road trips.\n\n**• Effortless 8-Wheel Motion**\nGlides smooth in every direction — from tight terminals to cobbled streets.\n\n**• 360° Spinner Wheels**\nUltra-responsive and whisper-quiet, built for fast moves and sharp turns.\n\n**• Waterproof Inside & Out**\nSpills, splashes, or sudden rain — you’re covered.\n\n**• Includes Wet & Dry Pouch**\nYour sweaty gym gear or last-minute swims now have a clean, sealed space.\n\n**• Feather-Light. Built Tough** .\nHigh-strength shell that resists scratches, pressure, and drama.\n\n**• Smart Internal Storage**\nTie-down straps and compartments that make chaos look organised.\n\n**• Telescopic Handle**\nWith Ergonomic grip with Soft Handle\n\nEffortless 360° Motion\nWith 8 hub-cap spinner wheels, enjoy whisper-smooth movement in every direction. Whether you’re sprinting through terminals or cruising over uneven ground, the 360° wheel system ensures zero effort, total control.\n\nBuilt-In Combo Lock\nTravel with confidence thanks to the secure, integrated number lock. Your essentials stay protected, giving you complete peace of mind from check-in to check-out.",
"image_urls": [
"https://i.ytimg.com/vi/tbgU2IIq1Mw/sddefault.jpg",
"https://i.ytimg.com/vi/uMyOTZcTI6Y/hqdefault.jpg",
"https://i.ytimg.com/vi/SNZbBi6f0aQ/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGF4gXiheMA8=&rs=AOn4CLBlxPV9hYa0M6dgkgHGltBf4tPeVQ"
]
},
{
"name": "Rare rabbit' Axiel (Leather) Backpack-One Size-Black",
"description": "This Rare Rabbit Men Axiel Black Leather Bag is the perfect accessory for any man on the go. Its sleek and stylish design is made from high-quality leather, ensuring durability and sophistication. With plenty of room for all your essentials, this bag is the perfect blend of fashion and function.\n\nMaterial: High-quality genuine leather for durability and premium feel\nDesign: Sleek, stylish, and sophisticated\nFunctionality: Spacious compartments for organizing essentials\nStyle: Combines fashion and practicality for the modern man\nUsage: Ideal for daily use, work, travel, or casual outings\nHighlight: Perfect blend of elegance, functionality, and durability\n\nInternal zip and slip pockets for organization\nPremium vegan leather",
"image_urls": [
"https://thehouseofrare.com/cdn/shop/files/Frame_41821_250x.png?v=1720342911",
"https://myescplan.com/cdn/shop/files/Walletguideline_0003_Layer3_1_53be75ee-d4ae-4c04-bffb-822833985164.png?v=1762767932&width=400",
"https://i.ebayimg.com/images/g/SUEAAOSw2Y1hUtLR/s-l1200.jpg"
]
},
{
"name": "HRX by Hrithik Roshan Small Cabin Suitcase (56 cm) 8 Wheels - Force",
"description": "HRX Force Lightest Trolley Ever Whether you’re sprinting to catch a flight or hopping city to city, a Travel range made for movement, just like you.\n\nEffortless 8-Wheel Motion Glides smooth in every direction — from tight terminals to cobbled streets\n\n360° Spinner Wheels Ultra-responsive and whisper-quiet, built for fast moves and sharp turns\n\nWaterproof Inside & Out Spills, splashes, or sudden rain — you’re covered\n\nIncludes Wet & Dry Pouch Your sweaty gym gear or last-minute swims now have a clean, sealed space\n\nFeather-Light. Built Tough High-strength shell that resists scratches, pressure, and drama\n\nSmart Internal Storage Tie-down straps and compartments that make chaos look organised\n\nTelescopic Handle With Ergonomic grip with Soft Handle\n\nEffortless 360° Motion With 8 hub-cap spinner wheels, enjoy whisper-smooth movement in every direction. Whether you’re sprinting through terminals or cruising over uneven ground, the 360° wheel system ensures zero effort, total control.\n\nBuilt-In Combo Lock Travel with confidence thanks to the secure, integrated number lock. Your essentials stay protected, giving you complete peace of mind from check-in to check-out.",
"image_urls": [
"https://thehouseofrare.com/cdn/shop/files/Frame_41821_250x.png?v=1720342911",
"https://myescplan.com/cdn/shop/files/Walletguideline_0003_Layer3_1_53be75ee-d4ae-4c04-bffb-822833985164.png?v=1762767932&width=400",
"http://thehouseofrare.com/cdn/shop/collections/Travel_app_76b54887-0daf-4cea-8b88-a007a80c606e_grande.jpg?v=1730976874"
]
},
{
"name": "Rare Rabbit Genther (Leather) Backpack-One Size-Blue",
"description": "Be the envy of all with this exclusive Rare Rabbit Genther Blue Monogram print Bag for men. Keep your belongings organized and secure with this stylish BAG. Rock the monogram print trend in a playful and unique way\n\nDescription\n\nDesign: Monogram print for a trendy and stylish look\nMaterial: Premium quality (assumed leather or durable fabric based on brand standards)\nFunctionality: Keeps belongings organized and secure\nStyle: Playful, unique, and fashion-forward\nUsage: Ideal for daily use, casual outings, or making a style statement\nHighlight: Limited availability — only 1 piece available, emphasizing exclusivity\n\nRead more\n\n## You might also like\n\nPremium vegan leather\n\nInternal zip and slip pockets for organization",
"image_urls": [
"https://i.ytimg.com/vi/9nCJlFmuEU8/mqdefault.jpg",
"https://i.ytimg.com/vi/2GHLCZj6ymI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCqR-xCAev-al68XkbcPOueeLzuIQ",
"https://img.youtube.com/vi/Zthlp7ZLncY/0.jpg?q=90"
]
},
{
"name": "HRX by Hrithik Roshan Small Cabin Suitcase (56 cm) 8 Wheels - Glide",
"description": "HRX Glide Lightest Trolley Ever Whether you’re sprinting to catch a flight or hopping city to city, a Travel range made for movement, just like you.\n\nEffortless 8-Wheel Motion Glides smooth in every direction — from tight terminals to cobbled streets.\n\n360° Spinner Wheels Ultra-responsive and whisper-quiet, built for fast moves and sharp turns.\n\nWaterproof Inside & Out Spills, splashes, or sudden rain — you’re covered.\n\nIncludes Wet & Dry Pouch Your sweaty gym gear or last-minute swims now have a clean, sealed space.\n\nFeather-Light. Built Tough. High-strength shell that resists scratches, pressure, and drama.\n\nSmart Internal Storage Tie-down straps and compartments that make chaos look organised.\n\nTelescopic Handle With Ergonomic grip with Soft Handle\n\nSmart, Spacious Storage Stay organized on the move. The three well-designed compartments come with tie-down straps and a dedicated wet pouch — perfect for gym wear, swim gear, or separating laundry. Smart storage for every type of trip.\n\nEffortless 360° Motion With 8 hub-cap spinner wheels, enjoy whisper-smooth movement in every direction. Whether you’re sprinting through terminals or cruising over uneven ground, the 360° wheel system ensures zero effort, total control.",
"image_urls": [
"https://i.ytimg.com/vi/wm3zOFJyNJ8/mqdefault.jpg",
"https://i.ytimg.com/vi/TOUd786eTkk/maxresdefault.jpg",
"https://i.ytimg.com/vi/7GVwYv1cHmA/maxresdefault.jpg"
]
},
{
"name": "HRX by Hrithik Roshan Medium Check-in Suitcase (65 cm) 8 Wheels - Helium",
"description": "• Effortless 8-Wheel Motion Glides smooth in every direction — from tight terminals to cobbled streets. • 360° Spinner Wheels Ultra-responsive and whisper-quiet, built for fast moves and sharp turns. • Waterproof Inside & Out Spills, splashes, or sudden rain — you’re covered. • Includes Wet & Dry Pouch Your sweaty gym gear or last-minute swims now have a clean, sealed space. • Feather-Light. Built Tough. High-strength shell that resists scratches, pressure, and drama. • Smart Internal Storage Tie-down straps and compartments that make chaos look organised. • Telescopic Handle With Ergonomic grip with Soft Handle. Effortless 360° Motion With 8 hub-cap spinner wheels, enjoy whisper-smooth movement in every direction. Whether you’re sprinting through terminals or cruising over uneven ground, the 360° wheel system ensures zero effort, total control. Scratch-Resistant Shell with Metallic Sheen The sleek, scratch-resistant hard shell keeps your luggage looking new, trip after trip. Finished in a sheen metallic texture, it brings both strength and style — a bold HRX statement wherever you travel.",
"image_urls": [
"https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=10209775191319341",
"https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1009220915758470",
"https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=10158461438250867"
]
},
{
"name": "Rare Rabbit Voryn (Leather) Passport Holder-Slim Fold",
"description": "Keep your travel documents organized and in check with the Rare Rabbit Men Voryn Black Leather Passport Holder. This sleek HOLDER offers convenience and style for your adventurous lifestyle. Stay on top of your travels with ease.\n\nMaterial: Premium genuine leather for durability and elegance\nDesign: Sleek and stylish, crafted for the modern traveler\nFunctionality: Keeps travel documents, passports, and essentials organized\nUsage: Ideal for business trips, vacations, and daily travel needs\nStyle: Combines practicality with a refined, minimalist look\nHighlight: Perfect accessory for those who value both convenience and sophistication",
"image_urls": [
"https://i.ytimg.com/vi/wm3zOFJyNJ8/sddefault.jpg",
"https://i.ytimg.com/vi/TOUd786eTkk/maxresdefault.jpg",
"https://img.youtube.com/vi/Zthlp7ZLncY/0.jpg?q=90"
]
},
{
"name": "HRX by Hrithik Roshan Medium Check-in Suitcase (65 cm) 8 Wheels - Kyoto",
"description": "Thoughtfully designed for Going Places. The HRX Helium Luggage is lightweight, compact, and engineered for life on the move — whether it’s flights, train rides, or road trips.\n\n**• Effortless 8-Wheel Motion**\nGlides smooth in every direction — from tight terminals to cobbled streets.\n\n**• 360° Spinner Wheels**\nUltra-responsive and whisper-quiet, built for fast moves and sharp turns.\n\n• Waterproof Inside & Out\nSpills, splashes, or sudden rain — you’re covered.\n\n**• Includes Wet & Dry Pouch**\nYour sweaty gym gear or last-minute swims now have a clean, sealed space.\n\n**• Feather-Light. Built Tough.\nHigh-strength shell that resists scratches, pressure, and drama.\n\n• Smart Internal Storage**\nTie-down straps and compartments that make chaos look organised.\n\n**• Telescopic Handle**\nWith Ergonomic grip with Soft Handle\n\nEffortless 360° Motion\nWith 8 hub-cap spinner wheels, enjoy whisper-smooth movement in every direction. Whether you’re sprinting through terminals or cruising over uneven ground, the 360° wheel system ensures zero effort, total control.\n\nSmart, Spacious Storage\nStay organized on the move. The three well-designed compartments come with tie-down straps and a dedicated wet pouch — perfect for gym wear, swim gear, or separating laundry. Smart storage for every type of trip.",
"image_urls": [
"https://i.ytimg.com/vi/wm3zOFJyNJ8/mqdefault.jpg",
"https://i.ytimg.com/vi/TOUd786eTkk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCAI_hsbMTvPVKg3jjUseQma1UOAw",
"https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3797445475465857475"
]
},
{
"name": "HRX by Hrithik Roshan Medium Check-in Suitcase (65 cm) 8 Wheels - Force",
"description": "Effortless 8-Wheel Motion Glides smooth in every direction — from tight terminals to cobbled streets 360° Spinner Wheels Ultra-responsive and whisper-quiet, built for fast moves and sharp turns Waterproof Inside & Out Spills, splashes, or sudden rain — you’re covered Includes Wet & Dry Pouch Your sweaty gym gear or last-minute swims now have a clean, sealed space Feather-Light. Built Tough High-strength shell that resists scratches, pressure, and drama Smart Internal Storage Tie-down straps and compartments that make chaos look organised Telescopic Handle With Ergonomic grip with Soft Handle Built-In Combo Lock Travel with confidence thanks to the secure, integrated number lock. Your essentials stay protected, giving you complete peace of mind from check-in to check-out. Effortless 360° Motion With 8 hub-cap spinner wheels, enjoy whisper-smooth movement in every direction. Whether you’re sprinting through terminals or cruising over uneven ground, the 360° wheel system ensures zero effort, total control.",
"image_urls": [
"https://i.ytimg.com/vi/wm3zOFJyNJ8/mqdefault.jpg",
"https://i.ytimg.com/vi/TOUd786eTkk/maxresdefault.jpg",
"https://i.ytimg.com/vi/7GVwYv1cHmA/maxresdefault.jpg"
]
},
{
"name": "HRX by Hrithik Roshan Medium Check-in Suitcase (65 cm) 8 Wheels - Glide",
"description": "HRX Glide Lightest Trolley Ever Whether you’re sprinting to catch a flight or hopping city to city, a Travel range made for movement, just like you.\n\n**• Effortless 8-Wheel Motion**\nGlides smooth in every direction — from tight terminals to cobbled streets.\n\n**• 360° Spinner Wheels**\nUltra-responsive and whisper-quiet, built for fast moves and sharp turns.\n\n**• Waterproof Inside & Out**\nSpills, splashes, or sudden rain — you’re covered.\n\n**• Includes Wet & Dry Pouch**\nYour sweaty gym gear or last-minute swims now have a clean, sealed space.\n\n**• Feather-Light. Built Tough.\nHigh-strength shell that resists scratches, pressure, and drama.\n\n• Smart Internal Storage**\nTie-down straps and compartments that make chaos look organised.\n\n**• Telescopic Handle**\nWith Ergonomic grip with Soft Handle\n\nSmart, Spacious Storage\nStay organized on the move. The three well-designed compartments come with tie-down straps and a dedicated wet pouch — perfect for gym wear, swim gear, or separating laundry. Smart storage for every type of trip.\n\nBuilt-In Combo Lock\nTravel with confidence thanks to the secure, integrated number lock. Your essentials stay protected, giving you complete peace of mind from check-in to check-out.",
"image_urls": [
"http://thehouseofrare.com/cdn/shop/collections/BAGS-RSM_collection_app_13_030f8f47-e2d8-4645-bf5a-38cb22491c78_grande.png?v=1740837762",
"http://thehouseofrare.com/cdn/shop/collections/accessories_app_grande.png?v=1743074371",
"https://myescplan.com/cdn/shop/files/Walletguideline_0003_Layer3_1_53be75ee-d4ae-4c04-bffb-822833985164.png?v=1762767932&width=400"
]
},
{
"name": "Rareism' Diva (Velvet) Clutch-One Size",
"description": "Introducing our Diva Plain Bag - the perfect accessory for the quirky, playful fashionista. This bag features a rare plain pattern that will make you stand out from the crowd. Be the envy of all your friends with this unique and stylish bag.",
"image_urls": [
"https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3797445475465857475",
"https://i.ytimg.com/vi/yN4BdVELR0M/sddefault.jpg",
"https://i.ytimg.com/vi/Vu4WQgItc-U/maxresdefault.jpg"
]
},
{
"name": "HRX by Hrithik Roshan  Large Check-in Suitcase (75 cm) 8 Wheels - Helium",
"description": "Thoughtfully designed for Going Places. The HRX Helium Luggage is lightweight, compact, and engineered for life on the move — whether it’s flights, train rides, or road trips.\n\n**• Effortless 8-Wheel Motion**\nGlides smooth in every direction — from tight terminals to cobbled streets.\n\n**• 360° Spinner Wheels**\nUltra-responsive and whisper-quiet, built for fast moves and sharp turns.\n\n**• Waterproof Inside & Out**\nSpills, splashes, or sudden rain — you’re covered.\n\n• Includes Wet & Dry Pouch\nYour sweaty gym gear or last-minute swims now have a clean, sealed space.\n\n**• Feather-Light. Built Tough.\nHigh-strength shell that resists scratches, pressure, and drama.\n\n• Smart Internal Storage**\nTie-down straps and compartments that make chaos look organised.\n\n**• Telescopic Handle**\nWith Ergonomic grip with Soft Handle\n\nEffortless 360° Motion\nWith 8 hub-cap spinner wheels, enjoy whisper-smooth movement in every direction. Whether you’re sprinting through terminals or cruising over uneven ground, the 360° wheel system ensures zero effort, total control.\n\nBuilt-In Combo Lock\nTravel with confidence thanks to the secure, integrated number lock. Your essentials stay protected, giving you complete peace of mind from check-in to check-out.",
"image_urls": [
"https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3797445475465857475",
"https://i.ytimg.com/vi/yN4BdVELR0M/sddefault.jpg",
"https://img.youtube.com/vi/Zthlp7ZLncY/0.jpg?q=90"
]
},
{
"name": "HRX by Hrithik Roshan  Large Check-in Suitcase (75 cm) 8 Wheels - Kyoto",
"description": "Thoughtfully designed for Going Places. The HRX Kyoto Luggage is lightweight, compact, and engineered for life on the move — whether it’s flights, train rides, or road trips.\n\n**• Effortless 8-Wheel Motion**\nGlides smooth in every direction — from tight terminals to cobbled streets.\n\n**• 360° Spinner Wheels**\nUltra-responsive and whisper-quiet, built for fast moves and sharp turns.\n\n**• Waterproof Inside & Out**\nSpills, splashes, or sudden rain — you’re covered.\n\n**• Includes Wet & Dry Pouch**\nYour sweaty gym gear or last-minute swims now have a clean, sealed space.\n\n**• Feather-Light. Built Tough.\nHigh-strength shell that resists scratches, pressure, and drama.\n\n• Smart Internal Storage**\nTie-down straps and compartments that make chaos look organised.\n\n**• Telescopic Handle**\nWith Ergonomic grip with Soft Handle\n\nEffortless 360° Motion\nWith 8 hub-cap spinner wheels, enjoy whisper-smooth movement in every direction. Whether you’re sprinting through terminals or cruising over uneven ground, the 360° wheel system ensures zero effort, total control.\n\nBuilt-In Combo Lock\nTravel with confidence thanks to the secure, integrated number lock. Your essentials stay protected, giving you complete peace of mind from check-in to check-out.",
"image_urls": [
"https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3797445475465857475",
"https://i.ytimg.com/vi/yN4BdVELR0M/sddefault.jpg",
"https://img.youtube.com/vi/Zthlp7ZLncY/0.jpg?q=90"
]
},
{
"name": "HRX by Hrithik Roshan Large Check-in Suitcase (75 cm) 8 Wheels - Force",
"description": "HRX Force Lightest Trolley Ever Whether you’re sprinting to catch a flight or hopping city to city, a Travel range made for movement, just like you.\n\nEffortless 8-Wheel Motion Glides smooth in every direction — from tight terminals to cobbled streets\n\n360° Spinner Wheels Ultra-responsive and whisper-quiet, built for fast moves and sharp turns\n\nWaterproof Inside & Out Spills, splashes, or sudden rain — you’re covered Includes Wet & Dry Pouch Your sweaty gym gear or last-minute swims now have a clean, sealed space\n\nFeather-Light. Built Tough High-strength shell that resists scratches, pressure, and drama\n\nSmart Internal Storage Tie-down straps and compartments that make chaos look organised\n\nTelescopic Handle With Ergonomic grip with Soft Handle\n\nBuilt-In Combo Lock Travel with confidence thanks to the secure, integrated number lock. Your essentials stay protected, giving you complete peace of mind from check-in to check-out.\n\nEffortless 360° Motion With 8 hub-cap spinner wheels, enjoy whisper-smooth movement in every direction. Whether you’re sprinting through terminals or cruising over uneven ground, the 360° wheel system ensures zero effort, total control.",
"image_urls": [
"https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3797445475465857475",
"https://i.ytimg.com/vi/yN4BdVELR0M/sddefault.jpg",
"https://img.youtube.com/vi/Zthlp7ZLncY/0.jpg?q=90"
]
},
{
"name": "HRX by Hrithik Roshan Large Check-in Suitcase (75 cm) 8 Wheels - Glide",
"description": "HRX Glide Lightest Trolley Ever Whether you’re sprinting to catch a flight or hopping city to city, a Travel range made for movement, just like you.\n\n**• Effortless 8-Wheel Motion** Glides smooth in every direction — from tight terminals to cobbled streets.\n\n**• 360° Spinner Wheels** Ultra-responsive and whisper-quiet, built for fast moves and sharp turns.\n\n**• Waterproof Inside & Out** Spills, splashes, or sudden rain — you’re covered.\n\n**• Includes Wet & Dry Pouch** Your sweaty gym gear or last-minute swims now have a clean, sealed space.\n\n**• Feather-Light. Built Tough.** High-strength shell that resists scratches, pressure, and drama.\n\n**• Smart Internal Storage** Tie-down straps and compartments that make chaos look organised.\n\n**• Telescopic Handle** With Ergonomic grip with Soft Handle\n\nSmart, Spacious Storage Stay organized on the move. The three well-designed compartments come with tie-down straps and a dedicated wet pouch — perfect for gym wear, swim gear, or separating laundry. Smart storage for every type of trip.\n\nBuilt-In Combo Lock Travel with confidence thanks to the secure, integrated number lock. Your essentials stay protected, giving you complete peace of mind from check-in to check-out.",
"image_urls": [
"https://i.ytimg.com/vi/1ur_EuANrGc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBmuumJHgMeEE42kod3kws519iIOw",
"https://img.youtube.com/vi/hvSBUF-Yt_E/0.jpg?q=90",
"https://img.youtube.com/vi/Zthlp7ZLncY/0.jpg?q=90"
]
},
{
"name": "HRX by Hrithik Roshan Hard Body Set of 2 Luggage 8 Wheels - Helium",
"description": "Effortless 8-Wheel Motion Glides smooth in every direction — from tight terminals to cobbled streets. 360° Spinner Wheels Ultra-responsive and whisper-quiet, built for fast moves and sharp turns. Waterproof Inside & Out Spills, splashes, or sudden rain — you’re covered. Includes Wet & Dry Pouch Your sweaty gym gear or last-minute swims now have a clean, sealed space. Feather-Light. Built Tough. High-strength shell that resists scratches, pressure, and drama. Smart Internal Storage Tie-down straps and compartments that make chaos look organised. Telescopic Handle With Ergonomic grip with Soft Handle",
"image_urls": [
"https://thehouseofrare.com/cdn/shop/files/gc.png?v=1752647192",
"https://thehouseofrare.com/cdn/shop/files/NEW_ARRIVAL.png?v=1752646715",
"https://myescplan.com/cdn/shop/files/Walletguideline_0003_Layer3_1_53be75ee-d4ae-4c04-bffb-822833985164.png?v=1762767932&width=400"
]
},
{
"name": "Rare Rabbit Rhon (Leather) Wallet-Bifold",
"description": "A seamless blend of style and functionality, this Alpha collection men's wallet from The House of Rare is an essential addition to your wardrobe. Crafted with precision to keep your monetary essentials secure, this wallet offers both sophistication and durability for everyday use. With multiple card pockets and a spacious main compartment, it exudes a timeless luxury that both classic and contemporary. RFID (Radio-Frequency Identification) blocking technology PRODUCT Bi-Fold wallet COMPARTMENT 6 Card slots and center slot with internal bi-slot BRANDING RARE RABBIT embossed monogram BRANDING RARE RABBIT foil print branding MATERIAL TYPE Genuine Leather DIMENSION 9 * 11.5 cm CARE - To maintain the beauty of your leather goods, wipe away dust and spots with a soft cloth or brush weekly. Avoid contact with harsh materials and scratches.",
"image_urls": [
"https://i.ytimg.com/vi/N86o1TNX0BY/sddefault.jpg",
"https://i.ytimg.com/vi/1ur_EuANrGc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBmuumJHgMeEE42kod3kws519iIOw",
"https://img.youtube.com/vi/hvSBUF-Yt_E/0.jpg?q=90"
]
},
{
"name": "HRX by Hrithik Roshan Hard Body Set of 2 Luggage 8 Wheels - Kyoto",
"description": "Thoughtfully designed for Going Places. The HRX Kyoto Value Pack Luggage is lightweight, compact, and engineered for life on the move — whether it’s flights, train rides, or road trips.\n\n**• Effortless 8-Wheel Motion**\nGlides smooth in every direction — from tight terminals to cobbled streets.\n\n**• 360° Spinner Wheels**\nUltra-responsive and whisper-quiet, built for fast moves and sharp turns.\n\n**• Waterproof Inside & Out**\nSpills, splashes, or sudden rain — you’re covered.\n\n**• Includes Wet & Dry Pouch**\nYour sweaty gym gear or last-minute swims now have a clean, sealed space.\n\n**• Feather-Light. Built Tough.\nHigh-strength shell that resists scratches, pressure, and drama.\n\n• Smart Internal Storage**\nTie-down straps and compartments that make chaos look organised.\n\n**• Telescopic Handle**\nWith Ergonomic grip with Soft Handle\n\nSmart, Spacious Storage\nStay organized on the move. The three well-designed compartments come with tie-down straps and a dedicated wet pouch — perfect for gym wear, swim gear, or separating laundry. Smart storage for every type of trip.\n\nEffortless 360° Motion\nWith 8 hub-cap spinner wheels, enjoy whisper-smooth movement in every direction. Whether you’re sprinting through terminals or cruising over uneven ground, the 360° wheel system ensures zero effort, total control.",
"image_urls": [
"https://i.ytimg.com/vi/1ur_EuANrGc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBmuumJHgMeEE42kod3kws519iIOw",
"https://img.youtube.com/vi/hvSBUF-Yt_E/0.jpg?q=90",
"https://img.youtube.com/vi/Zthlp7ZLncY/0.jpg?q=90"
]
},
{
"name": "HRX by Hrithik Roshan Hard Body Set of 2 Luggage 8 Wheels - Force",
"description": "HRX Force Lightest Trolley Ever Whether you’re sprinting to catch a flight or hopping city to city, a Travel range made for movement, just like you.\n\nEffortless 8-Wheel Motion Glides smooth in every direction — from tight terminals to cobbled streets\n\n360° Spinner Wheels Ultra-responsive and whisper-quiet, built for fast moves and sharp turns\n\nWaterproof Inside & Out Spills, splashes, or sudden rain — you’re covered Includes Wet & Dry Pouch Your sweaty gym gear or last-minute swims now have a clean, sealed space\n\nFeather-Light. Built Tough High-strength shell that resists scratches, pressure, and drama\n\nSmart Internal Storage Tie-down straps and compartments that make chaos look organised\n\nTelescopic Handle With Ergonomic grip with Soft Handle\n\nEffortless 360° Motion With 8 hub-cap spinner wheels, enjoy whisper-smooth movement in every direction. Whether you’re sprinting through terminals or cruising over uneven ground, the 360° wheel system ensures zero effort, total control.\n\nBuilt-In Combo Lock Travel with confidence thanks to the secure, integrated number lock. Your essentials stay protected, giving you complete peace of mind from check-in to check-out.",
"image_urls": [
"https://m.media-amazon.com/images/I/71zczLm8EsL.AC_SL1500.jpg",
"https://i.ebayimg.com/images/g/Z-wAAOSwNUJm8gex/s-l1200.jpg",
"https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=24408587242164388"
]
},
{
"name": "Rare Rabbit Drac (Leather) Card Holder",
"description": "This sleek, compact RARE RABBIT cardholder features a genuine leather build with an all-over monogram, dual-sided design, RFID-blocking security, and multiple slots for quick access to essentials. Its sophisticated minimalism makes it ideal for everyday use, while simple care like wiping with a soft cloth helps maintain premium leather quality. Featuring the iconic Rare Rabbit monogram, this wallet exudes urban sophistication. Crafted from premium leather for durability, it includes bi-fold compartments and pockets to securely hold your essentials. It's simple, elegant design makes it the perfect everyday wallet, offering ample space for cards and receipts while blending style with functionality.",
"image_urls": [
"https://i.ytimg.com/vi/1ur_EuANrGc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBmuumJHgMeEE42kod3kws519iIOw",
"https://img.youtube.com/vi/cl3DaDwoz8k/0.jpg?q=90",
"https://img.youtube.com/vi/hvSBUF-Yt_E/0.jpg?q=90"
]
},
{
"name": "HRX by Hrithik Roshan Hard Body Set of 2 Luggage 8 Wheels - Glide",
"description": "• Effortless 8-Wheel Motion Glides smooth in every direction — from tight terminals to cobbled streets. • 360° Spinner Wheels Ultra-responsive and whisper-quiet, built for fast moves and sharp turns. • Waterproof Inside & Out Spills, splashes, or sudden rain — you’re covered. • Includes Wet & Dry Pouch Your sweaty gym gear or last-minute swims now have a clean, sealed space. • Feather-Light. Built Tough. High-strength shell that resists scratches, pressure, and drama. • Smart Internal Storage Tie-down straps and compartments that make chaos look organised. • Telescopic Handle With Ergonomic grip with Soft Handle",
"image_urls": [
"https://myescplan.com/cdn/shop/files/Walletguideline_0003_Layer3_1_53be75ee-d4ae-4c04-bffb-822833985164.png?v=1762767932&width=400",
"https://manofmany.com/wp-content/uploads/2025/11/Nomad.jpg",
"https://a.1stdibscdn.com/chanel-classic-n-black-leather-cc-french-kisslock-long-wallet-for-sale-picture-9/v_18142/1679926609200/mobilejpegupload_C87A61B3915449F89E4DFA36BA2ED415_master.jpg?width=768"
]
},
{
"name": "Rare Rabbit' Camp (Leather) Wallet-Bifold",
"description": "This black men’s bi-fold wallet features a modern RARE monogram, premium genuine leather, RFID-blocking security, and a sleek, practical design with multiple slots for organized storage. With refined embossed and foil branding, it offers everyday sophistication and remains in top condition with simple weekly soft-cloth care. Featuring the iconic Rare Rabbit monogram, this wallet exudes urban sophistication. Crafted from premium leather for durability, it includes bi-fold compartments and pockets to securely hold your essentials. It's simple, elegant design makes it the perfect everyday wallet, offering ample space for cards and receipts while blending style with functionality. • RFID – (Radio-Frequency Identification) blocking technology • PRODUCT – Bi-Fold wallet • COMPARTMENT – 6 Card slots and center slot with internal bi-slot • BRANDING – RARE RABBIT embossed monogram • BRANDING – RARE RABBIT foil print branding • MATERIAL TYPE – Genuine Leather • DIMENSION – 9 * 11.5 cm CARE- To maintain the beauty of your leather goods, wipe away dust and spots with a soft cloth or brush weekly. Avoid contact with harsh materials and scratches",
"image_urls": [
"https://i.ytimg.com/vi/QDilrzBJDKM/maxresdefault.jpg",
"https://img.youtube.com/vi/cl3DaDwoz8k/0.jpg?q=90",
"https://i.ytimg.com/vi/2Oyly_DBdkE/maxresdefault.jpg"
]
},
{
"name": "HRX by Hrithik Roshan Hard Body Set of 3 Luggage 8 Wheels - Kyoto",
"description": "Thoughtfully designed for Going Places. The HRX Kyoto Value Pack Luggage is lightweight, compact, and engineered for life on the move — whether it’s flights, train rides, or road trips.\n\n**• Effortless 8-Wheel Motion**\nGlides smooth in every direction — from tight terminals to cobbled streets.\n\n**• 360° Spinner Wheels**\nUltra-responsive and whisper-quiet, built for fast moves and sharp turns.\n\n**• Waterproof Inside & Out**\nSpills, splashes, or sudden rain — you’re covered.\n\n**• Includes Wet & Dry Pouch**\nYour sweaty gym gear or last-minute swims now have a clean, sealed space.\n\n**• Feather-Light. Built Tough.\nHigh-strength shell that resists scratches, pressure, and drama.\n\n• Smart Internal Storage**\nTie-down straps and compartments that make chaos look organised.\n\n**• Telescopic Handle**\nWith Ergonomic grip with Soft Handle\n\nEffortless 360° Motion\nWith 8 hub-cap spinner wheels, enjoy whisper-smooth movement in every direction. Whether you’re sprinting through terminals or cruising over uneven ground, the 360° wheel system ensures zero effort, total control.\n\nSmart, Spacious Storage\nStay organized on the move. The three well-designed compartments come with tie-down straps and a dedicated wet pouch — perfect for gym wear, swim gear, or separating laundry. Smart storage for every type of trip.",
"image_urls": [
"https://i.ytimg.com/vi/QDilrzBJDKM/maxresdefault.jpg",
"https://i.ytimg.com/vi/zyxcSFk-PbU/maxresdefault.jpg",
"https://i.ytimg.com/vi/2Oyly_DBdkE/maxresdefault.jpg"
]
},
{
"name": "HRX by Hrithik Roshan Hard Body Set of 3 Luggage 8 Wheels - Force",
"description": "HRX Force Lightest Trolley Ever Whether you’re sprinting to catch a flight or hopping city to city, a Travel range made for movement, just like you.\n\nEffortless 8-Wheel Motion Glides smooth in every direction — from tight terminals to cobbled streets\n\n360° Spinner Wheels Ultra-responsive and whisper-quiet, built for fast moves and sharp turns\n\nWaterproof Inside & Out Spills, splashes, or sudden rain — you’re covered Includes Wet & Dry Pouch Your sweaty gym gear or last-minute swims now have a clean, sealed space\n\nFeather-Light. Built Tough High-strength shell that resists scratches, pressure, and drama\n\nSmart Internal Storage Tie-down straps and compartments that make chaos look organised\n\nTelescopic Handle With Ergonomic grip with Soft Handle\n\nBuilt-In Combo Lock Travel with confidence thanks to the secure, integrated number lock. Your essentials stay protected, giving you complete peace of mind from check-in to check-out.\n\nEffortless 360° Motion With 8 hub-cap spinner wheels, enjoy whisper-smooth movement in every direction. Whether you’re sprinting through terminals or cruising over uneven ground, the 360° wheel system ensures zero effort, total control.",
"image_urls": []
}
]

def get_category(name):
    name_lower = name.lower()
    if any(k in name_lower for k in ["trolley", "suitcase", "luggage", "check-in", "cabin"]):
        return "luggage"
    if "backpack" in name_lower:
        return "backpacks"
    if any(k in name_lower for k in ["wallet", "pouch", "holder", "tag", "accessory", "bag", "clutch", "adapter"]):
        return "accessories"
    return "comfort"

def get_price(name):
    name_lower = name.lower()
    if "set of 3" in name_lower:
        return 180.0, 220.0
    if "set of 2" in name_lower:
        return 130.0, 160.0
    if "large" in name_lower:
        return 95.0, 120.0
    if "medium" in name_lower:
        return 75.0, 95.0
    if "small" in name_lower or "cabin" in name_lower:
        return 55.0, 70.0
    if "backpack" in name_lower:
        return 45.0, 60.0
    if "wallet" in name_lower or "holder" in name_lower:
        return 25.0, 35.0
    if "clutch" in name_lower or "bag" in name_lower:
        return 35.0, 50.0
    return 49.99, 69.99

formatted_products = []

for item in raw_data:
    name = item["name"]
    desc = item["description"]
    urls = item["image_urls"]
    
    cat = get_category(name)
    price, orig = get_price(name)
    
    # Clean description for details
    details = [line.strip("* •").strip() for line in desc.split("\n") if line.strip() and len(line) < 100][:4]
    if not details:
        details = ["Premium quality material", "Built for durability", "Stylish design", "Convenient storage"]
    
    product = {
        "id": "str(uuid.uuid4())",
        "name": name,
        "description": desc.split("\n")[0], # Use first line as short desc
        "price": price,
        "original_price": orig,
        "category": cat,
        "image": urls[0] if urls else "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?w=800&q=80",
        "images": urls if urls else ["https://images.unsplash.com/photo-1581553680321-4fffae59fccd?w=800&q=80"],
        "rating": 4.5 + (hash(name) % 5) / 10.0,
        "reviews_count": 50 + (hash(name) % 200),
        "in_stock": True,
        "featured": True if hash(name) % 3 == 0 else False,
        "tags": [cat, "travel", "premium"],
        "details": details
    }
    formatted_products.append(product)

# Output as Python list for server.py
print("    products = [")
for p in formatted_products:
    print("        {")
    for k, v in p.items():
        if k == "id":
            print(f'            "{k}": {v},')
        elif isinstance(v, bool):
            print(f'            "{k}": {v},')
        else:
            print(f'            "{k}": {json.dumps(v)},')
    print("        },")
print("    ]")
