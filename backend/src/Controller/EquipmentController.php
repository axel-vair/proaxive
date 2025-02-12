<?php
namespace App\Controller;

use App\Entity\Brand;
use App\Entity\Customer;
use App\Entity\Equipment;
use App\Entity\OperatingSystem;
use App\Entity\TypeEquipment;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/admin/equipment')]
class EquipmentController extends AbstractController
{
    #[Route('/create', name: 'app_equipment_create', methods: ['POST'])]
    #[IsGranted('ROLE_TECHNICIAN')]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $customer        = $entityManager->getRepository(Customer::class)->find($data['customer_id']);
        $typeEquipment   = $entityManager->getRepository(TypeEquipment::class)->find($data['type_equipment_id']);
        $operatingSystem = $entityManager->getRepository(OperatingSystem::class)->find($data['operating_system_id']);
        $brand           = $entityManager->getRepository(Brand::class)->find($data['brand_id']);

        $equipment = new Equipment();
        $equipment->setName($data['name'] ?? '');
        $equipment->setCustomer($customer ?? null);
        $equipment->setTypeEquipment($typeEquipment);
        $equipment->setOperatingSystem($operatingSystem);
        $equipment->setBrand($brand);
        $equipment->setCreatedAt(new \DateTimeImmutable());
        $equipment->setUpdatedAt(new \DateTimeImmutable());

        $entityManager->persist($equipment);
        $entityManager->flush();

        return new JsonResponse($equipment, 201);
    }

    #[Route('/{id}', name: 'app_equipment_edit', methods: ['PUT'])]
    #[IsGranted('ROLE_TECHNICIAN')]
    public function edit(Request $request, EntityManagerInterface $entityManagerInterface, SerializerInterface $serializer, int $id): JsonResponse
    {
        $payload = json_decode($request->getContent(), true);

        $equipment = $entityManagerInterface->getRepository(Equipment::class)->find($id);

        if (! $equipment) {
            return new JsonResponse(['error' => 'Equipment not found'], 404);
        }

        if (isset($payload['name'])) {
            $equipment->setName($payload['name']);
        }

        if (isset($payload['customer_id'])) {
            $customer = $entityManagerInterface->getRepository(Customer::class)->find($payload['customer_id']);
            $equipment->setCustomer($customer);
        }

        if (isset($payload['type_equipment_id'])) {
            $typeEquipment = $entityManagerInterface->getRepository(TypeEquipment::class)->find($payload['type_equipment_id']);
            $equipment->setTypeEquipment($typeEquipment);
        }

        if (isset($payload['operating_system_id'])) {
            $operatingSystem = $entityManagerInterface->getRepository(OperatingSystem::class)->find($payload['operating_system_id']);
            $equipment->setOperatingSystem($operatingSystem);
        }

        if (isset($payload['brand_id'])) {
            $brand = $entityManagerInterface->getRepository(Brand::class)->find($payload['brand_id']);
            $equipment->setBrand($brand);
        }

        $equipment->setUpdatedAt(new \DateTimeImmutable());

        $entityManagerInterface->flush();

        return new JsonResponse($equipment, 200);
    }

    #[Route('/{id}', name: 'app_equipment_delete', methods: ['DELETE'])]
    #[IsGranted('ROLE_TECHNICIAN')]
    public function delete(EntityManagerInterface $entityManagerInterface, int $id): JsonResponse
    {
        $equipment = $entityManagerInterface->getRepository(Equipment::class)->find($id);

        if (! $equipment) {
            return new JsonResponse(['error' => 'Equipment not found'], 404);
        }

        $entityManagerInterface->remove($equipment);
        $entityManagerInterface->flush();

        return new JsonResponse(['message' => 'Equipment deleted'], 200);
    }
}
