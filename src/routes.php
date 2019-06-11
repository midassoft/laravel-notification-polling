<?php

use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification as NotificationFacade;
use Illuminate\Support\Facades\Route;

Route::prefix('notifications')
    ->middleware(['web','auth'])
    ->group(function () {
        // READ
        Route::put('/read', function () {
            $updated = Auth::user()
                ->unreadNotifications()
                ->where('id', request('id'))
                ->first()
                ->markAsRead();
            return response(null, 204);
        });

        // SEND TEST:
        Route::get('/send-test', function () {
            if (! App::environment('local')) {
                // The environment is local
                return false;
            }
            NotificationFacade::send(\Illuminate\Support\Facades\Auth::user(), new class() extends Notification {
                public function via()
                {
                    return ['database'];
                }

                public function toArray()
                {
                    return ['message' => 'welcome'];
                }
            });
        });

        // EXECUTE POLL
        Route::get('/poll', function () {
            $attempts = 0;

            while (true) {
                $notification_number = Auth::user()->unreadNotifications->count();
                if ($notification_number > 0) {
                     return response()->json(['cod' => '00', 'number' => $notification_number]);
                }

                sleep(config('notification-polling.sleep_time'));
                $attempts++;

                if ($attempts > config('notification-polling.max_attempts')) {
                    return response()->json(['cod' => '01']);
                }

                Auth::user()->refresh();
            }
        });

        // EXECUTE POLL
        Route::get('/new-notifications', function () {
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
    });
