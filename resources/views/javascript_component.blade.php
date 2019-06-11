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

    function getNewMessages(url) {

        setTimeout(function(){
            $.get(url, function(data) {
                data = JSON.parse(data);

                if (data.length > 0) {
                    data.forEach( function (element) {
                        let logo = '{{config('notification-polling.icon')}}';
                        spawnNotification(element.contenido, logo, element.titulo, true);
                    });
                }

                getNewMessages(url);

            }).fail(function() {
                setTimeout(function(){
                    getNewMessages(url);
                }, 5000);
            });
        }, 5000);
    }

    $(document).ready( function () {
        Notification.requestPermission();
        getNewMessages("/notifications/poll");
    });
</script>