!function() {
    var box = $("#box"), span = "span", 
    e = {
        lvT: ["绿箭侠的脑残粉", "绿箭侠的忠实粉", "绿箭侠的路人粉", "慧眼识绿箭侠", "火眼金睛", "洞察一切", "两眼冒光", "24k氪金眼", "已被亮瞎！"],
        render: function(lvMap, f) {
            box.find(span).css({
                "background": "url(./img/black1.png)",
                "background-size": "cover"
            });
            var h = Math.floor(Math.random() * lvMap * lvMap);
            box.find(span).eq(h).css({
                "background": "url(./img/black2.png)", 
                "background-size": "cover"
            }).data("type", "a");
        },
        getGameOverText: function(lv) {
            var b = 20 > lv ? 0 : Math.ceil((lv - 20) / 10);
            var c = this.lvT[b] || _.last(this.lvT); 
            var d = c + "lv" + lv;
            return {txt: d}
        }};
    API.color = e
}(); 