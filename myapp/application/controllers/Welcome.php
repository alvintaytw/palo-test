<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */

	public function __construct()
	{
		parent::__construct();
	}
	
	public function index()
	{
		$this->load->view('includes/header');
		$data['dateCalender'] = date("F j, Y");
		$this->load->view('blocks/clock-face',$data);
		$this->load->view('blocks/user-input');
		$this->load->view('includes/footer');
	}

	function input_seconds()
    {
        $data['DECREMENT_BY_SECS'] = $this->input->post('DECREMENT_BY_SECS');
		echo $data['DECREMENT_BY_SECS'];		
    }



	
}
