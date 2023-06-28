import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialTables1687958837477 implements MigrationInterface {
    name = 'InitialTables1687958837477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`card\` (\`id\` varchar(36) NOT NULL, \`lane_id\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`label\` varchar(100) NULL, \`description\` text NULL, \`laneId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lane\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(200) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_0e94aa0ee13908c6ccbd6e44326\` FOREIGN KEY (\`laneId\`) REFERENCES \`lane\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_0e94aa0ee13908c6ccbd6e44326\``);
        await queryRunner.query(`DROP TABLE \`lane\``);
        await queryRunner.query(`DROP TABLE \`card\``);
    }

}
