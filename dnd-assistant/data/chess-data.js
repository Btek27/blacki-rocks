// Chess Encounter Data
const CHESS_DATA = {
    physicalDescription: `The corridor opens into a spherical chamber that defies comprehension. You float weightless as you enter—there is no clear floor or ceiling. Every surface of the sphere is equidistant from the center, creating a dizzying sense of spatial distortion. (Seriously, who designed this place? A drunk architect with a vendetta against gravity?)

Carved into one "wall" is an enormous chessboard, 60 feet across, its black and white squares inlaid with obsidian and marble. The pieces float above their squares, glowing with sickly pink psychic energy, writhing slightly as if alive. Each piece seems to be judging you—especially the pawns, which somehow look more disappointed than the rest. (Pro tip: Don't make eye contact with the queen. She's seen things.)

At the center hovers the source of your nightmares: a beholder of truly massive size—15 feet in diameter. Where other beholders have stalks, this abomination has smooth, bloated flesh marred by dozens of recessed eyes protected by fleshy hoods. Her skin glistens with mucous, and her cavernous maw drips acidic saliva. (It's like someone took a regular beholder and said "You know what this needs? More eyes. And more... moist.")

The creature's central eye focuses on you—not just seeing you, but seeing THROUGH you, into every thought, every fear, every secret. (She probably knows you forgot to pack rations. And that you're thinking about lunch right now. Stop it.)

But wait—there's something else. Etched into the obsidian squares, barely visible unless you're looking for it, are faint golden symbols that seem to shift and move. A spectral presence seems to linger near the board—not hostile, but... amused? If you squint, you might catch a glimpse of a regal figure in chessboard-patterned robes, watching with golden eyes that sparkle with ancient mirth. This is Caïssa, the Chess God, and she's been waiting a very, very long time for someone to actually solve this puzzle. (She's probably placed bets with other gods. The stakes are high, and she's losing patience with Omnivax's dramatic monologues.)`,

    puzzleDescription: `A voice slithers into all your minds simultaneously:

"MORE... SINGULAR... MINDS. How QUAINT. You have come to FEED me, yes? Or perhaps... you think yourselves CLEVER?"

She gestures with a thought, and the chess pieces rotate to face you.

"Inferior singular minds. I am LEGION. I am INFINITE. I am ALL. Prove your worth in three moves, or become FEED for my children. The dance is PAWN'S GAMBIT. The rule is FORGOTTEN. The end is ABSOLUTE."

"You have ONE MINUTE per move. IMPRESS me... or NOURISH me."

**The Challenge:**
- Checkmate in 3 moves (White to move)
- Clue: "The PAWN's Gambit. The rule FORGOTTEN. The end ABSOLUTE."
- Solution: En Passant Checkmate
- Time limit: 1 minute per move
- Wrong moves trigger consequences (see Chess Puzzle tab)`,

    taunts: [
        {
            label: "Opening",
            text: "MORE... SINGULAR... MINDS. How QUAINT. You have come to FEED me, yes?"
        },
        {
            label: "Puzzle Hint 1",
            text: "The PAWN, mortal. Even you should see the PAWN's purpose."
        },
        {
            label: "Puzzle Hint 2",
            text: "The move that CROSSES. The rule FORGOTTEN by inferior minds."
        },
        {
            label: "Wrong Piece",
            text: "No, no, NO. Think SIMPLER. The weakest piece... can be the strongest."
        },
        {
            label: "After Wrong 1",
            text: "Yessss... FEED me your FAILURE. Your inadequacy NOURISHES. Behold my CHILDREN."
        },
        {
            label: "After Wrong 2",
            text: "AGAIN you FAIL! Your minds are WEAK! Your patterns PREDICTABLE!"
        },
        {
            label: "After Wrong 3",
            text: "PATHETIC! You are NOT WORTHY! Witness my UNLIMITED POWER!"
        },
        {
            label: "Alt Checkmate",
            text: "IMPOSSIBLE. I... I DID NOT... HOW DID YOU... NO SINGULAR MIND SHOULD..."
        },
        {
            label: "Combat",
            text: "I see ALL your moves. From INFINITE angles. You cannot surprise the INFINITE."
        },
        {
            label: "Bloodied",
            text: "You DARE wound ME?! I will DEVOUR you SLOWLY!"
        },
        {
            label: "Near Death",
            text: "Impossible... a singular... mind... cannot... surpass... infinity..."
        }
    ],

    reference: `CR 17 | AC 20 (19 if alt checkmate) | HP 400 | Fly 40 ft

ACTIONS:
• Bite: +12, 4d8+6 piercing + grapple (DC 18 Str)
• Eye Rays: 3/turn (4/5/10 if fed), DC 19 saves
• Swallow Whole: 4d8 acid/turn, AC 20 interior, 30 HP to cut out
• Telekinetic Chess Strike (Bonus): +12, 3d10 bludgeoning, 120 ft

EYE RAYS (Choose 3 per turn):
1. Charm - DC 19 Wis, charmed 1 hour
2. Paralyze - DC 19 Con, paralyzed 1 min
3. Fear - DC 19 Wis, frightened 1 min
4. Disintegrate - DC 19 Dex, 10d6+40 force
5. Telekinetic - DC 19 Str, move 60 ft
6. Death - DC 19 Dex, 10d10 necrotic
7. Petrify - DC 19 Dex, restrained then petrified
8. Enfeeble - DC 19 Con, 8d8 necrotic + Str disadvantage
9. Sleep - DC 19 Wis, unconscious 10 min
10. Slow - DC 19 Dex, slowed 1 min

LEGENDARY ACTIONS (3/round):
• Eye Ray (1): Use one ray at 120 ft range
• Move (1): Fly 20 ft, no opportunity attacks
• Telekinetic Throw (2): Hurl chess piece
• Birth Gazer (3): Summon 1 Gazer
• Gravitic Pulse (3): Change gravity (if unlocked)

LAIR ACTIONS (Initiative 20):
• Psychic Scream: 60 ft, DC 19 Wis, 3d8 psychic + stunned
• Reality Distortion: Teleport 60 ft + move chess piece
• Eye Beam Surge: +1 eye ray this round
• [After 2nd Wrong] Gravity Shift/Crushing/Zero Gravity

SPECIAL:
• Antimagic Cone: 240-ft cone (toggle on/off)
• Psychic Feedback: Attackers take 2d8 psychic (scales 3d8, 4d8)
• Hive Mind: Knows spawn locations, sees through their eyes
• Legendary Resistance: 3/day (2/day if alt checkmate)`,

    wrongMoveConsequences: {
        1: {
            title: "WRONG MOVE 1 CONSEQUENCES",
            narrative: `Omnivax's body shudders with pleasure. Several eyes close in ecstasy.

"Yessss... FEED me your FAILURE. Your inadequacy NOURISHES."

Her bloated form convulses. With wet, sickening pops, small spherical forms burst from her hide—tiny beholders, each no larger than a melon.

"Behold my CHILDREN. They hunger for your THOUGHTS."`,
            effects: [
                "Birth 2d4 Gazers (add manually in DM Mode)",
                "Omnivax gains 4 Eye Rays per turn (instead of 3)",
                "Psychic Feedback: 2d8 psychic damage to attackers"
            ]
        },
        2: {
            title: "WRONG MOVE 2 CONSEQUENCES",
            narrative: `"AGAIN you FAIL! Your minds are WEAK! Your patterns PREDICTABLE!"

The air tears. Reality screams as dimensional rifts open—shimmering wounds in space. From these emerge larger beholders, four-eyed and calculating.

"More CHILDREN for the HIVE. And NOW... I show you TRUE POWER."

The gravity in the chamber lurches sickeningly. Your stomach drops as "down" becomes uncertain.`,
            effects: [
                "Birth 1d4 Spectators (add manually in DM Mode)",
                "Omnivax gains 5 Eye Rays per turn",
                "Hive Mind Tactics: Spawn get advantage if another spawn within 5 ft",
                "Gravitic Mastery UNLOCKED: Gravity-based Lair Actions available",
                "Psychic Feedback increases to 3d8"
            ]
        },
        3: {
            title: "WRONG MOVE 3 CONSEQUENCES",
            narrative: `"PATHETIC! You are NOT WORTHY! You are mere SUSTENANCE!"

The chamber SHAKES. The dimensional fabric SHATTERS. Two massive rifts tear open, and through them float two full-sized beholders—true Eye Tyrants with ten stalks each, antimagic cones blazing.

"My HONOR GUARD. They have DEVOURED WORLDS. You... are NOTHING."

Omnivax's body pulses with dark energy. Her eyes glow brighter, crackling with power. Her form seems to grow, swelling with stolen psychic energy.

"Now... I am UNLIMITED. Witness INFINITE PERSPECTIVE!"`,
            effects: [
                "Birth 2 True Beholders (CR 13 each) - Add manually!",
                "OMNIVAX ENTERS OVERCHARGED STATE:",
                "  - Can use ALL 10 Eye Rays in one turn (once per combat)",
                "  - Antimagic Cone can split into TWO 120-ft cones",
                "  - Swallow Whole recharges on 5-6",
                "  - AC increases to 22",
                "  - Psychic Feedback: 4d8",
                "This is now DEADLY difficulty!"
            ]
        }
    },

    alternativeCheckmate: {
        narrative: `As the final piece slides into place, there's absolute stillness. Every eye on Omnivax's massive form goes wide. Her mouth opens but no sound emerges.

Then, all at once, she SCREAMS. Not in rage, but in confusion, in SHOCK, in something she hasn't felt in millennia: SURPRISE.

"IMPOSSIBLE. I... I DID NOT... HOW DID YOU... NO SINGULAR MIND SHOULD..."

The chess pieces clatter from her telekinetic grip. Reality ripples outward from her form in visible waves.

A new voice—clear, regal, feminine, and deeply amused:

A spectral form coalesces near the chessboard—a woman in flowing robes patterned like a chessboard, golden eyes gleaming with mirth. She holds a glowing knight chess piece like a scepter.

"Well, well, WELL. It seems my infinite-perspective friend has been outplayed. Again."

She looks at the party with a knowing smile.

"I am Caïssa, Grandmaster of All Gambits, and I have been waiting a VERY long time for someone to beat this particular puzzle. How DELIGHTFUL to see her humbled."

Golden light erupts from the squares, flowing into each party member like warm honey.

"Accept my blessing, champions. You've earned it. And as for YOU..."

She turns to Omnivax. "...I believe the phrase is 'checkmate, darling.' Shall we see if you fight as well as you boast?"`,
        omnivaxDebuffs: [
            "Loses 1 Legendary Resistance (now 2/day)",
            "Takes 30 psychic damage immediately",
            "AC reduced by 1 (to 19)",
            "Eye Ray save DC reduced by 1 (to 18)",
            "Cannot birth minions for 2 rounds",
            "One random eye permanently blinded (roll d10)"
        ],
        partyBuffs: [
            "Strategic Mind: +2 Initiative, Adv on Int checks, telepathy 120 ft",
            "Positional Superiority: Bonus action 10 ft move, +2 AC near ally",
            "En Passant Strike: Once, OA through space = 4d8 force + push 10 ft",
            "Grandmaster's Resilience: 48 temp HP (lvl 16), resist psychic, adv vs charm/fear",
            "Tactical Insight: Reaction, grant ally adv save or impose disadv attack",
            "Checkmate Coordination: 2+ attackers, last gets adv + 3d10 force",
            "Promotion: Below 25% HP, declare = Haste 3 rounds + spell slot + 40 temp HP"
        ]
    }
};

