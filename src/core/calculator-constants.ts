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
export const RAMUH_STATS_BOOST: Esper = getRamuhWithStatsBoost();
export const ESPER_BUILDS: Array<Esper> = [
  IFRIT_KILLERS,
  IFRIT_STATS_BOOST,
  SHIVA_STATS_BOOST,
  RAMUH_STATS_BOOST,
];

function getIfritWithKillers(): Esper {
  const esper = new Esper();
  esper.id = 2;
  esper.name_fr = 'Ifrit';
  esper.name_en = 'Ifrit';
  esper.build_fr = 'Tueurs';
  esper.build_en = 'Killers';
  esper.rank = 3;
  esper.icon = '/gestion/...'; // TODO set icon
  esper.hp = 7000 + 400;
  esper.mp = 4500 + 100;
  esper.atk = 7480 + 420;
  esper.mag = 5060;
  esper.def = 3880;
  esper.spr = 3880;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 125, 125, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 75, 75, 0, 0, 0, 0, 0, 0);
  esper.call_boost = 0;
  esper.stats_percent = 0;
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
  esper.icon = '/gestion/...'; // TODO set icon
  esper.hp = 7000 + 500;
  esper.mp = 4500;
  esper.atk = 7480 + 420;
  esper.mag = 5060 + 170;
  esper.def = 3880;
  esper.spr = 3880 + 100;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 50, 50, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.call_boost = 0;
  esper.stats_percent = 20;
  return esper;
}

function getShivaWithStatsBoost(): Esper {
  const esper = new Esper();
  esper.id = 4;
  esper.name_fr = 'Shiva';
  esper.name_en = 'Shiva';
  esper.build_fr = 'Stats boost';
  esper.build_en = 'Stats boost';
  esper.rank = 3;
  esper.icon = '/gestion/...'; // TODO set icon
  esper.hp = 5800 + 900;
  esper.mp = 7500;
  esper.atk = 3960 + 300;
  esper.mag = 4460 + 400;
  esper.def = 7020;
  esper.spr = 7020;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.call_boost = 0;
  esper.stats_percent = 20;
  return esper;
}

function getRamuhWithStatsBoost(): Esper {
  const esper = new Esper();
  esper.id = 5;
  esper.name_fr = 'Ramuh';
  esper.name_en = 'Ramuh';
  esper.build_fr = 'Stats boost + tue-démon magique';
  esper.build_en = 'Stats boost + M Demon Killer';
  esper.rank = 3;
  esper.icon = '/gestion/...'; // TODO set icon
  esper.hp = 5200;
  esper.mp = 8000;
  esper.atk = 3600;
  esper.mag = 2920 + 170;
  esper.def = 7640 + 270;
  esper.spr = 6440 + 110;
  esper.physical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  esper.magical_killers = new KillerPassives(0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0);
  esper.call_boost = 0;
  esper.stats_percent = 20;
  return esper;
}
