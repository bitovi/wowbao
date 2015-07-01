var link = document.getElementById('wowbao-be-social');

var iframe = document.createElement('iframe');

iframe.style.height = '594px';
iframe.style.width = '1090px';
iframe.style.marginLeft = 'auto';
iframe.style.marginRight = 'auto';
iframe.style.marginTop = '50px';
iframe.style.marginBottom = '50px';
iframe.style.border = 'none';
iframe.style.display = 'block';
iframe.src = "http://wowbao.bithub.com/carousel/embed.html";

//iframe.src = "../embed.html";

link.parentNode.insertBefore(iframe, link);
link.parentNode.removeChild(link);

window.addEventListener('message', function(ev){
	var msg = ev.data;
	var arr;
	if(msg){
		arr = msg.split(':');
		if(arr[0] === 'cardExpanded'){
			iframe.style.height = (parseInt(arr[1], 10) + 15 + 122) + 'px';
		}
	}
}, false);
