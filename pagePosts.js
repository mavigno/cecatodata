function pagePosts(filename) {
	//d3.json(filename,function(error, postsData){
	
	d3.csv(filename,function(error, postsData){
		if (error) return console.warn(error);
		divGroup.selectAll("p").data(postsData).enter().append("p")
			.style("width","10px")
			.html(function(d,i) {
				htmlpost = "";
				htmlpost = htmlpost + "<b>"+ d.from_name + " - </b>" +  d.likes_count + "<i>likes, "  + 
				d.comments_count + " comments, " + d.shares_count + " shares" +"</i>";
				htmlpost = htmlpost + "<br>" + d.created_date + " - "
				if ((d.url == "NA") | (d.url == null) ) { url = d.link } else { url = d.url } 
				htmlpost = htmlpost + '<a href="' + url + '" target="_blank">'+'<img src="arrow66.svg"></img>'+'</a> ';
				//console.log(imglink(url));
				//htmlpost = htmlpost + imglink(url) + '<br>';
				var link = '<br><p class="bordered-link" href="' + d.link + '">';
				if (d.message == "NA") {
					htmlpost = htmlpost + link + d.from_name + ": " + d.link + "<br><i>(esse post não tem um texto)</i>";
				} else {
					htmlpost = htmlpost + link + d.message;
				}
				htmlpost = htmlpost + '</p>';
				return htmlpost;
			})
			.on("click",function(d,i) {
				postComments(d,i);
			})
			.transition().delay(function(d,i) { return i * 200}).duration(1000)
			.style("width",screen_size.width*0.4 + "px");		
	});
}