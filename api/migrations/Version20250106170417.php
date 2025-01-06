<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250106170417 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE intervention DROP CONSTRAINT fk_d11814ab517fe9fe');
        $this->addSql('DROP SEQUENCE equipement_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE equipment_type_id_seq CASCADE');
        $this->addSql('CREATE TABLE type_equipment (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('DROP TABLE equipment_type');
        $this->addSql('DROP TABLE equipement');
        $this->addSql('ALTER TABLE equipment DROP CONSTRAINT fk_d338d58344f5d008');
        $this->addSql('ALTER TABLE equipment DROP CONSTRAINT fk_d338d583a391d4ad');
        $this->addSql('DROP INDEX idx_d338d583a391d4ad');
        $this->addSql('DROP INDEX idx_d338d58344f5d008');
        $this->addSql('ALTER TABLE equipment ADD type_equipment_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE equipment ADD name VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE equipment ADD created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL');
        $this->addSql('ALTER TABLE equipment ADD updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL');
        $this->addSql('ALTER TABLE equipment DROP brand_id');
        $this->addSql('ALTER TABLE equipment DROP operating_system_id');
        $this->addSql('COMMENT ON COLUMN equipment.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN equipment.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE equipment ADD CONSTRAINT FK_D338D583D63C53FB FOREIGN KEY (type_equipment_id) REFERENCES type_equipment (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_D338D583D63C53FB ON equipment (type_equipment_id)');
        $this->addSql('DROP INDEX idx_d11814ab517fe9fe');
        $this->addSql('ALTER TABLE intervention DROP equipment_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE equipment DROP CONSTRAINT FK_D338D583D63C53FB');
        $this->addSql('CREATE SEQUENCE equipement_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE equipment_type_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE equipment_type (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE equipement (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN equipement.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN equipement.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('DROP TABLE type_equipment');
        $this->addSql('DROP INDEX IDX_D338D583D63C53FB');
        $this->addSql('ALTER TABLE equipment ADD operating_system_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE equipment DROP name');
        $this->addSql('ALTER TABLE equipment DROP created_at');
        $this->addSql('ALTER TABLE equipment DROP updated_at');
        $this->addSql('ALTER TABLE equipment RENAME COLUMN type_equipment_id TO brand_id');
        $this->addSql('ALTER TABLE equipment ADD CONSTRAINT fk_d338d58344f5d008 FOREIGN KEY (brand_id) REFERENCES brand (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE equipment ADD CONSTRAINT fk_d338d583a391d4ad FOREIGN KEY (operating_system_id) REFERENCES operating_system (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_d338d583a391d4ad ON equipment (operating_system_id)');
        $this->addSql('CREATE INDEX idx_d338d58344f5d008 ON equipment (brand_id)');
        $this->addSql('ALTER TABLE intervention ADD equipment_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE intervention ADD CONSTRAINT fk_d11814ab517fe9fe FOREIGN KEY (equipment_id) REFERENCES equipement (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_d11814ab517fe9fe ON intervention (equipment_id)');
    }
}
