[![Build Status](https://travis-ci.org/Wisdomb33r/ffbe-calculator.svg?branch=master)](https://travis-ci.org/Wisdomb33r/ffbe-calculator)

# FFBE calculator

Final Fantasy Brave Exvius unit calculator is a web tool to help you build and optimize your characters. Select a unit and get an immediate estimation of the character according to pre-defined builds.

For more personal calculation, you can select your unit equipment, esper, and group buffs or debuffs. Finally, enter your opponent DEF/SPR and its monster type to optimize your group for a specific battle.

**[Launch the calculator app](https://www.final-fantasy.ch/ffbe/calculator/)**

## About the builds

In the current version, unit builds (skill rotations) are pre-defined and cannot be changed. Lot of characters have an obvious optimal skill set (Trance Terra or Orlandeau do not have much of a choice). For other units, several builds can be selected.

While pre-defined builds are quite limiting, this is also a very convenient way of simplifying the calculations. Adapting skill rotation might (or might not) be supported by the calculator in the future. Due to skills with long-lasting effects (typically imbue, resists breaks or self-buffs), this functionality is pretty tricky to implement.

## About the formulae

The calculations are based on the in-game formulae (for more information, see [this link](https://exvius.gamepedia.com/Mechanics)). As the character is evaluated alone, a few hypotheses and simplifications have been introduced.

### Chainers

* Chainers are considered with a duplicate (same unit, same equipment for elemental weapons).
* The combo calculation for a chainer and its duplicate is slightly simplified. Namely, it does not consider multiple skills hits overlap.
* Chains are configured in builds as perfect (most of them) or breaking (6* Lila ATK build is an example)
* The calculator does not prevent cases that are not possible in game (6* Tidus cannot perfect chain without spark).

### Finishers

* Finishers are considered with a couple of chainers in the group to start a combo (damage multiplier x4).
* Finisher moves with long delay between first and last hit (over 100 to 120 frames) have a reduced combo (damage multiplier x2.5 to simulate a half-in / half-out scenario).
* Finisher moves that cannot enter a chain (e.g. jumps) have no combo (damage multiplier x1).

### Tanks

* Effective HP are calculated once for physical damages and once for magical damages.
* Calculations currently do not consider mixed attack type / damage of some trials (Malboro Tentacles Rampage for instance).
* There is currently no support for dodge as the equipment for such builds is generally trivial (100% dodge first, whatever for the other slots).

### Supports / healers

* Supporting and healing calculation is currently not implemented. The equipment for these is very character dependent (MP and LB crystals do count). There is no obvious formulae for these units. Feel free to share your thoughts if you have an idea !
