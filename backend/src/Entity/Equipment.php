<?php

namespace App\Entity;

use App\Repository\EquipmentRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EquipmentRepository::class)]
class Equipment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $updated_at = null;

    #[ORM\ManyToOne(inversedBy: 'equipment')]
    private ?Customer $customer = null;

    #[ORM\ManyToOne(inversedBy: 'equipment')]
    private ?TypeEquipment $type_equipment = null;

    #[ORM\ManyToOne(inversedBy: 'equipment')]
    private ?OperatingSystem $operating_system = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(\DateTimeImmutable $updated_at): static
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): static
    {
        $this->customer = $customer;

        return $this;
    }

    public function getTypeEquipment(): ?TypeEquipment
    {
        return $this->type_equipment;
    }

    public function setTypeEquipment(?TypeEquipment $type_equipment): static
    {
        $this->type_equipment = $type_equipment;

        return $this;
    }

    public function getOperatingSystem(): ?OperatingSystem
    {
        return $this->operating_system;
    }

    public function setOperatingSystem(?OperatingSystem $operating_system): static
    {
        $this->operating_system = $operating_system;

        return $this;
    }
}
