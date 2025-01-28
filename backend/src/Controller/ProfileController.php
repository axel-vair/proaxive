<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
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
}
