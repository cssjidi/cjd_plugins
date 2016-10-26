!(function($,window){
		var cjdScroll = function(){
			this.init.apply(this,arguments);
		}
		cjdScroll.prototype={
			init:function(){
				var args = Array.prototype.slice.call(arguments);
				if(args && args.length>0){
					var config = args[0];
					//处理参数
					if(config && typeof config === 'object'){
						this.config = config || {
							selector:'',//选择器
							speed:50,	//滚动速度
							type:1,		//滚动类型multi,one,seam,group
							animate:'marginTop'
						}
						this.$dom = $(this.config.selector);
						this.$boxHeight = this.$dom.height();
						this.roll();
						this.bind();
					}
				}
			},
			roll:function(){
				var self = this;
				var cloneDom = this.$dom.html();
				this.$dom.append(cloneDom);
				self.animate(this.speed);
			},
			bind:function(){
				var self = this;
				this.$dom.bind('mousemove',function(){
					clearInterval(self.animation);
				});
				this.$dom.bind('mouseout',function(){
					self.animate();
				});
			},
			animate:function(){
				var self = this;
				this.animation = setInterval(function(){
					this.pause=false;
					if(self.curPos<self.$boxHeight){
						self.curPos++;
						self.animateStyle(self.curPos);
					}else{
						self.curPos=0;
					}
				},self.config.speed);
			},
			animateStyle:function(curPos){
				var self = this;
				var group = self.config.type.split(':');
				if(group.length>1 && !isNaN(group[1]) && group[0] === 'group'){
					self.$dom.animate({'marginTop':-self.$dom.find('li').height()*group[1]*Math.ceil(curPos/(self.$dom.find('li').height()*group[1]))},self.config.speed);
				}
				if(group.length>1 && !isNaN(group[1]) && group[0] === 'seam'){
					self.delay(function(){
						console.log(1234);
					});
					self.$dom.animate({'marginTop':-curPos},self.config.speed);
				}
				switch(self.config.type){
					case 'one':
						self.$dom.parent().height(self.$dom.find('li').height());
						self.$dom.animate({'marginTop':-self.$dom.find('li').height()*Math.ceil(curPos/self.$dom.find('li').height())},self.config.speed);
						break;
					case 'multi':
						break;
				}
			},
			delay:function(fn){
				if(this.pause){
					this.animate();
				}else{
					setTimeout(fn,1000);
				}
			}
		};
		window.cjdScroll = function(obj){
			new cjdScroll(obj);
		}
	}(jQuery,window));
