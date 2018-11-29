<?php

Route::get('notifications-poll', function () {
    $attempts = 0;
    $user = Auth::user();

    while (true) {
        if ($user->unreadNotifications->count() > 0) {
            return $user->unreadNotifications->toJson();
        }

        sleep(config('notification-polling.sleep_time'));
        $attempts++;

        if ($attempts > config('notification-polling.max_attempts')) {
            return response()->json([]);
        }

        $user->refresh();
    }
});
