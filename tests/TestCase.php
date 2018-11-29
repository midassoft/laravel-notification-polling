<?php

namespace Tests;

use Illuminate\Foundation\Testing\RefreshDatabase;
use LongPolling\LongPollingServiceProvider;
use Orchestra\Testbench\TestCase as OrchestraTestCase;

class TestCase extends OrchestraTestCase
{
    use RefreshDatabase;

    public function setUp()
    {
        parent::setUp();

        $this->withFactories(__DIR__.'/Feature/factories');
        $this->loadLaravelMigrations();
//        $this->artisan('notifications:table')->run();
    }

    protected function getEnvironmentSetUp($app)
    {
        $app['config']->set('database.default', 'testbench');
        $app['config']->set('database.connections.testbench', [
            'driver'   => 'sqlite',
            'database' => ':memory:',
            'prefix'   => '',
        ]);
    }

    protected function getPackageProviders($app)
    {
        return [LongPollingServiceProvider::class];
    }
}
