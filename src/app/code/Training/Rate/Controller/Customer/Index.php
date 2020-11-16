<?php

namespace Training\Rate\Controller\Customer;

use Magento\Customer\Model\Session;
use Magento\Customer\Model\Url;
use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\App\ResponseInterface;
use Magento\Framework\Exception\NotFoundException;

class Index extends Action
{
    /** @var Session */
    protected $_customerSession;

    public function __construct(
        Context $context,
        Session $customerSession
    ) {
        $this->_customerSession = $customerSession;

        parent::__construct($context);
    }

    /**
     * @param RequestInterface $request
     *
     * @return ResponseInterface
     * @throws NotFoundException
     */
    public function dispatch(RequestInterface $request)
    {
        $loginUrl = $this->_objectManager->get(Url::class)->getLoginUrl();

        if (!$this->_customerSession->authenticate($loginUrl)) {
            $this->_actionFlag->set('', self::FLAG_NO_DISPATCH, true);
        }

        return parent::dispatch($request);
    }

    public function execute(): void
    {
        $this->_view->loadLayout();

        if ($block = $this->_view->getLayout()->getBlock('rate_customer')) {
            $block->setRefererUrl($this->_redirect->getRefererUrl());
        }

        $this->_view->getPage()->getConfig()->getTitle()->set(__('Rate This Store'));
        $this->_view->renderLayout();
    }
}
