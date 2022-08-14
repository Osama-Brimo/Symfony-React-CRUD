<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\Type\UserType;
use App\Repository\UserRepository;
use Doctrine\Persistence\ManagerRegistry;
use Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\PasswordHasher\PasswordHasherInterface;

#[Route('/api', name: 'api')]
class UserController extends AbstractController
{
    // #[Route('/user', name: 'app_user')]
    // public function index(UserRepository $users): Response
    // {
    //     $users = $users->findAll();
    //     return $this->json($users, 200, [], ['groups' => ['user', 'posts', 'post']]);
    // }

    #[Route('/user/{id}', methods: ['GET'])]
    public function show(User $user)
    {
        return $this->json($user, 200, [], ['groups' => ['user', 'posts', 'post']]);
    }

    #[Route('/user/{id}', methods: ['PUT'])]
    public function update(User $user, Request $req, ManagerRegistry $doctrine, UserPasswordHasherInterface $hasher): Response
    {
        $data = json_decode($req->getContent());
        $loggedInUser = $this->getUser();
        if (!$loggedInUser || $loggedInUser->getId() !== $user->getId()) {
            throw new UnauthorizedHttpException('', 'Unauthorized');
        }


        $hashed = $hasher->hashPassword($user, $data->password);
        $user->setEmail($data->username);
        $user->setPassword($hashed);

        $form = $this->createForm(UserType::class, $user);

        //form needs to see an associative array, not a class
        $form->submit(['email' => $data->username, 'password' => $hashed]);

        if ($form->isValid()) {
            $entityManager = $doctrine->getManager();
            $entityManager->persist($user);
            $entityManager->flush();
        } else {
            return $this->json($form->getErrors());
        }

        //todo: log the user in afterwards

        return $this->json($user);
    }

    #[Route('/user/{id}', methods: ['DELETE'])]
    public function destroy(User $user, ManagerRegistry $doctrine)
    {
        //todo only allow if the user or an admin is the one requesting deletion
        try {
            $entityManager = $doctrine->getManager();
            $entityManager->remove($user);
            $entityManager->flush();
        } catch (Exception $err) {
            return $this->json('error');
        }

        return $this->json([
            'message' => ['text' => 'user deleted!', 'level' => 'success']
        ]);
    }
}
