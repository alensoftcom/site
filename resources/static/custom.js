const mainContent = document.getElementById('main-content');

function getStartPageFromUri() {
    let uri = window.location.href;
    if (uri.includes("#")) {
        return uri.substring(uri.indexOf("#") + 1);
    } else {
        return "0";
    }
}

function autoLoadContent() {
    //console.log("autoLoadContent");
    const redirectInput = document.createElement('input');
    redirectInput.type = 'hidden';
    let startPageFromUri = getStartPageFromUri();
    //console.log("startPageFromUri=", startPageFromUri);
    redirectInput.setAttribute('hx-get', startPageFromUri + '/action');
    redirectInput.setAttribute('hx-target', '#menu');
    redirectInput.setAttribute('hx-trigger', 'load');
    mainContent.appendChild(redirectInput);
    //console.log(redirectInput);
    htmx.process(redirectInput);
}

//fake invocation
hideAllTestCaseContent();

//NOT DELETE (USED after test output)
function hideAllTestCaseContent() {
    var titles = document.querySelectorAll('.testcase');
    titles.forEach(function (title) {
        let content = title.nextElementSibling;
        content.style.display = 'none';
    });
}

function loadContent(url) {
    if (url === 'logout') {
        window.location.href = '/logout';
        return;
    }
    if (url === 'exit' || url === 'fin') {
        if (!confirm('Вы уверены, что хотите завершить приложение?')) {
            return;
        }
    }
    console.log(url);
    mainContent.innerHTML = "";
    fetch(url)
        .then(response => {
            const reader = response.body.getReader();
            let decoder = new TextDecoder();

            function readData() {
                reader.read().then(({done, value}) => {
                    if (done) {
                        console.log('readData() complete');
                        return;
                    }
                    let text = decoder.decode(value, {stream: true});
                    mainContent.innerHTML += text
                    setTestCaseClickListener();
                    readData();
                });
            }

            readData();
        })
        .catch(error => {
            mainContent.innerHTML = "<h1> No access or app stopped...</h1><br>" + (new Date());
            console.error('ERR:', error);
        });
}

function setTestCaseClickListener() {
    var titles = document.querySelectorAll('.test-case');
    titles.forEach(function (title) {
        let content = title.nextElementSibling;
        if (content.getElementsByClassName('failed').length > 0) {
            title.getElementsByTagName('a')[0].style.color = "red"
            // content.style.display = 'block';
        } else {
            title.getElementsByTagName('a')[0].style.color = "green"
            // content.style.display = 'none';
        }
    });
}
