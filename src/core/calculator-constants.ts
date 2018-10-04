import {KillerPassives} from './model/killer-passives.model';
import {Esper} from './model/esper.model';

export const KILLER_LIMIT_CAP = 300;
export const TDW_LIMIT_CAP = 100;
export const DH_LIMIT_CAP = 300;
export const PASSIVE_LIMIT_CAP = 300;
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
export const SWORDS = 1;
export const LSWORDS = 27;
export const KATANAS = 28;
export const RODS = 2;
export const BOWS = 6;
export const SPEARS = 32;
export const WHIPS = 34;
export const THROWING = 24;
export const GUNS = 15;
export const MACES = 26;
export const CLAWS = 18;
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
export const SPECIAL_WEAPON_ENHANCEMENTS: Array<number> = [
  2317, // daggers
  2461, // swords
  2462, // larges swords
  2318, // katanas
  2319, // rods
  2620, // bows
  2623, // spears
  2463, // whips
  2464, // throwing weapons
  2320, // guns
  2621, // maces
  2622, // claws
];
export const IFRIT_KILLERS: Esper = getIfritWithKillers();
export const IFRIT_STATS_BOOST: Esper = getIfritWithStatsBoost();
export const IFRIT_EVOKE_BOOST: Esper = getIfritWithDamageModifier();
export const SHIVA_STATS_BOOST: Esper = getShivaWithStatsBoost();
export const GOLEM_BUG_KILLERS: Esper = getGolemWithBugKillers();
export const GOLEM_STONE_KILLERS: Esper = getGolemWithStoneKillers();
export const GOLEM_TANKING: Esper = getGolemWithDefensivesTraits();
export const GOLEM_TANKING_2: Esper = getGolemWithDefensivesTraits2();
export const RAMUH_DEMON_KILLER: Esper = getRamuhWithKillers();
export const RAMUH_EVOKE_BOOST: Esper = getRamuhWithStatsBoostAndDamageModifier();
export const DIABOLOS_KILLERS: Esper = getDiabolosWithKillers();
export const DIABOLOS_EVOKE_BOOST: Esper = getDiabolosWithDamageModifier();
export const CARBUNCLE_SPR: Esper = getCarbuncleSpr();
export const CARBUNCLE_SUPPORT: Esper = getCarbuncleSupport();
export const TITAN: Esper = getTitan();
export const TETRA_SYLPHID_KILLER: Esper = getTetraSylphidWithKiller();
export const FENRIR: Esper = getFenrir();
export const BAHAMUT: Esper = getBahamut();
export const ESPER_BUILDS: Array<Esper> = [
  IFRIT_KILLERS,
  IFRIT_STATS_BOOST,
  IFRIT_EVOKE_BOOST,
  SHIVA_STATS_BOOST,
  GOLEM_BUG_KILLERS,
  GOLEM_STONE_KILLERS,
  GOLEM_TANKING,
  GOLEM_TANKING_2,
  RAMUH_DEMON_KILLER,
  RAMUH_EVOKE_BOOST,
  DIABOLOS_KILLERS,
  DIABOLOS_EVOKE_BOOST,
  CARBUNCLE_SPR,
  CARBUNCLE_SUPPORT,
  TITAN,
  TETRA_SYLPHID_KILLER,
  BAHAMUT,
  FENRIR,
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
  esper.stats_percent = 40;
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
  esper.build_fr = 'Stats boost x2<br />Bonus PSY<br />Bonus MAG';
  esper.build_en = 'Stats boost x2<br />SPR bonuses<br />MAG bonuses';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/003_c1dc12.png';
  esper.hp = 5800 + 900;
  esper.mp = 7500 + 25;
  esper.atk = 3960 + 300;
  esper.mag = 7020 + 300;
  esper.def = 4460;
  esper.spr = 7020 + 300;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 190;
  esper.damage_modifier = 2;
  esper.stats_percent = 40;
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
  esper.hp = 7800;
  esper.mp = 6000;
  esper.atk = 5080 + 400;
  esper.mag = 3020;
  esper.def = 7280 + 360;
  esper.spr = 3020 + 100;
  esper.physical_killers = new KillerPassives(0, 125, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 0;
  esper.damage_modifier = 1;
  esper.stats_percent = 20;
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
  esper.hp = 7800;
  esper.mp = 6000;
  esper.atk = 5080 + 135;
  esper.mag = 3020;
  esper.def = 7280 + 800;
  esper.def_percent = 10;
  esper.spr = 3020 + 100;
  esper.physical_killers = new KillerPassives(0, 50, 0, 0, 0, 0, 0, 0, 125, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 75, 0, 0, 0);
  esper.power = 0;
  esper.damage_modifier = 1;
  esper.stats_percent = 20;
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
  esper.hp = 7800 + 1500;
  esper.hp_percent = 10;
  esper.mp = 6000 + 100;
  esper.atk = 5080;
  esper.mag = 3020 + 15;
  esper.def = 7280 + 500;
  esper.spr = 3020 + 100;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 0;
  esper.damage_modifier = 1;
  esper.stats_percent = 40;
  return esper;
}

function getGolemWithDefensivesTraits2(): Esper {
  const esper = new Esper();
  esper.id = 44;
  esper.name_fr = 'Golem';
  esper.name_en = 'Golem';
  esper.build_fr = 'Provocation<br />PV +10%<br />DÉF +10%<br />Stats boost';
  esper.build_en = 'Provoke<br />HP +10%<br />DEF +10%<br />Stats boost';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/004_a84098.png';
  esper.hp = 7800 + 1500;
  esper.hp_percent = 10;
  esper.mp = 6000;
  esper.atk = 5080;
  esper.mag = 3020 + 15;
  esper.def = 7280 + 800;
  esper.def_percent = 10;
  esper.spr = 3020 + 100;
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
  esper.hp = 4480;
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
  esper.hp = 4480 + 410;
  esper.mp = 8000;
  esper.atk = 3600 + 195;
  esper.mag = 7640 + 310;
  esper.def = 2920 + 85;
  esper.spr = 6440;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 210;
  esper.damage_modifier = 2;
  esper.stats_percent = 20;
  esper.damageType = 'magical';
  esper.elements = [3];
  return esper;
}

function getDiabolosWithKillers(): Esper {
  const esper = new Esper();
  esper.id = 61;
  esper.name_fr = 'Diabolos';
  esper.name_en = 'Diabolos';
  esper.build_fr = 'Tueur +<br />Tue-démons +';
  esper.build_en = 'Man-Eater+<br />Demon Killer+';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/006_8886af.png';
  esper.hp = 6680;
  esper.mp = 7580 + 40;
  esper.atk = 2860 + 255;
  esper.mag = 6480 + 355;
  esper.def = 4440;
  esper.spr = 4360;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 125, 0, 0, 125, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 75, 0, 0, 75, 0, 0);
  esper.power = 300;
  esper.damage_modifier = 1;
  esper.stats_percent = 0;
  esper.damageType = 'magical';
  esper.elements = [8];
  return esper;
}

function getDiabolosWithDamageModifier(): Esper {
  const esper = new Esper();
  esper.id = 62;
  esper.name_fr = 'Diabolos';
  esper.name_en = 'Diabolos';
  esper.build_fr = 'Appel de démon x2<br />Stats boost x2';
  esper.build_en = 'Demon Evocation x2<br />Stats boost x2';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/006_8886af.png';
  esper.hp = 6680 + 500;
  esper.mp = 7580 + 245;
  esper.atk = 2860;
  esper.mag = 6480 + 115;
  esper.def = 4440;
  esper.spr = 4360 + 160;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 300;
  esper.damage_modifier = 2;
  esper.stats_percent = 40;
  esper.damageType = 'magical';
  esper.elements = [8];
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
  esper.hp = 5280;
  esper.mp = 7200 + 200;
  esper.atk = 2560;
  esper.mag = 5280;
  esper.def = 6160;
  esper.spr = 7760 + 560;
  esper.spr_percent = 10;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 0;
  esper.damage_modifier = 1;
  esper.stats_percent = 40;
  return esper;
}

function getCarbuncleSupport(): Esper {
  const esper = new Esper();
  esper.id = 72;
  esper.name_fr = 'Carbuncle';
  esper.name_en = 'Carbuncle';
  esper.build_fr = 'Stats boost<br />Anti-feu X<br />Anti-glace X<br />Anti-foudre X<br />PV +10%';
  esper.build_en = 'Stats boost<br />Barfiraga<br />Barblizzaga<br />Barthundaga<br />HP +10%';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/007_fea4ed.png';
  esper.hp = 5280 + 270;
  esper.hp_percent = 10;
  esper.mp = 7200 + 20;
  esper.atk = 2560;
  esper.mag = 5280;
  esper.def = 6160 + 30;
  esper.spr = 7760 + 340;
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
  esper.build_fr = 'Stats boost x2<br />Bonus ATT';
  esper.build_en = 'Stats boost x2<br />ATT bonuses';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/009_6e1a82.png';
  esper.hp = 8640 + 950;
  esper.mp = 3360;
  esper.atk = 7120 + 490;
  esper.mag = 3160;
  esper.def = 6280;
  esper.spr = 4320 + 200;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 220;
  esper.damage_modifier = 2;
  esper.stats_percent = 40;
  esper.damageType = 'physical';
  esper.elements = [6];
  return esper;
}

function getTetraSylphidWithKiller(): Esper {
  const esper = new Esper();
  esper.id = 111;
  esper.name_fr = 'Tétra-Sylphides';
  esper.name_en = 'Tetra Sylphid';
  esper.build_fr = 'Tue-oiseaux +<br />Stats boost';
  esper.build_en = 'Bird Killer+<br />Stats boost';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/011_30eaf4.png';
  esper.hp = 5960 + 400;
  esper.mp = 6860 + 300;
  esper.atk = 4300;
  esper.mag = 7800 + 300;
  esper.def = 3880 + 200;
  esper.spr = 5040 + 130;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 125);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 75);
  esper.power = 230;
  esper.damage_modifier = 1;
  esper.stats_percent = 20;
  esper.damageType = 'magical';
  esper.elements = [5];
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

function getFenrir(): Esper {
  const esper = new Esper();
  esper.id = 131;
  esper.name_fr = 'Fenrir';
  esper.name_en = 'Fenrir';
  esper.build_fr = 'Stats boost x2<br />Bonus ATT / MAG';
  esper.build_en = 'Stats boost x2<br />ATK / MAG bonuses';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/013_3e4b8e.png';
  esper.hp = 6800 + 300;
  esper.mp = 4880 + 300;
  esper.atk = 7320 + 200;
  esper.mag = 7320 + 200;
  esper.def = 3960 + 200;
  esper.spr = 3960 + 200;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 0;
  esper.damage_modifier = 1;
  esper.stats_percent = 40;
  return esper;
}
