function putLogo(parameters,screen_size) {
	var left = Math.round(((2/3)*screen_size.width)) + 50;
	var right = 10;
	var bottom = Math.round((screen_size.height - ((2/3)*screen_size.height)) - (332/2));
	var divlogo = d3.select("body").append("div").attr("id","logodiv").attr("class","logobox")
	.style("left",screen_size.width+"px")
	.style("bottom",bottom)
	.style("right","0px")
	.transition().delay(200).duration(1000)
	.style("left", left+"px")
	.style("bottom", bottom+"px")
	.style("right", right+"px");
	d3.select("#logodiv").append("p").attr("class","logo").html(parameters.pagina);
	d3.select("#logodiv").append("span").attr("class","subtitles").html("Níveis de participação, posts e comentários em páginas de mídia no facebook<br>")
	d3.select("#logodiv").append("span").attr("class","subtitles").html("última atualização:<br><b>"+parameters.update_long+"</b");
}