<?php
namespace App\DataFixtures;


use DateTime;
use Faker\Factory;
use App\Entity\Post;

use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);
        $faker = Factory::create();
        
      
        // Create 3-10 users...
        for ($n = 0; $n <  random_int(3, 10); $n ++) {
            $user = new User();
            $user->setEmail($faker->email());
            //hash for 'password'. the password is read from db as hashed regardless of environment
            $user->setPassword('$2y$13$oNk3lHQtIRQpEvuMt7VsmO.0r0oG58yCrvwvMtyWEbvqZdrHFxWPO');
            $manager->persist($user);

            //...with 1-10 posts each
            for ($i = 0; $i <  random_int(1, 10); $i++) {
                $post = new Post();
                $date = new DateTime();
                $post->setTitle($faker->sentence());
                $post->setContent($faker->text());
                $post->setDate($date);
                $post->setRating(random_int(0,5));
                $post->setUser($user);
                $manager->persist($post);
            }
        }



        $manager->flush();
    }
}
