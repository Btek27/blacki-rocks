// The Wild Beyond the Witchlight - Factions & NPCs Reference Data
const WITCHLIGHT_FACTIONS = {
    id: "factions",
    title: "Factions & NPCs",
    icon: "🎭",
    description: "Complete reference for all major factions, their members, and important creatures in the campaign.",
    
    factions: [
        {
            id: "hourglass-coven",
            name: "Hourglass Coven",
            type: "Hag Coven",
            theme: "Time-bound Wickedness",
            description: "The Hourglass Coven is a group of three hags, each one bound to an aspect of time: one reflects the past, another reflects the present, and the third reflects the future. These hags are utter wickedness distilled into corporeal forms, driven by a lust for secrets that can be used to manipulate their prey.",
            backstory: "Skabatha Nightshade, Bavlorna Blightstraw, and Endelyn Moongrave are daughters of Baba Yaga. The three became wild with jealousy when Iggwilv, Baba Yaga's adopted daughter, surpassed them in power and carved out a Feywild domain for herself in the guise of an archfey named Zybilna. The hags wormed their way into Iggwilv's good graces, biding their time until they could wrest the domain from her clutches.",
            plot: "They waited until Iggwilv was lured away on an important matter to imbue Iggwilv's Cauldron with the ability to freeze time. When their sister returned, the hags used this power to trap Iggwilv and her court in temporal stasis. The hags then carved up Iggwilv's domain, splitting it between them. The sisters couldn't agree on which of them should keep Iggwilv's Cauldron, so they left it in Iggwilv's palace and hired some unscrupulous mercenaries to watch over it.",
            dynamics: "The hags loathe each other's company, but one hag will occasionally visit another to plot against the third sister, creating a vicious circle in which Bavlorna and Endelyn plot against Skabatha, Endelyn and Skabatha conspire against Bavlorna, and Skabatha and Bavlorna bedevil Endelyn. Nothing much ever comes of these petty plots and squabbles, however.",
            members: [
                {
                    name: "Bavlorna Blightstraw",
                    title: "Slack-jawed Lorna • Hag of the Present",
                    role: "Marsh Matron of Hither",
                    cr: 7,
                    alignment: "Neutral Evil",
                    personality: "I detest chores and would rather have other creatures do them for me.",
                    ideal: "I don't care about the past or the future. I live in the present. What I do now, this very moment, is all that matters.",
                    bond: "I'm safe in my cottage. Why should I leave it when I can make others come to me?",
                    flaw: "Watching someone run widdershins makes me sneeze uncontrollably.",
                    description: "Younger than Skabatha and older than Endelyn, Bavlorna is called Slack-jawed Lorna because her wide mouth is prone to hang agape. Flies flit in and out of it. She is the hag of the present, the here and now, the moment to moment. Those desperate individuals who seek her out do so to find a remedy for a nagging problem or anxiety. Though she despises unannounced visitors, a tragic tale of woe and misery puts her in a bargaining mood.",
                    appearance: "Bavlorna has a toad-like face with a mouth that magically widens and elongates, enabling her to swallow creatures whole. Her bulging eyes move independently, constantly scanning her surroundings. Stained and moldering patchwork garments hide much of the leathery, mummified flesh that stretches over Bavlorna's compact frame and extraordinarily long, spindly limbs. She must submerge herself in a briny concoction for an hour each day, or her body will dry out until it locks up in a kind of living rictus.",
                    behavior: "Bavlorna lives like a hermit. She is frazzled, impatient, paranoid, and vindictive, lashing out at anyone she thinks is trying to deprive her of the treasures she has tucked away in her cottage. She trusts no one, so she creates tiny duplicates of herself, called lornlings, to serve as her attendants. When she travels away from her lair, she does so on her bobbing lily pad, accompanied by lornlings.",
                    weakness: "Bavlorna is allergic to the sight of creatures running counterclockwise in circles, a motion known as 'running widdershins.' Creatures that run widdershins within 10 feet of Bavlorna cause her to lapse into a fit of sneezing.",
                    statBlock: {
                        size: "Medium",
                        type: "Fey (Hag)",
                        alignment: "Neutral Evil",
                        ac: "15 (natural armor)",
                        hp: "110 (13d8 + 52)",
                        speed: "30 ft., swim 30 ft.",
                        stats: {
                            str: "22 (+6)",
                            dex: "11 (+0)",
                            con: "18 (+4)",
                            int: "16 (+3)",
                            wis: "12 (+1)",
                            cha: "15 (+2)"
                        },
                        saves: "Con +7, Int +6, Wis +4, Cha +5",
                        skills: "Arcana +9, Deception +5, Perception +4, Stealth +3",
                        senses: "truesight 60 ft., passive Perception 14",
                        languages: "Common, Elvish, Sylvan",
                        cr: "7 (2,900 XP)",
                        proficiency: "+3",
                        traits: [
                            { name: "Amphibious", description: "Bavlorna can breathe air and water." },
                            { name: "Boon of Immortality", description: "Bavlorna is immune to any effect that would age her, and she can't die from old age." },
                            { name: "Widdershins Allergy", description: "If a creature within 10 feet of Bavlorna uses at least 10 feet of movement to run in place counterclockwise, Bavlorna is overcome by a fit of sneezing and can't cast spells until the end of her next turn. In addition, any creature Bavlorna has swallowed is immediately expelled and falls prone in an unoccupied space within 5 feet of her." }
                        ],
                        actions: [
                            { name: "Multiattack", description: "Bavlorna makes one Bite attack and one Withering Ray attack." },
                            { name: "Bite", description: "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) piercing damage, and the target is grappled (escape DC 16) if it is a Medium or smaller creature. Until the grapple ends, the target is restrained, and Bavlorna can't use her Bite attack on another target." },
                            { name: "Withering Ray", description: "Ranged Spell Attack: +6 to hit, range 60 ft., one target. Hit: 17 (4d6 + 3) necrotic damage." },
                            { name: "Create Lornlings (Recharge 5–6)", description: "Bavlorna creates one or two 1-foot-tall duplicates of herself, called lornlings (use the quickling stat block). Each lornling appears in an unoccupied space within 5 feet of Bavlorna, obeys her commands, and takes its turn immediately after hers. A lornling lasts for 1 hour, until it or Bavlorna dies, or until Bavlorna dismisses it as an action. Bavlorna can have no more than eight lornlings in existence at a time." },
                            { name: "Spellcasting", description: "Bavlorna casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 14):<br><strong>At will:</strong> detect magic<br><strong>2/day each:</strong> create food and water, polymorph, remove curse<br><strong>1/day:</strong> plane shift (self only)" }
                        ],
                        bonusActions: [
                            { name: "Swallow", description: "Bavlorna swallows a Small or smaller creature she is grappling, ending the grapple on it. The swallowed creature is blinded and restrained, it has total cover against attacks and other effects outside Bavlorna, and it takes 10 (3d6) acid damage at the start of each of its turns. If the swallowed creature is one of Bavlorna's lornlings, Bavlorna gains all the lornling's memories when the acid damage reduces it to 0 hit points. Bavlorna can have only one creature swallowed at a time. If Bavlorna dies, a swallowed creature is no longer restrained and can escape from the corpse using 5 feet of movement, exiting prone." }
                        ]
                    }
                },
                {
                    name: "Endelyn Moongrave",
                    title: "Creeping Lyn • Bitter End • Hag of the Future",
                    role: "Theatrical Matron of Yon",
                    cr: 6,
                    alignment: "Neutral Evil",
                    personality: "I have foreseen not only this moment but the next as well. Nothing surprises me.",
                    ideal: "Each of us gets to play the lead in our own tragedy, but if you can't be bothered to put on a good show before you die, don't waste my time.",
                    bond: "My world is the stage, and my theater is of paramount importance to me.",
                    flaw: "My death will occur during an eclipse. That is my doom, and I can't change it, but I will do everything in my power to forestall it.",
                    description: "Endelyn, also known by the names Creeping Lyn and Bitter End, is the youngest member of the Hourglass Coven. People come to her to learn about their futures, which she spells out through grotesque theatrical pageants. As payment, she snatches away a portion of each client's free will, preventing them from taking certain courses of action in their lives. Her petitioners often learn of a dreadful fate that awaits them but find themselves unable to prevent it due to the cursed terms of their deal.",
                    appearance: "Endelyn's emaciated form is hidden under the layers of her elaborate costume. Part dress, part mechanical theater, the outfit makes her look frighteningly tall; without it, she is a hunched and withered bag of bones. She shrouds her wrinkled features behind a gauzy 'theater curtain' veil. The outermost layers of her dress open to reveal a marionette theatre, and she manipulates her puppets using an arrangement of artificial hands that nestles in the folds of fabric. She travels about Yon on her ornithopter of flying.",
                    behavior: "Endelyn's obsession with tragedy and hopelessness extends to her own life; she has foreseen her own demise during a solar eclipse. In the depths of her castle, a lightning-powered device called the Orrery of Tragedies clicks and turns day and night, giving Endelyn glimpses of her terrible fate.",
                    weakness: "The only way to dispose of Endelyn for good is to slay her during an actual solar eclipse or in the presence of a symbolic depiction of one.",
                    statBlock: {
                        size: "Medium",
                        type: "Fey (Hag)",
                        alignment: "Neutral Evil",
                        ac: "17 (natural armor)",
                        hp: "114 (12d8 + 60)",
                        speed: "30 ft., climb 30 ft.",
                        stats: {
                            str: "20 (+5)",
                            dex: "13 (+1)",
                            con: "20 (+5)",
                            int: "13 (+1)",
                            wis: "10 (+0)",
                            cha: "17 (+3)"
                        },
                        saves: "Con +8, Int +4, Wis +3, Cha +6",
                        skills: "Arcana +7, Deception +6, Perception +3, Stealth +4",
                        senses: "truesight 60 ft., passive Perception 13",
                        languages: "Common, Elvish, Sylvan",
                        cr: "6 (2,300 XP)",
                        proficiency: "+3",
                        traits: [
                            { name: "Boon of Immortality", description: "Endelyn is immune to any effect that would age her, and she can't die from old age." },
                            { name: "Eclipsed Doom", description: "Endelyn can be killed only if she is reduced to 0 hit points during a solar eclipse or while she is within 60 feet of a symbolic representation of one. Otherwise, Endelyn disappears in a cloud of inky smoke when she drops to 0 hit points, along with anything she was wearing or carrying, and reappears 24 hours later in the same location or the nearest unoccupied space." },
                            { name: "Uncanny Awareness", description: "Endelyn can't be surprised." }
                        ],
                        actions: [
                            { name: "Multiattack", description: "Endelyn makes two Puppeteer's Lash attacks." },
                            { name: "Puppeteer's Lash", description: "Melee or Ranged Spell Attack: +6 to hit, reach 5 ft. or range 60 ft., one creature. Hit: 17 (4d6 + 3) psychic damage, and if the target is Large or smaller, Endelyn telekinetically moves it up to 10 feet in any direction horizontally." },
                            { name: "Spellcasting", description: "Endelyn casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 14):<br><strong>At will:</strong> detect magic, mage hand<br><strong>2/day each:</strong> augury, polymorph<br><strong>1/day:</strong> plane shift (self only)" }
                        ]
                    }
                },
                {
                    name: "Skabatha Nightshade",
                    title: "Granny Nightshade • Hag of the Past",
                    role: "Toymaker Matron of Thither",
                    cr: 8,
                    alignment: "Neutral Evil",
                    personality: "When dealing with outsiders, I present myself as a kindly old grandmother.",
                    ideal: "Children are better off working for me than picking up lots of bad habits.",
                    bond: "I hate my sisters, but together we are strong.",
                    flaw: "I forget the first creature I see each day when I awaken.",
                    description: "Skabatha is the oldest member of the Hourglass Coven. Better known as Granny Nightshade, she offers her assistance to those who are haunted by regret. Her deals often result in cruel twists; for example, a petitioner who asks to be reunited with a lost love might be transformed into one of their loved one's cherished items, such as a favorite bonnet. Skabatha assumes the guise of an old toymaker. Part toy herself, she has a windup key between her hunched shoulders that rotates quickly when she's in a good mood and slows down as her mood sours. When she is furious, the key comes to a dead stop.",
                    appearance: "Skabatha appears as a short, thin, gnarled woman swathed in a tattered dress with petticoats. Cracked white face paint plasters her features, with crimson splotches on her cheeks and thick mascara coating her sparse eyelashes. Underneath her makeup, her flesh is textured like rotten bark and infested with wood lice and fungus. The windup key sticking out of her back is a part of her body and no easier to remove than one of her limbs. Skabatha roams Thither on her flying rocking horse, which creaks horribly as it moves.",
                    weakness: "Skabatha always forgets the first creature she sees when she awakens after a long rest.",
                    statBlock: {
                        size: "Medium",
                        type: "Fey (Hag)",
                        alignment: "Neutral Evil",
                        ac: "16 (natural armor)",
                        hp: "150 (20d8 + 60)",
                        speed: "30 ft.",
                        stats: {
                            str: "18 (+4)",
                            dex: "9 (−1)",
                            con: "16 (+3)",
                            int: "12 (+1)",
                            wis: "16 (+3)",
                            cha: "15 (+2)"
                        },
                        saves: "Con +6, Int +4, Wis +6, Cha +5",
                        skills: "Arcana +7, Deception +5, Perception +6, Stealth +2",
                        senses: "truesight 60 ft., passive Perception 16",
                        languages: "Common, Elvish, Infernal, Sylvan",
                        cr: "8 (3,900 XP)",
                        proficiency: "+3",
                        traits: [
                            { name: "Boon of Immortality", description: "Skabatha is immune to any effect that would age her, and she can't die from old age." },
                            { name: "Forgetfulness", description: "The first creature that Skabatha sees after she finishes a long rest is invisible to her. She can't remember seeing the creature or perceive it using her truesight until the end of her next long rest." }
                        ],
                        actions: [
                            { name: "Multiattack", description: "Skabatha makes two Claw attacks." },
                            { name: "Claw", description: "Melee Weapon Attack: +7 to hit, reach 5 ft., one creature. Hit: 25 (6d6 + 4) poison damage." },
                            { name: "Spellcasting", description: "Skabatha casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 14):<br><strong>At will:</strong> detect magic, druidcraft, speak with animals<br><strong>2/day each:</strong> polymorph, remove curse, speak with plants<br><strong>1/day each:</strong> awaken (as an action), plane shift (self only)" }
                        ],
                        bonusActions: [
                            { name: "Alter Size", description: "Skabatha magically shrinks herself to Tiny size (between 4 and 8 inches tall) or returns to her normal size. If Skabatha lacks the room to return to her normal size, she attains the maximum size possible in the space available. Anything she is wearing or carrying changes size along with her. As a Tiny creature, Skabatha deals 2 (1d4) poison damage when she hits with a Claw attack. She has advantage on Dexterity (Stealth) checks, and disadvantage on Strength checks and Strength saving throws. Her statistics otherwise remain unchanged." }
                        ]
                    }
                }
            ]
        },
        {
            id: "league-of-malevolence",
            name: "League of Malevolence",
            type: "Villain Organization",
            theme: "Power Through Unity",
            description: "The League of Malevolence is an odious assemblage of villains united in one purpose: the accumulation of power. Its founding member, the sorcerer Kelek, expects his confederates to work together for their mutual benefit, but he also encourages them to pursue their own evil schemes.",
            note: "Five members of the league, including Kelek, are described here, although one member (Skylla) has recently parted ways with the others.",
            members: [
                {
                    name: "Kelek",
                    title: "Sorcerer • League Founder",
                    role: "Greedy Narcissist",
                    cr: 5,
                    alignment: "Chaotic Evil",
                    personality: "All who hear my name should tremble in fear!",
                    ideal: "Kindness is just another word for weakness.",
                    bond: "I must have Ringlerun's staff! With it, the League of Malevolence will be unstoppable!",
                    flaw: "I trust no one, nor am I trustworthy.",
                    description: "Kelek is a greedy, narcissistic sociopath who revels in chaos but is a coward at heart. The fact that he's highly intelligent makes him even more dangerous. More than anything, he wants the staff of power in the possession of his most hated foe, Ringlerun.",
                    combatNotes: "Kelek uses Arcane Defense to bolster his low Armor Class whenever possible, and his challenge rating is a reflection of the likelihood that he will use Fiery Explosion as often as he can. If one or more of his allies get caught in a blast, so be it.",
                    statBlock: {
                        size: "Medium",
                        type: "Humanoid (Human, Sorcerer)",
                        alignment: "Chaotic Evil",
                        ac: "12 (bracers of defense)",
                        hp: "45 (7d8 + 14)",
                        speed: "30 ft.",
                        stats: {
                            str: "15 (+2)",
                            dex: "10 (+0)",
                            con: "14 (+2)",
                            int: "15 (+2)",
                            wis: "13 (+1)",
                            cha: "17 (+3)"
                        },
                        saves: "Con +5, Cha +6",
                        skills: "Deception +6, Intimidation +6",
                        senses: "passive Perception 11",
                        languages: "Common, Draconic, Elvish",
                        cr: "5 (1,800 XP)",
                        proficiency: "+3",
                        equipment: "Kelek wears bracers of defense and carries a staff of striking with 10 charges. The staff regains 1d6 + 4 expended charges daily at dawn. If its last charge is expended, roll a d20; on a 1, the staff becomes a nonmagical quarterstaff.",
                        actions: [
                            { name: "Multiattack", description: "Kelek makes three attacks using Sorcerer's Bolt, Staff of Striking, or a combination of them. He can replace one of the attacks with a use of Spellcasting." },
                            { name: "Sorcerer's Bolt", description: "Melee or Ranged Spell Attack: +6 to hit, reach 5 ft. or range 60 ft., one target. Hit: 13 (2d12) force damage." },
                            { name: "Staff of Striking", description: "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 8 (1d6 + 5) bludgeoning damage, or 9 (1d8 + 5) bludgeoning damage when used with two hands, and Kelek can expend up to 3 of the staff's charges, dealing an extra 3 (1d6) force damage for each expended charge." },
                            { name: "Fiery Explosion (Recharge 4–6)", description: "Kelek creates a magical explosion of fire centered on a point he can see within 120 feet of him. Each creature in a 20-foot-radius sphere centered on that point must make a DC 14 Dexterity saving throw, taking 35 (10d6) fire damage on a failed save, or half as much damage on a successful one." },
                            { name: "Spellcasting", description: "Kelek casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 14):<br><strong>At will:</strong> light, mage hand, prestidigitation<br><strong>1/day each:</strong> dominate beast, fly, mirror image, web" }
                        ],
                        reactions: [
                            { name: "Arcane Defense (3/Day)", description: "When he is hit by an attack, Kelek protects himself with an invisible barrier of magical force. Until the end of his next turn, he gains a +5 bonus to AC, including against the triggering attack." }
                        ]
                    }
                },
                {
                    name: "Skylla",
                    title: "Warlock of Baba Yaga (alias: Charmay)",
                    role: "Liaison to Hourglass Coven",
                    cr: 2,
                    alignment: "Chaotic Evil",
                    personality: "Only a fool would turn their back on me.",
                    ideal: "Power is what I crave. One can never have too much of it.",
                    bond: "Baba Yaga is my patron, and she has taught me to be self-reliant. Nevertheless, I feel beholden to stay on good terms with her vile spawn, the hags of the Hourglass Coven.",
                    flaw: "I don't have a single friend I can count on.",
                    description: "Skylla forged a warlock's pact with Baba Yaga. It is from this powerful archfey that Skylla draws her magic. Skylla is spiteful and treacherous, as likely to betray her allies as to help them. She talked Kelek into allowing her to serve as the primary liaison between the League of Malevolence and the Hourglass Coven, claiming her pact with Baba Yaga made her better suited for the role than anyone else. Endelyn Moongrave foresaw that Skylla's allies would turn on her one day and shared this information with the warlock. Skylla reacted to that news by distancing herself from the League of Malevolence, and now she works for Endelyn. Skylla is open to the idea of rejoining the league, but not while Kelek is in charge.",
                    combatNotes: "Skylla is not an effective melee combatant. She is more dangerous when she can use magic from a safe distance. She can also use her faerie fire spell to make foes easier for her allies to hit.",
                    statBlock: {
                        size: "Medium",
                        type: "Humanoid (Human, Warlock)",
                        alignment: "Chaotic Evil",
                        ac: "10 (13 with mage armor)",
                        hp: "39 (6d8 + 12)",
                        speed: "30 ft.",
                        stats: {
                            str: "9 (–1)",
                            dex: "11 (+0)",
                            con: "14 (+2)",
                            int: "12 (+1)",
                            wis: "15 (+2)",
                            cha: "17 (+3)"
                        },
                        saves: "Wis +4, Cha +5",
                        skills: "Deception +5, Intimidation +5, Nature +3, Persuasion +5",
                        senses: "passive Perception 12",
                        languages: "Common, Elvish",
                        cr: "2 (450 XP)",
                        proficiency: "+2",
                        equipment: "Skylla carries an eldritch staff with 10 charges. The staff regains 1d6 + 4 expended charges daily at dawn. If its last charge is expended, roll a d20; on a 1, the staff is destroyed.",
                        actions: [
                            { name: "Multiattack", description: "Skylla makes two Eldritch Staff attacks. She can replace one of the attacks with a use of Spellcasting." },
                            { name: "Eldritch Staff", description: "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) bludgeoning damage, or 4 (1d8) bludgeoning damage when used with two hands, and Skylla can expend up to 3 of the staff's charges, dealing an extra 4 (1d8) lightning damage for each expended charge." },
                            { name: "Spellcasting", description: "Skylla casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 13):<br><strong>1/day each:</strong> detect magic, disguise self, faerie fire, fly, hypnotic pattern, invisibility, mage armor" }
                        ],
                        reactions: [
                            { name: "Eldritch Escape", description: "When Skylla takes damage, she can expend 3 charges of her eldritch staff to turn invisible and teleport, along with any equipment she's wearing or carrying, up to 60 feet to an unoccupied space she can see. She remains invisible until the start of her next turn or until she attacks or casts a spell." }
                        ]
                    }
                },
                {
                    name: "Warduke",
                    title: "Killer-for-Hire",
                    role: "Remorseless Swordsman",
                    cr: 5,
                    alignment: "Chaotic Evil",
                    personality: "I speak with the flames and razor-sharp edges of my sword. They beat words to hell.",
                    ideal: "I expect to be paid well for my handiwork.",
                    bond: "The League of Malevolence is a convenient arrangement—until something better comes along.",
                    flaw: "I would rather die than surrender.",
                    description: "Warduke's services as a remorseless killer-for-hire can be easily bought. The evil swordsman serves Kelek as a cohort and adventuring companion from time to time. He isn't terribly bright, which is why he leaves the plotting and scheming to others. What does Warduke look like under his dread helm? No one knows. He never removes his helmet to reveal his face to others, but the visage beneath it is that of a grim, hideously scarred gladiator.",
                    combatNotes: "Warduke likes to hit things with his sword; it's as simple as that.",
                    statBlock: {
                        size: "Medium",
                        type: "Humanoid (Human)",
                        alignment: "Chaotic Evil",
                        ac: "17 (half plate, shield)",
                        hp: "78 (12d8 + 24)",
                        speed: "30 ft.",
                        stats: {
                            str: "16 (+3)",
                            dex: "11 (+0)",
                            con: "14 (+2)",
                            int: "9 (–1)",
                            wis: "11 (+0)",
                            cha: "11 (+0)"
                        },
                        saves: "Str +6, Con +5",
                        skills: "Athletics +6, Intimidation +3",
                        senses: "passive Perception 10",
                        languages: "Common",
                        cr: "5 (1,800 XP)",
                        proficiency: "+3",
                        equipment: "Warduke wears a dread helm and wields a flame tongue longsword.",
                        actions: [
                            { name: "Multiattack", description: "Warduke makes three Flame Tongue or Dagger attacks." },
                            { name: "Flame Tongue", description: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage when used with two hands, plus 7 (2d6) fire damage if the weapon is aflame." },
                            { name: "Dagger", description: "Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 5 (1d4 + 3) piercing damage." }
                        ],
                        bonusActions: [
                            { name: "Flaming Blade", description: "Warduke ignites or extinguishes his flame tongue longsword. While aflame, it sheds bright light in a 40-foot radius and dim light for an additional 40 feet." },
                            { name: "Second Wind (Recharges after a Short or Long Rest)", description: "Warduke regains 13 hit points." }
                        ]
                    }
                },
                {
                    name: "Zarak",
                    title: "Orcish Assassin",
                    role: "Mercenary Killer",
                    cr: 2,
                    alignment: "Chaotic Evil",
                    personality: "I mince people, not words.",
                    ideal: "Coin is what I crave.",
                    bond: "Once I agree to kill something, I pursue my quarry until the job is done.",
                    flaw: "A friend is just an enemy I haven't made yet.",
                    description: "Zarak is an assassin without honor or conscience. Unusually short of stature for someone of orcish heritage, he might pass for an ugly, beardless dwarf were it not for his rotting tusks and grayish pallor. The only thing he loves is money, and he wouldn't hesitate to stab allies in the back if they came between him and the riches he covets.",
                    combatNotes: "When faced with multiple foes, Zarak prefers to hurl daggers from a distance. When targeting a lone individual, especially someone he has been hired to kill, he prefers the up-close-and-personal garrote, so that he can hear the dying breath of his hapless prey. If defeat seems likely, he quaffs his potion of invisibility and flees.",
                    statBlock: {
                        size: "Medium",
                        type: "Humanoid (Orc)",
                        alignment: "Chaotic Evil",
                        ac: "14 (leather armor)",
                        hp: "37 (5d8 + 15)",
                        speed: "30 ft.",
                        stats: {
                            str: "13 (+1)",
                            dex: "16 (+3)",
                            con: "16 (+3)",
                            int: "11 (+0)",
                            wis: "15 (+2)",
                            cha: "6 (–2)"
                        },
                        saves: "Dex +5, Int +2",
                        skills: "Acrobatics +7, Insight +6, Perception +6, Stealth +7",
                        senses: "darkvision 60 ft., passive Perception 16",
                        languages: "Common, Orc",
                        cr: "2 (450 XP)",
                        proficiency: "+2",
                        equipment: "Zarak carries a potion of invisibility.",
                        actions: [
                            { name: "Multiattack", description: "Zarak makes two Dagger attacks." },
                            { name: "Dagger", description: "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 5 (1d4 + 3) piercing damage, plus an extra 5 (2d4) piercing damage if the target is a creature and Zarak has at least 18 hit points." },
                            { name: "Garrote", description: "Melee Weapon Attack: +5 to hit, reach 5 ft., one Humanoid. Hit: 8 (2d4 + 3) slashing damage, and the target is grappled (escape DC 11). Until this grapple ends, the target takes 8 (2d4 + 3) slashing damage at the start of each of its turns, and Zarak can't grapple another creature or use Assassin's Whim." }
                        ],
                        bonusActions: [
                            { name: "Assassin's Whim", description: "Zarak takes the Dash, Disengage, or Hide action." }
                        ],
                        reactions: [
                            { name: "Uncanny Dodge", description: "Zarak halves the damage he takes from an attack made against him, provided he can see the attacker." }
                        ]
                    }
                },
                {
                    name: "Zargash",
                    title: "Priest of Orcus",
                    role: "Death Cleric",
                    cr: 3,
                    alignment: "Chaotic Evil",
                    personality: "I do not fear death, for when I die, Orcus will transform me into a vampire.",
                    ideal: "Entropy is not simply the bane of existence. It's the doom of the multiverse. My job is to speed it along.",
                    bond: "Praise Orcus! May he give me the power to spread death, decay, and undeath in his name!",
                    flaw: "I see living people as the corpses they are doomed to become and treat them accordingly.",
                    description: "Zargash worships Orcus, the Demon Prince of Undeath, who has promised to transform Zargash into a vampire after a lifetime of faithful service. For a living priest to worship Orcus is utter folly, but Zargash is twisted beyond any hope of redemption. His hobbies include slaying the living and animating the dead.",
                    combatNotes: "War is Zargash's domain. He wears a rusty chain shirt under his robe and likes to thwart enemy spellcasters by enveloping them in the area of a silence spell. If defeat seems inevitable, he casts gaseous form on himself and flees, leaving his allies to fend for themselves.",
                    statBlock: {
                        size: "Medium",
                        type: "Humanoid (Cleric, Human)",
                        alignment: "Chaotic Evil",
                        ac: "13 (chain shirt)",
                        hp: "45 (7d8 + 14)",
                        speed: "30 ft.",
                        stats: {
                            str: "14 (+2)",
                            dex: "10 (+0)",
                            con: "14 (+2)",
                            int: "12 (+1)",
                            wis: "16 (+3)",
                            cha: "15 (+2)"
                        },
                        saves: "Wis +5, Cha +4",
                        skills: "Deception +6, Insight +5",
                        senses: "passive Perception 13",
                        languages: "Common",
                        cr: "3 (700 XP)",
                        proficiency: "+2",
                        equipment: "Zargash wears a bat-shaped amulet that has the properties of a ring of feather falling.",
                        traits: [
                            { name: "Cling to Life (Recharges after a Long Rest)", description: "The first time Zargash would drop to 0 hit points as a result of taking damage, he instead drops to 1 hit point." }
                        ],
                        actions: [
                            { name: "Warhammer", description: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) bludgeoning damage, or 7 (1d10 + 2) bludgeoning damage when used with two hands." },
                            { name: "Deathly Ray", description: "Ranged Spell Attack: +5 to hit, range 60 ft., one creature. Hit: 25 (4d10 + 3) necrotic damage." },
                            { name: "Spellcasting", description: "Zargash casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):<br><strong>At will:</strong> light, thaumaturgy<br><strong>1/day each:</strong> command, gaseous form, hold person, silence, speak with dead" }
                        ],
                        bonusActions: [
                            { name: "Animate Corpse (1/Day)", description: "Zargash targets the lifeless corpse of one Humanoid he can see within 30 feet of him and commands it to rise, transforming it into a zombie under his control. The zombie takes its turn immediately after Zargash. Animating the zombie requires Zargash's concentration (as if concentrating on a spell). The zombie reverts to an inanimate corpse after 10 minutes, when it drops to 0 hit points, or when Zargash's concentration ends." }
                        ]
                    }
                }
            ]
        },
        {
            id: "valors-call",
            name: "Valor's Call",
            type: "Heroic Adventuring Party",
            theme: "Good Triumphant",
            description: "The noble adventuring party known as Valor's Call was founded by Strongheart, a resolute human paladin committed to destroying evil wherever it rears its ugly head. Strongheart alone determines who can become a member of this prestigious group. Only good-aligned characters are allowed to join Valor's Call.",
            note: "Strongheart is always on the lookout for courageous heroes who are willing to devote themselves to a good cause. The group has more members than those described here, who are busy elsewhere.",
            members: [
                {
                    name: "Strongheart",
                    title: "Paladin • Founder of Valor's Call",
                    role: "Champion of Justice",
                    cr: 4,
                    alignment: "Lawful Good",
                    personality: "I try to see the good in people, but I won't give comfort to those who have no goodness in them.",
                    ideal: "Justice needs champions. I count myself as one.",
                    bond: "Valor's Call is not just an assembly of like-minded individuals who believe that good must triumph over evil. Its members are also my friends.",
                    flaw: "I am prepared—my friends might say too prepared—to sacrifice myself for the greatest good.",
                    description: "Strongheart is a fearless seeker of justice, risking his life to ensure that good triumphs over evil. He is thoughtful, kind, and seldom rash, yet never hesitant to punish those who spit in the face of law and order. Strongheart doesn't worship a god but devotes himself to an ideal: that the world can be spared from evil by those who have enough courage to stand against it.",
                    combatNotes: "Strongheart prefers to fight with Steel, his trusty sword. His favorite use of the command spell is to compel a foe to 'Yield!' (which has the same effect as commanding it to halt). He tries to capture and imprison evildoers, slaying them only if they cannot be apprehended.",
                    statBlock: {
                        size: "Medium",
                        type: "Humanoid (Human, Paladin)",
                        alignment: "Lawful Good",
                        ac: "20 (plate armor, shield)",
                        hp: "55 (10d8 + 10)",
                        speed: "30 ft.",
                        stats: {
                            str: "15 (+2)",
                            dex: "12 (+1)",
                            con: "13 (+1)",
                            int: "12 (+1)",
                            wis: "13 (+1)",
                            cha: "17 (+3)"
                        },
                        saves: "Wis +3, Cha +5",
                        skills: "Insight +3, Persuasion +5",
                        conditionImmunities: "frightened",
                        senses: "passive Perception 11",
                        languages: "Common, Dwarvish",
                        cr: "4 (1,100 XP)",
                        proficiency: "+2",
                        equipment: "Strongheart wields Steel, a sentient, lawful good longsword.",
                        actions: [
                            { name: "Multiattack", description: "Strongheart makes three Steel attacks." },
                            { name: "Steel", description: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage when used with two hands. Once on each of his turns, Strongheart can also cause the blade to gleam with holy light. If he does so, the target is blinded until the start of Strongheart's next turn." },
                            { name: "Revivify (Recharges at the Next Dawn)", description: "While holding Steel, Strongheart casts revivify." },
                            { name: "Spellcasting", description: "Strongheart casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 13):<br><strong>3/day each:</strong> command, detect evil and good, protection from evil and good<br><strong>1/day each:</strong> lesser restoration, remove curse, zone of truth" }
                        ],
                        reactions: [
                            { name: "Protect Another", description: "When a creature Strongheart can see attacks another creature that is within 5 feet of him, Strongheart can use his reaction to impose disadvantage on the attack roll, provided he is carrying a shield." }
                        ]
                    }
                },
                {
                    name: "Elkhorn",
                    title: "Dwarven Veteran",
                    role: "Loyal Companion",
                    cr: 2,
                    alignment: "Lawful Good",
                    personality: "As long as I have the strength in my bones to fight evil, that is what I will do.",
                    ideal: "One who stands idle as evil remains unchecked is no friend or ally of mine. We all have an obligation to fight atrocity and corruption, to whatever extent we can.",
                    bond: "Strongheart is a good egg, but I have yet to teach him all I know about being a true menace to evildoers.",
                    flaw: "Retire? My goodness, no. I'll retire when I'm dead.",
                    description: "Elkhorn has been Strongheart's most stalwart companion over the years—unflinchingly loyal, tirelessly optimistic, and fiercely devoted to the destruction of evil in all its forms. He's not especially bright, so he fights with his heart rather than his wits. Age has drained much of the strength from Elkhorn's body. Strongheart has urged Elkhorn to retire, but the old dwarf stubbornly refuses to do so.",
                    combatNotes: "Elkhorn's challenge rating is based on him using Feint to improve his rather weak sword attack. Having been trained in his youth to fight ogres and trolls, he's much more dangerous against creatures that are significantly bigger than he is.",
                    statBlock: {
                        size: "Medium",
                        type: "Humanoid (Dwarf)",
                        alignment: "Lawful Good",
                        ac: "18 (chain mail, shield)",
                        hp: "52 (7d8 + 21)",
                        speed: "25 ft.",
                        stats: {
                            str: "9 (–1)",
                            dex: "13 (+1)",
                            con: "16 (+3)",
                            int: "9 (–1)",
                            wis: "10 (+0)",
                            cha: "11 (+0)"
                        },
                        saves: "Str +1, Con +5",
                        skills: "Perception +2, Survival +2",
                        damageResistances: "poison",
                        senses: "darkvision 60 ft., passive Perception 12",
                        languages: "Common, Dwarvish",
                        cr: "2 (450 XP)",
                        proficiency: "+2",
                        equipment: "Elkhorn wields a +1 longsword.",
                        actions: [
                            { name: "Multiattack", description: "Elkhorn makes two Dagger or +1 Longsword attacks." },
                            { name: "Dagger", description: "Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 3 (1d4 + 1) piercing damage. If the target is a creature that is Large or bigger, it takes an extra 5 (1d10) piercing damage." },
                            { name: "+1 Longsword", description: "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 4 (1d8) slashing damage, or 5 (1d10) slashing damage when used with two hands. If the target is a creature that is Large or bigger, it takes an extra 5 (1d10) slashing damage." }
                        ],
                        bonusActions: [
                            { name: "Feint (Recharge 5–6)", description: "Elkhorn targets one creature that he can see within 5 feet of him. Elkhorn has advantage on the next attack roll he makes against that target before the end of his turn. If that attack hits, the target takes an extra 7 (2d6) damage of the weapon's type." },
                            { name: "Second Wind (Recharges after a Short or Long Rest)", description: "Elkhorn regains 12 hit points." }
                        ]
                    }
                },
                {
                    name: "Mercion",
                    title: "Cleric of Light",
                    role: "Healer & Protector",
                    cr: 3,
                    alignment: "Lawful Good",
                    personality: "No one dies on my watch—unless they stand against what I hold dear.",
                    ideal: "Truth begets art and beauty, while deceit does nothing but tear the fabric of our souls.",
                    bond: "Evildoers beware! Valor's Call is coming for you.",
                    flaw: "My friends would say I'm inflexible. The truth is, I like things done a certain way.",
                    description: "Mercion strikes the balance of a natural leader and a protective caregiver. She has a direct manner that reassures and inspires those around her. Mercion does not worship a deity, but rather an ideal: that truth gives life to artistry and beauty, and that those who embrace deceit should be censured and punished. Light is her domain.",
                    combatNotes: "Mercion counts on her armor to protect her as she administers healing. She uses Radiant Fire against groups of foes when there's no chance of harming allies or innocent lives, otherwise resorting to hold person spells and Divine Radiance attacks.",
                    statBlock: {
                        size: "Medium",
                        type: "Humanoid (Cleric, Human)",
                        alignment: "Lawful Good",
                        ac: "19 (plate armor)",
                        hp: "31 (9d8 – 9)",
                        speed: "30 ft.",
                        stats: {
                            str: "15 (+2)",
                            dex: "10 (+0)",
                            con: "9 (–1)",
                            int: "12 (+1)",
                            wis: "17 (+3)",
                            cha: "17 (+3)"
                        },
                        saves: "Wis +5, Cha +5",
                        skills: "Insight +5, Medicine +5",
                        senses: "passive Perception 13",
                        languages: "Common, Dwarvish",
                        cr: "3 (700 XP)",
                        proficiency: "+2",
                        equipment: "Mercion wields a +1 quarterstaff.",
                        actions: [
                            { name: "Multiattack", description: "Mercion makes one Divine Radiance attack and one +1 Quarterstaff attack. She can replace one of these attacks with a use of Spellcasting." },
                            { name: "Divine Radiance", description: "Melee or Ranged Spell Attack: +5 to hit, reach 5 ft. or range 60 ft., one target. Hit: 13 (3d8) radiant damage." },
                            { name: "+1 Quarterstaff", description: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage, or 7 (1d8 + 3) bludgeoning damage when used with two hands." },
                            { name: "Radiant Fire (Recharge 5–6)", description: "Mercion creates a magical explosion of fiery radiance centered on a point she can see within 120 feet of her. Each creature in a 20-foot-radius sphere centered on that point must make a DC 13 Dexterity saving throw, taking 28 (8d6) radiant damage on a failed save, or half as much damage on a successful one." },
                            { name: "Spellcasting", description: "Mercion casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):<br><strong>At will:</strong> light, spare the dying<br><strong>2/day each:</strong> command, create food and water, cure wounds, faerie fire, hold person, revivify<br><strong>1/day:</strong> death ward" }
                        ]
                    }
                },
                {
                    name: "Molliver",
                    title: "Noble Thief",
                    role: "Robin Hood Figure",
                    cr: 3,
                    alignment: "Chaotic Good",
                    personality: "I'm a bit rash, to put it mildly.",
                    ideal: "I have no tolerance for bullies and tyrants.",
                    bond: "The brigganocks of Yon are my trusted friends. They need someone to protect them, and I happily volunteer.",
                    flaw: "My impatience sometimes demands that I strike out on my own while my comrades-in-arms waste time deliberating.",
                    description: "Molliver is a thief who gives most of what they steal to the destitute, keeping a few choice items for their own use. They're always ready to put themself in harm's way to see justice triumph over tyranny and inequality. Molliver invites trouble by not thinking through the ramifications of their actions, counting on their friends to bail them out whenever they get in over their head. They always have a friendly jibe or acerbic remark on the tip of their tongue, and their cavalier attitude doesn't always sit well with their more cautious companions.",
                    combatNotes: "Molliver likes to get up close and personal in fights. If they're caught in a tight spot, they try to use their boots of levitation to escape.",
                    statBlock: {
                        size: "Medium",
                        type: "Humanoid (Human)",
                        alignment: "Chaotic Good",
                        ac: "15 (+1 leather armor)",
                        hp: "60 (8d8 + 24)",
                        speed: "30 ft.",
                        stats: {
                            str: "9 (–1)",
                            dex: "17 (+3)",
                            con: "16 (+3)",
                            int: "10 (+0)",
                            wis: "9 (–1)",
                            cha: "16 (+3)"
                        },
                        saves: "Dex +5, Int +2",
                        skills: "Acrobatics +7, Sleight of Hand +7, Stealth +7",
                        senses: "passive Perception 9",
                        languages: "Common",
                        cr: "3 (700 XP)",
                        proficiency: "+2",
                        equipment: "Molliver wears +1 leather armor and boots of levitation.",
                        traits: [
                            { name: "Evasion", description: "When subjected to an effect that allows a Dexterity saving throw to take only half damage, Molliver takes no damage on a successful save or half damage on a failed one, provided Molliver is not incapacitated." }
                        ],
                        actions: [
                            { name: "Multiattack", description: "Molliver makes two Dagger or Shortsword attacks, or one of each." },
                            { name: "Dagger", description: "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 5 (1d4 + 3) piercing damage. The attack deals an extra 7 (2d6) piercing damage if Molliver has advantage on the attack roll or if the target is within 5 feet of one of Molliver's allies." },
                            { name: "Shortsword", description: "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 6 (1d6 + 3) piercing damage. The attack deals an extra 7 (2d6) piercing damage if Molliver has advantage on the attack roll or if the target is within 5 feet of one of Molliver's allies." },
                            { name: "Levitate", description: "While wearing boots of levitation, Molliver casts levitate (self only)." }
                        ],
                        reactions: [
                            { name: "Uncanny Dodge", description: "Molliver halves the damage they take from an attack made against them, provided they can see the attacker." }
                        ]
                    }
                },
                {
                    name: "Ringlerun",
                    title: "Wizard • Staff of Power Wielder",
                    role: "Arcane Scholar",
                    cr: 5,
                    alignment: "Lawful Good",
                    personality: "Don't talk to me. I'm reading.",
                    ideal: "Magic belongs only in the hands of those who use it for noble ends.",
                    bond: "My staff of power dramatically enhances my magical abilities. I shudder to think how its power could be abused in the wrong hands.",
                    flaw: "I get prickly when people who are clearly less intelligent want to tell me what to do.",
                    description: "Ringlerun became an adventurer to better satisfy his craving for arcane knowledge. One of his adventures took him into an underwater tomb, where he tricked a marid into surrendering a staff of power. This staff greatly increased Ringlerun's capabilities and made him the envy of many rival spellcasters. Ringlerun has a good heart, but he's easily distracted by intellectual pursuits. He would rather spend time in quiet contemplation or reading than in frivolous conversation.",
                    combatNotes: "Ringlerun can fend off melee attackers with wild swings of his staff, but he prefers to fly out of reach and attack at range using his staff's formidable spells (cone of cold being his favorite).",
                    statBlock: {
                        size: "Medium",
                        type: "Humanoid (Human, Wizard)",
                        alignment: "Lawful Good",
                        ac: "12 (staff of power)",
                        hp: "42 (12d8 – 12)",
                        speed: "30 ft.",
                        stats: {
                            str: "9 (–1)",
                            dex: "10 (+0)",
                            con: "9 (–1)",
                            int: "17 (+3)",
                            wis: "13 (+1)",
                            cha: "11 (+0)"
                        },
                        saves: "Str +2, Dex +3, Con +2, Int +6, Wis +4, Cha +3",
                        skills: "Arcana +6, History +6",
                        senses: "passive Perception 11",
                        languages: "Common, Draconic, Dwarvish, Elvish",
                        cr: "5 (1,800 XP)",
                        proficiency: "+3",
                        equipment: "Ringlerun wields a staff of power. It has 20 charges when fully charged and regains 2d8 + 4 expended charges daily at dawn. If its last charge is expended, roll a d20. On a 1, the staff retains its +2 bonus to attack and damage rolls but loses its other properties; on a 20, it regains 1d8 + 2 charges.",
                        actions: [
                            { name: "Multiattack", description: "Ringlerun makes three Staff of Power or Freezing Ray attacks. He can replace one of those attacks with a use of Spellcasting." },
                            { name: "Staff of Power", description: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage, or 5 (1d8 + 1) bludgeoning damage when used with two hands, and Ringlerun can expend 1 of the staff's charges to deal an extra 3 (1d6) force damage." },
                            { name: "Freezing Ray", description: "Ranged Spell Attack: +8 to hit, range 120 ft., one creature. Hit: 27 (6d8) cold damage." },
                            { name: "Spellcasting", description: "Ringlerun casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):<br><strong>At will:</strong> light, mage hand, prestidigitation<br><strong>3/day each:</strong> charm person, detect magic, sleep<br><strong>1/day each:</strong> banishment, dispel magic, fly, knock" },
                            { name: "Staff Spell", description: "While holding his staff of power, Ringlerun can expend 1 or more of its charges to cast one of the following spells from it (spell save DC 14, +8 to hit with spell attacks): cone of cold (8d8 cold damage; 5 charges), fireball (10d6 fire damage; 5 charges), globe of invulnerability (6 charges), hold monster (5 charges), levitate (2 charges), lightning bolt (10d6 lightning damage; 5 charges), magic missile (1 charge), ray of enfeeblement (1 charge), or wall of force (5 charges)." }
                        ]
                    }
                }
            ]
        }
    ],
    
    creatures: [
        {
            name: "Boggle",
            type: "Fey",
            size: "Small",
            cr: "1/8 (25 XP)",
            description: "Boggles are the little bogeys of fairy tales. They hide under beds and in closets, waiting to frighten and bedevil folk with their mischief. A boggle excretes a special oil from its pores and can make the substance slippery or sticky. The oil dries up and disappears an hour after the boggle expels it. A boggle can create magical openings that enable it to travel short distances or to pilfer items that would otherwise be beyond its reach.",
            statBlock: {
                size: "Small",
                type: "Fey",
                alignment: "Typically Chaotic Neutral",
                ac: "14",
                hp: "18 (4d6 + 4)",
                speed: "30 ft., climb 30 ft.",
                stats: { str: "8 (−1)", dex: "18 (+4)", con: "13 (+1)", int: "6 (−2)", wis: "12 (+1)", cha: "7 (−2)" },
                skills: "Perception +5, Sleight of Hand +6, Stealth +6",
                damageResistances: "fire",
                senses: "darkvision 60 ft., passive Perception 15",
                languages: "Sylvan",
                cr: "1/8 (25 XP)",
                proficiency: "+2",
                actions: [
                    { name: "Pummel", description: "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 2 (1d6 − 1) bludgeoning damage." },
                    { name: "Oil Puddle", description: "The boggle creates a puddle of nonflammable oil. The puddle is 1 inch deep and covers the ground in the boggle's space. The puddle is difficult terrain for all creatures except boggles and lasts for 1 hour. The oil has one of the following additional effects of the boggle's choice:<br><strong>Slippery Oil:</strong> Any non-boggle creature that enters the puddle or starts its turn there must succeed on a DC 11 Dexterity saving throw or fall prone.<br><strong>Sticky Oil:</strong> Any non-boggle creature that enters the puddle or starts its turn there must succeed on a DC 11 Strength saving throw or be restrained." }
                ],
                bonusActions: [
                    { name: "Boggle Oil", description: "The boggle excretes nonflammable oil from its pores, giving itself one of the following benefits until it uses this bonus action again:<br><strong>Slippery Oil:</strong> The boggle has advantage on Dexterity (Acrobatics) checks made to escape bonds and end grapples.<br><strong>Sticky Oil:</strong> The boggle has advantage on Strength (Athletics) checks made to grapple." },
                    { name: "Dimensional Rift", description: "The boggle creates an invisible and immobile rift within an opening or frame it can see within 5 feet of it, provided that the space is no bigger than 10 feet on any side. The dimensional rift bridges the distance between that space and a point within 30 feet of it that the boggle can see or specify by distance and direction. While next to the rift, the boggle can see through it and is considered to be next to the destination as well. The rift lasts until the end of the boggle's next turn." }
                ]
            }
        },
        {
            name: "Harengon Brigand",
            type: "Humanoid",
            size: "Medium",
            cr: "1/8 (25 XP)",
            description: "Harengons are rabbit-folk native to the Feywild. Harengon brigands are usually encountered in small bands lurking along trails and roadways, where they can easily spot and ambush their victims. They delight in extorting travelers for safe passage while rudely mocking them.",
            statBlock: {
                size: "Medium",
                type: "Humanoid",
                alignment: "Any Alignment",
                ac: "14 (leather armor)",
                hp: "9 (2d8)",
                speed: "30 ft.",
                stats: { str: "14 (+2)", dex: "17 (+3)", con: "11 (+0)", int: "10 (+0)", wis: "11 (+0)", cha: "10 (+0)" },
                saves: "Dex +5",
                skills: "Acrobatics +5, Perception +4",
                senses: "passive Perception 14",
                languages: "Common, Sylvan",
                cr: "1/8 (25 XP)",
                proficiency: "+2",
                traits: [
                    { name: "Pack Tactics", description: "The harengon has advantage on an attack roll against a creature if at least one of the harengon's allies is within 5 feet of the creature and the ally isn't incapacitated." },
                    { name: "Standing Leap", description: "The harengon's long jump is up to 20 feet and its high jump is up to 10 feet, with or without a running start." }
                ],
                actions: [
                    { name: "Club", description: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) bludgeoning damage." },
                    { name: "Sling", description: "Ranged Weapon Attack: +5 to hit, range 30/120 ft., one target. Hit: 5 (1d4 + 3) bludgeoning damage." }
                ]
            }
        },
        {
            name: "Quickling",
            type: "Fey",
            size: "Tiny",
            cr: "1 (200 XP)",
            description: "Racing faster than the eye can track, a quickling appears as little more than a blurry streak of color. Quicklings owe their existence to the Queen of Air and Darkness. Once lazy, egotistical folk, they were cursed with amazing speed but also accelerated passage through life. No quickling lives longer than 15 years.",
            statBlock: {
                size: "Tiny",
                type: "Fey",
                alignment: "Typically Chaotic Evil",
                ac: "16",
                hp: "10 (3d4 + 3)",
                speed: "120 ft.",
                stats: { str: "4 (−3)", dex: "23 (+6)", con: "13 (+1)", int: "10 (+0)", wis: "12 (+1)", cha: "7 (−2)" },
                skills: "Acrobatics +8, Sleight of Hand +8, Stealth +8, Perception +5",
                senses: "darkvision 60 ft., passive Perception 15",
                languages: "Common, Sylvan",
                cr: "1 (200 XP)",
                proficiency: "+2",
                traits: [
                    { name: "Blurred Movement", description: "Attack rolls against the quickling have disadvantage unless it is incapacitated or its speed is 0." },
                    { name: "Evasion", description: "If the quickling is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw and only half damage if it fails, provided it isn't incapacitated." }
                ],
                actions: [
                    { name: "Multiattack", description: "The quickling makes three Dagger attacks." },
                    { name: "Dagger", description: "Melee or Ranged Weapon Attack: +8 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 8 (1d4 + 6) piercing damage." }
                ]
            }
        },
        {
            name: "Redcap",
            type: "Fey",
            size: "Small",
            cr: "3 (700 XP)",
            description: "A redcap is a homicidal creature born of blood lust. Redcaps, although small, have formidable strength. In the Feywild, if a sentient creature satisfies its intense desire for bloodshed, one or more redcaps might appear where the blood of a slain foe soaks the ground. To sustain its unnatural existence, a redcap must soak its hat in the fresh blood of its victims.",
            statBlock: {
                size: "Small",
                type: "Fey",
                alignment: "Typically Chaotic Evil",
                ac: "14 (natural armor)",
                hp: "45 (6d6 + 24)",
                speed: "25 ft.",
                stats: { str: "18 (+4)", dex: "13 (+1)", con: "18 (+4)", int: "10 (+0)", wis: "12 (+1)", cha: "9 (−1)" },
                skills: "Athletics +6, Perception +3",
                senses: "darkvision 60 ft., passive Perception 13",
                languages: "Common, Sylvan",
                cr: "3 (700 XP)",
                proficiency: "+2",
                traits: [
                    { name: "Iron Boots", description: "The redcap has disadvantage on Dexterity (Stealth) checks." },
                    { name: "Outsize Strength", description: "While grappling, the redcap is considered to be Medium. Also, wielding a heavy weapon doesn't impose disadvantage on its attack rolls." }
                ],
                actions: [
                    { name: "Multiattack", description: "The redcap makes three Wicked Sickle attacks." },
                    { name: "Wicked Sickle", description: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) slashing damage." },
                    { name: "Ironbound Pursuit", description: "The redcap moves up to its speed to a creature it can see and kicks with its iron boots. The target must succeed on a DC 14 Dexterity saving throw or take 20 (3d10 + 4) bludgeoning damage and be knocked prone." }
                ]
            }
        }
    ]
};

// Explicitly expose to window for compatibility
if (typeof window !== 'undefined') {
    window.WITCHLIGHT_FACTIONS = WITCHLIGHT_FACTIONS;
}
