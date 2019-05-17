[![Build Status](https://travis-ci.org/Wisdomb33r/ffbe-calculator.svg?branch=master)](https://travis-ci.org/Wisdomb33r/ffbe-calculator)

# FFBE calculator

Final Fantasy Brave Exvius unit calculator is a web tool to help you build and optimize your characters. Select a unit and get an immediate estimation of the character according to pre-defined builds.

For more personal calculation, you can select your unit equipment, esper, and group buffs or debuffs. Finally, enter your opponent DEF/SPR and its monster type to optimize your group for a specific battle.

**[Launch the calculator app](https://www.final-fantasy.ch/ffbe/calculator/)**

## Table of content

* [About the builds](#about-the-builds)
* [About the formulae](#about-the-formulae)
  * [Chainers](#chainers)
  * [Finishers](#finishers)
  * [Tanks](#tanks)
* [In-depth documentation](#in-depth-tool-documentation)
  * [Getting started](#getting-started)
  * [Unit details](#unit-details)
  * [Unit equipment](#unit-equipment)
  * [Skill rotation](#skill-rotation)
  * [Damage calculation result](#damage-calculation-result)
  * [Permanent URL](#permanent-url)
  * [Stat calculation (pop-up)](#stat-calculation-pop-up)
  * [Esper selection (pop-up)](#esper-selection-pop-up)
  * [Equipment selection (pop-up)](#equipment-selection-pop-up)
  * [Damage calculation and configuration (pop-up)](#damage-calculation-and-configuration-pop-up)

## About the builds

In the current version, unit builds (skill rotations) are pre-defined and cannot be changed. Lot of characters have an obvious optimal skill set (Orlandeau does not have much choices). For other units, several builds can be selected.

While pre-defined builds is a strong limitation, this is also a very convenient way to simplify the calculations. Adapting skill rotation might (or might not) be supported by the calculator in the future. Due to skills with long-lasting effects (typically imbue, resists breaks or self-buffs), this functionality is VERY difficult to implement properly.

## About the formulae

The calculations are based on the in-game formulae (for more information, see [this link](https://exvius.gamepedia.com/Mechanics)). As the character is evaluated alone, a few hypotheses and simplifications have been introduced :

#### Chainers

* Chainers are considered with a duplicate (same unit, same equipment for elemental weapons).
* The combo calculation for a chainer and its duplicate is slightly simplified. Namely, it does not consider multiple skills hits overlap.
* Chains are configured in builds as perfect (most of them) or breaking (Lila ATK build is an example)
* The calculator does not prevent cases that are not possible in game (dual QH frames skills cannot perfect chain without spark).

#### Finishers

* Finishers are considered with a couple of chainers in the group to start a combo (damage multiplier x4).
* Finisher moves with long delay between first and last hit (~over 200 frames) have a reduced combo (damage multiplier x2.5 to simulate a half-in / half-out scenario).
* Finisher moves that cannot enter a chain (non-timed jumps) or should not enter a chain (multi-hits with close delay have a high risk of breaking your chain) have no combo (damage multiplier x1).

#### Tanks

* Effective HP are calculated once for physical damages and once for magical damages.
* Calculations currently do not consider mixed attack type / damage of some trials (Malboro Tentacles Rampage for instance).
* There is currently no support for dodge as the equipment for such builds is generally trivial (100% dodge first, whatever for the other slots).
* Not considering elemental resists.

#### Supports / healers

* Supporting and healing calculation is currently not implemented. The equipment for these is very character dependent (MP and LB crystals do count). There is no obvious formulae for these units. Feel free to share your thoughts if you have an idea !

## In-depth tool documentation

#### Getting started

The calculator comes with two toolbars, one at the top and one at the bottom of the page.

The bottom toolbar contains social networks interaction as well as a PayPal link if you feel the tool deserves a donation.

To really dive into the calculation, simply hit the _Units_ button to choose your favourite unit by clicking its in-game icon. The units are categorized as _physical chainers_, _magical chainers_, _hybrid chainers_, _physical finishers_, _magical finishers_, _hybrid finishers_ or _tanks_. They can be located in several categories. Within a category, the units are more-or-less sorted according to their release order.

![Unit selection](https://www.final-fantasy.ch/upload/calculator_unit_selection.png)

When you select a unit, you immediately get a result according to a pre-defined build. There is a lot of information, split into several sections. Additional information, mostly related to calculation details, can be found in pop-up windows.

#### Unit details

First section of a build display, this is where you find the major unit-specific information, as well as the equipped esper :

1. Unit basic information including name of the character, rank and in-game compendium number.
1. Build selection if there is more than one (not all possible skill rotations are configured, but you should find the most powerful ones).
1. Unit icon.
1. Unit total stats, including equipment and buffs. Next to each stat, a question mark icon can be clicked to open a pop-up display of the stat calculation detail (see the corresponding section of this guide for more information).
1. Unit conditional traits (like stat bonus for equipping a category of weapon), if there is some for this character.
1. Current esper. Clicking the icon do open the pop-up display to switch for another esper (see the corresponding section of this guide for more information).

![Unit details](https://www.final-fantasy.ch/upload/calculator_unit_details.png)

#### Unit equipment

The equipment section is self-explanatory as it is almost identical to the in-game display. Clicking any item icon do load from server the list of items the unit can equip. The result is then filtered according to several rules (for instance the ability to wield a second weapon). If there is at least one item that can be equipped, opens a pop-up display to switch the item (see the corresponding section of this guide for more information).

![Unit equipment](https://www.final-fantasy.ch/upload/calculator_equipment.png)

Unlike the game, the tool does not let you place a two-handed weapon in the left hand slot. The right hand slot (located on the left) is always considered as the _main weapon_ hand. The left hand can only hold a second one-handed weapon (if dual wielding is authorized), or shields.

#### Skill rotation

The skills used by the tool for the calculation are displayed within this section. A skill can be either categorized as part of the _start phase_, which represent the very first skills you might want to use at the beginning of a battle, and a _stable rotation_, which is possible when all the skills and/or the LB is available. The stable rotation should be the list of skills you might want to use for optimal damages if an opponent lives long enough.

Note : the calculator does not consider specific battles, so unit death is not considered at all. In real game however, this is important for many characters as some of the unlocked skills can be altered or impossible to cast after a death/raise. 2B is an example of such unit and does struggle when dying frequently.

Clicking any of the skills does open a simple pop-up display with additional information, including name of the skill, power, type of attack and damage, hits, frames and damage distribution, and the number of attacks (the latter for multi-cast units).

![Skill rotation](https://www.final-fantasy.ch/upload/calculator_skill_rotation.png)

#### Damage calculations results

This is the major section of the tool and contains the results of the build calculation. It displays per-turn damages for two different calculations :

1. If the unit has a start phase, displays the per-turn calculation (battle turns 1, 2, 3, ...). If damages are hybrid, 1a is the physical damage result part while 1b is the magical damage result part.
1. Displays the per-turn calculation for the stable rotation (turns of n-th rotation +1, +2, +3, ...). If damages are hybrid, 2a is the physical damage result part while 2b is the magical damage result part.
1. Average turn damages calculated for the 10 first turns of the battle.
1. Average turn damages calculated for the stable rotation (optimal damages of the character for long-term battles).

![Damage results](https://www.final-fantasy.ch/upload/calculator_damage_results.png)

Next to each per-turn damage result, clicking the question mark icon does open the damage calculation math details. This pop-up display is also the one that contains all the calculation configuration parameters (see the corresponding section of this guide for more information). 

#### Permanent URL

The permanent URL contains all the parameters needed to reproduce your calculation. The _Copy_ button is placing the URL value to your device clipboard. You can paste this URL anywhere on the internet to make a link to your calculation.

#### Stat calculation (pop-up)

This pop-up, opened by clicking the question mark icon next to a stat value, is displaying the maths details behind it :

1. Unit base value (pots included)
1. Unit % value increase (applied on unit base value, skills considered enhanced)
1. Unit DH/TDH/TDW value increase (applied on equipment base value)
1. Unit increase to value from esper (applied on esper base value)
1. Equipment base value
1. Equipment % value increase (applied on unit base value)
1. Equipment DH/TDH/TDW value increase (applied on equipment base value)
1. Equipment increase to value from esper (applied on esper base value)
1. Esper base value
1. Esper % value increase (applied on unit base value)
1. Esper increase to value from esper (applied on esper base value)
1. Total

The _total_ value is what you should read in the game _Units_ menu (+- 1 or 2 points due to roundings). This result is before battle buffs.

![Stats calculation](https://www.final-fantasy.ch/upload/calculator_unit_stats_calculation.png)

#### Esper selection (pop-up)

This pop-up, opened by clicking the currently equipped esper icon, let you choose between a few pre-defined esper builds. Each build is identified by a short list of the most important build features (especially boost to stat value from esper and killers). A link to ffbeequip.com is available to see exactly which board skills are considered active.

![Esper selection](https://www.final-fantasy.ch/upload/calculator_esper_selection.png)

#### Equipment selection (pop-up)

This pop-up, opened by clicking an equipment slot, let you remove, change or add an item to your character :

1. Filter items list by name
1. Exclude STMR's from items list
1. Remove item from the build
1. Available items list for this slot

![Equipment selection](https://www.final-fantasy.ch/upload/calculator_equipment_selection.png)

To avoid long loading time, not all the items available in the game are configured in the tool. A large part is excluded due to being completely outdated in the current meta.

The sort algorithm cannot be 100% trusted. It calculates an rough estimation of the stat increase for each item and sort them accordingly. However, it does NOT consider limit caps, so DH/TDH/TDW items are usually ranked first even if the character has already reached the 100%/300% limit cap. Moreover, the sort algorithm does NOT consider any other parameter besides unit stat. Killers and LB damage increase can have a big impact and are currently ignored for item sorting.

#### Damage calculation and configuration (pop-up)

This pop-up, opened by clicking the question mark icon next to a turn damage calculation result, is the most complex one. It is always cut in three different parts

###### Hits and combo calculation

This first part displays the math values related to combo and hits calculation.

1. Combo multiplier of the chain (finishers only, x4 if the skill is short enough and have no risk of breaking the chain, a lower value otherwise)
1. Spark chain activation checkbox (chainers only)
1. Combo increment to apply to each consecutive hit (chainers only, calculated with a 0.1 base, +0.3 for each element and +0.5 every other hit for spark)
1. Skill(s) hits power
1. Total power of the turn

![Skill hits calculation](https://www.final-fantasy.ch/upload/calculator_skill_hits_calculation.png)

###### Group and battle configuration

The second part of the damage calculation is where you find most of the configuration options to simulate as close as possible a real case scenario :

1. Unit offensive stat(s) (including equipment and esper)
1. Stat buff from group configuration (default to +150%, can be switched off using the checkbox on the left)
1. Stat self-buff (if available for this unit)
1. Stat total value after buffs (the buff is the max value of the group buff and self-buff)
1. Monster type(s) configuration (killer calculation can be switched off using the checkbox on the left)
1. Passive killer value (unit traits and equipment value)
1. Active killer value (from used skills in the rotation)
1. Enemy resistance to each elements of the attack configuration (default to 0)
1. Group resistance break to each elements of the attack configuration (default to -50, can be switched off using checkbox on the left)
1. Enemy final resistance to each elements of the attack (including skills breaks)
1. Enemy DEF or SPR (default to 1 million)
1. Weapon variance (two-handed only)

![Group and battle configuration](https://www.final-fantasy.ch/upload/calculator_damage_calculation_parameters.png)

###### Damage calculation maths

The last part of the damage calculation pop-up holds the maths details. It has several partial calculation meant to clarify the steps :

1. Calculation of the base damages, which includes the unit stat value (after buff), power of the turn (after combo) and level of the unit. The ATK of the weapons are also included for dual wielding units calculation.
1. Calculation including the killer value
1. Calculation including the average elemental resistance of the enemy
1. Final turn calculation including variances (two-handed weapon variance optionally)

![Damage calculations](https://www.final-fantasy.ch/upload/calculator_damage_calculations.png)
