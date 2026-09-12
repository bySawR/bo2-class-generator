# BO2 multiplayer rules

The generator uses a catalog allowlist per weapon, with a shared attachment pool per weapon category and explicit exceptions. It covers the 39 multiplayer Create-a-Class weapons including Peacekeeper, not campaign, Zombies, scorestreak weapons or the implicit Combat Knife.

Checked rules:
- Primary weapon: up to 2 attachments, or 3 with Primary Gunfighter.
- Secondary weapon: up to 1 attachment, or 2 with Secondary Gunfighter.
- A primary in the secondary slot costs Overkill; duplicate weapons are not allowed.
- Every weapon, attachment, perk and equipment item costs one point; camo costs zero.
- Each required wildcard costs one point; maximum three wildcards even with a 17-point limit.
- Second perk in a tier requires that tier's Greed wildcard. No duplicate perks.
- Two copies of the same lethal require Danger Close. Tactical quantity can be one or two.
- One lethal type and one tactical type are supported; Tactician (two DIFFERENT tactical types) is not generated.
- The 17-point option increases the budget only; weapon attachment limits remain unchanged.
- Only Ballista gets Iron Sights. Launchers, Ballistic Knife and Assault Shield get no attachments.
- Crossbow gets its specific optic/Tri-Bolt pool.
- Executioner has FMJ but no Extended Clip. LMGs have no Fast Mag.
- Dual Wield excludes every other attachment.
- Multiple optics, Fast Mag + Extended Clip, Suppressor + Long Barrel, MMS + FMJ, CPU + ACOG/Iron Sights, Select Fire + Grenade Launcher/Hybrid, Grenade Launcher + Hybrid/Fore Grip are rejected.
- The generator uses optional empty lethal/tactical slots; full budgets are not guaranteed or required.

Sources checked September 2026:
https://www.gamerguides.com/call-of-duty-black-ops-ii/guide/multiplayer-guide/multiplayer-weapons/weapon-attachments
https://callofduty.fandom.com/wiki/Select_Fire
https://callofduty.fandom.com/wiki/Peacekeeper
https://callofduty.fandom.com/wiki/KAP-40
https://callofduty.fandom.com/wiki/Executioner
https://callofduty.fandom.com/wiki/Primary_Gunfighter
https://github.com/fgjgjhcm/COD-BO2-Class-creator-web-app-/tree/main/src/data

These are documented multiplayer rules, tested in the generator, not an in-game validation against a running BO2 installation.

Asset sources: user's BO2 Assets/Main Menu folder; legacy camo images from bySawR/shopbysawr; grenade launcher image from fgjgjhcm/COD-BO2-Class-creator-web-app-. Font licenses are bundled in assets.
