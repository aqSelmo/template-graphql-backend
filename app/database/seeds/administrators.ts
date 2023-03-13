import { createHashFromString } from '../../utils/createHash';

export default [
  {
    tableName: 'administrators',
    fields: ['id', 'fullname', 'email', 'password'],
    values: [
      {
        id: 1,
        name: 'Guilherme Falcão',
        email: 'guilusa25@gmail.com',
        password: createHashFromString('102030'),
      },
    ],
  },
  {
    tableName: 'administrator_modules',
    fields: ['id', 'title', 'code'],
    values: [{ id: 1, title: 'Dashboard', code: 'DAS' }],
  },
  {
    tableName: 'administrators_permissions',
    fields: ['administrator_id', 'module_id'],
    values: [{ administrator_id: 1, module_id: 1 }],
  },
];
