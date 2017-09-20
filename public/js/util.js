var Http = (function () {
    function get(uri, callback) {

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {

            if (request.readyState === 4) {
                switch (request.status) {
                    case 200:
                        var response = JSON.parse(request.responseText);
                        callback(response);
                        break;

                    default:
                        console.error('Status: ' + request.status + ' --- Error : ' + request.responseText);
                        break;
                }
            }
        }

        request.open('GET', uri);
        request.send();
    }

    return {
        get: get
    }

})();