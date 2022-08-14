<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EntryController extends AbstractController
{
    //Set priority to -1 to match all except other defined routes
    #[Route('/{any}', name: 'app_entry', priority:-1)]
    public function index(): Response
    {
        return $this->render('base.html.twig');
    }
}
