<?php

namespace App\Controller;

use DateTime;
use Exception;

use App\Entity\Post;
use DateTimeInterface;
use App\Form\Type\PostType;
use App\Repository\PostRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

#[Route('/api', name: 'api')]
class PostController extends AbstractController
{
    #[Route('/posts', name: 'app_post')]
    public function index(PostRepository $posts): Response
    {
        // The json method of the AbstractController by default uses PHP's json_encode.
        // However, if circular references exist, this will cause json_encode to return empty
        // objects.

        // To fix this, we use symfony/serializer-pack which makes the json method
        // use that serializer by default. A 'context' is then added, which is a way of
        // specifying exactly what we want to return based on groups defined in the entity files.

        $posts = $posts->findAll();
        return $this->json($posts, 200, [], ['groups' => ['post', 'owner', 'user']]);
    }

    #[Route('/posts/{id}', methods: ['GET'])]
    public function show(Post $post)
    {
        return $this->json($post, 200, [], ['groups' => ['post', 'owner', 'user']]);
    }

    #[Route('/posts/create', methods: ['POST'])]
    public function store(Request $req, ManagerRegistry $doctrine)
    {
        $user = $this->getUser();

        if (!$user) {
            throw new AccessDeniedException('Must be logged in to create posts.');
        }

        $post = new Post();
        $data = json_decode($req->getContent());

        $now = new DateTime();

        $post->setTitle($data->title);
        $post->setContent($data->content);
        $post->setDate($now);
        $post->setUser($user);

        $entityManager = $doctrine->getManager();
        $entityManager->persist($post);
        $entityManager->flush();

        return $this->json($post, 200, [], ['groups' => ['post', 'owner', 'user']]);
    }

    #[Route('/posts/{id}', methods: ['PUT'])]
    public function update(Post $post, Request $req, ManagerRegistry $doctrine)
    {
        $data = json_decode($req->getContent());
        $user = $this->getUser();
        $postCreator = $post->getUser();

        if (!$user || $user->getId() !== $postCreator->getId()) {
            throw new UnauthorizedHttpException('', 'Unauthorized');
        }

        $data = json_decode($req->getContent());

        $post->setTitle($data->title);
        $post->setContent($data->content);
        $entityManager = $doctrine->getManager();
        $entityManager->flush();

        return $this->json($post, 200, [], ['groups' => ['post', 'owner', 'user']]);
    }

    #[Route('/posts/{id}', methods: ['DELETE'])]
    public function destroy(Post $post, ManagerRegistry $doctrine)
    {
        $user = $this->getUser();
        $postCreator = $post->getUser();
        if (!$user || $user->getId() !== $postCreator->getId()) {
            throw new UnauthorizedHttpException('', 'Unauthorized');
        }

        try {
            $entityManager = $doctrine->getManager();
            $entityManager->remove($post);
            $entityManager->flush();
        } catch (Exception $err) {
            return $this->json($err);
        }

        return $this->json([
            'message' => ['text' => 'user deleted!', 'level' => 'success']
        ]);
    }
}
