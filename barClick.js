function barClick(d,i,bar) {
	if (toggleCharts == 0) {
		toggleCharts = 1;
		posts1stGroup.style("visibility","hidden");
		sAttr.rectx = d3.select(bar).attr("x");
		sAttr.recty = d3.select(bar).attr("y");
		sAttr.rectheight = d3.select(bar).attr("height");
		sAttr.rectwidth = d3.select(bar).attr("width");
		sAttr.textx = d3.select("#text-"+i).attr("x");
		sAttr.texty = d3.select("#text-"+i).attr("y");
		chartGroup.style("visibility","hidden");
		d3.select(bar).style("visibility","visible");
		d3.select("#text-"+i).style("visibility","visible");
		d3.select(bar).transition().delay(200).duration(1000).attr("x","10").attr("y","10").attr("height",h-50).attr("width",70);
		d3.select("#text-"+i).transition().delay(200).duration(1000).attr("x",85).attr("y",10);
		var total = d.sum_likes + d.sum_comments + d.sum_shares;
		var propor2 = (h-50)/total;
		pageGroup.style("visibility","visible");
		pageGroup.attr("opacity",0.5);
		plikes = d.sum_likes * propor2; pcomme = d.sum_comments * propor2; pshare = d.sum_shares * propor2;
		pageGroup.style("visibility","visible");
		d3.select("#rectlikes").transition().delay(200).duration(1000).attr("x",50).attr("y",10).attr("height",plikes).attr("width",30).attr("fill",color_likes);
		d3.select("#rectcomments").transition().delay(200).duration(1000).attr("x",50).attr("y",10+plikes).attr("height",pcomme).attr("width",30).attr("fill",color_comme);
		d3.select("#rectshares").transition().delay(200).duration(1000).attr("x",50).attr("y",10+plikes+pcomme).attr("height",pshare).attr("width",30).attr("fill",color_share);
		d3.select("#textlikes").transition().delay(200).duration(1000).attr("x",90).attr("y",plikes/2).attr("font-size",yScale.rangeBand() - 30).attr("stroke","black").text(fmt(d.sum_likes) + " likes");
		d3.select("#textcomments").transition().delay(200).duration(1000).attr("x",90).attr("y",plikes+(pcomme/2)).attr("font-size",yScale.rangeBand() - 30).attr("stroke","black").text(fmt(d.sum_comments) + " comments");
		d3.select("#textshares").transition().delay(200).duration(1000).attr("x",90).attr("y",plikes+pcomme+(pshare/2)).attr("font-size",yScale.rangeBand() - 30).attr("stroke","black").text(fmt(d.sum_shares) + " shares");
		//pageselected = d.from_id+".json";
		pageselected = d.from_id+".csv";
		pagePosts(pageselected);
		$(document).ready(function(){
			$(".iframe").colorbox({iframe:true, width:"80%", height:"80%"});
		});
	} else {
		toggleCharts = 0;
		posts1stGroup.style("visibility",null);
		d3.select(bar).transition().delay(0).duration(500).attr("x",sAttr.rectx).attr("y",sAttr.recty).attr("height",sAttr.rectheight).attr("width",sAttr.rectwidth);
		d3.select("#text-"+i).transition().delay(200).duration(1000).attr("x",sAttr.textx).attr("y",sAttr.texty);
		pageGroup.style("visibility","hidden");
		chartGroup.style("visibility","initial");
		d3.select(bar).style("visibility",null);
		d3.select("#text-"+i).style("visibility",null);
		d3.select("#posts").selectAll("p").remove();
		d3.select("#comments").selectAll("p").remove();
	}
}