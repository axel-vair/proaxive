<?php

declare (strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250212132655 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE task_intervention_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE task_intervention (id INT NOT NULL, task_id INT NOT NULL, intervention_id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_198930868DB60186 ON task_intervention (task_id)');
        $this->addSql('CREATE INDEX IDX_198930868EAE3863 ON task_intervention (intervention_id)');
        $this->addSql('ALTER TABLE task_intervention ADD CONSTRAINT FK_198930868DB60186 FOREIGN KEY (task_id) REFERENCES task (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE task_intervention ADD CONSTRAINT FK_198930868EAE3863 FOREIGN KEY (intervention_id) REFERENCES intervention (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE role');
        $this->addSql('ALTER TABLE customer ADD password VARCHAR(255)');
        $this->addSql("UPDATE customer SET password = 'password' WHERE password IS NULL");
        $this->addSql('ALTER TABLE customer ALTER COLUMN password SET NOT NULL');
        $this->addSql('ALTER TABLE equipment ADD brand_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE equipment ALTER operating_system_id DROP NOT NULL');
        $this->addSql('ALTER TABLE equipment ADD CONSTRAINT FK_D338D58344F5D008 FOREIGN KEY (brand_id) REFERENCES brand (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE equipment DROP CONSTRAINT FK_D338D5839395C3F3');
        $this->addSql('ALTER TABLE equipment ADD CONSTRAINT FK_D338D5839395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_D338D58344F5D008 ON equipment (brand_id)');
        $this->addSql('ALTER TABLE intervention ADD type_id INT NOT NULL');
        $this->addSql('ALTER TABLE intervention ADD status_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE intervention ADD customer_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE intervention DROP type');
        $this->addSql('ALTER TABLE intervention ADD CONSTRAINT FK_D11814ABC54C8C93 FOREIGN KEY (type_id) REFERENCES type_intervention (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE intervention ADD CONSTRAINT FK_D11814AB6BF700BD FOREIGN KEY (status_id) REFERENCES status (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE intervention ADD CONSTRAINT FK_D11814AB9395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_D11814ABC54C8C93 ON intervention (type_id)');
        $this->addSql('CREATE INDEX IDX_D11814AB6BF700BD ON intervention (status_id)');
        $this->addSql('CREATE INDEX IDX_D11814AB9395C3F3 ON intervention (customer_id)');
        $this->addSql('ALTER TABLE "user" ALTER roles TYPE VARCHAR(255)');
        $this->addSql("ALTER TABLE customer ADD CONSTRAINT UQ_8D93D649E7927C74 UNIQUE (email)");
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE task_intervention_id_seq CASCADE');
        $this->addSql('CREATE TABLE role (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE task_intervention DROP CONSTRAINT FK_198930868DB60186');
        $this->addSql('ALTER TABLE task_intervention DROP CONSTRAINT FK_198930868EAE3863');
        $this->addSql('DROP TABLE task_intervention');
        $this->addSql('ALTER TABLE equipment DROP CONSTRAINT FK_D338D58344F5D008');
        $this->addSql('ALTER TABLE equipment DROP CONSTRAINT FK_D338D5839395C3F3');
        $this->addSql('DROP INDEX IDX_D338D58344F5D008');
        $this->addSql('ALTER TABLE equipment DROP brand_id');
        $this->addSql('ALTER TABLE equipment ALTER operating_system_id SET NOT NULL');
        $this->addSql('DELETE FROM "user" WHERE roles IS NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER roles TYPE JSON USING roles::JSON');
        $this->addSql('ALTER TABLE customer DROP password');
        $this->addSql('ALTER TABLE intervention DROP CONSTRAINT FK_D11814ABC54C8C93');
        $this->addSql('ALTER TABLE intervention DROP CONSTRAINT FK_D11814AB6BF700BD');
        $this->addSql('ALTER TABLE intervention DROP CONSTRAINT FK_D11814AB9395C3F3');
        $this->addSql('DROP INDEX IDX_D11814ABC54C8C93');
        $this->addSql('DROP INDEX IDX_D11814AB6BF700BD');
        $this->addSql('DROP INDEX IDX_D11814AB9395C3F3');
        $this->addSql('ALTER TABLE intervention ADD type VARCHAR(255) NULL');
        $this->addSql('ALTER TABLE intervention DROP type_id');
        $this->addSql('ALTER TABLE intervention DROP status_id');
        $this->addSql('ALTER TABLE intervention DROP customer_id');
        $this->addSql('ALTER TABLE customer DROP CONSTRAINT UQ_8D93D649E7927C74');
    }
}
