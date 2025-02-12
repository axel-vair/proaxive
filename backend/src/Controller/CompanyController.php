<?php

namespace App\Controller;

use App\Entity\Company;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

final class CompanyController extends AbstractController
{
    #[Route('/api/admin/company/create', name: 'app_company')]
    #[IsGranted('ROLE_ADMIN')]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $payload = json_decode($request->getContent(), true);

        $company = new Company();
        $company->setName($payload['name']);
        $company->setType($payload['type']);
        $company->setAddress($payload['address']);
        $company->setCity($payload['city']);
        $company->setZipCode($payload['zip_code']);
        $company->setWebsite($payload['website']);
        $company->setCreatedAt(new \DateTimeImmutable());
        $company->setUpdatedAt(new \DateTimeImmutable());

        $entityManager->persist($company);
        $entityManager->flush();

        return $this->json($company, 201);
    }

    #[Route('/api/admin/company/{id}', name: 'app_company_update', methods: ['PUT'])]
    #[IsGranted('ROLE_ADMIN')]
    public function update(Request $request, EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $payload = json_decode($request->getContent(), true);
        $company = $entityManager->getRepository(Company::class)->find($id);

        if (! $company) {
            return $this->json(['error' => 'Company not found'], 404);
        }

        if (isset($payload['name'])) {
            $company->setName($payload['name']);
        }

        if (isset($payload['type'])) {
            $company->setType($payload['type']);
        }

        if (isset($payload['address'])) {
            $company->setAddress($payload['address']);
        }

        if (isset($payload['city'])) {
            $company->setCity($payload['city']);
        }

        if (isset($payload['zip_code'])) {
            $company->setZipCode($payload['zip_code']);
        }

        if (isset($payload['website'])) {
            $company->setWebsite($payload['website']);
        }

        $entityManager->flush();

        return $this->json($company, 200);
    }

    #[Route('/api/admin/company/{id}', name: 'app_company_delete', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN')]
    public function delete(EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $company = $entityManager->getRepository(Company::class)->find($id);

        if (! $company) {
            return $this->json(['error' => 'Company not found'], 404);
        }

        $entityManager->remove($company);
        $entityManager->flush();

        return $this->json(['success' => 'Company deleted successfully'], 200);
    }
}
