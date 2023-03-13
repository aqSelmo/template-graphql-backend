import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Videos1677196423333 implements MigrationInterface {
  private table = new Table({
    name: 'videos',
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
        name: 'image_id',
        type: 'int',
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
        name: 'fk_videos_upload_id',
        columnNames: ['upload_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'uploads',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      this.table,
      new TableForeignKey({
        name: 'fk_videos_image_id',
        columnNames: ['image_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'images',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
