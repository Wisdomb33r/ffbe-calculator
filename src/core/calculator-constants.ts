import {KillerPassives} from './model/killer-passives.model';
import {Esper} from './model/esper.model';
import {EquipmentExclusion} from './model/equipment-exclusion.model';

export const KILLER_LIMIT_CAP = 300;
export const TDW_LIMIT_CAP = 100;
export const DH_LIMIT_CAP = 300;
export const PASSIVE_LIMIT_CAP = 400;
export const EVO_LIMIT_CAP = 300;
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
export const STAVES = 17;
export const RODS = 2;
export const BOWS = 6;
export const AXES = 29;
export const HAMMERS = 13;
export const SPEARS = 32;
export const HARPS = 33;
export const WHIPS = 34;
export const THROWING = 24;
export const GUNS = 15;
export const MACES = 26;
export const CLAWS = 18;
export const WEAPONS_CATEGORIES: Array<number> = [
  DAGGERS,
  SWORDS,
  LSWORDS,
  KATANAS,
  STAVES,
  RODS,
  BOWS,
  AXES,
  HAMMERS,
  SPEARS,
  HARPS,
  WHIPS,
  THROWING,
  GUNS,
  MACES,
  CLAWS,
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
  2318, // swords, lswords, katanas, spears, claws
  2950, // swords, lswords, katanas, spears, claws
  2683, // staves
  2319, // rods
  2620, // bows
  2694, // hammers
  2791, // harps
  2463, // whips
  2464, // throwing weapons
  2951, // throwing weapons
  2320, // guns and axes
  2952, // guns and axes
  2621, // maces
  2953, // maces
];
export const EQUIPMENT_EXCLUSIONS: Array<EquipmentExclusion> = [
  new EquipmentExclusion(1424, [1425]), // adventurer III
  new EquipmentExclusion(1425, [1424]), // adventurer IV
  new EquipmentExclusion(2318, [2950]), // life / power seal 3
  new EquipmentExclusion(2950, [2318]), // life / power seal 4
  new EquipmentExclusion(2464, [2951]), // life / skill seal 3
  new EquipmentExclusion(2951, [2464]), // life / skill seal 4
  new EquipmentExclusion(2320, [2952]), // ATK 30%
  new EquipmentExclusion(2952, [2320]), // ATK 40%
  new EquipmentExclusion(2621, [2953]), // HP +30%
  new EquipmentExclusion(2953, [2621]), // HP +40%
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
export const ODIN_KILLERS: Esper = getOdinKillers();
export const TITAN: Esper = getTitan();
export const TETRA_SYLPHID_KILLER: Esper = getTetraSylphidWithKiller();
export const BAHAMUT: Esper = getBahamut();
export const FENRIR: Esper = getFenrir();
export const LEVIATHAN_KILLERS: Esper = getLeviathanWithKillers();
export const LEVIATHAN_EVOKE_BOOST: Esper = getLeviathanWithDamageModifier();
export const PHOENIX_KILLER: Esper = getPhoenixKillers();
export const PHOENIX_TANKING: Esper = getPhoenixTanking();
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
  ODIN_KILLERS,
  TITAN,
  TETRA_SYLPHID_KILLER,
  BAHAMUT,
  FENRIR,
  LEVIATHAN_KILLERS,
  LEVIATHAN_EVOKE_BOOST,
  PHOENIX_KILLER,
  PHOENIX_TANKING,
];

function getIfritWithKillers(): Esper {
  const esper = new Esper();
  esper.id = 2;
  esper.buildId = 21;
  esper.name_fr = 'Ifrit';
  esper.name_en = 'Ifrit';
  esper.build_fr = 'Tue-végétaux+<br />Tue-bêtes +';
  esper.build_en = 'Plant killer+<br />Beast killer+';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJJZnJpdCI6eyJuYW1lIjoiSWZyaXQiLCJyYXJpdHkiOjMsImxldmVsIjo2MCwic2VsZWN0ZWRTa2lsbHMiOlsibTFfMCIsIm0xX20xIiwibTJfbTIiLCJtMl9tMyIsIm0zX20zIiwibTNfbTQiLCJtNF9tNCIsIm00X20zIiwibTJfbTEiLCJtM19tMSIsIm0zXzAiLCJtNF8wIiwibTRfbTEiLCJtNF9tMiIsIm0zX20yIl19fQ==';
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
  esper.id = 2;
  esper.buildId = 22;
  esper.name_fr = 'Ifrit';
  esper.name_en = 'Ifrit';
  esper.build_fr = 'Stats boost x2<br />Tue-végétaux<br />Tue-bêtes';
  esper.build_en = 'Stats boost x2<br />Plant Killer<br />Beast killer';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJJZnJpdCI6eyJuYW1lIjoiSWZyaXQiLCJyYXJpdHkiOjMsImxldmVsIjo2MCwic2VsZWN0ZWRTa2lsbHMiOlsibTFfMCIsIm0xX20xIiwibTJfbTIiLCJtMl9tMSIsIm0zX20xIiwibTNfMCIsIm0yX20zIiwiMV8wIiwiMV8xIiwiMl8yIiwiM18yIiwiNF8yIiwiNF8zIiwiMF8xIiwiMV8yIiwiMl8zIiwiM18zIiwiM180IiwiNF80IiwibTNfbTMiLCJtM19tNCIsIm00XzAiLCJtM19tMiJdfX0=';
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
  esper.id = 2;
  esper.buildId = 23;
  esper.name_fr = 'Ifrit';
  esper.name_en = 'Ifrit';
  esper.build_fr = 'Appel Ardent x2<br />Stats boost<br />Tue-végétaux<br />Tue-bêtes';
  esper.build_en = 'Blazing Evocation x2<br />Stats boost<br />Plant Killer<br />Beast Killer';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJJZnJpdCI6eyJuYW1lIjoiSWZyaXQiLCJyYXJpdHkiOjMsImxldmVsIjo2MCwic2VsZWN0ZWRTa2lsbHMiOlsibTFfMCIsIjBfMSIsIjFfMiIsIjBfMiIsIjFfMyIsIjBfMyIsIm0xXzIiLCJtMV8zIiwiMF80IiwiMV80IiwiMl80IiwiMl8zIiwiM18zIiwiM180IiwiNF80IiwibTFfbTEiLCJtMl9tMiIsIm0yX20xIiwibTNfbTEiLCJtM18wIiwibTJfbTMiLCJtM19tMyJdfX0=';
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
  esper.id = 3;
  esper.buildId = 31;
  esper.name_fr = 'Shiva';
  esper.name_en = 'Shiva';
  esper.build_fr = 'Stats boost x2<br />Anti-glace X<br />Bonus PSY<br />Bonus MAG';
  esper.build_en = 'Stats boost x2<br />Barblizzaga<br />SPR bonuses<br />MAG bonuses';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJTaGl2YSI6eyJuYW1lIjoiU2hpdmEiLCJyYXJpdHkiOjMsImxldmVsIjo2MCwic2VsZWN0ZWRTa2lsbHMiOlsibTFfbTEiLCJtMl9tMiIsIm0yX20xIiwibTNfbTIiLCJtM19tMSIsIm00X20yIiwibTRfbTMiLCJtMV8wIiwibTJfMCIsIm0zXzAiLCJtNF8wIiwibTRfbTEiLCIwXzEiLCIxXzIiLCIyXzMiLCIxXzMiLCIwXzMiLCIxXzEiLCIxXzAiLCIyXzAiLCIzXzAiLCI0XzAiLCIyXzIiLCIzXzMiLCI0XzQiLCIzXzQiXX19';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/003_c1dc12.png';
  esper.hp = 5800 + 900;
  esper.mp = 7500 + 25;
  esper.atk = 3960 + 300;
  esper.mag = 7020 + 200;
  esper.def = 4460;
  esper.spr = 7020 + 180;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 190;
  esper.damage_modifier = 1;
  esper.stats_percent = 40;
  esper.damageType = 'magical';
  esper.elements = [2];
  return esper;
}

function getGolemWithBugKillers(): Esper {
  const esper = new Esper();
  esper.id = 4;
  esper.buildId = 41;
  esper.name_fr = 'Golem';
  esper.name_en = 'Golem';
  esper.build_fr = 'Tue-insecte+<br />Stats boost<br />Tue-pierre';
  esper.build_en = 'Bug Killer+<br />Stats boost<br />Stone Killer';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJHb2xlbSI6eyJuYW1lIjoiR29sZW0iLCJyYXJpdHkiOjMsImxldmVsIjo2MCwic2VsZWN0ZWRTa2lsbHMiOlsibTFfMCIsIm0yXzAiLCJtMV8xIiwiMF8yIiwibTFfMiIsIm0yXzEiLCJtM18wIiwibTRfbTEiLCJtNF8wIiwibTNfMSIsIm0yXzIiLCIwXzEiLCIxXzEiLCIxXzIiLCIyXzIiLCIyXzEiLCIzXzIiLCIzXzMiLCIyXzMiLCIxXzMiLCIwXzMiLCIzXzEiLCI0XzIiLCI0XzEiXX19';
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
  esper.id = 4;
  esper.buildId = 42;
  esper.name_fr = 'Golem';
  esper.name_en = 'Golem';
  esper.build_fr = 'Tue-pierre+<br />Stats boost<br />Tue-insecte<br />DÉF +10%';
  esper.build_en = 'Stone Killer+<br />Stats boost<br />Bug Killer<br />DEF +10%';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJHb2xlbSI6eyJuYW1lIjoiR29sZW0iLCJyYXJpdHkiOjMsImxldmVsIjo2MCwic2VsZWN0ZWRTa2lsbHMiOlsiMF8xIiwiMV8xIiwiMV8yIiwiMl8yIiwiMl8xIiwiM18yIiwiM18zIiwiMl8zIiwiMV8zIiwiMl80IiwiMV80IiwiMF80IiwibTFfMyIsIjBfMyIsIm0xXzAiLCJtMl8wIiwibTFfMSIsIjBfMiIsIm0xXzIiLCJtMl8xIiwiM18xIiwiNF8yIiwiNF8xIiwiM180IiwibTNfMCJdfX0=';
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
  esper.id = 4;
  esper.buildId = 43;
  esper.name_fr = 'Golem';
  esper.name_en = 'Golem';
  esper.build_fr = 'Provocation<br />PV +10%<br />Stats boost x2';
  esper.build_en = 'Provoke<br />HP +10%<br />Stats boost x2';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJHb2xlbSI6eyJuYW1lIjoiR29sZW0iLCJyYXJpdHkiOjMsImxldmVsIjo2MCwic2VsZWN0ZWRTa2lsbHMiOlsiMF9tMSIsIm0xX20yIiwibTFfbTEiLCJtMl9tMSIsIm0yX20yIiwibTNfbTIiLCJtM19tMyIsIm00X20zIiwibTRfbTIiLCIxXzAiLCIxX20xIiwiMl8wIiwiMl9tMSIsIjNfMCIsIjNfbTEiLCI0XzAiLCIwXzEiLCIxXzEiLCIxXzIiLCIyXzIiLCIyXzEiLCIzXzEiLCI0XzIiLCI0XzEiLCIzXzIiLCIzXzMiLCIyXzMiLCIxXzMiLCIyXzQiXX19';
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
  esper.id = 4;
  esper.buildId = 44;
  esper.name_fr = 'Golem';
  esper.name_en = 'Golem';
  esper.build_fr = 'Provocation<br />PV +10%<br />DÉF +10%<br />Stats boost';
  esper.build_en = 'Provoke<br />HP +10%<br />DEF +10%<br />Stats boost';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJHb2xlbSI6eyJuYW1lIjoiR29sZW0iLCJyYXJpdHkiOjMsImxldmVsIjo2MCwic2VsZWN0ZWRTa2lsbHMiOlsiMF9tMSIsIm0xX20yIiwibTFfbTEiLCJtMl9tMSIsIm0yX20yIiwibTNfbTIiLCJtM19tMyIsIm00X20zIiwibTRfbTIiLCIwXzEiLCIxXzEiLCIxXzIiLCIyXzIiLCIyXzEiLCIzXzIiLCIzXzMiLCIyXzMiLCIxXzMiLCIyXzQiLCIzXzQiLCIzXzEiLCI0XzIiLCI0XzEiLCIxXzQiLCIwXzQiXX19';
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
  esper.id = 5;
  esper.buildId = 51;
  esper.name_fr = 'Ramuh';
  esper.name_en = 'Ramuh';
  esper.build_fr = 'Stats boost<br />Tue-démon M.<br />Tue-pierre M.';
  esper.build_en = 'Stats boost<br />M Demon Killer<br />M Stone Killer';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJSYW11aCI6eyJuYW1lIjoiUmFtdWgiLCJyYXJpdHkiOjMsImxldmVsIjo2MCwic2VsZWN0ZWRTa2lsbHMiOlsiMV8wIiwiMl8wIiwiM18xIiwiM18wIiwiNF8wIiwiM19tMSIsIjJfbTIiLCIyXzEiLCIyXzIiLCIzXzIiLCI0XzMiLCI0XzIiLCI0XzEiLCIwX20xIiwiMV9tMSIsIjFfbTIiLCIxX20zIiwiMF9tNCIsIm0xX200Il19fQ==';
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
  esper.id = 5;
  esper.buildId = 53;
  esper.name_fr = 'Ramuh';
  esper.name_en = 'Ramuh';
  esper.build_fr = 'Appel de sagesse x2<br />Stats boost';
  esper.build_en = 'Wise Evocation x2<br />Stats boost';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJSYW11aCI6eyJuYW1lIjoiUmFtdWgiLCJyYXJpdHkiOjMsImxldmVsIjo2MCwic2VsZWN0ZWRTa2lsbHMiOlsibTFfMCIsIm0yX20xIiwibTJfMCIsIm0zX20xIiwibTNfbTIiLCJtNF9tMyIsIm00X200IiwibTRfbTIiLCJtNF9tMSIsIjBfbTEiLCIxX20xIiwiMV9tMiIsIjFfbTMiLCIwX200IiwibTFfbTQiLCIxXzAiLCIyXzAiLCIzXzEiLCIzXzAiLCI0XzAiLCIzX20xIl19fQ==';
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
  esper.id = 6;
  esper.buildId = 61;
  esper.name_fr = 'Diabolos';
  esper.name_en = 'Diabolos';
  esper.build_fr = 'Tueur +<br />Tue-démons +';
  esper.build_en = 'Man-Eater+<br />Demon Killer+';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJEaWFib2xvcyI6eyJuYW1lIjoiRGlhYm9sb3MiLCJyYXJpdHkiOjMsImxldmVsIjo2MCwic2VsZWN0ZWRTa2lsbHMiOlsiMV8wIiwiMF9tMSIsIjFfbTEiLCIwX20yIiwiMV9tMiIsIjJfbTIiLCIxX20zIiwiMF9tNCIsIm0xX200IiwiMV8xIiwiMl8xIiwiMl8yIiwiMV8yIiwiMF8yIiwiMV8zIiwiMF8zIiwibTFfMiIsIm0yXzIiLCJtMV8zIiwiMF80IiwiMV80Il19fQ==';
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
  esper.id = 6;
  esper.buildId = 62;
  esper.name_fr = 'Diabolos';
  esper.name_en = 'Diabolos';
  esper.build_fr = 'Appel de démon x2<br />Stats boost x2';
  esper.build_en = 'Demon Evocation x2<br />Stats boost x2';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJEaWFib2xvcyI6eyJuYW1lIjoiRGlhYm9sb3MiLCJyYXJpdHkiOjMsImxldmVsIjo2MCwic2VsZWN0ZWRTa2lsbHMiOlsibTFfMCIsIm0yX20xIiwibTNfbTEiLCJtM19tMiIsIm00X20zIiwibTRfbTQiLCIxXzEiLCIyXzEiLCIyXzIiLCIyXzMiLCIzXzMiLCIzXzIiLCI0XzIiLCI0XzEiLCI0XzMiLCI0XzQiLCJtMV9tMSIsIm0yX20yIiwibTNfbTMiLCJtMl9tMyIsIm0yX200IiwibTNfbTQiXX19';
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
  esper.id = 7;
  esper.buildId = 71;
  esper.name_fr = 'Carbuncle';
  esper.name_en = 'Carbuncle';
  esper.build_fr = 'Stats boost x2<br />PSY +10%<br />Bonus PSY';
  esper.build_en = 'Stats boost x2<br />SPR +10%<br />SPR bonuses';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJDYXJidW5jbGUiOnsibmFtZSI6IkNhcmJ1bmNsZSIsInJhcml0eSI6MywibGV2ZWwiOjYwLCJzZWxlY3RlZFNraWxscyI6WyIxXzAiLCIxXzEiLCIyXzEiLCIyXzIiLCIzXzMiLCIyXzMiLCIxXzMiLCIyXzQiLCIzXzQiLCI0XzQiLCI0XzMiLCI0XzIiLCIyXzAiLCIxX20xIiwiMl9tMSIsIjNfbTEiLCI0XzAiLCI0XzEiLCIzXzIiLCIxXzIiLCIxXzQiXX19';
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
  esper.id = 7;
  esper.buildId = 72;
  esper.name_fr = 'Carbuncle';
  esper.name_en = 'Carbuncle';
  esper.build_fr = 'Stats boost<br />Anti-feu X<br />Anti-glace X<br />Anti-foudre X<br />PV +10%';
  esper.build_en = 'Stats boost<br />Barfiraga<br />Barblizzaga<br />Barthundaga<br />HP +10%';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJDYXJidW5jbGUiOnsibmFtZSI6IkNhcmJ1bmNsZSIsInJhcml0eSI6MywibGV2ZWwiOjYwLCJzZWxlY3RlZFNraWxscyI6WyJtMV9tMSIsIm0yX20xIiwibTNfbTEiLCJtNF9tMSIsIm0yX20yIiwibTNfbTIiLCJtNF9tMiIsIjBfbTEiLCJtMV9tMiIsIjBfbTIiLCIxX20yIiwiMl9tMiIsIm0xX20zIiwiMF9tMyIsIjBfbTQiLCIxX20zIiwiMV8wIiwiMV8xIiwiMl8xIiwiMl8yIiwiM18zIiwiNF80IiwiNF8zIiwiNF8yIiwiMV8yIiwiMl8zIiwiMl8wIl19fQ==';
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

function getOdinKillers(): Esper {
  const esper = new Esper();
  esper.id = 8;
  esper.buildId = 81;
  esper.name_fr = 'Odin';
  esper.name_en = 'Odin';
  esper.build_fr = 'Tue-dragons+<br />Tueur de morts-vivants<br />Stats boost<br />Transpercer';
  esper.build_en = 'Dragon Killer+<br />Undead Killer<br />Stats boost<br />Lance';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/008_a384c8.png';
  esper.build = 'https://ffbeequip.com/espers.html?server=GL&o#eyJPZGluIjp7Im5hbWUiOiJPZGluIiwicmFyaXR5IjozLCJsZXZlbCI6NjAsInNlbGVjdGVkU2tpbGxzIjpbIjFfMCIsIjBfbTEiLCIxX20xIiwiMl9tMSIsIjNfMCIsIjRfMSIsIjRfMCIsIjNfbTEiLCIyX20yIiwiMV8xIiwibTFfMCIsIm0xX20xIiwibTJfbTEiLCJtMl9tMiIsIm0yX20zIiwibTJfbTQiLCJtM19tNCIsIm00X200IiwiMl8xIiwiMl8yIiwiM18yIiwiM18zIiwiMl8zIiwiMF9tMiIsIjFfbTIiLCJtMl8wIiwibTNfbTEiLCJtM18wIl19fQ==';
  esper.hp = 7340 + 450;
  esper.mp = 6100 + 20;
  esper.atk = 8040 + 575;
  esper.mag = 4800 + 300;
  esper.def = 6640 + 20;
  esper.spr = 5000;
  esper.physical_killers = new KillerPassives(125, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 210;
  esper.damage_modifier = 1;
  esper.stats_percent = 20;
  return esper;
}

function getTitan(): Esper {
  const esper = new Esper();
  esper.id = 9;
  esper.buildId = 91;
  esper.name_fr = 'Titan';
  esper.name_en = 'Titan';
  esper.build_fr = 'Stats boost x2<br />Anti-terre X<br />Bonus ATT';
  esper.build_en = 'Stats boost x2<br />Barstonga<br />ATT bonuses';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJUaXRhbiI6eyJuYW1lIjoiVGl0YW4iLCJyYXJpdHkiOjMsImxldmVsIjo2MCwic2VsZWN0ZWRTa2lsbHMiOlsibTFfbTEiLCJtMl9tMSIsIm0yX20yIiwibTNfbTMiLCJtMl9tMyIsIm0zX200IiwibTRfbTQiLCJtM19tMiIsIm00X20yIiwibTRfbTMiLCIxXzEiLCIxXzIiLCIyXzMiLCIxXzMiLCIwXzMiLCIwXzQiLCIxXzQiLCIzXzMiLCI0XzQiLCJtM19tMSIsIm00X20xIl19fQ==';
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
  esper.damage_modifier = 1;
  esper.stats_percent = 40;
  esper.damageType = 'physical';
  esper.elements = [6];
  return esper;
}

function getTetraSylphidWithKiller(): Esper {
  const esper = new Esper();
  esper.id = 11;
  esper.buildId = 111;
  esper.name_fr = 'Tétra-Sylphides';
  esper.name_en = 'Tetra Sylphid';
  esper.build_fr = 'Tue-oiseaux +<br />Stats boost';
  esper.build_en = 'Bird Killer+<br />Stats boost';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJUZXRyYSBTeWxwaGlkIjp7Im5hbWUiOiJUZXRyYSBTeWxwaGlkIiwicmFyaXR5IjozLCJsZXZlbCI6NjAsInNlbGVjdGVkU2tpbGxzIjpbIjFfMCIsIjJfMSIsIjJfMiIsIjJfMyIsIjNfMyIsIjNfMiIsIjNfMSIsIjNfMCIsIjRfMSIsIjRfMCIsIjNfbTEiLCIyX20yIiwibTFfbTEiLCJtMV9tMiIsIjBfbTEiLCIxX20xIiwiMl9tMSIsIjFfbTIiLCIwX20zIiwiMV9tMyIsIjBfbTQiLCJtMV9tNCIsIjFfMSIsIjFfMiIsIjBfMiIsIjFfMyIsIjJfMCIsIjBfMSIsIm0xXzEiLCJtMl8xIl19fQ==';
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
  esper.id = 12;
  esper.buildId = 121;
  esper.name_fr = 'Bahamut';
  esper.name_en = 'Bahamut';
  esper.build_fr = 'Max ATT / MAG';
  esper.build_en = 'Max ATK / MAG';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJCYWhhbXV0Ijp7Im5hbWUiOiJCYWhhbXV0IiwicmFyaXR5IjoxLCJsZXZlbCI6MzAsInNlbGVjdGVkU2tpbGxzIjpbIm0xXzAiLCJtMl9tMSIsIm0yXzAiLCIxXzAiLCIyXzEiLCIyXzAiXX19';
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
  esper.id = 13;
  esper.buildId = 131;
  esper.name_fr = 'Fenrir';
  esper.name_en = 'Fenrir';
  esper.build_fr = 'Stats boost x2<br />Bonus ATT / MAG';
  esper.build_en = 'Stats boost x2<br />ATK / MAG bonuses';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJGZW5yaXIiOnsibmFtZSI6IkZlbnJpciIsInJhcml0eSI6MywibGV2ZWwiOjYwLCJzZWxlY3RlZFNraWxscyI6WyIwX20xIiwibTFfbTIiLCJtMl9tMiIsIm0yX20xIiwibTNfbTEiLCJtNF9tMSIsIm00X20yIiwibTRfbTMiLCIwXzEiLCIxXzIiLCIyXzIiLCIyXzEiLCIzXzEiLCI0XzEiLCI0XzIiLCI0XzMiLCIwXzIiLCJtMV8yIiwiMF9tMiIsIjFfbTIiLCJtMV8wIiwiMV8wIiwibTJfMCIsIm0zXzAiLCIyXzAiLCIzXzAiXX19';
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

function getLeviathanWithKillers(): Esper {
  const esper = new Esper();
  esper.id = 14;
  esper.buildId = 141;
  esper.name_fr = 'Léviathan';
  esper.name_en = 'Leviathan';
  esper.build_fr = 'Tue-esprits +<br />Tue-aquatiques +';
  esper.build_en = 'Spirit Killer+<br />Aquan Killer+';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJMZXZpYXRoYW4iOnsibmFtZSI6IkxldmlhdGhhbiIsInJhcml0eSI6MywibGV2ZWwiOjYwLCJzZWxlY3RlZFNraWxscyI6WyJtMV8wIiwibTJfbTEiLCJtMl8wIiwibTFfMSIsIm0yXzEiLCJtM18wIiwibTNfbTEiLCJtNF9tMiIsIm00X20xIiwibTRfMCIsIjFfMSIsIjFfMCIsIjJfMCIsIjJfMSIsIjJfMiIsIjNfMyIsIjNfMiIsIjNfMSIsIjNfMCIsIjRfMCIsIjRfMSIsIjRfMiJdfX0=';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/014_b9abab.png';
  esper.hp = 9560;
  esper.mp = 6920;
  esper.atk = 6300;
  esper.mag = 7660 + 850;
  esper.def = 5960 + 500;
  esper.spr = 6080;
  esper.physical_killers = new KillerPassives(0, 0, 75, 0, 0, 0, 0, 0, 0, 0, 75, 0);
  esper.magical_killers = new KillerPassives(0, 0, 125, 0, 0, 0, 0, 0, 0, 0, 125, 0);
  esper.power = 400;
  esper.damage_modifier = 1;
  esper.stats_percent = 0;
  esper.damageType = 'magical';
  esper.elements = [4];
  return esper;
}

function getLeviathanWithDamageModifier(): Esper {
  const esper = new Esper();
  esper.id = 14;
  esper.buildId = 142;
  esper.name_fr = 'Léviathan';
  esper.name_en = 'Leviathan';
  esper.build_fr = 'Appel dieu de l\'eau x2<br />Stats boost';
  esper.build_en = 'Water God Evocation x2<br />Stats boost';
  esper.build = 'http://ffbeEquip.com/espers.html?server=GL&o#eyJMZXZpYXRoYW4iOnsibmFtZSI6IkxldmlhdGhhbiIsInJhcml0eSI6MywibGV2ZWwiOjYwLCJzZWxlY3RlZFNraWxscyI6WyIxXzEiLCIwXzEiLCIwXzIiLCIxXzIiLCIyXzMiLCIxXzMiLCIxXzQiLCIyXzQiLCJtMV9tMSIsIm0xX20yIiwibTJfbTIiLCJtMl9tMyIsIm0zX20zIiwibTNfbTIiLCJtNF9tMyIsIm00X200IiwibTNfbTQiLCIxXzAiLCIyXzAiLCIyXzEiLCIyXzIiLCIzXzMiLCI0XzQiLCIzXzQiLCIzXzIiLCIzXzEiXX19';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/014_b9abab.png';
  esper.hp = 9560;
  esper.mp = 6920 + 700;
  esper.atk = 6300 + 380;
  esper.mag = 7660 + 550;
  esper.def = 5960 + 500;
  esper.spr = 6080;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 400;
  esper.damage_modifier = 2;
  esper.stats_percent = 20;
  esper.damageType = 'magical';
  esper.elements = [4];
  return esper;
}

function getPhoenixKillers(): Esper {
  const esper = new Esper();
  esper.id = 15;
  esper.buildId = 151;
  esper.name_fr = 'Phénix';
  esper.name_en = 'Phoenix';
  esper.build_fr = 'Tueur de morts-vivants+<br />Stats boost';
  esper.build_en = 'Undead Killer+<br />Stats boost';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/015_917942.png';
  esper.build = 'https://ffbeequip.com/espers.html?server=GL&o#eyJQaG9lbml4Ijp7Im5hbWUiOiJQaG9lbml4IiwicmFyaXR5IjozLCJsZXZlbCI6NjAsInNlbGVjdGVkU2tpbGxzIjpbIjBfbTEiLCIxX20xIiwiMV8wIiwiMV8xIiwiMl8xIiwiMl8yIiwiM18yIiwiM18zIiwiM180IiwiNF80IiwiNF8zIiwiNF8yIiwiMF9tMiIsIm0xX20yIiwibTFfbTMiLCJtMl9tMyIsIm0zX200IiwibTJfbTQiXX19';
  esper.hp = 7640 + 900;
  esper.mp = 6480;
  esper.atk = 3900 + 140;
  esper.mag = 4860 + 370;
  esper.def = 4760;
  esper.spr = 7080;
  esper.physical_killers = new KillerPassives(0, 0, 0, 125, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 75, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 200;
  esper.damage_modifier = 1;
  esper.stats_percent = 20;
  esper.damageType = 'magical';
  esper.elements = [1];
  return esper;
}

function getPhoenixTanking(): Esper {
  const esper = new Esper();
  esper.id = 15;
  esper.buildId = 152;
  esper.name_fr = 'Phénix';
  esper.name_en = 'Phoenix';
  esper.build_fr = 'Garde de Phénix<br />Stats boost x2';
  esper.build_en = 'Phoenix Guard<br />Stats boost x2';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/015_917942.png';
  esper.build = 'https://ffbeequip.com/espers.html?server=GL&o#eyJQaG9lbml4Ijp7Im5hbWUiOiJQaG9lbml4IiwicmFyaXR5IjozLCJsZXZlbCI6NjAsInNlbGVjdGVkU2tpbGxzIjpbIm0xX20xIiwibTJfbTEiLCJtMl9tMiIsIm0zX20yIiwibTNfbTEiLCJtNF9tMSIsIm00X20yIiwiMF9tMSIsIjBfbTIiLCJtMV9tMiIsIm0xX20zIiwibTJfbTMiLCJtM19tNCIsIm0yX200IiwiMF9tMyIsIjBfbTQiLCJtMV9tNCIsIm0xXzAiLCIwXzEiLCIwXzIiLCIxXzIiLCIyXzMiLCIxXzMiLCJtMV8xIl19fQ==';
  esper.hp = 7640 + 1350;
  esper.mp = 6480 + 150;
  esper.atk = 3900;
  esper.mag = 4860 + 20;
  esper.def = 4760 + 20;
  esper.spr = 7080 + 165;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.power = 200;
  esper.damage_modifier = 1;
  esper.stats_percent = 40;
  esper.damageType = 'magical';
  esper.elements = [1];
  return esper;
}
