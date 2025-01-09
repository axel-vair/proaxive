<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class LoginController extends AbstractController
{
    #[Route('/api/login', name: 'app_login')]
    public function login(Request $request, UserRepository $userRepository, UserPasswordHasherInterface $passwordHasher, JWTTokenManagerInterface $tokenManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if(isset($data['username']) && isset($data['password'])){
            return new JsonResponse(['error' => 'Missing credentials'], 400);
        }
        $user = $userRepository->findOneBy(['email' => $data['email']]);

        if(!$user || !$passwordHasher->isPasswordValid($user, $data['password'])){
            return new JsonResponse(['error' => 'Invalid credentials'], 400);
        }

        $token = $tokenManager->create($user);

        return new JsonResponse(['token' => $token], 200);
    }
}
