<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class RegistrationController extends AbstractController
{
    #[Route('/api/register', name: 'app_register')]
    public function register(Request $request,
                             EntityManagerInterface $entityManager,
                             UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $payload = $request->getPayload();
        $user = new User();
        $user->setEmail($payload->get('email'));
        $user->setFirstName($payload->get('first_name'));
        $user->setLastName($payload->get('last_name'));
        $user->setRoles(['ROLE_USER']);
        $plaintextPassword = $payload->get('password');
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );
        $user->setPassword($hashedPassword);
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(["success" => "User registred successfully"], 201);
    }
}
