<?php

namespace App\Controller;

use App\Entity\Customer;
use App\Entity\Intervention;
use App\Entity\Status;
use App\Entity\TypeIntervention;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/admin/intervention')]
class InterventionController extends AbstractController
{
    #[Route('/create', name: 'app_intervention_create', methods: ['POST'])]
    #[IsGranted('ROLE_TECHNICIAN')]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $payload = json_decode($request->getContent(), true);

        $typeIntervention = $entityManager->getRepository(TypeIntervention::class)->find($payload['type_intervention_id']);
        $status = $entityManager->getRepository(Status::class)->find($payload['status_id']);
        $customer = $entityManager->getRepository(Customer::class)->find($payload['customer_id']);

        $intervention = new Intervention();
        $intervention->setTitle($payload['title']);
        $intervention->setDescription($payload['description']);
        $intervention->setType($typeIntervention);
        $intervention->setStatus($status);
        $intervention->setCustomer($customer);
        $intervention->setCreatedAt(new \DateTimeImmutable());
        $intervention->setUpdatedAt(new \DateTimeImmutable());

        $entityManager->persist($intervention);

        $entityManager->flush();

        return $this->json($intervention, 201);

    }

    #[Route('/{id}', name: 'app_intervention_update', methods: ['PUT'])]
    #[IsGranted('ROLE_TECHNICIAN')]
    public function edit(Request $request, EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $payload = json_decode($request->getContent(), true);

        $intervention = $entityManager->getRepository(Intervention::class)->find($id);

        if (! $intervention) {
            return $this->json(['error' => 'Intervention not found'], 404);
        }

        if (isset($payload['title'])) {
            $intervention->setTitle($payload['title']);
        }

        if (isset($payload['description'])) {
            $intervention->setDescription($payload['description']);
        }

        if (isset($payload['type_intervention_id'])) {
            $typeIntervention = $entityManager->getRepository(TypeIntervention::class)->find($payload['type_intervention_id']);
            $intervention->setType($typeIntervention);
        }

        $intervention->setUpdatedAt(new \DateTimeImmutable());

        $entityManager->flush();

        return $this->json($intervention, 200);
    }

    #[Route('/{id}', name: 'app_intervention_delete', methods: ['DELETE'])]
    #[IsGranted('ROLE_TECHNICIAN')]
    public function delete(EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $intervention = $entityManager->getRepository(Intervention::class)->find($id);

        if (! $intervention) {
            return $this->json(['error' => 'Intervention not found'], 404);
        }

        $entityManager->remove($intervention);
        $entityManager->flush();

        return $this->json(['success' => 'Intervention deleted successfully'], 200);
    }
}
