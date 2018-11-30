<?php

Route::get('notifications-poll', function () {
    $attempts = 0;

    while (true) {
        if (Auth::user()->unreadNotifications->count() > 0) {
            return Auth::user()->unreadNotifications->toJson();
        }

        sleep(config('notification-polling.sleep_time'));
        $attempts++;

        if ($attempts > config('notification-polling.max_attempts')) {
            return response()->json([]);
        }

        Auth::user()->refresh();
    }
});

Route::put('read-notification', function () {
    $updated = Auth::user()
                    ->unreadNotifications()
                    ->where('id', request('id'))
                    ->first()
                    ->markAsRead();

    return response(null, 204);
})->middleware('auth');