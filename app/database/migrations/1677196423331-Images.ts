import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Images1677196423331 implements MigrationInterface {
  private table = new Table({
    name: 'images',
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
        type: 'text',
        isNullable: true,
      },
      {
        name: 'upload_id',
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

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);

    await queryRunner.createForeignKey(
      this.table,
      new TableForeignKey({
        name: 'fk_images_upload_id',
        columnNames: ['upload_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'uploads',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
