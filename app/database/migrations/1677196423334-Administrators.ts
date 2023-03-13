import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

import seeds from '../seeds/administrators';

export class Administrators1677196423334 implements MigrationInterface {
  private tableAdministratorModules = new Table({
    name: 'administrator_modules',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'title',
        type: 'char',
        length: '63',
        isNullable: false,
        isUnique: true,
      },
      {
        name: 'code',
        type: 'varchar',
        length: '5',
        isNullable: false,
        isUnique: true,
      },
      {
        name: 'created_at',
        type: 'datetime',
        default: 'CURRENT_TIMESTAMP()',
      },
      {
        name: 'updated_at',
        type: 'datetime',
        default: 'CURRENT_TIMESTAMP()',
        onUpdate: 'CURRENT_TIMESTAMP()',
      },
    ],
  });

  private tableAdministratorsPermissions = new Table({
    name: 'administrators_permissions',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'administrator_id',
        type: 'int',
        isNullable: false,
      },
      {
        name: 'module_id',
        type: 'int',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'datetime',
        default: 'CURRENT_TIMESTAMP()',
      },
      {
        name: 'updated_at',
        type: 'datetime',
        default: 'CURRENT_TIMESTAMP()',
        onUpdate: 'CURRENT_TIMESTAMP()',
      },
    ],
  });

  private tableAdministrators = new Table({
    name: 'administrators',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'fullname',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'email',
        type: 'varchar',
        length: '255',
        isNullable: false,
        isUnique: true,
      },
      {
        name: 'password',
        type: 'BLOB',
        isNullable: false,
      },
      {
        name: 'phone',
        type: 'varchar',
        length: '15',
        isNullable: true,
      },
      {
        name: 'zip_code',
        type: 'varchar',
        length: '15',
        isNullable: true,
      },
      {
        name: 'address',
        type: 'text',
        isNullable: true,
      },
      {
        name: 'address_number',
        type: 'varchar',
        length: '15',
        isNullable: true,
      },
      {
        name: 'district',
        type: 'text',
        isNullable: true,
      },
      {
        name: 'image_id',
        type: 'int',
        isNullable: true,
      },
      {
        name: 'created_at',
        type: 'datetime',
        default: 'CURRENT_TIMESTAMP()',
      },
      {
        name: 'updated_at',
        type: 'datetime',
        default: 'CURRENT_TIMESTAMP()',
        onUpdate: 'CURRENT_TIMESTAMP()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.tableAdministratorModules);
    await queryRunner.createTable(this.tableAdministrators);
    await queryRunner.createTable(this.tableAdministratorsPermissions);

    await queryRunner.createForeignKey(
      this.tableAdministratorsPermissions,
      new TableForeignKey({
        name: 'fk_administrators_administrator_id',
        columnNames: ['administrator_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'administrators',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      this.tableAdministratorsPermissions,
      new TableForeignKey({
        name: 'fk_administrators_module_id',
        columnNames: ['module_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'administrator_modules',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      this.tableAdministrators,
      new TableForeignKey({
        name: 'fk_administrators_image_id',
        columnNames: ['image_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'images',
        onDelete: 'SET NULL',
      })
    );

    for (const seed in seeds) {
      await queryRunner.connection
        .createQueryBuilder()
        .insert()
        .into(seeds[seed].tableName, seeds[seed].fields)
        .values(seeds[seed].values)
        .execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableAdministratorsPermissions);
    await queryRunner.dropTable(this.tableAdministratorModules);
    await queryRunner.dropTable(this.tableAdministrators);
  }
}
