<?php
//test
namespace Zeega\CoreBundle\Service;

use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityRepository;

use Zeega\DataBundle\Entity\Task;

class QueueingService
{
    public function __construct($securityContext, $doctrine, $rabbitmq) 
    {
        $this->securityContext = $securityContext;
        $this->doctrine = $doctrine;
        $this->rabbitmq = $rabbitmq;
    }

    public function enqueueTask($name, $arguments, $routingKey = 'celery', $prefix = null) 
    {
        if($this->securityContext->isGranted('IS_AUTHENTICATED_FULLY')) {            
            $user = $this->securityContext->getToken()->getUser();
            $currentTime = new \DateTime("now");

            // create a new task on the database for tracking purposes
            $task = new Task();
            $task->setUser($user);
            $task->setStatus("scheduled");
            $task->setDateCreated($currentTime);
            $task->setDateUpdated($currentTime);
            
            $em = $this->doctrine->getEntityManager();
            $em->persist($task);
            $em->flush();                

            try {
                // enqueue the task
                $id = $routingKey . "." .$task->getId();
                $msg = array("id" => $id,  "task" => $name, "args" => $arguments);  
                $this->rabbitmq->publish(str_replace('\/','/',json_encode($msg)), $routingKey,  array('content_type' => 'application/json', 'delivery_mode' => 2));
                return var_dump($msg);
            } catch (Exception $e) {
                $task->setStatus("failed");
                $task->setMessage("Error posting the task to the queue." . $e->getMessage());
                $em->persist($task);
                $em->flush();
                throw $e;
            }
        }
    }

    public function enqueueCeleryMessage($msg, $taskName, $routingKey = 'celery') 
    {
        try {
            if(null === $msg) {
                throw new \BadFunctionCallException('The msg parameter cannot be null.');
            }

            if(null === $taskName) {
                throw new \BadFunctionCallException('The taskName parameter is mandatory.');
            }

            $amqpMessage = array("id" => uniqid(), "task" => $taskName, "kwargs" => $msg);

            $this->rabbitmq->publish(json_encode($amqpMessage), $routingKey,  array('content_type' => 'application/json', 'delivery_mode' => 2));
        } catch (Exception $e) {
            throw $e;
        }
    }
}