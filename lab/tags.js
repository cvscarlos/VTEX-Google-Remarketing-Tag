"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});

(function(){
	var price=0,VTEXOrderItem_orig,VTEXCheckoutViewModel_orig,tag;
	
	// Google Remarketing
	tag=function(value){
		window.google_conversion_id = 1045239532; 
		window.google_conversion_language = "pt"; 
		window.google_conversion_format = "2"; 
		window.google_conversion_color = "ffffff"; 
		window.google_conversion_label = "1QmeCJ6TggQQ7K208gM"; 
		window.google_conversion_value = value;

		if("function"===typeof google_trackConversion)
			google_trackConversion();
		else
			$.ajax({
				url: document.location.protocol+"//www.googleadservices.com/pagead/conversion_async.js",
				dataType: "script",
				success: function(){ if("function"===typeof google_trackConversion) google_trackConversion();}
			});
	};

	// OBTENDO OS DADOS ATRAVÉS DAS TAGS DO GOOGLE ANALYTICS
	// $(function(){
		// var _gaq2 = [],infos={},value=0;
		// $("script:not([src])").each(function(){
			// var text;
			// text=this.innerHTML;
			// if(text.indexOf("_gaq")>-1)
			// {
				// text=text.split(/\(\s*function/).shift().replace(/_gaq/g,"_gaq2").trim().replace(/var.*/,"");
				// eval(text);
				// return false;
			// }
		// });

		// for(i in _gaq2){
			// infos[_gaq2[i][0]]=infos[_gaq2[i][0]]||[];
			// infos[_gaq2[i][0]].push(_gaq2[i]);
		// }
		
		// for(v in infos._addItem){
			// if(typeof infos._addItem[v][5] === "string")
				// value+=parseFloat(infos._addItem[v][5],10);
		// }
		
		// tag(value.toFixed(2));
	// });
	
	
	// MÉTODO DE OBTENSÃO DE DADOS ATRAVÉS DO KNOCKOUT
	VTEXOrderItem_orig=VTEXOrderItem;
	VTEXOrderItem=function (options) {
		VTEXOrderItem_orig.call(this,options);
		price+=(this.totalPrice());
	};
	VTEXCheckoutViewModel_orig=VTEXCheckoutViewModel;
	VTEXCheckoutViewModel=function () {
		VTEXCheckoutViewModel_orig.call(this);
		this.totalizers = ko.dependentObservable(function () {
			if (this.orderForm())
				tag(price.toFixed(2));
				
			if (this.orderForm())
				return this.orderForm().Totalizers();
			else 
				return [];
		} .bind(this));
	};
})();