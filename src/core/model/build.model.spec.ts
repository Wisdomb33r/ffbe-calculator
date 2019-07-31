import {Build} from './build.model';
import {AlgorithmDefensive} from './algorithm-defensive.model';
import {AlgorithmOffensive} from './algorithm-offensive.model';

describe('Build', () => {

  it('should be defensive algorithm for id 8', () => {
    // GIVEN
    const plainObj = JSON.parse('{"id": 1, "algorithmId": 8, "equipments": {}}');
    // WHEN
    const build: Build = new Build(plainObj);
    // THEN
    expect(build.algorithm).toBeTruthy();
    expect(build.algorithm instanceof AlgorithmDefensive).toBeTruthy();
  });

  it('should be offensive algorithm for id\'s other than 8', () => {
    // GIVEN
    const plainObj7 = JSON.parse('{"id": 1, "algorithmId": 7, "equipments": {}}');
    const plainObj9 = JSON.parse('{"id": 1, "algorithmId": 9, "equipments": {}}');
    // WHEN
    const build7: Build = new Build(plainObj7);
    const build9: Build = new Build(plainObj9);
    // THEN
    expect(build7.algorithm).toBeTruthy();
    expect(build7.algorithm instanceof AlgorithmOffensive).toBeTruthy();
    expect(build9.algorithm).toBeTruthy();
    expect(build9.algorithm instanceof AlgorithmOffensive).toBeTruthy();
  });

  it('should define LB with fixed type and evokers damage for evokers algorithms', () => {
    // GIVEN
    const plainObj7 = JSON.parse('{"id": 1, "algorithmId": 7, "equipments": {}, "skills": [{"id": 11, "isLimitBreak": true}]}');
    const plainObj9 = JSON.parse('{"id": 1, "algorithmId": 9, "equipments": {}, "skills": [{"id": 11, "isLimitBreak": true}]}');
    // WHEN
    const build7: Build = new Build(plainObj7);
    const build9: Build = new Build(plainObj9);
    // THEN
    expect(build7.skills[0].damages_type).toEqual('evoker');
    expect(build7.skills[0].category).toEqual(9);
    expect(build9.skills[0].damages_type).toEqual('evoker');
    expect(build9.skills[0].category).toEqual(9);
  });

});
