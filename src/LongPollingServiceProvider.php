<?php

namespace LongPolling;

use Illuminate\Support\ServiceProvider;

class LongPollingServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadRoutesFrom(__DIR__.'/routes.php');
        $this->publishes([
            __DIR__.'/config/notification-polling.php' => config_path('notification-polling.php'),
        ]);
    }

    public function register()
    {
        $this->mergeConfigFrom(
            __DIR__.'/config/notification-polling.php',
            'notification-polling'
        );
    }
}
