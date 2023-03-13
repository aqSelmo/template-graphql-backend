import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Uploads1677196423330 implements MigrationInterface {
  private table = new Table({
    name: 'uploads',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'path',
        type: 'varchar',
        length: '127',
        isNullable: false,
        isUnique: true,
      },
      {
        name: 'originalName',
        type: 'varchar',
        length: '127',
        isNullable: false,
      },
      {
        name: 'mime_type',
        type: 'varchar',
        length: '5',
        isNullable: false,
      },
      {
        name: 'size',
        type: 'int',
        length: '11',
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

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
