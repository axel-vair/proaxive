<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

final class ProfileController extends AbstractController
{
    #[Route('/api/profile', name: 'app_user', methods: ['GET'])]
    public function profile(TokenStorageInterface $tokenStorage): JsonResponse
    {

        // Récupérer l'utilisateur connecté
        $this->token = $tokenStorage->getToken();
        $user = $this->getUser();

        // Vérifier si l'utilisateur est authentifié
        if (!$user) {
            return new JsonResponse(['error' => 'Unauthorized'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        // Récupérer les données utilisateur
        $userData = [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
        ];

        return new JsonResponse($userData, JsonResponse::HTTP_OK);
    }

    #[Route('/api/profile', name: 'app_profile', methods: ['PUT'])]
    public function profileUpdate(
        TokenStorageInterface $tokenStorage,
        Request $request,
        EntityManagerInterface $entityManager): JsonResponse
    {
        $this->token = $tokenStorage->getToken();
        $user = $this->getUser();

        $data = json_decode($request->getContent(), true);

        if (!$user) {
            return new JsonResponse(['error' => 'Unauthorized'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        if(isset($data['email'])) {
            $user->setEmail($data['email']);
        }
        if(isset($data['firstName'])) {
            $user->setFirstName($data['firstName']);
        }
        if(isset($data['lastName'])) {
            $user->setLastName($data['lastName']);
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Profil mis à jour avec succès'], JsonResponse::HTTP_OK);    }
}
