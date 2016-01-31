APP.templates = (function () {
    'use strict';

    function application() {
        return '<div id="window"><div id="header"><h1>FT Tech Blog</h1></div><div id="body"></div></div>';
    }

    function home() {
        return '<button id="refreshButton">刷新新闻</button><div id="headlines"></div></div>';

    }

    function articleList(articles) {
        var i, l, output = '';

        if (!articles.length) {
            return '<p><i>No articles have been found, maybe you haven\'t <b>refreshed the news</b>?</i></p>';
        }
        for (i = 0, l = articles.length; i < l; i = i + 1) {
            output = output + '<li><h2><a href="#' + articles[i].id + '">' + articles[i].headline + '</a></h2>'+
            '<p class="byline">作者：<strong>' + articles[i].author + '</strong> ，发表日期：' + articles[i].date + '</p></li>';
        }
        return '<ul>' + output + '</ul>';
    }

    function article(articles) {

        // If the data is not in the right form, redirect to an error
        if (!articles[0]) {
            window.location = '#error';
        }
        return '<a href="#">回到首页</a><h2>' + articles[0].headline + '</h2><h3>作者：' + articles[0].author + ' ，发表日期：' + articles[0].date + '</h3>' + articles[0].body;
    }

    function articleLoading() {
        return '<a href="#">回到首页</a><br /><br />Please wait&hellip;';
    }

    return {
        application: application,
        home: home,
        articleList: articleList,
        article: article,
        articleLoading: articleLoading
    };
}());