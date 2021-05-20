document.addEventListener('DOMContentLoaded', function() {
	//window._service = localStorage["_service"]
    window.title = document.getElementById('title');
    window.desc = document.getElementById('desc');
    window.link = document.getElementById('link');
    window.url = document.getElementById('url');
    window.largest_image = document.getElementById('contact');
    
    document.getElementById('year').innerHTML = ""+new Date().getFullYear();
    
    $("#scrapeurl_form").submit(function(e){e.preventDefault(); window.scrape_url();})
});

window.host = window.location.href.slice(0, window.location.href.lastIndexOf("/"));
var endpoint = "/metadata/";

window.scrape_url = function(){
    var submit_btn = document.getElementById("scrape_btn");
	submit_btn.innerHTML = "Scraping"

	/*window.nameipt = document.getElementById("nameipt");
	window.emailipt = document.getElementById("emailipt");
	window.msgipt = document.getElementById("messageipt");
	var data = JSON.stringify({"name" : nameipt.value, "email" : emailipt.value, "message" : msgipt.value})*/
    
	var xhr = new XMLHttpRequest();

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			if ( this.status == 200 ) {  
		      	submit_btn.innerHTML = "Scrape Url";
		      	url.value = "https://";
                var data = JSON.parse(this.responseText);
                if(!(data == null || data == undefined)){
                    title.innerHTML = data['title'];
                    desc.innerHTML = data['description'];
                    link.innerHTML = data['link'];
                    try{
                        var img_src = data["largest_image"]["src"];
                        largest_image.style.backgroundImage = "url(" + img_src + ")";
                    }catch(e){
                        alert("Could not retrieve any image");
                    }
                }else{
                    link.innerHTML = data['Could not scrape url'];
                }
                submit_btn.innerHTML = "Scrape Url";
	      	} else { 
		        submit_btn.innerHTML = "Scrape Url";
                console.log(this.status + ": " + this.responseText);
	    		//alert(this.status + ": " + this.responseText);
			} 
		}
	});
	xhr.onerror = function () { 
        submit_btn.innerHTML = "Scrape Url";
		console.log(this.status + ": " + this.responseText);
		//error(this, this.status); 
	};
    
    xhr.open("GET", host+endpoint+encodeURIComponent(url.value));
    
	//xhr.open("POST", host+endpoint);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Accept", "*/*");
	xhr.setRequestHeader("Cache-Control", "no-cache");
	xhr.send(null);
}