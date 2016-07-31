function createDiv(theWidth, theHeight, id, hex){
    $('<div class="wow fadeIn" style="display: inline-block;">\
            <div id='+id+' style=\'width:'+theWidth+'px;\
                              height:'+theHeight+'px;\
                              background-color:'+hex+';\
                              float:left;\
                              margin-right: 10px;\
                              text-align:center;\
                              vertical-align: middle;\
                              line-height: 100px;\
                              color: #ecf0f1;\'>\
        </div>').appendTo('#content');
}

function showMyImage(fileInput) {
    var files = fileInput.files;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /image.*/;
        if (!file.type.match(imageType)) {
            continue;
        }
        var image = $('<div class="wow fadeIn">\
                        <img id="thumbnil"\
                            style="width:80%;\
                            height:80%;\
                            margin-top:10px;\
                            display:block;\
                            margin-left:auto;\
                            margin-right:auto"/></div>');
        image.appendTo('#imagediv');
        var img=document.getElementById("thumbnil");
        img.file = file;
        var reader = new FileReader();
        reader.onload = (function(aImg) {
            return function(e) {
                aImg.src = e.target.result;
            };
        })(img);
        reader.readAsDataURL(file);

        img.addEventListener('load', function() {
            var vibrant = new Vibrant(img);
            var swatches = vibrant.swatches()
            var idx = 1;
            for (var swatch in swatches) {
                if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
                    console.log(swatch, swatches[swatch].getHex());
                    // document.getElementById("palette" + idx).style.backgroundColor = swatches[swatch].getHex();
                    createDiv(100,100,"palette"+idx,swatches[swatch].getHex());
                    document.getElementById("palette"+idx).innerHTML = swatches[swatch].getHex();
                    idx = idx + 1;
                }
            }
         });
    }
}