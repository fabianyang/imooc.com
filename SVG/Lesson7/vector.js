/* 
    矢量类：方便进行矢量计算
    length：求矢量长度
    add: 加一个矢量
    minus: 减一个矢量
    multipy: 乘以一个标量
    normalize: 求单位矢量，并乘以一个指定长度
    Vector.fromPoints：从两个点创建一个矢量
*/
(function() {
    function Vector(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    Vector.prototype = {
        constructor: Vector,
        square: function() {
            return this.x * this.x + this.y * this.y;
        },
        length: function() {
            return Math.sqrt(this.square());
        },
        add: function(q) {
            return new Vector(this.x + q.x, this.y + q.y);
        },
        minus: function(q) {
            return new Vector(this.x - q.x, this.y - q.y);
        },
        multipy: function(scale) {
            return new Vector(this.x * scale, this.y * scale);
        },
        normalize: function(length) {
            if (length === undefined) {
                length = 1;
            }
            return this.multipy(length / this.length());
        }
    };
    Vector.fromPoints = function(p1, p2) {
        return new Vector(p2.x - p1.x, p2.y - p1.y);
    };
    window.Vector = Vector;
})();