import can from "can";
import "tv/";

var template = can.stache('<wb-tv></wb-tv>');

$('#app').html(template());
