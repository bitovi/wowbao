var link = document.getElementById('wowbao-be-social');

var wrapper = document.createElement('div');
wrapper.className = 'wowbao-bithub-wrapper';
wrapper.style.maxWidth = '1090px';
wrapper.style.marginLeft = 'auto';
wrapper.style.marginRight = 'auto';

var iframe = document.createElement('iframe');

iframe.style.height = '594px';
iframe.style.width = '100%';
iframe.style.marginLeft = 'auto';
iframe.style.marginRight = 'auto';
iframe.style.marginTop = '50px';
iframe.style.marginBottom = '50px';
iframe.style.border = 'none';
iframe.style.display = 'block';
//iframe.src = "http://wowbao.bithub.com/carousel/embed.html";

iframe.src = "../embed.html";

wrapper.appendChild(iframe);

link.parentNode.insertBefore(wrapper, link);
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
