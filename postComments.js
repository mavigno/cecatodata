function postComments(post,index) {
	d3.select("#posts").selectAll("p").remove();
	d3.select("#comments").style("visibility","visible");
	
	var comments = d3.select("#comments").append("p");
	html = "<br>Página: " + post.from_name + " , data do post:" + post.created_date + ", likes:" + post.likes_count + ", comments:" + post.comments_count + ", shares:" + post.shares_count;
	comments.append("span").html(html);
	if (post.message == null) {
		post.message = "(nenhum texto foi exibido para esse post)"
	}
	comments.append("p")
		.attr("class","bordered-paragraph")
		.html(post.message+"<br>")
		.on("click",function(d,i) {
			d3.select("#comments").selectAll("p").remove();
			ids = post.id.split("_");
			if (toggle1stPosts == 0) {
				filename = ids[0] + ".csv";
			} else {
				filename = "posts1st-" + parameters.update + ".csv";
			}
			pagePosts(filename);
		});
	filename = "comments-" + post.id + ".csv";
	//console.log(filename);
	html = "";
	d3.csv(filename, function(error,commentsData) {
		if (error) return console.warn(error);
		divGroup2.selectAll("p").data(commentsData).enter().append("p")
			.attr("class","comments")
			//.style("width","10px")
			.html(function(d,i) {
				html = "";
				html = html + '<i>"' + d.message + '"</i>';
				html = html + "<br>(" + d.from_name + ")<br>" + d.likes_count + " likes";  
				return html;
			});
			//.transition().delay(function(d,i) { return i * 200}).duration(1000)
			//.style("width",screen_size.width*0.5 + "px");
	});
}