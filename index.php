<?php

// print_r ($_SERVER);
echo '<b>$_SERVER</b><br/>';
$info = $_SERVER;
foreach ($info as $key => $value) {
	echo "$key: $value <br/>";
}
echo '<br/><br/>';

echo "<b>FUNCTION getenv()</b><br/>";
$getInfo = getenv();
foreach ($getInfo as $key => $value) {
	echo "$key: $value <br/>";
}
echo '<br/><br/>';

echo "<b>FUNCTION get_browser()</b><br/>";
$browser = get_browser(null, true);
foreach ($browser as $key => $value) {
	echo "$key: $value <br/>";
}

?>