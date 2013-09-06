<?php

/*
* This file is part of Zeega.
*
* (c) Zeega <info@zeega.org>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

namespace Zeega\CommunityBundle\Controller;

use Zeega\CoreBundle\Controller\BaseController;
use Symfony\Component\HttpFoundation\Response;

class CommunityController extends BaseController
{
    
    public function homeAction()
    {
        $queryFields = array("description","tags","id", "title", "thumbnail_url", "attribution_uri");
        $collections = $this->forward('ZeegaApiBundle:Items:getItemsSearch', array(), array("collection" => 94088, "fields" => $queryFields))->getContent();
        return $this->render('ZeegaCommunityBundle:Home:home.html.twig',array('collections' => $collections));
    }
    
    public function userAction($id)
    {
        $user = $this->getDoctrine()->getEntityManager()->getRepository('ZeegaDataBundle:User')->findOneById($id);
        $projects = $this->forward('ZeegaApiBundle:Users:getUserProjects', array("id" => $id))->getContent();
        $loggedUser = $this->get('security.context')->getToken()->getUser();

        return $this->render('ZeegaCommunityBundle:User:user.html.twig',array('user'=>$user, 'logged_user'=>$loggedUser, 'user_projects' => $projects));
    }
    
    public function dashboardAction()
    {      
        $userId = $this->get('security.context')->getToken()->getUser()->getId();
        return $this->redirect($this->generateUrl('ZeegaCommunityBundle_user',array('id'=>$userId),true), 301);  
    }
    
}
