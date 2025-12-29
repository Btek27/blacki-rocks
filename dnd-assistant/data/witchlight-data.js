// The Wild Beyond the Witchlight Campaign Data
const WITCHLIGHT_DATA = {
    campaignName: "The Wild Beyond the Witchlight",
    campaignSubtitle: "A Feywild Adventure",

    introduction: {
        summary: "Adventurers journey through the Witchlight Carnival, the Feywild's most whimsical yet dangerous fair. Every attraction hides a clue, every NPC a bargain.",
        structure: [
            "Chapter 1 – Witchlight Carnival: Investigate the carnival, earn tickets, and discover the path to Prismeer.",
            "Chapter 2 – Hither: Navigate marshes, negotiate with Bavlorna, and free the lost children.",
            "Chapter 3 – Thither: Outrun Skabatha, confront Loomlurch, and rescue stolen children.",
            "Chapter 4 – Yon: Ride lightning rods, commune with Endelyn, and storm Motherhorn.",
            "Chapter 5 – Palace of Heart's Desire: Enter Zybilna's castle, handle time loops, and choose Prismeer's fate."
        ],
        advancement: {
            levels: {
                "Start": "Level 2 – Characters begin the adventure at 2nd level.",
                "Chapter 1": "Level 2 → Level 3 after discovering the path to Prismeer.",
                "Chapter 2": "Level 3 → Level 4 upon defeating a major Hither threat or securing the Hourglass Coven's aid.",
                "Chapter 3": "Level 4 → Level 5 for freeing the Loomlurch children and surviving Thither's tricks.",
                "Chapter 4": "Level 5 → Level 6 after surviving Motherhorn's trial.",
                "Chapter 5": "Level 6 → Level 9 depending on ending achieved."
            }
        },
        trinkets: [
            { name: "Flickering Ticket", effect: "Glows when the holder tells a truth; darkens when they lie." },
            { name: "Starlit Locket", effect: "Shows your lost thing when opened under moonlight." },
            { name: "Goblet of Bubble-Pop", effect: "Whoever drinks it speaks only in riddles for 10 minutes." }
        ],
        backgrounds: [
            "Feylost – You grew up in the Feywild or were taken there as a child.",
            "Witchlight Hand – Carnival staffer, expert in illusions and mechanics."
        ],
        races: [
            "Fairy – +2 Charisma, fly 30 ft, once per short rest wing burst.",
            "Harengon – +2 Dexterity, +1 Wisdom, Rabbit Hop (jump 10 ft + dodge)."
        ],
        traits: [
            "Every character has a Lost Thing. Record what it alters in your story tracker.",
            "Track carnival mood throughout Chapter 1—it affects outcomes and NPC behavior."
        ]
    },

    chapters: [
        // Factions & NPCs Reference Chapter
        {
            id: "factions",
            title: "Factions & NPCs",
            icon: "🎭",
            overview: "Complete reference for all major factions, their members, and important creatures in the campaign. Use this section to quickly look up stat blocks, character motivations, and combat notes for any NPC or creature.",
            isFactionReference: true  // Special flag to render differently
        },
        {
            id: "chapter1",
            title: "Chapter 1: Witchlight Carnival",
            icon: "🎪",
            overview: "The Witchlight Carnival serves as the gateway to the Feywild domain of Prismeer. Characters must navigate its whimsical attractions while uncovering clues about their lost things and the mysterious owners, Mister Witch and Mister Light.",
            runningNotes: "The carnival operates on a mood system—track how character actions affect the carnival's atmosphere. Eight hours of timed events structure the evening. Characters need to earn tickets, explore attractions, and discover the secret way to Prismeer through the Hall of Illusions.",
            
            characters: [
                {
                    name: "Mister Witch",
                    role: "Carnival co-owner",
                    stats: "Shadar-kai (appears as elf) | AC 15 | HP 85",
                    abilities: [
                        "Witchlight Watch: Can stop/start carnival time",
                        "Fey Pact: Bound to allow Hourglass Coven thieves access",
                        "Leomund's Secret Chest: Stores carnival earnings on Ethereal Plane"
                    ],
                    quote: "The wheel of time turns ever on… what's lost is lost, what's gone is gone.",
                    description: "Stocky elf with low, gravelly voice. Wears top hat and keeps pocket watch on chain."
                },
                {
                    name: "Mister Light",
                    role: "Carnival co-owner",
                    stats: "Shadar-kai (appears as elf) | AC 17 | HP 110",
                    abilities: [
                        "Witchlight Vane: Detects carnival mood and selects Witchlight Monarch",
                        "Performer's Grace: Advantage on Performance checks",
                        "Fey Pact: Bound to allow Hourglass Coven thieves access"
                    ],
                    quote: "Prepare to be delighted!",
                    description: "Flamboyant elf with high-pitched voice. Wears diamond-pane mirror suit and butterfly wings."
                },
                {
                    name: "Nikolas Midnight",
                    role: "Ticket booth operator",
                    stats: "Goblin (lawful neutral) | AC 13 | HP 40",
                    abilities: [
                        "Spyglass & Ear Horn: Advantage on Insight checks to discern lies",
                        "Fey Pacts: Can create one-night pacts for ticket barter",
                        "Invisible Pixie Assistant: Sends messages to Mister Witch"
                    ],
                    quote: "Greetings, fair fairgoers!",
                    description: "Elderly goblin who carries spyglass and ear horn. Sharp despite appearance."
                },
                {
                    name: "Kettlesteam",
                    role: "Kenku warlock troublemaker",
                    stats: "Kenku Warlock | Patron: Zybilna | AC 14 | HP 55",
                    abilities: [
                        "Disguise Self: Constantly changes appearance to blend in",
                        "Mimicry: Can imitate voices perfectly",
                        "Voice Theft: Stole Candlefoot's voice (stored in corn husk doll)",
                        "Speak with Animals: Uses to cause mischief"
                    ],
                    quote: "My patron is in trouble, and these carnival owners know more than they're saying!",
                    description: "Uses disguise self to blend in crowds. Desperate to learn what happened to Zybilna."
                },
                {
                    name: "Diana Cloppington",
                    role: "Carousel operator",
                    stats: "Human fused with warhorse (appears as centaur) | AC 14 | HP 65",
                    abilities: [
                        "Carousel Operation: Controls the magical unicorns",
                        "Forbidden Speech: Cannot discuss Hourglass Coven, Zybilna, or Prismeer (coughs sap/mushrooms grow)"
                    ],
                    quote: "I'm a human who made a bad deal.",
                    description: "Magically fused with her warhorse by Skabatha Nightshade. Sad eyes, good humor."
                },
                {
                    name: "Candlefoot",
                    role: "Mime at Hall of Illusions",
                    stats: "Witchlight Hand (neutral good) | AC 13 | HP 40",
                    abilities: [
                        "Mime Communication: Lost voice, communicates through mime",
                        "Prestidigitation: Can cast without verbal component",
                        "Color Restoration: Palasha's singing temporarily restores his color"
                    ],
                    quote: "[Communicates through mime]",
                    description: "All color leached from skin, hair, eyes, and apparel. In love with Palasha."
                },
                {
                    name: "Palasha",
                    role: "Merfolk singer at Silversong Lake",
                    stats: "Merfolk (chaotic good) | AC 13 | HP 50",
                    abilities: [
                        "Control Water: Singing emulates control water spell",
                        "Summon Quippers: Once per day, summons swarm for 1 minute",
                        "Color Restoration: Her singing restores Candlefoot's color"
                    ],
                    quote: "We are an impossibility in an impossible universe.",
                    description: "Devoted to carnival. In love with Candlefoot. Won't see him after failed proposal."
                },
                {
                    name: "Burly",
                    role: "Bugbear security guard",
                    stats: "Bugbear (neutral good) | AC 15 | HP 75",
                    abilities: [
                        "Thorn Wall Control: Can create openings in wall",
                        "Feats of Strength: Performs in Big Top Extravaganza",
                        "Philosophical Mind: Debates with Feathereen"
                    ],
                    quote: "Bad things have been happening. You might be able to set things right.",
                    description: "Wears jack-o'-lantern helmet, dungarees, fake fairy wings. Misses brother Hurly."
                },
                {
                    name: "Dirlagraun",
                    role: "Displacer beast caretaker",
                    stats: "Displacer Beast | AC 13 | HP 85 | Speaks Elvish & Sylvan",
                    abilities: [
                        "Toffee Apple Juice Keg: Consoles upset children",
                        "Child Protection: Looks after stray children",
                        "Lost Cub: Searching for cub Star"
                    ],
                    quote: "Some things go missing from the Witchlight Carnival and never come back.",
                    description: "Midnight-blue fur, shoulder tentacles, fake butterfly wings. Gray-whiskered and gentle."
                },
                {
                    name: "Ellywick Tumblestrum",
                    role: "Gnome bard Planeswalker",
                    stats: "Impossible to harm or read thoughts | Planeswalker entity",
                    abilities: [
                        "Planeswalker: Can travel between planes",
                        "Intervention: Helps characters reach Prismeer if plans fail",
                        "Pyrotechnic Escape: Disappears in flashy display if threatened"
                    ],
                    quote: "You're exactly where and when you're supposed to be.",
                    description: "Mysterious gnome who paid for characters' tickets. Sits on swing in Feasting Orchard."
                },
                {
                    name: "Northwind",
                    role: "Treant sapling at Dragonfly Rides",
                    stats: "Treant Sapling (chaotic good) | AC 14 | HP 60",
                    abilities: [
                        "Welcome Gifts: Rains down magical sycamore seeds",
                        "Terrible at Secrets: Loudly whispers confidential information",
                        "Feywild Native: From Prismeer originally"
                    ],
                    quote: "I'm not really supposed to talk about this, but...",
                    description: "Twelve feet tall, garlanded in golden ribbons. Carefree and chatty."
                },
                {
                    name: "Feathereen",
                    role: "Giant swan at Gondola Swans",
                    stats: "Giant Swan (stats as Giant Eagle) | Speaks Common & Auran",
                    abilities: [
                        "Philosophical Questions: Asks metaphysical questions",
                        "Gondola Pulling: Pulls ornate wooden gondolas",
                        "Mood Affecting: Her state affects carnival mood"
                    ],
                    quote: "In worlds so full of magic, is time an illusion?",
                    description: "Erudite, haughty, gossipy nature. Enjoys debates with Burly."
                }
            ],
            
            carnivalMap: "carnival_map.jpg",
            
            // Map hotspots - coordinates calculated from 1920x1342 image
            mapHotspots: [
                // Regular Locations
                { locationName: "Ticket Booth", x: 58.96, y: 47.62, type: "location" },
                { locationName: "Lost Property", x: 63.49, y: 40.16, type: "location" },
                { locationName: "Calliope", x: 53.13, y: 40.09, type: "location" },
                { locationName: "Dragonfly Rides", x: 82.19, y: 34.50, type: "location" },
                { locationName: "Feasting Orchard", x: 75.10, y: 15.42, type: "location" },
                { locationName: "Carousel", x: 64.17, y: 29.29, type: "location" },
                { locationName: "Gondola Swans", x: 56.30, y: 18.33, type: "location" },
                { locationName: "Silversong Lake", x: 47.29, y: 16.47, type: "location" },
                { locationName: "Staff Area", x: 34.79, y: 28.47, type: "location" },
                { locationName: "Big Top", x: 45.21, y: 36.14, type: "location" },
                { locationName: "Bubble-Pop Teapot", x: 43.23, y: 59.99, type: "location" },
                { locationName: "Pixie Kingdom", x: 37.45, y: 54.70, type: "location" },
                { locationName: "Hall of Illusions", x: 22.14, y: 50.07, type: "location" },
                { locationName: "Snail Racing", x: 17.71, y: 61.18, type: "location" },
                { locationName: "Mystery Mine", x: 37.55, y: 86.21, type: "location" },
                
                // Homebrew Encounter
                { locationName: "Kilo the Bard", x: 28.59, y: 71.68, type: "location" },
                
                // Timed Events (different color)
                { locationName: "Hour 1: Welcome Gifts", x: 4.17, y: 32.19, type: "event" },
                { locationName: "Hour 4: Big Top Extravaganza", x: 15.83, y: 25.56, type: "event" },
                { locationName: "Hour 8: Crowning the Witchlight Monarch", x: 23.23, y: 5.36, type: "event" },
            ],
            
            locations: [
                {
                    name: "Ticket Booth",
                    description: "Silver faerie statue on roof surrounded by fluttering butterflies. Animated night sky with shooting stars decorates booth. Nikolas Midnight operates it.",
                    details: "Adult tickets 8 sp, child tickets 3 sp. Prepaid tickets available for characters (paid by Ellywick Tumblestrum). Each ticket good for 8 attractions. Characters receive butterfly wings to show paid status. Can barter for tickets with fey pacts.",
                    dmGuidance: {
                        playerOptions: [
                            {
                                option: "Purchase Tickets (8 sp adult, 3 sp child)",
                                outcome: "Characters receive tickets (8 punches) and colorful butterfly wings showing paid status",
                                mechanics: "Standard transaction"
                            },
                            {
                                option: "Claim Prepaid Tickets",
                                outcome: "Nikolas finds tickets in ornate box marked N.M., paid by 'anonymous benefactor' (Ellywick Tumblestrum)",
                                mechanics: "One prepaid ticket per character available"
                            },
                            {
                                option: "Barter with Fey Pact",
                                outcome: "Roll d8 on Fey Pacts table. Pact lasts until Witchlight Monarch crowning. Breaking pact: ticket becomes bat and flies away, carnival mood -1",
                                mechanics: "DC negotiation at DM discretion",
                                pacts: [
                                    "1: Must not tell a lie knowingly",
                                    "2: Must wear crown of flowers and water it hourly",
                                    "3: Must dance when someone says your name",
                                    "4: Can't talk about your favorite subject",
                                    "5: Must carry small pumpkin as precious egg",
                                    "6: Must greet all trees with reverence",
                                    "7: Must compliment everyone you meet",
                                    "8: Must declare love for unicorns at every opportunity"
                                ]
                            },
                            {
                                option: "Sneak Past Without Ticket",
                                outcome: "Nikolas may notice (Insight vs Deception). If suspicious, invisible pixie alerts Mister Witch. Characters become targets for Hourglass Coven thieves",
                                mechanics: "Contested check if attempted"
                            },
                            {
                                option: "Question Nikolas",
                                outcome: "He's friendly but observant. Advantage on Insight checks to discern lies. Will share carnival basics but won't reveal secrets",
                                mechanics: "Roleplay; he uses spyglass/ear horn for advantage"
                            }
                        ],
                        secrets: [
                            "Nikolas has an invisible pixie assistant under the counter",
                            "His spyglass and ear horn grant advantage on Insight checks",
                            "He can alert Mister Witch to troublemakers via pixie messenger"
                        ],
                        moodEffects: "Breaking a fey pact lowers mood by 1"
                    }
                },
                {
                    name: "Big Top",
                    description: "Three swooping peaks topped with spinning gold stars. Painted panels whirl with circus performances. Music and laughter drift out.",
                    details: "Free entry. Hosts Big Top Extravaganza at midnight and Witchlight Monarch crowning before dawn. Random acts throughout evening. Dressing room backstage guarded by two Witchlight hands.",
                    dmGuidance: {
                        playerOptions: [
                            {
                                option: "Watch Random Acts (d8)",
                                outcome: "Entertainment throughout evening. Roll d8: 1-Firefly circus, 2-Halfling contortionist, 3-Pixie weasel races, 4-Satyr fiddler, 5-Clown cannon, 6-Tiefling fire-breather, 7-Goblin juggler, 8-Elf ballerina",
                                mechanics: "Free entertainment, builds carnival atmosphere"
                            },
                            {
                                option: "Attend Big Top Extravaganza (Hour 4)",
                                outcome: "One-hour show with Mister Light as MC. Features Burly, Palasha, Candlefoot, and others. Near end, Light asks for guest performers",
                                mechanics: "See Big Top Extravaganza event"
                            },
                            {
                                option: "Volunteer to Perform",
                                outcome: "DC 14 CHA (Performance) to woo spectators. Success: mood +1 (or +3 if group). Impressive performers invited to meet Witch and Light",
                                mechanics: "Group check if multiple performers. Each character can only improve mood once"
                            },
                            {
                                option: "Heckle or Disrupt Show",
                                outcome: "Mister Light deflects with banter, stays jovial. Persistent heckling lowers mood -1",
                                mechanics: "Light is a skilled performer, hard to rattle"
                            },
                            {
                                option: "Sneak Backstage to Dressing Room",
                                outcome: "Two Witchlight hands guard entrance, bickering over acts while sharing pear cider. DC 12 DEX (Stealth) to slip past",
                                mechanics: "Backstage reveals performers' costumes, props, personal items"
                            },
                            {
                                option: "Attend Witchlight Monarch Crowning (Hour 8)",
                                outcome: "Coronation ceremony. Light's vane selects guest who improved mood most. Monarch crowned, receives Monarch's Whimsy charm, leads parade",
                                mechanics: "See Crowning the Witchlight Monarch event"
                            }
                        ],
                        randomActs: [
                            "Tiny firefly circus managed by ogre dressed like djinni",
                            "Halfling contortionist fits inside hatbox",
                            "Eight pixies race weasel-pulled chariots",
                            "Satyr fiddler's music causes dancing plants",
                            "Eight clowns launch from magic cannon",
                            "Tiefling summons magma/smoke mephits",
                            "Goblin juggles any tiny objects from crowd (up to 8)",
                            "Elf ballerina dances with animated costumes"
                        ],
                        moodEffects: "Impressive performance +1 to +3, persistent heckling -1"
                    }
                },
                {
                    name: "Bubble-Pop Teapot",
                    description: "Twenty-foot-tall teapot with painted dragons breathing bubbles. Door at base leads to bubble ride emerging from spout.",
                    details: "1 ticket punch. Treaclewise the goblin operates it. Speaks in rhyming slang. Gives Scatterleaf Tea to players who engage. Bubbles float for 1 minute with aerial carnival views. DC 10 Dexterity (Acrobatics) to control bubble direction."
                },
                {
                    name: "Calliope",
                    description: "Merry tune from instrument on painted wagon. Ernest the monkey turns handle, sending music from golden whistles.",
                    details: "Magically linked to carnival mood—plays merrily when happy, discordantly when low. Ernest collects buttons (swapped mind with organ grinder). Marigold the goblin in ladybug costume assists. Giving buttons helps characters escape if trapped in Prismeer.",
                    dmGuidance: {
                        playerOptions: [
                            {
                                option: "Listen to the Calliope",
                                outcome: "Plays merrily when mood high, discordantly when mood low. Tunes shift automatically based on carnival atmosphere. Acts as mood barometer visible to all",
                                mechanics: "Environmental indicator; helps track mood"
                            },
                            {
                                option: "Talk to Ernest",
                                outcome: "Baboon with Intelligence/Charisma 10, speaks Common (neutral good). Explains: leprechaun prank swapped his mind with organ grinder's. Now he's stuck as monkey, original organ grinder stuck as human with monkey mind",
                                mechanics: "Roleplay; demonstrates fey mischief consequences"
                            },
                            {
                                option: "Hear Ernest's Rhyme",
                                outcome: "Ernest recites: 'Spare a button if you please, / I'll sew it next to all of these. / I offer nothing in its place, / Besides a smile upon my face.'",
                                mechanics: "Charming request; no pressure"
                            },
                            {
                                option: "Give Buttons to Ernest",
                                outcome: "He's delighted! Immediately begins sewing it onto his cloak with needle and thread. Cloak covered in hundreds of mismatched buttons. Gives genuine, warm smile",
                                mechanics: "Track who gives buttons—vital for future escape"
                            },
                            {
                                option: "Talk to Marigold",
                                outcome: "Goblin dressed as ladybug (chaotic good) helps Ernest collect buttons. She carries tin cup and dances around visitors. Friendly and enthusiastic",
                                mechanics: "Roleplay; shows carnival's whimsical nature"
                            },
                            {
                                option: "Ask About Button Collection",
                                outcome: "Ernest explains he loves buttons—each one is a memory, a person, a moment. His cloak is his journal. Marigold adds: 'And they're so shiny!'",
                                mechanics: "Adds depth to collection"
                            },
                            {
                                option: "Use Calliope as Beacon (If Trapped in Prismeer)",
                                outcome: "Characters who gave at least one button can follow distant calliope whistling to safety if trapped in Prismeer (once per group). Barriers magically remove themselves as they follow the sound",
                                mechanics: "Critical escape mechanism; one-time use",
                                timing: "Chapters 2-5 when party is trapped/lost"
                            }
                        ],
                        secrets: [
                            "Ernest and organ grinder were victims of leprechaun prank—minds swapped",
                            "Calliope is magically linked to carnival's emotional atmosphere",
                            "Giving buttons creates magical connection allowing escape from Prismeer",
                            "Ernest has fully adapted to baboon life but misses his human dexterity"
                        ],
                        futurePayoff: "Giving buttons = safety escape mechanism usable once in chapters 2-5. Track carefully!"
                    }
                },
                {
                    name: "Carousel",
                    description: "Wooden unicorns on circular platform. Diana Cloppington (human/horse fusion) operates ride.",
                    details: "1 ticket punch. Eight unicorn pairs named from proverbs. Must paint correct names on all unicorns. If all correct, each unicorn shares three secrets telepathically about hags or Zybilna. Diana can't discuss Hourglass Coven due to curse.",
                    dmGuidance: {
                        playerOptions: [
                            {
                                option: "Ride the Carousel (1 ticket punch)",
                                outcome: "Characters ride wooden unicorns in circle. Magical but no special effects unless puzzle solved",
                                mechanics: "Standard carnival ride"
                            },
                            {
                                option: "Solve the Riddle of the Carousel",
                                outcome: "Diana provides clay pot of gold paint and brushes. Must paint correct names on all 8 unicorns' tags. If all correct, each unicorn telepathically shares 3 secrets during ride",
                                mechanics: "INT or WIS checks to solve proverbs",
                                puzzle: [
                                    "Fortune & Bold: 'Fortune favors the bold' (Bold's tag: B _ _ _)",
                                    "Pride & Fall: 'Pride goes before a fall' (Pride's tag: PR _ _ _)",
                                    "Stone & Moss: 'A rolling stone gathers no moss' (Moss's tag: M _ _ S)",
                                    "Stitch & Nine: 'A stitch in time saves nine' (Nine's tag: _ _ N _)"
                                ]
                            },
                            {
                                option: "Learn Lost Things Secrets (if puzzle solved)",
                                outcome: "Unicorn reveals: (1) Which hag has character's lost thing, (2) Description of hag's lair, (3) Useful secret about specific hag",
                                mechanics: "Telepathic during ride, personalized per character"
                            },
                            {
                                option: "Learn Warlock's Quest Secrets (if puzzle solved)",
                                outcome: "Unicorn reveals: (1) Zybilna frozen in time, (2) Hourglass Coven seized control and split Prismeer into three, (3) Coven riddled with distrust—each hag thinks sisters plotting",
                                mechanics: "Telepathic during ride, same for all characters"
                            },
                            {
                                option: "Question Diana About Her Curse",
                                outcome: "She's friendly but sad. Quick to correct anyone calling her centaur: 'I'm a human who made a bad deal.' Cannot speak/write about Hourglass Coven, Zybilna, or Prismeer—coughs sap or mushrooms blister fingers if she tries",
                                mechanics: "Roleplay; demonstrates the curse if pressed"
                            },
                            {
                                option: "Ask About Skabatha Nightshade",
                                outcome: "Cannot say name or discuss. Physical reaction: brown tree sap coughs or mushrooms blister on fingers. Shows pain and distress",
                                mechanics: "Demonstrates consequences of fey curses"
                            }
                        ],
                        secrets: [
                            "Diana was human; Skabatha fused her with warhorse as cruel 'help'",
                            "Witch and Light gave her sanctuary at carnival",
                            "Carousel unicorns know truths about Hourglass Coven and Zybilna"
                        ],
                        rewards: "Critical intelligence about hag lairs and Lost Things locations"
                    }
                },
                {
                    name: "Dragonfly Rides",
                    description: "Lily pads on pool with phosphorescent algae. Giant dragonflies with stained-glass wings use as landing platforms.",
                    details: "1 ticket punch. Northwind (treant sapling) and Red (awakened squirrel) operate. Eight giant dragonflies fly figure-eight pattern at 20 feet. DC 12 Wisdom (Animal Handling) to redirect. Incident with panicked dragonfly carrying dwarf—DC 14 to calm.",
                    dmGuidance: {
                        playerOptions: [
                            {
                                option: "Take a Standard Ride (1 ticket punch)",
                                outcome: "Mount giant dragonfly, flies lazy figure-eight pattern around carnival at 20 ft high for several minutes. Beautiful aerial views",
                                mechanics: "Safe, scenic ride"
                            },
                            {
                                option: "Attempt to Steer Dragonfly Off Course",
                                outcome: "DC 12 WIS (Animal Handling) check. Success lets rider guide dragonfly to specific location. Track successes—useful in chapter 4, area M20",
                                mechanics: "Track which characters succeed for future benefit"
                            },
                            {
                                option: "Talk to Northwind (Treant Sapling)",
                                outcome: "He's TERRIBLE at keeping secrets. Loudly whispers: (1) 'Witch and Light aren't original owners! Not even from Feywild!' (2) 'Carnival can't run without Witch's pocket watch!' (3) 'Light loves sea of smiling faces—if carnival's happy, he's happy!'",
                                mechanics: "Automatic reveals if engaged; he can't help himself"
                            },
                            {
                                option: "Talk to Red (Awakened Squirrel)",
                                outcome: "Suspicious and protective of Northwind. Intelligence 10, speaks Common. Tries to shush Northwind when he reveals secrets. Warns characters not to take advantage",
                                mechanics: "Roleplay; contrasts with Northwind's openness"
                            },
                            {
                                option: "Rescue the Panicked Dragonfly (Incident)",
                                outcome: "When first ride begins, middle-aged dwarf (bright blue beard) sits unfastened as dragonfly takes off prematurely (Kettlesteam panicked it with speak with animals). DC 14 WIS (Animal Handling) to calm. Success: mood +1. Failure: dwarf tumbles into tent awning (no damage), mood -1",
                                mechanics: "WIS (Perception) vs Kettlesteam's CHA (Deception) to spot her",
                                timing: "Trigger during first character's ride or when appropriate"
                            }
                        ],
                        secrets: [
                            "Northwind is from Prismeer originally",
                            "He knows Witch and Light aren't the original owners",
                            "Pocket watch is key to carnival operations"
                        ],
                        moodEffects: "Rescue dwarf +1, dwarf falls -1",
                        futurePayoff: "Steering successes tracked for chapter 4, area M20"
                    }
                },
                {
                    name: "Feasting Orchard",
                    description: "Park with flowers, mead, and berry pie scents. Stilt-walkers, musicians, storytellers, and dancers.",
                    details: "Faerie Cake Eating Contest: 1 ticket punch. Eat cupcakes in 60 seconds. Safe amount is 3 + CON modifier. Additional cakes require DC 10 CON save or 1d8 custard damage. Winner gets potion of invisibility cupcake. Ellywick Tumblestrum sits on swing here."
                },
                {
                    name: "Gondola Swans",
                    description: "Enormous swans pull flower-draped gondolas through water into silver mist banks. River marks carnival perimeter.",
                    details: "1 ticket punch. Hour-long ride. Feathereen the swan asks metaphysical questions. Impressing her earns gossip about Candlefoot's failed proposal and Burly's missing brother. She rocks boat if ignored. Her mood affects carnival mood."
                },
                {
                    name: "Hall of Illusions",
                    description: "Tent painted with faeries diving into color pools. Helical canopy stripes rotate. Designed to befuddle.",
                    details: "1 ticket punch. Candlefoot the colorless mime operates. Tasha's Cabinet outside causes Tasha's hideous laughter (DC 13 WIS save). Inside: mirrors show youth to old age. Thinnest veil to Feywild. Portal to Prismeer requires incantation. Rubin may be lured by Sowpig.",
                    dmGuidance: {
                        playerOptions: [
                            {
                                option: "Examine Tasha's Cabinet (Outside)",
                                outcome: "Wooden mannequin of raven-haired young woman in witch attire and green cape hovers in glass cabinet. Sign: 'Tasha the Wizard—Known for Her Hideous Laughter.' Any creature within 10 ft: DC 13 WIS save or affected by Tasha's hideous laughter spell",
                                mechanics: "DC 15 INT (History) recalls Tasha was one of Iggwilv's names—track for chapter 5"
                            },
                            {
                                option: "Witness Rubin Incident",
                                outcome: "Halfling Rubin about to propose to girlfriend Ween when she gets too close to cabinet and falls victim to spell. Rubin darts into tent sobbing without ticket punch",
                                mechanics: "Triggers Rescuing Rubin encounter",
                                timing: "When appropriate or if characters linger near cabinet"
                            },
                            {
                                option: "Enter Hall and View Mirrors (1 ticket punch)",
                                outcome: "Tall mirrors line walls. Near entrance reflect youth; images grow steadily older until deep mirrors show twilight years. Shows characters' past and potential future",
                                mechanics: "Roleplay opportunity; mirrors show true age"
                            },
                            {
                                option: "Communicate with Candlefoot",
                                outcome: "Colorless mime punches tickets reluctantly. Cannot speak (voice stolen). Communicates through mime. Clearly distressed. Can mime explanations if asked right questions",
                                mechanics: "DC 12 WIS (Insight) to understand mime clues"
                            },
                            {
                                option: "Search for Rubin (if triggered)",
                                outcome: "1 minute search + DC 15 WIS (Perception) to find him. He's gazing into mirror where little girl in pig mask (Sowpig) whispers to his youthful reflection, trying to lure him to Thither. If not found in 3 minutes, Rubin steps through mirror leaving engagement ring. Characters can't follow yet",
                                mechanics: "Time pressure. Reuniting couple: mood +1. Disappearance: mood -1"
                            },
                            {
                                option: "Speak Portal Incantation (if learned)",
                                outcome: "Stand before any mirror showing present-day reflection. Speak: 'Hither, thither, here and there; wander yonder, show me where.' Mist swirls, blotting reflection. Touch misty surface to be pulled through to Hither",
                                mechanics: "One-way portal. Witchlight watch/vane can't cross (drop to floor)"
                            },
                            {
                                option: "Try to Follow Sowpig or Rubin",
                                outcome: "Can't follow without incantation. Mirror shows only reflection unless magic words spoken",
                                mechanics: "Demonstrates need for incantation"
                            },
                            {
                                option: "Investigate the Mirrors",
                                outcome: "Mirrors are mundane but positioned at thinnest veil between Material Plane and Feywild. Each can become portal with proper incantation",
                                mechanics: "DC 15 INT (Arcana) recognizes fey magic"
                            }
                        ],
                        secrets: [
                            "Tasha is one of Iggwilv's names (mother of Zybilna)",
                            "Candlefoot's voice was stolen by Kettlesteam",
                            "Sowpig (Skabatha's thief) uses mirrors to lure victims to Thither",
                            "Hall is thinnest veil to Feywild; all mirrors can be portals"
                        ],
                        moodEffects: "Reuniting Rubin and Ween +1, Rubin's disappearance -1",
                        futurePayoff: "Knowing Tasha=Iggwilv useful in chapter 5. Rubin appears in chapter 3 area L13 if he disappeared"
                    }
                },
                {
                    name: "Lost Property",
                    description: "Wagon with Dirlagraun the displacer beast outside, playing with children. Wears fake wings and toffee apple juice keg.",
                    details: "Free. Dirlagraun looks after children. Viro grabs mirrored ball (Star's toy), causing him to run. Players must find him (DC 15 WIS Perception). If found, Dirlagraun gives mirrored ball to help find Star. Warns about things going missing.",
                    dmGuidance: {
                        playerOptions: [
                            {
                                option: "Approach and Talk to Dirlagraun",
                                outcome: "Friendly displacer beast in fake butterfly wings with toffee apple juice keg. Speaks Elvish and Sylvan. Watches over stray children. Gray-whiskered and gentle despite fearsome appearance",
                                mechanics: "Roleplay; Dirlagraun is kind but concerned"
                            },
                            {
                                option: "Witness Missing Child Incident",
                                outcome: "Viro (one of two boys Dirlagraun minds) grabs mirrored ball from wagon. Dirlagraun snaps to retrieve it. Viro runs away frightened. Dirlagraun can't leave younger brother Allowin, pleads for help",
                                mechanics: "Triggers search encounter",
                                timing: "When characters arrive or linger"
                            },
                            {
                                option: "Search for Viro",
                                outcome: "DC 15 WIS (Perception) to locate in candy stall. Can repeat after 10 minutes. If not found within hour: mood -1. Success reunites boy with Dirlagraun",
                                mechanics: "Time pressure scenario; mood impact"
                            },
                            {
                                option: "Ask About the Mirrored Ball",
                                outcome: "Dirlagraun explains it belonged to his cub Star who vanished from carnival years ago. It was Star's favorite toy. He becomes melancholic discussing it",
                                mechanics: "Reveals backstory; emotional connection"
                            },
                            {
                                option: "Offer to Search for Star",
                                outcome: "Dirlagraun is touched and hopeful. Gives mirrored ball to characters: 'Take this. Perhaps it will help you find my little one.' Looking into ball shows glimpses of Star's location",
                                mechanics: "Track this; Star appears in chapter 3, area 'Little Oak'"
                            },
                            {
                                option: "Ask About Missing Things",
                                outcome: "Dirlagraun says: 'Some things go missing from the Witchlight Carnival and never come back.' Expresses concern about Mister Witch and Mister Light being on edge",
                                mechanics: "Hints at larger mystery"
                            },
                            {
                                option: "Request Advice",
                                outcome: "Suggests sneaking into Staff Area behind Big Top to spy on Witch and Light rather than confronting directly. Notes their behavior has been unusual",
                                mechanics: "Provides tactical guidance for heist or investigation"
                            },
                            {
                                option: "Console Upset Children",
                                outcome: "Dirlagraun offers toffee apple juice from keg to crying or upset children. It's sweet and calming",
                                mechanics: "Shows Dirlagraun's gentle nature"
                            }
                        ],
                        secrets: [
                            "Star (Dirlagraun's cub) followed Sowpig through mirror portal years ago",
                            "Mirrored ball is magical—shows glimpses of Star when gazed into",
                            "Dirlagraun suspects Witch and Light know more about disappearances",
                            "He's one of few staff willing to suggest investigating owners"
                        ],
                        moodEffects: "Finding Viro prevents mood -1, failure causes mood -1",
                        futurePayoff: "Mirrored ball and quest to find Star continues in chapter 3. Dirlagraun remembers characters who helped"
                    }
                },
                {
                    name: "Mystery Mine",
                    description: "Mine carts enter carved dragon's mouth. Passengers emerge bewildered, fearful, excited.",
                    details: "1 ticket punch. Zephixo the dwarf operates with All-Seeing Eye contraption. Players write character fears. Ride through illusion demiplane. Each rider faces their fear (DC 12 WIS save). All successes = advantage on CHA checks. Three+ failures = nightmares 1d8 days."
                },
                {
                    name: "Pixie Kingdom",
                    description: "Miniaturized fairground in oak tree copse. Tiny Ferris wheel, wagons, stalls. Hamster powers wheel.",
                    details: "1 ticket punch. Jeremy Plum encourages pixie names (mood +1 if all use). Pixie dust shrinks characters to Tiny for 1 hour. Twelve friendly pixies. Activities: ride Pinecone the pug, tour palace, dine, ride hamster wheel. Hide-and-seek game awards pixie dust to winner."
                },
                {
                    name: "Silversong Lake",
                    description: "Mist gathers at shimmering lake banks. Palasha the mermaid performs in giant bowl center. Water forms magical sculptures.",
                    details: "Free. Palasha performs control water through song. Can summon quipper swarm once/day. Kettlesteam heckles her (disguised). If driven away, takes refuge near Hall of Illusions. Returning her raises mood +2. She offers singing lessons to helpers.",
                    dmGuidance: {
                        playerOptions: [
                            {
                                option: "Watch Palasha's Performance (Free)",
                                outcome: "Hauntingly beautiful singing as lake water coalesces into magical sculptures whirling around her. Duplicates control water spell. Mesmerizing and emotional",
                                mechanics: "Free entertainment; showcases Palasha's abilities"
                            },
                            {
                                option: "Witness Feathered Heckler Incident",
                                outcome: "Kettlesteam (disguised) snakes through crowd using Mimicry to pose as different hecklers. After three jeers, Palasha falters, leaps from bowl, darts downriver. WIS (Perception) vs Kettlesteam's CHA (Deception) to spot her",
                                mechanics: "Triggers chase/investigation; mood -1 if not prevented",
                                timing: "First time characters watch performance"
                            },
                            {
                                option: "Prevent Heckling",
                                outcome: "If Kettlesteam spotted, characters can intervene. She flees if confronted. Palasha completes performance grateful",
                                mechanics: "Prevents mood decrease; earns Palasha's gratitude"
                            },
                            {
                                option: "Find Palasha After She Flees",
                                outcome: "Takes refuge in river near Hall of Illusions. Sitting on rocks, head in hands. Won't return to perform without act of gallantry",
                                mechanics: "Requires helping Candlefoot or similar gesture"
                            },
                            {
                                option: "Perform Act of Gallantry",
                                outcome: "Recovering Candlefoot's voice, defending her honor, or defeating heckler counts. She's touched and agrees to return to lake",
                                mechanics: "Roleplay; demonstrates care for carnival"
                            },
                            {
                                option: "Convince Her to Return",
                                outcome: "DC 14 CHA (Persuasion) if no gallantry performed. Explain importance of her performance. She reluctantly agrees",
                                mechanics: "Social check"
                            },
                            {
                                option: "Return Palasha to Lake",
                                outcome: "She resumes performance with renewed vigor. Mood +2. She offers singing lessons to characters who helped: special training useful in chapter 3, Uncorrupted Fairy Rings",
                                mechanics: "Track characters who receive lessons for future benefit"
                            },
                            {
                                option: "Ask About Candlefoot",
                                outcome: "She becomes quiet and sad. 'He was about to say something... and then his voice disappeared. I can't face him now.' Clearly heartbroken",
                                mechanics: "Reveals romantic connection"
                            },
                            {
                                option: "Ask About Her Song Restoring Candlefoot's Color",
                                outcome: "She lights up: 'When he hears me sing, he looks... alive. I never knew my voice could mean so much to someone.' Then sadness returns",
                                mechanics: "Hints at solution to their separation"
                            },
                            {
                                option: "Summon Quippers (If Attacked)",
                                outcome: "Once per day, can summon swarm of quippers that obeys commands for 1 minute. Defends herself if threatened",
                                mechanics: "Combat option; shows she's not helpless"
                            }
                        ],
                        secrets: [
                            "Palasha and Candlefoot are in love",
                            "Her singing restores Candlefoot's color temporarily",
                            "Candlefoot was proposing when Kettlesteam stole his voice",
                            "Fiercely devoted to carnival: 'We are an impossibility in an impossible universe'"
                        ],
                        moodEffects: "Driven away -1, Returning and performing +2",
                        futurePayoff: "Singing lessons useful in chapter 3 for Uncorrupted Fairy Rings. Reuniting her with Candlefoot creates powerful ally"
                    }
                },
                {
                    name: "Small Stalls",
                    description: "Various stalls selling snacks/drinks and offering games. Run by Witchlight hands.",
                    details: "Snacks 1 ticket punch: cupcakes, candied apples, euphoreo cookies, eveningberry wine, faerie bell nectar, pixie tarts, mushrooms, lollipops. Games 1 ticket punch: Almiraj Ring Toss, Catch Dragon by Tail, Gnome Poetry, Goblin Wrestling, Guess Feathers, Outstare Cyclops."
                },
                {
                    name: "Snail Racing",
                    description: "Grandstands filled with cheering fairgoers. Eight giant snails on circular course, shells scrubbed by pixies.",
                    details: "1 ticket punch to race as jockey. Eight snails with team colors. Course 480 feet, divided into 6-second rounds. Snails move 80 feet automatically. DC 12 WIS (Animal Handling) for extra 10-20 feet or penalty. Random surprises each round. Winner gets potion of advantage.",
                    dmGuidance: {
                        playerOptions: [
                            {
                                option: "Watch the Race (Free)",
                                outcome: "Cheer from grandstands. Eight giant snails race: Shellymoo (Pink), Nimblefoot (Blue), High Road (Purple), Quickleaf (Green), Flowerflash (Yellow), Whizzy (Orange), Breakneck (Red), Queen's Majesty (Black)",
                                mechanics: "Entertainment; can bet with other spectators"
                            },
                            {
                                option: "Enter as Jockey (1 ticket punch)",
                                outcome: "Mount a snail and race! Track participants—useful in chapter 2, 'Reaching the Bottom.' If at least half party participates: mood +1",
                                mechanics: "See racing rules below"
                            }
                        ],
                        racingRules: {
                            course: "480 feet long, divided into 6-second rounds",
                            automatic: "Snails move 80 feet per round automatically",
                            checks: "Once per round: DC 12 WIS (Animal Handling)",
                            success: "+10 feet (+20 if succeed by 5+)",
                            failure: "-10 feet (-20 if fail by 5+)",
                            prohibited: "No magic or harming other jockeys/snails",
                            violation: "Disqualified; mood -1"
                        },
                        surprises: [
                            "1-3: No surprise",
                            "4: Random snail gets stitch (-40 ft this round)",
                            "5: Spectator throws lettuce; random snail stops to eat (0 ft this round)",
                            "6-7: Random snail bolstered by cheering (+20 ft this round)",
                            "8: Random snail's saddle falls off; jockey DC 15 DEX save or fall off"
                        ],
                        rewards: {
                            winner: "Potion of advantage (advantage on all ability checks for 1 hour)",
                            lastPlace: "Magic wand (cast dancing lights once, becomes tulip)"
                        },
                        moodEffects: "Half+ party participates +1, rule-breaking -1",
                        futurePayoff: "Participants tracked for chapter 2, 'Reaching the Bottom'"
                    }
                },
                {
                    name: "Staff Area",
                    description: "Eight wagons behind Big Top, protected by 20-foot thorn wall. Burly and Thaco guard.",
                    details: "Thorn wall parts for staff (stays open 10 seconds). Burly patrols perimeter. Thaco guards central area near Witch and Light's wagon. Witch/Light wagon contains: crown in hatbox, secret chest replica, Ethereal chest with 210sp, 70gp, 3 potions. Overhearing conversation reveals Hourglass Coven pact.",
                    dmGuidance: {
                        playerOptions: [
                            {
                                option: "Approach Openly as Guests",
                                outcome: "Burly intercepts. Friendly but firm: 'Staff area is off-limits to guests, friends. Unless you've got business with management?' Won't let through without invitation",
                                mechanics: "Roleplay; Burly is good-natured but follows rules"
                            },
                            {
                                option: "Move Through Thorn Wall",
                                outcome: "8 ft of movement per 1 ft. First time entering or ending turn: DC 15 DEX save or 4 (1d8) piercing damage (half on success). Ending turn in wall: trumpet flowers honk alarm (audible 50 ft)",
                                mechanics: "Difficult but possible; alerts guards if honk"
                            },
                            {
                                option: "Wait for Burly to Leave (Big Top Extravaganza)",
                                outcome: "Burly attends hour 4 Big Top show. Staff area has only Thaco guarding central wagons. Best time for Witch and Light's wagon heist",
                                mechanics: "Timing opportunity; Thaco still a threat"
                            },
                            {
                                option: "Distract Burly",
                                outcome: "Burly enjoys philosophical debates. Engaging him in discussion about existence, morality, or his missing brother Hurly distracts him. DC 12 CHA (Persuasion) for 2d6 minutes",
                                mechanics: "Creative distraction; he's intelligent and lonely"
                            },
                            {
                                option: "Eavesdrop on Witch and Light's Wagon",
                                outcome: "DC 12 WIS (Perception) to hear conversation revealing Hourglass Coven pact and discussion about Burly's missing brother Hurly",
                                mechanics: "Reveals key plot information"
                            },
                            {
                                option: "Search Witch and Light's Wagon",
                                outcome: "DC 15 INT (Investigation) finds secret compartment with bejeweled chest (50 gp). Contains replica for Leomund's secret chest. Ethereal chest has 210 sp, 70 gp, 3 potions (requires magic to access)",
                                mechanics: "Search takes 10 minutes; risk of discovery"
                            },
                            {
                                option: "Steal Mister Witch's Watch (during Big Top)",
                                outcome: "DC 13 DEX (Sleight of Hand), advantage if distracted. Need tools to snip chain. Success gives leverage over owners",
                                mechanics: "See 'The Heist' encounter"
                            }
                        ],
                        secrets: [
                            "Witch and Light have pact with Hourglass Coven",
                            "Something happened to Burly's brother Hurly",
                            "Witch uses Leomund's secret chest for earnings",
                            "Crown teleports back each evening"
                        ]
                    }
                },
                {
                    name: "Kilo the Bard",
                    description: "A charismatic bard performing on a small stage near the Mystery Mine. He snaps magical photos with illusory effects and tells jokes about following him on 'Kilogram.'",
                    details: "Free. Stage name is Kilo. Entertains crowds with comedic songs and magical photography. Hints at searching for something he's lost.",
                    dmGuidance: {
                        playerOptions: [
                            {
                                option: "Watch Kilo's Performance (Free)",
                                outcome: "Kilo performs an upbeat, humorous song about carnival life. Makes jokes: 'Follow me on Kilogram! Get it? Because I'm Kilo? No? Tough crowd!' Snaps magical photos that sparkle and float",
                                mechanics: "Entertainment; builds rapport with crowd"
                            },
                            {
                                option: "Take a Magical Photo with Kilo",
                                outcome: "He snaps his fingers and an illusory image appears, sparkles, then fades. 'That'll be on Kilogram by morning!' The photo is actually just prestidigitation",
                                mechanics: "Harmless fun; characters may realize it's an illusion with DC 12 INT (Arcana)"
                            },
                            {
                                option: "Listen to His Song",
                                outcome: "Mid-performance, Kilo sings about losing something precious at the carnival years ago. The lyrics hint at regret and longing: 'I left behind what mattered most, now I wander like a ghost...'",
                                mechanics: "Foreshadowing for later story connection"
                            },
                            {
                                option: "Engage with Kilo After Performance",
                                outcome: "He's friendly and chatty. If asked about the lost item: 'Oh, just something from my past. We all lose things at fairs like this, don't we?' Deflects with humor but seems genuinely sad",
                                mechanics: "Roleplay; he won't reveal details yet"
                            },
                            {
                                option: "The Incident - Kilo Causes a Scene",
                                outcome: "Near end of his set, Kilo 'accidentally' spills wine on a character. Acts flustered and apologetic, but loudly blames the PC: 'Watch where you're standing! You made me ruin my good tunic!' Attracts attention. DC 14 WIS (Insight) reveals he did it deliberately",
                                mechanics: "Triggers social encounter; tests party's response",
                                timing: "Trigger when appropriate or after 15-20 minutes"
                            },
                            {
                                option: "Confront Kilo About the 'Accident'",
                                outcome: "If confronted, he drops the act briefly, winks, and whispers: 'Had to make sure you lot were interesting. You are.' Then returns to his persona. If pressed: 'Meet me after the midnight show. Alone.'",
                                mechanics: "Sets up future encounter; DC 13 CHA (Intimidation/Persuasion) to get meeting offer"
                            },
                            {
                                option: "Ignore the Scene",
                                outcome: "Kilo makes a big show of cleaning up, then storms off muttering. Carnival staff are embarrassed. Some NPCs give party sympathetic looks. No lasting consequences",
                                mechanics: "No mechanical impact; missed opportunity for connection"
                            },
                            {
                                option: "Ask About His Lost Item",
                                outcome: "Kilo's facade drops for a moment. 'It's... complicated. Something I valued more than gold. But that was a lifetime ago.' Changes subject quickly if pushed",
                                mechanics: "Hint at deeper backstory; foreshadowing"
                            }
                        ],
                        secrets: [
                            "Kilo's real name is Loki (will be revealed later)",
                            "He deliberately caused the scene to test the party's character",
                            "His lost item ties into the main campaign story",
                            "The 'Kilogram' jokes are a facade to hide his true purpose",
                            "He's been visiting the carnival for years searching"
                        ],
                        futurePayoff: "Kilo/Loki becomes recurring NPC. His lost item quest intersects with main story. Characters who were kind to him gain an ally; those who were rude may face consequences"
                    }
                }
            ],
            
            events: [
                {
                    name: "Hour 1: Welcome Gifts",
                    description: "Northwind marches down thoroughfare raining magical sycamore seeds. Red hands out dandelions for wishes.",
                    details: "Shortly after carnival opens, Northwind (twelve-foot-tall treant sapling garlanded in golden ribbons) marches down thoroughfare. Emerald clouds swirl above and rain golden spinning sycamore seeds. Red the squirrel hands dandelions to select passersby.",
                    timing: "Hour 1",
                    dmGuidance: {
                        playerOptions: [
                            {
                                option: "Catch Sycamore Seeds",
                                outcome: "DC 10 DEX check to catch before touching ground. Roll d8 for gift: 1-3 gain 'I am easily amused' trait until dawn, 4 gain d4 to add to one ability check before dawn, 5-7 seed turns into gold piece, 8 gain d8 to add to one ability check before dawn",
                                mechanics: "Fun minor rewards; sets whimsical tone"
                            },
                            {
                                option: "Make a Wish on Dandelion",
                                outcome: "Red hands each character a dandelion. Encourages making wish while blowing seeds into air. Players secretly write wishes; DM collects and keeps safe",
                                mechanics: "Track wish-makers - relevant in chapter 4, Wish Stones in Brigganock Mine"
                            },
                            {
                                option: "Talk to Northwind",
                                outcome: "Friendly treant, terrible at keeping secrets. Loudly whispers carnival gossip (see Dragonfly Rides location for details)",
                                mechanics: "Source of early information about Witch and Light"
                            }
                        ],
                        futurePayoff: "Dandelion wishes tracked for chapter 4 payoff"
                    }
                },
                {
                    name: "Hour 4: Big Top Extravaganza",
                    description: "Mister Light hosts hour-long show with performances and guest participation opportunity.",
                    details: "Spectators file into Big Top. Lights dim, hush falls. Spotlight illuminates Mister Light in silver hoop above center ring, wearing dazzling diamond-pane mirror suit and butterfly wings.",
                    timing: "Hour 4",
                    dmGuidance: {
                        playerOptions: [
                            {
                                option: "Watch the Performances",
                                outcome: "One hour of acts: Burly's feats of strength, Palasha's serenade from clamshell, Candlefoot's silent games, faerie dragons, acrobats, clowns, fire-breathers",
                                mechanics: "Entertainment; builds carnival atmosphere"
                            },
                            {
                                option: "Volunteer to Perform",
                                outcome: "Near end, Light asks if guests want to perform. DC 14 CHA (Performance) to woo spectators. Success: mood +1. Multiple characters performing together = group check; success: mood +3. Each character can only improve mood once during extravaganza",
                                mechanics: "Opportunity to improve mood and impress owners"
                            },
                            {
                                option: "Heckle or Disrupt Show",
                                outcome: "Light deflects with banter, stays jovial. Persistent heckling lowers mood -1",
                                mechanics: "Negative consequence; Light is skilled performer"
                            }
                        ],
                        moodEffects: "Performance +1 to +3, heckling -1",
                        futurePayoff: "Characters who impress crowd invited to meet Witch and Light. Burly leaves Staff Area during this event (best time for heist)"
                    }
                },
                {
                    name: "Hour 8: Crowning the Witchlight Monarch",
                    description: "Coronation ceremony where guest who contributed most to carnival happiness is crowned and receives flying charm.",
                    details: "Dirlagraun escorts Mister Witch from wagon. Light gives opening speech. Witchlight vane spins golden thread winding to chosen guest. Witch places crown of golden butterflies. Light knights with vane. Clowns shower glitter. Parade through carnival with fireworks finale.",
                    timing: "Hour 8",
                    dmGuidance: {
                        playerOptions: [
                            {
                                option: "Be Selected as Monarch",
                                outcome: "If mood positive, Light's vane chooses character who improved mood most (or players agree). Receives crown, knighting, parade, and Monarch's Whimsy charm",
                                mechanics: "Mood-based selection; DM discretion"
                            },
                            {
                                option: "Witness Coronation",
                                outcome: "If not selected, jubilant halfling bedecked in flowers is chosen. Light exudes cheerfulness regardless. Crown teleports back to hatbox after celebration",
                                mechanics: "Alternative outcome if party didn't improve mood"
                            },
                            {
                                option: "Receive Monarch's Whimsy Charm",
                                outcome: "Charm allows: As bonus action, fly (as fly spell) for 10 minutes. Vanishes when used or after 7 days. Title of Witchlight Monarch is PERMANENT and carries great weight in Prismeer",
                                mechanics: "One-time flight ability + permanent title benefits"
                            }
                        ],
                        rewards: "Monarch's Whimsy charm (fly 10 min, one use), Permanent title: Witchlight Monarch",
                        futurePayoff: "Fey creatures won't attack Monarch unless Monarch attacks first. Fey treat Monarch with reverence, addressing as 'Your Majesty' or 'Your Highness.' This matters throughout chapters 2-5"
                    }
                }
            ],
            
            sessionNotes: [
                "Track carnival mood throughout—affects NPC behavior and outcomes.",
                "Eight timed events structure the evening (Welcome Gifts hour 1, Extravaganza hour 4, Crowning hour 8).",
                "Characters need 8 ticket punches or fey pacts to experience attractions.",
                "Three Hourglass Coven thieves hunt ticketless visitors (Bavlorna's lornling, Sowpig, Gleam's shadow).",
                "Multiple paths to discover Prismeer portal: steal watch, befriend Kettlesteam, impress owners, or Tumblestrum intervention.",
                "Track Story Tracker items: buttons to Ernest, Feathereen debates, Tasha=Iggwilv knowledge, Palasha lessons, dragonfly control, hide-and-seek, snail racing, wishes, Candlefoot's voice, Witchlight Monarch title.",
                "Mood increases: rescue dwarf +1, pixie names +1, Palasha returns +2, reunite couple +2, half party races +1, impressive performance +1-3.",
                "Mood decreases: troublemakers -1, dwarf falls -1, Palasha driven away -1, Rubin disappears -1, heckling -1, rule-breaking -1, Viro lost -1, annoy Feathereen -1, break pact -1.",
                "Witchlight Monarch title grants immunity from Fey attacks in Prismeer unless Monarch attacks first. Fey treat with reverence."
            ]
        },
        {
            id: "chapter2",
            title: "Chapter 2: Hither",
            icon: "🌿",
            overview: "A marshy maze ruled by Bavlorna Blightstraw. Hospitality here means you may never leave unless you pay the bargain.",
            characters: [
                {
                    name: "Bavlorna Blightstraw",
                    role: "Marsh matron & hag",
                    stats: "CR 9 | AC 16 | HP 130",
                    abilities: [
                        "Bogbind: Wis save or become restrained and take poison damage.",
                        "Mirror of Hospitality: Forces a glimpse at a character's Lost Thing; failure creates a reflection mimic."
                    ],
                    quote: "Welcome, careless children. No one leaves without a gift... or a promise."
                },
                {
                    name: "Agdon Longscarf",
                    role: "Brigand leader",
                    stats: "CR 4 | AC 14 | HP 75",
                    abilities: ["Longscarf's Map (reveals safe paths)", "Shadow Feint"],
                    quote: "I guard the Tollway for a reason: payment and respect."
                }
            ],
            locations: [
                {
                    name: "The Soggy Court",
                    description: "Bavlorna's home, with floors of reflective water. Each room is timed—if you linger, new enemies spawn."
                },
                {
                    name: "Slanty Tower",
                    description: "Gravity-shifting tower with a vertical puzzle."
                },
                {
                    name: "Telemy Hill",
                    description: "Visibility flips at dawn/dusk; perfect place for ambushes."
                },
                {
                    name: "Brigands' Tollway",
                    description: "Bandits demand favors; players can bargain or fight."
                },
                {
                    name: "Downfall",
                    description: "Failed settlement; use NPCs to provide backstory on the Hourglass Coven."
                },
                {
                    name: "Bavlorna's Cottage",
                    description: "Kitchen shaped like a clock; solving the herb puzzle reveals a way to Thither."
                }
            ],
            events: [
                {
                    name: "Rules of Conduct",
                    description: "Bavlorna's list of hospitality rules, each a potential trap."
                },
                {
                    name: "Friendly Guides",
                    description: "Harengon scouts who will escort players for cookies."
                }
            ],
            sessionNotes: [
                "Use the Rules of Conduct sheet to remind players of Bavlorna's manipulations.",
                "Allow negotiation; Bavlorna dislikes direct violence but retreats when tricked.",
                "Provide a mural clue that maps the path from Hither to Thither."
            ]
        },
        {
            id: "chapter3",
            title: "Chapter 3: Thither",
            icon: "🌲",
            overview: "Skabatha Nightshade weaves corruption through Loomlurch's machines. Her domain is a dark forest where time is stitched into lace.",
            characters: [
                {
                    name: "Skabatha Nightshade",
                    role: "Thither hag",
                    stats: "CR 10 | AC 17 | HP 145",
                    abilities: [
                        "Thread of Night: Psychic damage & restrains.",
                        "Loomlurch Puppetry: Summons living dolls or trades player positions."
                    ],
                    quote: "The shadows are my lace. I sew your fate with velvet."
                }
            ],
            locations: [
                {
                    name: "Nib's Cave",
                    description: "Glowing cavern with quicklings. Use as encounter hub."
                },
                {
                    name: "Little Oak",
                    description: "Living tree that offers guidance when spoken to softly."
                },
                {
                    name: "Wayward Pool",
                    description: "Magical pond that reflects Yon. Jumping between lily pads offers glimpses."
                },
                {
                    name: "Loomlurch",
                    description: "Skabatha's factory; solving the loom puzzle frees the children."
                }
            ],
            events: [
                {
                    name: "Fairy Rings",
                    description: "Entering one triggers riddles; answers unlock compartments."
                },
                {
                    name: "Wanted Posters",
                    description: "Provide context for Kettlesteam and other carnival events."
                }
            ],
            sessionNotes: [
                "Use Bullywug Knight and Bullywug Royal patrols as environmental threats.",
                "Reward players who free children with the Fey Thread key."
            ]
        },
        {
            id: "chapter4",
            title: "Chapter 4: Yon",
            icon: "⛰️",
            overview: "Electric storms, beacons, and crystal heights. Endelyn Moongrave controls visions and lightning rods.",
            characters: [
                {
                    name: "Endelyn Moongrave",
                    role: "Yon hag",
                    stats: "CR 11 | AC 18 | HP 150",
                    abilities: [
                        "Moonglare: Wisdom save or experience haunting vision.",
                        "Lightning Rods: Control environmental hazards."
                    ],
                    quote: "Every lightning rod in Yon is a story I have written."
                },
                {
                    name: "Amidor & Gleam",
                    role: "Harengon twins",
                    description: "Provide comedic commentary and help unlock Motherhorn."
                }
            ],
            locations: [
                {
                    name: "Lockbury Henge",
                    description: "Stone circle that channels lightning."
                },
                {
                    name: "Fey Beacons",
                    description: "Markers that must glow in sequence to reveal Motherhorn."
                },
                {
                    name: "Brigganock Mine",
                    description: "Source of crystals for Valor's Call."
                },
                {
                    name: "Motherhorn",
                    description: "Endelyn's fortress with mirror stairs and temporal garden."
                }
            ],
            events: [
                {
                    name: "Lightning Rods Race",
                    description: "Ride rods between beacons; failing results in falling into the clouds."
                },
                {
                    name: "Prophecy of the Storm",
                    description: "Endelyn reveals the next domain and the cost of changing it."
                }
            ],
            sessionNotes: [
                "Track storm phases; allow players to interact with beacons to slow storms.",
                "Offer Valor's Call as an ally after providing resources."
            ]
        },
        {
            id: "chapter5",
            title: "Chapter 5: Palace of Heart's Desire",
            icon: "🏰",
            overview: "Zybilna's palace is a shifting maze of mirrors and time. Players face decisions: free Zybilna, trap her, or rewrite Prismeer's future.",
            characters: [
                {
                    name: "Zybilna / Iggwilv",
                    role: "Archfey ruler of Prismeer",
                    stats: "Legendary spellcaster (CR 18) | AC 20 | HP 310",
                    abilities: [
                        "Temporal Distortion: Rewinds 10 seconds if certain conditions met.",
                        "Reality Warping: Can reshape palace",
                        "Legendary Resistance (3/day)"
                    ],
                    quote: "Do you seek your past, or do you forge a new future?"
                },
                {
                    name: "Classwork Golem",
                    role: "Palace guardian",
                    stats: "CR 12 | AC 18 | HP 195",
                    abilities: ["Summon minor demons", "Command undead"],
                    quote: "Intruders shall be expelled."
                }
            ],
            locations: [
                {
                    name: "Clockwork Ballroom",
                    description: "Dancing floor manipulated by time loops."
                },
                {
                    name: "Memory Library",
                    description: "Each book opens a memory; use as knowledge repository."
                },
                {
                    name: "Temporal Garden",
                    description: "Flowers bloom and wilt in seconds; stepping on them rewinds or fast-forwards short durations."
                }
            ],
            events: [
                {
                    name: "Zybilna Comes Alive",
                    description: "She awakens when players complete certain conditions."
                },
                {
                    name: "Multiple Endings",
                    description: "Free Zybilna, imprison her, or take over the palace."
                }
            ],
            sessionNotes: [
                "Offer multiple endings: free Zybilna, imprison her, or take over the palace.",
                "Use story tracker to log key choices for after-session recap."
            ]
        }
    ],

    encounters: {
        chapter1: [
            {
                id: "carnival-arrival",
                name: "Arrival at the Carnival",
                location: "Ticket Booth",
                difficulty: "Easy",
                description: "Characters approach Nikolas Midnight's ticket booth. Must purchase tickets (8sp adult, 3sp child) or barter with fey pacts. Prepaid tickets available from anonymous benefactor (Ellywick Tumblestrum).",
                mechanics: "Social encounter. Nikolas uses Insight checks to detect troublemakers. Breaking pact causes ticket to fly away as bat, lowers mood -1.",
                creatures: ["Nikolas Midnight (Goblin)"],
                rewards: "Tickets, butterfly wings, carnival map"
            },
            {
                id: "kettlesteam-chase",
                name: "Catching Kettlesteam",
                location: "Various carnival locations",
                difficulty: "Medium",
                description: "Kenku warlock Kettlesteam causes mischief throughout carnival under disguise self. She panicked a dragonfly, heckled Palasha, and stole Candlefoot's voice. Characters must find and corner her.",
                mechanics: "1 hour search + DC 13 INT (Investigation) to spot through disguise. She flees if discovered. Willing to parley if characters claim to be investigating. DC 12 CHA (Intimidation/Persuasion) to get corn husk doll back.",
                creatures: ["Kettlesteam (Kenku Warlock)"],
                rewards: "Information about Zybilna and Hourglass Coven, Candlefoot's voice (corn husk doll), potential ally"
            },
            {
                id: "rescue-dwarf",
                name: "Rescue the Runaway Dragonfly",
                location: "Dragonfly Rides",
                difficulty: "Easy",
                description: "A giant dragonfly takes off prematurely with unfastened dwarf (blue beard). Kettlesteam panicked it with speak with animals. Characters can calm mount and guide it back.",
                mechanics: "DC 14 WIS (Animal Handling) to calm and return dragonfly. Success raises mood +1. Failure causes dwarf to fall (cushioned by tent), lowers mood -1.",
                creatures: ["Giant Dragonfly (panicked)"],
                rewards: "Carnival mood increase, gratitude"
            },
            {
                id: "find-viro",
                name: "Find the Missing Boy",
                location: "Lost Property area",
                difficulty: "Easy",
                description: "Viro grabs Star's mirrored ball from Lost Property wagon. Dirlagraun snaps at him, causing Viro to flee. Dirlagraun can't leave younger brother Allowin, asks characters to find Viro.",
                mechanics: "DC 15 WIS (Perception) to locate in candy stall. Can repeat after 10 minutes. If not found within hour, mood -1. Success earns Dirlagraun's trust and mirrored ball for finding Star.",
                creatures: ["Dirlagraun (Displacer Beast, friendly)"],
                rewards: "Mirrored ball (Star's toy), information about missing things"
            },
            {
                id: "carousel-puzzle",
                name: "Riddle of the Carousel",
                location: "Carousel",
                difficulty: "Medium",
                description: "Eight wooden unicorns have incomplete name tags. Pairs are named from proverbs. Must paint correct names on all tags to earn unicorns' secrets about the hags and Zybilna.",
                mechanics: "Players solve proverb puzzles: Fortune/Bold, Pride/Fall, Stone/Moss, Stitch/Nine. All correct = free ride where each unicorn shares 3 secrets telepathically about Lost Things or Warlock's Quest.",
                creatures: ["Diana Cloppington (Human/Horse fusion, operator)", "8 Wooden Unicorns (animated)"],
                rewards: "Critical information about hags' lairs and weaknesses, or Zybilna's predicament"
            },
            {
                id: "stealing-watch",
                name: "The Heist - Stealing the Witchlight Watch",
                location: "Big Top during Extravaganza",
                difficulty: "Hard",
                description: "Burly suggests stealing Mister Witch's pocket watch for leverage. Best opportunity during Big Top Extravaganza when Witch and Light are separated. Watch is on chain in waistcoat pocket.",
                mechanics: "DC 13 DEX (Sleight of Hand) as action to steal (advantage if distracted). Need thieves' tools/dagger/scissors to snip chain. Success gives leverage over Witch/Light who promise to show Prismeer path when returned.",
                creatures: ["Mister Witch", "Potential guards"],
                rewards: "Leverage to learn about Prismeer, incantation for Hall of Illusions portal"
            },
            {
                id: "hall-illusions-rubin",
                name: "Rescuing Rubin",
                location: "Hall of Illusions",
                difficulty: "Medium",
                description: "Halfling Rubin Sugarwood runs into Hall of Illusions after girlfriend Ween is affected by Tasha's Cabinet. Inside, Sowpig (Skabatha's thief) tries to lure him through mirror to Thither.",
                mechanics: "1 minute search + DC 15 WIS (Perception) to find Rubin. Can repeat after continuing search. If not found in 3 minutes, Rubin steps through mirror leaving engagement ring behind. Reuniting couple raises mood +1, losing him lowers mood -1.",
                creatures: ["Sowpig (Small ghoul with pig mask)", "Rubin & Ween (Halfling commoners)"],
                rewards: "Carnival mood increase if successful, potential encounter in chapter 3 if failed"
            },
            {
                id: "palasha-rescue",
                name: "Defending Palasha",
                location: "Silversong Lake",
                difficulty: "Medium",
                description: "Kettlesteam heckles Palasha's performance using disguise self and Mimicry to pose as different audience members. After three jeers, Palasha flees to river near Hall of Illusions. Must perform gallantry to bring her back.",
                mechanics: "WIS (Perception) vs Kettlesteam's CHA (Deception) to spot her. Helping Candlefoot recover voice counts as gallantry. Returning Palasha to lake raises mood +2. She offers singing lessons to helpers (useful chapter 3).",
                creatures: ["Kettlesteam (disguised)", "Palasha (Merfolk)"],
                rewards: "Singing lessons, carnival mood increase +2, Palasha as ally"
            }
        ],
        chapter2: [
            {
                id: "brigands-tollway",
                name: "Brigands' Tollway",
                location: "Brigands' Tollway",
                difficulty: "Medium",
                description: "Bandits demand payment; players decide whether to bribe or fight.",
                creatures: ["Harengon Brigands"],
                mechanics: "Social or combat encounter",
                rewards: "Safe passage"
            },
            {
                id: "meeting-bavlorna",
                name: "Meeting Bavlorna",
                location: "The Soggy Court",
                difficulty: "Hard",
                description: "Negotiate with Bavlorna and avoid being trapped in salt statues.",
                creatures: ["Bavlorna Blightstraw"],
                mechanics: "Social encounter with Rules of Conduct traps",
                rewards: "Information, safe passage to Thither"
            }
        ],
        chapter3: [
            {
                id: "loomlurch-liberation",
                name: "Loomlurch Liberation",
                location: "Loomlurch",
                difficulty: "Hard",
                description: "Free the lost children and stop the giga-loom.",
                creatures: ["Skabatha Nightshade", "Living Dolls"],
                mechanics: "Combat and puzzle encounter",
                rewards: "Fey Thread key, freed children"
            }
        ],
        chapter4: [
            {
                id: "lightning-rod-race",
                name: "Lightning Rods Race",
                location: "Fey Beacons",
                difficulty: "Medium",
                description: "Race between beacons while avoiding lightning strikes.",
                creatures: [],
                mechanics: "Skill challenge with environmental hazards",
                rewards: "Access to Motherhorn"
            },
            {
                id: "endelyn-prophecy",
                name: "Endelyn Prophecy",
                location: "Motherhorn",
                difficulty: "Hard",
                description: "Answer prophetic riddles to calm the storm.",
                creatures: ["Endelyn Moongrave"],
                mechanics: "Social and puzzle encounter",
                rewards: "Information, potential alliance"
            }
        ],
        chapter5: [
            {
                id: "zybilna-final",
                name: "Zybilna Showdown",
                location: "Palace of Heart's Desire",
                difficulty: "Deadly",
                description: "The final confrontation; players choose a fate for Prismeer.",
                creatures: ["Zybilna", "Classwork Golem"],
                mechanics: "Combat or social resolution with multiple endings",
                rewards: "Campaign conclusion, Zybilna's gifts"
            }
        ]
    },

    appendices: {
        magicItems: [
            {
                name: "Witchlight Watch",
                rarity: "Legendary (Unique)",
                description: "Mister Witch's pocket watch that controls carnival time. Cannot leave carnival grounds.",
                effect: "While holding, can stop or start carnival time as an action."
            },
            {
                name: "Witchlight Vane",
                rarity: "Legendary (Unique)",
                description: "Mister Light's scepter topped with spinning vane. Detects carnival mood and selects Witchlight Monarch.",
                effect: "Knows emotional state of all carnival visitors. Once per evening, selects guest who contributed most to happiness."
            },
            {
                name: "Scatterleaf Tea",
                rarity: "Uncommon (consumable)",
                description: "Pouch of magical tea leaves from Treaclewise.",
                effect: "Action to scatter in 5-ft radius circle. Duplicates protection from evil and good for 10 minutes. Protected creature gets hot tea in hands."
            },
            {
                name: "Pixie Dust",
                rarity: "Uncommon (consumable)",
                description: "Magical dust from pixies that grants flight.",
                effect: "As action, sprinkle on yourself or creature within 5 feet. Target can fly (as fly spell) for 10 minutes."
            },
            {
                name: "Potion of Advantage",
                rarity: "Rare (consumable)",
                description: "Swirling potion with golden sparkles.",
                effect: "When you drink this potion, you have advantage on all ability checks for 1 hour."
            },
            {
                name: "Monarch's Whimsy (Charm)",
                rarity: "Rare (charm)",
                description: "Charm granted to Witchlight Monarch upon coronation.",
                effect: "As bonus action, can fly (as fly spell) for 10 minutes. Charm vanishes when used or after 7 days. Title of Witchlight Monarch grants permanent benefits in Prismeer."
            },
            {
                name: "Star's Mirrored Ball",
                rarity: "Uncommon",
                description: "Small mirrored ball, favorite toy of Dirlagraun's lost cub Star.",
                effect: "When you look into it, you catch glimpses of Star's current location. Useful for tracking in chapter 3."
            }
        ],
        
        factions: [
            {
                name: "Hourglass Coven",
                description: "Three hags who split Prismeer into three realms: Hither, Thither, and Yon. They trapped Zybilna in temporal stasis and rule their domains with cruelty. Riddled with distrust—each hag is convinced her sisters are plotting against her.",
                members: ["Bavlorna Blightstraw (Hither)", "Skabatha Nightshade (Thither)", "Endelyn Moongrave (Yon)"]
            },
            {
                name: "Witchlight Carnival Staff",
                description: "Diverse group of workers loyal to Mister Witch and Mister Light. Many are refugees from Prismeer or other fey realms. Bound by pact to ignore Hourglass Coven thieves.",
                members: ["Mister Witch", "Mister Light", "Burly", "Dirlagraun", "Diana Cloppington", "Candlefoot", "Palasha", "Northwind", "Thaco", "Witchlight Hands"]
            },
            {
                name: "League of Malevolence",
                description: "Evil adventuring party seeking power in Prismeer.",
                members: ["Kelek", "Skylla", "Warduke", "Zarak", "Zargash"]
            },
            {
                name: "Valor's Call",
                description: "Heroic adventuring party opposing the League of Malevolence.",
                members: ["Elkhorn", "Mercien", "Molliver", "Ringlerun", "Strongheart"]
            }
        ],
        
        creatures: [
            {
                name: "Witchlight Hand",
                type: "Fey (various races)",
                cr: "1/2",
                stats: "AC 13 | HP 40 | Speed 30 ft",
                abilities: ["Fey Ancestry", "Innate Spellcasting (varies)", "Carnival Magic"]
            },
            {
                name: "Giant Dragonfly",
                type: "Beast",
                cr: "1/4",
                stats: "AC 13 | HP 22 | Speed 10 ft, fly 60 ft",
                abilities: ["Flyby"]
            },
            {
                name: "Giant Snail",
                type: "Beast",
                cr: "1/8",
                stats: "AC 12 | HP 16 | Speed 10 ft (racing: 80 ft/round)",
                abilities: ["Shell Protection"]
            },
            {
                name: "Treant Sapling",
                type: "Plant",
                cr: "2",
                stats: "AC 14 | HP 60 | Speed 30 ft",
                abilities: ["False Appearance", "Welcome Gifts", "Terrible at Secrets"]
            },
            {
                name: "Quickling (Bavlorna's Thief)",
                type: "Fey",
                cr: "1",
                stats: "AC 16 | HP 10 | Speed 120 ft",
                abilities: ["Blurred Movement", "No Ticket", "Sticky Fingers"]
            },
            {
                name: "Sowpig (Skabatha's Thief)",
                type: "Fey (Small Ghoul)",
                cr: "1",
                stats: "AC 13 | HP 17 | Speed 30 ft",
                abilities: ["No Ticket", "Sticky Fingers", "Pig Mask"]
            },
            {
                name: "Shadow (Gleam's Shadow)",
                type: "Fey (not Undead)",
                cr: "1/2",
                stats: "AC 12 | HP 16 | Speed 40 ft",
                abilities: ["Amorphous", "Shadow Stealth", "Strength Drain (non-lethal)", "No Ticket", "Sticky Fingers"]
            },
            {
                name: "Displacer Beast",
                type: "Monstrosity",
                cr: "3",
                stats: "AC 13 | HP 85 | Speed 40 ft | Speaks Elvish & Sylvan",
                abilities: ["Avoidance", "Displacement", "Tentacles", "Toffee Apple Juice Keg"]
            },
            {
                name: "Kettlesteam",
                type: "Kenku Warlock",
                cr: "3",
                stats: "AC 14 | HP 55 | Speed 30 ft, fly 30 ft (magic)",
                abilities: ["Disguise Self (at will)", "Mimicry", "Speak with Animals", "Voice Theft", "Eldritch Blast", "Fey Pact (Zybilna)"]
            }
        ]
    },

    storyTracker: {
        notes: [
            "The carnival vanishes every eight years; time in the Feywild is flexible.",
            "Mister Witch and Mister Light are shadar-kai who took over carnival through pact.",
            "They made deal with Hourglass Coven to allow thieves in exchange for staying in business.",
            "Zybilna is frozen in temporal stasis—carnival lost contact with patron.",
            "Rule of Three: future, present, past. Find the alicorn and free the dormant queen at last."
        ],
        trackingItems: [
            "Characters who gave buttons to Ernest (carnival safety escape)",
            "Characters who impressed Feathereen (useful chapter 5, area P41)",
            "Characters who know Tasha = Iggwilv (useful chapter 5)",
            "Characters who received Palasha's singing lesson (useful chapter 3)",
            "Characters who redirected giant dragonfly (useful chapter 4, area M20)",
            "Characters who played hide-and-seek (useful chapter 3, area L5)",
            "Characters who made dandelion wishes (useful chapter 4, Wish Stones)",
            "Characters who participated in snail racing (useful chapter 2, Reaching the Bottom)",
            "Characters who reunited Candlefoot with voice (acting lesson useful chapter 4)",
            "Character who became Witchlight Monarch (permanent title, Fey immunity/reverence)"
        ],
        lostThingsStatus: {}
    }
};
