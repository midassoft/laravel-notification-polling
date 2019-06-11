<?php

namespace LongPolling;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class LongPollingServiceProvider extends ServiceProvider
{
    /**
     *
     */
    public function boot()
    {
        $this->loadRoutesFrom(__DIR__.'/routes.php');
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'notification-polling');
        $this->publishes([
            __DIR__.'/config/notification-polling.php' => config_path('notification-polling.php'),
        ]);

        // Components
        Blade::component('notification-polling::javascript_component', 'np_js');
    }

    /**
     *
     */
    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'/config/notification-polling.php', 'notification-polling');
    }
}
