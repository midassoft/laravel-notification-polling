<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Maximum Attempts Number
    |--------------------------------------------------------------------------
    |
    | Here you specify the maximum number of attempts before stop the
    | execution of your polling.
    |
    */

    'max_attempts' => 10,

    /*
    |--------------------------------------------------------------------------
    | The Amount Of Time The Polling Should Sleep
    |--------------------------------------------------------------------------
    |
    | Here you specify the time in seconds the poll should way between
    | iterations.
    |
    */

    'sleep_time' => 2,

    /*
    |--------------------------------------------------------------------------
    | The retry time.
    |--------------------------------------------------------------------------
    |
    | Retry time between each interaction with the notification server.
    |
    */

    'retry_time' => 15,

    /*
    |--------------------------------------------------------------------------
    | Project logo.
    |--------------------------------------------------------------------------
    |
    | This logo is used for notifications icon.
    |
    */

    'icon' => 'assets/img/logo.png',

    /*
    |--------------------------------------------------------------------------
    | The host where the new notifications will be searched. If there is no
    | subdomain the notifications will be searched in the main host.
    |--------------------------------------------------------------------------
    |
    */

    'host' => '',

];
