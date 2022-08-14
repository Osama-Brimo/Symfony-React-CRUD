<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\Type\UserType;
use Doctrine\ORM\EntityManager;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/api', name: 'api')]
class APIAuthController extends AbstractController
{
    #[Route('/login', name: '_login', methods: ['POST'])]
    public function login(): JsonResponse
    {
        $user = $this->getUser();
        return $this->json($user, 200, [], ['groups' => ['user', 'posts', 'post']]);
    }

    #[Route('/register', name: '_register', methods: ['POST'])]
    public function register(UserPasswordHasherInterface $hasher, ManagerRegistry $doctrine ,Request $req)
    {

        if ($this->getUser()) {
            return $this->createAccessDeniedException('Logged in users cannot register.');
        }


        $user = new User();
        $data = json_decode($req->getContent());

        $hashed = $hasher->hashPassword($user, $data->password);
        $user->setEmail($data->username);
        $user->setPassword($hashed);

        $form = $this->createForm(UserType::class, $user);

        //form needs to see an associative array, not a class
        $form->submit([ 'email' => $data->username, 'password' => $hashed ]);

        if ($form->isValid()) {
            $entityManager = $doctrine->getManager();
            $entityManager->persist($user);
            $entityManager->flush();
        } else {
            return $this->json($form->getErrors());
        }

        //todo: log the user in afterwards

        return $this->json('register route');
    }

    #[Route('/logout', name: '_logout', methods: ['GET'])]
    public function logout()
    {
        return $this->json('logout route');
    }

    #[Route('/current_user', name: '_current_user', methods:['GET'])]
    public function currentUser() {
        $user = $this->getUser();
        return $this->json($user, 200, [], ['groups' => ['user', 'posts', 'post']]);
    }
}
