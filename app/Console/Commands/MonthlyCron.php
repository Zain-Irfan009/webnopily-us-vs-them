<?php

namespace App\Console\Commands;

use App\Http\Controllers\ProductController;
use Illuminate\Console\Command;

class MonthlyCron extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'monthly:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $product_controller=new ProductController();
        $product_controller->MonthlyCharge();
    }
}
