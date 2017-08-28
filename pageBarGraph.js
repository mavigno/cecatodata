function pageBarGraph(parameters,screen_size) {
	filename = parameters.update + "media-postsScoreByName.json";
	w = screen_size.width;
	h = screen_size.height;
	d3.json(filename,function(err,json) {
		if (err) return console.warn(error);
		pagesData = json;
		/* calcula a proporção a ser utilizada para a apresentação do score de cada página */
		propor = (h-10) /Math.max.apply(null,Object.keys( pagesData ).map(function ( key ) { return pagesData[key]["sum_score"]; }));
		/* cria elemento svg */
		svg = d3.select("body").append("svg")
									.attr("width",w)
									.attr("height",h)
									.attr("viewBox","0 0 "+w+" "+h);
		helpGroup = svg.append("g");
		posts1stGroup = svg.append("g");
		helpGroup.append("text").attr("x",w-100).attr("y",25)
			.style("position","fixed")
			.style("text-anchor","middle").style("font-family","Lato").style("font-size","60px").style("stroke",lncolor).text("?");
		helpGroup.append("circle").attr("cx",w-100).attr("cy",50).attr("r",50).attr("stroke",lncolor).attr("stroke-width",0.5).style("fill",bgcolor)
			.style("position","fixed")
			.style("stroke-dasharray","5,5")
			.style("fill-opacity",0.3)
			.on("mouseover",function(d) { d3.select(this).style("fill",lncolor)})
			.on("mouseout",function(d) { d3.select(this).style("fill",bgcolor)});
		posts1stGroup.append("text").attr("x",w-100).attr("y",h/2).attr("class","incircle").style("font-size","40px").style("stroke",lncolor).text("#1")
			.style("position","fixed");
		posts1stGroup.append("circle").attr("cx",w-100).attr("cy",h/2).attr("r",50).attr("stroke",lncolor).attr("stroke-width",0.5).style("fill",bgcolor)
			.style("position","fixed")
			.style("stroke-dasharray","5,5")
			.style("fill-opacity",0.3)
			.on("mouseover",function(d) { d3.select(this).style("fill",lncolor)})
			.on("mouseout",function(d) { d3.select(this).style("fill",bgcolor)})
			.on("click",function(d,i) {
				filename = "posts1st-" + parameters.update + ".csv";
				if (toggle1stPosts == 0) {
					toggle1stPosts = 1;
					d3.select("#commenttitle").style("visibility","visible");
					chartGroup.style("visibility","hidden");
					pageGroup.style("visibility","hidden");
					d3.select("#comments").style("visibility","visible");
					divGroup.selectAll("p").remove();
					divGroup2.selectAll("p").remove();
					pagePosts(filename);
				} else {
					toggle1stPosts = 0;
					d3.select("#commenttitle").style("visibility","hidden");
					divGroup.selectAll("p").remove();
					chartGroup.style("visibility","visible");
					d3.select("#comments").style("visibility","hidden");
					//pageGroup.style("visibility","visible");
				}
			});
		
		/* cria escala para elementos "y" do gráfico - 10 elementos no total*/
		yScale = d3.scale.ordinal()
		                .domain(d3.range(10))
		                .rangeRoundBands([0, h], 0.1);
		chartGroup = svg.append("g"); /* cria grupo dentro do elemento svg para conter elementos do gráfico */
		pageGroup = svg.append("g");
		/* desenha grafico de barras */
		chartGroup.selectAll("rect").data(pagesData.slice(0,9)) /* usar somente as 10 primeiras páginas */
					.enter().append("rect")
					.attr("id",function(d,i) {return "rect-"+i })
					.attr("fill",bgcolor)
					.attr("x",0)
					.attr("width",0)
					.style("cursor","pointer")
					.on("click",function(d,i) { barClick(d,i,this) })
					.on("mouseover", function(d) { d3.select(this).attr("fill",lncolor)})
					.on("mouseout", function(d) { d3.select(this).attr("fill",bgcolor)})
					.transition()
					.delay(function(d,i) { return i * 200}).duration(1000)
					.attr("y",function(d, i) {
						return yScale(i);         // <-- Set y values
					})
					.attr("height",yScale.rangeBand())
					.attr("width",function(d) { return d.sum_score * propor });
		chartGroup.selectAll("text").data(pagesData.slice(0,9)) /* usar somente as 10 primeiras páginas */
					.enter().append("text")
					.attr("id",function(d,i) {return "text-"+i })
					.text(function(d) { return d.pname })
					.attr("x",w)
					.attr("y",h/2)
					.attr("stroke",lncolor)
					.transition()
					.delay(function(d,i) { return i * 200})
					.duration(1000)
					.attr("y",function(d, i) {
						return yScale(i) + 5;         // <-- Set y values
					})
					.attr("font-size", yScale.rangeBand() - 15)
					.attr("x",function(d) { return (d.sum_score * propor) + 5});
		pageGroup.selectAll("rect").data(["likes","comments","shares"]).enter().append("rect").attr("id",function(d,i) { return "rect"+d }).attr("x",0).attr("y",h)
					.attr("width",0)
					.attr("height",0)
					.attr("stroke",lncolor)
					.attr("fill",bgcolor);
		pageGroup.selectAll("text").data(["likes","comments","shares"]).enter().append("text").attr("id",function(d,i) { return "text"+d }).text("").attr("x",0).attr("y",h)
					.attr("width",0)
					.attr("height",0)
					.attr("stroke",bgcolor)
					.attr("fill",bgcolor);
	});
	
}