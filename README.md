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

## About the builds

In the current version, unit builds (skill rotations) are pre-defined and cannot be changed. Lot of characters have an obvious optimal skill set (Orlandeau does not have much choices). For other units, several builds can be selected.

While pre-defined builds is a strong limitation, this is also a very convenient way to simplify the calculations. Adapting skill rotation might (or might not) be supported by the calculator in the future. Due to skills with long-lasting effects (typically imbue, resists breaks or self-buffs), this functionality is VERY difficult to implement properly.

## About the formulae

The calculations are based on the in-game formulae (for more information, see [this link](https://exvius.gamepedia.com/Mechanics)). As the character is evaluated alone, a few hypotheses and simplifications have been introduced :

###### Chainers

* Chainers are considered with a duplicate (same unit, same equipment for elemental weapons).
* The combo calculation for a chainer and its duplicate is slightly simplified. Namely, it does not consider multiple skills hits overlap.
* Chains are configured in builds as perfect (most of them) or breaking (Lila ATK build is an example)
* The calculator does not prevent cases that are not possible in game (dual QH frames skills cannot perfect chain without spark).

###### Finishers

* Finishers are considered with a couple of chainers in the group to start a combo (damage multiplier x4).
* Finisher moves with long delay between first and last hit (~over 200 frames) have a reduced combo (damage multiplier x2.5 to simulate a half-in / half-out scenario).
* Finisher moves that cannot enter a chain (non-timed jumps) or should not enter a chain (multi-hits with close delay have a high risk of breaking your chain) have no combo (damage multiplier x1).

###### Tanks

* Effective HP are calculated once for physical damages and once for magical damages.
* Calculations currently do not consider mixed attack type / damage of some trials (Malboro Tentacles Rampage for instance).
* There is currently no support for dodge as the equipment for such builds is generally trivial (100% dodge first, whatever for the other slots).
* Not considering elemental resists.

###### Supports / healers

* Supporting and healing calculation is currently not implemented. The equipment for these is very character dependent (MP and LB crystals do count). There is no obvious formulae for these units. Feel free to share your thoughts if you have an idea !

## In-depth tool documentation

###### Getting started

The calculator comes with two toolbars, one at the top and one at the bottom of the page.

The bottom toolbar contains social networks interaction as well as a PayPal link if you feel the tool deserves a donation.

To really dive into the calculation, simply hit the _Units_ button to choose your favourite unit by clicking its in-game icon. The units are categorized as _physical chainers_, _magical chainers_, _hybrid chainers_, _physical finishers_, _magical finishers_, _hybrid finishers_ or _tanks_. They can be located in several categories. Within a category, the units are more-or-less sorted according to their release order.

---- insert screenshot ----

When you select a unit, you immediately get a result according to a pre-defined build. There is a lot of information, split into several sections. Additional information, mostly related to calculation details, can be found in pop-up windows.

###### Unit details

First section of a display, this is where you find the major unit-specific information, as well as the equipped esper :

1. Unit basic information including name of the character, rank and in-game compendium number.
2. Build selection if there is more than one (not all possible skill rotations are configured, but you should find the most powerful ones).
3. Unit icon.
4. Unit total stats, including equipment and buffs. Next to each stat, a question mark icon can be clicked to open a pop-up display of the stat calculation detail (see the corresponding section of this guide for more information).
5. Unit conditional traits (like stat bonus for equipping a category of weapon), if there is some for this character.
6. Current esper. Clicking the icon do open the pop-up display to switch for another esper (see the corresponding section of this guide for more information).

---- insert screenshot with numbers ----

###### Unit equipment

The equipment section is self-explanatory as it is almost identical to the in-game display. Clicking any item icon do load from server the list of items the unit can equip. The result is then filtered according to several rules (for instance the ability to wield a second weapon). If there is at least one item that can be equipped, opens a pop-up display to switch the item (see the corresponding section of this guide for more information).

Unlike the game, the tool does not let you place a two-handed weapon in the left hand slot. The right hand slot (located on the left) is always considered as the _main weapon_ hand. The left hand can only hold a second one-handed weapon (if dual wielding is authorized), or shields.

---- insert screenshot ----

###### Skill rotation

The skills used by the tool for the calculation are displayed within this section. A skill can be either categorized as part of the _start phase_, which represent the very first skills you might want to use at the beginning of a battle, and a _stable rotation_, which is possible when all the skills and/or the LB is available. The stable rotation should be the list of skills you might want to use for optimal damages if an opponent lives long enough.

Note : the calculator does not consider specific battles, so unit death is not considered at all. In real life however, this is important for a few characters as some of the unlocked skills can be altered of impossible to cast after a death/raise. 2B is an example of such unit and does struggle when dying frequently.

Clicking any of the skills does open a simple pop-up display with additional information, including name of the skill, power, type of attack and damage, hits, frames and damage distribution, and the number of attacks (the latter for multi-cast units).

---- insert screenshot ---- 

###### Damage calculation result

This is the major section of the tool and contains the results of the build calculation. It displays per-turn damages for two different calculations :

1. If the unit has a start phase, displays the per-turn calculation (battle turns 1, 2, 3, ...). If damages are hybrid, 1a is the physical damage result part while 1b is the magical damage result part.
2. Displays the per-turn calculation for the stable rotation (turns of n-th rotation +1, +2, +3, ...). If damages are hybrid, 2a is the physical damage result part while 2b is the magical damage result part.
3. Average turn damages calculated for the 10 first turns of the battle.
4. Average turn damages calculated for the stable rotation (optimal damages of the character for long-term battles).

---- insert screenshot with numbers ----

Next to each per-turn damage result, clicking the question mark icon does open the damage calculation math details. This pop-up display is also the one that contains all the calculation configuration parameters (see the corresponding section of this guide for more information). 

###### Permanent URL

The permanent URL contains all the parameters needed to reproduce your calculation. The _Copy_ button is placing the URL value to your device clipboard. You can paste this URL anywhere on the internet to make a link to your calculation.

###### 
