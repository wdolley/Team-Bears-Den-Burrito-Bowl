export function MatchColor(color1,color2,range) { 
    var rgb1 = {
        r: parseInt(color1.slice(1, 3), 16),
        g: parseInt(color1.slice(3, 5), 16),
        b: parseInt(color1.slice(5, 7), 16),
    };
    var rgb2 = {
        r: parseInt(color2.slice(1, 3), 16),
        g: parseInt(color2.slice(3, 5), 16),
        b: parseInt(color2.slice(5, 7), 16),

    };
    // check for gray range 30
    var diff = (Math.abs(rgb1.r - rgb2.r) + Math.abs(rgb1.g - rgb2.g) + Math.abs(rgb1.b - rgb2.b));

    var diff1 = Math.max(rgb1.r,rgb1.g,rgb1.b)-Math.min(rgb1.r,rgb1.g,rgb1.b);
    var diff2 = Math.max(rgb2.r,rgb2.g,rgb2.b)-Math.min(rgb2.r,rgb2.g,rgb2.b);
    var max = Math.max(diff1,diff2);
    range = (max * range) + Math.pow((max * range/10),2);
    if((diff1 <= 30) && (diff2 <= 30)) {
        var total1 = rgb1.r + rgb1.g + rgb1.b;
        var total2 = rgb2.r + rgb2.g + rgb2.b;
        if(Math.abs(total1 - total2) < range*700) {
            return true;
        }
    } else if (diff1 > 30 && diff2 > 30) {
        if(diff < range) {
            return true;
        }
    }
    return false;
}