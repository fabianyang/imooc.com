<?php
// Convert RSS feed to JSON, stripping out all but basic HTML
$rss = new SimpleXMLElement(file_get_contents('http://cn.engadget.com/rss.xml'));
//$rss = new SimpleXMLElement(file_get_contents('./rss.xml'));
$xpath = '/rss/channel/item';
$items = $rss->xpath($xpath);

if ($items) {
  $output = array();
  foreach ($items as $id => $item) {
    $pubdate = strtotime(strval($item->pubDate));
    // This will be encoded as an object, not an array, by json_encode
    $output[] = array(
      'id' => $id + 1,
      'headline' => strval($item->title),
      'date' => date('Y年m月d日',$pubdate),
//      'date' => strval($item->pubDate),
//      'body' => strval(strip_tags($item->description,'<p><br>')),
      'body' => strval($item->description),
      'author' => strval($item->children('http://purl.org/dc/elements/1.1/')->creator)
    );
  }
}

echo json_encode($output);