<script>
    function spawnNotification(theBody,theIcon,theTitle,shouldRequireInteraction) {
        let options = {
            body: theBody,
            icon: theIcon,
            requireInteraction: shouldRequireInteraction
        };
        let notification = new Notification(theTitle,options);
        setTimeout(notification.close.bind(notification), 60000 * 20);

        notification.onclick = function(event) {
            window.parent.parent.focus();
            event.preventDefault();
        }
    }

    function getNewNotifications(url) {

        setTimeout(function(){
            $.get(url, function(data) {

                if (data.cod) {
                    if (notificationsPollingCallback && typeof notificationsPollingCallback === 'function') {
                        // Locally function callback
                        notificationsPollingCallback(data);
                    }
                }

                {{--if (data.length > 0) {--}}
                    {{--data.forEach( function (element) {--}}
                        {{--let logo = '{{config('notification-polling.icon')}}';--}}
                        {{--spawnNotification(element.contenido, logo, element.titulo, true);--}}
                    {{--});--}}
                {{--}--}}

                getNewNotifications(url);

            }).fail(function() {
                setTimeout(function(){
                    getNewNotifications(url);
                }, 10000);
            });
        }, {{config('notification-polling.retry_time') * 1000}});
    }

    $(document).ready( function () {
        Notification.requestPermission();
        getNewNotifications("/notifications/poll");
    });
</script>