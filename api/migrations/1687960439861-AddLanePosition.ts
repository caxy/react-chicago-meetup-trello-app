import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLanePosition1687960439861 implements MigrationInterface {
    name = 'AddLanePosition1687960439861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lane\` ADD \`position\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lane\` DROP COLUMN \`position\``);
    }

}
