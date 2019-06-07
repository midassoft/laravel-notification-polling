<?php

use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification as NotificationFacade;
use Illuminate\Support\Facades\Route;

//Route::prefix('notifications')
//    ->middleware(['auth'])
//    ->group(function () {
//        // READ
//        Route::put('/read', function () {
//            $updated = Auth::user()
//                ->unreadNotifications()
//                ->where('id', request('id'))
//                ->first()
//                ->markAsRead();
//            return response(null, 204);
//        });
//
//        // SEND TEST:
//        Route::get('/send-test', function () {
//
//            dd(\Illuminate\Support\Facades\Auth::user());
//
//            NotificationFacade::send(\Illuminate\Support\Facades\Auth::user(), new class() extends Notification {
//                public function via()
//                {
//                    return ['database'];
//                }
//
//                public function toArray()
//                {
//                    return ['message' => 'welcome'];
//                }
//            });
//        });
//
//        // EXECUTE POLL
//        Route::get('notifications-poll', function () {
//            $attempts = 0;
//
//            while (true) {
//                if (Auth::user()->unreadNotifications->count() > 0) {
//                    return Auth::user()->unreadNotifications->toJson();
//                }
//
//                sleep(config('notification-polling.sleep_time'));
//                $attempts++;
//
//                if ($attempts > config('notification-polling.max_attempts')) {
//                    return response()->json([]);
//                }
//
//                Auth::user()->refresh();
//            }
//        });
//    });
