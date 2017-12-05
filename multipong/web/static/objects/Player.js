function Player(){
	this.id = '';
	this.username = '';
	this.score = 0;
  this.paddle = {pos:.5, width:100, wall: 0}

  this.init = function(id, username, pos, wall){
		this.id = id;
		this.username = username;
		this.paddle.pos;
		this.paddle.wall = wall;
	}
	this.decrement = function(elapsedTime){
    this.paddle.pos -= elapsedTime * 1.5;
		if(this.paddle.pos < 0)
			this.paddle.pos = 0;
  }.bind(this);

  this.increment = function(elapsedTime){
    this.paddle.pos += elapsedTime * 1.5;
		if(this.paddle.pos > 1)
			this.paddle.pos = 1;
  }.bind(this);

  this.hitBall = function(x, y){
    return y >= ui.arenaSize && x >= this.pos - width / 2 && x <= this.pos + width / 2;
  }

  this.draw = function(context){
		var offset = 292 + ui.getPadding();
		var wallLength = 414;
   	var x;
		var y;

		if(this.paddle.wall == 0){
			x = (this.paddle.pos * wallLength + offset - this.paddle.width / 2) * ui.getScreenScale();
 		  y = ui.getScreenHeight() - (10 * ui.getScreenScale());
    	context.fillRect(x, y, this.paddle.width * ui.getScreenScale(), 10 * ui.getScreenScale());
		}
		else if(this.paddle.wall == 2){
 		  x = 0;
			y = (this.paddle.pos * wallLength + offset - this.paddle.width / 2) * ui.getScreenScale();
    	context.fillRect(x, y, 10 * ui.getScreenScale(), this.paddle.width * ui.getScreenScale());
		}
		else if(this.paddle.wall == 4){
			x = (this.paddle.pos * wallLength + offset - this.paddle.width / 2) * ui.getScreenScale();
 		  y = 0;
    	context.fillRect(x, y, this.paddle.width * ui.getScreenScale(), 10 * ui.getScreenScale());
		}
		else if(this.paddle.wall == 6){
 		  x = ui.getScreenHeight() - (10 * ui.getScreenScale());
			y = (this.paddle.pos * wallLength + offset - this.paddle.width / 2) * ui.getScreenScale();
    	context.fillRect(x, y, 10 * ui.getScreenScale(), this.paddle.width * ui.getScreenScale());
		}

  }
}
