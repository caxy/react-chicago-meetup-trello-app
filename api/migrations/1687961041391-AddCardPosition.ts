import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCardPosition1687961041391 implements MigrationInterface {
    name = 'AddCardPosition1687961041391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`position\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`position\``);
    }

}
