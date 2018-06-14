import {KillerPassives} from './model/killer-passives.model';
import {Esper} from './model/esper.model';

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
export const SHIVA_STATS_BOOST: Esper = getShivaWithStatsBoost();
export const GOLEM_KILLERS: Esper = getGolemWithKillers();
export const RAMUH_DEMON_KILLER: Esper = getRamuhWithStatsBoostAndDemonKiller();
export const RAMUH_STONE_KILLER: Esper = getRamuhWithStatsBoostAndStoneKiller();
export const BAHAMUT: Esper = getBahamut();
export const ESPER_BUILDS: Array<Esper> = [
  IFRIT_KILLERS,
  IFRIT_STATS_BOOST,
  SHIVA_STATS_BOOST,
  GOLEM_KILLERS,
  RAMUH_DEMON_KILLER,
  RAMUH_STONE_KILLER,
  BAHAMUT,
];

function getIfritWithKillers(): Esper {
  const esper = new Esper();
  esper.id = 2;
  esper.name_fr = 'Ifrit';
  esper.name_en = 'Ifrit';
  esper.build_fr = 'Tueurs';
  esper.build_en = 'Killers';
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
  esper.damage_modifier = 1;
  esper.stats_percent = 0;
  esper.damageType = 'physical';
  return esper;
}

function getIfritWithStatsBoost(): Esper {
  const esper = new Esper();
  esper.id = 2;
  esper.name_fr = 'Ifrit';
  esper.name_en = 'Ifrit';
  esper.build_fr = 'Stats boost';
  esper.build_en = 'Stats boost';
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
  esper.damage_modifier = 1;
  esper.stats_percent = 20;
  esper.damageType = 'physical';
  return esper;
}

function getIfritWithDamageModifier(): Esper {
  const esper = new Esper();
  esper.id = 2;
  esper.name_fr = 'Ifrit';
  esper.name_en = 'Ifrit';
  esper.build_fr = 'Appel Ardent';
  esper.build_en = 'Blazing Evocation';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/002_a7253e.png';
  esper.hp = 7000; // TODO build increments
  esper.mp = 4500;
  esper.atk = 7480;
  esper.mag = 3880;
  esper.def = 5060;
  esper.spr = 3880;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 50, 50, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.damage_modifier = 2;
  esper.stats_percent = 0;
  esper.damageType = 'physical';
  return esper;
}

function getShivaWithStatsBoost(): Esper {
  const esper = new Esper();
  esper.id = 3;
  esper.name_fr = 'Shiva';
  esper.name_en = 'Shiva';
  esper.build_fr = 'Stats boost';
  esper.build_en = 'Stats boost';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/003_c1dc12.png';
  esper.hp = 5800 + 900;
  esper.mp = 7500;
  esper.atk = 3960 + 300;
  esper.mag = 7020 + 400;
  esper.def = 4460;
  esper.spr = 7020;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.damage_modifier = 1;
  esper.stats_percent = 20;
  esper.damageType = 'magical';
  return esper;
}

function getGolemWithKillers(): Esper {
  const esper = new Esper();
  esper.id = 4;
  esper.name_fr = 'Golem';
  esper.name_en = 'Golem';
  esper.build_fr = 'Tueurs';
  esper.build_en = 'Killers';
  esper.rank = 2;
  esper.level = 40;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/004_905c88.png';
  esper.hp = 5500 + 900;
  esper.mp = 4300;
  esper.atk = 3200 + 100;
  esper.mag = 1600 + 15;
  esper.def = 4500 + 360;
  esper.spr = 1600 + 30;
  esper.physical_killers = new KillerPassives(0, 50, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.damage_modifier = 1;
  esper.stats_percent = 0;
  return esper;
}

function getRamuhWithStatsBoostAndDemonKiller(): Esper {
  const esper = new Esper();
  esper.id = 5;
  esper.name_fr = 'Ramuh';
  esper.name_en = 'Ramuh';
  esper.build_fr = 'Stats boost + Tue-démon M.';
  esper.build_en = 'Stats boost + M Demon Killer';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/005_c96c38.png';
  esper.hp = 5200;
  esper.mp = 8000;
  esper.atk = 3600;
  esper.mag = 7640 + 170;
  esper.def = 2920 + 270;
  esper.spr = 6440 + 110;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0);
  esper.damage_modifier = 1;
  esper.stats_percent = 20;
  esper.damageType = 'magical';
  return esper;
}

function getRamuhWithStatsBoostAndStoneKiller(): Esper {
  const esper = new Esper();
  esper.id = 5;
  esper.name_fr = 'Ramuh';
  esper.name_en = 'Ramuh';
  esper.build_fr = 'Stats boost + Tue-pierre M.';
  esper.build_en = 'Stats boost + M Stone Killer';
  esper.rank = 3;
  esper.level = 60;
  esper.icon = '/gestion/resources/brex_invocation/img/000/000/native/005_c96c38.png';
  esper.hp = 5200;
  esper.mp = 8000;
  esper.atk = 3600;
  esper.mag = 7640 + 310;
  esper.def = 2920 + 270;
  esper.spr = 6440;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0);
  esper.damage_modifier = 1;
  esper.stats_percent = 20;
  esper.damageType = 'magical';
  return esper;
}

function getBahamut(): Esper {
  const esper = new Esper();
  esper.id = 12;
  esper.name_fr = 'Bahamut';
  esper.name_en = 'Bahamut';
  esper.build_fr = 'Max ATT / MAG';
  esper.build_en = 'MAX ATT / MAG';
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
  esper.damage_modifier = 1;
  esper.stats_percent = 0;
  esper.damageType = 'magical';
  return esper;
}
