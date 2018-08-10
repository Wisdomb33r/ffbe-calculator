import {KillerPassives} from './model/killer-passives.model';
import {Esper} from './model/esper.model';

export const MONSTER_TYPES = [
  'dragon',
  'insect',
  'fairy',
  'undead',
  'plant',
  'beast',
  'human',
  'machine',
  'stone',
  'demon',
  'aquatic',
  'bird',
];
export const DAGGERS = 16;
export const KATANAS = 28;
export const RODS = 2;
export const GUNS = 15;
export const WEAPONS_CATEGORIES: Array<number> = [
  1,
  2,
  6,
  13,
  15,
  16,
  17,
  18,
  24,
  26,
  27,
  28,
  29,
  32,
  33,
  34,
];
export const SHIELDS_CATEGORIES: Array<number> = [
  9,
  10,
];
export const HEAD_CATEGORIES: Array<number> = [
  11,
  12,
];
export const BODY_CATEGORIES: Array<number> = [
  7,
  8,
  14,
  35,
];
export const IFRIT_KILLERS: Esper = getIfritWithKillers();
export const IFRIT_STATS_BOOST: Esper = getIfritWithStatsBoost();
export const IFRIT_EVOKE_BOOST: Esper = getIfritWithDamageModifier();
export const SHIVA_STATS_BOOST: Esper = getShivaWithStatsBoost();
export const GOLEM_BUG_KILLERS: Esper = getGolemWithBugKillers();
export const GOLEM_STONE_KILLERS: Esper = getGolemWithStoneKillers();
export const GOLEM_TANKING: Esper = getGolemWithDefensivesTraits();
export const RAMUH_DEMON_KILLER: Esper = getRamuhWithKillers();
export const RAMUH_EVOKE_BOOST: Esper = getRamuhWithStatsBoostAndDamageModifier();
export const CARBUNCLE_SPR: Esper = getCarbuncleSpr();
export const CARBUNCLE_SUPPORT: Esper = getCarbuncleSupport();
export const TITAN: Esper = getTitan();
export const BAHAMUT: Esper = getBahamut();
export const ESPER_BUILDS: Array<Esper> = [
  IFRIT_KILLERS,
  IFRIT_STATS_BOOST,
  IFRIT_EVOKE_BOOST,
  SHIVA_STATS_BOOST,
  GOLEM_BUG_KILLERS,
  GOLEM_STONE_KILLERS,
  GOLEM_TANKING,
  RAMUH_DEMON_KILLER,
  RAMUH_EVOKE_BOOST,
  CARBUNCLE_SPR,
  CARBUNCLE_SUPPORT,
  TITAN,
  BAHAMUT,
];

function getIfritWithKillers(): Esper {
  const esper = new Esper();
  esper.id = 21;
  esper.name_fr = 'Ifrit';
  esper.name_en = 'Ifrit';
  esper.build_fr = 'Tue-végétaux+<br />Tue-bêtes +';
  esper.build_en = 'Plant killer+<br />Beast killer+';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/002_a7253e.png';
  esper.hp = 7000 + 400;
  esper.mp = 4500 + 100;
  esper.atk = 7480 + 420;
  esper.mag = 3880;
  esper.def = 5060;
  esper.spr = 3880;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 125, 125, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 75, 75, 0, 0, 0, 0, 0, 0);
  esper.power = 235;
  esper.damage_modifier = 1;
  esper.stats_percent = 0;
  esper.damageType = 'physical';
  esper.elements = [1];
  return esper;
}

function getIfritWithStatsBoost(): Esper {
  const esper = new Esper();
  esper.id = 22;
  esper.name_fr = 'Ifrit';
  esper.name_en = 'Ifrit';
  esper.build_fr = 'Stats boost x2<br />Tue-végétaux<br />Tue-bêtes';
  esper.build_en = 'Stats boost x2<br />Plant Killer<br />Beast killer';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/002_a7253e.png';
  esper.hp = 7000 + 500;
  esper.mp = 4500;
  esper.atk = 7480 + 420;
  esper.mag = 3880 + 170;
  esper.def = 5060;
  esper.spr = 3880 + 100;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 50, 50, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 235;
  esper.damage_modifier = 1;
  esper.stats_percent = 20;
  esper.damageType = 'physical';
  esper.elements = [1];
  return esper;
}

function getIfritWithDamageModifier(): Esper {
  const esper = new Esper();
  esper.id = 23;
  esper.name_fr = 'Ifrit';
  esper.name_en = 'Ifrit';
  esper.build_fr = 'Appel Ardent x2<br />Stats boost<br />Tue-végétaux<br />Tue-bêtes';
  esper.build_en = 'Blazing Evocation x2<br />Stats boost<br />Plant Killer<br />Beast Killer';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/002_a7253e.png';
  esper.hp = 7000;
  esper.mp = 4500 + 5;
  esper.atk = 7480 + 160;
  esper.mag = 3880 + 270;
  esper.def = 5060;
  esper.spr = 3880;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 50, 50, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 235;
  esper.damage_modifier = 2;
  esper.stats_percent = 0;
  esper.damageType = 'physical';
  esper.elements = [1];
  return esper;
}

function getShivaWithStatsBoost(): Esper {
  const esper = new Esper();
  esper.id = 31;
  esper.name_fr = 'Shiva';
  esper.name_en = 'Shiva';
  esper.build_fr = 'Stats boost x2<br />Bonus PSY';
  esper.build_en = 'Stats boost x2<br />SPR bonuses';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/003_c1dc12.png';
  esper.hp = 5800 + 900;
  esper.mp = 7500;
  esper.atk = 3960 + 300;
  esper.mag = 7020;
  esper.def = 4460;
  esper.spr = 7020 + 300;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 190;
  esper.damage_modifier = 2;
  esper.stats_percent = 20;
  esper.damageType = 'magical';
  esper.elements = [2];
  return esper;
}

function getGolemWithBugKillers(): Esper {
  const esper = new Esper();
  esper.id = 41;
  esper.name_fr = 'Golem';
  esper.name_en = 'Golem';
  esper.build_fr = 'Tue-insecte+<br />Stats boost<br />Tue-pierre';
  esper.build_en = 'Bug Killer+<br />Stats boost<br />Stone Killer';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/004_a84098.png';
  esper.hp = 9000;
  esper.mp = 7000;
  esper.atk = 6200 + 400;
  esper.mag = 3900;
  esper.def = 8800 + 360;
  esper.spr = 3900 + 100;
  esper.physical_killers = new KillerPassives(0, 125, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 0;
  esper.damage_modifier = 1;
  esper.stats_percent = 10;
  return esper;
}

function getGolemWithStoneKillers(): Esper {
  const esper = new Esper();
  esper.id = 42;
  esper.name_fr = 'Golem';
  esper.name_en = 'Golem';
  esper.build_fr = 'Tue-pierre+<br />Stats boost<br />Tue-insecte<br />DÉF +10%';
  esper.build_en = 'Stone Killer+<br />Stats boost<br />Bug Killer<br />DEF +10%';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/004_a84098.png';
  esper.hp = 9000;
  esper.mp = 7000;
  esper.atk = 6200 + 100;
  esper.mag = 3900;
  esper.def = 8800 + 800;
  esper.def_percent = 10;
  esper.spr = 3900 + 100;
  esper.physical_killers = new KillerPassives(0, 50, 0, 0, 0, 0, 0, 0, 125, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 75, 0, 0, 0);
  esper.power = 0;
  esper.damage_modifier = 1;
  esper.stats_percent = 10;
  return esper;
}

function getGolemWithDefensivesTraits(): Esper {
  const esper = new Esper();
  esper.id = 43;
  esper.name_fr = 'Golem';
  esper.name_en = 'Golem';
  esper.build_fr = 'Provocation<br />PV +10%<br />Stats boost x2';
  esper.build_en = 'Provoke<br />HP +10%<br />Stats boost x2';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/004_a84098.png';
  esper.hp = 9000 + 1500;
  esper.hp_percent = 10;
  esper.mp = 7000 + 100;
  esper.atk = 6200;
  esper.mag = 3900 + 15;
  esper.def = 8800 + 360;
  esper.spr = 3900 + 100;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 0;
  esper.damage_modifier = 1;
  esper.stats_percent = 20;
  return esper;
}

function getRamuhWithKillers(): Esper {
  const esper = new Esper();
  esper.id = 51;
  esper.name_fr = 'Ramuh';
  esper.name_en = 'Ramuh';
  esper.build_fr = 'Stats boost<br />Tue-démon M.<br />Tue-pierre M.';
  esper.build_en = 'Stats boost<br />M Demon Killer<br />M Stone Killer';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/005_c96c38.png';
  esper.hp = 5200;
  esper.mp = 8000;
  esper.atk = 3600;
  esper.mag = 7640 + 400;
  esper.def = 2920 + 85;
  esper.spr = 6440 + 110;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 0, 0);
  esper.power = 210;
  esper.damage_modifier = 1;
  esper.stats_percent = 20;
  esper.damageType = 'magical';
  esper.elements = [3];
  return esper;
}

function getRamuhWithStatsBoostAndDamageModifier(): Esper {
  const esper = new Esper();
  esper.id = 53;
  esper.name_fr = 'Ramuh';
  esper.name_en = 'Ramuh';
  esper.build_fr = 'Appel de sagesse x2<br />Stats boost';
  esper.build_en = 'Wise Evocation x2<br />Stats boost';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/005_c96c38.png';
  esper.hp = 5200 + 410;
  esper.mp = 8000;
  esper.atk = 3600 + 195;
  esper.mag = 7640 + 310;
  esper.def = 2920 + 85;
  esper.spr = 6440;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 210;
  esper.damage_modifier = 2;
  esper.stats_percent = 10;
  esper.damageType = 'magical';
  esper.elements = [3];
  return esper;
}

function getCarbuncleSpr(): Esper {
  const esper = new Esper();
  esper.id = 71;
  esper.name_fr = 'Carbuncle';
  esper.name_en = 'Carbuncle';
  esper.build_fr = 'Stats boost x2<br />PSY +10%<br />Bonus PSY';
  esper.build_en = 'Stats boost x2<br />SPR +10%<br />SPR bonuses';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/007_fea4ed.png';
  esper.hp = 6400;
  esper.mp = 8000 + 200;
  esper.atk = 3000;
  esper.mag = 5800;
  esper.def = 8000;
  esper.spr = 8800 + 510;
  esper.spr_percent = 10;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 0;
  esper.damage_modifier = 1;
  esper.stats_percent = 20;
  return esper;
}

function getCarbuncleSupport(): Esper {
  const esper = new Esper();
  esper.id = 71;
  esper.name_fr = 'Carbuncle';
  esper.name_en = 'Carbuncle';
  esper.build_fr = 'Stats boost<br />Anti-feu X<br />Anti-foudre X<br />PV +10%';
  esper.build_en = 'Stats boost<br />Barfiraga<br />Barthundara<br />HP +10%';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/007_fea4ed.png';
  esper.hp = 6400 + 270;
  esper.hp_percent = 10;
  esper.mp = 8000 + 200;
  esper.atk = 3000;
  esper.mag = 5800;
  esper.def = 8000 + 30;
  esper.spr = 8800 + 25;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 0;
  esper.damage_modifier = 1;
  esper.stats_percent = 20;
  return esper;
}

function getTitan(): Esper {
  const esper = new Esper();
  esper.id = 91;
  esper.name_fr = 'Titan';
  esper.name_en = 'Titan';
  esper.build_fr = 'Stats boost x2<br />Appel gigantesque x2<br />Anti-Terre X';
  esper.build_en = 'Stats boost x2<br />Gigantic Evocation<br />Barstonga';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/009_6e1a82.png';
  esper.hp = 8640 + 950;
  esper.mp = 3360;
  esper.atk = 7120 + 110;
  esper.mag = 3160 + 40;
  esper.def = 6280;
  esper.spr = 4320 + 200;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 220;
  esper.damage_modifier = 2;
  esper.stats_percent = 20;
  esper.damageType = 'physical';
  esper.elements = [6];
  return esper;
}


function getBahamut(): Esper {
  const esper = new Esper();
  esper.id = 121;
  esper.name_fr = 'Bahamut';
  esper.name_en = 'Bahamut';
  esper.build_fr = 'Max ATT / MAG';
  esper.build_en = 'Max ATK / MAG';
  esper.rank = 1;
  esper.level = 30;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/012_0da633.png';
  esper.hp = 6400;
  esper.mp = 6300;
  esper.atk = 6000 + 400;
  esper.mag = 6000 + 400;
  esper.def = 6000;
  esper.spr = 6000;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 300;
  esper.damage_modifier = 1;
  esper.stats_percent = 0;
  esper.damageType = 'magical';
  return esper;
}
