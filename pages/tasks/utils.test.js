import TasksMocks from '../../store/reducers/tasks.types';

import groupByKey from './utils';

describe('groupValues', () => {
    test('группирует по значению', () => {
        expect(groupByKey('sprint', TasksMocks)).toEqual([
            '#30. Мартовский код',
            '#29. Мартовский код',
            '#28. Код'
        ]);
    });
});
