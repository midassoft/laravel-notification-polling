<?php

namespace Tests\Feature;

use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Notification as NotificationFacade;
use Tests\TestCase;

class LongPollingServerTest extends TestCase
{
    private $user;
    private $notification;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();

        NotificationFacade::send($this->user, new class() extends Notification {
            public function via()
            {
                return ['database'];
            }
            public function toArray()
            {
                return ['message' => 'welcome'];
            }
        });

        $this->notification = $this->user->unreadNotifications()->first();
    }

    /** @test */
    public function it_should_receive_a_list_of_notifications()
    {
        $response = $this->actingAs($this->user)
                         ->get('/notifications-poll');

        $response
            ->assertStatus(200)
            ->assertJsonCount(1)
            ->assertJson([0 => ['data' => ['message' => 'welcome']]]);
    }

    /** @test */
    public function it_can_read_notification()
    {
        $this->withoutExceptionHandling();

        $response = $this->actingAs($this->user)
            ->put('/read-notification', ['id' => $this->notification->id]);

        $response->assertStatus(204);
    }
}
