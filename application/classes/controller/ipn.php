<?php defined('SYSPATH') or die('No direct script access.');

/*
 * Paypal callback controller
 *
 * @author      Pap Tamas
 * @author      Jason Nathan
 * @package		RealtAsia APP
 * @copyright   (c) 2012-2013 Pap Tamas
 * @category    Controllers
 * @website		https://github.com/paptamas/kohana-paypal-ipn
 * @license		http://www.opensource.org/licenses/isc-license.txt
 */

class Controller_Ipn extends Controller_Auth {

	/**
	 * Whether to log or not errors
	 *
	 * @var boolean
	 */
	public $log_errors = TRUE;

	/**
	 * Whether to use or not SSL when connecting to paypal
	 *
	 * @var bool
	 */
	public $use_ssl = TRUE;

	/**
	 * Listener's timeout
	 *
	 * @var int
	 */
	public $timeout = 30;

	/**
	 * PapPal IPN listener instance
	 *
	 * @var PayPal_IPN_Listener
	 */
	protected $_listener;


	/**
	 * MongoID of the saved payment
	 * 
	 * @var MongoID
	 */
	protected $_payment_id = null;

	/**
	 * The expected receiver email
	 *
	 * This should be your primary paypal email address or, if using sandbox,
	 * the email address of your seller test user.
	 */
	public $expected_receiver_email = null;
	
	public function before()
	{
		$this->expected_receiver_email = Kohana::$environment === Kohana::PRODUCTION ? 'admin@realtasia.com' : 'sandpayer@realtasia.com';
		parent::before();
	} 

	/**
	 * Main method
	 */
	public function action_index() {
		// Create and set up listener
		$this -> _listener = Ipn::factory();
		$this -> _listener -> use_ssl = $this -> use_ssl;
		$this -> _listener -> timeout = $this -> timeout;

		try {
			// Process the notification
			$this -> _listener -> process_ipn($this -> request -> post());

			if ($this -> _listener -> is_verified()) {
				// The payment is VERIFIED, process it
				$this -> _process_verified_payment();
			} else {
				// The payment is INVALID, process it
				$this -> _process_invalid_payment();
			}
		} catch (Exception $e) {
			// Something went wrong, log the error
			if ($this -> log_errors) {
				Log::instance() -> add(Log::NOTICE, $e -> getMessage());
			}

			throw new HTTP_Exception_403('You cannot access this page directly');
		}
	}

	public function action_paymentsuccess() {
		$this -> action_index();
		
		$status = @$this->_listener->get_post_data('payment_status');
		
		$pid = $this->_payment_id ? $this->_payment_id : null;
		
		$view = $status === "Completed" ? 'paypal/success' : 'paypal/pending';
		
		
		$this->template->content = View::factory($view, [
			'pid' => $pid
		]);
	}

	public function action_paymentcancel($process = false) {
		if ($process)
			$this -> action_index();

		$this -> template -> content = View::factory('paypal/cancel');
	}

	/**
	 * Called by AJAX method from front_end
	 */
	public function action_paymentvalidate()
	{
		// not a view to render
		$this->auto_render = false;
		// get id from $_GET
		$id = $this->request->query('id');
		
		//set response to send JSON
	    $this->response->headers('Content-type', 'application/json');	
		
		// cannot do much without an id.	
		if(!$id)
			throw new HTTP_Exception_403("No ID given for user activation");
		
		// get the document from the DB
		$p = Document::factory('payment', $id);
		
		// load it :)
		$p->load();
		
		// extract realtasia values stored in the payment
		$realt_vars = json_decode($p->custom, true);
		
		// extract the whole chunk of paypal values stored in a JSON string.
		$paypal_vars = json_decode($p->info, true);
		
		// can't move forward without realt vars
		if ($realt_vars) {
			// this will call the API method that does the needed and sends the emails.
			$response = Api::request('/user/update/', [
				'request_type' => 'activate', 
				'transaction_id' => $p->transaction_id, 
				'mode' => \Arr::get($paypal_vars, 'payment_type'),
				'mc_gross' => \Arr::get($paypal_vars, 'mc_gross'),
				'payment_date' => \Arr::get($paypal_vars, 'payment_date'),
				'payer_email' => \Arr::get($paypal_vars, 'payer_email'),
				'item_name' => \Arr::get($paypal_vars, 'item_name'),
				'item_number' => \Arr::get($paypal_vars, 'item_number'),
				'access_token' => $this->token(),
				'uid' => \Arr::get($realt_vars, 'uid'),
				'cuid' => \Arr::get($realt_vars, 'cuid')
			], HTTP_Request::POST);

			// return the response/
	        return $this->response->body($response->as_json());
		}		
	}

	/**
	 * Process a verified payment
	 */
	protected function _process_verified_payment() {
		switch ($this->_listener->payment_status()) {
			case 'Completed' :
				$this -> _process_completed_payment();
				break;
			case 'Pending' :
				$this -> _process_pending_payment();
				break;
			case 'Denied' :
				$this -> _process_denied_payment();
				break;
			case 'Refunded' :
				$this -> _process_refunded_payment();
				break;
			case 'Reversed' :
				$this -> _process_reversed_payment();
				break;
			case 'Canceled_Reversal' :
				$this -> _process_canceled_reversal_payment();
				break;
		}
	}

	/**
	 * Process an invalid payment
	 */
	protected function _process_invalid_payment() {
		/**
		 * Do something with this invalid payment, for example save the
		 * text report (($this->_listener->get_text_report())) to db, or just ignore it.
		 */
		$this -> _check_and_save();
		$this -> action_paymentcancel(false);
	}

	/**
	 * Process completed payment
	 */
	protected function _process_completed_payment() {
		$this -> _check_and_save();
	}

	/**
	 * Process pending payment
	 */
	protected function _process_pending_payment() {
		$this -> _check_and_save();
	}

	/**
	 * Process denied payment
	 */
	protected function _process_denied_payment() {
		$this -> _check_and_save();
	}

	/**
	 * Process refunded payment
	 */
	protected function _process_refunded_payment() {
		$this -> _check_and_save();
	}

	/**
	 * Process reversed payment
	 */
	protected function _process_reversed_payment() {
		$this -> _check_and_save();
	}

	/**
	 * Process canceled reversal payment
	 */
	protected function _process_canceled_reversal_payment() {
		$this -> _check_and_save();
	}

	/**
	 * Check if the receiver email is the expected one, and the transaction
	 * is unique. If yes, save the payment to database.
	 */
	protected function _check_and_save() {
		Log::instance() -> add(Log::NOTICE, print_r($this -> request -> post(), true));
		if ($this -> _listener -> check_email($this -> expected_receiver_email)) {
			if ($this -> _listener -> is_unique_transaction()) {
				// Save payment to db
				$id = $this -> _listener -> save_payment();
				if($id)
				{
					$this->_payment_id = $id;
				}
			} else {
				// This transaction id was already used
				if ($this -> log_errors) {
					$message = strtr('Not unique transaction: [:transaction_id] [:payment_status].', [':transaction_id' => $this -> _listener -> get_post_data('txn_id'), ':payment_status' => $this -> _listener -> get_post_data('payment_status')]);
					Log::instance() -> add(Log::NOTICE, $message);
				}
			}
		} else {
			// The receiver email address is not the expected one
			if ($this -> log_errors) {
				$message = strtr('Email addresses does not match: [:email_posted] [:email_expected].', [':email_posted' => $this -> _listener -> get_post_data('receiver_email'), ':email_expected' => $this -> expected_receiver_email]);
				Log::instance() -> add(Log::NOTICE, $message);
			}
		}
	}

}

// END Kohana_Controller_PayPal_IPN
